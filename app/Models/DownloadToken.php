<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DownloadToken extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'token_hash',
        'asset_id',
        'user_id',
        'ip_address',
        'nonce',
        'expires_at',
        'consumed_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'consumed_at' => 'datetime',
        ];
    }

    /**
     * Get the asset this token belongs to.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(DownloadableAsset::class, 'asset_id');
    }

    /**
     * Get the user this token belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the token is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Check if the token has been consumed.
     */
    public function isConsumed(): bool
    {
        return $this->consumed_at !== null;
    }

    /**
     * Check if the token is valid (not expired and not consumed).
     */
    public function isValid(): bool
    {
        return !$this->isExpired() && !$this->isConsumed();
    }

    /**
     * Mark the token as consumed.
     */
    public function consume(): bool
    {
        return $this->update(['consumed_at' => now()]);
    }

    /**
     * Scope a query to only include valid tokens.
     */
    public function scopeValid($query)
    {
        return $query->where('expires_at', '>', now())
            ->whereNull('consumed_at');
    }

    /**
     * Scope a query to only include expired tokens.
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<=', now());
    }
}
