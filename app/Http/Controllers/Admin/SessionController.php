<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    /**
     * Display a listing of sessions for a course.
     */
    public function index(Course $course): Response
    {
        $sessions = $course->sessions()
            ->withCount('materials')
            ->orderBy('order_priority')
            ->get();

        return Inertia::render('Admin/Sessions/Index', [
            'course' => $course,
            'sessions' => $sessions,
        ]);
    }

    /**
     * Show the form for creating a new session.
     */
    public function create(Course $course): Response
    {
        return Inertia::render('Admin/Sessions/Create', [
            'course' => $course,
        ]);
    }

    /**
     * Store a newly created session in storage.
     */
    public function store(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'order_priority' => ['nullable', 'integer', 'min:0'],
        ]);

        // If no order_priority provided, set it to the next available
        if (!isset($validated['order_priority'])) {
            $maxPriority = $course->sessions()->max('order_priority') ?? 0;
            $validated['order_priority'] = $maxPriority + 1;
        }

        $course->sessions()->create($validated);

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Session created successfully.');
    }


    /**
     * Display the specified session.
     */
    public function show(Course $course, CourseSession $session): Response
    {
        $session->load([
            'materials' => function ($query) {
                $query->orderBy('order_priority');
            },
        ]);

        return Inertia::render('Admin/Sessions/Show', [
            'course' => $course,
            'session' => $session,
        ]);
    }

    /**
     * Show the form for editing the specified session.
     */
    public function edit(Course $course, CourseSession $session): Response
    {
        return Inertia::render('Admin/Sessions/Edit', [
            'course' => $course,
            'session' => $session,
        ]);
    }

    /**
     * Update the specified session in storage.
     */
    public function update(Request $request, Course $course, CourseSession $session): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'order_priority' => ['required', 'integer', 'min:0'],
        ]);

        $session->update($validated);

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Session updated successfully.');
    }

    /**
     * Remove the specified session from storage.
     * Cascade deletes all related materials.
     */
    public function destroy(Course $course, CourseSession $session): RedirectResponse
    {
        // Delete related materials first
        $session->materials()->delete();
        $session->delete();

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Session deleted successfully.');
    }

    /**
     * Update the order of sessions.
     */
    public function updateOrder(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'sessions' => ['required', 'array'],
            'sessions.*.id' => ['required', 'integer', 'exists:course_sessions,id'],
            'sessions.*.order_priority' => ['required', 'integer', 'min:0'],
        ]);

        foreach ($validated['sessions'] as $sessionData) {
            CourseSession::where('id', $sessionData['id'])
                ->where('course_id', $course->id)
                ->update(['order_priority' => $sessionData['order_priority']]);
        }

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Session order updated successfully.');
    }
}
