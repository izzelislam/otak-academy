<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\CourseSession;
use App\Models\Material;
use App\Models\RedeemCode;
use App\Models\User;
use App\Models\UserProgress;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModelRelationshipsTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_has_redeemed_codes_relationship(): void
    {
        $user = User::factory()->create();
        $course = Course::create([
            'title' => 'Test Course',
            'description' => 'Test Description',
        ]);
        
        $redeemCode = RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
            'user_id' => $user->id,
            'is_used' => true,
        ]);

        $this->assertTrue($user->redeemedCodes->contains($redeemCode));
    }

    public function test_user_has_progress_relationship(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'text',
            'content' => 'Test content',
            'order_priority' => 1,
        ]);
        
        $progress = UserProgress::create([
            'user_id' => $user->id,
            'material_id' => $material->id,
            'is_completed' => true,
            'completed_at' => now(),
        ]);

        $this->assertTrue($user->progress->contains($progress));
    }

    public function test_user_has_courses_through_redeem_codes(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        
        RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
            'user_id' => $user->id,
            'is_used' => true,
        ]);

        $this->assertTrue($user->courses->contains($course));
    }

    public function test_user_is_admin_and_is_member_methods(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $member = User::factory()->create(['role' => 'member']);

        $this->assertTrue($admin->isAdmin());
        $this->assertFalse($admin->isMember());
        $this->assertTrue($member->isMember());
        $this->assertFalse($member->isAdmin());
    }

    public function test_course_has_sessions_relationship(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);

        $this->assertTrue($course->sessions->contains($session));
    }

    public function test_course_has_redeem_codes_relationship(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $redeemCode = RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
        ]);

        $this->assertTrue($course->redeemCodes->contains($redeemCode));
    }

    public function test_course_has_materials_through_sessions(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'video',
            'content' => 'https://youtube.com/test',
            'order_priority' => 1,
        ]);

        $this->assertTrue($course->materials->contains($material));
    }

    public function test_course_has_enrolled_users_relationship(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        
        RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
            'user_id' => $user->id,
            'is_used' => true,
        ]);

        $this->assertTrue($course->enrolledUsers->contains($user));
    }

    public function test_course_generates_unique_slug(): void
    {
        $course1 = Course::create(['title' => 'Test Course']);
        $course2 = Course::create(['title' => 'Test Course']);

        $this->assertEquals('test-course', $course1->slug);
        $this->assertEquals('test-course-1', $course2->slug);
    }

    public function test_session_belongs_to_course(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);

        $this->assertEquals($course->id, $session->course->id);
    }

    public function test_session_has_materials_relationship(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'text',
            'content' => 'Test content',
            'order_priority' => 1,
        ]);

        $this->assertTrue($session->materials->contains($material));
    }

    public function test_material_belongs_to_session(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'pdf',
            'content' => '/path/to/file.pdf',
            'order_priority' => 1,
        ]);

        $this->assertEquals($session->id, $material->session->id);
    }

    public function test_material_has_progress_relationship(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'text',
            'content' => 'Test content',
            'order_priority' => 1,
        ]);
        
        $progress = UserProgress::create([
            'user_id' => $user->id,
            'material_id' => $material->id,
            'is_completed' => true,
            'completed_at' => now(),
        ]);

        $this->assertTrue($material->progress->contains($progress));
    }

    public function test_material_has_course_through_session(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'gmeet',
            'content' => 'https://meet.google.com/test',
            'order_priority' => 1,
        ]);

        $this->assertEquals($course->id, $material->course->id);
    }

    public function test_redeem_code_belongs_to_course(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $redeemCode = RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
        ]);

        $this->assertEquals($course->id, $redeemCode->course->id);
    }

    public function test_redeem_code_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        $redeemCode = RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
            'user_id' => $user->id,
            'is_used' => true,
        ]);

        $this->assertEquals($user->id, $redeemCode->user->id);
    }

    public function test_user_progress_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'text',
            'content' => 'Test content',
            'order_priority' => 1,
        ]);
        
        $progress = UserProgress::create([
            'user_id' => $user->id,
            'material_id' => $material->id,
            'is_completed' => true,
            'completed_at' => now(),
        ]);

        $this->assertEquals($user->id, $progress->user->id);
    }

    public function test_user_progress_belongs_to_material(): void
    {
        $user = User::factory()->create();
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'ebook',
            'content' => '/path/to/ebook.epub',
            'order_priority' => 1,
        ]);
        
        $progress = UserProgress::create([
            'user_id' => $user->id,
            'material_id' => $material->id,
            'is_completed' => true,
            'completed_at' => now(),
        ]);

        $this->assertEquals($material->id, $progress->material->id);
    }

    public function test_sessions_ordered_by_priority(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        
        $session3 = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Session 3',
            'order_priority' => 3,
        ]);
        $session1 = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Session 1',
            'order_priority' => 1,
        ]);
        $session2 = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Session 2',
            'order_priority' => 2,
        ]);

        $sessions = $course->sessions;
        
        $this->assertEquals('Session 1', $sessions[0]->title);
        $this->assertEquals('Session 2', $sessions[1]->title);
        $this->assertEquals('Session 3', $sessions[2]->title);
    }

    public function test_materials_ordered_by_priority(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        
        $material3 = Material::create([
            'session_id' => $session->id,
            'title' => 'Material 3',
            'type' => 'text',
            'content' => 'Content 3',
            'order_priority' => 3,
        ]);
        $material1 = Material::create([
            'session_id' => $session->id,
            'title' => 'Material 1',
            'type' => 'text',
            'content' => 'Content 1',
            'order_priority' => 1,
        ]);
        $material2 = Material::create([
            'session_id' => $session->id,
            'title' => 'Material 2',
            'type' => 'text',
            'content' => 'Content 2',
            'order_priority' => 2,
        ]);

        $materials = $session->materials;
        
        $this->assertEquals('Material 1', $materials[0]->title);
        $this->assertEquals('Material 2', $materials[1]->title);
        $this->assertEquals('Material 3', $materials[2]->title);
    }

    public function test_cascade_delete_course_removes_sessions(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        
        $sessionId = $session->id;
        $course->delete();
        
        $this->assertNull(CourseSession::find($sessionId));
    }

    public function test_cascade_delete_session_removes_materials(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $session = CourseSession::create([
            'course_id' => $course->id,
            'title' => 'Test Session',
            'order_priority' => 1,
        ]);
        $material = Material::create([
            'session_id' => $session->id,
            'title' => 'Test Material',
            'type' => 'text',
            'content' => 'Test content',
            'order_priority' => 1,
        ]);
        
        $materialId = $material->id;
        $session->delete();
        
        $this->assertNull(Material::find($materialId));
    }

    public function test_cascade_delete_course_removes_redeem_codes(): void
    {
        $course = Course::create(['title' => 'Test Course']);
        $redeemCode = RedeemCode::create([
            'course_id' => $course->id,
            'code' => 'PROMO-2024-TEST',
        ]);
        
        $codeId = $redeemCode->id;
        $course->delete();
        
        $this->assertNull(RedeemCode::find($codeId));
    }
}
