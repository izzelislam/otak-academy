<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class MediaService
{
    /**
     * Upload a single media file to storage and save to DB
     */
    public function uploadMedia(UploadedFile $file, $mediableModel = null, ?string $customPath = null): Media
    {
        try {
            DB::beginTransaction();

            // Determine disk based on file type
            $disk = $this->determineDisk($file);

            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $folderPath = $customPath
                ? trim($customPath, '/')
                : $this->generateFolderPath($mediableModel);
            
            $path = $this->storeFile($disk, $folderPath, $file, $filename);

            $media = Media::create([
                'mediable_id'   => $mediableModel?->id,
                'mediable_type' => $mediableModel ? get_class($mediableModel) : null,
                'name'          => $file->getClientOriginalName(),
                'size'          => $file->getSize(),
                'extension'     => $file->getClientOriginalExtension(),
                'storage_path'  => $path,
            ]);

            DB::commit();

            return $media;
        } catch (Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Upload multiple files at once
     */
    public function uploadMultipleMedia(array $files, $mediableModel = null, ?string $customPath = null)
    {
        $collection = collect();

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $collection->push($this->uploadMedia($file, $mediableModel, $customPath));
            }
        }

        return $collection;
    }

    /**
     * Associate existing media with a model
     */
    public function associateMedia(Media $media, $model, bool $deleteExisting = false): Media
    {
        try {
            DB::beginTransaction();

            if ($deleteExisting && $model->media) {
                $this->deleteMedia($model->media);
            }

            $media->update([
                'mediable_id'   => $model->id,
                'mediable_type' => get_class($model),
            ]);

            DB::commit();
            return $media->fresh();
        } catch (Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Update media file & metadata
     */
    public function updateMedia(Media $media, UploadedFile $newFile): Media
    {
        try {
            DB::beginTransaction();

            // Determine the old disk to delete the old file
            $oldDisk = $this->getDiskForMedia($media);
            if ($media->storage_path) {
                $this->deleteFile($oldDisk, $media->storage_path);
            }

            // Determine the new disk for the new file
            $newDisk = $this->determineDisk($newFile);

            $filename = Str::uuid() . '.' . $newFile->getClientOriginalExtension();
            $folderPath = dirname($media->storage_path) === '.' ? 'media' : dirname($media->storage_path);
            $path = $this->storeFile($newDisk, $folderPath, $newFile, $filename);

            $media->update([
                'name'         => $newFile->getClientOriginalName(),
                'size'         => $newFile->getSize(),
                'extension'    => $newFile->getClientOriginalExtension(),
                'storage_path' => $path,
            ]);

            DB::commit();
            return $media->fresh();
        } catch (Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Delete media (storage + DB)
     */
    public function deleteMedia(Media $media): bool
    {
        try {
            DB::beginTransaction();

            $disk = $this->getDiskForMedia($media);
            if ($media->storage_path) {
                $this->deleteFile($disk, $media->storage_path);
            }

            $media->delete();
            DB::commit();

            return true;
        } catch (Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Get media by ID
     */
    public function getMediaById(string $id): ?Media
    {
        return Media::find($id);
    }

    /**
     * Get media related to a model
     */
    public function getMediaByModel($mediableModel)
    {
        return Media::where('mediable_id', $mediableModel->id)
            ->where('mediable_type', get_class($mediableModel))
            ->get();
    }

    /**
     * Get full media URL (resolved via Storage)
     */
    public function getMediaUrl(Media $media): ?string
    {
        $disk = $this->getDiskForMedia($media);
        return Storage::disk($disk)->url($media->storage_path);
    }

    /**
     * Transform media to API-ready array
     */
    public function transformMedia(Media $media): array
    {
        return [
            'id'            => $media->id,
            'name'          => $media->name,
            'extension'     => $media->extension,
            'size'          => $media->size,
            'size_formatted'=> $this->formatFileSize($media->size),
            'url'           => $this->getMediaUrl($media),
            'mediable_id'   => $media->mediable_id,
            'mediable_type' => $media->mediable_type,
            'created_at'    => optional($media->created_at)?->toDateTimeString(),
            'updated_at'    => optional($media->updated_at)?->toDateTimeString(),
        ];
    }

    /**
     * Validate uploaded file manually
     */
    public function validateFile(UploadedFile $file, array $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'], int $maxSize = 10240): array
    {
        $errors = [];

        if ($file->getSize() > $maxSize * 1024) {
            $errors[] = "File size must be less than {$maxSize}KB";
        }

        $ext = strtolower($file->getClientOriginalExtension());
        if (!in_array($ext, $allowed)) {
            $errors[] = "File type must be one of: " . implode(', ', $allowed);
        }

        return $errors;
    }

    // ============================================================
    // =============== Internal Helper Functions ==================
    // ============================================================

    /**
     * Generate folder path for the file
     */
    private function generateFolderPath($mediableModel = null): string
    {
        $basePath = 'media';
        
        // Simplified path: media/{modelName}
        // This reduces nesting significantly while keeping files organized by type.
        // Filenames are UUIDs so collisions are not a concern.
        if ($mediableModel) {
            $modelName = strtolower(class_basename($mediableModel));
            return "{$basePath}/{$modelName}";
        }

        return $basePath;
    }

    /**
     * Format file size
     */
    protected function formatFileSize( $bytes = 0): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow   = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow   = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, 2) . ' ' . $units[$pow];
    }
    
    /**
     * Determine storage disk based on file type.
     * Non-video files go to S3 (IDCloudHost), videos stay local/public.
     */
    private function determineDisk(UploadedFile $file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', 'flv'];

        if (in_array($extension, $videoExtensions)) {
            return 'public';
        }

        return 's3';
    }

    /**
     * Get disk for an existing media item based on extension.
     */
    private function getDiskForMedia(Media $media): string
    {
        $extension = strtolower($media->extension);
        $videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', 'flv'];

        if (in_array($extension, $videoExtensions)) {
            return 'public';
        }

        return 's3';
    }

    private function diskAvailable(?string $disk): bool
    {
        return $disk && array_key_exists($disk, config('filesystems.disks', []));
    }

    /**
     * Store file safely
     */
    private function storeFile(string $disk, string $folder, UploadedFile $file, string $filename): string
    {
        // Try to store on the requested disk
        try {
            // Removed 'cms-main/' prefix as requested to shorten the path.
            // The path will be exactly as generated by generateFolderPath.
            $pathPrefix = '';
            
            return Storage::disk($disk)->putFileAs($pathPrefix.$folder, $file, $filename, 'public');
        } catch (Throwable $exception) {
            // Fallback to public if the requested disk fails (and isn't public already)
            if ($disk !== 'public' && $this->diskAvailable('public')) {
                return Storage::disk('public')->putFileAs($folder, $file, $filename);
            }
            throw $exception;
        }
    }

    private function deleteFile(string $disk, string $path): void
    {
        try {
            Storage::disk($disk)->delete($path);
        } catch (Throwable $exception) {
            if ($disk !== 'public' && $this->diskAvailable('public')) {
                Storage::disk('public')->delete($path);
                return;
            }
            throw $exception;
        }
    }
}
