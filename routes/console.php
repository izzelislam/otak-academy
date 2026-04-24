<?php

use App\Services\SitemapService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('seo:generate-sitemap', function (SitemapService $sitemapService) {
    $outputPath = public_path('sitemap.xml');
    $result = $sitemapService->generate($outputPath);

    $this->info("Sitemap generated at {$outputPath}");
    $this->line("Total URLs: {$result['count']}");

    foreach ($result['warnings'] as $warning) {
        $this->warn($warning);
    }
})->purpose('Generate public/sitemap.xml for public pages and published content');
