<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AssetRateLimiter
{
    /**
     * Rate limit configurations
     */
    protected const CODE_VALIDATION_MAX_ATTEMPTS = 5;
    protected const CODE_VALIDATION_DECAY_MINUTES = 1;
    
    protected const DOWNLOAD_MAX_ATTEMPTS = 10;
    protected const DOWNLOAD_DECAY_MINUTES = 1;
    
    protected const COOLDOWN_MINUTES = 15;

    protected RateLimiter $limiter;

    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $type  The type of rate limiting: 'code' or 'download'
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, string $type = 'code'): Response
    {
        $key = $this->resolveRequestKey($request, $type);
        
        // Check if IP is in cooldown
        if ($this->isInCooldown($request->ip(), $type)) {
            return $this->buildCooldownResponse($request->ip(), $type);
        }

        $maxAttempts = $this->getMaxAttempts($type);
        $decayMinutes = $this->getDecayMinutes($type);

        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            // Trigger cooldown period
            $this->triggerCooldown($request->ip(), $type);
            
            return $this->buildTooManyAttemptsResponse($key, $maxAttempts);
        }

        $this->limiter->hit($key, $decayMinutes * 60);

        $response = $next($request);

        return $this->addRateLimitHeaders(
            $response,
            $maxAttempts,
            $this->calculateRemainingAttempts($key, $maxAttempts)
        );
    }

    /**
     * Resolve the request key for rate limiting.
     */
    protected function resolveRequestKey(Request $request, string $type): string
    {
        return sprintf('asset_rate_limit:%s:%s', $type, $request->ip());
    }

    /**
     * Get the maximum number of attempts for the given type.
     */
    protected function getMaxAttempts(string $type): int
    {
        return match ($type) {
            'code' => self::CODE_VALIDATION_MAX_ATTEMPTS,
            'download' => self::DOWNLOAD_MAX_ATTEMPTS,
            default => self::CODE_VALIDATION_MAX_ATTEMPTS,
        };
    }

    /**
     * Get the decay time in minutes for the given type.
     */
    protected function getDecayMinutes(string $type): int
    {
        return match ($type) {
            'code' => self::CODE_VALIDATION_DECAY_MINUTES,
            'download' => self::DOWNLOAD_DECAY_MINUTES,
            default => self::CODE_VALIDATION_DECAY_MINUTES,
        };
    }

    /**
     * Check if the IP is currently in cooldown.
     */
    protected function isInCooldown(string $ip, string $type): bool
    {
        $cooldownKey = $this->getCooldownKey($ip, $type);
        return $this->limiter->attempts($cooldownKey) > 0;
    }

    /**
     * Trigger the cooldown period for an IP.
     */
    protected function triggerCooldown(string $ip, string $type): void
    {
        $cooldownKey = $this->getCooldownKey($ip, $type);
        $this->limiter->hit($cooldownKey, self::COOLDOWN_MINUTES * 60);
    }

    /**
     * Get the cooldown cache key.
     */
    protected function getCooldownKey(string $ip, string $type): string
    {
        return sprintf('asset_cooldown:%s:%s', $type, $ip);
    }

    /**
     * Calculate remaining attempts.
     */
    protected function calculateRemainingAttempts(string $key, int $maxAttempts): int
    {
        return $this->limiter->remaining($key, $maxAttempts);
    }

    /**
     * Get the number of seconds until the rate limit resets.
     */
    protected function getRetryAfter(string $key): int
    {
        return $this->limiter->availableIn($key);
    }

    /**
     * Build the response for too many attempts.
     */
    protected function buildTooManyAttemptsResponse(string $key, int $maxAttempts): Response
    {
        $retryAfter = $this->getRetryAfter($key);

        return response()->json([
            'message' => 'Too many attempts. Please try again later.',
            'retry_after' => $retryAfter,
        ], 429)->withHeaders([
            'Retry-After' => $retryAfter,
            'X-RateLimit-Limit' => $maxAttempts,
            'X-RateLimit-Remaining' => 0,
        ]);
    }

    /**
     * Build the response when IP is in cooldown.
     */
    protected function buildCooldownResponse(string $ip, string $type): Response
    {
        $cooldownKey = $this->getCooldownKey($ip, $type);
        $retryAfter = $this->limiter->availableIn($cooldownKey);

        return response()->json([
            'message' => 'Too many attempts. Please try again later.',
            'retry_after' => $retryAfter,
        ], 429)->withHeaders([
            'Retry-After' => $retryAfter,
            'X-RateLimit-Limit' => 0,
            'X-RateLimit-Remaining' => 0,
        ]);
    }

    /**
     * Add rate limit headers to the response.
     */
    protected function addRateLimitHeaders(Response $response, int $maxAttempts, int $remainingAttempts): Response
    {
        $response->headers->add([
            'X-RateLimit-Limit' => $maxAttempts,
            'X-RateLimit-Remaining' => $remainingAttempts,
        ]);

        return $response;
    }

    /**
     * Clear rate limit for an IP (useful for testing or admin override).
     */
    public function clearRateLimit(string $ip, string $type): void
    {
        $key = sprintf('asset_rate_limit:%s:%s', $type, $ip);
        $cooldownKey = $this->getCooldownKey($ip, $type);
        
        $this->limiter->clear($key);
        $this->limiter->clear($cooldownKey);
    }

    /**
     * Get the cooldown period in minutes.
     */
    public static function getCooldownMinutes(): int
    {
        return self::COOLDOWN_MINUTES;
    }

    /**
     * Get the max attempts for code validation.
     */
    public static function getCodeValidationMaxAttempts(): int
    {
        return self::CODE_VALIDATION_MAX_ATTEMPTS;
    }

    /**
     * Get the max attempts for downloads.
     */
    public static function getDownloadMaxAttempts(): int
    {
        return self::DOWNLOAD_MAX_ATTEMPTS;
    }
}
