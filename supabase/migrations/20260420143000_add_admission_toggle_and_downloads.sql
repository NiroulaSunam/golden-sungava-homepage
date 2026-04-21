alter table public.site_config
  add column if not exists admission_mode text default 'external',
  add column if not exists admission_external_url text;

update public.site_config
set
  admission_mode = 'external',
  admission_external_url = coalesce(
    admission_external_url,
    'https://ingrails.com/school/admission/form/golden-sungava-school'
  )
where deleted_at is null;

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null,
  description jsonb,
  file_url text not null,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft'::public.content_status,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists idx_downloads_sort_order on public.downloads using btree (sort_order asc);
create index if not exists idx_downloads_deleted_at on public.downloads using btree (deleted_at);

grant delete on table public.downloads to anon;
grant insert on table public.downloads to anon;
grant references on table public.downloads to anon;
grant select on table public.downloads to anon;
grant trigger on table public.downloads to anon;
grant truncate on table public.downloads to anon;
grant update on table public.downloads to anon;

grant delete on table public.downloads to authenticated;
grant insert on table public.downloads to authenticated;
grant references on table public.downloads to authenticated;
grant select on table public.downloads to authenticated;
grant trigger on table public.downloads to authenticated;
grant truncate on table public.downloads to authenticated;
grant update on table public.downloads to authenticated;

grant delete on table public.downloads to service_role;
grant insert on table public.downloads to service_role;
grant references on table public.downloads to service_role;
grant select on table public.downloads to service_role;
grant trigger on table public.downloads to service_role;
grant truncate on table public.downloads to service_role;
grant update on table public.downloads to service_role;

create or replace function public.get_draft_count()
 returns integer
 language plpgsql
as $function$
DECLARE
  total_count INTEGER;
BEGIN
  SELECT COALESCE(SUM(count), 0) INTO total_count
  FROM (
    SELECT COUNT(*) as count FROM hero_slides WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM navigation_items WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM news WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM events WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM blogs WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM notices WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM downloads WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM facilities WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM activities WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM testimonials WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM gallery_events WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM faqs WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM admission_steps WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM payment_methods WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM site_config WHERE status = 'draft' AND deleted_at IS NULL
    UNION ALL
    SELECT COUNT(*) FROM principal_message WHERE status = 'draft' AND deleted_at IS NULL
  ) counts;

  RETURN total_count;
END;
$function$;

create or replace function public.publish_all_drafts(p_user_id uuid)
 returns integer
 language plpgsql
as $function$
DECLARE
  total_count INTEGER := 0;
  row_count INTEGER;
BEGIN
  UPDATE hero_slides SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE navigation_items SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE news SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE events SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE blogs SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE notices SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE downloads SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE facilities SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE activities SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE testimonials SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE gallery_events SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE faqs SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE admission_steps SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE payment_methods SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE site_config SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  UPDATE principal_message SET status = 'published', updated_at = now() WHERE status = 'draft' AND deleted_at IS NULL;
  GET DIAGNOSTICS row_count = ROW_COUNT; total_count := total_count + row_count;

  INSERT INTO publish_log (user_id, published_at, items_count)
  VALUES (p_user_id, now(), total_count);

  RETURN total_count;
END;
$function$;
