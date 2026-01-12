<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Material;
use App\Services\MemberCourseService;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function __construct(
        protected MemberCourseService $courseService
    ) {}

    public function index()
    {
        $courses = $this->courseService->getUserCoursesWithProgress(auth()->user());

        return Inertia::render('Member/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        $user = auth()->user();

        $this->courseService->checkAccess($user, $course);

        $data = $this->courseService->getCourseWithProgress($user, $course);

        return Inertia::render('Member/Course/Show', $data);
    }

    public function showMaterial(Course $course, Material $material)
    {
        $user = auth()->user();

        $this->courseService->checkAccess($user, $course);
        $this->courseService->checkMaterialBelongsToCourse($course, $material);

        $canAccess = $this->courseService->canAccessMaterial($user, $course, $material);
        if (!$canAccess) {
            return redirect()->route('member.courses.show', $course->id)
                ->with('error', 'Please complete previous materials first.');
        }

        $data = $this->courseService->getMaterialWithProgress($user, $course, $material);

        return Inertia::render('Member/Course/Material', $data);
    }

    public function completeMaterial(Course $course, Material $material)
    {
        $user = auth()->user();

        $this->courseService->checkAccess($user, $course);
        $this->courseService->checkMaterialBelongsToCourse($course, $material);
        $this->courseService->markMaterialComplete($user, $material);

        return redirect()->back()->with('success', 'Material marked as complete!');
    }

    public function complete(Course $course)
    {
        $user = auth()->user();
        $this->courseService->checkAccess($user, $course);

        return Inertia::render('Member/Course/Complete', [
            'course' => $course,
        ]);
    }
}
