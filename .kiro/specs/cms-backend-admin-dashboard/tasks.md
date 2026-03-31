# Implementation Plan

- [x] 1. Database schema, enums, and PostgreSQL functions
- [x] 1.1 Create enum types and profiles table
  - Define `content_status` enum (draft, published) and `user_role` enum (admin, editor, viewer)
  - Create `profiles` table linked to `auth.users` with role, display_name, avatar_url
  - Add trigger to auto-create profile on new auth user signup with default viewer role
  - Run `pnpm db:reset` to verify migration applies cleanly
  - _Requirements: 1.4, 1.6, 6.6_

- [x] 1.2 Create all content tables with bilingual JSONB columns
  - Create tables for all 16 content types: site_config, hero_slides, navigation_items, news, events, blogs, notices, staff, facilities, activities, testimonials, gallery_events, faqs, admission_steps, payment_methods, principal_message
  - Each bilingual text field stored as JSONB with shape `{"en": "...", "np": "..."}`
  - All content tables share common columns: UUID primary key, status (content_status enum), is_active, sort_order, created_at, updated_at, deleted_at
  - Staff table uses plain text fields (not bilingual) for name, designation, department
  - Site_config and principal_message are singleton tables (one row each)
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 1.3 Create gallery child tables and system tables
  - Create gallery_photos table with foreign key to gallery_events (cascade delete), url, caption (JSONB), sort_order
  - Create gallery_videos table with foreign key to gallery_events (cascade delete), url, title (JSONB), thumbnail_url, sort_order
  - Create audit_log table (append-only): user_id, action, resource, resource_id, details JSONB
  - Create publish_log table: user_id, published_at, items_count, details JSONB
  - _Requirements: 1.2, 12.1, 12.2, 12.4_

- [x] 1.4 Create PostgreSQL functions for publish and draft count
  - Create `publish_all_drafts(p_user_id UUID)` function that atomically updates all content tables from draft to published in a single transaction, inserts publish_log entry, and returns total count
  - Create `get_draft_count()` function that counts draft rows across all content tables in a single query using UNION ALL
  - Run `pnpm db:reset` to verify all migrations and functions work
  - _Requirements: 2.2, 2.3, 2.5, 2.6_

- [ ] 1.5 Seed database with existing mock data
  - Convert all mock data from `src/mocks/data/*.ts` into SQL INSERT statements
  - Set `status = 'published'` on all seeded content so public site works immediately
  - Create at least one admin user profile for initial access
  - Bilingual content stored as JSONB matching the mock `Record<'en' | 'np', T>` shape
  - Run `pnpm db:reset` to verify seed applies cleanly, then `pnpm db:gen:types` to generate TypeScript types
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 1.6 Validate JSONB language extraction with Supabase JS client
  - Write a spike test that queries a seeded content table using `select('field->>en')` syntax via the Supabase JS client
  - Verify that bilingual JSONB fields can be extracted to flat strings in a single query
  - If `->>` syntax fails with Supabase JS select, document the fallback approach (PostgreSQL views or service-layer extraction) and implement it
  - This spike must pass before building the repository layer
  - _Requirements: 3.3, 5.2_

- [ ] 2. Backend service layer — repositories, services, and permissions
- [ ] 2.1 Extend BaseRepository with bilingual and published-content support
  - Add `findPublished(lang, options)` method that filters by status=published, deleted_at IS NULL, is_active=true, and extracts the requested language from JSONB columns
  - Add `findDrafts(options)` method that returns only draft rows
  - Add `countDrafts()` method
  - Each concrete repository declares its `bilingualColumns` array so the base method knows which fields to extract
  - Depends on spike from task 1.6 to confirm JSONB extraction approach
  - _Requirements: 5.1, 5.2_

- [ ] 2.2 (P) Create content repositories for all 16 content types
  - Create generic ContentRepository class that extends the enhanced BaseRepository with bilingual support
  - Instantiate one repository per content type, each declaring its table name and bilingual column list
  - Gallery repository includes methods for managing child photos and videos
  - Site_config and principal_message repositories use upsert pattern (single-row)
  - Staff repository skips bilingual extraction (plain text fields)
  - Navigation repository supports parent-child tree queries
  - _Requirements: 5.1, 5.2, 5.7_

