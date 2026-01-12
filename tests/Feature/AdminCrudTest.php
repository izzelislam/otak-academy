<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\CourseSession;
use App\Models\Material;
use App\Models\RedeemCode;
use App\Models\User;
use App\Services\RedeemCodeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    // Course CRUD Tests
    public function test_admin_can_create_course(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.courses.store'), [
            'title' => 'New Course',
            'description' => 'Course description',
            'thumbnail' => '/images/thumb.jpg',
            'is_published' => true,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('courses', [
            'title' => 'New Course',
            'slug' => 'new-course',
        ]);
    }

    public function test_admin_can_update_course(): void
    {
        $course = Course::create(['title' => 'Original Title']);

        $response = $this->actingAs($this->admin)->put(route('admin.courses.update', $course), [
            'title' => 'Updated Title',
            'slug' => 'updated-title',
            'description' => 'Updated description',
            'is_published' => false,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('courses', [
            'id' => $course->id,
            'title' => 'Updated Title',
        ]);
    }

    public function test_admin_can_delete_course(): void
    {
        $course = Course::create(['title' => 'To Delete']);
        $courseId = $course->id;

        $response = $this->actingAs($this->admin)->delete(route('admin.courses.destroy', $course));

        $response->assertRedirect();
        $this->assertNull(Course::find($courseId));
    }

    // Session CRUD Tests
    public function test_admin_can_create_session(): void
    {
        $course = Course::create(['title' => 'Test Course']);

        $response = $this->actingAs($this->admin)->post(route('admin.courses.sessions.store', $course), [
            'title' => 'New Session',
            'order_priority' => 1,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('course_sessions', [
            'course_id' => $course->id,
            'title' => 'New Session',
        ]);
    }

    public function test_admin_can_update_session(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Original Session',
            'order_priority' => 1,
        ]);

        $response = $this->actingAs($this->admin)->put(
            route('admin.courses.sessions.update', [$course, $session]),
            [
                'title' => 'Updated Session',
                'order_priority' => 2,
            ]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('course_sessions', [
            'id' => $session->id,
            'title' => 'Updated Session',
        ]);
    }

    public function test_admin_can_delete_session(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'To Delete',
            'order_priority' => 1,
        ]);
        $sessionId = $session->id;

        $response = $this->actingAs($this->admin)->delete(
            route('admin.courses.sessions.destroy', [$course, $session])
        );

        $response->assertRedirect();
        $this->assertNull(CourseSession::find($sessionId));
    }

    // Material CRUD Tests
    public function test_admin_can_create_material(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);

        $response = $this->actingAs($this->admin)->post(
            route('admin.courses.sessions.materials.store', [$course, $session]),
            [
                'title' => 'New Material',
                'type' => 'video',
                'content' => 'https://youtube.com/watch?v=test',
                'order_priority' => 1,
            ]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('materials', [
            'session_id' => $session->id,
            'title' => 'New Material',
            'type' => 'video',
        ]);
    }

    public function test_admin_can_update_material(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Original Material',
            'type' => 'text',
            'content' => 'Original content',
            'order_priority' => 1,
        ]);

        $response = $this->actingAs($this->admin)->put(
            route('admin.courses.sessions.materials.update', [$course, $session, $material]),
            [
                'title' => 'Updated Material',
                'type' => 'pdf',
                'content' => '/path/to/file.pdf',
                'order_priority' => 2,
            ]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('materials', [
            'id' => $material->id,
            'title' => 'Updated Material',
            'type' => 'pdf',
        ]);
    }

    public function test_admin_can_delete_material(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'To Delete',
            'type' => 'text',
            'content' => 'Content',
            'order_priority' => 1,
        ]);
        $materialId = $material->id;

        $response = $this->actingAs($this->admin)->delete(
            route('admin.courses.sessions.materials.destroy', [$course, $session, $material])
        );

        $response->assertRedirect();
        $this->assertNull(Material::find($materialId));
    }

    // Material Type Validation
    public function test_material_type_validation(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);

        $response = $this->actingAs($this->admin)->post(
            route('admin.courses.sessions.materials.store', [$course, $session]),
            [
                'title' => 'Invalid Material',
                'type' => 'invalid_type',
                'content' => 'Content',
            ]
        );

        $response->assertSessionHasErrors('type');
    }

    // Redeem Code System Tests
    public function test_admin_can_generate_redeem_codes(): void
    {
        $course = Course::create(['title' => 'Test Course']);

        $response = $this->actingAs($this->admin)->post(route('admin.redeem-codes.store'), [
            'course_id' => $course->id,
            'quantity' => 5,
        ]);

        $response->assertRedirect();
        $this->assertEquals(5, RedeemCode::where('course_id', $course->id)->count());
    }

    public function test_redeem_code_format(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $service = new RedeemCodeService();

        $codes = $service->generate($course, 3);

        foreach ($codes as $code) {
            // Format: YYYY-XXXX (year-random)
            $this->assertMatchesRegularExpression('/^\d{4}-[A-Z0-9]{4}$/', $code->code);
            $this->assertFalse($code->is_used);
            $this->assertNull($code->user_id);
        }
    }

    public function test_member_can_redeem_valid_code(): void
    {
        $member = User::factory()->create(['role' => 'member']);
        $course = Course::create(['title' => 'Test Course']);
        $redeemCode = RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
            'is_used' => false,
        ]);

        $response = $this->actingAs($member)->post(route('member.redeem.store'), [
            'code' => 'PROMO-2024-TEST',
        ]);

        $response->assertRedirect();
        
        $redeemCode->refresh();
        $this->assertTrue($redeemCode->is_used);
        $this->assertEquals($member->id, $redeemCode->user_id);
        $this->assertNotNull($redeemCode->used_at);
    }

    public function test_member_cannot_redeem_used_code(): void
    {
        $member = User::factory()->create(['role' => 'member']);
        $otherUser = User::factory()->create(['role' => 'member']);
        $course = Course::create(['title' => 'Test Course']);
        
        RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-USED',
            'is_used' => true,
            'user_id' => $otherUser->id,
            'used_at' => now(),
        ]);

        $response = $this->actingAs($member)->post(route('member.redeem.store'), [
            'code' => 'PROMO-2024-USED',
        ]);

        $response->assertSessionHasErrors('code');
    }

    public function test_member_cannot_redeem_invalid_code(): void
    {
        $member = User::factory()->create(['role' => 'member']);

        $response = $this->actingAs($member)->post(route('member.redeem.store'), [
            'code' => 'INVALID-CODE',
        ]);

        $response->assertSessionHasErrors('code');
    }

    public function test_redeemed_course_appears_in_user_courses(): void
    {
        $member = User::factory()->create(['role' => 'member']);
        $course = Course::create(['title' => 'Test Course']);
        
        RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
            'is_used' => true,
            'user_id' => $member->id,
            'used_at' => now(),
        ]);

        $this->assertTrue($member->courses->contains($course));
    }
}
