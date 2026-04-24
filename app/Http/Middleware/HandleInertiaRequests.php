<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'midtrans_client_key' => config('midtrans.client_key'),
            'seo' => [
                'site_name' => config('app.name', 'OtakAtikin'),
                'site_url' => rtrim(config('app.url', $request->getSchemeAndHttpHost()), '/'),
                'default_title' => config('app.name', 'OtakAtikin'),
                'default_description' => 'OtakAtikin adalah platform pembelajaran digital untuk kursus, blog, dan produk digital praktis bagi developer dan kreator di Indonesia.',
                'default_image' => url('/favicon/web-app-manifest-512x512.png'),
                'default_locale' => str_replace('_', '-', app()->getLocale()),
                'twitter_card' => 'summary_large_image',
            ],
        ];
    }
}
