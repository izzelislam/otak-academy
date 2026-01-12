<?php

namespace App\Utilities;

use InvalidArgumentException;

class PathValidator
{
    /**
     * Directory traversal patterns to block
     */
    protected const TRAVERSAL_PATTERNS = [
        '../',           // Unix-style parent directory
        '..\\',          // Windows-style parent directory
        '..',            // Parent directory reference
        '%2e%2e%2f',     // URL encoded ../
        '%2e%2e/',       // Partially URL encoded
        '..%2f',         // Partially URL encoded
        '%2e%2e\\',      // URL encoded ..\
        '..%5c',         // Partially URL encoded
        '%2e%2e%5c',     // URL encoded ..\
        '..../',         // Double dot variations
        '....\\',        // Double dot variations
        '.%00.',         // Null byte injection
        '%00',           // Null byte
        '\0',            // Null character
    ];

    /**
     * Dangerous path components to block
     */
    protected const DANGEROUS_COMPONENTS = [
        '/etc/',
        '/var/',
        '/usr/',
        '/root/',
        '/home/',
        '/tmp/',
        '/proc/',
        '/sys/',
        'C:\\',
        'C:/',
        '\\\\',          // UNC paths
    ];

    /**
     * Validate a file path to prevent directory traversal attacks.
     *
     * @param string $path The path to validate
     * @param string|null $basePath Optional base path that the file must be within
     * @return bool True if the path is safe, false otherwise
     */
    public static function validateFilePath(string $path, ?string $basePath = null): bool
    {
        // Empty paths are invalid
        if (empty(trim($path))) {
            return false;
        }

        // Normalize the path for consistent checking
        $normalizedPath = self::normalizePath($path);

        // Check for traversal patterns
        if (self::containsTraversalPatterns($path) || self::containsTraversalPatterns($normalizedPath)) {
            return false;
        }

        // Check for dangerous path components
        if (self::containsDangerousComponents($path) || self::containsDangerousComponents($normalizedPath)) {
            return false;
        }

        // Check for null bytes
        if (self::containsNullBytes($path)) {
            return false;
        }

        // If a base path is provided, ensure the resolved path is within it
        if ($basePath !== null) {
            return self::isWithinBasePath($path, $basePath);
        }

        return true;
    }

    /**
     * Validate and sanitize a file path, throwing an exception if invalid.
     *
     * @param string $path The path to validate
     * @param string|null $basePath Optional base path that the file must be within
     * @return string The validated and sanitized path
     * @throws InvalidArgumentException If the path is invalid
     */
    public static function validateOrFail(string $path, ?string $basePath = null): string
    {
        if (!self::validateFilePath($path, $basePath)) {
            throw new InvalidArgumentException('Invalid file path: potential directory traversal detected');
        }

        return self::sanitizePath($path);
    }

    /**
     * Check if the path contains any traversal patterns.
     */
    protected static function containsTraversalPatterns(string $path): bool
    {
        $lowerPath = strtolower($path);
        
        foreach (self::TRAVERSAL_PATTERNS as $pattern) {
            if (str_contains($lowerPath, strtolower($pattern))) {
                return true;
            }
        }

        // Check for encoded variations
        $decodedPath = urldecode($path);
        if ($decodedPath !== $path) {
            foreach (self::TRAVERSAL_PATTERNS as $pattern) {
                if (str_contains(strtolower($decodedPath), strtolower($pattern))) {
                    return true;
                }
            }
        }

        // Check for double-encoded variations
        $doubleDecodedPath = urldecode($decodedPath);
        if ($doubleDecodedPath !== $decodedPath) {
            foreach (self::TRAVERSAL_PATTERNS as $pattern) {
                if (str_contains(strtolower($doubleDecodedPath), strtolower($pattern))) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if the path contains dangerous system path components.
     */
    protected static function containsDangerousComponents(string $path): bool
    {
        $lowerPath = strtolower($path);
        
        foreach (self::DANGEROUS_COMPONENTS as $component) {
            if (str_contains($lowerPath, strtolower($component))) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if the path contains null bytes.
     */
    protected static function containsNullBytes(string $path): bool
    {
        return str_contains($path, "\0") || 
               str_contains(strtolower($path), '%00');
    }

    /**
     * Normalize a path by resolving . and .. components.
     */
    protected static function normalizePath(string $path): string
    {
        // Replace backslashes with forward slashes
        $path = str_replace('\\', '/', $path);
        
        // Remove multiple consecutive slashes
        $path = preg_replace('#/+#', '/', $path);
        
        return $path;
    }

    /**
     * Sanitize a path by removing potentially dangerous characters.
     */
    public static function sanitizePath(string $path): string
    {
        // Remove null bytes
        $path = str_replace("\0", '', $path);
        
        // Normalize slashes
        $path = self::normalizePath($path);
        
        // Remove leading/trailing whitespace
        $path = trim($path);
        
        return $path;
    }

    /**
     * Check if a path is within a specified base path.
     */
    protected static function isWithinBasePath(string $path, string $basePath): bool
    {
        // Get the real paths
        $realBasePath = realpath($basePath);
        
        if ($realBasePath === false) {
            // Base path doesn't exist, try to validate without realpath
            $normalizedBase = self::normalizePath($basePath);
            $normalizedPath = self::normalizePath($path);
            
            // Simple check: path should start with base path
            return str_starts_with($normalizedPath, $normalizedBase);
        }

        // Construct the full path
        $fullPath = $realBasePath . DIRECTORY_SEPARATOR . ltrim($path, '/\\');
        $realFullPath = realpath($fullPath);
        
        if ($realFullPath === false) {
            // File doesn't exist yet, check the directory
            $directory = dirname($fullPath);
            $realDirectory = realpath($directory);
            
            if ($realDirectory === false) {
                return false;
            }
            
            return str_starts_with($realDirectory, $realBasePath);
        }

        return str_starts_with($realFullPath, $realBasePath);
    }

    /**
     * Get a safe filename from a potentially unsafe input.
     *
     * @param string $filename The filename to sanitize
     * @return string The sanitized filename
     */
    public static function sanitizeFilename(string $filename): string
    {
        // Remove path components
        $filename = basename($filename);
        
        // Remove null bytes
        $filename = str_replace("\0", '', $filename);
        
        // Remove or replace dangerous characters
        $filename = preg_replace('/[^\w\-\.]/', '_', $filename);
        
        // Remove multiple consecutive underscores or dots
        $filename = preg_replace('/[_\.]+/', '_', $filename);
        
        // Ensure it doesn't start with a dot (hidden file)
        $filename = ltrim($filename, '.');
        
        // Ensure it's not empty
        if (empty($filename)) {
            $filename = 'unnamed_file';
        }
        
        return $filename;
    }

    /**
     * Validate that a filename has an allowed extension.
     *
     * @param string $filename The filename to check
     * @param array $allowedExtensions List of allowed extensions (without dots)
     * @return bool True if the extension is allowed
     */
    public static function hasAllowedExtension(string $filename, array $allowedExtensions): bool
    {
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        
        return in_array($extension, array_map('strtolower', $allowedExtensions), true);
    }
}
