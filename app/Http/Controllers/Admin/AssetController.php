<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DownloadableAsset;
use App\Services\AssetCodeService;
use App\Services\AssetService;
use App\Services\DownloadAuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AssetController extends Controller
{
    public function __construct(
        protected AssetService $assetService,
        protected AssetCodeService $assetCodeService,
        protected DownloadAuditService $auditService
    ) {}

    /**
     * Display a listing of all assets.
     */
    public function index(): InertiaResponse
    {
        $assets = $this->assetService->getAllAssets(10);

        return Inertia::render('Admin/Assets/Index', [
            'assets' => $assets,
        ]);
    }

    /**
     * Show the form for creating a new asset.
     */
    public function create(): InertiaResponse
    {
        $models = explode(',', env('OPENROUTER_MODELS', 'openai/gpt-4o-mini'));
        $models = array_map('trim', $models);

        return Inertia::render('Admin/Assets/Create', [
            'availableModels' => array_filter($models),
        ]);
    }

    /**
     * Store a newly created asset in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'file' => ['required', 'file', 'max:102400'], // 100MB max
            'type' => ['required', 'in:free,paid'],
            'price' => ['required_if:type,paid', 'integer', 'min:0'],
            'is_published' => ['boolean'],
            'specifications' => ['nullable', 'array'],
        ]);

        $validated['is_published'] = $validated['is_published'] ?? false;
        $validated['download_count'] = 0;

        $asset = $this->assetService->createAsset($validated);

        return redirect()
            ->route('admin.assets.show', $asset)
            ->with('success', 'Asset created successfully.');
    }


    /**
     * Display the specified asset.
     */
    public function show(DownloadableAsset $asset): InertiaResponse
    {
        $asset->loadCount('assetCodes');
        
        // Get code statistics
        $codeStats = [
            'total' => $asset->assetCodes()->count(),
            'used' => $asset->assetCodes()->where('is_used', true)->count(),
            'unused' => $asset->assetCodes()->where('is_used', false)->count(),
        ];

        return Inertia::render('Admin/Assets/Show', [
            'asset' => $asset,
            'codeStats' => $codeStats,
        ]);
    }

    /**
     * Show the form for editing the specified asset.
     */
    public function edit(DownloadableAsset $asset): InertiaResponse
    {
        $models = explode(',', env('OPENROUTER_MODELS', 'openai/gpt-4o-mini'));
        $models = array_map('trim', $models);

        return Inertia::render('Admin/Assets/Edit', [
            'asset' => $asset,
            'availableModels' => array_filter($models),
        ]);
    }

    /**
     * Update the specified asset in storage.
     */
    public function update(Request $request, DownloadableAsset $asset): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('downloadable_assets')->ignore($asset->id),
            ],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'file' => ['nullable', 'file', 'max:102400'], // 100MB max
            'type' => ['required', 'in:free,paid'],
            'price' => ['required_if:type,paid', 'integer', 'min:0'],
            'is_published' => ['boolean'],
            'is_redemption_required' => ['boolean'],
            'specifications' => ['nullable', 'array'],
        ]);

        $validated['is_published'] = $validated['is_published'] ?? false;
        $validated['is_redemption_required'] = $validated['is_redemption_required'] ?? false;

        $this->assetService->updateAsset($asset, $validated);

        return redirect()
            ->route('admin.assets.show', $asset)
            ->with('success', 'Asset updated successfully.');
    }

    /**
     * Remove the specified asset from storage.
     */
    public function destroy(DownloadableAsset $asset): RedirectResponse
    {
        $this->assetService->deleteAsset($asset);

        return redirect()
            ->route('admin.assets.index')
            ->with('success', 'Asset deleted successfully.');
    }

    /**
     * Generate codes for a paid or redemption-required asset.
     */
    public function generateCodes(Request $request, DownloadableAsset $asset): RedirectResponse|\Illuminate\Http\JsonResponse
    {
        // Verify asset allows code generation
        if ($asset->isFree() && !$asset->is_redemption_required) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Codes can only be generated for paid assets or free assets with redemption required.',
                ], 400);
            }
            return redirect()
                ->back()
                ->with('error', 'Codes can only be generated for paid assets or free assets with redemption required.');
        }

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        // Generate codes
        $codes = $this->assetCodeService->generateCodes($asset, $validated['quantity']);

        // Log the code generation
        $this->auditService->logAttempt(
            $asset,
            auth()->user(),
            $request->ip(),
            $request->userAgent() ?? 'Unknown',
            'code_generation',
            'success',
            "Generated {$validated['quantity']} codes"
        );

        // Return codes (only shown once)
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Codes generated successfully.',
                'codes' => $codes->pluck('code')->toArray(),
            ]);
        }

        return redirect()
            ->route('admin.assets.show', $asset)
            ->with('success', "Generated {$validated['quantity']} codes successfully.")
            ->with('generatedCodes', $codes->pluck('code')->toArray());
    }

    /**
     * Export codes for an asset with audit logging.
     */
    public function exportCodes(Request $request, DownloadableAsset $asset): Response
    {
        // Verify asset is paid type
        if ($asset->isFree()) {
            abort(400, 'Codes can only be exported for paid assets.');
        }

        // Get unused codes (we can only export unused codes for security)
        $unusedCodes = $asset->assetCodes()
            ->where('is_used', false)
            ->get();

        if ($unusedCodes->isEmpty()) {
            abort(404, 'No unused codes available for export.');
        }

        // Log the export action
        $this->auditService->logAttempt(
            $asset,
            auth()->user(),
            $request->ip(),
            $request->userAgent() ?? 'Unknown',
            'code_export',
            'success',
            "Exported {$unusedCodes->count()} unused codes"
        );

        // Generate CSV content
        $csvContent = "Code,Created At,Expires At\n";
        
        // Note: We cannot export the actual codes since they are hashed
        // This export is for tracking purposes only
        foreach ($unusedCodes as $code) {
            $csvContent .= sprintf(
                "%s,%s,%s\n",
                $code->code_prefix . '****',
                $code->created_at->format('Y-m-d H:i:s'),
                $code->expires_at ? $code->expires_at->format('Y-m-d H:i:s') : 'N/A'
            );
        }

        $filename = sprintf(
            'asset_%d_codes_%s.csv',
            $asset->id,
            now()->format('Y-m-d_His')
        );

        return response($csvContent, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
        ]);
    }

    /**
     * View codes for an asset (admin only).
     */
    public function codes(DownloadableAsset $asset): InertiaResponse
    {
        $codes = $asset->assetCodes()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Assets/Codes', [
            'asset' => $asset,
            'codes' => $codes,
        ]);
    }

    /**
     * Download the asset file.
     */
    public function download(DownloadableAsset $asset)
    {
        if (!$asset->file_path || !\Illuminate\Support\Facades\Storage::disk('s3')->exists($asset->file_path)) {
            abort(404, 'File not found.');
        }

        return \Illuminate\Support\Facades\Storage::disk('s3')->download($asset->file_path, $asset->file_name);
    }

    /**
     * Generate AI Asset Content (Description & Specifications)
     */
    public function generate(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'tone' => 'required|string',
            'level' => 'required|string',
            'max_words' => 'required|string',
            'model' => 'nullable|string',
            'brief' => 'nullable|string',
        ]);

        $apiKey = env('OPENROUTER_API_KEY');
        $baseUrl = env('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1');
        
        $allowedModels = explode(',', env('OPENROUTER_MODELS', 'openai/gpt-4o-mini'));
        $allowedModels = array_map('trim', $allowedModels);
        
        $model = $request->model && in_array($request->model, $allowedModels) 
                 ? $request->model 
                 : ($allowedModels[0] ?? 'openai/gpt-4o-mini');

        if (empty($apiKey)) {
            return response()->json(['error' => 'API Key OpenRouter tidak ditemukan di konfigurasi.'], 500);
        }

        $prompt = "Buatkan deskripsi dan spesifikasi untuk produk digital (asset) dengan detail berikut:\n" .
                  "- Judul Produk: {$request->title}\n" .
                  "- Gaya Bahasa: {$request->tone}\n" .
                  "- Level Pengguna: {$request->level}\n" .
                  "- Panjang Maksimal Deskripsi: Sekitar {$request->max_words} kata.\n";
                  
        if ($request->filled('brief')) {
            $prompt .= "- Brief Tambahan (PENTING): {$request->brief}\n";
        }

        $prompt .= "\nInstruksi WAJIB:\n" .
                  "1. Artikel ditulis dalam bahasa Indonesia yang baik.\n" .
                  "2. Bagian \"description\" berupa teks biasa (bisa mengandung newline atau paragraf).\n" .
                  "3. Bagian \"specifications\" berupa array string. Setiap string adalah satu poin fitur/spesifikasi unggulan, boleh menyertakan emoji.\n" .
                  "4. Kamu HARUS membalas SECARA KETAT hanya dalam format JSON murni yang valid tanpa teks pembuka/penutup apapun.\n" .
                  "5. Format JSON persis seperti ini:\n" .
                  "{\n" .
                  "  \"description\": \"<teks deskripsi lengkap>\",\n" .
                  "  \"specifications\": [\n" .
                  "    \"<spesifikasi 1>\",\n" .
                  "    \"<spesifikasi 2>\"\n" .
                  "  ]\n" .
                  "}\n" .
                  "6. JANGAN bungkus dalam markdown (```json). Langsung mulai dengan { dan akhiri dengan }.";

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
                
                $cleanContent = preg_replace('/^```(?:json)?\s*/i', '', trim($rawContent));
                $cleanContent = preg_replace('/\s*```$/', '', $cleanContent);
                $cleanContent = trim($cleanContent);
                
                $parsed = json_decode($cleanContent, true);
                
                if (json_last_error() === JSON_ERROR_NONE && isset($parsed['description']) && isset($parsed['specifications'])) {
                    return response()->json([
                        'description' => trim($parsed['description']),
                        'specifications' => $parsed['specifications'],
                    ]);
                }
                
                return response()->json([
                    'error' => 'Gagal memparsing JSON atau atribut kurang.',
                    'raw' => $cleanContent
                ], 500);
            }

            return response()->json([
                'error' => 'Gagal generate konten.', 
                'details' => $response->json()
            ], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan sistem: ' . $e->getMessage()], 500);
        }
    }
}
