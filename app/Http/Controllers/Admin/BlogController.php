<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Services\BlogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __construct(
        protected BlogService $blogService
    ) {}

    /**
     * Display a listing of all blog posts.
     */
    public function index(): Response
    {
        $blogs = $this->blogService->getAllPosts(10);
        
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Show the form for creating a new blog post.
     */
    public function create(): Response
    {
        $categories = BlogCategory::orderBy('name')->get();

        return Inertia::render('Admin/Blogs/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created blog post in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'category_id' => ['nullable', 'exists:blog_categories,id'],
            'status' => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
        ]);

        $validated['author_id'] = Auth::id();

        $blog = $this->blogService->createPost($validated);

        return redirect()
            ->route('admin.blogs.show', $blog)
            ->with('success', 'Blog post created successfully.');
    }


    /**
     * Display the specified blog post.
     */
    public function show(Blog $blog): Response
    {
        $blog->load(['category', 'author']);

        return Inertia::render('Admin/Blogs/Show', [
            'blog' => $blog,
        ]);
    }

    /**
     * Show the form for editing the specified blog post.
     */
    public function edit(Blog $blog): Response
    {
        $blog->load(['category', 'author']);
        $categories = BlogCategory::orderBy('name')->get();

        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified blog post in storage.
     */
    public function update(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blogs')->ignore($blog->id),
            ],
            'content' => ['required', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'category_id' => ['nullable', 'exists:blog_categories,id'],
            'status' => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
        ]);

        $this->blogService->updatePost($blog, $validated);

        return redirect()
            ->route('admin.blogs.show', $blog)
            ->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified blog post from storage.
     */
    public function destroy(Blog $blog): RedirectResponse
    {
        $this->blogService->deletePost($blog);

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}
