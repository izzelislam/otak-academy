<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\Api\ContentCalendarApiController;

// Automation Routes
Route::prefix('automation')->group(function () {
    Route::get('pending-content', [ContentCalendarApiController::class, 'getPendingContent']);
    Route::post('content/{id}/published', [ContentCalendarApiController::class, 'markAsPublished']);
});
