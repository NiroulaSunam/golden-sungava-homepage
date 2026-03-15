# Implementation Plan

- [x] 1. Foundation — Remove MUI, setup design system, refactor existing code
- [x] 1.1 Remove MUI dependencies and rewrite providers without Emotion or MUI
  - Uninstall MUI, Emotion, and MUI-NextJS packages
  - Delete the Emotion cache provider
  - Rewrite the theme provider as a lightweight CSS custom property injector that reads from site config
  - Rewrite the main providers composition to remove Emotion and MUI wrappers
  - Rewrite the homepage placeholder to use Tailwind classes instead of MUI components
  - Ensure the build passes with no MUI references remaining
  - _Requirements: 1.2, 22.2, 24.1, 24.3_

- [x] 1.2 (P) Refactor all existing files to use arrow functions
  - Convert layout, page, providers, auth provider, and auth guards from `function` declarations to arrow functions
  - Ensure named exports for all non-page components, default export for page components
  - Verify build passes after refactoring
  - _Requirements: 23.2_

- [x] 1.3 Setup TailwindCSS 4 design system with CMS-ready CSS custom properties
  - Add `@import "tailwindcss"` to globals.css
  - Define `:root` color tokens for Deep Gold theme (primary, primary-light, primary-dark, background, foreground, muted, accent) with `--cms-` prefixed variables that the CMS theme provider will override at runtime
  - Add `@theme` directive referencing the CSS variables with hardcoded fallback defaults
  - Define typography utility classes using the font CSS variables (headings use Cormorant, body uses DM Sans)
  - Add scroll animation keyframes (fade-in, slide-up) and a `.animate-on-scroll` utility class
  - Update focus-visible outline from green to Deep Gold
  - Replace hardcoded scrollbar hex colors with theme tokens
  - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5, 24.6_

- [x] 1.4 (P) Add Devanagari font and update next.config for external images
  - Add Noto Sans Devanagari via next/font in the root layout as a CSS variable fallback for Nepali text
  - Update the font-family chain to include the Devanagari variable after the primary font
  - Add remote image patterns for Google Drive, S3 veda-app domains
  - Update viewport themeColor from green to Deep Gold
  - Create a placeholder SVG image for the image fallback component
  - _Requirements: 21.1, 18.3, 20.10_

- [x] 2. Data layer — API client, registry, and shared types
- [x] 2.1 Create the API implementation registry with all endpoint configurations
  - Define a typed map of all 13 endpoints with their implementation status (all start as false), API URL pattern, mock data key, and description
  - Export the registry as a compile-time constant
  - _Requirements: 2.6, 2.7, 2.8, 2.9_

- [x] 2.2 Build the centralized data-fetching client that switches between mock and real API
  - Create a single `fetchApi` function that checks the registry for each endpoint
  - When an endpoint is not implemented, resolve from mock data files using the language parameter
  - When an endpoint is implemented, make an HTTP request to the real API URL with the language query parameter appended
  - Return a typed response wrapper indicating whether data came from mock or real source
  - Default language to English when not provided; fall back to default language when requested language is unavailable in mock data
  - Never throw — always return a structured response with data or error
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.10, 21.10, 25.4_

- [x] 2.3 (P) Define shared API response types and re-export mock types
  - Create a shared types file exporting ApiEndpoint, FetchOptions, ApiResponse, BilingualData, and all content types (SiteConfig, HeroSlide, NavItem, etc.)
  - Ensure all types align with existing mock data exports
  - Add a site-defaults constants file with hardcoded fallback values matching the English mock site-config
  - _Requirements: 25.1, 25.2, 25.3, 1.4_

- [x] 3. Context providers — site config, language, and theme
- [x] 3.1 Build the site configuration provider that fetches and caches CMS config
  - Fetch site-config via the API client on mount
  - Cache the config in React state (single fetch per session)
  - Fall back to hardcoded site defaults if the API call fails or returns an error
  - Expose a `useSiteConfig()` hook returning config and loading state
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 22.1_

