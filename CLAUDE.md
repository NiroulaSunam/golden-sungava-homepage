# Claude Code Project Context

Golden Sungava Homepage — Premium school website for Golden Sungava English Boarding School
(Changunarayan-2, Duwakot, Bhaktapur, Nepal). Replaces the legacy site (goldensungavaschool.edu.np).
Two-part system: **public-facing ISR website** + **admin CMS** for content management.

**Stack**: Next.js 16.1 (ISR) + TailwindCSS 4 + shadcn/ui + Supabase (PostgreSQL) + Google Drive (media) + YouTube (video) + Zod

**Architecture**:
- Path Alias: `@/*` -> `./src/*`
- Rendering: ISR for public pages, CSR for admin dashboard
- Auth: Supabase Auth (no RLS - app-layer security via `src/lib/permissions/`)
- Media: Google Drive for images/documents, YouTube embeds for videos (no Supabase Storage for public media)
- PWA: Service worker + web manifest for mobile app experience
- Design: Mobile-first, premium Deep Gold + dark neutrals (all via CSS custom properties / Tailwind theme tokens, never hardcoded hex)
- i18n: Bilingual (English + Nepali) with language switcher

---

## Critical Rules

### DRY Principle - No Code Duplication

**Extract reusable code immediately:**
- **Dialogs/Forms** used 2+ places -> `@/components/shared/`
- **Business logic** -> custom hooks in `@/lib/hooks/`
- **Validation** -> `@/lib/utils/validation`
- **API patterns** -> shared client methods

**Component Location:**
```
src/components/
├── shared/          # Entire app
├── admin/           # Admin panel only
├── public/          # Public-facing pages
└── ui/              # shadcn/ui base (DO NOT modify)
```

**Before adding code:**
1. Does similar code exist elsewhere?
2. Will this be used 2+ times?
3. If yes -> Extract first, never duplicate!

### No Magic Numbers/Strings - Use Constants

```typescript
// BAD
if (items.length > 10) { ... }

// GOOD
import { PAGINATION_CONFIG } from '@/lib/constants';
if (items.length > PAGINATION_CONFIG.DEFAULT_PAGE_SIZE) { ... }
```

**Required Constants:**
- Currency: `CURRENCY_CONFIG`
- Pagination: `PAGINATION_CONFIG`
- Layout: `LAYOUT_CONFIG`

**Database Enums:**
- **ALWAYS** import from `@/types/database.gen.ts` (auto-generated from Supabase)

### Exports Pattern

- **Default export**: Page components ONLY
- **Named export**: All other components and utilities

---

## Database Schema Workflow

### NEVER MODIFY EXISTING MIGRATIONS

```
NEVER EDIT/DELETE existing migration files!
- NO editing files already on main branch
- NO deleting files already on main branch
EXISTING MIGRATIONS = PRODUCTION HISTORY!
Only ADD new incremental migrations.
```

### Schema Change Workflow

```bash
# 1. Edit schema files (source of truth)
#    Edit: supabase/schema/XXX_tablename.sql

# 2. Generate INCREMENTAL migration using db:diff
#    Option A: Auto-diff (for simple changes)
#      - Reset DB with existing migrations: pnpm db:reset
#      - Drop public schema and apply all schema files fresh
#      - Generate diff: pnpm db:diff descriptive_name
#      - Review the generated migration carefully
#
#    Option B: Manual migration (for precise control)
#      - Write migration SQL by hand based on schema file diffs

# 3. Verify migration applies cleanly
pnpm db:reset  # Must pass with ALL migrations (old + new)

# 4. Regenerate types (REQUIRED)
pnpm db:gen:types

# 5. Lint
pnpx supabase db lint

# 6. Commit
git add supabase/schema/*.sql supabase/migrations/*.sql src/types/database.gen.ts
git commit -m "db: description"

# 7. STOP - DO NOT PUSH TO PRODUCTION without permission
```

**Key rules:**
- `supabase/schema/*.sql` = source of truth (desired end state)
- `supabase/migrations/*.sql` = production history (append-only)
- New migrations use ALTER TABLE, not CREATE TABLE for existing tables
- `db:diff` compares live DB vs shadow (built from migrations) to generate incremental SQL

---

## Deletion Strategy

### Three Categories

**Category 1: NEVER Delete (Audit/Financial)**
- Append-only, no delete methods

**Category 2: Soft Delete Only (Business Entities)**
- Use `deleted_at` timestamp
- Referenced by Category 1 tables

