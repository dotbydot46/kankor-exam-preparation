-- KEP v5.4 — AI Review Suggestions Table
-- Purpose: prepare a safe place to store AI suggestions for reviewer approval.
-- AI suggestions should never auto-publish content.

create table if not exists public.ai_review_suggestions (
  id uuid primary key default uuid_generate_v4(),
  content_type text not null check (content_type in ('question','resource','translation','study_plan','other')),
  content_id uuid,
  suggestion_type text not null,
  suggestion jsonb not null,
  status text not null default 'suggested' check (status in ('suggested','accepted','edited','rejected')),
  reviewer_note text,
  created_by uuid references public.profiles(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

alter table public.ai_review_suggestions enable row level security;

drop policy if exists "Admins and reviewers can read AI suggestions" on public.ai_review_suggestions;
create policy "Admins and reviewers can read AI suggestions"
on public.ai_review_suggestions
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
    and p.role in ('admin','reviewer')
  )
);

drop policy if exists "Admins and reviewers can create AI suggestions" on public.ai_review_suggestions;
create policy "Admins and reviewers can create AI suggestions"
on public.ai_review_suggestions
for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
    and p.role in ('admin','reviewer')
  )
);

drop policy if exists "Admins and reviewers can update AI suggestions" on public.ai_review_suggestions;
create policy "Admins and reviewers can update AI suggestions"
on public.ai_review_suggestions
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
    and p.role in ('admin','reviewer')
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
    and p.role in ('admin','reviewer')
  )
);

grant select, insert, update on public.ai_review_suggestions to authenticated;
