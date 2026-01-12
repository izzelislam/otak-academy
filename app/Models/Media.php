<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'mediable_id',
        'mediable_type',
        'name',
        'size',
        'extension',
        'storage_path',
        'disk', // Start tracking the disk if possible in future migrations
    ];

    /**
     * Get the parent mediable model (user, post, etc).
     */
    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }
}
