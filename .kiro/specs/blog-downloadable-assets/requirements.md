# Requirements Document

## Introduction

Fitur Blog dan Downloadable Asset untuk platform e-course. Blog berfungsi sebagai CMS untuk konten artikel, sedangkan Downloadable Asset memungkinkan distribusi produk digital dengan sistem keamanan yang kuat. Asset berbayar memerlukan kode redeem yang aman dari bypass, injection, dan cracking.

## Glossary

- **Blog_System**: Sistem manajemen konten untuk artikel blog
- **Asset_System**: Sistem manajemen dan distribusi produk digital yang dapat diunduh
- **Download_Token**: Token unik yang di-generate server-side untuk setiap permintaan download yang valid
- **Asset_Code**: Kode unik untuk mengakses asset berbayar (mirip redeem code)
- **Rate_Limiter**: Sistem pembatasan jumlah request dalam periode waktu tertentu
- **HMAC_Signature**: Hash-based Message Authentication Code untuk validasi integritas request
- **Download_Log**: Catatan audit setiap aktivitas download untuk deteksi anomali

## Requirements

### Requirement 1: Blog Management (Admin)

**User Story:** As an admin, I want to manage blog posts, so that I can publish articles and content for users.

#### Acceptance Criteria

1. WHEN an admin creates a blog post, THE Blog_System SHALL store title, slug, content, thumbnail, category, status, and timestamps
2. WHEN an admin edits a blog post, THE Blog_System SHALL update the specified fields while preserving the original creation timestamp
3. WHEN an admin deletes a blog post, THE Blog_System SHALL remove the post and associated data
4. WHEN an admin sets a post as published, THE Blog_System SHALL make it visible to public users
5. WHEN an admin sets a post as draft, THE Blog_System SHALL hide it from public users

### Requirement 2: Blog Display (Public)

**User Story:** As a visitor, I want to read blog posts, so that I can learn from the content.

#### Acceptance Criteria

1. WHEN a visitor accesses the blog page, THE Blog_System SHALL display a paginated list of published posts
2. WHEN a visitor clicks on a blog post, THE Blog_System SHALL display the full content with metadata
3. WHEN a visitor filters by category, THE Blog_System SHALL display only posts in that category
4. WHEN a visitor searches for content, THE Blog_System SHALL return matching published posts

### Requirement 3: Asset Management (Admin)

**User Story:** As an admin, I want to manage downloadable assets, so that I can distribute digital products securely.

#### Acceptance Criteria

1. WHEN an admin creates an asset, THE Asset_System SHALL store title, description, file_path, file_size, type (free/paid), thumbnail, and download_count
2. WHEN an admin uploads a file, THE Asset_System SHALL store it in a non-public directory with randomized filename
3. WHEN an admin edits an asset, THE Asset_System SHALL update the specified fields
4. WHEN an admin deletes an asset, THE Asset_System SHALL remove the asset record and associated file
5. WHEN an admin sets asset type as paid, THE Asset_System SHALL require code redemption for download access

### Requirement 4: Asset Code Generation (Admin)

**User Story:** As an admin, I want to generate secure codes for paid assets, so that only authorized users can download them.

#### Acceptance Criteria

1. WHEN an admin generates codes for an asset, THE Asset_System SHALL create unique cryptographically secure codes
2. WHEN generating codes, THE Asset_System SHALL use a format that includes asset identifier, random component, and checksum
3. WHEN a code is generated, THE Asset_System SHALL store it with hashed value (not plaintext) in database
4. WHEN an admin views codes, THE Asset_System SHALL display codes only once at generation time
5. WHEN an admin exports codes, THE Asset_System SHALL provide secure download with audit logging

### Requirement 5: Free Asset Download

**User Story:** As a visitor, I want to download free assets, so that I can access free digital products.

#### Acceptance Criteria