- [x] 3.2 Build the language provider with localStorage persistence and translation support
  - Read the user's preferred language from localStorage on mount; default to English if absent or invalid
  - Provide a `setLanguage()` function that updates state, writes to localStorage, and triggers content re-fetch
  - Implement a `t()` translation function that looks up UI label keys from a translation dictionary
  - Create English and Nepali translation dictionary files with all UI labels (nav items, buttons, headings, placeholders, form labels)
  - If a translation key is missing, fall back to English
  - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.8, 22.3_

- [x] 3.3 Extend the theme provider to inject CMS-sourced color tokens at runtime
  - Read theme colors from the site config provider
  - Apply CMS colors as `--cms-*` CSS custom properties on the document root element so Tailwind tokens pick them up
  - Support light/dark mode toggle via a CSS class
  - _Requirements: 1.2, 22.2, 24.1, 24.3_

- [x] 3.4 Compose all providers into the app-level wrapper and wire into root layout
  - Compose SiteConfigProvider, CmsThemeProvider, LanguageProvider, and AuthProvider into a single AppProviders component
  - Display a minimal, non-layout-shifting loading state while providers initialize
  - Wire AppProviders into the root layout replacing the old MUI-based provider tree
  - _Requirements: 22.4, 22.5_

- [x] 4. Shared components — image fallback, skeletons, SEO, breadcrumbs
- [x] 4.1 (P) Build the image-with-fallback component wrapping Next.js Image
  - Wrap the Next.js Image component with an onError handler that swaps to the placeholder SVG
  - Accept all standard Next.js Image props plus an optional custom fallback source
  - Handle Google Drive and S3 URLs that may return 403
  - _Requirements: 20.10, 18.3_

- [x] 4.2 (P) Build the skeleton loader component for content loading states
  - Create a configurable skeleton component that renders animated placeholder shapes (rectangle, circle, text lines)
  - Support variant props for different content types (card, text block, image, avatar)
  - Use CSS animations (pulse) consistent with the design system
  - _Requirements: 18.6_

- [x] 4.3 (P) Build SEO metadata helper and JSON-LD structured data component
  - Create a metadata generation helper that accepts page-specific CMS SEO fields and returns a Next.js Metadata object with title, description, Open Graph tags, and canonical URL
  - Build a JSON-LD component that renders Schema.org structured data as a script tag in the page head
  - Support EducationalOrganization, BreadcrumbList, and FAQPage schema types
  - Source school details from site config
  - _Requirements: 20.1, 20.2, 20.4, 20.5, 20.8, 20.9_

- [x] 4.4 (P) Build breadcrumb navigation component with structured data
  - Render breadcrumb links based on current path segments
  - Include JSON-LD BreadcrumbList markup for search engine rich results
  - Use semantic HTML nav element
  - _Requirements: 20.6_

- [x] 4.5 (P) Build section heading and content card shared components
  - Create a reusable section heading component with title, optional subtitle, and "View All" link
  - Create a reusable content card component for news, events, and blog items (image, title, date, excerpt, link)
  - Use the image-with-fallback component for all images
  - _Requirements: 23.1, 23.3, 23.4_

- [x] 4.6 (P) Build the scroll-triggered animation hook
  - Create a custom hook using the Intersection Observer API that returns a ref and a boolean for in-view state
  - Components apply CSS animation classes when the element enters the viewport
  - Support configurable threshold and trigger-once behavior
  - _Requirements: 24.5_

- [x] 5. Layout — header, footer, mobile drawer, floating CTA, language switcher
- [x] 5.1 Build the responsive header with mega-menu navigation
  - Fetch navigation items from the API client using the current language
  - Render desktop navigation with dropdown menus for items that have children
  - Highlight the currently active page based on the current pathname
  - Make the header sticky with a backdrop blur effect on scroll
  - Include the school logo and name from site config
  - _Requirements: 17.1, 17.3_

