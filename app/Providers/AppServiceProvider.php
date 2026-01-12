<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        $this->configureRateLimiting();
    }
    
    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        // Rate limiter for code validation: 5 attempts per minute per IP
        RateLimiter::for('code-validation', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        // Rate limiter for downloads: 10 per minute per IP
        RateLimiter::for('download', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });
    }
}
