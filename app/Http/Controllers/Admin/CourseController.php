<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of all courses.
     */
    public function index(): Response
    {
        $courses = Course::withCount(['sessions', 'redeemCodes', 'enrolledUsers'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new course.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Courses/Create');
    }

    /**
     * Store a newly created course in storage.
     * Slug is auto-generated from title.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'is_published' => ['boolean'],
        ]);

        // Slug is auto-generated in the Course model boot method
        $course = Course::create($validated);

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified course with its sessions and materials.
     */
    public function show(Course $course): Response
    {
        $course->load([
            'sessions' => function ($query) {
                $query->orderBy('order_priority');
            },
            'sessions.materials' => function ($query) {
                $query->orderBy('order_priority');
            },
        ]);

        $course->loadCount(['redeemCodes', 'enrolledUsers']);

        return Inertia::render('Admin/Courses/Show', [
            'course' => $course,
        ]);
    }


    /**
     * Show the form for editing the specified course.
     */
    public function edit(Course $course): Response
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
        ]);
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('courses')->ignore($course->id),
            ],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'is_published' => ['boolean'],
        ]);

        $course->update($validated);

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified course from storage.
     * Cascade deletes all related sessions, materials, and redeem codes.
     */
    public function destroy(Course $course): RedirectResponse
    {
        // Delete related data (cascade handled by foreign key constraints)
        // But we explicitly delete to ensure proper cleanup
        foreach ($course->sessions as $session) {
            $session->materials()->delete();
        }
        $course->sessions()->delete();
        $course->redeemCodes()->delete();
        $course->delete();

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
