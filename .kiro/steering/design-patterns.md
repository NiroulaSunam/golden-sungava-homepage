# Visual Design Patterns

Common design patterns used across all pages. Apply consistently when building new pages or components.

## Page Structure

### Inner Pages
All non-homepage pages use `<PageHeader>` component (`@/components/shared/page-header`):
```tsx
<PageHeader
  title={t('heading.pageName')}
  subtitle="Optional description"
  breadcrumbs={[{ label: 'Page', href: '/page' }]}
/>
```
- Background: `bg-muted` with texture overlay
- Gold accent bar under title

### Content Container
```tsx
<div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
```
Use `max-w-4xl` for narrow content (notices, downloads, calendar).

## Design Tokens

### Gold Accents
- **Title underline**: `<div className="mt-3 h-[3px] w-12 rounded-full bg-primary" />`
- **Sub-heading accent**: `<div className="mt-2 h-[2px] w-8 rounded-full bg-primary/30" />`
- **Section divider**: `<div className="section-divider" />`
- **Card hover border**: Add `card-gold-accent` class to interactive cards

### Backgrounds
- **Muted sections**: `bg-muted` — warm off-white for alternating rhythm
- **Dark sections**: `from-[#1A1A1A] to-[#111111]` gradient (footer)
- **Hero/feature**: `.bg-gold-gradient` with `.texture-overlay`

### Animations
- **Scroll reveal**: Wrap in `<AnimatedSection>` from `home-client.tsx`
- **Stagger delays**: `delay-100`, `delay-200`, `delay-300`, `delay-400`
- **Hero stagger**: `.hero-stagger-1`, `.hero-stagger-2`, `.hero-stagger-3`

## Component Patterns

### Cards
- Always use `card-gold-accent` on interactive cards
- Staff avatar: `ring-2 ring-primary/10` around photo
- Numbered items: Gold counter `text-primary/30` in top-right corner

### Forms
- Wrap in elevated card: `rounded-xl border border-border bg-card p-6 md:p-8`
- Add sub-heading gold accent after form title
- Submit button: `bg-primary` full width

### Lists
- `ListingPage` component for paginated grid content
- `ContentCard` supports `featured={true}` for editorial layout
- Notice/download items: icon in `bg-primary/10` left, content right

### Date Display
- Event dates use `DateBadge` component (month + day in `bg-primary/10`)
- Other dates: `<time className="text-xs text-muted-foreground">`

## Spacing Scale
| Context | Padding |
|---------|---------|
| Homepage sections | `py-16 md:py-20` |
| Inner page content | `py-12 md:py-16` |
| Between major groups | `section-divider` or `mt-16` |
| Card internal | `p-4` standard, `p-6` featured |

## Typography Hierarchy
| Element | Classes |
|---------|---------|
| Page title | `font-heading text-3xl font-bold md:text-4xl` |
| Section title | `font-heading text-3xl font-semibold tracking-tight md:text-4xl` |
| Card title | `font-heading text-lg font-semibold` |
| Subtitle/desc | `text-muted-foreground` |
| Meta (date, author) | `text-xs text-muted-foreground` |
| Primary accent text | `text-primary` (e.g., department labels, dates) |
