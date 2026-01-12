<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseSession;
use App\Models\Material;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    /**
     * Valid material types.
     */
    protected const MATERIAL_TYPES = ['video', 'text', 'pdf', 'ebook', 'gmeet'];

    /**
     * Display a listing of materials for a session.
     */
    public function index(Course $course, CourseSession $session): Response
    {
        $materials = $session->materials()
            ->orderBy('order_priority')
            ->get();

        return Inertia::render('Admin/Materials/Index', [
            'course' => $course,
            'session' => $session,
            'materials' => $materials,
        ]);
    }

    /**
     * Show the form for creating a new material.
     */
    public function create(Course $course, CourseSession $session): Response
    {
        return Inertia::render('Admin/Materials/Create', [
            'course' => $course,
            'session' => $session,
            'materialTypes' => self::MATERIAL_TYPES,
        ]);
    }

    /**
     * Store a newly created material in storage.
     */
    public function store(Request $request, Course $course, CourseSession $session, \App\Services\MediaService $mediaService): RedirectResponse
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', Rule::in(self::MATERIAL_TYPES)],
            'order_priority' => ['nullable', 'integer', 'min:0'],
        ];

        // Conditional validation
        if ($request->hasFile('file')) {
            $rules['file'] = ['required', 'file', 'max:102400']; // 100MB max
            $rules['content'] = ['nullable', 'string'];
        } else {
            $rules['content'] = ['required', 'string'];
        }

        $validated = $request->validate($rules);

        DB::beginTransaction();
        try {
            // content placeholder if file is uploaded
            if ($request->hasFile('file')) {
                $validated['content'] = 'Processing File...';
            }

            // If no order_priority provided, set it to the next available
            if (!isset($validated['order_priority'])) {
                $maxPriority = $session->materials()->max('order_priority') ?? 0;
                $validated['order_priority'] = $maxPriority + 1;
            }

            $material = $session->materials()->create($validated);

            if ($request->hasFile('file')) {
                $media = $mediaService->uploadMedia($request->file('file'), $material);
                
                // Update content with the media URL (or keep it as reference)
                $url = $mediaService->getMediaUrl($media);
                $material->update(['content' => $url]);
            }

            DB::commit();

            return redirect()
                ->route('admin.courses.sessions.show', [$course, $session])
                ->with('success', 'Material created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['file' => 'Failed to upload file: ' . $e->getMessage()]);
        }
    }


    /**
     * Display the specified material.
     */
    public function show(Course $course, CourseSession $session, Material $material): Response
    {
        return Inertia::render('Admin/Materials/Show', [
            'course' => $course,
            'session' => $session,
            'material' => $material,
        ]);
    }

    /**
     * Show the form for editing the specified material.
     */
    public function edit(Course $course, CourseSession $session, Material $material): Response
    {
        return Inertia::render('Admin/Materials/Edit', [
            'course' => $course,
            'session' => $session,
            'material' => $material,
            'materialTypes' => self::MATERIAL_TYPES,
        ]);
    }

    /**
     * Update the specified material in storage.
     */
    public function update(Request $request, Course $course, CourseSession $session, Material $material, \App\Services\MediaService $mediaService): RedirectResponse
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', Rule::in(self::MATERIAL_TYPES)],
            'order_priority' => ['required', 'integer', 'min:0'],
        ];

        if ($request->hasFile('file')) {
            $rules['file'] = ['required', 'file', 'max:102400'];
            $rules['content'] = ['nullable', 'string'];
        } else {
            // content is required if it's text type or if no file is being uploaded AND no existing content (unless type changed).
            // Simplification: just require content if it's not a file upload, but for existing materials, 
            // the frontend might send the old URL in 'content'.
            $rules['content'] = ['required', 'string'];
        }

        $validated = $request->validate($rules);

        DB::beginTransaction();
        try {
            if ($request->hasFile('file')) {
                // Determine if we need to replace existing media??
                // Ideally, we should check if the material already has media attached via relationships.
                // But simplified: upload new media, update content URL.
                
                $media = $mediaService->uploadMedia($request->file('file'), $material);
                
                // Update content with the media URL
                $validated['content'] = $mediaService->getMediaUrl($media);
            }

            $material->update($validated);
            
            DB::commit();

            return redirect()
                ->route('admin.courses.sessions.show', [$course, $session])
                ->with('success', 'Material updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['file' => 'Failed to upload file: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified material from storage.
     */
    public function destroy(Course $course, CourseSession $session, Material $material): RedirectResponse
    {
        $material->delete();

        return redirect()
            ->route('admin.courses.sessions.show', [$course, $session])
            ->with('success', 'Material deleted successfully.');
    }

    /**
     * Update the order of materials.
     */
    public function updateOrder(Request $request, Course $course, CourseSession $session): RedirectResponse
    {
        $validated = $request->validate([
            'materials' => ['required', 'array'],
            'materials.*.id' => ['required', 'integer', 'exists:materials,id'],
            'materials.*.order_priority' => ['required', 'integer', 'min:0'],
        ]);

        foreach ($validated['materials'] as $materialData) {
            Material::where('id', $materialData['id'])
                ->where('session_id', $session->id)
                ->update(['order_priority' => $materialData['order_priority']]);
        }

        return redirect()
            ->route('admin.courses.sessions.show', [$course, $session])
            ->with('success', 'Material order updated successfully.');
    }
}
