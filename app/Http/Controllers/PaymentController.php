<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\DownloadableAsset;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    /**
     * Create payment for a course.
     */
    public function createCoursePayment(Request $request, Course $course): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Silakan login terlebih dahulu.',
                'needs_login' => true,
            ], 401);
        }

        if ($course->access_type !== 'premium' || $course->price <= 0) {
            return response()->json([
                'message' => 'Course ini gratis.',
            ], 400);
        }

        $result = $this->paymentService->createCoursePayment($user, $course);

        if (!$result['success']) {
            return response()->json([
                'message' => $result['error'],
            ], 400);
        }

        return response()->json([
            'snap_token' => $result['snap_token'],
            'order_id' => $result['payment']->order_id,
            'client_key' => config('midtrans.client_key'),
        ]);
    }

    /**
     * Create payment for a digital asset.
     */
    public function createAssetPayment(Request $request, DownloadableAsset $asset): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Silakan login terlebih dahulu.',
                'needs_login' => true,
            ], 401);
        }

        if ($asset->isFree() || $asset->price <= 0) {
            return response()->json([
                'message' => 'Asset ini gratis.',
            ], 400);
        }

        $result = $this->paymentService->createAssetPayment($user, $asset);

        if (!$result['success']) {
            return response()->json([
                'message' => $result['error'],
            ], 400);
        }

        return response()->json([
            'snap_token' => $result['snap_token'],
            'order_id' => $result['payment']->order_id,
            'client_key' => config('midtrans.client_key'),
        ]);
    }

    /**
     * Handle Midtrans notification webhook (server-to-server).
     */
    public function handleNotification(Request $request): JsonResponse
    {
        $payload = $request->all();

        \Log::info('Midtrans Notification Received', $payload);

        $success = $this->paymentService->handleNotification($payload);

        if (!$success) {
            return response()->json(['status' => 'error'], 400);
        }

        return response()->json(['status' => 'ok']);
    }

    /**
     * Payment finish redirect page.
     */
    public function finish(Request $request)
    {
        $orderId = $request->input('order_id');
        $transactionStatus = $request->input('transaction_status');

        $payment = null;
        if ($orderId) {
            $payment = Payment::with('payable')
                ->where('order_id', $orderId)
                ->first();
        }

        return Inertia::render('Payment/Finish', [
            'payment' => $payment,
            'transactionStatus' => $transactionStatus,
        ]);
    }

    /**
     * Payment history for member.
     */
    public function memberHistory(Request $request)
    {
        $payments = $this->paymentService->getUserPaymentHistory($request->user(), 10);

        return Inertia::render('Member/PaymentHistory', [
            'payments' => $payments,
        ]);
    }

    /**
     * Download transaction invoice.
     */
    public function invoice(Payment $payment)
    {
        $user = auth()->user();

        if ($payment->user_id !== $user->id) {
            abort(403);
        }

        if ($payment->status !== 'paid') {
            abort(404, 'Invoice only available for paid status');
        }

        $payment->load('payable');

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.invoice', compact('payment', 'user'));
        return $pdf->download('Invoice-' . $payment->order_id . '.pdf');
    }
}
