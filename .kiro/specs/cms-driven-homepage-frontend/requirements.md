# Requirements Document

## Introduction

Premium, CMS-driven frontend for Golden Sungava English Boarding School's public website. Every piece of content — from school name and theme colors to page text and SEO metadata — is sourced from a CMS data layer. A feature-flag-controlled mock system (`USE_MOCK_API`) allows full frontend development with realistic data before backend APIs exist. The site is ISR-rendered for speed, PWA-enabled for mobile app experience, and SEO-optimized for Google and AI search visibility.

**Scope**: Public-facing frontend design and implementation (homepage + all public pages). Admin CMS UI is a separate spec.

---

## Requirements

### Requirement 1: CMS-Driven Site Configuration

**Objective:** As a school administrator, I want all site-wide configuration (school name, tagline, colors, contact info, social links, logo) to come from CMS, so that I can rebrand or update identity without code changes.

#### Acceptance Criteria
1. The Homepage shall render the school name, tagline, logo, and contact information from CMS site-config data.
2. The Homepage shall apply primary color, accent color, background color, and all theme tokens from CMS site-config data as CSS custom properties at the `:root` level.
3. When CMS site-config data changes and the page is revalidated, the Homepage shall reflect updated branding (name, colors, logo) without redeployment.
4. If the CMS API is unavailable and no cached data exists, the Homepage shall render with hardcoded fallback values from `src/lib/constants/site-defaults.ts`.
5. The Homepage shall source footer content (address, phone numbers, email, social media links, office hours) from CMS site-config data.

---

### Requirement 2: Feature-Flag Mock API System with Implementation Tracking

**Objective:** As a developer, I want a feature-flag-controlled mock API system with per-endpoint implementation tracking, so that I can build the entire frontend before backend APIs exist and incrementally switch to real APIs as they are implemented.

#### Acceptance Criteria
1. The system shall read a `USE_MOCK_API` environment variable (or feature flag) as the global default data source toggle.
2. When `USE_MOCK_API` is `true`, the data-fetching layer shall return data from mock files located in `src/mocks/`.
3. When `USE_MOCK_API` is `false`, the data-fetching layer shall call actual API endpoints; if the endpoint does not exist, the system shall return a structured 404 error response.
4. The system shall provide a centralized data-fetching abstraction (`src/lib/api/`) that all components use, so switching between mock and real API requires zero component changes.
5. Each mock file shall include a header comment documenting: endpoint URL it replaces, expected request parameters, response shape, and last-updated date.
6. The system shall maintain an **API implementation registry** (`src/lib/api/registry.ts`) — a code-level map of every endpoint with its implementation status (`implemented: boolean`).
7. When an endpoint is marked `implemented: true` in the registry, the data-fetching layer shall call the real API regardless of the global `USE_MOCK_API` flag.
8. When an endpoint is marked `implemented: false` in the registry, the data-fetching layer shall use mock data regardless of the global `USE_MOCK_API` flag.
9. The registry shall serve as the single source of truth for which endpoints are live vs mocked — no per-feature env vars needed.
10. The system shall include all API calls with a `lang` query parameter (e.g., `?lang=en` or `?lang=np`) so the backend returns language-appropriate content.

---

### Requirement 3: Homepage — Hero Section

**Objective:** As a visitor, I want an impactful hero section with carousel, so that I immediately understand the school's value proposition and can take action.

#### Acceptance Criteria
1. The Homepage shall display a full-width hero carousel with CMS-sourced slides (image, heading, subheading, CTA button text, CTA link).
2. The hero carousel shall auto-advance every 5 seconds with smooth crossfade or slide transition.
3. The hero carousel shall support manual navigation via previous/next arrows and dot indicators.
4. When viewed on mobile, the hero section shall render a mobile-optimized layout with touch-swipe support and appropriately sized tap targets (minimum 44x44px).
5. The hero section shall lazy-load images below the fold while eagerly loading the first slide image for LCP optimization.
6. The hero section shall include a persistent CTA button ("Get Admission" or CMS-configured text) visible on all slides.

---

### Requirement 4: Homepage — Facilities Preview

**Objective:** As a prospective parent, I want to see the school's facilities at a glance, so that I can assess the learning environment.

#### Acceptance Criteria
1. The Homepage shall display a facilities grid/carousel section with CMS-sourced facility cards (icon/image, title, short description).
2. Each facility card shall link to the detailed Facilities page section for that facility.
3. The facilities section shall display a configurable number of featured facilities (default: 4-6) as set in CMS.
4. When viewed on mobile, the facilities section shall render as a horizontally scrollable carousel.

---

### Requirement 5: Homepage — Activities Section

**Objective:** As a visitor, I want to see the school's extracurricular activities, so that I understand the holistic education approach.