1. WHEN a visitor requests a free asset download, THE Asset_System SHALL generate a time-limited download token
2. WHEN a download token is generated, THE Asset_System SHALL include HMAC signature for integrity verification
3. WHEN a visitor uses a valid token, THE Asset_System SHALL serve the file through a secure controller
4. WHEN a download token expires, THE Asset_System SHALL reject the download request
5. WHEN a download completes, THE Asset_System SHALL increment the download counter and log the activity

### Requirement 6: Paid Asset Download with Code Redemption

**User Story:** As a user, I want to redeem a code to download paid assets, so that I can access purchased digital products.

#### Acceptance Criteria

1. WHEN a user enters a code for a paid asset, THE Asset_System SHALL validate the code using constant-time comparison
2. WHEN a code is valid and unused, THE Asset_System SHALL mark it as used and associate it with the user
3. WHEN a code is redeemed, THE Asset_System SHALL generate a secure download token for that user
4. WHEN a user has redeemed a code, THE Asset_System SHALL allow re-download within a configurable time window
5. IF a code is invalid or already used, THEN THE Asset_System SHALL return a generic error message without revealing code status

### Requirement 7: Security - Anti-Bypass Protection

**User Story:** As a system administrator, I want the download system to be secure, so that unauthorized users cannot bypass the code requirement.

#### Acceptance Criteria

1. THE Asset_System SHALL implement rate limiting (max 5 attempts per IP per minute for code validation)
2. THE Asset_System SHALL implement request signing with HMAC to prevent parameter tampering
3. THE Asset_System SHALL validate all download requests server-side without relying on client-side checks
4. THE Asset_System SHALL use database transactions with row-level locking for code redemption
5. THE Asset_System SHALL log all download attempts with IP, user agent, timestamp, and result for audit
6. IF rate limit is exceeded, THEN THE Asset_System SHALL block requests for a cooldown period
7. THE Asset_System SHALL implement CSRF protection on all state-changing endpoints
8. THE Asset_System SHALL serve files through a controller (not direct URL) to prevent URL guessing

### Requirement 8: Security - Anti-Injection Protection

**User Story:** As a system administrator, I want the system to be protected from injection attacks, so that malicious users cannot manipulate requests.

#### Acceptance Criteria

1. WHEN processing code input, THE Asset_System SHALL sanitize and validate format before database query
2. WHEN processing download requests, THE Asset_System SHALL validate token format and signature before processing
3. THE Asset_System SHALL use parameterized queries for all database operations
4. THE Asset_System SHALL validate file paths to prevent directory traversal attacks
5. THE Asset_System SHALL implement Content-Security-Policy headers on download responses
6. IF any validation fails, THEN THE Asset_System SHALL reject the request and log the attempt

### Requirement 9: Download Token Security

**User Story:** As a system administrator, I want download tokens to be secure and non-reusable, so that they cannot be shared or replayed.

#### Acceptance Criteria

1. WHEN generating a download token, THE Asset_System SHALL include user_id, asset_id, timestamp, nonce, and HMAC signature
2. WHEN validating a token, THE Asset_System SHALL verify HMAC signature using server-side secret key
3. WHEN a token is used, THE Asset_System SHALL mark the nonce as consumed to prevent replay attacks
4. THE Asset_System SHALL set token expiry to maximum 5 minutes
5. THE Asset_System SHALL bind tokens to specific IP address to prevent token sharing
6. IF token validation fails, THEN THE Asset_System SHALL return 403 without revealing failure reason

### Requirement 10: Audit and Monitoring

**User Story:** As a system administrator, I want comprehensive logging, so that I can detect and investigate suspicious activities.

#### Acceptance Criteria

1. WHEN any download-related action occurs, THE Asset_System SHALL log to Download_Log with full context
2. WHEN multiple failed attempts occur from same IP, THE Asset_System SHALL flag for review
3. WHEN unusual download patterns are detected, THE Asset_System SHALL alert administrators
4. THE Asset_System SHALL retain logs for configurable period (default 90 days)
5. WHEN an admin views logs, THE Asset_System SHALL provide filtering and search capabilities
