<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use App\Models\UserProgress;

class MemberCourseService
{
    public function getUserCoursesWithProgress(User $user)
    {
        return $user->courses()
            ->where('is_published', true)
            ->withCount('sessions')
            ->get()
            ->map(function ($course) use ($user) {
                $course->progress = $this->calculateCourseProgress($user, $course);
                return $course;
            });
    }

    public function calculateCourseProgress(User $user, Course $course): int
    {
        $totalMaterials = $course->materials()->count();
        $completedMaterials = $user->progress()
            ->whereIn('material_id', $course->materials()->pluck('materials.id'))
            ->where('is_completed', true)
            ->count();

        return $totalMaterials > 0
            ? round(($completedMaterials / $totalMaterials) * 100)
            : 0;
    }

    public function checkAccess(User $user, Course $course): void
    {
        $hasAccess = $user->courses()->where('courses.id', $course->id)->exists();
        if (!$hasAccess) {
            abort(403, 'You do not have access to this course.');
        }
    }

    public function checkMaterialBelongsToCourse(Course $course, Material $material): void
    {
        $belongs = $course->materials()->where('materials.id', $material->id)->exists();
        if (!$belongs) {
            abort(404, 'Material not found in this course.');
        }
    }

    public function getCourseWithProgress(User $user, Course $course): array
    {
        $course->load(['sessions.materials']);

        $materialIds = $course->materials()->pluck('materials.id');
        $userProgress = $user->progress()
            ->whereIn('material_id', $materialIds)
            ->get()
            ->keyBy('material_id');

        $progressPercentage = $this->calculateProgressPercentage($materialIds->count(), $userProgress);
        $currentMaterial = $this->findCurrentMaterial($course, $userProgress);

        return [
            'course' => $course,
            'userProgress' => $userProgress,
            'progressPercentage' => $progressPercentage,
            'currentMaterial' => $currentMaterial,
        ];
    }

    public function canAccessMaterial(User $user, Course $course, Material $material): bool
    {
        $course->load(['sessions.materials']);

        $materialIds = $course->materials()->pluck('materials.id');
        $userProgress = $user->progress()
            ->whereIn('material_id', $materialIds)
            ->get()
            ->keyBy('material_id');

        $allMaterials = $this->getAllMaterials($course);

        foreach ($allMaterials as $m) {
            if ($m->id === $material->id) {
                return true;
            }
            if (!isset($userProgress[$m->id]) || !$userProgress[$m->id]->is_completed) {
                return false;
            }
        }

        return true;
    }

    public function getMaterialWithProgress(User $user, Course $course, Material $material): array
    {
        $course->load(['sessions.materials']);
        $material->load('session');

        $materialIds = $course->materials()->pluck('materials.id');
        $userProgress = $user->progress()
            ->whereIn('material_id', $materialIds)
            ->get()
            ->keyBy('material_id');

        $progressPercentage = $this->calculateProgressPercentage($materialIds->count(), $userProgress);

        return [
            'course' => $course,
            'material' => $material,
            'userProgress' => $userProgress,
            'progressPercentage' => $progressPercentage,
            'isCompleted' => isset($userProgress[$material->id]) && $userProgress[$material->id]->is_completed,
        ];
    }

    public function markMaterialComplete(User $user, Material $material): void
    {
        UserProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'material_id' => $material->id,
            ],
            [
                'is_completed' => true,
                'completed_at' => now(),
            ]
        );
    }

    private function calculateProgressPercentage(int $totalMaterials, $userProgress): int
    {
        $completedMaterials = $userProgress->where('is_completed', true)->count();

        return $totalMaterials > 0
            ? round(($completedMaterials / $totalMaterials) * 100)
            : 0;
    }

    private function getAllMaterials(Course $course): array
    {
        $allMaterials = [];
        foreach ($course->sessions as $session) {
            foreach ($session->materials as $material) {
                $allMaterials[] = $material;
            }
        }
        return $allMaterials;
    }

    private function findCurrentMaterial(Course $course, $userProgress): ?Material
    {
        $allMaterials = $this->getAllMaterials($course);

        foreach ($allMaterials as $material) {
            if (!isset($userProgress[$material->id]) || !$userProgress[$material->id]->is_completed) {
                return $material;
            }
        }

        return count($allMaterials) > 0 ? end($allMaterials) : null;
    }
}
