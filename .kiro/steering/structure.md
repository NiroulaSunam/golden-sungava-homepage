# Project Structure

## Organization Philosophy

**Layered backend** with shared component library. Backend follows Handler -> Service -> Repository pattern.

## Directory Patterns

### Backend Layers (`src/backend/`)
**Purpose**: Strict separation of HTTP handling, business logic, and data access
**Pattern**: One file per domain — `{domain}.handler.ts`, `{domain}.service.ts`, `{domain}.repository.ts`

### Components (`src/components/`)
**Purpose**: UI components scoped by usage domain
**Pattern**:
- `ui/` — shadcn/ui base primitives (never modify)
- `shared/` — Cross-cutting components
- `admin/` — Admin-specific
- `public/` — Public-facing pages

### Hooks (`src/lib/hooks/`)
**Purpose**: Reusable stateful logic
**Pattern**: `use-{concern}.ts` (kebab-case)

### Constants (`src/lib/constants/`)
**Purpose**: Domain-specific constants with status/label/color/transition pattern
**Pattern**: One file per domain

### Permissions (`src/lib/permissions/`)
**Purpose**: App-layer RBAC

### Database (`supabase/`)
**Purpose**: Schema source of truth + append-only migrations
**Pattern**: `schema/{NNN}_{tablename}.sql` (desired state), `migrations/{timestamp}_{name}.sql` (production history)

## Naming Conventions

- **Files**: kebab-case for all files (`paginated-data-table.tsx`, `use-branch-context.ts`)
- **Components**: PascalCase (`MenuBrowser`, `OrderCart`, `PaginatedDataTable`)
- **Functions/hooks**: camelCase (`usePaginatedQuery`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`PAGINATION_CONFIG`)
- **DB schema files**: `{NNN}_{snake_case_table}.sql`

## Import Organization

```typescript
// External libraries first
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Internal absolute imports via alias
import { Button } from '@/components/ui/button';
import { hasPermission } from '@/lib/permissions';

// Relative imports last
import { localHelper } from './utils';
```

**Path Alias**: `@/*` -> `./src/*`

## Code Organization Principles

- **DRY**: Extract to shared when used 2+ times
- **Colocation**: Domain-specific code stays within its route group/component folder
- **Constants over magic values**: All status strings, config numbers, labels in `src/lib/constants/`
- **Generated types**: DB types from `src/types/database.gen.ts` — never define manually
- **Barrel exports**: `src/components/shared/index.ts` re-exports all shared components
