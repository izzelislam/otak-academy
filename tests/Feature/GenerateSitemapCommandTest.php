<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\DownloadableAsset;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GenerateSitemapCommandTest extends TestCase
{
    use RefreshDatabase;

    protected string $sitemapPath;

    protected ?string $originalSitemap = null;

    protected function setUp(): void
    {
        parent::setUp();

        $this->sitemapPath = public_path('sitemap.xml');
        $this->originalSitemap = file_exists($this->sitemapPath)
            ? file_get_contents($this->sitemapPath) ?: null
            : null;

        if (file_exists($this->sitemapPath)) {
            unlink($this->sitemapPath);
        }

        config()->set('app.url', 'https://otakatikin.test');
    }

    protected function tearDown(): void
    {
        if ($this->originalSitemap !== null) {
            file_put_contents($this->sitemapPath, $this->originalSitemap);
        } elseif (file_exists($this->sitemapPath)) {
            unlink($this->sitemapPath);
        }

        parent::tearDown();
    }

    public function test_it_generates_sitemap_for_public_and_published_urls(): void
    {
        $author = User::factory()->create();
        $category = BlogCategory::create([
            'name' => 'Laravel',
            'slug' => 'laravel',
            'description' => 'Artikel seputar Laravel.',
        ]);

        Blog::create([
            'title' => 'Optimasi SEO Laravel',
            'slug' => 'optimasi-seo-laravel',
            'content' => '<p>Konten artikel</p>',
            'excerpt' => 'Ringkasan artikel',
            'category_id' => $category->id,
            'author_id' => $author->id,
            'status' => 'published',
            'published_at' => now()->subDay(),
            'meta_title' => 'Optimasi SEO Laravel',
            'meta_description' => 'Panduan optimasi SEO.',
        ]);

        Blog::create([
            'title' => 'Draft Internal',
            'slug' => 'draft-internal',
            'content' => '<p>Draft</p>',
            'author_id' => $author->id,
            'status' => 'draft',
        ]);

        DownloadableAsset::create([
            'title' => 'Starter Kit Laravel',
            'slug' => 'starter-kit-laravel',
            'description' => 'Template project Laravel.',
            'file_path' => 'assets/starter-kit.zip',
            'file_name' => 'starter-kit.zip',
            'file_size' => 1024,
            'file_type' => 'application/zip',
            'type' => 'paid',
            'price' => 149000,
            'download_count' => 0,
            'is_published' => true,
            'is_redemption_required' => false,
        ]);

        DownloadableAsset::create([
            'title' => 'Hidden Asset',
            'slug' => 'hidden-asset',
            'description' => 'Should not be indexed.',
            'file_path' => 'assets/hidden.zip',
            'file_name' => 'hidden.zip',
            'file_size' => 512,
            'file_type' => 'application/zip',
            'type' => 'free',
            'price' => 0,
            'download_count' => 0,
            'is_published' => false,
            'is_redemption_required' => false,
        ]);

        $this->artisan('seo:generate-sitemap')
            ->expectsOutputToContain('Sitemap generated')
            ->expectsOutputToContain('Total URLs:')
            ->assertSuccessful();

        $this->assertFileExists($this->sitemapPath);

        $contents = file_get_contents($this->sitemapPath);

        $this->assertNotFalse($contents);
        $this->assertStringContainsString('https://otakatikin.test/', $contents);
        $this->assertStringContainsString('https://otakatikin.test/blog', $contents);
        $this->assertStringContainsString('https://otakatikin.test/blog/category/laravel', $contents);
        $this->assertStringContainsString('https://otakatikin.test/blog/optimasi-seo-laravel', $contents);
        $this->assertStringContainsString('https://otakatikin.test/assets/starter-kit-laravel', $contents);
        $this->assertStringContainsString('https://otakatikin.test/ebook-generator', $contents);
        $this->assertStringNotContainsString('draft-internal', $contents);
        $this->assertStringNotContainsString('hidden-asset', $contents);
    }
}