- [x] 5.2 Build the mobile hamburger drawer navigation
  - Render a hamburger button that opens a slide-out drawer on mobile viewports
  - Display all navigation items in an accordion-style expandable list
  - Include the language switcher and admission CTA inside the drawer
  - Close the drawer on navigation or outside click
  - _Requirements: 17.2_

- [x] 5.3 (P) Build the language switcher toggle component
  - Render an EN/NP toggle button in the header (desktop) and mobile drawer
  - On click, call the language provider's setLanguage function
  - Show the currently active language with visual indicator
  - _Requirements: 21.4, 17.6_

- [x] 5.4 (P) Build the CMS-driven footer with contact info and social links
  - Render school address, phone numbers, email, office hours, and social media icons from site config
  - Include quick links from navigation data
  - Display copyright text with the school name from CMS
  - Use semantic HTML footer element
  - _Requirements: 17.4, 1.5, 20.5_

- [x] 5.5 (P) Build the floating admission CTA button for mobile
  - Render a persistent "Get Admission" button fixed at the bottom of mobile viewports
  - Hide on desktop viewports
  - Link to the admission page
  - Use CTA text from site config if available
  - _Requirements: 17.5_

- [x] 5.6 Wire the layout components into a public layout wrapper
  - Create a public layout component that composes header, main content area, footer, and floating CTA
  - Apply the layout in the root or a shared layout file so all pages inherit it
  - Ensure semantic HTML structure with main, header, footer elements
  - _Requirements: 17.1, 17.4, 20.5_

- [x] 6. Homepage — hero, facilities, activities, news, events, blogs, testimonials
- [x] 6.1 Build the hero carousel with auto-advance, swipe, and LCP optimization
  - Render a full-width hero section with CMS-sourced slides (image, heading, subheading, CTA)
  - Auto-advance slides every 5 seconds with smooth crossfade transition
  - Support previous/next arrow controls and dot indicators
  - Enable touch swipe on mobile using pointer events
  - Eagerly load the first slide image for LCP; lazy-load subsequent slides
  - Pause auto-advance on hover or touch interaction
  - Ensure minimum 44x44px touch targets for all controls
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 6.2 (P) Build the facilities preview section
  - Render a grid of facility cards with icon, title, and short description from CMS
  - Each card links to the detailed facilities page
  - On mobile, render as a horizontally scrollable carousel
  - Display 4-6 featured facilities
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 6.3 (P) Build the activities carousel section
  - Render an auto-scrolling carousel of activity cards with image, title, and short description
  - Each card links to the activities page
  - Support manual navigation controls
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 6.4 (P) Build the latest news and upcoming events sections
  - Render 3-6 latest news cards with thumbnail, title, date, and excerpt
  - Render upcoming event cards with title, date, time, and description
  - Each card links to its detail page
  - Include "View All" links to the news and events listing pages
  - When no content exists, show a configurable empty state or hide the section
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 6.5 (P) Build the blog preview section
  - Render 3-4 latest blog cards with featured image, title, author, date, and excerpt
  - Each card links to the blog detail page
  - Include a "Read More" link to the blog listing page
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 6.6 (P) Build the testimonials carousel
  - Render a rotating carousel of testimonials with quote, author name, role, and optional photo
  - Auto-advance with pause-on-hover behavior
  - Display a minimum of 3 testimonials in rotation
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 6.7 Compose all homepage sections into the homepage and configure ISR
  - Compose hero, facilities, activities, news/events, blogs, and testimonials into the homepage
  - Fetch all data via the API client at build time for ISR
  - Add scroll animations to each section using the in-view hook
  - Generate page metadata from CMS SEO fields
  - Include JSON-LD EducationalOrganization structured data
  - _Requirements: 18.1, 20.1, 20.2, 20.7, 24.5, 24.7_

