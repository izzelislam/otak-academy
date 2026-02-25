<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    /**
     * Display a listing of all payments.
     */
    public function index(Request $request): Response
    {
        $status = $request->input('status');
        
        $query = Payment::with(['user', 'payable'])
            ->orderBy('created_at', 'desc');

        if ($status && in_array($status, ['pending', 'paid', 'failed', 'expired'])) {
            $query->where('status', $status);
        }

        $payments = $query->paginate(15);

        // Stats
        $stats = [
            'total' => Payment::count(),
            'paid' => Payment::where('status', 'paid')->count(),
            'pending' => Payment::where('status', 'pending')->count(),
            'failed' => Payment::where('status', 'failed')->count(),
            'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
        ];

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'stats' => $stats,
            'currentStatus' => $status,
        ]);
    }

    /**
     * Display a specific payment detail.
     */
    public function show(Payment $payment): Response
    {
        $payment->load(['user', 'payable']);

        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment,
        ]);
    }
}
