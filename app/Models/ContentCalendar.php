<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentCalendar extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'folder_name',
        'content_date',
        'status',
        'uploaded_at',
        'platforms',
    ];

    protected $casts = [
        'content_date' => 'date',
        'uploaded_at' => 'datetime',
        'platforms' => 'array',
    ];
}
