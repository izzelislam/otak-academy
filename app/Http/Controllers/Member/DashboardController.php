<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Services\MemberCourseService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected MemberCourseService $courseService
    ) {}

    public function index()
    {
        $courses = $this->courseService->getUserCoursesWithProgress(auth()->user());

        return Inertia::render('Member/Dashboard', [
            'courses' => $courses,
        ]);
    }
}
