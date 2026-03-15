# Product Overview

Golden Sungava Homepage — Premium website for **Golden Sungava English Boarding School**, an English-medium boarding school in Changunarayan-2 (Duwakot), Bhaktapur, Nepal. Serves students up to Grade 10.

## Two Systems

### 1. Public Website (ISR)
Premium, mobile-first school website. Installable as PWA for parents/students.

### 2. Admin CMS (CSR)
Content management dashboard for school staff to manage all dynamic content.

## Core Capabilities

### Public Pages (from existing site + upgrades)

| Page | Content | Media Source |
|------|---------|-------------|
| **Home** | Hero carousel, facilities preview, activities carousel, latest news, blogs, testimonials | Google Drive images, YouTube |
| **About Us** | School history, mission, vision, values | Google Drive images |
| **Principal's Message** | Principal's letter + photo | Google Drive |
| **Teacher & Staff** | Staff directory with photos, roles, qualifications | Google Drive |
| **Gallery - Photos** | Photo albums organized by event/year | Google Drive |
| **Gallery - Videos** | Video gallery | YouTube embeds |
| **News** | News articles with thumbnails, date, content | Google Drive |
| **Events** | Upcoming/past events with details | Google Drive |
| **Notices** | Official school notices (may include PDF) | Google Drive |
| **Admission** | Admission info, online form, QR code enrollment | - |
| **Activities** | Extracurricular activities showcase | Google Drive |
| **Calendar** | Academic calendar / event calendar | - |
| **Facilities** | Sports, Transport, Science Lab, Computer Lab, etc. | Google Drive |
| **Blogs** | Blog posts with featured images | Google Drive |
| **Downloads** | Downloadable documents (forms, syllabi, etc.) | Google Drive links |
| **Payment Info** | Khalti & eSewa payment instructions, QR codes | Static images |
| **Contact** | Phone, email, Google Maps embed, WhatsApp link, Messenger | - |

### Admin CMS Features
- CRUD for all content types (news, events, notices, blogs, activities, gallery, staff, facilities)
- Media management (Google Drive link management)
- User role management (admin, editor, viewer)
- Dashboard with content overview
- Admission form submissions viewer
- Notice/announcement publisher

### Payment Integration (Info Pages)
- Khalti payment instructions + QR code
- eSewa payment instructions + QR code
- Not a payment gateway — just info pages with instructions

### Contact Channels
- Phone: 01-6614896, 01-6615702, 9851160980, 9841472550
- Email: sungava2053@gmail.com, pmina9561@gmail.com
- WhatsApp integration
- Facebook Messenger
- Google Maps embed (Changunarayan-2, Duwakot, Bhaktapur)
- Office Hours: 10:00 AM - 3:30 PM (weekdays)

## Design Philosophy

### Premium Gold Standard
Inspired by top-tier school websites (Beau Soleil, Sevenoaks School, Khan Lab School):
- **Color**: Deep Gold + dark neutrals — defined as CSS variables / Tailwind theme tokens (see Design System in tech.md)
- **Typography**: Serif headings (Cormorant Garamond) + clean sans-serif body (DM Sans)
- **Imagery**: High-quality, full-bleed hero sections with professional photography
- **Whitespace**: Generous spacing for elegance and readability
- **Animations**: Subtle scroll animations, hover effects (no flashy/distracting)

### Mobile-First + PWA
- Designed for mobile FIRST, then scales up to desktop
- Installable as PWA (service worker, web manifest, offline support)
- Parents can "install" it as an app on their phones
- Touch-friendly CTAs, large tap targets
- Fast load times (< 3 seconds on 3G)

### UX Patterns
- Audience segmentation: Parents, Students, Prospective Families
- Prominent CTAs: "Get Admission", "Contact Us"
- Mega-menu navigation with clear hierarchy
- Search functionality across all content
- Testimonials and social proof

## Target Users
- **Parents** (primary): Check notices, news, events, payment info, contact school
- **Prospective families**: Learn about school, view facilities, apply for admission
- **Students**: Access calendar, activities, downloads
- **School staff (admin)**: Manage content via CMS

## Internationalization (i18n)
- Full bilingual support: **English + Nepali (नेपाली)**
- Language switcher in navigation
- All UI labels translated
- Content (news, notices, blogs) can be entered in both languages by admin
- URL structure: `/en/...` and `/np/...` (or cookie-based)

## Business Context
- **Location**: Bhaktapur, Nepal
- **Status**: New project, not yet deployed
- **Existing site**: goldensungavaschool.edu.np (to be replaced)
- **Currency**: NPR (Nepalese Rupee)