**Category 3: Hard Delete Allowed (Disposable)**
- Can use permanent DELETE

### BaseRepository Methods

```typescript
// Default (auto-filters deleted_at IS NULL)
findAll(), findById(), findWhere(), count(), findWithSearch()

// Soft delete (Category 2)
softDelete(id), restore(id)

// Admin views
findAllIncludingDeleted(), findDeleted(), countDeleted()

// Hard delete (Category 3 ONLY)
hardDelete(id)
```

### is_active vs deleted_at

- `is_active`: Business state (temporarily disabled, will return)
- `deleted_at`: Record removal (discontinued permanently)

**Rule:** Removing from use -> `deleted_at`. Temporarily disabling -> `is_active`.

---

## Server-Side Pagination

### Backend Handler Pattern

```typescript
import {
  parsePaginationParams,
  validateSortColumn,
  validateSearchColumn,
  buildPaginationMeta,
  paginatedResponse,
} from '../utils';

const SORTABLE_COLUMNS = ['name', 'created_at'];
const SEARCHABLE_FIELDS = ['name', 'description'];

async list(request: NextRequest): Promise<NextResponse> {
  const pagination = parsePaginationParams(request);
  const sortBy = validateSortColumn(pagination.sortBy, SORTABLE_COLUMNS);
  const searchBy = validateSearchColumn(pagination.searchBy, SEARCHABLE_FIELDS);

  const result = await service.listPaginated({
    page: pagination.page,
    limit: pagination.limit,
    sortBy: sortBy || 'name',
    sortOrder: pagination.sortOrder || 'asc',
    searchTerm: pagination.search,
    searchBy,
    searchFields: SEARCHABLE_FIELDS,
  });

  const meta = buildPaginationMeta(result.total, result.page, result.limit);
  return paginatedResponse(result.data, meta);
}
```

---

## File Structure

```
src/
├── app/
│   ├── api/                  # API routes
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # shadcn/ui (DO NOT modify)
│   ├── admin/                # Admin-specific
│   ├── public/               # Public-facing
│   └── shared/               # Shared components
├── backend/
│   ├── db/                   # Supabase admin client
│   ├── handlers/             # HTTP handlers
│   ├── services/             # Business logic
│   ├── repositories/         # Data access (extends BaseRepository)
│   └── utils/                # Backend utilities (pagination, etc.)
├── frontend/
│   └── providers/            # Context providers (Theme, Auth, Emotion)
├── lib/
│   ├── auth/                 # Auth context + guards
│   ├── supabase/             # Supabase clients (browser, server, proxy)
│   ├── storage/              # File storage utils
│   ├── hooks/                # Custom hooks
│   ├── constants/            # Shared constants
│   ├── permissions/          # RBAC permissions
│   └── utils.ts              # Utilities (cn, etc.)
├── types/
│   └── database.ts           # Type aliases (from database.gen.ts)
└── proxy.ts                  # Next.js proxy (session refresh) — NOT middleware.ts

supabase/
├── migrations/               # Auto-generated (DO NOT EDIT)
├── schema/                   # Source of truth (EDIT HERE)
└── seed/                     # Seed data
```

---

## Development Commands

```bash
# Dev
pnpm dev                # http://localhost:3000
pnpm build              # Production build

# Supabase
pnpm sb:start           # Start local Supabase
pnpm sb:stop            # Stop local Supabase

# Database
pnpm db:reset           # Reset local (migrations + seed)
pnpm db:diff name       # Generate migration
pnpm db:gen:types       # Generate TypeScript types
pnpm db:push            # Push to remote (ask first!)
pnpm db-backup          # Full backup
pnpm db-restore         # Full restore
```

---

## Common Patterns

### Auth Guards

```typescript
<RequireAuth>
  <ProtectedContent />
</RequireAuth>
```

### Permissions System

**Architecture**: App-layer RBAC (no Supabase RLS).

```typescript
import { hasPermission, requirePermission } from '@/lib/permissions';

// UI: Check before rendering
if (hasPermission(user.role, 'files', 'create')) { ... }

// API: Guard endpoints
const check = requirePermission(user.role, 'files', 'update');
if (!check.allowed) return NextResponse.json({ error: check.error }, { status: 403 });
```

