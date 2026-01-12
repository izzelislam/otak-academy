<?php

namespace App\Http\Controllers;

use App\Models\DownloadableAsset;
use App\Services\AssetCodeService;
use App\Services\AssetService;
use App\Services\DownloadAuditService;
use App\Services\DownloadTokenService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssetController extends Controller
{
    public function __construct(
        protected AssetService $assetService,
        protected AssetCodeService $assetCodeService,
        protected DownloadTokenService $downloadTokenService,
        protected DownloadAuditService $auditService
    ) {}

    /**
     * Display a paginated list of published assets.
     */
    public function index(Request $request): Response
    {
        $type = $request->input('type');
        
        // Ensure we retrieve assets regardless of type if type is empty
        if ($type && in_array($type, ['free', 'paid'])) {
            $assets = $this->assetService->getPublishedAssetsByType($type, 12);
        } else {
            $assets = $this->assetService->getPublishedAssets(12);
        }

        // Just to be safe, let's explicitly make sure the collection is transformed if needed, 
        // but Inertia handles Paginator automatically.
        
        return Inertia::render('Assets/Index', [
            'assets' => $assets,
            'currentType' => $type,
        ]);
    }

    /**
     * Display a single asset detail.
     */
    public function show(string $slug): Response
    {
        $asset = $this->assetService->getAssetBySlug($slug);

        if (!$asset) {
            abort(404, 'Asset not found.');
        }

        // Check if user has valid redemption for paid assets
        $hasValidRedemption = false;
        $redownloadInfo = null;
        
        if ($asset->isPaid() && auth()->check()) {
            $existingRedemption = $this->assetCodeService->getValidRedemption(
                auth()->user(),
                $asset
            );
            
            if ($existingRedemption) {
                $hasValidRedemption = true;
                $eligibility = $this->assetCodeService->checkRedownloadEligibility($existingRedemption);
                $redownloadInfo = [
                    'can_redownload' => $eligibility['can_redownload'],
                    'downloads_remaining' => $eligibility['downloads_remaining'],
                    'expires_at' => $eligibility['expires_at']?->toIso8601String(),
                    'reason' => $eligibility['reason'] ?? null,
                ];
            }
        }

        return Inertia::render('Assets/Show', [
            'asset' => $asset,
            'hasValidRedemption' => $hasValidRedemption,
            'redownloadInfo' => $redownloadInfo,
        ]);
    }


    /**
     * Request download for free assets.
     * Generates a time-limited download token.
     */
    public function requestDownload(Request $request, DownloadableAsset $asset): JsonResponse
    {
        // Verify asset is published
        if (!$asset->is_published) {
            return response()->json([
                'message' => 'Asset not found.',
            ], 404);
        }

        // Verify asset is free
        if ($asset->isPaid()) {
            return response()->json([
                'message' => 'This asset requires a valid code.',
            ], 403);
        }

        $ipAddress = $request->ip();
        $userAgent = $request->userAgent() ?? 'Unknown';
        $user = auth()->user();
        
        if (!$user) {
             return response()->json([
                'message' => 'Silahkan login terlebih dahulu untuk mendownload.',
                'needs_login' => true,
                'redirect' => route('login'), 
            ], 401);
        }

        // Log the download request
        $this->auditService->logAttempt(
            $asset,
            $user,
            $ipAddress,
            $userAgent,
            'download_request',
            'success',
            'Free asset download requested'
        );

        // Generate download token
        $token = $this->downloadTokenService->generateToken($asset, $user, $ipAddress);

        return response()->json([
            'message' => 'Download token generated.',
            'download_url' => route('download', ['token' => $token]),
        ]);
    }

    /**
     * Redeem a code for paid assets.
     * Validates the code and generates a download token.
     */
    public function redeemCode(Request $request, DownloadableAsset $asset): JsonResponse
    {
        $request->validate([
            'code' => ['nullable', 'string', 'max:50'],
        ]);

        // Verify asset is published
        if (!$asset->is_published) {
            return response()->json([
                'message' => 'Asset not found.',
            ], 404);
        }

        // Verify asset is paid
        if ($asset->isFree()) {
            return response()->json([
                'message' => 'This asset is free and does not require a code.',
            ], 400);
        }

        $ipAddress = $request->ip();
        $userAgent = $request->userAgent() ?? 'Unknown';
        $user = auth()->user();
        $code = strtoupper(trim($request->input('code')));

        // Check if user is authenticated (required for paid assets)
        if (!$user) {
            $this->auditService->logAttempt(
                $asset,
                null,
                $ipAddress,
                $userAgent,
                'code_attempt',
                'failed',
                'Unauthenticated user attempted code redemption'
            );

            return response()->json([
                'message' => 'Invalid or expired code.',
            ], 400);
        }

        // Check if user already has valid redemption
        $existingRedemption = $this->assetCodeService->getValidRedemption($user, $asset);
        if ($existingRedemption) {
            // Process re-download (increments download count)
            $redownloadResult = $this->assetCodeService->processRedownload($existingRedemption);
            
            if (!$redownloadResult['success']) {
                $this->auditService->logAttempt(
                    $asset,
                    $user,
                    $ipAddress,
                    $userAgent,
                    'code_attempt',
                    'failed',
                    'Re-download failed: ' . $redownloadResult['error']
                );

                return response()->json([
                    'message' => $redownloadResult['error'] ?? 'Invalid or expired code.',
                ], 400);
            }

            $this->auditService->logAttempt(
                $asset,
                $user,
                $ipAddress,
                $userAgent,
                'code_attempt',
                'success',
                'Re-download using existing redemption'
            );

            $token = $this->downloadTokenService->generateToken($asset, $user, $ipAddress);

            return response()->json([
                'message' => 'Download token generated.',
                'download_url' => route('download', ['token' => $token]),
                'downloads_remaining' => $redownloadResult['downloads_remaining'],
            ]);
        }

        // If no existing redemption, code is required
        if (empty($code)) {
            return response()->json([
                'message' => 'The code field is required.',
                'errors' => ['code' => ['The code field is required.']],
            ], 422);
        }

        // Attempt to redeem the code
        $result = $this->assetCodeService->redeemCode($code, $asset, $user);

        if (!$result['success']) {
            $this->auditService->logAttempt(
                $asset,
                $user,
                $ipAddress,
                $userAgent,
                'code_attempt',
                'failed',
                'Invalid code attempt'
            );

            // Return specific error if available (e.g. Rate limit), otherwise generic
            return response()->json([
                'message' => $result['error'] ?? 'Invalid or expired code.',
            ], 400);
        }

        // Code redeemed successfully
        $this->auditService->logAttempt(
            $asset,
            $user,
            $ipAddress,
            $userAgent,
            'code_success',
            'success',
            'Code redeemed successfully'
        );

        // Generate download token
        $token = $this->downloadTokenService->generateToken($asset, $user, $ipAddress);

        return response()->json([
            'message' => 'Code redeemed successfully.',
            'download_url' => route('download', ['token' => $token]),
            'downloads_remaining' => $result['assetCode']->max_downloads - $result['assetCode']->download_count,
        ]);
    }

    /**
     * Search assets.
     */
    public function search(Request $request): Response
    {
        $query = $request->input('q', '');
        $assets = $this->assetService->searchAssets($query, 12);

        return Inertia::render('Assets/Search', [
            'assets' => $assets,
            'query' => $query,
        ]);
    }
}
