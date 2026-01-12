<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'member')
            ->withCount(['courses', 'redeemCodes as redemptions_count' => function ($q) {
                $q->where('is_used', true);
            }]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $members = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(User $member)
    {
        $member->load(['courses', 'redeemCodes.course']);
        
        $redemptions = $member->redeemCodes()
            ->where('is_used', true)
            ->with('course')
            ->orderBy('used_at', 'desc')
            ->get();

        return Inertia::render('Admin/Members/Show', [
            'member' => $member,
            'redemptions' => $redemptions,
        ]);
    }
}
