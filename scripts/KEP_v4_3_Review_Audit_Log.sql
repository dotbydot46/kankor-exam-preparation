-- KEP v4.3 — Optional Admin Review Audit Log
-- Run after the v4.0 schema if you want to keep a simple history of admin/reviewer actions.

create table if not exists public.content_review_events (
  id uuid primary key default uuid_generate_v4(),
  table_name text not null,
  item_id uuid not null,
  old_status text,
  new_status text,
  reviewer_id uuid references public.profiles(id) on delete set null,
  reviewer_note text,
  created_at timestamptz default now()
);

alter table public.content_review_events enable row level security;

drop policy if exists "review_events_admin_read" on public.content_review_events;
create policy "review_events_admin_read" on public.content_review_events
for select using (public.is_admin());

drop policy if exists "review_events_admin_insert" on public.content_review_events;
create policy "review_events_admin_insert" on public.content_review_events
for insert with check (public.is_admin());