- [ ] 2.3 (P) Create audit service and publish service
  - Build audit service that inserts append-only entries to audit_log with user_id, action, resource, resource_id, and details
  - Build publish service that calls `publish_all_drafts` PostgreSQL function via `supabase.rpc()` and returns items count
  - Build draft count method that calls `get_draft_count()` via `supabase.rpc()`
  - _Requirements: 2.2, 2.3, 2.5, 2.6, 5.6, 12.1, 12.2_

- [ ] 2.4 (P) Create content services with Zod validation for all content types
  - Build generic ContentService that validates input with Zod schemas, delegates to repository, and logs mutations to audit service
  - New content created with status=draft; updates to published content stay published
  - Soft delete sets deleted_at timestamp
  - Each content type has its own Zod create/update schema defining required and optional bilingual fields
  - Singleton services (site_config, principal_message) use upsert instead of create/delete
  - _Requirements: 5.3, 5.4, 5.7, 2.1_

- [ ] 2.5 (P) Expand RBAC permissions to cover all CMS resources
  - Expand resource list from 2 (files, settings) to 8: content, gallery, staff, site-config, navigation, users, publish, audit-log
  - Admin role: full CRUD + manage on all resources
  - Editor role: CRUD on content, gallery, staff; read-only on site-config, navigation, audit-log; no access to users or publish
  - Viewer role: read-only on all resources
  - Keep existing `hasPermission` and `requirePermission` function signatures
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 3. Public API routes
- [ ] 3.1 (P) Create public API routes for singleton content (site-config, principal-message)
  - Implement GET-only routes at existing endpoint URLs from the API registry
  - Return only published, active, non-deleted content with language extraction based on `lang` query parameter
  - Follow existing `ApiResponse<T>` wrapper format
  - Flip `implemented: true` in the API registry for each endpoint
  - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_

- [ ] 3.2 (P) Create public API routes for paginated list content (news, events, blogs, notices, staff, gallery-events)
  - Implement GET-only routes with pagination support using existing `parsePaginationParams` utility
  - Support `page`, `limit`, `sortBy`, `search` query parameters
  - Filter by status=published, deleted_at IS NULL, is_active=true
  - Extract requested language from JSONB bilingual columns
  - Flip `implemented: true` in the API registry for each endpoint
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 3.3 (P) Create public API routes for remaining content (hero-slides, navigation, facilities, activities, testimonials, faqs, admission-steps, payment-methods)
  - Implement GET-only routes for non-paginated list content
  - Same published/active/non-deleted filtering and language extraction
  - Flip `implemented: true` in the API registry for each endpoint
  - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_

- [ ] 3.4 Write integration tests for public API endpoints
  - Test that GET endpoints return only published, active, non-deleted content
  - Test language extraction: `?lang=en` returns English strings, `?lang=np` returns Nepali
  - Test pagination parameters work correctly
  - Test that draft content is excluded from public responses
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Admin API routes
- [ ] 4.1 Create admin API authentication and authorization middleware
  - Build reusable middleware that validates JWT from Authorization header using `getUserFromToken`
  - Check RBAC permissions using `requirePermission` for the requested resource and action
  - Return 401 for missing/invalid auth, 403 for insufficient permissions
  - Fetch user profile from profiles table to get role
  - _Requirements: 4.2, 4.3, 4.4, 7.6_

- [ ] 4.2 (P) Create admin CRUD API routes for all list content types
  - Implement GET (list all including drafts), POST (create as draft), PATCH (update), DELETE (soft delete) for each content type
  - All routes use the auth/permission middleware from task 4.1
  - GET endpoint supports pagination, search, and includeDeleted filter
  - POST validates input with Zod schema, sets status=draft for new items
  - PATCH validates partial update, preserves published status on published items
  - DELETE sets deleted_at timestamp (soft delete)
  - _Requirements: 4.1, 4.5, 4.6, 4.7_