#### Acceptance Criteria
1. The Homepage shall display an activities carousel/grid with CMS-sourced activity cards (image, title, short description).
2. Each activity card shall link to the detailed Activities page.
3. The activities section shall support auto-scrolling carousel with manual navigation controls.

---

### Requirement 6: Homepage — Latest News & Events

**Objective:** As a parent, I want to see the latest news and upcoming events, so that I stay informed about school happenings.

#### Acceptance Criteria
1. The Homepage shall display the latest 3-6 news articles from CMS (thumbnail, title, date, excerpt).
2. The Homepage shall display upcoming events from CMS (title, date, time, brief description).
3. Each news card shall link to the full news article page.
4. Each event card shall link to the full event detail page.
5. The news/events section shall include a "View All" link to the respective listing pages.
6. When no news or events exist in CMS, the section shall display gracefully with a "Coming soon" message or hide entirely (CMS-configurable).

---

### Requirement 7: Homepage — Blog Preview

**Objective:** As a visitor, I want to see featured blog posts, so that I can explore the school's thought leadership and student work.

#### Acceptance Criteria
1. The Homepage shall display 3-4 latest blog post cards from CMS (featured image, title, author, date, excerpt).
2. Each blog card shall link to the full blog post page.
3. The blog section shall include a "Read More" link to the blog listing page.

---

### Requirement 8: Homepage — Testimonials

**Objective:** As a prospective parent, I want to read testimonials from current parents and students, so that I gain confidence in the school.

#### Acceptance Criteria
1. The Homepage shall display a testimonials carousel with CMS-sourced testimonials (quote text, author name, role/relation, optional photo).
2. The testimonials carousel shall auto-advance with pause-on-hover behavior.
3. The testimonials section shall display a minimum of 3 testimonials in rotation.

---

### Requirement 9: Public Pages — About Us

**Objective:** As a prospective family, I want to learn about the school's history, mission, and values, so that I can determine if it aligns with my expectations.

#### Acceptance Criteria
1. The About Us page shall render school history, mission, vision, and values from CMS content.
2. The About Us page shall display accompanying images from Google Drive URLs stored in CMS.
3. The About Us page shall include a link/section for the Principal's Message.

---

### Requirement 10: Public Pages — Principal's Message

**Objective:** As a visitor, I want to read the principal's message, so that I understand the school's leadership philosophy.

#### Acceptance Criteria
1. The Principal's Message page shall display the principal's full message text, name, title, photo, and signature from CMS.
2. The page shall render rich text content (paragraphs, emphasis, lists) from CMS.

---

### Requirement 11: Public Pages — Teacher & Staff Directory

**Objective:** As a parent, I want to browse the school's staff directory, so that I can know who teaches and cares for my child.

#### Acceptance Criteria
1. The Staff page shall display all staff members from CMS grouped by department (Administration, Teaching, Co-curricular, Support).
2. Each staff card shall show photo, name, designation, department, and optionally email.
3. The staff page shall support filtering by department.
4. When viewed on mobile, staff cards shall render in a single-column layout with appropriate spacing.

---

### Requirement 12: Public Pages — Photo & Video Gallery

**Objective:** As a visitor, I want to browse photo albums and watch school videos, so that I can see the school environment and activities.

#### Acceptance Criteria
1. The Photo Gallery page shall display photo albums from CMS (album name, cover thumbnail, date).
2. When a user clicks an album, the system shall display photos in a lightbox/modal gallery with navigation.
3. The Video Gallery page shall render YouTube video embeds from CMS-stored YouTube URLs.
4. Each video embed shall use a lazy-loaded iframe with a click-to-play thumbnail for performance.
5. The gallery pages shall support pagination or infinite scroll for large collections.

---

### Requirement 13: Public Pages — News, Events, Notices

**Objective:** As a parent, I want to read news, see events, and check notices, so that I stay informed about school activities.

#### Acceptance Criteria
1. The News listing page shall display all news articles from CMS with pagination (thumbnail, title, date, excerpt).
2. The Events listing page shall display upcoming and past events from CMS (title, date, time, description, image).
3. The Notices listing page shall display official notices from CMS (title, date, content preview).
4. Each listing page shall support search and category/date filtering.
5. Individual news/event/notice detail pages shall render full CMS content with images and rich text.
6. Where a notice includes a PDF attachment, the notice page shall provide a download link to the Google Drive PDF URL.

---

### Requirement 14: Public Pages — Admission

**Objective:** As a prospective parent, I want to learn about the admission process and apply online, so that I can enroll my child conveniently.

#### Acceptance Criteria
1. The Admission page shall display admission information, eligibility criteria, and process steps from CMS.
2. The Admission page shall include an embedded online admission form with fields configured from CMS.
3. When the form is submitted, the system shall validate all fields using Zod schemas and display inline errors.
4. The Admission page shall display a QR code for mobile enrollment (QR image from CMS).
5. Upon successful form submission, the system shall display a confirmation message.

