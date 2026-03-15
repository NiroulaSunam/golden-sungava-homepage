# Technology Stack

## Architecture

**Full-stack monolith** with Next.js App Router. Three-layer backend (Handler -> Service -> Repository) with app-layer RBAC (no Supabase RLS).

## Core Technologies

- **Language**: TypeScript (strict, no `any`)
- **Framework**: Next.js 16.1 (App Router, Route Groups, Server/Client Components)
- **Runtime**: Node.js 20+
- **Database**: PostgreSQL via Supabase (local Docker + hosted)
- **Auth**: Supabase Auth with app-layer permissions

## Key Libraries

| Purpose | Library |
|---------|---------|
| UI Components | MUI v7 + shadcn/ui (Radix primitives) |
| Styling | TailwindCSS 4 |
| Forms | React Hook Form + Zod validation |
| Data Viz | Recharts |
| Real-time | Supabase Realtime (WebSocket) |
| Testing | Vitest (unit), Playwright (E2E) |

## Development Standards

### Type Safety
- Zod schemas for all API input validation
- Database types auto-generated: `pnpm db:gen:types` -> `src/types/database.gen.ts`
- No manual DB enum definitions — always import from generated types

### Backend Pattern
```
API Route (src/app/api/) -> Handler (src/backend/handlers/)
  -> Service (src/backend/services/) -> Repository (src/backend/repositories/)
```

- **BaseRepository**: Generic CRUD + soft delete + pagination (all repos extend it)
- **Pagination utils**: `parsePaginationParams()`, `validateSortColumn()`, `buildPaginationMeta()`, `paginatedResponse()`

### Code Quality
- ESLint with Next.js config
- DRY principle enforced — extract shared components/hooks/utils
- Named exports for everything except page components (default export)

## Development Environment

### Required Tools
- Node.js 20+, pnpm, Docker (for local Supabase)

### Common Commands
```bash
pnpm dev           # Dev server at :3000
pnpm build         # Production build
pnpm sb:start      # Start local Supabase (Docker)
pnpm db:reset      # Reset local DB (migrations + seed)
pnpm db:diff name  # Generate incremental migration
pnpm db:gen:types  # Regenerate TypeScript types
```

## Key Technical Decisions

- **No RLS** — App-layer RBAC for faster queries and simpler debugging
- **Soft delete by default** — Business entities use `deleted_at` timestamp
- **Schema files as source of truth** — `supabase/schema/*.sql` defines desired state; migrations are append-only production history