- [ ] 4.3 (P) Create admin API routes for singletons and publish
  - Implement GET and PUT (upsert) for site-config and principal-message
  - Implement POST `/api/admin/publish` that calls publish service (requires admin role)
  - Implement GET `/api/admin/publish/count` that returns draft count
  - _Requirements: 4.8, 5.7_

- [ ] 4.4 (P) Create admin gallery API with nested photo/video management
  - Implement CRUD for gallery events plus nested endpoints for adding/removing/reordering photos and videos within an event
  - Photos and videos cascade-delete when parent event is deleted
  - Support sort_order updates for drag-and-drop reordering
  - _Requirements: 9.8_

- [ ] 4.5 Write integration tests for admin API endpoints
  - Test authentication: requests without JWT return 401
  - Test authorization: editor cannot publish, viewer cannot create
  - Test CRUD cycle: create (status=draft) → update → soft delete → verify deleted_at set
  - Test publish flow: create draft → publish → verify status=published
  - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 7.6_

- [ ] 5. Route group refactoring and admin layout
- [ ] 5.1 Refactor app layout into public and admin route groups
  - Move all existing public page routes into a `(public)` route group
  - Create `(public)/layout.tsx` with the Header, Footer, FloatingCTA, InstallPrompt, and SwRegister that currently live in root layout
  - Slim down root layout to only contain global providers (Theme, Language, SiteConfig, Auth, Install)
  - Create login page with minimal layout (no header/footer, no sidebar) — school logo, email/password form, Supabase signInWithPassword
  - Verify all existing public page URLs still work after the move
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 6.1, 6.2, 6.3_

- [ ] 5.2 Build admin layout shell with responsive topbar and sidebar
  - Create `(admin)/admin/layout.tsx` wrapped with RequireAuth guard
  - Build topbar with school logo, Publish button with draft count badge, and user menu (avatar dropdown with logout)
  - Build collapsible sidebar with navigation links to all content management sections
  - On desktop (md+): fixed sidebar (240px) + topbar + scrollable content area
  - On mobile: topbar only, sidebar opens as sheet overlay via hamburger button
  - Preserve current gold theme — use existing CSS custom properties and Tailwind tokens
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 6.4, 6.5_

- [ ] 5.3 Install required shadcn/ui components
  - Install shadcn/ui components needed for admin: button, input, textarea, label, dialog, select, tabs, table, badge, dropdown-menu, sheet, separator, toast, form
  - Verify components work with existing Tailwind 4 configuration and gold theme tokens
  - _Requirements: 8.5_

