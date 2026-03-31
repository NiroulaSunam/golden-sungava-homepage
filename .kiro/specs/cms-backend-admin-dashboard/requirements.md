# Requirements Document

## Introduction
This specification defines the CMS backend and admin dashboard for the Golden Sungava English Boarding School website. The frontend is fully built with 16 mock data endpoints, bilingual support (English/Nepali), ISR rendering, and a premium gold theme. This feature replaces all mock data with a real Supabase PostgreSQL backend and provides a mobile-first admin dashboard for school staff to manage all website content. A single "Publish" button controls when draft content becomes visible to the public. Reference plan: `.claude/plans/inherited-questing-hearth.md`.

## Requirements

### Requirement 1: Database Schema & Bilingual Content Storage
**Objective:** As a developer, I want a PostgreSQL schema that stores all 16 content types with bilingual support, so that the frontend can be backed by real data instead of mocks.

#### Acceptance Criteria
1. The CMS shall store translatable text fields as JSONB columns with shape `{"en": "...", "np": "..."}` matching the existing `Record<'en' | 'np', T>` mock pattern.
2. The CMS shall provide tables for all 16 content types: site_config, hero_slides, navigation_items, news, events, blogs, notices, staff, facilities, activities, testimonials, gallery_events (with gallery_photos and gallery_videos children), principal_message, faqs, admission_steps, and payment_methods.
3. The CMS shall include common columns on all content tables: `id` (UUID), `created_at`, `updated_at`, `deleted_at` (soft delete), `is_active`, and `sort_order` where ordering is needed.
4. The CMS shall use Supabase-managed enum types for `content_status` (draft, published) and `user_role` (admin, editor, viewer).
5. When a schema change is made, the developer shall edit `supabase/schema/*.sql` (source of truth) and generate an incremental migration via `pnpm db:diff`, never editing existing migration files.
6. The CMS shall include a `profiles` table linking to `auth.users` with role, display_name, and avatar_url fields.

### Requirement 2: Draft/Publish Content Workflow
**Objective:** As a school admin, I want a single Publish button that pushes all pending changes live, so that I can review edits before the public sees them.

#### Acceptance Criteria
1. The CMS shall assign `status = 'draft'` to all newly created content rows. When an already-published row is updated, it shall remain `status = 'published'` so the public site is not disrupted by edits.
2. When the admin clicks the Publish button, the CMS shall execute a single database transaction that sets `status = 'published'` on all rows where `status = 'draft'` across all content tables.
3. The CMS shall display a draft count badge on the Publish button showing the total number of unpublished changes across all content tables.
4. While content has `status = 'draft'`, the public API shall not include that content in responses.
5. The CMS shall log each publish action to a `publish_log` table recording user_id, timestamp, and items_count.
6. If the publish transaction fails, the CMS shall roll back all changes and display an error message to the admin.

### Requirement 3: Public API Endpoints
**Objective:** As the public website, I want real API endpoints serving published content, so that the frontend can switch from mock data to live database content.

#### Acceptance Criteria
1. The CMS shall expose GET-only public API routes at `/api/[endpoint]` for all 16 content types, matching the existing `ApiEndpoint` union type names.
2. The public API shall only return rows where `status = 'published'` AND `deleted_at IS NULL` AND `is_active = true`.
3. When a `lang` query parameter is provided, the public API shall extract the matching language value from JSONB bilingual columns and return flat string fields.
4. Where pagination is appropriate (news, events, blogs, notices, staff, gallery_events), the public API shall support `page`, `limit`, `sortBy`, and `search` query parameters using the existing `parsePaginationParams` utility.
5. When a public API endpoint goes live, the developer shall set `implemented: true` in `src/lib/api/registry.ts` for that endpoint, causing the frontend `fetchApi` client to call the real API instead of returning mock data.
6. The public API shall follow the existing `ApiResponse<T>` wrapper format: `{ data, error, isMock }`.

### Requirement 4: Admin API Endpoints
**Objective:** As an admin user, I want authenticated CRUD API routes, so that I can create, read, update, and delete content from the dashboard.