---

### Requirement 15: Public Pages — Calendar, Facilities, Downloads

**Objective:** As a parent/student, I want to access the academic calendar, view facilities, and download documents, so that I can plan and prepare.

#### Acceptance Criteria
1. The Calendar page shall display the academic calendar from CMS with events marked by date.
2. The Facilities page shall display all school facilities from CMS (name, description, image gallery).
3. The Downloads page shall list downloadable documents from CMS (title, file type icon, Google Drive download link).
4. Each download item shall open the Google Drive link in a new tab.

---

### Requirement 16: Public Pages — Payment Info & Contact

**Objective:** As a parent, I want to see payment instructions and contact the school easily, so that I can pay fees and communicate with the school.

#### Acceptance Criteria
1. The Payment Info page shall display Khalti and eSewa payment instructions with QR code images from CMS.
2. The Contact page shall display phone numbers, email addresses, office hours, and address from CMS site-config.
3. The Contact page shall embed a Google Maps iframe showing the school location.
4. The Contact page shall include clickable WhatsApp and Messenger links from CMS.
5. The Contact page shall include a contact form with name, email, phone, subject, and message fields.

---

### Requirement 17: Navigation & Layout

**Objective:** As a visitor, I want intuitive navigation with clear hierarchy, so that I can find any page quickly.

#### Acceptance Criteria
1. The system shall render a responsive navigation header with CMS-sourced menu items (label, URL, children for dropdowns).
2. When viewed on mobile, the navigation shall collapse into a hamburger menu with slide-out drawer.
3. The navigation shall highlight the currently active page/section.
4. The system shall render a footer with CMS-sourced links, contact info, social media icons, and copyright text.
5. The layout shall include a persistent "Get Admission" floating CTA button on mobile.
6. The navigation shall include a language switcher (English/Nepali) toggle.

---

### Requirement 18: ISR & Performance

**Objective:** As a user, I want the site to load blazingly fast, so that I have a smooth experience even on slow networks.

#### Acceptance Criteria
1. The system shall use Incremental Static Regeneration (ISR) for all public pages with on-demand revalidation via `revalidateTag()`.
2. The Homepage shall achieve a Largest Contentful Paint (LCP) under 2.5 seconds on mobile 3G.
3. The system shall optimize images using Next.js Image component with WebP format, responsive srcset, and lazy loading for below-fold images.
4. The system shall implement route-based code splitting so each page only loads its own JavaScript bundle.
5. The system shall prefetch visible navigation links for instant page transitions.
6. While a page is loading, the system shall display skeleton loading states (not spinners) for content sections.

---

### Requirement 19: PWA & Mobile Experience

**Objective:** As a parent, I want to install the school website as a mobile app, so that I can access it quickly from my home screen.

#### Acceptance Criteria
1. The system shall include a valid web manifest (`manifest.json`) with school name, icons (192px, 512px), theme color from CMS, and `display: "standalone"`.
2. The system shall register a service worker that caches static pages and assets for offline access.
3. While the device is offline, the system shall display a branded offline page for uncached dynamic content.
4. The system shall show an install prompt banner for eligible mobile browsers.
5. When installed as PWA, the system shall render with no browser chrome (standalone mode) using the school's theme color for the status bar.

---

### Requirement 20: SEO & AI Search Optimization

**Objective:** As a school administrator, I want the site to rank high on Google and appear in AI search results, so that more families discover our school.

