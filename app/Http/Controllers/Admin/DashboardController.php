<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\RedeemCode;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalCourses = Course::count();
        $totalMembers = User::where('role', 'member')->count();
        $totalRedemptions = RedeemCode::where('is_used', true)->count();

        $recentRedemptions = RedeemCode::with(['course', 'user'])
            ->where('is_used', true)
            ->orderBy('used_at', 'desc')
            ->limit(10)
            ->get();

        $courseStats = Course::withCount(['sessions', 'enrolledUsers', 'redeemCodes'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalCourses' => $totalCourses,
                'totalMembers' => $totalMembers,
                'totalRedemptions' => $totalRedemptions,
            ],
            'recentRedemptions' => $recentRedemptions,
            'courseStats' => $courseStats,
        ]);
    }
}
