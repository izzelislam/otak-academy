<?php

namespace Tests\Feature;

use App\Models\AssetCode;
use App\Models\DownloadableAsset;
use App\Models\DownloadAuditLog;
use App\Models\DownloadToken;
use App\Models\User;
use App\Services\AssetCodeService;
use App\Services\DownloadAuditService;
use App\Services\DownloadTokenService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityServicesTest extends TestCase
{
    use RefreshDatabase;

    protected AssetCodeService $assetCodeService;
    protected DownloadTokenService $downloadTokenService;
    protected DownloadAuditService $downloadAuditService;
    protected DownloadableAsset $asset;
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->assetCodeService = new AssetCodeService();
        $this->downloadTokenService = new DownloadTokenService();
        $this->downloadAuditService = new DownloadAuditService();
        
        $this->asset = DownloadableAsset::create([
            'title' => 'Test Asset',
            'slug' => 'test-asset',
            'description' => 'Test description',
            'file_path' => '/private/test-file.pdf',
            'file_name' => 'test-file.pdf',
            'file_size' => 1024,
            'file_type' => 'application/pdf',
            'type' => 'paid',
            'download_count' => 0,
            'is_published' => true,
        ]);
        
        $this->user = User::factory()->create();
    }

    // ==========================================
    // AssetCodeService Tests
    // ==========================================

    public function test_generate_codes_creates_correct_quantity(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 5);
        
        $this->assertCount(5, $codes);
        $this->assertEquals(5, AssetCode::where('asset_id', $this->asset->id)->count());
    }

    public function test_generated_code_format_is_valid(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 3);
        
        foreach ($codes as $codeData) {
            $code = $codeData['code'];
            // Format: DL{3digits}-{8hex}-{2hex}
            $this->assertMatchesRegularExpression('/^DL\d{3}-[A-F0-9]{8}-[A-F0-9]{2}$/i', $code);
        }
    }

    public function test_generated_codes_are_unique(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 10);
        
        $plainCodes = $codes->pluck('code')->toArray();
        $uniqueCodes = array_unique($plainCodes);
        
        $this->assertCount(count($plainCodes), $uniqueCodes);
    }

    public function test_code_hash_is_stored_not_plaintext(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        $assetCode = $codes->first()['assetCode'];
        
        // The stored hash should not equal the plain code
        $this->assertNotEquals($plainCode, $assetCode->code_hash);
        // The hash should be a bcrypt hash (starts with $2y$)
        $this->assertStringStartsWith('$2y$', $assetCode->code_hash);
    }


    public function test_validate_code_format_accepts_valid_codes(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        
        $this->assertTrue($this->assetCodeService->validateCodeFormat($plainCode));
    }

    public function test_validate_code_format_rejects_invalid_codes(): void
    {
        $invalidCodes = [
            'INVALID',
            'DL001-ABCD1234',  // Missing checksum
            'DL001-ABCD1234-XX-EXTRA',  // Extra parts
            'XX001-ABCD1234-AB',  // Wrong prefix
            'DL01-ABCD1234-AB',  // Wrong digit count
        ];
        
        foreach ($invalidCodes as $code) {
            $this->assertFalse($this->assetCodeService->validateCodeFormat($code), "Code '$code' should be invalid");
        }
    }

    public function test_validate_code_detects_tampered_checksum(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        
        // Tamper with the checksum
        $parts = explode('-', $plainCode);
        $parts[2] = 'XX';  // Invalid checksum
        $tamperedCode = implode('-', $parts);
        
        $this->assertFalse($this->assetCodeService->validateCodeFormat($tamperedCode));
    }

    public function test_validate_code_returns_valid_for_correct_code(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        
        $result = $this->assetCodeService->validateCode($plainCode, $this->asset);
        
        $this->assertTrue($result['valid']);
        $this->assertNull($result['error']);
        $this->assertNotNull($result['assetCode']);
    }

    public function test_validate_code_returns_generic_error_for_invalid_code(): void
    {
        $result = $this->assetCodeService->validateCode('DL001-INVALID1-XX', $this->asset);
        
        $this->assertFalse($result['valid']);
        $this->assertEquals('Invalid or expired code', $result['error']);
    }

    public function test_redeem_code_marks_code_as_used(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        
        $result = $this->assetCodeService->redeemCode($plainCode, $this->asset, $this->user);
        
        $this->assertTrue($result['success']);
        $this->assertTrue($result['assetCode']->is_used);
        $this->assertEquals($this->user->id, $result['assetCode']->user_id);
        $this->assertNotNull($result['assetCode']->used_at);
    }

    public function test_redeem_code_returns_generic_error_for_already_used_code(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        
        // First redemption
        $this->assetCodeService->redeemCode($plainCode, $this->asset, $this->user);
        
        // Update to exceed max downloads
        AssetCode::where('asset_id', $this->asset->id)->update([
            'download_count' => 3,
            'max_downloads' => 3,
        ]);
        
        // Second redemption attempt
        $anotherUser = User::factory()->create();
        $result = $this->assetCodeService->redeemCode($plainCode, $this->asset, $anotherUser);
        
        $this->assertFalse($result['success']);
        $this->assertEquals('Invalid or expired code', $result['error']);
    }

    public function test_has_valid_redemption_returns_true_for_valid_redemption(): void
    {
        $codes = $this->assetCodeService->generateCodes($this->asset, 1);
        $plainCode = $codes->first()['code'];
        
        $this->assetCodeService->redeemCode($plainCode, $this->asset, $this->user);
        
        $this->assertTrue($this->assetCodeService->hasValidRedemption($this->user, $this->asset));
    }

    public function test_has_valid_redemption_returns_false_for_no_redemption(): void
    {
        $this->assertFalse($this->assetCodeService->hasValidRedemption($this->user, $this->asset));
    }


    // ==========================================
    // DownloadTokenService Tests
    // ==========================================

    public function test_generate_token_creates_valid_token(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $this->assertNotEmpty($token);
        $this->assertStringContainsString('.', $token);  // Has signature separator
    }

    public function test_generate_token_stores_token_in_database(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $this->assertEquals(1, DownloadToken::count());
        
        $storedToken = DownloadToken::first();
        $this->assertEquals($this->asset->id, $storedToken->asset_id);
        $this->assertEquals($this->user->id, $storedToken->user_id);
        $this->assertEquals('192.168.1.1', $storedToken->ip_address);
    }

    public function test_validate_token_returns_asset_for_valid_token(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $asset = $this->downloadTokenService->validateToken($token, '192.168.1.1');
        
        $this->assertNotNull($asset);
        $this->assertEquals($this->asset->id, $asset->id);
    }

    public function test_validate_token_returns_null_for_invalid_signature(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        // Tamper with signature
        $parts = explode('.', $token);
        $parts[1] = 'invalid_signature';
        $tamperedToken = implode('.', $parts);
        
        $asset = $this->downloadTokenService->validateToken($tamperedToken, '192.168.1.1');
        
        $this->assertNull($asset);
    }

    public function test_validate_token_returns_null_for_different_ip(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $asset = $this->downloadTokenService->validateToken($token, '10.0.0.1');
        
        $this->assertNull($asset);
    }

    public function test_validate_token_returns_null_for_expired_token(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        // Manually expire the token
        DownloadToken::where('asset_id', $this->asset->id)->update([
            'expires_at' => now()->subMinutes(10),
        ]);
        
        $asset = $this->downloadTokenService->validateToken($token, '192.168.1.1');
        
        $this->assertNull($asset);
    }

    public function test_consume_token_marks_token_as_consumed(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $result = $this->downloadTokenService->consumeToken($token);
        
        $this->assertTrue($result);
        
        $storedToken = DownloadToken::first();
        $this->assertNotNull($storedToken->consumed_at);
    }

    public function test_validate_token_returns_null_for_consumed_token(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $this->downloadTokenService->consumeToken($token);
        
        $asset = $this->downloadTokenService->validateToken($token, '192.168.1.1');
        
        $this->assertNull($asset);
    }

    public function test_is_token_consumed_returns_correct_status(): void
    {
        $token = $this->downloadTokenService->generateToken($this->asset, $this->user, '192.168.1.1');
        
        $this->assertFalse($this->downloadTokenService->isTokenConsumed($token));
        
        $this->downloadTokenService->consumeToken($token);
        
        $this->assertTrue($this->downloadTokenService->isTokenConsumed($token));
    }


    // ==========================================
    // DownloadAuditService Tests
    // ==========================================

    public function test_log_attempt_creates_audit_log(): void
    {
        $log = $this->downloadAuditService->logAttempt(
            $this->asset,
            $this->user,
            '192.168.1.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_CODE_ATTEMPT,
            DownloadAuditLog::RESULT_SUCCESS,
            'Test details'
        );
        
        $this->assertNotNull($log);
        $this->assertEquals($this->asset->id, $log->asset_id);
        $this->assertEquals($this->user->id, $log->user_id);
        $this->assertEquals('192.168.1.1', $log->ip_address);
        $this->assertEquals('Mozilla/5.0', $log->user_agent);
        $this->assertEquals(DownloadAuditLog::ACTION_CODE_ATTEMPT, $log->action);
        $this->assertEquals(DownloadAuditLog::RESULT_SUCCESS, $log->result);
    }

    public function test_log_attempt_stores_details_as_json(): void
    {
        $log = $this->downloadAuditService->logAttempt(
            $this->asset,
            $this->user,
            '192.168.1.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_CODE_ATTEMPT,
            DownloadAuditLog::RESULT_SUCCESS,
            'Test message'
        );
        
        $this->assertIsArray($log->details);
        $this->assertEquals('Test message', $log->details['message']);
    }

    public function test_get_failed_attempts_counts_correctly(): void
    {
        // Create some failed attempts
        for ($i = 0; $i < 5; $i++) {
            $this->downloadAuditService->logAttempt(
                $this->asset,
                null,
                '192.168.1.1',
                'Mozilla/5.0',
                DownloadAuditLog::ACTION_CODE_ATTEMPT,
                DownloadAuditLog::RESULT_FAILED
            );
        }
        
        // Create a success attempt (should not be counted)
        $this->downloadAuditService->logAttempt(
            $this->asset,
            $this->user,
            '192.168.1.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_CODE_SUCCESS,
            DownloadAuditLog::RESULT_SUCCESS
        );
        
        $failedCount = $this->downloadAuditService->getFailedAttempts('192.168.1.1', 60);
        
        $this->assertEquals(5, $failedCount);
    }

    public function test_get_failed_attempts_filters_by_ip(): void
    {
        // Create failed attempts from different IPs
        for ($i = 0; $i < 3; $i++) {
            $this->downloadAuditService->logAttempt(
                $this->asset,
                null,
                '192.168.1.1',
                'Mozilla/5.0',
                DownloadAuditLog::ACTION_CODE_ATTEMPT,
                DownloadAuditLog::RESULT_FAILED
            );
        }
        
        for ($i = 0; $i < 2; $i++) {
            $this->downloadAuditService->logAttempt(
                $this->asset,
                null,
                '10.0.0.1',
                'Mozilla/5.0',
                DownloadAuditLog::ACTION_CODE_ATTEMPT,
                DownloadAuditLog::RESULT_FAILED
            );
        }
        
        $this->assertEquals(3, $this->downloadAuditService->getFailedAttempts('192.168.1.1', 60));
        $this->assertEquals(2, $this->downloadAuditService->getFailedAttempts('10.0.0.1', 60));
    }

    public function test_suspicious_activity_flagged_after_threshold(): void
    {
        // Create 10 failed attempts (threshold)
        for ($i = 0; $i < 10; $i++) {
            $this->downloadAuditService->logAttempt(
                $this->asset,
                null,
                '192.168.1.1',
                'Mozilla/5.0',
                DownloadAuditLog::ACTION_CODE_ATTEMPT,
                DownloadAuditLog::RESULT_FAILED
            );
        }
        
        // The 11th attempt should be flagged as suspicious
        $log = $this->downloadAuditService->logAttempt(
            $this->asset,
            null,
            '192.168.1.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_CODE_ATTEMPT,
            DownloadAuditLog::RESULT_FAILED
        );
        
        $this->assertTrue($log->is_suspicious);
    }

    public function test_get_logs_returns_paginated_results(): void
    {
        // Create some logs
        for ($i = 0; $i < 5; $i++) {
            $this->downloadAuditService->logAttempt(
                $this->asset,
                $this->user,
                '192.168.1.1',
                'Mozilla/5.0',
                DownloadAuditLog::ACTION_DOWNLOAD_REQUEST,
                DownloadAuditLog::RESULT_SUCCESS
            );
        }
        
        $logs = $this->downloadAuditService->getLogs([], 10);
        
        $this->assertEquals(5, $logs->total());
    }

    public function test_get_logs_filters_by_ip(): void
    {
        $this->downloadAuditService->logAttempt(
            $this->asset,
            null,
            '192.168.1.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_CODE_ATTEMPT,
            DownloadAuditLog::RESULT_FAILED
        );
        
        $this->downloadAuditService->logAttempt(
            $this->asset,
            null,
            '10.0.0.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_CODE_ATTEMPT,
            DownloadAuditLog::RESULT_FAILED
        );
        
        $logs = $this->downloadAuditService->getLogs(['ip_address' => '192.168.1.1'], 10);
        
        $this->assertEquals(1, $logs->total());
    }

    public function test_get_flagged_logs_returns_only_suspicious(): void
    {
        // Create normal log
        $this->downloadAuditService->logAttempt(
            $this->asset,
            $this->user,
            '192.168.1.1',
            'Mozilla/5.0',
            DownloadAuditLog::ACTION_DOWNLOAD_COMPLETE,
            DownloadAuditLog::RESULT_SUCCESS
        );
        
        // Create suspicious log manually
        DownloadAuditLog::create([
            'asset_id' => $this->asset->id,
            'user_id' => null,
            'ip_address' => '10.0.0.1',
            'user_agent' => 'Bot',
            'action' => DownloadAuditLog::ACTION_CODE_ATTEMPT,
            'result' => DownloadAuditLog::RESULT_FAILED,
            'is_suspicious' => true,
        ]);
        
        $flaggedLogs = $this->downloadAuditService->getFlaggedLogs(10);
        
        $this->assertEquals(1, $flaggedLogs->total());
        $this->assertTrue($flaggedLogs->first()->is_suspicious);
    }
}