- [x] 7. Public pages — about, principal, staff, gallery
- [x] 7.1 Build the About Us page
  - Render school history, mission, vision, and values from CMS content
  - Display accompanying images using the image-with-fallback component
  - Include a link/section to the principal's message
  - Generate page-specific SEO metadata and breadcrumbs
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 7.2 (P) Build the Principal's Message page
  - Display the principal's full message, name, title, photo, and signature from CMS
  - Render rich text content (paragraphs, emphasis, lists) using markdown renderer
  - Generate page-specific SEO metadata and breadcrumbs
  - _Requirements: 10.1, 10.2_

- [x] 7.3 (P) Build the Teacher & Staff Directory page
  - Display all staff members grouped by department with filtering capability
  - Each staff card shows photo, name, designation, department, and optionally email
  - Support department filter tabs or dropdown
  - On mobile, render single-column layout with appropriate spacing
  - Use department and designation label translations for Nepali language
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 7.4 (P) Build the Photo Gallery page with lightbox
  - Display photo albums as a grid of cover thumbnails with album name and date
  - On album click, open a lightbox/modal gallery with navigation between photos
  - Support pagination or infinite scroll for large collections
  - _Requirements: 12.1, 12.2, 12.5_

- [x] 7.5 (P) Build the Video Gallery page with lazy YouTube embeds
  - Render YouTube video thumbnails from CMS-stored YouTube URLs
  - Use click-to-play pattern: show static thumbnail, load iframe only on click for performance
  - Support pagination for large collections
  - _Requirements: 12.3, 12.4, 12.5_

- [x] 8. Public pages — news, events, notices, blogs listing and detail
- [x] 8.1 Build a reusable listing page component with search and pagination
  - Create a shared listing page template that accepts a content type and renders a paginated grid of content cards
  - Support search input and category/date filtering
  - Include skeleton loaders while data is fetching
  - Render pagination controls at the bottom
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [x] 8.2 Build a reusable detail page component for rich content
  - Create a shared detail page template that renders full CMS content with images, rich text, and related links
  - Support PDF download links for notices with Google Drive attachments
  - Include breadcrumbs and page-specific SEO metadata
  - Implement internal linking between related content types
  - _Requirements: 13.5, 13.6, 20.6, 20.11_

- [x] 8.3 Wire up News, Events, Notices, and Blogs listing and detail routes
  - Create the news listing page and dynamic detail page route
  - Create the events listing page and dynamic detail page route
  - Create the notices listing page
  - Create the blogs listing page and dynamic detail page route
  - Each route fetches data via the API client with language parameter and generates ISR metadata
  - _Requirements: 13.1, 13.2, 13.3, 13.5, 18.1_

- [x] 9. Public pages — admission, calendar, facilities, downloads, payment, contact
- [x] 9.1 Build the Admission page with online form and QR code
  - Display admission information, eligibility criteria, and process steps from CMS
  - Build an embedded admission form with fields validated by Zod schemas
  - Show inline field-level validation errors on submission
  - Display a QR code image from CMS for mobile enrollment
  - Show a confirmation message on successful submission
  - Include FAQ structured data for rich snippet eligibility
  - FAQ data fetched via `fetchApi('faqs', { lang })` with bilingual mock data and JSON-LD structured data rendered dynamically
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 20.8_

- [x] 9.2 (P) Build the Calendar page
  - Display the academic calendar from CMS with events marked by date
  - Render a visual calendar grid or timeline with event indicators
  - _Requirements: 15.1_

- [x] 9.3 (P) Build the Facilities detail page
  - Display all school facilities from CMS with name, description, and image gallery
  - Use the image-with-fallback component for all facility images
  - _Requirements: 15.2_

- [x] 9.4 (P) Build the Downloads page
  - List downloadable documents from CMS with title, file type icon, and Google Drive download link
  - Each download opens the Google Drive link in a new tab
  - _Requirements: 15.3, 15.4_

- [x] 9.5 (P) Build the Payment Info page
  - Display Khalti and eSewa payment instructions with QR code images from CMS
  - Render step-by-step payment guides
  - _Requirements: 16.1_

