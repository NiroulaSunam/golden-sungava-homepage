# Golden Sungava Homepage

## Admission Form Routing

The admission flow can now be switched between the built-in website form and the external Ingrails form.

Where to change it:
- Admin panel: `Site Config`
- Field: `Admission Form Destination`
- Field: `External Admission URL`

How it behaves:
- `Use website admission form`:
  All admission buttons go to `/admission`
- `Send users to external admission form`:
  All admission buttons go to the external URL
  Visiting `/admission` also redirects to that external URL

Current external URL:
- `https://ingrails.com/school/admission/form/golden-sungava-school`

Important:
- If you change the destination in admin, save the Site Config change
- The code default is currently set to the external Ingrails URL

## Downloads CMS

Downloads is now a real CMS-backed content type instead of placeholder templates.

Where to manage it:
- Admin panel: `Downloads`

Each download item supports:
- `Title`
- `Description`
- `File URL`
- manual order

How it behaves:
- Downloads are shown on `/downloads`
- Each item opens the file URL directly
- Unlike notices, downloads do not use a date
- Downloads must be published before they appear on the live website

Publishing downloads:
- Create or edit the item in admin
- Then use the global `Publish` button in the admin top bar
- Downloads are included in the publish flow only after the latest migration is applied

## Required Supabase Migration

Apply this migration so the new admission toggle and downloads work correctly:

- `supabase/migrations/20260420143000_add_admission_toggle_and_downloads.sql`

This migration adds:
- `site_config.admission_mode`
- `site_config.admission_external_url`
- the `downloads` table
- updated publish functions so download drafts are counted and published

Recommended commands:

```bash
pnpm sb:login
export SUPABASE_PROJECT_ID=your_project_ref
pnpm sb:link
pnpm db:push
pnpm db:gen:types
```

## Build Note

If you see this error:

```text
File 'src/types/database.gen.ts' is not a module
```

make sure `src/types/database.gen.ts` exists and exports the database helper types. This repo now includes a safe fallback version of that file so builds do not fail when generated types have not been refreshed yet.
