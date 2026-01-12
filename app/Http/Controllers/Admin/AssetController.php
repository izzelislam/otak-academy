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
        return Inertia::render('Admin/Assets/Create');
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
            'is_published' => ['boolean'],
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
        return Inertia::render('Admin/Assets/Edit', [
            'asset' => $asset,
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
            'is_published' => ['boolean'],
        ]);

        $validated['is_published'] = $validated['is_published'] ?? false;

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
     * Generate codes for a paid asset.
     */
    public function generateCodes(Request $request, DownloadableAsset $asset): RedirectResponse|\Illuminate\Http\JsonResponse
    {
        // Verify asset is paid type
        if ($asset->isFree()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Codes can only be generated for paid assets.',
                ], 400);
            }
            return redirect()
                ->back()
                ->with('error', 'Codes can only be generated for paid assets.');
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
}
