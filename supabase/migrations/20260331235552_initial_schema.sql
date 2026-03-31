create type "public"."content_status" as enum ('draft', 'published');

create type "public"."user_role" as enum ('admin', 'editor', 'viewer');


  create table "public"."activities" (
    "id" uuid not null default gen_random_uuid(),
    "name" jsonb not null,
    "description" jsonb,
    "image_url" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."admission_steps" (
    "id" uuid not null default gen_random_uuid(),
    "icon" text,
    "title" jsonb not null,
    "description" jsonb,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."audit_log" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "action" text not null,
    "resource" text not null,
    "resource_id" uuid,
    "details" jsonb,
    "created_at" timestamp with time zone not null default now()
      );



  create table "public"."blogs" (
    "id" uuid not null default gen_random_uuid(),
    "title" jsonb not null,
    "date" date not null,
    "author" text,
    "author_role" text,
    "excerpt" jsonb,
    "image_url" text,
    "content" jsonb,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "title" jsonb not null,
    "date" date not null,
    "time" text,
    "venue" jsonb,
    "description" jsonb,
    "image_url" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."facilities" (
    "id" uuid not null default gen_random_uuid(),
    "name" jsonb not null,
    "description" jsonb,
    "image_url" text,
    "icon" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."faqs" (
    "id" uuid not null default gen_random_uuid(),
    "question" jsonb not null,
    "answer" jsonb not null,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."gallery_events" (
    "id" uuid not null default gen_random_uuid(),
    "name" jsonb not null,
    "date" date not null,
    "cover_url" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."gallery_photos" (
    "id" uuid not null default gen_random_uuid(),
    "gallery_event_id" uuid not null,
    "url" text not null,
    "caption" jsonb,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );



  create table "public"."gallery_videos" (
    "id" uuid not null default gen_random_uuid(),
    "gallery_event_id" uuid not null,
    "url" text not null,
    "title" jsonb,
    "thumbnail_url" text,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );



  create table "public"."hero_slides" (
    "id" uuid not null default gen_random_uuid(),
    "heading" jsonb not null,
    "subheading" jsonb,
    "image_url" text,
    "cta_text" jsonb,
    "cta_link" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."navigation_items" (
    "id" uuid not null default gen_random_uuid(),
    "label" jsonb not null,
    "href" text not null,
    "parent_id" uuid,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."news" (
    "id" uuid not null default gen_random_uuid(),
    "title" jsonb not null,
    "date" date not null,
    "excerpt" jsonb,
    "image_url" text,
    "category" text,
    "content" jsonb,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."notices" (
    "id" uuid not null default gen_random_uuid(),
    "title" jsonb not null,
    "date" date not null,
    "excerpt" jsonb,
    "pdf_url" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."payment_methods" (
    "id" uuid not null default gen_random_uuid(),
    "name" jsonb not null,
    "icon" text,
    "color" text,
    "steps" jsonb,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."principal_message" (
    "id" uuid not null default gen_random_uuid(),
    "name" jsonb not null,
    "title" jsonb,
    "photo_url" text,
    "signature_url" text,
    "message" jsonb,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "role" public.user_role not null default 'viewer'::public.user_role,
    "display_name" text,
    "avatar_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );



  create table "public"."publish_log" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "published_at" timestamp with time zone not null default now(),
    "items_count" integer not null default 0,
    "details" jsonb
      );



  create table "public"."site_config" (
    "id" uuid not null default gen_random_uuid(),
    "school_name" jsonb not null,
    "tagline" jsonb,
    "logo_url" text,
    "established_year" integer,
    "address" jsonb,
    "phones" text[] default '{}'::text[],
    "emails" text[] default '{}'::text[],
    "office_hours" jsonb,
    "social_links" jsonb,
    "google_maps_embed" text,
    "theme" jsonb,
    "currency" text default 'NPR'::text,
    "languages" text[] default '{en,np}'::text[],
    "default_language" text default 'en'::text,
    "stats" jsonb,
    "hero_accent_text" jsonb,
    "section_subtitles" jsonb,
    "page_descriptions" jsonb,
    "footer" jsonb,
    "seo" jsonb,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."staff" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "designation" text not null,
    "department" text not null,
    "email" text,
    "photo_url" text,
    "sort_order" integer not null default 0,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );



  create table "public"."testimonials" (
    "id" uuid not null default gen_random_uuid(),
    "quote" jsonb not null,
    "author_name" jsonb not null,
    "role" text,
    "photo_url" text,
    "sort_order" integer not null default 0,
    "status" public.content_status not null default 'draft'::public.content_status,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );


CREATE UNIQUE INDEX activities_pkey ON public.activities USING btree (id);

CREATE UNIQUE INDEX admission_steps_pkey ON public.admission_steps USING btree (id);

CREATE UNIQUE INDEX audit_log_pkey ON public.audit_log USING btree (id);

CREATE UNIQUE INDEX blogs_pkey ON public.blogs USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX facilities_pkey ON public.facilities USING btree (id);

CREATE UNIQUE INDEX faqs_pkey ON public.faqs USING btree (id);

CREATE UNIQUE INDEX gallery_events_pkey ON public.gallery_events USING btree (id);

CREATE UNIQUE INDEX gallery_photos_pkey ON public.gallery_photos USING btree (id);

CREATE UNIQUE INDEX gallery_videos_pkey ON public.gallery_videos USING btree (id);

CREATE UNIQUE INDEX hero_slides_pkey ON public.hero_slides USING btree (id);

CREATE INDEX idx_audit_log_created_at ON public.audit_log USING btree (created_at DESC);

CREATE INDEX idx_audit_log_resource ON public.audit_log USING btree (resource, resource_id);

CREATE INDEX idx_audit_log_user_id ON public.audit_log USING btree (user_id);

CREATE INDEX idx_gallery_photos_event_id ON public.gallery_photos USING btree (gallery_event_id);

CREATE INDEX idx_gallery_videos_event_id ON public.gallery_videos USING btree (gallery_event_id);

CREATE INDEX idx_publish_log_published_at ON public.publish_log USING btree (published_at DESC);

CREATE UNIQUE INDEX navigation_items_pkey ON public.navigation_items USING btree (id);

CREATE UNIQUE INDEX news_pkey ON public.news USING btree (id);

CREATE UNIQUE INDEX notices_pkey ON public.notices USING btree (id);

CREATE UNIQUE INDEX payment_methods_pkey ON public.payment_methods USING btree (id);

CREATE UNIQUE INDEX principal_message_pkey ON public.principal_message USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

CREATE UNIQUE INDEX publish_log_pkey ON public.publish_log USING btree (id);

CREATE UNIQUE INDEX site_config_pkey ON public.site_config USING btree (id);

CREATE UNIQUE INDEX staff_pkey ON public.staff USING btree (id);

CREATE UNIQUE INDEX testimonials_pkey ON public.testimonials USING btree (id);

alter table "public"."activities" add constraint "activities_pkey" PRIMARY KEY using index "activities_pkey";

alter table "public"."admission_steps" add constraint "admission_steps_pkey" PRIMARY KEY using index "admission_steps_pkey";

alter table "public"."audit_log" add constraint "audit_log_pkey" PRIMARY KEY using index "audit_log_pkey";

alter table "public"."blogs" add constraint "blogs_pkey" PRIMARY KEY using index "blogs_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."facilities" add constraint "facilities_pkey" PRIMARY KEY using index "facilities_pkey";

alter table "public"."faqs" add constraint "faqs_pkey" PRIMARY KEY using index "faqs_pkey";

alter table "public"."gallery_events" add constraint "gallery_events_pkey" PRIMARY KEY using index "gallery_events_pkey";

alter table "public"."gallery_photos" add constraint "gallery_photos_pkey" PRIMARY KEY using index "gallery_photos_pkey";

alter table "public"."gallery_videos" add constraint "gallery_videos_pkey" PRIMARY KEY using index "gallery_videos_pkey";

alter table "public"."hero_slides" add constraint "hero_slides_pkey" PRIMARY KEY using index "hero_slides_pkey";

alter table "public"."navigation_items" add constraint "navigation_items_pkey" PRIMARY KEY using index "navigation_items_pkey";

alter table "public"."news" add constraint "news_pkey" PRIMARY KEY using index "news_pkey";

alter table "public"."notices" add constraint "notices_pkey" PRIMARY KEY using index "notices_pkey";

alter table "public"."payment_methods" add constraint "payment_methods_pkey" PRIMARY KEY using index "payment_methods_pkey";

alter table "public"."principal_message" add constraint "principal_message_pkey" PRIMARY KEY using index "principal_message_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."publish_log" add constraint "publish_log_pkey" PRIMARY KEY using index "publish_log_pkey";

alter table "public"."site_config" add constraint "site_config_pkey" PRIMARY KEY using index "site_config_pkey";

alter table "public"."staff" add constraint "staff_pkey" PRIMARY KEY using index "staff_pkey";

alter table "public"."testimonials" add constraint "testimonials_pkey" PRIMARY KEY using index "testimonials_pkey";

alter table "public"."audit_log" add constraint "audit_log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."audit_log" validate constraint "audit_log_user_id_fkey";

alter table "public"."gallery_photos" add constraint "gallery_photos_gallery_event_id_fkey" FOREIGN KEY (gallery_event_id) REFERENCES public.gallery_events(id) ON DELETE CASCADE not valid;

alter table "public"."gallery_photos" validate constraint "gallery_photos_gallery_event_id_fkey";

alter table "public"."gallery_videos" add constraint "gallery_videos_gallery_event_id_fkey" FOREIGN KEY (gallery_event_id) REFERENCES public.gallery_events(id) ON DELETE CASCADE not valid;

alter table "public"."gallery_videos" validate constraint "gallery_videos_gallery_event_id_fkey";

alter table "public"."navigation_items" add constraint "navigation_items_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.navigation_items(id) ON DELETE CASCADE not valid;

alter table "public"."navigation_items" validate constraint "navigation_items_parent_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

alter table "public"."publish_log" add constraint "publish_log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."publish_log" validate constraint "publish_log_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_draft_count()
 RETURNS integer
 LANGUAGE sql
 STABLE
AS $function$
  SELECT COALESCE(SUM(cnt), 0)::INTEGER FROM (
    SELECT COUNT(*) AS cnt FROM hero_slides WHERE status = 'draft' AND deleted_at IS NULL
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
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO profiles (user_id, role, display_name)
  VALUES (
    NEW.id,
    'viewer',
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.publish_all_drafts(p_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  total_count INTEGER := 0;
  row_count INTEGER;
BEGIN
  -- Content tables with status column
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

  -- Log the publish action
  INSERT INTO publish_log (user_id, published_at, items_count)
  VALUES (p_user_id, now(), total_count);

  RETURN total_count;
END;
$function$
;

grant delete on table "public"."activities" to "anon";

grant insert on table "public"."activities" to "anon";

grant references on table "public"."activities" to "anon";

grant select on table "public"."activities" to "anon";

grant trigger on table "public"."activities" to "anon";

grant truncate on table "public"."activities" to "anon";

grant update on table "public"."activities" to "anon";

grant delete on table "public"."activities" to "authenticated";

grant insert on table "public"."activities" to "authenticated";

grant references on table "public"."activities" to "authenticated";

grant select on table "public"."activities" to "authenticated";

grant trigger on table "public"."activities" to "authenticated";

grant truncate on table "public"."activities" to "authenticated";

grant update on table "public"."activities" to "authenticated";

grant delete on table "public"."activities" to "service_role";

grant insert on table "public"."activities" to "service_role";

grant references on table "public"."activities" to "service_role";

grant select on table "public"."activities" to "service_role";

grant trigger on table "public"."activities" to "service_role";

grant truncate on table "public"."activities" to "service_role";

grant update on table "public"."activities" to "service_role";

grant delete on table "public"."admission_steps" to "anon";

grant insert on table "public"."admission_steps" to "anon";

grant references on table "public"."admission_steps" to "anon";

grant select on table "public"."admission_steps" to "anon";

grant trigger on table "public"."admission_steps" to "anon";

grant truncate on table "public"."admission_steps" to "anon";

grant update on table "public"."admission_steps" to "anon";

grant delete on table "public"."admission_steps" to "authenticated";

grant insert on table "public"."admission_steps" to "authenticated";

grant references on table "public"."admission_steps" to "authenticated";

grant select on table "public"."admission_steps" to "authenticated";

grant trigger on table "public"."admission_steps" to "authenticated";

grant truncate on table "public"."admission_steps" to "authenticated";

grant update on table "public"."admission_steps" to "authenticated";

grant delete on table "public"."admission_steps" to "service_role";

grant insert on table "public"."admission_steps" to "service_role";

grant references on table "public"."admission_steps" to "service_role";

grant select on table "public"."admission_steps" to "service_role";

grant trigger on table "public"."admission_steps" to "service_role";

grant truncate on table "public"."admission_steps" to "service_role";

grant update on table "public"."admission_steps" to "service_role";

grant delete on table "public"."audit_log" to "anon";

grant insert on table "public"."audit_log" to "anon";

grant references on table "public"."audit_log" to "anon";

grant select on table "public"."audit_log" to "anon";

grant trigger on table "public"."audit_log" to "anon";

grant truncate on table "public"."audit_log" to "anon";

grant update on table "public"."audit_log" to "anon";

grant delete on table "public"."audit_log" to "authenticated";

grant insert on table "public"."audit_log" to "authenticated";

grant references on table "public"."audit_log" to "authenticated";

grant select on table "public"."audit_log" to "authenticated";

grant trigger on table "public"."audit_log" to "authenticated";

grant truncate on table "public"."audit_log" to "authenticated";

grant update on table "public"."audit_log" to "authenticated";

grant delete on table "public"."audit_log" to "service_role";

grant insert on table "public"."audit_log" to "service_role";

grant references on table "public"."audit_log" to "service_role";

grant select on table "public"."audit_log" to "service_role";

grant trigger on table "public"."audit_log" to "service_role";

grant truncate on table "public"."audit_log" to "service_role";

grant update on table "public"."audit_log" to "service_role";

grant delete on table "public"."blogs" to "anon";

grant insert on table "public"."blogs" to "anon";

grant references on table "public"."blogs" to "anon";

grant select on table "public"."blogs" to "anon";

grant trigger on table "public"."blogs" to "anon";

grant truncate on table "public"."blogs" to "anon";

grant update on table "public"."blogs" to "anon";

grant delete on table "public"."blogs" to "authenticated";

grant insert on table "public"."blogs" to "authenticated";

grant references on table "public"."blogs" to "authenticated";

grant select on table "public"."blogs" to "authenticated";

grant trigger on table "public"."blogs" to "authenticated";

grant truncate on table "public"."blogs" to "authenticated";

grant update on table "public"."blogs" to "authenticated";

grant delete on table "public"."blogs" to "service_role";

grant insert on table "public"."blogs" to "service_role";

grant references on table "public"."blogs" to "service_role";

grant select on table "public"."blogs" to "service_role";

grant trigger on table "public"."blogs" to "service_role";

grant truncate on table "public"."blogs" to "service_role";

grant update on table "public"."blogs" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."facilities" to "anon";

grant insert on table "public"."facilities" to "anon";

grant references on table "public"."facilities" to "anon";

grant select on table "public"."facilities" to "anon";

grant trigger on table "public"."facilities" to "anon";

grant truncate on table "public"."facilities" to "anon";

grant update on table "public"."facilities" to "anon";

grant delete on table "public"."facilities" to "authenticated";

grant insert on table "public"."facilities" to "authenticated";

grant references on table "public"."facilities" to "authenticated";

grant select on table "public"."facilities" to "authenticated";

grant trigger on table "public"."facilities" to "authenticated";

grant truncate on table "public"."facilities" to "authenticated";

grant update on table "public"."facilities" to "authenticated";

grant delete on table "public"."facilities" to "service_role";

grant insert on table "public"."facilities" to "service_role";

grant references on table "public"."facilities" to "service_role";

grant select on table "public"."facilities" to "service_role";

grant trigger on table "public"."facilities" to "service_role";

grant truncate on table "public"."facilities" to "service_role";

grant update on table "public"."facilities" to "service_role";

grant delete on table "public"."faqs" to "anon";

grant insert on table "public"."faqs" to "anon";

grant references on table "public"."faqs" to "anon";

grant select on table "public"."faqs" to "anon";

grant trigger on table "public"."faqs" to "anon";

grant truncate on table "public"."faqs" to "anon";

grant update on table "public"."faqs" to "anon";

grant delete on table "public"."faqs" to "authenticated";

grant insert on table "public"."faqs" to "authenticated";

grant references on table "public"."faqs" to "authenticated";

grant select on table "public"."faqs" to "authenticated";

grant trigger on table "public"."faqs" to "authenticated";

grant truncate on table "public"."faqs" to "authenticated";

grant update on table "public"."faqs" to "authenticated";

grant delete on table "public"."faqs" to "service_role";

grant insert on table "public"."faqs" to "service_role";

grant references on table "public"."faqs" to "service_role";

grant select on table "public"."faqs" to "service_role";

grant trigger on table "public"."faqs" to "service_role";

grant truncate on table "public"."faqs" to "service_role";

grant update on table "public"."faqs" to "service_role";

grant delete on table "public"."gallery_events" to "anon";

grant insert on table "public"."gallery_events" to "anon";

grant references on table "public"."gallery_events" to "anon";

grant select on table "public"."gallery_events" to "anon";

grant trigger on table "public"."gallery_events" to "anon";

grant truncate on table "public"."gallery_events" to "anon";

grant update on table "public"."gallery_events" to "anon";

grant delete on table "public"."gallery_events" to "authenticated";

grant insert on table "public"."gallery_events" to "authenticated";

grant references on table "public"."gallery_events" to "authenticated";

grant select on table "public"."gallery_events" to "authenticated";

grant trigger on table "public"."gallery_events" to "authenticated";

grant truncate on table "public"."gallery_events" to "authenticated";

grant update on table "public"."gallery_events" to "authenticated";

grant delete on table "public"."gallery_events" to "service_role";

grant insert on table "public"."gallery_events" to "service_role";

grant references on table "public"."gallery_events" to "service_role";

grant select on table "public"."gallery_events" to "service_role";

grant trigger on table "public"."gallery_events" to "service_role";

grant truncate on table "public"."gallery_events" to "service_role";

grant update on table "public"."gallery_events" to "service_role";

grant delete on table "public"."gallery_photos" to "anon";

grant insert on table "public"."gallery_photos" to "anon";

grant references on table "public"."gallery_photos" to "anon";

grant select on table "public"."gallery_photos" to "anon";

grant trigger on table "public"."gallery_photos" to "anon";

grant truncate on table "public"."gallery_photos" to "anon";

grant update on table "public"."gallery_photos" to "anon";

grant delete on table "public"."gallery_photos" to "authenticated";

grant insert on table "public"."gallery_photos" to "authenticated";

grant references on table "public"."gallery_photos" to "authenticated";

grant select on table "public"."gallery_photos" to "authenticated";

grant trigger on table "public"."gallery_photos" to "authenticated";

grant truncate on table "public"."gallery_photos" to "authenticated";

grant update on table "public"."gallery_photos" to "authenticated";

grant delete on table "public"."gallery_photos" to "service_role";

grant insert on table "public"."gallery_photos" to "service_role";

grant references on table "public"."gallery_photos" to "service_role";

grant select on table "public"."gallery_photos" to "service_role";

grant trigger on table "public"."gallery_photos" to "service_role";

grant truncate on table "public"."gallery_photos" to "service_role";

grant update on table "public"."gallery_photos" to "service_role";

grant delete on table "public"."gallery_videos" to "anon";

grant insert on table "public"."gallery_videos" to "anon";

grant references on table "public"."gallery_videos" to "anon";

grant select on table "public"."gallery_videos" to "anon";

grant trigger on table "public"."gallery_videos" to "anon";

grant truncate on table "public"."gallery_videos" to "anon";

grant update on table "public"."gallery_videos" to "anon";

grant delete on table "public"."gallery_videos" to "authenticated";

grant insert on table "public"."gallery_videos" to "authenticated";

grant references on table "public"."gallery_videos" to "authenticated";

grant select on table "public"."gallery_videos" to "authenticated";

grant trigger on table "public"."gallery_videos" to "authenticated";

grant truncate on table "public"."gallery_videos" to "authenticated";

grant update on table "public"."gallery_videos" to "authenticated";

grant delete on table "public"."gallery_videos" to "service_role";

grant insert on table "public"."gallery_videos" to "service_role";

grant references on table "public"."gallery_videos" to "service_role";

grant select on table "public"."gallery_videos" to "service_role";

grant trigger on table "public"."gallery_videos" to "service_role";

grant truncate on table "public"."gallery_videos" to "service_role";

grant update on table "public"."gallery_videos" to "service_role";

grant delete on table "public"."hero_slides" to "anon";

grant insert on table "public"."hero_slides" to "anon";

grant references on table "public"."hero_slides" to "anon";

grant select on table "public"."hero_slides" to "anon";

grant trigger on table "public"."hero_slides" to "anon";

grant truncate on table "public"."hero_slides" to "anon";

grant update on table "public"."hero_slides" to "anon";

grant delete on table "public"."hero_slides" to "authenticated";

grant insert on table "public"."hero_slides" to "authenticated";

grant references on table "public"."hero_slides" to "authenticated";

grant select on table "public"."hero_slides" to "authenticated";

grant trigger on table "public"."hero_slides" to "authenticated";

grant truncate on table "public"."hero_slides" to "authenticated";

grant update on table "public"."hero_slides" to "authenticated";

grant delete on table "public"."hero_slides" to "service_role";

grant insert on table "public"."hero_slides" to "service_role";

grant references on table "public"."hero_slides" to "service_role";

grant select on table "public"."hero_slides" to "service_role";

grant trigger on table "public"."hero_slides" to "service_role";

grant truncate on table "public"."hero_slides" to "service_role";

grant update on table "public"."hero_slides" to "service_role";

grant delete on table "public"."navigation_items" to "anon";

grant insert on table "public"."navigation_items" to "anon";

grant references on table "public"."navigation_items" to "anon";

grant select on table "public"."navigation_items" to "anon";

grant trigger on table "public"."navigation_items" to "anon";

grant truncate on table "public"."navigation_items" to "anon";

grant update on table "public"."navigation_items" to "anon";

grant delete on table "public"."navigation_items" to "authenticated";

grant insert on table "public"."navigation_items" to "authenticated";

grant references on table "public"."navigation_items" to "authenticated";

grant select on table "public"."navigation_items" to "authenticated";

grant trigger on table "public"."navigation_items" to "authenticated";

grant truncate on table "public"."navigation_items" to "authenticated";

grant update on table "public"."navigation_items" to "authenticated";

grant delete on table "public"."navigation_items" to "service_role";

grant insert on table "public"."navigation_items" to "service_role";

grant references on table "public"."navigation_items" to "service_role";

grant select on table "public"."navigation_items" to "service_role";

grant trigger on table "public"."navigation_items" to "service_role";

grant truncate on table "public"."navigation_items" to "service_role";

grant update on table "public"."navigation_items" to "service_role";

grant delete on table "public"."news" to "anon";

grant insert on table "public"."news" to "anon";

grant references on table "public"."news" to "anon";

grant select on table "public"."news" to "anon";

grant trigger on table "public"."news" to "anon";

grant truncate on table "public"."news" to "anon";

grant update on table "public"."news" to "anon";

grant delete on table "public"."news" to "authenticated";

grant insert on table "public"."news" to "authenticated";

grant references on table "public"."news" to "authenticated";

grant select on table "public"."news" to "authenticated";

grant trigger on table "public"."news" to "authenticated";

grant truncate on table "public"."news" to "authenticated";

grant update on table "public"."news" to "authenticated";

grant delete on table "public"."news" to "service_role";

grant insert on table "public"."news" to "service_role";

grant references on table "public"."news" to "service_role";

grant select on table "public"."news" to "service_role";

grant trigger on table "public"."news" to "service_role";

grant truncate on table "public"."news" to "service_role";

grant update on table "public"."news" to "service_role";

grant delete on table "public"."notices" to "anon";

grant insert on table "public"."notices" to "anon";

grant references on table "public"."notices" to "anon";

grant select on table "public"."notices" to "anon";

grant trigger on table "public"."notices" to "anon";

grant truncate on table "public"."notices" to "anon";

grant update on table "public"."notices" to "anon";

grant delete on table "public"."notices" to "authenticated";

grant insert on table "public"."notices" to "authenticated";

grant references on table "public"."notices" to "authenticated";

grant select on table "public"."notices" to "authenticated";

grant trigger on table "public"."notices" to "authenticated";

grant truncate on table "public"."notices" to "authenticated";

grant update on table "public"."notices" to "authenticated";

grant delete on table "public"."notices" to "service_role";

grant insert on table "public"."notices" to "service_role";

grant references on table "public"."notices" to "service_role";

grant select on table "public"."notices" to "service_role";

grant trigger on table "public"."notices" to "service_role";

grant truncate on table "public"."notices" to "service_role";

grant update on table "public"."notices" to "service_role";

grant delete on table "public"."payment_methods" to "anon";

grant insert on table "public"."payment_methods" to "anon";

grant references on table "public"."payment_methods" to "anon";

grant select on table "public"."payment_methods" to "anon";

grant trigger on table "public"."payment_methods" to "anon";

grant truncate on table "public"."payment_methods" to "anon";

grant update on table "public"."payment_methods" to "anon";

grant delete on table "public"."payment_methods" to "authenticated";

grant insert on table "public"."payment_methods" to "authenticated";

grant references on table "public"."payment_methods" to "authenticated";

grant select on table "public"."payment_methods" to "authenticated";

grant trigger on table "public"."payment_methods" to "authenticated";

grant truncate on table "public"."payment_methods" to "authenticated";

grant update on table "public"."payment_methods" to "authenticated";

grant delete on table "public"."payment_methods" to "service_role";

grant insert on table "public"."payment_methods" to "service_role";

grant references on table "public"."payment_methods" to "service_role";

grant select on table "public"."payment_methods" to "service_role";

grant trigger on table "public"."payment_methods" to "service_role";

grant truncate on table "public"."payment_methods" to "service_role";

grant update on table "public"."payment_methods" to "service_role";

grant delete on table "public"."principal_message" to "anon";

grant insert on table "public"."principal_message" to "anon";

grant references on table "public"."principal_message" to "anon";

grant select on table "public"."principal_message" to "anon";

grant trigger on table "public"."principal_message" to "anon";

grant truncate on table "public"."principal_message" to "anon";

grant update on table "public"."principal_message" to "anon";

grant delete on table "public"."principal_message" to "authenticated";

grant insert on table "public"."principal_message" to "authenticated";

grant references on table "public"."principal_message" to "authenticated";

grant select on table "public"."principal_message" to "authenticated";

grant trigger on table "public"."principal_message" to "authenticated";

grant truncate on table "public"."principal_message" to "authenticated";

grant update on table "public"."principal_message" to "authenticated";

grant delete on table "public"."principal_message" to "service_role";

grant insert on table "public"."principal_message" to "service_role";

grant references on table "public"."principal_message" to "service_role";

grant select on table "public"."principal_message" to "service_role";

grant trigger on table "public"."principal_message" to "service_role";

grant truncate on table "public"."principal_message" to "service_role";

grant update on table "public"."principal_message" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."publish_log" to "anon";

grant insert on table "public"."publish_log" to "anon";

grant references on table "public"."publish_log" to "anon";

grant select on table "public"."publish_log" to "anon";

grant trigger on table "public"."publish_log" to "anon";

grant truncate on table "public"."publish_log" to "anon";

grant update on table "public"."publish_log" to "anon";

grant delete on table "public"."publish_log" to "authenticated";

grant insert on table "public"."publish_log" to "authenticated";

grant references on table "public"."publish_log" to "authenticated";

grant select on table "public"."publish_log" to "authenticated";

grant trigger on table "public"."publish_log" to "authenticated";

grant truncate on table "public"."publish_log" to "authenticated";

grant update on table "public"."publish_log" to "authenticated";

grant delete on table "public"."publish_log" to "service_role";

grant insert on table "public"."publish_log" to "service_role";

grant references on table "public"."publish_log" to "service_role";

grant select on table "public"."publish_log" to "service_role";

grant trigger on table "public"."publish_log" to "service_role";

grant truncate on table "public"."publish_log" to "service_role";

grant update on table "public"."publish_log" to "service_role";

grant delete on table "public"."site_config" to "anon";

grant insert on table "public"."site_config" to "anon";

grant references on table "public"."site_config" to "anon";

grant select on table "public"."site_config" to "anon";

grant trigger on table "public"."site_config" to "anon";

grant truncate on table "public"."site_config" to "anon";

grant update on table "public"."site_config" to "anon";

grant delete on table "public"."site_config" to "authenticated";

grant insert on table "public"."site_config" to "authenticated";

grant references on table "public"."site_config" to "authenticated";

grant select on table "public"."site_config" to "authenticated";

grant trigger on table "public"."site_config" to "authenticated";

grant truncate on table "public"."site_config" to "authenticated";

grant update on table "public"."site_config" to "authenticated";

grant delete on table "public"."site_config" to "service_role";

grant insert on table "public"."site_config" to "service_role";

grant references on table "public"."site_config" to "service_role";

grant select on table "public"."site_config" to "service_role";

grant trigger on table "public"."site_config" to "service_role";

grant truncate on table "public"."site_config" to "service_role";

grant update on table "public"."site_config" to "service_role";

grant delete on table "public"."staff" to "anon";

grant insert on table "public"."staff" to "anon";

grant references on table "public"."staff" to "anon";

grant select on table "public"."staff" to "anon";

grant trigger on table "public"."staff" to "anon";

grant truncate on table "public"."staff" to "anon";

grant update on table "public"."staff" to "anon";

grant delete on table "public"."staff" to "authenticated";

grant insert on table "public"."staff" to "authenticated";

grant references on table "public"."staff" to "authenticated";

grant select on table "public"."staff" to "authenticated";

grant trigger on table "public"."staff" to "authenticated";

grant truncate on table "public"."staff" to "authenticated";

grant update on table "public"."staff" to "authenticated";

grant delete on table "public"."staff" to "service_role";

grant insert on table "public"."staff" to "service_role";

grant references on table "public"."staff" to "service_role";

grant select on table "public"."staff" to "service_role";

grant trigger on table "public"."staff" to "service_role";

grant truncate on table "public"."staff" to "service_role";

grant update on table "public"."staff" to "service_role";

grant delete on table "public"."testimonials" to "anon";

grant insert on table "public"."testimonials" to "anon";

grant references on table "public"."testimonials" to "anon";

grant select on table "public"."testimonials" to "anon";

grant trigger on table "public"."testimonials" to "anon";

grant truncate on table "public"."testimonials" to "anon";

grant update on table "public"."testimonials" to "anon";

grant delete on table "public"."testimonials" to "authenticated";

grant insert on table "public"."testimonials" to "authenticated";

grant references on table "public"."testimonials" to "authenticated";

grant select on table "public"."testimonials" to "authenticated";

grant trigger on table "public"."testimonials" to "authenticated";

grant truncate on table "public"."testimonials" to "authenticated";

grant update on table "public"."testimonials" to "authenticated";

grant delete on table "public"."testimonials" to "service_role";

grant insert on table "public"."testimonials" to "service_role";

grant references on table "public"."testimonials" to "service_role";

grant select on table "public"."testimonials" to "service_role";

grant trigger on table "public"."testimonials" to "service_role";

grant truncate on table "public"."testimonials" to "service_role";

grant update on table "public"."testimonials" to "service_role";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


