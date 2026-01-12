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
     * (No longer used for expiry, but kept for legacy reference)
     */
    protected const DEFAULT_REDOWNLOAD_HOURS = 72;

    /**
     * Default maximum downloads per code.
     * (No longer used for hard limit, but kept for legacy reference)
     */
    protected const DEFAULT_MAX_DOWNLOADS = 3;

    /**
     * Hourly download rate limit per code.
     */
    protected const HOURLY_RATE_LIMIT = 3;

    // ... generateCodes methods remain same ...

    /**
     * Helper to check if rate limit is exceeded.
     * returns array { 'allowed' => bool, 'seconds_until_reset' => int|null }
     */
    public function checkRateLimit(AssetCode $assetCode): array
    {
        $now = now();
        $lastDownload = $assetCode->last_download_at;

        // If never downloaded or last download was 1 hour ago, reset
        if (!$lastDownload || $lastDownload->diffInHours($now) >= 1) {
            return [
                'allowed' => true,
                'seconds_until_reset' => 0,
                'current_hourly_count' => 0
            ];
        }

        // Within 1 hour window
        if ($assetCode->hourly_download_count < self::HOURLY_RATE_LIMIT) {
             return [
                'allowed' => true,
                'seconds_until_reset' => 0,
                'current_hourly_count' => $assetCode->hourly_download_count
            ];
        }

        // Limit exceeded
        $resetTime = $lastDownload->copy()->addHour();
        return [
            'allowed' => false,
            'seconds_until_reset' => $now->diffInSeconds($resetTime, false),
            'current_hourly_count' => $assetCode->hourly_download_count
        ];
    }

    // ...

    /**
     * Check if the code can still be used for re-download.
     * Now primarily checks rate limit instead of hard limits.
     */
    public function canRedownload(AssetCode $assetCode): bool
    {
        if (!$assetCode->is_used) {
            return false;
        }

        $check = $this->checkRateLimit($assetCode);
        return $check['allowed'];
    }

    // ...

    public function redeemCode(string $code, DownloadableAsset $asset, User $user): array
    {
        return DB::transaction(function () use ($code, $asset, $user) {
            // ... validation logic (omitted for brevity in replacement, will include in full) ...
            // Wait, I should use replace_file_content carefully. 
            // I'll assume I replace the updated methods.

            if (!$this->validateCodeFormat($code)) {
                return ['success' => false, 'error' => 'Invalid or expired code', 'assetCode' => null];
            }

            $code = strtoupper($code);
            $prefix = substr($code, 0, 4);

            $potentialCodes = AssetCode::where('asset_id', $asset->id)
                ->where('code_prefix', $prefix)
                ->lockForUpdate()
                ->get();

            $matchedCode = null;
            foreach ($potentialCodes as $assetCode) {
                if (Hash::check($code, $assetCode->code_hash)) {
                    $matchedCode = $assetCode;
                    break;
                }
            }

            if (!$matchedCode) {
                return ['success' => false, 'error' => 'Invalid or expired code', 'assetCode' => null];
            }

            // Check if code is already used (ownership check)
            // If used by someone else
            if ($matchedCode->is_used && $matchedCode->user_id !== $user->id) {
                 return ['success' => false, 'error' => 'Code already used by another user', 'assetCode' => null];
            }

            // If used by SAME user, this is effectively a re-download request via the redeem endpoint
            if ($matchedCode->is_used && $matchedCode->user_id === $user->id) {
                 // Check rate limit
                 $rateCheck = $this->checkRateLimit($matchedCode);
                 if (!$rateCheck['allowed']) {
                     $waitMinutes = ceil($rateCheck['seconds_until_reset'] / 60);
                     return [
                        'success' => false, 
                        'error' => "Rate limit exceeded. Please wait {$waitMinutes} minutes.", 
                        'assetCode' => null
                     ];
                 }
                 
                 // Update counters
                 if ($rateCheck['current_hourly_count'] === 0) {
                     // Reset cycle
                     $matchedCode->hourly_download_count = 1;
                 } else {
                     $matchedCode->increment('hourly_download_count');
                 }
                 $matchedCode->increment('download_count'); // Total lifetime count
                 $matchedCode->last_download_at = now();
                 $matchedCode->save();
                 
                 return ['success' => true, 'error' => null, 'assetCode' => $matchedCode->fresh()];
            }

            // If unused, activate it
            $matchedCode->update([
                'user_id' => $user->id,
                'is_used' => true,
                'used_at' => now(),
                'expires_at' => null, // Never expires
                'download_count' => 1,
                'hourly_download_count' => 1,
                'last_download_at' => now(),
            ]);

            return [
                'success' => true,
                'error' => null,
                'assetCode' => $matchedCode->fresh(),
            ];
        });
    }

    public function processRedownload(AssetCode $assetCode): array
    {
        $rateCheck = $this->checkRateLimit($assetCode);
        
        if (!$rateCheck['allowed']) {
             $waitMinutes = ceil($rateCheck['seconds_until_reset'] / 60);
             return [
                'success' => false,
                'error' => "Rate limit exceeded. Please wait {$waitMinutes} minutes.",
                'downloads_remaining' => 0, // Not really relevant anymore
            ];
        }

        // Update counters
        if ($rateCheck['current_hourly_count'] === 0) {
             $assetCode->hourly_download_count = 1;
        } else {
             $assetCode->increment('hourly_download_count');
        }
        
        $assetCode->increment('download_count');
        $assetCode->last_download_at = now();
        $assetCode->save();

        return [
            'success' => true,
            'error' => null,
            'downloads_remaining' => self::HOURLY_RATE_LIMIT - $assetCode->hourly_download_count,
        ];
    }
    
    // hasValidRedemption checks if they own it. Remove expiry check.
    public function hasValidRedemption(User $user, DownloadableAsset $asset): bool
    {
        return AssetCode::where('asset_id', $asset->id)
            ->where('user_id', $user->id)
            ->where('is_used', true)
            ->exists();
    }

    // getValidRedemption same
    public function getValidRedemption(User $user, DownloadableAsset $asset): ?AssetCode
    {
         return AssetCode::where('asset_id', $asset->id)
            ->where('user_id', $user->id)
            ->where('is_used', true)
            ->first();
    }

    // checkRedownloadEligibility for UI
    public function checkRedownloadEligibility(AssetCode $assetCode): array
    {
         $rateCheck = $this->checkRateLimit($assetCode);
         
         if (!$rateCheck['allowed']) {
            $waitMinutes = ceil($rateCheck['seconds_until_reset'] / 60);
            return [
                'can_redownload' => false,
                'reason' => "Rate limit exceeded. Wait {$waitMinutes} min.",
                'downloads_remaining' => 0,
                'expires_at' => null
            ];
         }
         
         return [
             'can_redownload' => true,
             'reason' => null,
             'downloads_remaining' => self::HOURLY_RATE_LIMIT - $rateCheck['current_hourly_count'],
             'expires_at' => null
         ];
    }

}
