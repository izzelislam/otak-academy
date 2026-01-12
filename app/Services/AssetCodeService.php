<?php

namespace App\Services;

use App\Models\AssetCode;
use App\Models\DownloadableAsset;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AssetCodeService
{
    /**
     * Default re-download window in hours.
     */
    protected const DEFAULT_REDOWNLOAD_HOURS = 72;

    /**
     * Default maximum downloads per code.
     */
    protected const DEFAULT_MAX_DOWNLOADS = 3;

    /**
     * Generate cryptographically secure codes for an asset.
     * Format: DL{asset_id_padded}-{random_8_chars}-{checksum_2_chars}
     *
     * @param DownloadableAsset $asset
     * @param int $quantity
     * @return Collection<int, array{code: string, assetCode: AssetCode}>
     */
    public function generateCodes(DownloadableAsset $asset, int $quantity): Collection
    {
        $codes = collect();

        for ($i = 0; $i < $quantity; $i++) {
            $plainCode = $this->generateSecureCode($asset);
            
            $assetCode = AssetCode::create([
                'asset_id' => $asset->id,
                'code_hash' => Hash::make($plainCode),
                'code_prefix' => substr($plainCode, 0, 4),
                'user_id' => null,
                'is_used' => false,
                'used_at' => null,
                'expires_at' => null,
                'download_count' => 0,
                'max_downloads' => self::DEFAULT_MAX_DOWNLOADS,
            ]);

            $codes->push([
                'code' => $plainCode,
                'assetCode' => $assetCode,
            ]);
        }

        return $codes;
    }

    /**
     * Generate a single secure code with checksum.
     *
     * @param DownloadableAsset $asset
     * @return string
     */
    protected function generateSecureCode(DownloadableAsset $asset): string
    {
        $assetPrefix = 'DL' . str_pad((string) $asset->id, 3, '0', STR_PAD_LEFT);
        $random = strtoupper(bin2hex(random_bytes(4)));
        $payload = $assetPrefix . '-' . $random;
        $checksum = $this->calculateChecksum($payload);

        return $payload . '-' . $checksum;
    }


    /**
     * Calculate checksum for code validation.
     *
     * @param string $payload
     * @return string
     */
    protected function calculateChecksum(string $payload): string
    {
        return strtoupper(substr(hash('crc32', $payload . config('app.key')), 0, 2));
    }

    /**
     * Validate code format and checksum.
     *
     * @param string $code
     * @return bool
     */
    public function validateCodeFormat(string $code): bool
    {
        // Format: DL{3digits}-{8hex}-{2hex}
        if (!preg_match('/^DL\d{3}-[A-F0-9]{8}-[A-F0-9]{2}$/i', $code)) {
            return false;
        }

        // Verify checksum
        $parts = explode('-', strtoupper($code));
        if (count($parts) !== 3) {
            return false;
        }

        $payload = $parts[0] . '-' . $parts[1];
        $providedChecksum = $parts[2];
        $expectedChecksum = $this->calculateChecksum($payload);

        return hash_equals($expectedChecksum, $providedChecksum);
    }

    /**
     * Validate a code using constant-time comparison.
     *
     * @param string $code
     * @param DownloadableAsset $asset
     * @return array{valid: bool, error: string|null, assetCode: AssetCode|null}
     */
    public function validateCode(string $code, DownloadableAsset $asset): array
    {
        // First validate format
        if (!$this->validateCodeFormat($code)) {
            return [
                'valid' => false,
                'error' => 'Invalid or expired code',
                'assetCode' => null,
            ];
        }

        $code = strtoupper($code);
        $prefix = substr($code, 0, 4);

        // Find potential matches by prefix for optimization
        $potentialCodes = AssetCode::where('asset_id', $asset->id)
            ->where('code_prefix', $prefix)
            ->get();

        // Use constant-time comparison via password_verify
        foreach ($potentialCodes as $assetCode) {
            if (Hash::check($code, $assetCode->code_hash)) {
                // Code found - check if it's usable
                if ($assetCode->is_used && !$assetCode->canRedownload()) {
                    // Return generic error to not reveal code status
                    return [
                        'valid' => false,
                        'error' => 'Invalid or expired code',
                        'assetCode' => null,
                    ];
                }

                return [
                    'valid' => true,
                    'error' => null,
                    'assetCode' => $assetCode,
                ];
            }
        }

        // Code not found - return generic error
        return [
            'valid' => false,
            'error' => 'Invalid or expired code',
            'assetCode' => null,
        ];
    }


    /**
     * Redeem a code with database transaction and row locking.
     *
     * @param string $code
     * @param DownloadableAsset $asset
     * @param User $user
     * @return array{success: bool, error: string|null, assetCode: AssetCode|null}
     */
    public function redeemCode(string $code, DownloadableAsset $asset, User $user): array
    {
        return DB::transaction(function () use ($code, $asset, $user) {
            // First validate format
            if (!$this->validateCodeFormat($code)) {
                return [
                    'success' => false,
                    'error' => 'Invalid or expired code',
                    'assetCode' => null,
                ];
            }

            $code = strtoupper($code);
            $prefix = substr($code, 0, 4);

            // Find potential matches with row locking
            $potentialCodes = AssetCode::where('asset_id', $asset->id)
                ->where('code_prefix', $prefix)
                ->lockForUpdate()
                ->get();

            $matchedCode = null;

            // Use constant-time comparison
            foreach ($potentialCodes as $assetCode) {
                if (Hash::check($code, $assetCode->code_hash)) {
                    $matchedCode = $assetCode;
                    break;
                }
            }

            if (!$matchedCode) {
                return [
                    'success' => false,
                    'error' => 'Invalid or expired code',
                    'assetCode' => null,
                ];
            }

            // Check if code is already used and cannot be re-downloaded
            if ($matchedCode->is_used && !$matchedCode->canRedownload()) {
                return [
                    'success' => false,
                    'error' => 'Invalid or expired code',
                    'assetCode' => null,
                ];
            }

            // If code is being used for the first time
            if (!$matchedCode->is_used) {
                $matchedCode->update([
                    'user_id' => $user->id,
                    'is_used' => true,
                    'used_at' => now(),
                    'expires_at' => now()->addHours(self::DEFAULT_REDOWNLOAD_HOURS),
                    'download_count' => 1,
                ]);
            } else {
                // Re-download - increment counter
                $matchedCode->increment('download_count');
            }

            return [
                'success' => true,
                'error' => null,
                'assetCode' => $matchedCode->fresh(),
            ];
        });
    }

    /**
     * Check if a user has a valid redemption for an asset.
     *
     * @param User $user
     * @param DownloadableAsset $asset
     * @return bool
     */
    public function hasValidRedemption(User $user, DownloadableAsset $asset): bool
    {
        return AssetCode::where('asset_id', $asset->id)
            ->where('user_id', $user->id)
            ->where('is_used', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->where(function ($query) {
                $query->whereColumn('download_count', '<', 'max_downloads');
            })
            ->exists();
    }

    /**
     * Get the user's valid redemption for an asset.
     *
     * @param User $user
     * @param DownloadableAsset $asset
     * @return AssetCode|null
     */
    public function getValidRedemption(User $user, DownloadableAsset $asset): ?AssetCode
    {
        return AssetCode::where('asset_id', $asset->id)
            ->where('user_id', $user->id)
            ->where('is_used', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->where(function ($query) {
                $query->whereColumn('download_count', '<', 'max_downloads');
            })
            ->first();
    }

    /**
     * Process a re-download for an existing valid redemption.
     * Increments the download count and checks limits.
     *
     * @param AssetCode $assetCode
     * @return array{success: bool, error: string|null, downloads_remaining: int}
     */
    public function processRedownload(AssetCode $assetCode): array
    {
        // Verify the code can still be re-downloaded
        if (!$assetCode->canRedownload()) {
            return [
                'success' => false,
                'error' => 'Download limit reached or code expired',
                'downloads_remaining' => 0,
            ];
        }

        // Increment download count
        $assetCode->increment('download_count');
        $assetCode->refresh();

        return [
            'success' => true,
            'error' => null,
            'downloads_remaining' => $assetCode->max_downloads - $assetCode->download_count,
        ];
    }

    /**
     * Check if a code can be re-downloaded based on download_count and expires_at.
     *
     * @param AssetCode $assetCode
     * @return array{can_redownload: bool, reason: string|null, downloads_remaining: int, expires_at: \Carbon\Carbon|null}
     */
    public function checkRedownloadEligibility(AssetCode $assetCode): array
    {
        if (!$assetCode->is_used) {
            return [
                'can_redownload' => false,
                'reason' => 'Code has not been redeemed yet',
                'downloads_remaining' => 0,
                'expires_at' => null,
            ];
        }

        // Check expiry time window
        if ($assetCode->expires_at && $assetCode->expires_at->isPast()) {
            return [
                'can_redownload' => false,
                'reason' => 'Re-download window has expired',
                'downloads_remaining' => 0,
                'expires_at' => $assetCode->expires_at,
            ];
        }

        // Check download count vs max_downloads
        $downloadsRemaining = $assetCode->max_downloads - $assetCode->download_count;
        if ($downloadsRemaining <= 0) {
            return [
                'can_redownload' => false,
                'reason' => 'Maximum download limit reached',
                'downloads_remaining' => 0,
                'expires_at' => $assetCode->expires_at,
            ];
        }

        return [
            'can_redownload' => true,
            'reason' => null,
            'downloads_remaining' => $downloadsRemaining,
            'expires_at' => $assetCode->expires_at,
        ];
    }
}
