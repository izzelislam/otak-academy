<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssetCode extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_id',
        'code',
        'code_hash',
        'code_prefix',
        'user_id',
        'is_used',
        'used_at',
        'expires_at',
        'download_count',
        'max_downloads',
        'last_download_at',
        'hourly_download_count',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_used' => 'boolean',
            'used_at' => 'datetime',
            'expires_at' => 'datetime',
            'download_count' => 'integer',
            'max_downloads' => 'integer',
            'last_download_at' => 'datetime',
            'hourly_download_count' => 'integer',
        ];
    }

    /**
     * Get the asset this code belongs to.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(DownloadableAsset::class, 'asset_id');
    }

    /**
     * Get the user who redeemed this code.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the code can still be used for re-download.
     */
    public function canRedownload(): bool
    {
        if (!$this->is_used) {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return $this->download_count < $this->max_downloads;
    }

    /**
     * Scope a query to only include unused codes.
     */
    public function scopeUnused($query)
    {
        return $query->where('is_used', false);
    }

    /**
     * Scope a query to only include used codes.
     */
    public function scopeUsed($query)
    {
        return $query->where('is_used', true);
    }
}
