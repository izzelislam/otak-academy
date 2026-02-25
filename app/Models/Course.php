<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;

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
        'is_published',
        'is_featured',
        'access_type',
        'price',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'formatted_price',
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
            'is_featured' => 'boolean',
            'price' => 'integer',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Course $course) {
            if (empty($course->slug)) {
                $course->slug = static::generateUniqueSlug($course->title);
            }
        });
    }

    /**
     * Generate a unique slug from the title.
     */
    public static function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    /**
     * Get the sessions for this course.
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(CourseSession::class)->orderBy('order_priority');
    }

    /**
     * Get the redeem codes for this course.
     */
    public function redeemCodes(): HasMany
    {
        return $this->hasMany(RedeemCode::class);
    }

    /**
     * Get all materials for this course through sessions.
     */
    public function materials(): HasManyThrough
    {
        return $this->hasManyThrough(Material::class, CourseSession::class, 'course_id', 'session_id');
    }

    /**
     * Get the users enrolled in this course through redeemed codes.
     */
    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'redeem_codes')
            ->wherePivot('is_used', true)
            ->withPivot('code', 'is_used', 'used_at')
            ->withTimestamps();
    }

    /**
     * Get the payments for this course.
     */
    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    /**
     * Check if the course is premium.
     */
    public function isPremium(): bool
    {
        return $this->access_type === 'premium';
    }

    /**
     * Check if the course is free.
     */
    public function isFreeAccess(): bool
    {
        return $this->access_type === 'free';
    }

    /**
     * Get formatted price attribute.
     */
    public function getFormattedPriceAttribute(): string
    {
        if ($this->price <= 0) {
            return 'Gratis';
        }
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }
}
