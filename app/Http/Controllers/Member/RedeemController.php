<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Services\RedeemCodeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RedeemController extends Controller
{
    public function __construct(
        protected RedeemCodeService $redeemCodeService
    ) {}

    /**
     * Show the redeem code form.
     */
    public function create(): Response
    {
        return Inertia::render('Member/Redeem', [
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Process code redemption.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:50'],
        ]);

        $user = $request->user();
        $code = strtoupper(trim($validated['code']));

        // Validate the code first
        $validation = $this->redeemCodeService->validateCode($code);

        if (!$validation['valid']) {
            return redirect()
                ->back()
                ->withErrors(['code' => $validation['error']]);
        }

        // Check if user already has access to this course
        $redeemCode = $validation['redeemCode'];
        if ($this->redeemCodeService->hasUserRedeemedCourse($user, $redeemCode->course)) {
            return redirect()
                ->back()
                ->withErrors(['code' => 'You already have access to this course.']);
        }

        // Process the redemption
        $result = $this->redeemCodeService->redeem($user, $code);

        if (!$result['success']) {
            return redirect()
                ->back()
                ->withErrors(['code' => $result['error']]);
        }

        $courseName = $result['redeemCode']->course->title;

        return redirect()
            ->route('member.redeem.create')
            ->with('success', "Successfully redeemed! You now have access to \"{$courseName}\".");
    }
}
