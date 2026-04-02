# Research & Design Decisions

## Summary
- **Feature**: `cms-backend-admin-dashboard`
- **Discovery Scope**: Complex Integration (new backend + admin UI on existing frontend)
- **Key Findings**:
  - BaseRepository needs JSONB extension — no language extraction or JSONB filtering today
  - Publish-all requires a PostgreSQL function via `supabase.rpc()` for atomic multi-table transactions
  - Supabase middleware already handles `/admin/*` auth — minor adjustments for route groups
  - shadcn/ui components not installed yet (only Radix primitives) — need to add button, input, dialog, table, etc.

## Research Log

### Supabase JSONB Language Extraction
- **Context**: All bilingual content stored as `{"en": "...", "np": "..."}` JSONB columns. Public API must return flat strings for requested language.
- **Sources Consulted**: Supabase PostgREST docs, PostgreSQL JSONB operators
- **Findings**:
  - Supabase JS client supports JSONB arrow notation in `select()`: `select('title->en')`
  - For text extraction: `select('title->>en')` returns text instead of JSON
  - Filter on nested JSONB: `.filter('title->>en', 'ilike', '%search%')`
  - For complex extraction across many columns, a PostgreSQL view or function is cleaner
- **Implications**: Create a `findPublished(lang)` method on BaseRepository that dynamically builds select with `->>lang` extraction. Alternatively, use PostgreSQL views per language.

### Multi-Table Publish Transaction
- **Context**: Publish button must atomically flip all `status='draft'` → `status='published'` across 16+ tables.
- **Sources Consulted**: Supabase `rpc()` docs, PostgreSQL transaction blocks
- **Findings**:
  - Supabase JS client has NO native transaction API
  - `supabase.rpc('function_name', params)` calls PostgreSQL functions which CAN run transactions
  - A single `PLPGSQL` function with CTEs can UPDATE all tables in one transaction
  - Returns count of affected rows for the publish log
- **Implications**: Create `publish_all_drafts(p_user_id UUID)` PostgreSQL function in schema. Call via `supabase.rpc()` from PublishService.

### BaseRepository JSONB Extension
- **Context**: Current BaseRepository uses `select('*')` everywhere — no JSONB path selection.
- **Findings**:
  - `findAll()`, `findWhere()`, `findPaginated()`, `findWithSearch()` all hardcode `select('*')`
  - `FilterOptions` only supports `eq()` — no `contains()`, `ilike()`, or JSONB operators
  - Need to add optional `selectFields` parameter and JSONB-aware filtering
- **Implications**: Extend BaseRepository with `findPublished(lang, options)` that builds dynamic select strings. Keep backward compatibility — existing methods unchanged.

### Route Group Impact on ISR
- **Context**: Moving public pages into `(public)` route group — will ISR still work?
- **Findings**:
  - Next.js route groups are purely organizational — they don't affect rendering strategy
  - `export const revalidate = 3600` in page.tsx works identically inside route groups
  - Static generation, ISR, and dynamic rendering are all unaffected
  - The `(public)` prefix is stripped from URLs — `/gallery` stays `/gallery`
- **Implications**: Safe to refactor. No ISR changes needed.

### Supabase Middleware Readiness
- **Context**: Does current middleware handle admin route protection?
- **Findings**:
  - `src/lib/supabase/middleware.ts` already detects `/admin/*` as protected routes
  - Already redirects unauthenticated users to `/login?redirect=<path>`
  - Already redirects authenticated users away from `/login` to `/admin`
  - Session refresh via cookie management is fully implemented
- **Implications**: Almost no changes needed. Just verify it works with `(admin)/admin/*` path pattern (it should — route groups are invisible to URLs).

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks | Notes |
|--------|-------------|-----------|-------|-------|
| Handler-Service-Repository (existing) | Three-layer backend per domain | Already established, BaseRepository ready, clear separation | High file count (~48 for 16 types) | Aligns with CLAUDE.md and steering |
| Generic CRUD Handler | Single parameterized handler for all content types | Less code, DRY | Less flexibility per-type, harder to customize | Could work for 12/14 similar types |
| Hybrid | Generic for simple CRUD, custom for complex (gallery, site-config) | Best of both, manageable file count | Slight complexity in choosing which path | **Selected** |

## Design Decisions

### Decision: Hybrid Generic + Custom Backend Pattern
- **Context**: 14 list content types + 2 singletons need CRUD. Most are structurally identical (bilingual JSONB + status + soft delete).
- **Alternatives**: (1) One handler/service/repo per type = 48 files. (2) Single generic handler = less flexibility.
- **Selected**: Hybrid — generic content handler/service covers simple types; custom implementations for gallery (nested children), site_config (singleton upsert), navigation (tree structure), staff (non-bilingual).
- **Rationale**: 12 of 14 list types have identical CRUD patterns. Only 4 need custom logic.
- **Trade-offs**: Slightly more abstraction but dramatically fewer files (~20 vs ~48).

### Decision: JSONB Language Extraction in Repository
- **Context**: Public API must return flat strings, not JSONB objects.
- **Alternatives**: (1) Extract in PostgreSQL views. (2) Extract in repository query. (3) Extract in service layer after fetch.
- **Selected**: Extract in repository using Supabase `select('field->>lang')` syntax.
- **Rationale**: Most efficient — DB does the work, less data transferred, no post-processing.

### Decision: PostgreSQL Function for Publish
- **Context**: Publish must atomically update all tables.
- **Selected**: PostgreSQL `PLPGSQL` function called via `supabase.rpc()`.
- **Rationale**: Only way to get true transactions with Supabase JS client.

### Decision: shadcn/ui for Admin UI
- **Context**: Need form inputs, dialogs, data tables, tabs for admin.
- **Selected**: Install shadcn/ui components (button, input, textarea, dialog, select, tabs, table, badge, dropdown-menu, sheet, separator, toast).
- **Rationale**: Radix primitives already installed. shadcn/ui wraps them with Tailwind styles matching the project theme.

## Risks & Mitigations
- **Risk**: JSONB `select('field->>lang')` syntax may not work with Supabase JS `select()` for aliasing — **Mitigation**: Fall back to PostgreSQL views or RPC functions
- **Risk**: Route group refactoring may break existing page paths — **Mitigation**: Verify all public routes work after move, run full build + tests
- **Risk**: Generic content handler may not cover edge cases — **Mitigation**: Keep escape hatch for custom handlers per type
- **Risk**: shadcn/ui components may conflict with existing Tailwind 4 config — **Mitigation**: Test one component first (Button) before mass install

## References
- Supabase PostgREST JSONB: https://supabase.com/docs/guides/database/json
- Supabase RPC: https://supabase.com/docs/reference/javascript/rpc
- Next.js Route Groups: https://nextjs.org/docs/app/building-your-application/routing/route-groups
- shadcn/ui Installation: https://ui.shadcn.com/docs/installation/next
