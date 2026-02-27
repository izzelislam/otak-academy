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
use Illuminate\Support\Facades\Http;
use App\Services\MediaService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

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
        $models = explode(',', env('OPENROUTER_MODELS', 'openai/gpt-4o-mini'));
        $models = array_map('trim', $models);

        return Inertia::render('Admin/Blogs/Create', [
            'categories' => $categories,
            'availableModels' => array_filter($models),
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
            'thumbnail' => ['nullable', 'string'],
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
        
        $models = explode(',', env('OPENROUTER_MODELS', 'openai/gpt-4o-mini'));
        $models = array_map('trim', $models);

        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories,
            'availableModels' => array_filter($models),
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
            'thumbnail' => ['nullable', 'string'],
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

    /**
     * Generate AI Blog Content & Thumbnail Form
     */
    public function generate(Request $request, MediaService $mediaService)
    {
        $request->validate([
            'title' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'tone' => 'required|string',
            'level' => 'required|string',
            'max_words' => 'required|string',
            'model' => 'nullable|string',
            'brief' => 'nullable|string',
        ]);

        $categoryName = 'Umum';
        if ($request->category_id) {
            $category = BlogCategory::find($request->category_id);
            if ($category) {
                $categoryName = $category->name;
            }
        }

        $apiKey = env('OPENROUTER_API_KEY');
        $baseUrl = env('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1');
        
        // Allowed models
        $allowedModels = explode(',', env('OPENROUTER_MODELS', 'openai/gpt-4o-mini'));
        $allowedModels = array_map('trim', $allowedModels);
        
        // Pick requested model if valid, else pick first from env
        $model = $request->model && in_array($request->model, $allowedModels) 
                 ? $request->model 
                 : ($allowedModels[0] ?? 'openai/gpt-4o-mini');

        if (empty($apiKey)) {
            return response()->json(['error' => 'API Key OpenRouter tidak ditemukan di konfigurasi.'], 500);
        }

        $prompt = "Buatkan artikel blog dengan detail berikut:\n" .
                  "- Judul: {$request->title}\n" .
                  "- Kategori: {$categoryName}\n" .
                  "- Gaya Bahasa: {$request->tone}\n" .
                  "- Level Pembaca: {$request->level}\n" .
                  "- Panjang Maksimal Konten: Sekitar {$request->max_words} kata.\n";
                  
        if ($request->filled('brief')) {
            $prompt .= "- Brief Tambahan (PENTING): {$request->brief}\n";
        }

        $prompt .= "\nInstruksi WAJIB:\n" .
                  "1. Artikel ditulis dalam bahasa Indonesia yang baik.\n" .
                  "2. Bagian \"content\" gunakan format HTML statis (<h2>, <p>, <ul>).\n" .
                  "3. Kamu HARUS membalas SECARA KETAT hanya dalam format JSON murni yang valid tanpa teks pembuka/penutup apapun.\n" .
                  "4. Format JSON persis seperti ini:\n" .
                  "{\n" .
                  "  \"content\": \"<string html lengkap>\",\n" .
                  "  \"excerpt\": \"<ringkasan singkat, 1-2 kalimat>\",\n" .
                  "  \"meta_title\": \"<judul SEO, max 60 karakter>\",\n" .
                  "  \"meta_description\": \"<deskripsi SEO, max 160 karakter>\"\n" .
                  "}\n" .
                  "5. JANGAN bungkus dalam markdown (```json). Langsung mulai dengan { dan akhiri dengan }.";

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$apiKey}",
                'HTTP-Referer' => config('app.url'),
                'X-Title' => config('app.name'),
            ])->timeout(60)->post("{$baseUrl}/chat/completions", [
                'model' => $model,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
            ]);

            if ($response->successful()) {
                $rawContent = $response->json('choices.0.message.content');
                
                // Clean up possible markdown or extra spaces
                $cleanContent = preg_replace('/^```(?:json)?\s*/i', '', trim($rawContent));
                $cleanContent = preg_replace('/\s*```$/', '', $cleanContent);
                $cleanContent = trim($cleanContent);
                
                $parsed = json_decode($cleanContent, true);
                
                if (json_last_error() === JSON_ERROR_NONE && isset($parsed['content'])) {
                    return response()->json([
                        'content' => trim($parsed['content']),
                        'excerpt' => trim($parsed['excerpt'] ?? ''),
                        'meta_title' => trim($parsed['meta_title'] ?? ''),
                        'meta_description' => trim($parsed['meta_description'] ?? '')
                    ]);
                }
                
                // Fallback
                return response()->json([
                    'content' => trim($rawContent),
                    'excerpt' => '',
                    'meta_title' => '',
                    'meta_description' => ''
                ]);
            }

            return response()->json([
                'error' => 'Gagal generate artikel.', 
                'details' => $response->json()
            ], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan sistem: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Generate Thumbnail Image manually via SiliconFlow
     */
    public function generateImage(Request $request, MediaService $mediaService)
    {
        $request->validate([
            'title' => 'required|string',
        ]);

        $siliconKey = env('SILICONFLOW_API_KEY');
        if (empty($siliconKey)) {
            return response()->json(['error' => 'API Key SiliconFlow tidak dikonfigurasi.'], 500);
        }

        try {
            // "gakusah hd biar hemat memori" - flux can generate fast logic.
            $imgPrompt = "High-quality, simple, clean, minimalist blog post cover image related to: {$request->title}";
            
            $resImg = Http::withHeaders([
                'Authorization' => "Bearer {$siliconKey}",
                'Content-Type'  => 'application/json',
            ])->timeout(60)->post('https://api.siliconflow.com/v1/images/generations', [
                'model'      => 'black-forest-labs/FLUX.1-schnell',
                'prompt'     => $imgPrompt,
                // landscape lower resolution untuk hemat
                'image_size' => '1024x576', 
            ]);

            if ($resImg->successful() && $generatedImgUrl = $resImg->json('images.0.url')) {
                // Download and upload it to MediaService
                $imgContent = Http::timeout(30)->get($generatedImgUrl)->body();
                $tmpPath = sys_get_temp_dir() . '/' . Str::uuid() . '.png';
                file_put_contents($tmpPath, $imgContent);
                
                $uploadedFile = new UploadedFile(
                    $tmpPath,
                    'ai_thumb_' . Str::slug($request->title) . '.png',
                    'image/png',
                    null,
                    true
                );
                
                $media = $mediaService->uploadMedia($uploadedFile, null, 'media/blogs');
                $thumbnailUrl = $mediaService->getMediaUrl($media);
                @unlink($tmpPath);

                return response()->json([
                    'thumbnail_url' => $thumbnailUrl
                ]);
            }

            return response()->json([
                'error' => 'Gagal generate gambar.', 
                'details' => $resImg->json()
            ], 500);

        } catch (\Exception $e) {
            \Log::error('SiliconFlow Manual Image Gen Error: ' . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan saat membuat gambar: ' . $e->getMessage()], 500);
        }
    }
}
