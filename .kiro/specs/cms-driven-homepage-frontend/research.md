# Research & Design Decisions

## Summary
- **Feature**: `cms-driven-homepage-frontend`
- **Discovery Scope**: New Feature (greenfield frontend on existing scaffolding)
- **Key Findings**:
  - Existing providers (Emotion, Theme, Auth) need extension — add SiteConfig + Language providers
  - MUI is installed but shadcn/ui + Tailwind should be primary for public pages (lighter, ISR-friendly)
  - API registry pattern replaces per-feature env vars for mock/real switching
  - ISR pages serve English static shell; language switch triggers client-side content re-fetch

## Research Log

### Next.js 16.1 ISR + Client-Side Language Switching
- **Context**: Need fast ISR pages with bilingual support without doubling static pages
- **Findings**:
  - ISR generates static HTML at build time, revalidates on-demand via `revalidateTag()`
  - Language switching via client-side state avoids generating 2x static pages
  - Server Components fetch default language (en) data for ISR shell
  - Client Components hydrate and can re-fetch content with `?lang=np` on language toggle
  - `next/font` already configured for DM Sans + Cormorant Garamond
- **Implications**: Single URL scheme, no `/en/` or `/np/` paths. Language is a client preference.

### PWA with Next.js 16.1
- **Context**: Need service worker + web manifest for mobile app experience
- **Findings**:
  - `next-pwa` (or `@ducanh2912/next-pwa`) wraps Workbox for Next.js
  - Web manifest can be dynamically generated from CMS site-config
  - Service worker caches static assets + ISR pages for offline access
  - Install prompt requires HTTPS + valid manifest + service worker
- **Implications**: Add `next-pwa` dependency, generate manifest from CMS data

### Scroll Animations (Lightweight)
- **Context**: Need subtle scroll-triggered animations without heavy libraries
- **Findings**:
  - CSS `@keyframes` + Intersection Observer API = zero-dependency solution
  - Alternative: `framer-motion` (already popular in React ecosystem, ~30KB)
  - Simplest approach: custom `useInView` hook + CSS classes
- **Implications**: Use custom `useInView` hook + CSS animations. No extra dependency needed.

### Google Drive Image URLs
- **Context**: Images served from Google Drive, some may be access-restricted
- **Findings**:
  - Format: `https://drive.google.com/uc?export=view&id={FILE_ID}`
  - Private S3 URLs (veda-app-private) return 403 — need fallback
  - Next.js Image requires `remotePatterns` for external domains
- **Implications**: Add drive.google.com + s3.veda-app.com to next.config.ts remotePatterns. All Image components need onError fallback to placeholder.

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks | Notes |
|--------|-------------|-----------|-------|-------|
| Provider + Hooks | React Context providers with custom hooks for data access | Simple, fits Next.js App Router, no extra state library | Context re-renders on any change | Mitigated by splitting providers (SiteConfig, Theme, Language) |
| Zustand | External state management | Minimal re-renders, simpler API | Extra dependency, overkill for this use case | Not needed — providers sufficient |
| Server Components + Client Islands | ISR server shell with client hydration islands | Best performance, minimal JS | More complex data flow | Adopted for main architecture |

**Selected**: Provider + Hooks combined with Server Components + Client Islands

## Design Decisions

### Decision: API Abstraction with Implementation Registry
- **Context**: Need to switch between mock and real APIs per-endpoint
- **Alternatives**:
  1. Global `USE_MOCK_API` env var — all or nothing
  2. Per-feature env vars (`MOCK_NEWS=true`) — too many vars
  3. Code-level registry with `implemented` boolean per endpoint
- **Selected**: Option 3 — registry at `src/lib/api/registry.ts`
- **Rationale**: Single source of truth, no env var sprawl, compile-time checked
- **Trade-offs**: Must update registry file when implementing each API (acceptable)

### Decision: i18n Strategy — Client-Side Language Switch
- **Context**: Bilingual (en/np) without doubling ISR pages
- **Alternatives**:
  1. URL-based (`/en/about`, `/np/about`) — doubles static pages, complex routing
  2. Cookie-based — requires middleware, affects caching
  3. Client-side localStorage + re-fetch — single URL, client toggle
- **Selected**: Option 3 — localStorage + client-side content re-fetch
- **Rationale**: Simplest ISR strategy, no URL duplication, fast toggle
- **Trade-offs**: Initial page always English (re-fetches Nepali on hydration if preferred)

### Decision: MUI vs shadcn/ui for Public Pages
- **Context**: MUI is installed but heavy for ISR public pages
- **Selected**: Use shadcn/ui (Radix) + Tailwind for all public page components. Keep MUI for admin CMS only.
- **Rationale**: Lighter bundle, better ISR performance, aligns with design system (CSS custom properties + Tailwind tokens)

