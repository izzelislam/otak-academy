<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\RedeemCode;
use App\Services\RedeemCodeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RedeemCodeController extends Controller
{
    public function __construct(
        protected RedeemCodeService $redeemCodeService
    ) {}

    /**
     * Display a listing of all redeem codes with status.
     */
    public function index(Request $request): Response
    {
        $query = RedeemCode::with(['course', 'user'])
            ->orderBy('created_at', 'desc');

        // Filter by course if provided
        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
        }

        // Filter by status if provided
        if ($request->has('status')) {
            if ($request->status === 'used') {
                $query->where('is_used', true);
            } elseif ($request->status === 'unused') {
                $query->where('is_used', false);
            }
        }

        $redeemCodes = $query->paginate(20)->withQueryString();
        $courses = Course::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/RedeemCodes/Index', [
            'redeemCodes' => $redeemCodes,
            'courses' => $courses,
            'filters' => [
                'course_id' => $request->course_id,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the form for generating new redeem codes.
     */
    public function create(): Response
    {
        $courses = Course::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/RedeemCodes/Create', [
            'courses' => $courses,
        ]);
    }

    /**
     * Generate a batch of redeem codes for a course.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        $course = Course::findOrFail($validated['course_id']);
        $codes = $this->redeemCodeService->generate($course, $validated['quantity']);

        return redirect()
            ->route('admin.redeem-codes.index', ['course_id' => $course->id])
            ->with('success', "Successfully generated {$codes->count()} redeem codes.");
    }

    /**
     * Display the specified redeem code details.
     */
    public function show(RedeemCode $redeemCode): Response
    {
        $redeemCode->load(['course', 'user']);

        return Inertia::render('Admin/RedeemCodes/Show', [
            'redeemCode' => $redeemCode,
        ]);
    }

    /**
     * Remove the specified redeem code.
     */
    public function destroy(RedeemCode $redeemCode): RedirectResponse
    {
        $redeemCode->delete();

        return redirect()
            ->route('admin.redeem-codes.index')
            ->with('success', 'Redeem code deleted successfully.');
    }
}
