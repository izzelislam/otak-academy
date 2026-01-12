<?php

use App\Http\Controllers\Admin\AssetController as AdminAssetController;
use App\Http\Controllers\Admin\AuditLogController as AdminAuditLogController;
use App\Http\Controllers\Admin\BlogCategoryController as AdminBlogCategoryController;
use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Admin\ContentCalendarController as AdminContentCalendarController;
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\MaterialController as AdminMaterialController;
use App\Http\Controllers\Admin\MemberController as AdminMemberController;
use App\Http\Controllers\Admin\RedeemCodeController as AdminRedeemCodeController;
use App\Http\Controllers\Admin\SessionController as AdminSessionController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Member\ClassController as MemberClassController;
use App\Http\Controllers\Member\CourseController as MemberCourseController;
use App\Http\Controllers\Member\DashboardController as MemberDashboardController;
use App\Http\Controllers\Member\ProfileController as MemberProfileController;
use App\Http\Controllers\Member\RedeemController as MemberRedeemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SecureDownloadController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public Blog Routes
Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('index');
    Route::get('/search', [BlogController::class, 'search'])->name('search');
    Route::get('/category/{slug}', [BlogController::class, 'category'])->name('category');
    Route::get('/{slug}', [BlogController::class, 'show'])->name('show');
});

// Public Asset Routes
Route::prefix('assets')->name('assets.')->group(function () {
    Route::get('/', [AssetController::class, 'index'])->name('index');
    Route::get('/search', [AssetController::class, 'search'])->name('search');
    Route::get('/{slug}', [AssetController::class, 'show'])->name('show');
    Route::post('/{asset}/download', [AssetController::class, 'requestDownload'])
        ->name('download')
        ->middleware('asset.rate:download');
    Route::post('/{asset}/redeem', [AssetController::class, 'redeemCode'])
        ->name('redeem')
        ->middleware('asset.rate:code');
});

// Secure Download Route
Route::get('/download/{token}', [SecureDownloadController::class, 'download'])->name('download');

// Dashboard redirect based on role
Route::get('/dashboard', function () {
    if (auth()->user()->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('member.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Course Management
    Route::resource('courses', AdminCourseController::class);

    // Member Management
    Route::get('members', [AdminMemberController::class, 'index'])->name('members.index');
    Route::get('members/{member}', [AdminMemberController::class, 'show'])->name('members.show');

    // Session Management (nested under courses)
    Route::resource('courses.sessions', AdminSessionController::class);
    Route::put('courses/{course}/sessions/order', [AdminSessionController::class, 'updateOrder'])
        ->name('courses.sessions.order');

    // Material Management (nested under courses.sessions)
    Route::resource('courses.sessions.materials', AdminMaterialController::class);
    Route::put('courses/{course}/sessions/{session}/materials/order', [AdminMaterialController::class, 'updateOrder'])
        ->name('courses.sessions.materials.order');

    // Redeem Code Management
    Route::resource('redeem-codes', AdminRedeemCodeController::class)->except(['edit', 'update']);

    // Blog Management
    Route::resource('blogs', AdminBlogController::class);

    // Blog Category Management
    Route::resource('blog-categories', AdminBlogCategoryController::class)->except(['show']);

    // Asset Management
    Route::resource('assets', AdminAssetController::class);
    Route::post('assets/{asset}/generate-codes', [AdminAssetController::class, 'generateCodes'])
        ->name('assets.generate-codes');
    Route::get('assets/{asset}/export-codes', [AdminAssetController::class, 'exportCodes'])
        ->name('assets.export-codes');
    Route::get('assets/{asset}/codes', [AdminAssetController::class, 'codes'])
        ->name('assets.codes');
    Route::get('assets/{asset}/download', [AdminAssetController::class, 'download'])
        ->name('assets.download');

    // Audit Log Management
    Route::get('audit-logs', [AdminAuditLogController::class, 'index'])->name('audit-logs.index');
    Route::get('audit-logs/flagged', [AdminAuditLogController::class, 'flagged'])->name('audit-logs.flagged');

    // Content Calendar Management
    Route::resource('content-calendars', AdminContentCalendarController::class);
});

// Member Routes
Route::middleware(['auth', 'verified'])->prefix('member')->name('member.')->group(function () {
    Route::get('/dashboard', [MemberDashboardController::class, 'index'])->name('dashboard');

    // Classes (Browse all available courses)
    Route::get('/classes', [MemberClassController::class, 'index'])->name('classes.index');
    Route::get('/classes/{course}', [MemberClassController::class, 'show'])->name('classes.show');

    // My Courses (Enrolled courses)
    Route::get('/courses', [MemberCourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/{course}', [MemberCourseController::class, 'show'])->name('courses.show');

    // Material View & Complete
    Route::get('/courses/{course}/materials/{material}', [MemberCourseController::class, 'showMaterial'])
        ->name('courses.materials.show');
    Route::post('/courses/{course}/materials/{material}/complete', [MemberCourseController::class, 'completeMaterial'])
        ->name('courses.materials.complete');

    // Redeem Code
    Route::get('/redeem', [MemberRedeemController::class, 'create'])->name('redeem.create');
    Route::post('/redeem', [MemberRedeemController::class, 'store'])->name('redeem.store');

    // Profile
    Route::get('/profile', [MemberProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [MemberProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [MemberProfileController::class, 'updatePassword'])->name('profile.password');
});

require __DIR__.'/auth.php';
