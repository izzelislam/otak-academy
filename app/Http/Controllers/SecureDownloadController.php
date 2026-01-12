<?php

namespace App\Http\Controllers;

use App\Services\AssetService;
use App\Services\DownloadAuditService;
use App\Services\DownloadTokenService;
use App\Utilities\PathValidator;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;

class SecureDownloadController extends Controller
{
    public function __construct(
        protected DownloadTokenService $downloadTokenService,
        protected AssetService $assetService,
        protected DownloadAuditService $auditService
    ) {}

    /**
     * Download a file using a secure token.
     * Validates token, serves file through controller, and logs the activity.
     */
    public function download(Request $request, string $token): BinaryFileResponse|Response
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent() ?? 'Unknown';

        // Validate the token
        $asset = $this->downloadTokenService->validateToken($token, $ipAddress);

        if (!$asset) {
            // Log failed attempt (we don't have asset info, so log with null)
            // This is a security measure - don't reveal why validation failed
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        // Validate file path to prevent directory traversal
        if (!PathValidator::validateFilePath($asset->file_path)) {
            $this->auditService->logAttempt(
                $asset,
                auth()->user(),
                $ipAddress,
                $userAgent,
                'download_request',
                'failed',
                'Path validation failed'
            );

            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        // Check if file exists
        if (!$this->assetService->fileExists($asset)) {
            $this->auditService->logAttempt(
                $asset,
                auth()->user(),
                $ipAddress,
                $userAgent,
                'download_request',
                'failed',
                'File not found on disk'
            );

            return response()->json([
                'message' => 'File not found',
            ], 404);
        }

        // Consume the token to prevent replay attacks
        $consumed = $this->downloadTokenService->consumeToken($token);

        if (!$consumed) {
            $this->auditService->logAttempt(
                $asset,
                auth()->user(),
                $ipAddress,
                $userAgent,
                'download_request',
                'failed',
                'Token already consumed'
            );

            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        // Get the full file path
        $filePath = $this->assetService->getFilePath($asset);

        // Increment download counter
        $this->assetService->incrementDownloadCount($asset);

        // Log successful download
        $this->auditService->logAttempt(
            $asset,
            auth()->user(),
            $ipAddress,
            $userAgent,
            'download_complete',
            'success',
            'File downloaded successfully'
        );

        // Serve the file with security headers
        return $this->serveFile($filePath, $asset->file_name, $asset->file_type);
    }

    /**
     * Serve the file with appropriate headers.
     */
    protected function serveFile(string $filePath, string $fileName, string $mimeType): BinaryFileResponse
    {
        $response = response()->download($filePath, $fileName, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            // Content Security Policy headers
            'Content-Security-Policy' => "default-src 'none'; frame-ancestors 'none'",
            'X-Content-Type-Options' => 'nosniff',
            'X-Frame-Options' => 'DENY',
            'X-XSS-Protection' => '1; mode=block',
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
        ]);

        return $response;
    }
}
