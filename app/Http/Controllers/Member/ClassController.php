<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $enrolledCourseIds = $user->courses()->pluck('courses.id')->toArray();

        // Featured courses
        $featuredCourses = Course::where('is_published', true)
            ->where('is_featured', true)
            ->withCount('sessions')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($course) => $this->mapCourseData($course, $enrolledCourseIds));

        // All courses (excluding featured)
        $courses = Course::where('is_published', true)
            ->where('is_featured', false)
            ->withCount('sessions')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($course) => $this->mapCourseData($course, $enrolledCourseIds));

        return Inertia::render('Member/Classes/Index', [
            'featuredCourses' => $featuredCourses,
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        if (!$course->is_published) {
            abort(404);
        }

        $user = auth()->user();
        $isEnrolled = $user->courses()->where('courses.id', $course->id)->exists();

        $course->load(['sessions.materials']);
        $course->loadCount(['sessions', 'enrolledUsers']);

        return Inertia::render('Member/Classes/Show', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
        ]);
    }

    private function mapCourseData(Course $course, array $enrolledCourseIds): Course
    {
        $course->is_enrolled = in_array($course->id, $enrolledCourseIds);
        return $course;
    }
}
