<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of all blog categories.
     */
    public function index(): Response
    {
        $categories = BlogCategory::withCount('blogs')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('Admin/BlogCategories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new blog category.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/BlogCategories/Create');
    }

    /**
     * Store a newly created blog category in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:blog_categories,name'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $category = BlogCategory::create($validated);

        return redirect()
            ->route('admin.blog-categories.index')
            ->with('success', 'Blog category created successfully.');
    }

    /**
     * Show the form for editing the specified blog category.
     */
    public function edit(BlogCategory $blogCategory): Response
    {
        return Inertia::render('Admin/BlogCategories/Edit', [
            'category' => $blogCategory,
        ]);
    }

    /**
     * Update the specified blog category in storage.
     */
    public function update(Request $request, BlogCategory $blogCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blog_categories')->ignore($blogCategory->id),
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blog_categories')->ignore($blogCategory->id),
            ],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $blogCategory->update($validated);

        return redirect()
            ->route('admin.blog-categories.index')
            ->with('success', 'Blog category updated successfully.');
    }

    /**
     * Remove the specified blog category from storage.
     */
    public function destroy(BlogCategory $blogCategory): RedirectResponse
    {
        // Check if category has blogs
        if ($blogCategory->blogs()->count() > 0) {
            return redirect()
                ->route('admin.blog-categories.index')
                ->with('error', 'Cannot delete category with existing blog posts.');
        }

        $blogCategory->delete();

        return redirect()
            ->route('admin.blog-categories.index')
            ->with('success', 'Blog category deleted successfully.');
    }
}
