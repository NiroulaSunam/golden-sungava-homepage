# Golden Sungava Master Plan

## Context

Premium school homepage rebuild for **Golden Sungava English Boarding School** (Changunarayan-2, Duwakot, Bhaktapur, Nepal). The existing site at goldensungavaschool.edu.np is outdated. Goal: a **premium, mobile-first, PWA-enabled** school website with an admin CMS.

**User requirements:**
- Deep Gold (#B8860B) primary color scheme — dark, luxury feel
- Mobile-first design (usable as a mobile app via PWA)
- ISR for public pages, CSR for admin
- Supabase for data, Google Drive / YouTube for media (save storage costs)
- All features from existing site + premium upgrades
- Admin CMS for content management

## Documentation Updates (Completed)

| File | Action |
|------|--------|
| `CLAUDE.md` | Updated intro, stack, architecture; added media/rendering/PWA/design strategy; removed duplicate AI-DLC section; added component architecture rules |
| `.kiro/steering/product.md` | Full rewrite — complete product overview with feature inventory |
| `.kiro/steering/tech.md` | Added ISR, PWA, Google Drive media, SEO, design system sections |
| `public/images/logo.png` | Downloaded school logo from existing site |

## Feature Inventory (for spec-init)

### Public Pages
1. Home (hero carousel, facilities preview, activities, news, blogs, testimonials)
2. About Us (history, mission, vision, values)
3. Principal's Message
4. Teacher & Staff directory
5. Gallery - Photos (albums by event/year)
6. Gallery - Videos (YouTube embeds)
7. News articles
8. Events (upcoming/past)
9. Notices (with PDF support)
10. Admission (info + online form + QR enrollment)
11. Activities (extracurricular showcase)
12. Calendar (academic/event)
13. Facilities (sports, transport, labs, etc.)
14. Blogs
15. Downloads (forms, syllabi)
16. Payment Info (Khalti + eSewa instructions/QR)
17. Contact (phone, email, maps, WhatsApp, Messenger)

### Admin CMS
- CRUD for all content types
- Media management (Google Drive links)
- User role management (admin, editor, viewer)
- Dashboard with content overview
- Admission form submissions viewer
- Notice/announcement publisher

### Cross-Cutting Concerns
- PWA (service worker, web manifest, install prompt)
- i18n (English + Nepali)
- SEO (meta tags, Open Graph, Schema.org, sitemap)
- Design system (Deep Gold theme tokens, typography)
- ISR revalidation from admin actions

## Design Philosophy

### Premium Gold Standard
- **Color**: Deep Gold (#B8860B) + dark neutrals — CSS variables / Tailwind tokens
- **Typography**: Cormorant Garamond (headings) + DM Sans (body)
- **Imagery**: Full-bleed hero sections, professional photography
- **Whitespace**: Generous spacing for elegance
- **Animations**: Subtle scroll animations, hover effects

### Mobile-First + PWA
- Mobile FIRST, scales up to desktop
- Installable PWA for parents
- Touch-friendly, large tap targets
- < 3s load on 3G

### Component Architecture
- Arrow functions only (`const Component = () => {}`)
- One component per file (max ~50-80 lines JSX)
- Aggressively extract sub-components
- Named exports only (except page components)

## Tech Stack Summary

- Next.js 16.1 (ISR + CSR)
- TailwindCSS 4 + shadcn/ui
- Supabase (PostgreSQL + Auth)
- Google Drive (images/documents)
- YouTube (video embeds)
- Zod (validation)
- React Hook Form
- Lucide React (icons)

## Contact Info (for site content)

- Phone: 01-6614896, 01-6615702, 9851160980, 9841472550
- Email: sungava2053@gmail.com, pmina9561@gmail.com
- Location: Changunarayan-2, Duwakot, Bhaktapur, Nepal
- Office Hours: 10:00 AM - 3:30 PM (weekdays)
