<?php

namespace App\Services;

use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class BlogService
{
    /**
     * Get published posts with pagination.
     */
    public function getPublishedPosts(int $perPage = 10): LengthAwarePaginator
    {
        return Blog::published()
            ->with(['category', 'author'])
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get a single published post by slug.
     */
    public function getPostBySlug(string $slug): ?Blog
    {
        return Blog::published()
            ->with(['category', 'author'])
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get published posts by category slug with pagination.
     */
    public function getPostsByCategory(string $categorySlug, int $perPage = 10): LengthAwarePaginator
    {
        $category = BlogCategory::where('slug', $categorySlug)->first();

        if (!$category) {
            return Blog::whereRaw('1 = 0')->paginate($perPage);
        }

        return Blog::published()
            ->with(['category', 'author'])
            ->where('category_id', $category->id)
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Search published posts by query string.
     */
    public function searchPosts(string $query, int $perPage = 10): LengthAwarePaginator
    {
        return Blog::published()
            ->with(['category', 'author'])
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%");
            })
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }


    /**
     * Get all posts for admin (including drafts) with pagination.
     */
    public function getAllPosts(int $perPage = 10): LengthAwarePaginator
    {
        return Blog::with(['category', 'author'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get a single post by ID for admin (including drafts).
     */
    public function getPostById(int $id): ?Blog
    {
        return Blog::with(['category', 'author'])->find($id);
    }

    /**
     * Create a new blog post.
     */
    public function createPost(array $data): Blog
    {
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof \Illuminate\Http\UploadedFile) {
            $data['thumbnail'] = $data['thumbnail']->store('blog-thumbnails', 'public');
        }

        if (isset($data['status']) && $data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        return Blog::create($data);
    }

    /**
     * Update an existing blog post.
     */
    public function updatePost(Blog $blog, array $data): Blog
    {
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof \Illuminate\Http\UploadedFile) {
            // Delete old thumbnail if exists
            if ($blog->thumbnail) {
                Storage::disk('public')->delete($blog->thumbnail);
            }
            $data['thumbnail'] = $data['thumbnail']->store('blog-thumbnails', 'public');
        }

        // Set published_at when status changes to published
        if (isset($data['status']) && $data['status'] === 'published' && $blog->status !== 'published') {
            $data['published_at'] = $data['published_at'] ?? now();
        }

        $blog->update($data);

        return $blog->fresh(['category', 'author']);
    }

    /**
     * Delete a blog post.
     */
    public function deletePost(Blog $blog): bool
    {
        // Delete thumbnail if exists
        if ($blog->thumbnail) {
            Storage::disk('public')->delete($blog->thumbnail);
        }

        return $blog->delete();
    }

    /**
     * Get all categories.
     */
    public function getAllCategories()
    {
        return BlogCategory::withCount('blogs')->orderBy('name')->get();
    }
}