#### Acceptance Criteria
1. The CMS shall expose admin API routes at `/api/admin/[resource]` supporting GET, POST, PATCH, and DELETE methods.
2. When any admin API request is received, the CMS shall validate the JWT token from the request headers using `getUserFromToken` from `src/lib/auth/server-auth.ts`.
3. When any admin API request is received, the CMS shall check RBAC permissions using `requirePermission` from `src/lib/permissions/index.ts` before processing the request.
4. If authentication or authorization fails, the CMS shall return HTTP 401 or 403 respectively with an error message.
5. When a POST request creates a new item, the CMS shall set its status to `'draft'` by default.
6. When a DELETE request is received, the CMS shall perform a soft delete by setting `deleted_at` to the current timestamp rather than removing the row.
7. The admin GET endpoint shall return all content including drafts, inactive items, and soft-deleted items (with appropriate filters).
8. The CMS shall expose `/api/admin/publish` with POST (execute publish) and GET (return draft count) methods.

### Requirement 5: Backend Service Layer
**Objective:** As a developer, I want a layered backend (Handler → Service → Repository) for all content types, so that business logic is separated from data access and HTTP handling.

#### Acceptance Criteria
1. The CMS shall implement one repository per content type extending `BaseRepository` from `src/backend/repositories/base.repository.ts`.
2. Each repository shall provide a `findPublished(lang)` method that filters by status, deleted_at, is_active, and extracts the requested language from JSONB columns.
3. The CMS shall implement one service per content type that validates input using Zod schemas before calling the repository.
4. Each service shall log create, update, and delete actions to the `audit_log` table with user_id, action, resource, resource_id, and details.
5. The CMS shall implement one handler per content type following the existing pattern in `src/backend/handlers/`, with `list`, `get`, `create`, `update`, and `delete` methods.
6. The CMS shall implement a `publish.service.ts` with `publishAll()` (transaction-based) and `getDraftCount()` methods.
7. For singleton content types (site_config, principal_message), the CMS shall use an upsert pattern instead of create/delete.

### Requirement 6: Authentication & Login
**Objective:** As a school staff member, I want to log in securely to access the admin dashboard, so that only authorized users can manage content.

#### Acceptance Criteria
1. The CMS shall provide a login page at `/login` with email and password fields using Supabase Auth `signInWithPassword`.
2. When login succeeds, the CMS shall redirect the user to `/admin`.
3. If login fails, the CMS shall display an error message without revealing whether the email or password was incorrect.
4. The CMS shall provide a logout action in the admin topbar that signs the user out and redirects to `/login`.
5. While a user is not authenticated, the CMS shall redirect all `/admin/*` routes to `/login` using the `RequireAuth` guard.
6. The CMS shall create a `profiles` row automatically when a new auth user is created, defaulting to the `viewer` role.

### Requirement 7: Role-Based Access Control (RBAC)
**Objective:** As a school administrator, I want role-based permissions, so that editors can manage content but only admins can publish or change settings.

#### Acceptance Criteria
1. The CMS shall support three roles: `admin`, `editor`, and `viewer`.
2. The CMS shall expand the permissions system in `src/lib/permissions/index.ts` to cover resources: content, gallery, staff, site-config, navigation, users, publish, and audit-log.
3. While a user has the `admin` role, the CMS shall grant full CRUD access to all resources plus publish and user management.
4. While a user has the `editor` role, the CMS shall grant CRUD access to content, gallery, and staff resources, but deny access to publish, site-config, navigation, and user management.
5. While a user has the `viewer` role, the CMS shall grant read-only access to all resources.
6. When a user without sufficient permissions attempts an action, the admin UI shall hide the relevant UI elements and the API shall return HTTP 403.

### Requirement 8: Admin Dashboard Layout (Mobile-First)
**Objective:** As a school staff member using a phone, I want a mobile-first admin dashboard, so that I can manage content from any device.

