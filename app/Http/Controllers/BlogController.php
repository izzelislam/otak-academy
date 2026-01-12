<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Services\BlogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __construct(
        protected BlogService $blogService
    ) {}

    /**
     * Display a paginated list of published blog posts.
     */
    public function index(Request $request): Response
    {
        $posts = $this->blogService->getPublishedPosts(12);
        $categories = $this->blogService->getAllCategories();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    /**
     * Display a single blog post.
     */
    public function show(string $slug): Response
    {
        $post = $this->blogService->getPostBySlug($slug);

        if (!$post) {
            abort(404, 'Blog post not found.');
        }

        $categories = $this->blogService->getAllCategories();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    /**
     * Display posts filtered by category.
     */
    public function category(string $slug): Response
    {
        $category = BlogCategory::where('slug', $slug)->first();

        if (!$category) {
            abort(404, 'Category not found.');
        }

        $posts = $this->blogService->getPostsByCategory($slug, 12);
        $categories = $this->blogService->getAllCategories();

        return Inertia::render('Blog/Category', [
            'posts' => $posts,
            'category' => $category,
            'categories' => $categories,
        ]);
    }

    /**
     * Search blog posts.
     */
    public function search(Request $request): Response
    {
        $query = $request->input('q', '');
        $posts = $this->blogService->searchPosts($query, 12);
        $categories = $this->blogService->getAllCategories();

        return Inertia::render('Blog/Search', [
            'posts' => $posts,
            'query' => $query,
            'categories' => $categories,
        ]);
    }
}
