<?php

namespace App\Services;

use App\Models\Course;
use App\Models\DownloadableAsset;
use App\Models\Payment;
use App\Models\RedeemCode;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$clientKey = config('midtrans.client_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
        
        // Override notification URL directly from code
        Config::$overrideNotifUrl = route('payment.notification');
    }

    /**
     * Create a payment for a course.
     */
    public function createCoursePayment(User $user, Course $course): array
    {
        // Check if user already has access
        $hasAccess = $user->courses()->where('courses.id', $course->id)->exists();
        if ($hasAccess) {
            return [
                'success' => false,
                'error' => 'Anda sudah memiliki akses ke course ini.',
            ];
        }

        // Check if there's a pending payment
        $pendingPayment = Payment::where('user_id', $user->id)
            ->where('payable_type', Course::class)
            ->where('payable_id', $course->id)
            ->where('status', 'pending')
            ->first();

        if ($pendingPayment && $pendingPayment->snap_token) {
            return [
                'success' => true,
                'payment' => $pendingPayment,
                'snap_token' => $pendingPayment->snap_token,
            ];
        }

        // Create payment record
        $orderId = Payment::generateOrderId('COURSE');
        $payment = Payment::create([
            'user_id' => $user->id,
            'order_id' => $orderId,
            'payable_type' => Course::class,
            'payable_id' => $course->id,
            'amount' => $course->price,
            'status' => 'pending',
        ]);

        try {
            $snapToken = $this->generateSnapToken($payment, $user, [
                'name' => 'Course: ' . $course->title,
            ]);

            $payment->update(['snap_token' => $snapToken]);

            return [
                'success' => true,
                'payment' => $payment,
                'snap_token' => $snapToken,
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans Snap Token Error', [
                'error' => $e->getMessage(),
                'payment_id' => $payment->id,
            ]);

            $payment->update(['status' => 'failed']);

            return [
                'success' => false,
                'error' => 'Gagal membuat pembayaran. Silakan coba lagi.',
            ];
        }
    }

    /**
     * Create a payment for a digital asset.
     */
    public function createAssetPayment(User $user, DownloadableAsset $asset): array
    {
        // Check if there's a pending payment
        $pendingPayment = Payment::where('user_id', $user->id)
            ->where('payable_type', DownloadableAsset::class)
            ->where('payable_id', $asset->id)
            ->where('status', 'pending')
            ->first();

        if ($pendingPayment && $pendingPayment->snap_token) {
            return [
                'success' => true,
                'payment' => $pendingPayment,
                'snap_token' => $pendingPayment->snap_token,
            ];
        }

        // Check if already paid
        $hasPaid = Payment::where('user_id', $user->id)
            ->where('payable_type', DownloadableAsset::class)
            ->where('payable_id', $asset->id)
            ->where('status', 'paid')
            ->exists();

        if ($hasPaid) {
            return [
                'success' => false,
                'error' => 'Anda sudah membeli asset ini.',
            ];
        }

        // Create payment record
        $orderId = Payment::generateOrderId('ASSET');
        $payment = Payment::create([
            'user_id' => $user->id,
            'order_id' => $orderId,
            'payable_type' => DownloadableAsset::class,
            'payable_id' => $asset->id,
            'amount' => $asset->price,
            'status' => 'pending',
        ]);

        try {
            $snapToken = $this->generateSnapToken($payment, $user, [
                'name' => 'Asset: ' . $asset->title,
            ]);

            $payment->update(['snap_token' => $snapToken]);

            return [
                'success' => true,
                'payment' => $payment,
                'snap_token' => $snapToken,
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans Snap Token Error', [
                'error' => $e->getMessage(),
                'payment_id' => $payment->id,
            ]);

            $payment->update(['status' => 'failed']);

            return [
                'success' => false,
                'error' => 'Gagal membuat pembayaran. Silakan coba lagi.',
            ];
        }
    }

    /**
     * Handle Midtrans notification callback.
     */
    public function handleNotification(array $notification): bool
    {
        $orderId = $notification['order_id'] ?? null;
        $transactionStatus = $notification['transaction_status'] ?? null;
        $fraudStatus = $notification['fraud_status'] ?? null;
        $paymentType = $notification['payment_type'] ?? null;
        $transactionId = $notification['transaction_id'] ?? null;

        if (!$orderId) {
            Log::warning('Midtrans notification without order_id', $notification);
            return false;
        }

        $payment = Payment::where('order_id', $orderId)->first();

        if (!$payment) {
            Log::warning('Payment not found for order_id', ['order_id' => $orderId]);
            return false;
        }

        // Update payment with Midtrans response
        $payment->update([
            'payment_type' => $paymentType,
            'transaction_id' => $transactionId,
            'midtrans_response' => $notification,
        ]);

        // Process based on transaction status
        if ($transactionStatus === 'capture') {
            if ($fraudStatus === 'accept') {
                $this->markAsPaid($payment);
            }
        } elseif ($transactionStatus === 'settlement') {
            $this->markAsPaid($payment);
        } elseif (in_array($transactionStatus, ['cancel', 'deny'])) {
            $payment->update(['status' => 'failed']);
        } elseif ($transactionStatus === 'expire') {
            $payment->update([
                'status' => 'expired',
                'expired_at' => now(),
            ]);
        } elseif ($transactionStatus === 'pending') {
            $payment->update(['status' => 'pending']);
        }

        return true;
    }

    /**
     * Mark payment as paid and process enrollment/access.
     */
    protected function markAsPaid(Payment $payment): void
    {
        $payment->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Process based on payable type
        if ($payment->payable_type === Course::class) {
            $this->enrollUserInCourse($payment);
        } elseif ($payment->payable_type === DownloadableAsset::class) {
            $this->grantAssetAccess($payment);
        }

        Log::info('Payment marked as paid', [
            'payment_id' => $payment->id,
            'order_id' => $payment->order_id,
        ]);
    }

    /**
     * Enroll user in course after successful payment.
     */
    protected function enrollUserInCourse(Payment $payment): void
    {
        $user = $payment->user;
        $course = $payment->payable;

        // Check if already enrolled
        $alreadyEnrolled = $user->courses()->where('courses.id', $course->id)->exists();
        if ($alreadyEnrolled) {
            return;
        }

        // Create a redeem code entry to maintain compatibility with existing enrollment system
        RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PAID-' . $payment->order_id,
            'user_id' => $user->id,
            'is_used' => true,
            'used_at' => now(),
        ]);
    }

    /**
     * Grant user access to asset after successful payment.
     */
    protected function grantAssetAccess(Payment $payment): void
    {
        $user = $payment->user;
        $asset = $payment->payable;

        // Create an asset code entry for the user (compatible with existing download system)
        $assetCodeService = app(AssetCodeService::class);
        $codes = $assetCodeService->generateCodes($asset, 1);

        if ($codes->isNotEmpty()) {
            $assetCode = $codes->first();
            $assetCode->update([
                'user_id' => $user->id,
                'is_used' => true,
                'used_at' => now(),
            ]);
        }
    }

    /**
     * Generate Midtrans Snap token.
     */
    protected function generateSnapToken(Payment $payment, User $user, array $itemDetails): string
    {
        $params = [
            'transaction_details' => [
                'order_id' => $payment->order_id,
                'gross_amount' => $payment->amount,
            ],
            'item_details' => [
                [
                    'id' => $payment->payable_id,
                    'price' => $payment->amount,
                    'quantity' => 1,
                    'name' => substr($itemDetails['name'], 0, 50), // Midtrans limit
                ],
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
            'callbacks' => [
                'finish' => route('payment.finish'),
                'unfinish' => route('payment.finish'),
                'error' => route('payment.finish'),
            ],
        ];

        return Snap::getSnapToken($params);
    }

    /**
     * Check if user has paid for a specific course.
     */
    public function hasUserPaidForCourse(User $user, Course $course): bool
    {
        return Payment::where('user_id', $user->id)
            ->where('payable_type', Course::class)
            ->where('payable_id', $course->id)
            ->where('status', 'paid')
            ->exists();
    }

    /**
     * Check if user has paid for a specific asset.
     */
    public function hasUserPaidForAsset(User $user, DownloadableAsset $asset): bool
    {
        return Payment::where('user_id', $user->id)
            ->where('payable_type', DownloadableAsset::class)
            ->where('payable_id', $asset->id)
            ->where('status', 'paid')
            ->exists();
    }

    /**
     * Get payment history for a user.
     */
    public function getUserPaymentHistory(User $user, int $perPage = 10)
    {
        return Payment::where('user_id', $user->id)
            ->with('payable')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get all payments for admin.
     */
    public function getAllPayments(int $perPage = 15)
    {
        return Payment::with(['user', 'payable'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