#### Acceptance Criteria
1. The system shall generate `<title>`, `<meta description>`, and Open Graph tags from CMS SEO fields for every page.
2. The system shall embed JSON-LD structured data (Schema.org `EducationalOrganization`, `School`) with CMS-sourced school details.
3. The system shall generate a dynamic `sitemap.xml` that includes all public pages with correct `lastmod` dates.
4. The system shall generate a `robots.txt` that allows search engine crawling of all public pages.
5. The system shall use semantic HTML (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`) throughout all pages.
6. The system shall implement breadcrumb navigation with structured data for all inner pages.
7. The system shall render all content as server-side HTML (not client-rendered) for maximum crawlability.
8. The system shall include FAQ structured data on the Admission page for rich snippet eligibility.
9. The system shall implement canonical URLs to prevent duplicate content issues across language variants.
10. The system shall ensure all images have descriptive `alt` text from CMS image metadata.
11. The system shall implement internal linking between related content (news → events, blogs → activities) for crawl depth and topical relevance.

---

### Requirement 21: Internationalization (i18n) — Full Bilingual Content

**Objective:** As a Nepali-speaking parent, I want to browse the site in Nepali with all content (UI labels AND dynamic content) in my language, so that I can understand everything without switching.

#### Acceptance Criteria
1. The system shall support two languages: English (`en`) and Nepali (`np`), with English as default.
2. The system shall persist the user's language preference in `localStorage` under key `preferred-language`.
3. When the site loads, the system shall read `preferred-language` from `localStorage` and apply it; if absent, default to `en`.
4. The system shall render a language switcher in the navigation that toggles between English and Nepali and updates `localStorage` immediately.
5. When the language is switched, the system shall re-render all **UI labels** (buttons, nav items, headings, placeholders) from a translation dictionary (`src/lib/i18n/translations/`).
6. When the language is switched, the system shall re-fetch **dynamic CMS content** (news, events, blogs, notices, about, principal message, etc.) in the selected language by passing `lang` parameter to the API/mock layer.
7. The mock data layer shall provide bilingual mock data — each content mock file shall export data keyed by language code (e.g., `mockNews.en` and `mockNews.np`).
8. If CMS content is not available in the selected language, the system shall fall back to the default language (English) and display a subtle indicator that content is in fallback language.
9. The ISR pages shall generate static pages for both language variants, with the language determined by the `lang` parameter in the data fetch (not by URL path — single URL, client-side language switch).
10. The system shall pass `lang` parameter with every API call so the backend can return language-appropriate content.

---

### Requirement 22: Global Context & State Management

**Objective:** As a developer, I want centralized global context providers, so that shared state (theme, language, site config, user preferences) is accessible from any component without prop drilling.

#### Acceptance Criteria
1. The system shall provide a `SiteConfigProvider` that fetches and caches CMS site configuration (school name, colors, contact, SEO defaults) and makes it available via `useSiteConfig()` hook.
2. The system shall provide a `ThemeProvider` that applies CMS-sourced theme tokens as CSS custom properties and makes theme data available via `useTheme()` hook.
3. The system shall provide a `LanguageProvider` that reads/writes `preferred-language` from `localStorage`, manages current language selection, triggers content re-fetch on language change, and provides `useLanguage()` hook with `t()` translation function and `lang` code.
4. The system shall compose all providers in a single `AppProviders` wrapper component used in the root layout.
5. While any provider is loading initial data, the system shall display a minimal loading state that does not cause layout shift.

---

### Requirement 23: Modular Component Architecture

**Objective:** As a developer, I want small, modular, reusable components, so that the codebase is maintainable and easy to update.

#### Acceptance Criteria
1. The system shall organize public page components under `src/components/public/` with one component per file (max ~50-80 lines of JSX).
2. The system shall use arrow function syntax for all component definitions.
3. The system shall extract any JSX block exceeding ~30 lines into a private sub-component.
4. The system shall define props interfaces in the same file, above the component definition.
5. The system shall use named exports for all components except page-level components (which use default export).
6. The system shall provide barrel exports (`index.ts`) for each component directory.

---

### Requirement 24: Design System — Premium Gold Theme

**Objective:** As a visitor, I want a visually premium, elegant website, so that I perceive the school as high-quality.

#### Acceptance Criteria
1. The system shall define all colors as CSS custom properties in `globals.css`, referenced via Tailwind theme tokens — never hardcoded hex values in components.
2. The system shall use Cormorant Garamond for headings/display text and DM Sans for body text.
3. The system shall implement a Deep Gold (#B8860B) primary color scheme with dark neutrals as defined in the design system.
4. The system shall apply generous whitespace (padding, margins) for an elegant, uncluttered appearance.
5. The system shall implement subtle scroll-triggered animations (fade-in, slide-up) for content sections using CSS or a lightweight animation library.
6. The system shall ensure all interactive elements have visible hover/focus states with smooth transitions.
7. The system shall render full-bleed hero images and section backgrounds for visual impact.

---

### Requirement 25: Bilingual Mock Data Management

**Objective:** As a developer, I want organized, bilingual mock data that mirrors real API responses in both English and Nepali, so that frontend development supports both languages from day one.

#### Acceptance Criteria
1. The system shall store all mock data files in `src/mocks/data/` organized by domain (e.g., `site-config.ts`, `news.ts`, `staff.ts`, `events.ts`, `testimonials.ts`).
2. Each mock data file shall export typed data matching the exact API response interface.
3. Each content mock file shall export data in both languages, keyed by language code: `{ en: [...], np: [...] }`.
4. The mock data-fetching functions shall accept a `lang` parameter and return the appropriate language variant.
5. The system shall include a mock registry file (`src/mocks/index.ts`) that lists all mocks with their corresponding API endpoint and notes.
6. The mock data shall be populated with real content scraped from the existing school website (goldensungavaschool.edu.np) for English, with Nepali translations for all content.
7. When a mock is replaced by a real API, the endpoint shall be marked `implemented: true` in `src/lib/api/registry.ts`.
8. Mock files for implemented endpoints shall be retained with a `@deprecated` annotation for reference and testing fallback.