- [x] 9.6 Build the Contact page with form and map
  - Display phone numbers, emails, office hours, and address from site config
  - Embed a Google Maps iframe showing the school location
  - Include clickable WhatsApp and Messenger links from CMS
  - Build a contact form with name, email, phone, subject, and message fields with Zod validation
  - _Requirements: 16.2, 16.3, 16.4, 16.5_

- [ ] 10. SEO infrastructure — sitemap, robots, canonical URLs, semantic HTML
- [ ] 10.1 Generate dynamic sitemap.xml including all public pages
  - Create a sitemap route that lists all public pages with correct lastmod dates
  - Include listing pages and individual detail pages for news, events, blogs
  - _Requirements: 20.3_

- [ ] 10.2 (P) Generate robots.txt allowing search engine crawling
  - Create a robots route that allows crawling of all public pages
  - Reference the sitemap URL
  - _Requirements: 20.4_

- [ ] 10.3 Verify semantic HTML and canonical URLs across all pages
  - Ensure all pages use semantic elements (article, section, nav, header, footer, main)
  - Verify canonical URLs are set correctly on every page to prevent duplicate content
  - Ensure all images have descriptive alt text from CMS metadata
  - _Requirements: 20.5, 20.7, 20.9, 20.10, 20.11_

- [ ] 11. PWA — manifest, service worker, offline page, install prompt
- [ ] 11.1 Create a dynamic web manifest sourced from CMS site config
  - Generate manifest.json with school name, icons, theme color from CMS, and standalone display mode
  - Include 192px and 512px icon sizes
  - _Requirements: 19.1_

- [ ] 11.2 Set up service worker for offline caching
  - Register a service worker that caches static pages and assets
  - Cache ISR-generated pages for offline access
  - Create a branded offline fallback page for uncached dynamic content
  - _Requirements: 19.2, 19.3_

- [ ] 11.3 (P) Build the PWA install prompt banner
  - Detect eligible mobile browsers and show an install prompt banner
  - Allow dismissal and remember the user's choice
  - When installed, render in standalone mode with the school's theme color for the status bar
  - _Requirements: 19.4, 19.5_

- [ ] 12. Integration testing and final verification
- [ ] 12.1 Verify all homepage sections render correctly with mock data in both languages
  - Test that all 7 homepage sections render with English mock data
  - Toggle language to Nepali and verify all content switches
  - Verify image fallbacks work for inaccessible URLs
  - Confirm scroll animations trigger on viewport entry
  - _Requirements: 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 21.6, 24.5_

- [ ] 12.2 (P) Verify navigation, layout, and responsive behavior
  - Test desktop mega-menu navigation with active page highlighting
  - Test mobile hamburger drawer opens/closes correctly
  - Verify language switcher persists preference across page navigation
  - Test floating CTA visibility on mobile only
  - Verify footer renders all CMS content
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

- [ ] 12.3 (P) Verify ISR, performance, and build output
  - Run a production build and verify all pages generate as static ISR pages
  - Verify route-based code splitting produces separate bundles per page
  - Check that the first hero image loads with priority for LCP
  - Verify navigation link prefetching is active
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [ ] 12.4 Verify SEO output and structured data across all pages
  - Check that every page generates correct title, meta description, and Open Graph tags
  - Verify JSON-LD EducationalOrganization schema on the homepage
  - Verify BreadcrumbList schema on inner pages
  - Verify FAQ schema on the admission page
  - Confirm sitemap.xml includes all public pages
  - Confirm robots.txt is correctly generated
  - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.6, 20.8_

- [ ]* 12.5 (P) Unit tests for API client, language provider, and translation function
  - Test API client routes to mock data when endpoint is not implemented
  - Test API client routes to real API when endpoint is implemented
  - Test language provider reads/writes localStorage and defaults correctly
  - Test translation function returns correct labels and falls back to English for missing keys
  - _Requirements: 2.1, 2.7, 2.8, 21.2, 21.3, 21.5, 21.8_
