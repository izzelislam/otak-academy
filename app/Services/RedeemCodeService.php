<?php

namespace App\Services;

use App\Models\Course;
use App\Models\RedeemCode;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class RedeemCodeService
{
    /**
     * Generate unique redeem codes for a course.
     *
     * @param Course $course
     * @param int $quantity
     * @return Collection<int, RedeemCode>
     */
    public function generate(Course $course, int $quantity): Collection
    {
        $codes = collect();

        for ($i = 0; $i < $quantity; $i++) {
            $code = $this->generateUniqueCode();
            
            $redeemCode = RedeemCode::create([
                'course_id' => $course->id,
                'code' => $code,
                'user_id' => null,
                'is_used' => false,
            ]);

            $codes->push($redeemCode);
        }

        return $codes;
    }

    /**
     * Generate a unique code with format YYYY-XXXX.
     *
     * @return string
     */
    protected function generateUniqueCode(): string
    {
        do {
            $year = date('Y');
            $random = strtoupper(Str::random(4));
            $code = "{$year}-{$random}";
        } while (RedeemCode::where('code', $code)->exists());

        return $code;
    }

    /**
     * Validate if a code exists and is available for redemption.
     *
     * @param string $code
     * @return array{valid: bool, error: string|null, redeemCode: RedeemCode|null}
     */
    public function validateCode(string $code): array
    {
        $redeemCode = RedeemCode::where('code', $code)->first();

        if (!$redeemCode) {
            return [
                'valid' => false,
                'error' => 'Invalid code',
                'redeemCode' => null,
            ];
        }

        if ($redeemCode->is_used) {
            return [
                'valid' => false,
                'error' => 'Code already used',
                'redeemCode' => $redeemCode,
            ];
        }

        return [
            'valid' => true,
            'error' => null,
            'redeemCode' => $redeemCode,
        ];
    }

    /**
     * Process code redemption for a user.
     *
     * @param User $user
     * @param string $code
     * @return array{success: bool, error: string|null, redeemCode: RedeemCode|null}
     */
    public function redeem(User $user, string $code): array
    {
        $validation = $this->validateCode($code);

        if (!$validation['valid']) {
            return [
                'success' => false,
                'error' => $validation['error'],
                'redeemCode' => null,
            ];
        }

        $redeemCode = $validation['redeemCode'];

        $redeemCode->update([
            'user_id' => $user->id,
            'is_used' => true,
            'used_at' => now(),
        ]);

        return [
            'success' => true,
            'error' => null,
            'redeemCode' => $redeemCode->fresh(),
        ];
    }

    /**
     * Check if a user has already redeemed a code for a specific course.
     *
     * @param User $user
     * @param Course $course
     * @return bool
     */
    public function hasUserRedeemedCourse(User $user, Course $course): bool
    {
        return RedeemCode::where('course_id', $course->id)
            ->where('user_id', $user->id)
            ->where('is_used', true)
            ->exists();
    }
}
