# Golden Sungava Homepage

Next.js school website with Supabase-backed CMS, admin panel, and public pages.

## Requirements

- Node.js 20+
- pnpm
- Supabase CLI

## Clone And Install

```bash
git clone <your-repo-url>
cd golden-sungava-homepage
pnpm install
```

## Environment Variables

Create `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Run The App

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Local Supabase

Start local Supabase:

```bash
pnpm sb:start
```

Check status:

```bash
pnpm sb:status
```

Stop local Supabase:

```bash
pnpm sb:stop
```

## Database Migrations

Apply local migrations:

```bash
pnpm db:migrate
```

Reset local database:

```bash
pnpm db:reset
```

Push migrations to linked cloud project:

```bash
pnpm sb:login
export SUPABASE_PROJECT_ID=your_project_ref
pnpm sb:link
pnpm db:push
```

Generate database types:

```bash
pnpm db:gen:types
```

## Tests

```bash
pnpm test
pnpm lint
```

## Production Build

```bash
pnpm build
pnpm start
```

## Deployment Notes

Before deploying, make sure:

- the latest Supabase migrations are pushed
- `src/types/database.gen.ts` exists
- production env vars are set in Vercel

## Admission Routing

Admission routing is controlled from the admin panel:

- `Admin > Site Config`
- `Admission Form Destination`
- `External Admission URL`

Modes:

- `Use website admission form`: admission buttons go to `/admission`
- `Send users to external admission form`: admission buttons go to the external URL and `/admission` redirects there

Current external URL:

```text
https://ingrails.com/school/admission/form/golden-sungava-school
```
