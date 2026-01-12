<?php

namespace App\Services;

use App\Models\DownloadableAsset;
use App\Models\DownloadAuditLog;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DownloadAuditService
{
    /**
     * Threshold for flagging suspicious activity (failed attempts per hour).
     */
    protected const SUSPICIOUS_THRESHOLD = 10;

    /**
     * Log a download-related attempt.
     *
     * @param DownloadableAsset $asset
     * @param User|null $user
     * @param string $ipAddress
     * @param string $userAgent
     * @param string $action
     * @param string $result
     * @param string|null $details
     * @return DownloadAuditLog
     */
    public function logAttempt(
        DownloadableAsset $asset,
        ?User $user,
        string $ipAddress,
        string $userAgent,
        string $action,
        string $result,
        ?string $details = null
    ): DownloadAuditLog {
        $detailsArray = $details ? ['message' => $details] : null;

        // Check if this should be flagged as suspicious
        $isSuspicious = $this->shouldFlagAsSuspicious($ipAddress, $result);

        return DownloadAuditLog::create([
            'asset_id' => $asset->id,
            'user_id' => $user?->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'action' => $action,
            'result' => $result,
            'details' => $detailsArray,
            'is_suspicious' => $isSuspicious,
        ]);
    }

    /**
     * Get the count of failed attempts from an IP within a time period.
     *
     * @param string $ipAddress
     * @param int $minutes
     * @return int
     */
    public function getFailedAttempts(string $ipAddress, int $minutes = 60): int
    {
        return DownloadAuditLog::byIp($ipAddress)
            ->failed()
            ->withinMinutes($minutes)
            ->count();
    }


    /**
     * Flag an IP address for suspicious activity.
     *
     * @param string $ipAddress
     * @param string $reason
     * @return void
     */
    public function flagSuspiciousActivity(string $ipAddress, string $reason): void
    {
        // Update recent logs from this IP as suspicious
        DownloadAuditLog::byIp($ipAddress)
            ->withinMinutes(60)
            ->update([
                'is_suspicious' => true,
                'details' => \DB::raw("JSON_SET(COALESCE(details, '{}'), '$.flagged_reason', '$reason')"),
            ]);
    }

    /**
     * Check if activity should be flagged as suspicious.
     *
     * @param string $ipAddress
     * @param string $result
     * @return bool
     */
    protected function shouldFlagAsSuspicious(string $ipAddress, string $result): bool
    {
        if ($result !== DownloadAuditLog::RESULT_FAILED) {
            return false;
        }

        $failedCount = $this->getFailedAttempts($ipAddress, 60);

        return $failedCount >= self::SUSPICIOUS_THRESHOLD;
    }

    /**
     * Get audit logs with filtering and pagination.
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getLogs(array $filters, int $perPage = 50): LengthAwarePaginator
    {
        $query = DownloadAuditLog::query()
            ->with(['asset', 'user'])
            ->orderBy('created_at', 'desc');

        if (!empty($filters['ip_address'])) {
            $query->byIp($filters['ip_address']);
        }

        if (!empty($filters['action'])) {
            $query->byAction($filters['action']);
        }

        if (!empty($filters['result'])) {
            $query->where('result', $filters['result']);
        }

        if (!empty($filters['is_suspicious'])) {
            $query->suspicious();
        }

        if (!empty($filters['asset_id'])) {
            $query->where('asset_id', $filters['asset_id']);
        }

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (!empty($filters['from_date'])) {
            $query->where('created_at', '>=', $filters['from_date']);
        }

        if (!empty($filters['to_date'])) {
            $query->where('created_at', '<=', $filters['to_date']);
        }

        return $query->paginate($perPage);
    }

    /**
     * Get flagged/suspicious logs.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getFlaggedLogs(int $perPage = 50): LengthAwarePaginator
    {
        return DownloadAuditLog::suspicious()
            ->with(['asset', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get unique suspicious IP addresses.
     *
     * @param int $withinHours
     * @return \Illuminate\Support\Collection
     */
    public function getSuspiciousIps(int $withinHours = 24): \Illuminate\Support\Collection
    {
        return DownloadAuditLog::suspicious()
            ->where('created_at', '>=', now()->subHours($withinHours))
            ->select('ip_address')
            ->selectRaw('COUNT(*) as attempt_count')
            ->selectRaw('MAX(created_at) as last_attempt')
            ->groupBy('ip_address')
            ->orderByDesc('attempt_count')
            ->get();
    }

    /**
     * Clean up old audit logs.
     *
     * @param int $retentionDays
     * @return int Number of deleted logs
     */
    public function cleanupOldLogs(int $retentionDays = 90): int
    {
        return DownloadAuditLog::where('created_at', '<', now()->subDays($retentionDays))
            ->delete();
    }
}
