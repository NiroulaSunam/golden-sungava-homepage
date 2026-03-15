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

## Rendering Strategy (ISR + CSR)

- **Public pages**: Incremental Static Regeneration (ISR)
  - Pages pre-rendered at build time, revalidated on content update
  - Use `revalidatePath()` or `revalidateTag()` from admin CMS actions
  - Target: < 3s load time on mobile
- **Admin CMS**: Client-side rendering (CSR) with auth guards
  - Dynamic dashboard, no static generation needed

## Media Strategy (Google Drive + YouTube)

- **Images**: Stored in Google Drive, served via direct links or Google Drive API
  - Admin enters Google Drive shareable link → app converts to direct image URL
  - Format: `https://drive.google.com/uc?export=view&id={FILE_ID}`
  - Consider: Next.js Image optimization with remote patterns for drive.google.com
- **Videos**: YouTube embeds via iframe
  - Admin enters YouTube URL → app extracts video ID → renders responsive iframe
- **Documents/PDFs**: Google Drive direct download links
- **Why not Supabase Storage**: Cost savings — Google Drive is free for the school's volume
- **Fallback**: Supabase Storage for small assets (logo, icons) that need guaranteed uptime

## PWA Configuration

- Service worker for offline support (cache static pages, show offline notice for dynamic)
- Web manifest with school branding (gold theme, school name, icons)
- Install prompt for mobile users
- Push notifications (future: for notices/announcements)

## SEO Strategy

- Meta tags + Open Graph for all pages
- Structured data (Schema.org: EducationalOrganization, School)
- Sitemap generation
- Bilingual support consideration (English + Nepali)

## Design System

All colors defined as **CSS custom properties** in `src/app/globals.css` and referenced via Tailwind theme tokens (e.g., `bg-primary`, `text-accent`). **Never hardcode hex values in components.**

### Color Tokens (CSS Variables)
```css
:root {
  --color-primary: #B8860B;        /* Deep Gold */
  --color-primary-light: #D4A017;  /* Lighter gold for hovers */
  --color-primary-dark: #8B6508;   /* Darker gold for active states */
  --color-background: #FFFFFF;
  --color-foreground: #1A1A1A;     /* Near-black */
  --color-muted: #F5F3EF;          /* Warm off-white */
  --color-muted-foreground: #6B6B6B;
  --color-accent: #1A1A1A;         /* Dark accent */
  --color-accent-foreground: #F5F3EF;
  /* ... shadcn/ui token pattern */
}
```

### Theme Configuration
- Colors referenced via `tailwind.config` theme extend (or TailwindCSS 4 `@theme` directive)
- shadcn/ui components automatically pick up theme tokens
- Dark mode support via `.dark` class with inverted tokens

### Typography & Icons
- **Fonts**: Cormorant Garamond (headings/display) + DM Sans (body)
- **Icons**: Lucide React (consistent with shadcn/ui)