- [ ] 6. Admin dashboard and shared admin components
- [ ] 6.1 Build bilingual input components for React Hook Form
  - Create tabbed EN/NP text input component integrated with React Hook Form field registration
  - Create bilingual textarea variant for multi-line content
  - Create bilingual rich-text variant for markdown content (blog posts, news articles, principal's message)
  - Show visual warning indicator when one language tab is empty
  - Store values as `{"en": "...", "np": "..."}` matching database JSONB column format
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 6.2 Build generic content list page component
  - Create reusable data table page parameterized by resource name, column definitions, and API endpoint
  - Support server-side pagination, sort-by-column, and text search
  - Display status badges (draft/published), dates, and action buttons (edit, delete)
  - Delete action shows confirmation dialog before soft-deleting via admin API
  - "Add New" button opens the content form dialog
  - _Requirements: 9.1, 9.2, 9.6_

- [ ] 6.3 Build generic content form dialog component
  - Create reusable form dialog parameterized by Zod schema, field config array, and optional initial values (for editing)
  - Render fields dynamically: bilingual-input, bilingual-textarea, bilingual-rich-text, image URL input with preview, select dropdown, date picker
  - Validate all fields with Zod on submit, display field-level errors
  - On success: close dialog, refresh content list
  - _Requirements: 9.3, 9.4, 9.5_

- [ ] 6.4 Build publish button component with draft count badge
  - Create topbar button that displays current draft count as a numeric badge
  - Fetch count on mount from publish count endpoint, refresh after CRUD operations
  - Disabled when count is 0
  - Click shows confirmation dialog, then calls publish endpoint
  - On success: reset badge to 0, show success toast
  - On failure: show error toast, badge unchanged
  - Only visible to users with admin role (publish permission)
  - _Requirements: 2.2, 2.3, 2.6, 7.6_

- [ ] 6.5 Build admin dashboard home page
  - Create dashboard landing page showing content overview: count of each content type, count of drafts pending publish, recent audit log entries
  - Display stats in a card grid layout
  - Show recent changes list from audit log (last 10 entries)
  - Link each stat card to its corresponding content management page
  - _Requirements: 8.1_

- [ ] 7. Content management pages
- [ ] 7.1 (P) Create CRUD pages for news, events, blogs, and notices
  - Wire the generic content list page and form dialog for each content type
  - Define column configurations and Zod schemas specific to each type
  - News: title, date, excerpt, imageUrl, category, content
  - Events: title, date, time, venue, description, imageUrl
  - Blogs: title, date, author, authorRole, excerpt, imageUrl, content
  - Notices: title, date, excerpt, pdfUrl
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 7.2 (P) Create CRUD pages for facilities, activities, testimonials, and FAQs
  - Wire the generic content list and form dialog for each type
  - Facilities: name, description, imageUrl, icon
  - Activities: name, description, imageUrl
  - Testimonials: quote, authorName, role, photoUrl
  - FAQs: question, answer
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 7.3 (P) Create CRUD pages for hero slides, admission steps, payment methods, and staff
  - Wire the generic content list and form dialog for each type
  - Hero slides: heading, subheading, imageUrl, ctaText, ctaLink
  - Admission steps: icon, title, description
  - Payment methods: name, icon, color, steps (array of strings)
  - Staff: name, designation, department, email, photoUrl (non-bilingual)
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 7.4 Create singleton editor pages for site config and principal message
  - Build dedicated editor pages (not list+dialog pattern) that load current values and save via upsert
  - Site config: school name, tagline, logoUrl, address, phones, emails, office hours, social links, theme colors, SEO settings, stats, section subtitles, page descriptions, footer content
  - Principal message: name, title, photoUrl, signatureUrl, message (rich text)
  - All bilingual fields use tabbed EN/NP inputs
  - _Requirements: 9.7_

- [ ] 7.5 Create gallery management page with nested photo/video CRUD
  - Build gallery events list with the generic content list component
  - When editing an event, show nested sections for managing photos and videos
  - Photos: add/remove/reorder with URL input and caption (bilingual)
  - Videos: add/remove/reorder with URL input, title (bilingual), optional thumbnail URL
  - Support drag-and-drop or manual sort-order adjustment
  - _Requirements: 9.8_

- [ ] 7.6 Create navigation tree editor page
  - Build a tree-structured editor for navigation items
  - Support parent-child relationships (top-level items with nested children)
  - Each item: label (bilingual), href, sort order
  - Add, edit, delete, and reorder navigation items
  - _Requirements: 9.1_

- [ ] 8. Audit log viewer and E2E testing
- [ ] 8.1 Build read-only audit log viewer page
  - Display paginated list of audit log entries with filters for action type and resource
  - Show: timestamp, user display name, action, resource type, resource ID
  - Expand row to see change details (JSONB)
  - Only visible to users with admin role
  - _Requirements: 12.3, 12.4_

- [ ] 8.2* Write E2E tests for critical admin workflows
  - Login flow: navigate to /admin → redirected to /login → enter credentials → land on dashboard
  - Content creation: create bilingual news article → verify appears in list as draft
  - Publish: click publish button → verify draft count resets → verify article appears on public page
  - Mobile responsiveness: verify admin sidebar toggle works on mobile viewport
  - Permission check: log in as editor → verify Publish button is hidden
  - _Requirements: 6.1, 6.2, 6.5, 2.2, 8.4, 7.6_
