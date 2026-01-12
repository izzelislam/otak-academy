<?php

namespace Tests\Feature;

use App\Http\Middleware\AssetRateLimiter;
use App\Utilities\PathValidator;
use Illuminate\Cache\RateLimiter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class RateLimiterAndPathValidatorTest extends TestCase
{
    use RefreshDatabase;

    protected RateLimiter $rateLimiter;

    protected function setUp(): void
    {
        parent::setUp();
        $this->rateLimiter = app(RateLimiter::class);
    }

    protected function tearDown(): void
    {
        // Clear rate limits after each test
        $this->rateLimiter->clear('asset_rate_limit:code:127.0.0.1');
        $this->rateLimiter->clear('asset_rate_limit:download:127.0.0.1');
        $this->rateLimiter->clear('asset_cooldown:code:127.0.0.1');
        $this->rateLimiter->clear('asset_cooldown:download:127.0.0.1');
        parent::tearDown();
    }

    // ==========================================
    // AssetRateLimiter Tests
    // ==========================================

    public function test_rate_limiter_allows_requests_under_limit(): void
    {
        $middleware = new AssetRateLimiter($this->rateLimiter);
        $request = Request::create('/test', 'POST');
        $request->server->set('REMOTE_ADDR', '127.0.0.1');

        $response = $middleware->handle($request, function ($req) {
            return response()->json(['success' => true]);
        }, 'code');

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(5, $response->headers->get('X-RateLimit-Limit'));
        $this->assertEquals(4, $response->headers->get('X-RateLimit-Remaining'));
    }

    public function test_rate_limiter_blocks_after_exceeding_code_limit(): void
    {
        $middleware = new AssetRateLimiter($this->rateLimiter);
        
        // Make 5 requests (the limit)
        for ($i = 0; $i < 5; $i++) {
            $request = Request::create('/test', 'POST');
            $request->server->set('REMOTE_ADDR', '127.0.0.1');
            
            $middleware->handle($request, function ($req) {
                return response()->json(['success' => true]);
            }, 'code');
        }

        // 6th request should be blocked
        $request = Request::create('/test', 'POST');
        $request->server->set('REMOTE_ADDR', '127.0.0.1');
        
        $response = $middleware->handle($request, function ($req) {
            return response()->json(['success' => true]);
        }, 'code');

        $this->assertEquals(429, $response->getStatusCode());
    }

    public function test_rate_limiter_download_has_higher_limit(): void
    {
        $middleware = new AssetRateLimiter($this->rateLimiter);
        
        // Make 10 download requests (the limit)
        for ($i = 0; $i < 10; $i++) {
            $request = Request::create('/download', 'GET');
            $request->server->set('REMOTE_ADDR', '127.0.0.1');
            
            $response = $middleware->handle($request, function ($req) {
                return response()->json(['success' => true]);
            }, 'download');
            
            $this->assertEquals(200, $response->getStatusCode());
        }

        // 11th request should be blocked
        $request = Request::create('/download', 'GET');
        $request->server->set('REMOTE_ADDR', '127.0.0.1');
        
        $response = $middleware->handle($request, function ($req) {
            return response()->json(['success' => true]);
        }, 'download');

        $this->assertEquals(429, $response->getStatusCode());
    }

    public function test_rate_limiter_returns_retry_after_header(): void
    {
        $middleware = new AssetRateLimiter($this->rateLimiter);
        
        // Exceed the limit
        for ($i = 0; $i < 6; $i++) {
            $request = Request::create('/test', 'POST');
            $request->server->set('REMOTE_ADDR', '127.0.0.1');
            
            $response = $middleware->handle($request, function ($req) {
                return response()->json(['success' => true]);
            }, 'code');
        }

        $this->assertTrue($response->headers->has('Retry-After'));
        $this->assertGreaterThan(0, (int) $response->headers->get('Retry-After'));
    }

    public function test_rate_limiter_static_methods_return_correct_values(): void
    {
        $this->assertEquals(15, AssetRateLimiter::getCooldownMinutes());
        $this->assertEquals(5, AssetRateLimiter::getCodeValidationMaxAttempts());
        $this->assertEquals(10, AssetRateLimiter::getDownloadMaxAttempts());
    }

    // ==========================================
    // PathValidator Tests
    // ==========================================

    public function test_path_validator_accepts_valid_paths(): void
    {
        $validPaths = [
            'file.pdf',
            'folder/file.pdf',
            'folder/subfolder/file.pdf',
            'my-file_name.pdf',
            'document.PDF',
        ];

        foreach ($validPaths as $path) {
            $this->assertTrue(
                PathValidator::validateFilePath($path),
                "Path '$path' should be valid"
            );
        }
    }

    public function test_path_validator_rejects_directory_traversal(): void
    {
        $traversalPaths = [
            '../etc/passwd',
            '..\\windows\\system32',
            'folder/../../../etc/passwd',
            'folder/..\\..\\windows',
            '....//etc/passwd',
            '%2e%2e%2fetc/passwd',
            '..%2fetc/passwd',
            '%2e%2e/etc/passwd',
        ];

        foreach ($traversalPaths as $path) {
            $this->assertFalse(
                PathValidator::validateFilePath($path),
                "Path '$path' should be rejected (directory traversal)"
            );
        }
    }

    public function test_path_validator_rejects_null_bytes(): void
    {
        $nullBytePaths = [
            "file.pdf\0.txt",
            "file%00.pdf",
            "folder\0/file.pdf",
        ];

        foreach ($nullBytePaths as $path) {
            $this->assertFalse(
                PathValidator::validateFilePath($path),
                "Path '$path' should be rejected (null byte)"
            );
        }
    }

    public function test_path_validator_rejects_dangerous_system_paths(): void
    {
        $dangerousPaths = [
            '/etc/passwd',
            '/var/log/syslog',
            'C:\\Windows\\System32',
            '\\\\server\\share',
        ];

        foreach ($dangerousPaths as $path) {
            $this->assertFalse(
                PathValidator::validateFilePath($path),
                "Path '$path' should be rejected (dangerous system path)"
            );
        }
    }

    public function test_path_validator_rejects_empty_paths(): void
    {
        $this->assertFalse(PathValidator::validateFilePath(''));
        $this->assertFalse(PathValidator::validateFilePath('   '));
    }

    public function test_path_validator_validate_or_fail_throws_exception(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid file path: potential directory traversal detected');
        
        PathValidator::validateOrFail('../etc/passwd');
    }

    public function test_path_validator_validate_or_fail_returns_sanitized_path(): void
    {
        $result = PathValidator::validateOrFail('folder/file.pdf');
        $this->assertEquals('folder/file.pdf', $result);
    }

    public function test_path_validator_sanitize_path_normalizes_slashes(): void
    {
        $this->assertEquals('folder/file.pdf', PathValidator::sanitizePath('folder\\file.pdf'));
        $this->assertEquals('folder/file.pdf', PathValidator::sanitizePath('folder//file.pdf'));
    }

    public function test_path_validator_sanitize_filename_removes_path_components(): void
    {
        $this->assertEquals('file_pdf', PathValidator::sanitizeFilename('../folder/file.pdf'));
        $this->assertEquals('file_pdf', PathValidator::sanitizeFilename('/etc/passwd/file.pdf'));
    }

    public function test_path_validator_sanitize_filename_removes_dangerous_characters(): void
    {
        $this->assertEquals('file_name_pdf', PathValidator::sanitizeFilename('file<name>.pdf'));
        $this->assertEquals('file_pdf', PathValidator::sanitizeFilename("file\0.pdf"));
    }

    public function test_path_validator_has_allowed_extension(): void
    {
        $allowedExtensions = ['pdf', 'zip', 'doc'];
        
        $this->assertTrue(PathValidator::hasAllowedExtension('file.pdf', $allowedExtensions));
        $this->assertTrue(PathValidator::hasAllowedExtension('file.PDF', $allowedExtensions));
        $this->assertTrue(PathValidator::hasAllowedExtension('file.zip', $allowedExtensions));
        $this->assertFalse(PathValidator::hasAllowedExtension('file.exe', $allowedExtensions));
        $this->assertFalse(PathValidator::hasAllowedExtension('file.php', $allowedExtensions));
    }
}