#### Acceptance Criteria
1. The admin dashboard shall use a separate layout from the public website, with its own topbar, sidebar navigation, and content area.
2. The admin topbar shall display the school logo, Publish button with draft count badge, and a user menu with logout.
3. While on desktop (md+ breakpoint), the admin shall display a collapsible sidebar with navigation links to all content sections.
4. While on mobile (below md breakpoint), the admin shall collapse the sidebar into a hamburger menu or bottom navigation bar.
5. The admin layout shall preserve the current gold theme (CSS custom properties, Tailwind tokens) — no separate admin color scheme.
6. The CMS shall wrap the admin layout with `RequireAuth` to enforce authentication on all admin routes.

### Requirement 9: Content CRUD Pages
**Objective:** As an editor, I want CRUD interfaces for each content type, so that I can create, edit, and delete content through the admin dashboard.

#### Acceptance Criteria
1. The CMS shall provide a list page for each of the 14 list content types showing a data table with columns: name/title, status badge, date, and action buttons (edit, delete).
2. The content list shall support server-side pagination, sorting by column, and text search.
3. When the user clicks "Add New", the CMS shall open a form for creating a new item with all bilingual fields displayed as tabbed EN/NP inputs.
4. When the user clicks "Edit" on an existing item, the CMS shall pre-populate the form with the current values.
5. When the user submits a form, the CMS shall validate all fields using Zod before sending to the admin API.
6. When the user clicks "Delete", the CMS shall show a confirmation dialog before performing a soft delete.
7. The CMS shall provide singleton editor pages for site_config and principal_message with save (upsert) functionality.
8. The gallery management page shall support nested CRUD for photos and videos within each gallery event.

### Requirement 10: Bilingual Content Input
**Objective:** As an editor, I want to enter content in both English and Nepali, so that the website can display content in the visitor's chosen language.

#### Acceptance Criteria
1. The CMS shall provide a `bilingual-input` component that renders tabbed EN/NP text inputs integrated with React Hook Form.
2. The CMS shall provide a `bilingual-textarea` component for multi-line bilingual text.
3. The CMS shall provide a `bilingual-rich-text` component for markdown content (blog posts, news articles, principal's message).
4. When either language tab is left empty, the CMS shall allow saving but display a visual warning indicating incomplete translation.
5. The bilingual input components shall store values as `{"en": "...", "np": "..."}` JSONB matching the database column format.

### Requirement 11: Route Group Refactoring
**Objective:** As a developer, I want public and admin pages to use separate layouts, so that the admin dashboard has its own navigation shell without the public Header/Footer.

#### Acceptance Criteria
1. The CMS shall move all existing public page routes into a `(public)` Next.js route group with its own `layout.tsx` containing the public Header and Footer.
2. The CMS shall place all admin routes under a `(admin)/admin/` route group with the admin layout (topbar + sidebar).
3. The root `src/app/layout.tsx` shall contain only global providers (Theme, Language, SiteConfig, Auth) and no page-specific UI.
4. When navigating between public and admin pages, the CMS shall render the correct layout for each route group.
5. The login page shall use a minimal layout without public Header/Footer or admin sidebar.

### Requirement 12: Audit Logging
**Objective:** As a school administrator, I want a log of all content changes, so that I can track who changed what and when.

#### Acceptance Criteria
1. When any content is created, updated, or deleted through the admin API, the CMS shall write an entry to the `audit_log` table with user_id, action (create/update/delete), resource type, resource_id, and change details as JSONB.
2. When a publish action is performed, the CMS shall write an entry to the `publish_log` table.
3. While a user has the `admin` role, the CMS shall provide a read-only audit log viewer in the admin dashboard.
4. The audit log shall not be deletable (append-only, Category 1 data per the project's deletion strategy).

### Requirement 13: Seed Data Migration
**Objective:** As a developer, I want the existing mock data seeded into the database, so that the website has content immediately after deployment.

#### Acceptance Criteria
1. The CMS shall provide a `supabase/seed/init.sql` file that inserts all existing mock data from `src/mocks/data/` into the corresponding database tables.
2. The seed data shall set `status = 'published'` on all seeded rows so the public website works immediately.
3. The seed data shall create at least one admin user profile for initial access.
4. When `pnpm db:reset` is run, the CMS shall apply all migrations and seed data cleanly without errors.
5. After seeding, the CMS shall regenerate TypeScript types via `pnpm db:gen:types` to produce `src/types/database.gen.ts`.
