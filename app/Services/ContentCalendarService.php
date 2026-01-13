<?php

namespace App\Services;

use App\Models\ContentCalendar;
use Carbon\Carbon;

class ContentCalendarService
{
    /**
     * Generate bulk content calendar entries
     * 
     * @param string $prefix Prefix for folder name (e.g., "CO")
     * @param int $startNumber Starting number (e.g., 10)
     * @param int $quantity Number of entries to generate (e.g., 10)
     * @param string $startDate Start date for content
     * @param array $platforms Platforms to post to
     * @return array Generated entries
     */
    public function generateBulk(
        string $prefix,
        int $startNumber,
        int $quantity,
        string $startDate,
        array $platforms = []
    ): array {
        $entries = [];
        $currentDate = Carbon::parse($startDate);

        for ($i = 0; $i < $quantity; $i++) {
            $folderName = $prefix . ($startNumber + $i);
            
            $entry = ContentCalendar::create([
                'folder_name' => $folderName,
                'content_date' => $currentDate->copy()->addDays($i)->toDateString(),
                'status' => 'pending',
                'platforms' => $platforms,
            ]);
            
            $entries[] = $entry;
        }

        return $entries;
    }

    /**
     * Get preview of folder names that will be generated
     */
    public function previewBulk(string $prefix, int $startNumber, int $quantity): array
    {
        $folderNames = [];
        
        for ($i = 0; $i < $quantity; $i++) {
            $folderNames[] = $prefix . ($startNumber + $i);
        }

        return $folderNames;
    }
}
