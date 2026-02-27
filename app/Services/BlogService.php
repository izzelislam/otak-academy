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
        if (isset($data['thumbnail'])) {
            if ($data['thumbnail'] instanceof \Illuminate\Http\UploadedFile) {
                // Delete old thumbnail if exists
                if ($blog->thumbnail) {
                    $this->deleteThumbnail($blog->thumbnail);
                }
                $data['thumbnail'] = $data['thumbnail']->store('blog-thumbnails', 'public');
            } elseif (is_string($data['thumbnail']) && $data['thumbnail'] !== $blog->thumbnail) {
                // URL string was passed (new AI image), delete the old one
                if ($blog->thumbnail) {
                    $this->deleteThumbnail($blog->thumbnail);
                }
            }
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
            $this->deleteThumbnail($blog->thumbnail);
        }

        return $blog->delete();
    }

    /**
     * Safely delete the thumbnail from storage (Local or Cloud/S3)
     */
    protected function deleteThumbnail(?string $thumbnailUrl)
    {
        if (!$thumbnailUrl) {
            return;
        }

        if (filter_var($thumbnailUrl, FILTER_VALIDATE_URL)) {
            // It's a full URL, likely an AI generated image via MediaService.
            $filename = basename($thumbnailUrl);
            $media = \App\Models\Media::where('storage_path', 'like', '%' . $filename)->first();
            
            if ($media) {
                $disk = in_array(strtolower($media->extension), ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', 'flv']) ? 'public' : 's3';
                Storage::disk($disk)->delete($media->storage_path);
                $media->delete();
            } else {
                // If media model not found but it's an S3 URL
                Storage::disk('s3')->delete('media/blogs/' . $filename);
            }
        } else {
            // It's a local public path (e.g. blog-thumbnails/xxx.jpg)
            Storage::disk('public')->delete($thumbnailUrl);
        }
    }

    /**
     * Get all categories.
     */
    public function getAllCategories()
    {
        return BlogCategory::withCount('blogs')->orderBy('name')->get();
    }
}
