create table "public"."contact_submissions" (
  "id" uuid not null default gen_random_uuid(),
  "name" text not null,
  "email" text not null,
  "phone" text not null,
  "subject" text not null,
  "message" text not null,
  "status" text not null default 'new',
  "created_at" timestamp with time zone not null default now(),
  "updated_at" timestamp with time zone not null default now()
);

create table "public"."admission_applications" (
  "id" uuid not null default gen_random_uuid(),
  "student_name" text not null,
  "dob" date not null,
  "grade" text not null,
  "parent_name" text not null,
  "parent_phone" text not null,
  "email" text not null,
  "address" text not null,
  "status" text not null default 'new',
  "created_at" timestamp with time zone not null default now(),
  "updated_at" timestamp with time zone not null default now()
);

alter table "public"."contact_submissions" add constraint "contact_submissions_pkey" primary key ("id");
alter table "public"."admission_applications" add constraint "admission_applications_pkey" primary key ("id");

create index "contact_submissions_created_at_idx" on "public"."contact_submissions" using btree ("created_at" desc);
create index "contact_submissions_status_idx" on "public"."contact_submissions" using btree ("status");
create index "admission_applications_created_at_idx" on "public"."admission_applications" using btree ("created_at" desc);
create index "admission_applications_status_idx" on "public"."admission_applications" using btree ("status");
