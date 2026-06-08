-- KEP v4.4 — Optional Study Plans Table
-- Run this after the v4.0 schema if you want saved study plans in Supabase.

create table if not exists public.study_plans (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id) on delete cascade,
  title text not null default 'Weekly Study Plan',
  goal text,
  weak_subjects jsonb default '[]'::jsonb,
  plan jsonb not null default '[]'::jsonb,
  recommended_resources jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table public.study_plans enable row level security;

drop policy if exists "study_plans_student_own" on public.study_plans;
create policy "study_plans_student_own" on public.study_plans
for all
using (student_id = auth.uid() or public.is_admin())
with check (student_id = auth.uid() or public.is_admin());
