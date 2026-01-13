<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ContentCalendar;

class ContentCalendarApiController extends Controller
{
    public function getPendingContent(Request $request)
    {
        $this->verifyToken($request);

        // Get the oldest pending content that is due (or just the oldest pending one if not strict on date)
        // User asked: "mendapatkan konten yang statusnya belum di upload berdasarkan terakhir upload"
        // This phrasing "berdasarkan terakhir upload" is slightly ambiguous.
        // It might mean "get the next one in sequence".
        // I will assume getting the earliest 'pending' content.
        
        $content = ContentCalendar::where('status', 'pending')
                    ->orderBy('content_date', 'asc')
                    ->first();
        
        if (!$content) {
            return response()->json(['message' => 'No pending content found'], 404);
        }
        
        return response()->json($content);
    }
    
    public function markAsPublished(Request $request, $id)
    {
        $this->verifyToken($request);
        
        $content = ContentCalendar::findOrFail($id);
        
        $content->update([
            'status' => 'published',
            'uploaded_at' => now(),
        ]);
        
        return response()->json(['message' => 'Content marked as published', 'data' => $content]);
    }
    
    private function verifyToken(Request $request)
    {
        $token = config('services.content_calendar.token');
        
        if (!$token) {
             abort(500, 'Automation token not configured in .env (CONTENT_AUTOMATION_TOKEN)');
        }
        
        // Check header or query parameter
        $providedToken = $request->header('X-API-TOKEN') ?? $request->input('token');
        
        if (trim($providedToken) !== trim($token)) {
            abort(401, 'Invalid authentication token. Received: ' . $providedToken);
        }
    }
}
