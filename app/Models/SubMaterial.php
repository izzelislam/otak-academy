<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'material_id',
        'title',
        'type',
        'content',
        'order_priority',
    ];

    protected function casts(): array
    {
        return [
            'order_priority' => 'integer',
        ];
    }

    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }
}
