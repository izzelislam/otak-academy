<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Material;
use App\Models\SubMaterial;
use App\Services\MediaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SubMaterialController extends Controller
{
    protected const TYPES = ['video', 'text', 'pdf', 'ebook', 'gmeet', 'document'];

    public function create(Course $course, Material $material): Response
    {
        return Inertia::render('Admin/SubMaterials/Create', [
            'course' => $course,
            'material' => $material,
            'types' => self::TYPES,
        ]);
    }

    public function store(Request $request, Course $course, Material $material, MediaService $mediaService): RedirectResponse
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', Rule::in(self::TYPES)],
            'order_priority' => ['nullable', 'integer', 'min:0'],
        ];

        if ($request->hasFile('file')) {
            $rules['file'] = ['required', 'file', 'max:102400'];
        }
        $rules['content'] = ['nullable', 'string'];

        $validated = $request->validate($rules);

        DB::beginTransaction();
        try {
            if ($request->hasFile('file')) {
                $validated['content'] = 'Processing File...';
            }

            if (!isset($validated['order_priority'])) {
                $maxPriority = $material->subMaterials()->max('order_priority') ?? 0;
                $validated['order_priority'] = $maxPriority + 1;
            }

            $subMaterial = $material->subMaterials()->create($validated);

            if ($request->hasFile('file')) {
                $media = $mediaService->uploadMedia($request->file('file'), $subMaterial);
                $url = $mediaService->getMediaUrl($media);
                $subMaterial->update(['content' => $url]);
            }

            DB::commit();

            return redirect()
                ->route('admin.courses.show', $course)
                ->with('success', 'Sub-materi berhasil ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['file' => 'Gagal upload file: ' . $e->getMessage()]);
        }
    }

    public function edit(Course $course, Material $material, SubMaterial $subMaterial): Response
    {
        return Inertia::render('Admin/SubMaterials/Edit', [
            'course' => $course,
            'material' => $material,
            'subMaterial' => $subMaterial,
            'types' => self::TYPES,
        ]);
    }

    public function update(Request $request, Course $course, Material $material, SubMaterial $subMaterial, MediaService $mediaService): RedirectResponse
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', Rule::in(self::TYPES)],
            'order_priority' => ['required', 'integer', 'min:0'],
        ];

        if ($request->hasFile('file')) {
            $rules['file'] = ['required', 'file', 'max:102400'];
        }
        $rules['content'] = ['nullable', 'string'];

        $validated = $request->validate($rules);

        DB::beginTransaction();
        try {
            if ($request->hasFile('file')) {
                $media = $mediaService->uploadMedia($request->file('file'), $subMaterial);
                $validated['content'] = $mediaService->getMediaUrl($media);
            }

            $subMaterial->update($validated);
            DB::commit();

            return redirect()
                ->route('admin.courses.show', $course)
                ->with('success', 'Sub-materi berhasil diupdate.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['file' => 'Gagal upload file: ' . $e->getMessage()]);
        }
    }

    public function destroy(Course $course, Material $material, SubMaterial $subMaterial): RedirectResponse
    {
        $subMaterial->delete();

        return redirect()
            ->route('admin.courses.show', $course)
            ->with('success', 'Sub-materi berhasil dihapus.');
    }
}
