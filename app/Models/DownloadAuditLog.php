<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DownloadAuditLog extends Model
{
    use HasFactory;

    /**
     * Action types for audit logging.
     */
    public const ACTION_CODE_ATTEMPT = 'code_attempt';
    public const ACTION_CODE_SUCCESS = 'code_success';
    public const ACTION_DOWNLOAD_REQUEST = 'download_request';
    public const ACTION_DOWNLOAD_COMPLETE = 'download_complete';

    /**
     * Result types for audit logging.
     */
    public const RESULT_SUCCESS = 'success';
    public const RESULT_FAILED = 'failed';
    public const RESULT_BLOCKED = 'blocked';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_id',
        'user_id',
        'ip_address',
        'user_agent',
        'action',
        'result',
        'details',
        'is_suspicious',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'details' => 'array',
            'is_suspicious' => 'boolean',
        ];
    }

    /**
     * Get the asset this log belongs to.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(DownloadableAsset::class, 'asset_id');
    }

    /**
     * Get the user this log belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include suspicious logs.
     */
    public function scopeSuspicious($query)
    {
        return $query->where('is_suspicious', true);
    }

    /**
     * Scope a query to only include failed attempts.
     */
    public function scopeFailed($query)
    {
        return $query->where('result', self::RESULT_FAILED);
    }

    /**
     * Scope a query to filter by IP address.
     */
    public function scopeByIp($query, string $ipAddress)
    {
        return $query->where('ip_address', $ipAddress);
    }

    /**
     * Scope a query to filter by action type.
     */
    public function scopeByAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    /**
     * Scope a query to filter logs within a time period.
     */
    public function scopeWithinMinutes($query, int $minutes)
    {
        return $query->where('created_at', '>=', now()->subMinutes($minutes));
    }
}
