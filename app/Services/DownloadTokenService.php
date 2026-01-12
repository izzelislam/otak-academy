<?php

namespace App\Services;

use App\Models\DownloadableAsset;
use App\Models\DownloadToken;
use App\Models\User;

class DownloadTokenService
{
    /**
     * Token expiry time in minutes.
     */
    protected const TOKEN_EXPIRY_MINUTES = 5;

    /**
     * Generate a secure download token with HMAC signature.
     *
     * @param DownloadableAsset $asset
     * @param User|null $user
     * @param string $ipAddress
     * @return string
     */
    public function generateToken(
        DownloadableAsset $asset,
        ?User $user,
        string $ipAddress
    ): string {
        $nonce = bin2hex(random_bytes(16));
        $timestamp = time();
        $userId = $user?->id ?? 0;

        $payload = json_encode([
            'a' => $asset->id,
            'u' => $userId,
            'i' => hash('sha256', $ipAddress),
            't' => $timestamp,
            'n' => $nonce,
        ]);

        $signature = hash_hmac('sha256', $payload, config('app.key'));
        $token = base64_encode($payload) . '.' . $signature;

        // Store token in database for replay prevention
        DownloadToken::create([
            'token_hash' => hash('sha256', $token),
            'asset_id' => $asset->id,
            'user_id' => $user?->id,
            'ip_address' => $ipAddress,
            'nonce' => $nonce,
            'expires_at' => now()->addMinutes(self::TOKEN_EXPIRY_MINUTES),
            'consumed_at' => null,
        ]);

        return $token;
    }


    /**
     * Validate a token and return the asset if valid.
     *
     * @param string $token
     * @param string $ipAddress
     * @return DownloadableAsset|null
     */
    public function validateToken(string $token, string $ipAddress): ?DownloadableAsset
    {
        // Parse token
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            return null;
        }

        [$encodedPayload, $providedSignature] = $parts;

        // Decode payload
        $payload = base64_decode($encodedPayload, true);
        if ($payload === false) {
            return null;
        }

        // Verify HMAC signature using constant-time comparison
        $expectedSignature = hash_hmac('sha256', $payload, config('app.key'));
        if (!hash_equals($expectedSignature, $providedSignature)) {
            return null;
        }

        // Parse payload data
        $data = json_decode($payload, true);
        if (!$data || !isset($data['a'], $data['u'], $data['i'], $data['t'], $data['n'])) {
            return null;
        }

        // Verify IP address binding
        $expectedIpHash = hash('sha256', $ipAddress);
        if (!hash_equals($expectedIpHash, $data['i'])) {
            return null;
        }

        // Check token expiry (5 minutes)
        $tokenAge = time() - $data['t'];
        if ($tokenAge > (self::TOKEN_EXPIRY_MINUTES * 60) || $tokenAge < 0) {
            return null;
        }

        // Find token in database and check if consumed
        $tokenHash = hash('sha256', $token);
        $downloadToken = DownloadToken::where('token_hash', $tokenHash)
            ->where('nonce', $data['n'])
            ->first();

        if (!$downloadToken) {
            return null;
        }

        // Check if token is expired or already consumed
        if ($downloadToken->isExpired() || $downloadToken->isConsumed()) {
            return null;
        }

        // Return the asset
        return DownloadableAsset::find($data['a']);
    }

    /**
     * Consume a token to prevent replay attacks.
     *
     * @param string $token
     * @return bool
     */
    public function consumeToken(string $token): bool
    {
        $tokenHash = hash('sha256', $token);

        $downloadToken = DownloadToken::where('token_hash', $tokenHash)
            ->whereNull('consumed_at')
            ->first();

        if (!$downloadToken) {
            return false;
        }

        return $downloadToken->consume();
    }

    /**
     * Check if a token has been consumed.
     *
     * @param string $token
     * @return bool
     */
    public function isTokenConsumed(string $token): bool
    {
        $tokenHash = hash('sha256', $token);

        $downloadToken = DownloadToken::where('token_hash', $tokenHash)->first();

        return $downloadToken && $downloadToken->isConsumed();
    }

    /**
     * Clean up expired tokens.
     *
     * @return int Number of deleted tokens
     */
    public function cleanupExpiredTokens(): int
    {
        return DownloadToken::expired()->delete();
    }
}
