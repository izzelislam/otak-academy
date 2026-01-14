<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class DownloadableAsset extends Model
{
    use HasFactory, HasSlug;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail',
        'file_path',
        'file_name',
        'file_size',
        'file_type',
        'type',
        'download_count',
        'is_published',
        'is_redemption_required',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'is_redemption_required' => 'boolean',
            'download_count' => 'integer',
            'file_size' => 'integer',
        ];
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'thumbnail_url',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the asset codes for this asset.
     */
    public function assetCodes(): HasMany
    {
        return $this->hasMany(AssetCode::class, 'asset_id');
    }

    /**
     * Get the download tokens for this asset.
     */
    public function downloadTokens(): HasMany
    {
        return $this->hasMany(DownloadToken::class, 'asset_id');
    }

    /**
     * Get the audit logs for this asset.
     */
    public function auditLogs(): HasMany
    {
        return $this->hasMany(DownloadAuditLog::class, 'asset_id');
    }

    /**
     * Scope a query to only include published assets.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope a query to only include free assets.
     */
    public function scopeFree($query)
    {
        return $query->where('type', 'free');
    }

    /**
     * Scope a query to only include paid assets.
     */
    public function scopePaid($query)
    {
        return $query->where('type', 'paid');
    }

    /**
     * Check if the asset is free.
     */
    public function isFree(): bool
    {
        return $this->type === 'free';
    }

    /**
     * Check if the asset is paid.
     */
    public function isPaid(): bool
    {
        return $this->type === 'paid';
    }

    /**
     * Get the full URL for the thumbnail.
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail) {
            return null;
        }

        return \Illuminate\Support\Facades\Storage::disk('s3')->url($this->thumbnail);
    }
}
