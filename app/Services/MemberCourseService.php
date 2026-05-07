<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Material;
use App\Models\SubMaterial;
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
        $totalSubMaterials = $this->getTotalSubMaterials($course);
        if ($totalSubMaterials === 0) {
            return 0;
        }

        $subMaterialIds = $this->getAllSubMaterialIds($course);
        $completed = $user->progress()
            ->whereIn('sub_material_id', $subMaterialIds)
            ->where('is_completed', true)
            ->count();

        return round(($completed / $totalSubMaterials) * 100);
    }

    public function checkAccess(User $user, Course $course): void
    {
        $hasAccess = $user->courses()->where('courses.id', $course->id)->exists();
        if (!$hasAccess) {
            abort(403, 'You do not have access to this course.');
        }
    }

    public function getCourseWithProgress(User $user, Course $course): array
    {
        $course->load(['sessions.materials.subMaterials']);

        $subMaterialIds = $this->getAllSubMaterialIds($course);
        $userProgress = $user->progress()
            ->whereIn('sub_material_id', $subMaterialIds)
            ->get()
            ->keyBy('sub_material_id');

        $totalSubMaterials = $subMaterialIds->count();
        $progressPercentage = $totalSubMaterials > 0
            ? round(($userProgress->where('is_completed', true)->count() / $totalSubMaterials) * 100)
            : 0;

        $currentSubMaterial = $this->findCurrentSubMaterial($course, $userProgress);

        return [
            'course' => $course,
            'userProgress' => $userProgress,
            'progressPercentage' => $progressPercentage,
            'currentSubMaterial' => $currentSubMaterial,
        ];
    }

    public function canAccessSubMaterial(User $user, Course $course, SubMaterial $subMaterial): bool
    {
        $course->load(['sessions.materials.subMaterials']);

        $subMaterialIds = $this->getAllSubMaterialIds($course);
        $userProgress = $user->progress()
            ->whereIn('sub_material_id', $subMaterialIds)
            ->get()
            ->keyBy('sub_material_id');

        $allSubMaterials = $this->getAllSubMaterials($course);

        foreach ($allSubMaterials as $sm) {
            if ($sm->id === $subMaterial->id) {
                return true;
            }
            if (!isset($userProgress[$sm->id]) || !$userProgress[$sm->id]->is_completed) {
                return false;
            }
        }

        return true;
    }

    public function getSubMaterialWithProgress(User $user, Course $course, SubMaterial $subMaterial): array
    {
        $course->load(['sessions.materials.subMaterials']);

        $subMaterialIds = $this->getAllSubMaterialIds($course);
        $userProgress = $user->progress()
            ->whereIn('sub_material_id', $subMaterialIds)
            ->get()
            ->keyBy('sub_material_id');

        $totalSubMaterials = $subMaterialIds->count();
        $progressPercentage = $totalSubMaterials > 0
            ? round(($userProgress->where('is_completed', true)->count() / $totalSubMaterials) * 100)
            : 0;

        return [
            'course' => $course,
            'subMaterial' => $subMaterial,
            'userProgress' => $userProgress,
            'progressPercentage' => $progressPercentage,
            'isCompleted' => isset($userProgress[$subMaterial->id]) && $userProgress[$subMaterial->id]->is_completed,
        ];
    }

    public function markSubMaterialComplete(User $user, SubMaterial $subMaterial): void
    {
        UserProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'sub_material_id' => $subMaterial->id,
            ],
            [
                'material_id' => $subMaterial->material_id,
                'is_completed' => true,
                'completed_at' => now(),
            ]
        );
    }

    // Legacy support
    public function checkMaterialBelongsToCourse(Course $course, Material $material): void
    {
        $belongs = $course->materials()->where('materials.id', $material->id)->exists();
        if (!$belongs) {
            abort(404, 'Material not found in this course.');
        }
    }

    public function canAccessMaterial(User $user, Course $course, Material $material): bool
    {
        return true;
    }

    public function getMaterialWithProgress(User $user, Course $course, Material $material): array
    {
        $course->load(['sessions.materials.subMaterials']);
        return [
            'course' => $course,
            'material' => $material,
            'userProgress' => collect(),
            'progressPercentage' => 0,
            'isCompleted' => false,
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

    private function getTotalSubMaterials(Course $course): int
    {
        return SubMaterial::whereHas('material.session', function ($q) use ($course) {
            $q->where('course_id', $course->id);
        })->count();
    }

    private function getAllSubMaterialIds(Course $course)
    {
        return SubMaterial::whereHas('material.session', function ($q) use ($course) {
            $q->where('course_id', $course->id);
        })->pluck('id');
    }

    private function getAllSubMaterials(Course $course): array
    {
        $all = [];
        foreach ($course->sessions as $session) {
            foreach ($session->materials as $material) {
                foreach ($material->subMaterials as $sub) {
                    $all[] = $sub;
                }
            }
        }
        return $all;
    }

    private function findCurrentSubMaterial(Course $course, $userProgress): ?SubMaterial
    {
        $allSubMaterials = $this->getAllSubMaterials($course);

        foreach ($allSubMaterials as $sub) {
            if (!isset($userProgress[$sub->id]) || !$userProgress[$sub->id]->is_completed) {
                return $sub;
            }
        }

        return count($allSubMaterials) > 0 ? end($allSubMaterials) : null;
    }
}
