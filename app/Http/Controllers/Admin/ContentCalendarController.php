<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ContentCalendar;
use Inertia\Inertia;

class ContentCalendarController extends Controller
{
    public function index()
    {
        $contents = ContentCalendar::orderBy('content_date', 'desc')->paginate(10);
        return Inertia::render('Admin/ContentCalendars/Index', [
            'contents' => $contents,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'folder_name' => 'required|string',
            'content_date' => 'required|date',
            'status' => 'required|in:pending,published',
            'platforms' => 'nullable|array',
            'platforms.*' => 'string|in:instagram,facebook',
        ]);

        ContentCalendar::create($validated);

        return redirect()->back()->with('success', 'Content scheduled successfully');
    }

    public function update(Request $request, ContentCalendar $contentCalendar)
    {
        $validated = $request->validate([
            'folder_name' => 'required|string',
            'content_date' => 'required|date',
            'status' => 'required|in:pending,published',
            'platforms' => 'nullable|array',
            'platforms.*' => 'string|in:instagram,facebook',
        ]);

        $contentCalendar->update($validated);

        return redirect()->back()->with('success', 'Content updated successfully');
    }

    public function destroy(ContentCalendar $contentCalendar)
    {
        $contentCalendar->delete();
        return redirect()->back()->with('success', 'Content deleted successfully');
    }
}
