<?php

namespace App\Services;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\DownloadableAsset;
use Illuminate\Database\QueryException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class SitemapService
{
    /**
     * @return array{count: int, warnings: array<int, string>}
     */
    public function generate(string $outputPath): array
    {
        $baseUrl = rtrim(config('app.url', url('/')), '/');
        $warnings = [];

        $urls = $this->basePageEntries($baseUrl)
            ->merge($this->publishedContentEntries($baseUrl, $warnings))
            ->unique('loc')
            ->values();

        File::ensureDirectoryExists(dirname($outputPath));
        File::put($outputPath, $this->render($urls));

        return [
            'count' => $urls->count(),
            'warnings' => $warnings,
        ];
    }

    protected function publishedContentEntries(string $baseUrl, array &$warnings): Collection
    {
        try {
            return $this->categoryEntries($baseUrl)
                ->merge($this->blogEntries($baseUrl))
                ->merge($this->assetEntries($baseUrl));
        } catch (QueryException $exception) {
            report($exception);

            $warnings[] = 'Published content URLs were skipped because the configured database is not reachable.';

            return collect();
        }
    }

    protected function basePageEntries(string $baseUrl): Collection
    {
        $now = now();

        return collect([
            $this->makeEntry("{$baseUrl}/", $now, 'daily', '1.0'),
            $this->makeEntry("{$baseUrl}/blog", $now, 'daily', '0.9'),
            $this->makeEntry("{$baseUrl}/assets", $now, 'daily', '0.9'),
            $this->makeEntry("{$baseUrl}/kontak", $now, 'monthly', '0.6'),
            $this->makeEntry("{$baseUrl}/privacy-policy", $now, 'yearly', '0.3'),
            $this->makeEntry("{$baseUrl}/syarat-ketentuan", $now, 'yearly', '0.3'),
        ]);
    }

    protected function categoryEntries(string $baseUrl): Collection
    {
        return BlogCategory::query()
            ->select(['slug', 'updated_at'])
            ->whereHas('blogs', fn ($query) => $query->published())
            ->orderBy('name')
            ->get()
            ->map(fn (BlogCategory $category) => $this->makeEntry(
                "{$baseUrl}/blog/category/{$category->slug}",
                $category->updated_at,
                'weekly',
                '0.7',
            ));
    }

    protected function blogEntries(string $baseUrl): Collection
    {
        return Blog::query()
            ->published()
            ->select(['slug', 'published_at', 'updated_at'])
            ->orderByDesc('published_at')
            ->get()
            ->map(fn (Blog $blog) => $this->makeEntry(
                "{$baseUrl}/blog/{$blog->slug}",
                $blog->updated_at ?? $blog->published_at,
                'weekly',
                '0.8',
            ));
    }

    protected function assetEntries(string $baseUrl): Collection
    {
        return DownloadableAsset::query()
            ->published()
            ->select(['slug', 'updated_at', 'created_at'])
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (DownloadableAsset $asset) => $this->makeEntry(
                "{$baseUrl}/assets/{$asset->slug}",
                $asset->updated_at ?? $asset->created_at,
                'weekly',
                '0.8',
            ));
    }

    /**
     * @return array{loc: string, lastmod: ?Carbon, changefreq: string, priority: string}
     */
    protected function makeEntry(string $loc, ?Carbon $lastmod, string $changefreq, string $priority): array
    {
        return [
            'loc' => $loc,
            'lastmod' => $lastmod,
            'changefreq' => $changefreq,
            'priority' => $priority,
        ];
    }

    protected function render(Collection $urls): string
    {
        $entries = $urls->map(function (array $url): string {
            $lines = [
                '  <url>',
                "    <loc>{$this->escape($url['loc'])}</loc>",
            ];

            if ($url['lastmod']) {
                $lines[] = "    <lastmod>{$url['lastmod']->toAtomString()}</lastmod>";
            }

            $lines[] = "    <changefreq>{$url['changefreq']}</changefreq>";
            $lines[] = "    <priority>{$url['priority']}</priority>";
            $lines[] = '  </url>';

            return implode("\n", $lines);
        })->implode("\n");

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{$entries}
</urlset>
XML;
    }

    protected function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_COMPAT, 'UTF-8');
    }
}
