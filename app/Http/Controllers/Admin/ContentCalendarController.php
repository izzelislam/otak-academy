<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ContentCalendar;
use App\Services\ContentCalendarService;
use Inertia\Inertia;

class ContentCalendarController extends Controller
{
    protected $contentCalendarService;

    public function __construct(ContentCalendarService $contentCalendarService)
    {
        $this->contentCalendarService = $contentCalendarService;
    }

    public function index()
    {
        $contents = ContentCalendar::orderBy('content_date', 'asc')
            ->orderBy('id', 'asc')
            ->paginate(10);
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

    /**
     * Bulk generate content calendar entries
     */
    public function bulkStore(Request $request)
    {
        $validated = $request->validate([
            'prefix' => 'required|string|max:10',
            'start_number' => 'required|integer|min:1',
            'quantity' => 'required|integer|min:1|max:100',
            'start_date' => 'required|date',
            'platforms' => 'nullable|array',
            'platforms.*' => 'string|in:instagram,facebook',
        ]);

        $entries = $this->contentCalendarService->generateBulk(
            $validated['prefix'],
            $validated['start_number'],
            $validated['quantity'],
            $validated['start_date'],
            $validated['platforms'] ?? []
        );

        return redirect()->back()->with('success', count($entries) . ' content entries generated successfully');
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
