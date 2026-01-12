<?php

namespace App\Services;

use App\Models\DownloadableAsset;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AssetService
{
    /**
     * Get published assets with pagination.
     */
    public function getPublishedAssets(int $perPage = 12): LengthAwarePaginator
    {
        return DownloadableAsset::published()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get published assets filtered by type.
     */
    public function getPublishedAssetsByType(string $type, int $perPage = 12): LengthAwarePaginator
    {
        return DownloadableAsset::published()
            ->where('type', $type)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get a single published asset by slug.
     */
    public function getAssetBySlug(string $slug): ?DownloadableAsset
    {
        return DownloadableAsset::published()
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get all assets for admin (including unpublished) with pagination.
     */
    public function getAllAssets(int $perPage = 10): LengthAwarePaginator
    {
        return DownloadableAsset::orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get a single asset by ID for admin.
     */
    public function getAssetById(int $id): ?DownloadableAsset
    {
        return DownloadableAsset::find($id);
    }

    /**
     * Create a new downloadable asset.
     */
    public function createAsset(array $data): DownloadableAsset
    {
        // Handle thumbnail upload
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof UploadedFile) {
            $data['thumbnail'] = $data['thumbnail']->storePublicly('asset-thumbnails', 's3');
        }

        // Handle file upload to private storage
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            $fileData = $this->uploadFile($data['file']);
            $data = array_merge($data, $fileData);
            unset($data['file']);
        }

        return DownloadableAsset::create($data);
    }


    /**
     * Update an existing downloadable asset.
     */
    public function updateAsset(DownloadableAsset $asset, array $data): DownloadableAsset
    {
        // Handle thumbnail upload
        if (isset($data['thumbnail']) && $data['thumbnail'] instanceof UploadedFile) {
            // Delete old thumbnail if exists
            if ($asset->thumbnail) {
                Storage::disk('s3')->delete($asset->thumbnail);
            }
            $data['thumbnail'] = $data['thumbnail']->storePublicly('asset-thumbnails', 's3');
        } else {
            // If thumbnail is not being updated (e.g. it is null), remove it from data
            // so we don't accidentally clear the existing thumbnail in database
            unset($data['thumbnail']);
        }

        // Handle file upload to private storage
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            // Delete old file if exists
            if ($asset->file_path) {
                Storage::disk('s3')->delete($asset->file_path);
            }
            $fileData = $this->uploadFile($data['file']);
            $data = array_merge($data, $fileData);
            unset($data['file']);
        } else {
             unset($data['file']);
             unset($data['file_path']); // Ensure we don't overwrite these if they crept in
             unset($data['file_name']);
             unset($data['file_size']);
             unset($data['file_type']);
        }

        $asset->update($data);

        return $asset->fresh();
    }

    /**
     * Delete a downloadable asset.
     */
    public function deleteAsset(DownloadableAsset $asset): bool
    {
        // Delete thumbnail if exists
        if ($asset->thumbnail) {
            Storage::disk('s3')->delete($asset->thumbnail);
        }

        // Delete file if exists
        if ($asset->file_path) {
            Storage::disk('s3')->delete($asset->file_path);
        }

        return $asset->delete();
    }

    /**
     * Upload file to private storage with randomized filename.
     *
     * @param UploadedFile $file
     * @return array{file_path: string, file_name: string, file_size: int, file_type: string}
     */
    protected function uploadFile(UploadedFile $file): array
    {
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $mimeType = $file->getMimeType();
        $size = $file->getSize();

        // Generate randomized filename for security
        $randomizedName = $this->generateRandomizedFilename($extension);

        // Store in private directory on S3 (default is private)
        $path = $file->storeAs('assets', $randomizedName, 's3');

        return [
            'file_path' => $path,
            'file_name' => $originalName,
            'file_size' => $size,
            'file_type' => $mimeType,
        ];
    }

    /**
     * Generate a randomized filename.
     */
    protected function generateRandomizedFilename(string $extension): string
    {
        $timestamp = now()->format('YmdHis');
        $random = Str::random(32);

        return "{$timestamp}_{$random}.{$extension}";
    }

    /**
     * Get the relative path (S3 key) to an asset file.
     */
    public function getFilePath(DownloadableAsset $asset): ?string
    {
        if (!$asset->file_path) {
            return null;
        }

        return $asset->file_path;
    }

    /**
     * Check if asset file exists on S3.
     */
    public function fileExists(DownloadableAsset $asset): bool
    {
        if (!$asset->file_path) {
            return false;
        }

        return Storage::disk('s3')->exists($asset->file_path);
    }

    /**
     * Increment download counter for an asset.
     */
    public function incrementDownloadCount(DownloadableAsset $asset): void
    {
        $asset->increment('download_count');
    }

    /**
     * Search assets by title or description.
     */
    public function searchAssets(string $query, int $perPage = 12): LengthAwarePaginator
    {
        return DownloadableAsset::published()
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
