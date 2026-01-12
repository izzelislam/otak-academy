<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the redeem codes redeemed by this user.
     */
    public function redeemedCodes(): HasMany
    {
        return $this->hasMany(RedeemCode::class);
    }

    /**
     * Alias for redeemedCodes - Get the redeem codes associated with this user.
     */
    public function redeemCodes(): HasMany
    {
        return $this->hasMany(RedeemCode::class);
    }

    /**
     * Get the user's learning progress records.
     */
    public function progress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }

    /**
     * Get the courses the user has access to through redeemed codes.
     */
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'redeem_codes')
            ->wherePivot('is_used', true)
            ->withPivot('code', 'is_used', 'used_at')
            ->withTimestamps();
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if the user is a member.
     */
    public function isMember(): bool
    {
        return $this->role === 'member';
    }
}
