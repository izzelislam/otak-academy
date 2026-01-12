# Requirements Document

## Introduction

Platform e-learning sederhana yang memungkinkan Admin mengelola kursus, sesi, dan materi pembelajaran, sementara Member dapat belajar secara sekuensial setelah melakukan aktivasi menggunakan kode redeem unik. Platform dibangun dengan Laravel 12, React (Inertia.js), Tailwind CSS, dan MySQL.

## Glossary

- **Platform**: Sistem e-learning yang dibangun
- **Admin**: Pengguna dengan role administrator yang mengelola konten dan kode redeem
- **Member**: Pengguna yang mengakses kursus setelah redeem kode
- **Course**: Kursus pembelajaran yang berisi beberapa sesi
- **Session**: Bagian dari course yang berisi beberapa materi
- **Material**: Konten pembelajaran (video, text, pdf, ebook, gmeet)
- **Redeem_Code**: Kode unik untuk mengaktifkan akses ke course
- **User_Progress**: Record tracking penyelesaian materi oleh member
- **Linear_Learning**: Sistem pembelajaran berurutan dimana materi harus diselesaikan secara sekuensial

## Requirements

### Requirement 1: User Authentication and Role Management

**User Story:** As a user, I want to register and login to the platform, so that I can access features based on my role (admin or member).

#### Acceptance Criteria

1. WHEN a user registers, THE Platform SHALL create an account with default role "member"
2. WHEN a user logs in with valid credentials, THE Platform SHALL authenticate and redirect based on role
3. WHEN an admin accesses /admin/* routes, THE Platform SHALL allow access
4. WHEN a member accesses /admin/* routes, THE Platform SHALL deny access and redirect to member dashboard
5. IF a user provides invalid credentials, THEN THE Platform SHALL display an error message and prevent login

### Requirement 2: Course Management

**User Story:** As an admin, I want to create and manage courses, so that I can provide learning content to members.

#### Acceptance Criteria

1. WHEN an admin creates a course, THE Platform SHALL store title, slug, description, thumbnail, and is_published status
2. WHEN an admin updates a course, THE Platform SHALL save the changes and maintain existing relationships
3. WHEN an admin deletes a course, THE Platform SHALL remove the course and all related sessions, materials, and redeem codes
4. WHEN an admin sets is_published to false, THE Platform SHALL hide the course from member access
5. THE Platform SHALL generate unique slug from course title automatically

### Requirement 3: Session Management

**User Story:** As an admin, I want to create and manage sessions within a course, so that I can organize learning content hierarchically.

#### Acceptance Criteria

1. WHEN an admin creates a session, THE Platform SHALL store title, course_id, and order_priority
2. WHEN an admin updates session order_priority, THE Platform SHALL reorder sessions accordingly
3. WHEN an admin deletes a session, THE Platform SHALL remove the session and all related materials
4. THE Platform SHALL display sessions ordered by order_priority ascending

### Requirement 4: Material Management

**User Story:** As an admin, I want to create and manage materials within sessions, so that I can provide various types of learning content.

#### Acceptance Criteria

1. WHEN an admin creates a material, THE Platform SHALL store title, session_id, type, content, and order_priority
2. THE Platform SHALL support material types: video, text, pdf, ebook, gmeet
3. WHEN material type is "video", THE Platform SHALL store embed URL for YouTube/Vimeo
4. WHEN material type is "text", THE Platform SHALL store rich text/markdown content
5. WHEN material type is "pdf", THE Platform SHALL store PDF URL for viewer
6. WHEN material type is "ebook", THE Platform SHALL store downloadable file path
7. WHEN material type is "gmeet", THE Platform SHALL store Google Meet link
8. THE Platform SHALL display materials ordered by order_priority ascending within each session

### Requirement 5: Redeem Code System

**User Story:** As an admin, I want to generate unique redeem codes for courses, so that members can activate course access.

#### Acceptance Criteria

1. WHEN an admin generates redeem codes, THE Platform SHALL create unique codes with format "PROMO-YYYY-XXXX"
2. THE Platform SHALL associate each redeem code with a specific course_id
3. WHEN a redeem code is generated, THE Platform SHALL set is_used to false and user_id to null
4. THE Platform SHALL ensure each code is unique across the system
5. WHEN an admin views redeem codes, THE Platform SHALL display code, course, status, and redeemed user info

### Requirement 6: Course Redemption

**User Story:** As a member, I want to redeem a code to access a course, so that I can start learning.

#### Acceptance Criteria

1. WHEN a member enters a valid unused redeem code, THE Platform SHALL activate course access for that member
2. WHEN a code is redeemed, THE Platform SHALL set is_used to true, user_id to member's id, and used_at to current timestamp
3. IF a member enters an already used code, THEN THE Platform SHALL display error "Code already used"
4. IF a member enters an invalid code, THEN THE Platform SHALL display error "Invalid code"
5. WHEN a member redeems a code, THE Platform SHALL add the course to member's "My Courses" list

### Requirement 7: Linear Learning System

**User Story:** As a member, I want to learn materials sequentially, so that I follow the intended learning path.

#### Acceptance Criteria

1. WHEN a member accesses a course, THE Platform SHALL display first material as unlocked
2. WHILE a material is not completed, THE Platform SHALL lock all subsequent materials
3. WHEN a member completes a material, THE Platform SHALL unlock the next material in sequence
4. IF a member requests a locked material, THEN THE Platform SHALL deny access and return error
5. THE Platform SHALL validate material access by checking if all previous materials are completed

### Requirement 8: Progress Tracking

**User Story:** As a member, I want to track my learning progress, so that I know how much I have completed.

#### Acceptance Criteria

1. WHEN a member clicks "Mark as Complete", THE Platform SHALL create user_progress record with is_completed true
2. THE Platform SHALL calculate progress as (completed materials / total materials) * 100%
3. WHEN a member views course, THE Platform SHALL display progress bar with current percentage
4. THE Platform SHALL store completed_at timestamp when material is marked complete
5. THE Platform SHALL persist progress across sessions

### Requirement 9: Admin Dashboard

**User Story:** As an admin, I want to view statistics and monitor users, so that I can manage the platform effectively.

#### Acceptance Criteria

1. WHEN an admin accesses dashboard, THE Platform SHALL display total courses, members, and redemptions
2. THE Platform SHALL show list of users who have redeemed codes for each course
3. THE Platform SHALL display recent activities and redemptions

### Requirement 10: Member Dashboard and Learning Interface

**User Story:** As a member, I want a dedicated learning interface, so that I can focus on my courses.

#### Acceptance Criteria

1. WHEN a member accesses dashboard, THE Platform SHALL display "My Courses" with progress indicators
2. WHEN a member enters a course, THE Platform SHALL display sidebar with session and material list
3. THE Platform SHALL show locked/unlocked status for each material in sidebar
4. WHEN viewing video material, THE Platform SHALL render embedded video player
5. WHEN viewing text material, THE Platform SHALL render formatted rich text
6. WHEN viewing pdf material, THE Platform SHALL render PDF viewer
7. WHEN viewing ebook material, THE Platform SHALL provide download button
8. WHEN viewing gmeet material, THE Platform SHALL display join meeting button

### Requirement 11: Frontend Layout Separation

**User Story:** As a developer, I want separate layouts for admin and member, so that each role has appropriate UI/UX.

#### Acceptance Criteria

1. THE Platform SHALL use AdminLayout for all /admin/* routes
2. THE Platform SHALL use MemberLayout for all member routes
3. THE Platform SHALL include navigation appropriate to each role in respective layouts