### Form Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email(),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { name: '', email: '' },
});
```

---

## Testing

### Framework & Config

- **Runner**: Vitest (`vitest.config.ts` at project root)
- **Run tests**: `pnpm vitest run` (all) or `pnpm vitest run path/to/file` (single)
- **Path aliases**: `@/*` resolved via vite alias config

### Test File Conventions

| Type | Naming | Location | Purpose |
|------|--------|----------|---------|
| **Unit** | `*.test.ts` | `__tests__/` next to source | Test a single module in isolation with mocked deps |
| **Integration** | `*.integration.test.ts` | `__tests__/` next to source | Test handler -> service -> repository chain with mocked DB |

### Rules

- **Mock external deps, not the module under test**
- **Use `vi.mock()` at module level**
- **Test names describe behavior** — `'should return null when user is inactive'` not `'test case 3'`
- **No test-only production code**
- **Run full suite after refactors** — `pnpm vitest run` must pass before committing

---

## Anti-Patterns

- **Do not duplicate code** - extract reusable components/hooks/utils
- **Do not copy-paste dialogs/forms** - create shared components
- **Do not repeat validation** - extract to validators
- **Do not use magic numbers/strings** - use constants
- **Do not manually define DB enums** - import from `database.gen.ts`
- **Do not skip `'use client'`** when using hooks/browser APIs
- **Do not use `any`** - define proper types
- **Do not use `middleware.ts`** - use `proxy.ts` instead (middleware is deprecated in Next.js 16.1)
- **Do not use `function` declarations** - use arrow functions (`const fn = () => {}`) everywhere

---

## Component Architecture

**Small, modular, readable components — even for private/single-use ones:**

```
src/components/public/home/
├── hero-carousel.tsx        # Hero section only
├── facilities-preview.tsx   # Facilities grid
├── activities-section.tsx   # Activities carousel
├── latest-news.tsx          # News cards
├── blog-preview.tsx         # Blog cards
├── testimonials.tsx         # Testimonials carousel
└── index.ts                 # Barrel export
```

**Rules:**
- **Always use arrow functions** — `const fn = () => {}`, never `function fn() {}`. This applies to **everything**: components, helpers, handlers, utilities, callbacks. Hard rule for the entire project.
- One component per file (max ~50-80 lines of JSX)
- **Aggressively extract sub-components** — even within the same file, any logical chunk of JSX (list rendering, form section, card layout, conditional block) should become a private sub-component
- Private sub-components can live in the same file (unexported) or co-located in the same directory
- Pattern: Large component → break into private `_SectionName` sub-components at the top of the file, compose them in the exported component at the bottom
- Named exports only (except page components)
- Props interfaces defined in same file, above component

**Arrow functions only — never use `function` for components:**
```tsx
// hero-carousel.tsx

// Private sub-components (not exported)
const HeroSlide = ({ image, title }: HeroSlideProps) => { ... };
const HeroIndicators = ({ count, active }: IndicatorProps) => { ... };
const HeroControls = ({ onPrev, onNext }: ControlProps) => { ... };

// Public component (named export)
export const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  return (
    <section>
      <HeroSlide ... />
      <HeroIndicators ... />
      <HeroControls ... />
    </section>
  );
};
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
SUPABASE_JWT_SECRET=xxx

# Storage
SUPABASE_STORAGE_BUCKET=files

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```


# AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Context

### Paths
- Steering: `.kiro/steering/`
- Specs: `.kiro/specs/`

### Steering vs Specification

**Steering** (`.kiro/steering/`) - Guide AI with project-wide rules and context
**Specs** (`.kiro/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `.kiro/specs/` for active specifications
- Use `/kiro:spec-status [feature-name]` to check progress

## Development Guidelines
- Think in English, generate responses in English. All Markdown content written to project files (e.g., requirements.md, design.md, tasks.md, research.md, validation reports) MUST be written in the target language configured for this specification (see spec.json.language).

## Minimal Workflow
- Phase 0 (optional): `/kiro:steering`, `/kiro:steering-custom`
- Phase 1 (Specification):
  - `/kiro:spec-init "description"`
  - `/kiro:spec-requirements {feature}`
  - `/kiro:validate-gap {feature}` (optional: for existing codebase)
  - `/kiro:spec-design {feature} [-y]`
  - `/kiro:validate-design {feature}` (optional: design review)
  - `/kiro:spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/kiro:spec-impl {feature} [tasks]`
  - `/kiro:validate-impl {feature}` (optional: after implementation)
- Progress check: `/kiro:spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements -> Design -> Tasks -> Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/kiro:spec-status`
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

## Steering Configuration
- Load entire `.kiro/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/kiro:steering-custom`)