### Decision: Remove MUI, Use shadcn/ui + Tailwind Everywhere
- **Context**: MUI is installed (Emotion SSR, CssBaseline, MuiThemeProvider) but adds unnecessary bundle weight and conflicts with Tailwind resets
- **Alternatives**:
  1. Keep MUI for admin, shadcn/ui for public — route groups, complexity
  2. Remove MUI entirely, use shadcn/ui + Tailwind for everything — cleanest approach
- **Selected**: Option 2 — Remove MUI completely
- **Rationale**: Eliminates ~200KB+ bundle weight (MUI + Emotion), removes CSS conflicts, single styling system, simpler provider tree. shadcn/ui provides all needed components (dialog, tabs, select, etc.) with Radix primitives already installed.
- **Implementation**:
  - Uninstall: `@mui/material`, `@mui/icons-material`, `@mui/material-nextjs`, `@emotion/react`, `@emotion/styled`, `@emotion/cache`
  - Delete: `emotion-cache.tsx` provider
  - Replace: ThemeProvider with a CMS-driven CSS variable injector (no MUI createTheme)
  - Rebuild: Any MUI components (currently only placeholder page.tsx) with shadcn/ui + Tailwind
  - No route groups needed — single layout tree for entire app

### Decision: Devanagari Font Support
- **Context**: Nepali text requires Devanagari script rendering. Current fonts (DM Sans, Cormorant Garamond) only load `latin` subset.
- **Findings**:
  - DM Sans does NOT support Devanagari
  - Cormorant Garamond does NOT support Devanagari
  - Noto Sans Devanagari (Google Fonts) is the standard fallback for Nepali/Hindi text
  - Can be loaded via `next/font/google` alongside existing fonts
- **Selected**: Add Noto Sans Devanagari as a CSS variable `--font-devanagari`, applied via `font-family` fallback chain
- **Implementation**: `font-family: var(--font-dm-sans), var(--font-devanagari), sans-serif` — browser picks Devanagari glyphs from the fallback when rendering Nepali

### Decision: Existing Code Refactoring
- **Context**: CLAUDE.md mandates arrow functions only, but existing files use `function` declarations (layout.tsx, page.tsx, theme-provider.tsx, providers/index.tsx, auth guards)
- **Selected**: Refactor existing files to arrow functions as part of the foundation task
- **Rationale**: Must happen before building on top of these files to maintain consistency
- **Scope**: layout.tsx, page.tsx, theme-provider.tsx, providers/index.tsx, auth/provider.tsx, auth/guards.tsx

### Decision: next.config.ts Remote Patterns
- **Context**: Mock data references images from S3 (veda-app) and Google Drive domains
- **Findings**: Current config only has Supabase + localhost patterns
- **Selected**: Add `s3.veda-app.com`, `veda-app.s3.ap-south-1.amazonaws.com`, `drive.google.com` to remotePatterns
- **Implementation**: Update next.config.ts in foundation task

### Decision: TailwindCSS 4 Theme Integration
- **Context**: Need CSS custom properties referenced by Tailwind theme tokens
- **Findings**:
  - TailwindCSS 4 uses `@theme` directive in CSS to define design tokens
  - CSS variables defined in `:root` can be referenced in `@theme` block
  - No separate tailwind.config.ts needed — all in globals.css
- **Selected**: Define color tokens as CSS custom properties in `globals.css`, reference via `@theme` directive
- **Implementation**:
  ```css
  @import "tailwindcss";
  @theme {
    --color-primary: var(--cms-primary, #B8860B);
    --color-primary-light: var(--cms-primary-light, #D4A017);
    /* ... */
  }
  ```
  CmsThemeProvider overrides `--cms-*` variables at runtime from SiteConfig

## Risks & Mitigations
- **Risk**: Google Drive images return 403 → **Mitigation**: All Image components use onError fallback placeholder
- **Risk**: ISR cache stale after CMS publish → **Mitigation**: Admin CMS triggers `revalidateTag()` on publish
- **Risk**: Language flash on initial load (English → Nepali) → **Mitigation**: Minimal loading skeleton during hydration, fast re-fetch
- **Risk**: Large hero images slow LCP → **Mitigation**: Priority loading for first slide, WebP format, responsive srcset
- **Risk**: MUI removal breaks existing providers → **Mitigation**: Only placeholder page.tsx uses MUI; providers rewritten as lightweight CSS var injectors
- **Risk**: Devanagari text renders in system font → **Mitigation**: Noto Sans Devanagari loaded as explicit fallback font
- **Risk**: Existing `function` declarations violate project conventions → **Mitigation**: Refactored in foundation task before building new code

## References
- [TailwindCSS 4 Theme Configuration](https://tailwindcss.com/docs/theme) — `@theme` directive for CSS variable integration
- [Noto Sans Devanagari on Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari) — Devanagari font family
- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) — Separate layouts without affecting URL
