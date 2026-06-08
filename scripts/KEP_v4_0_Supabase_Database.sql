-- KEP v4.0 — Supabase Database + Login Starter
-- Run this once in Supabase SQL Editor. Use only anon public key in the frontend.
create extension if not exists "uuid-ossp";

do $$ begin
  create type public.kep_role as enum ('student','volunteer','reviewer','admin');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.kep_status as enum ('draft','submitted','needs_review','approved','published','rejected');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  province text,
  preferred_language text default 'English',
  study_level text,
  dream_field text,
  daily_study_minutes integer default 30,
  private_learner boolean default false,
  role public.kep_role default 'student',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.subjects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  language text default 'English',
  description text,
  created_at timestamptz default now()
);

create table if not exists public.questions (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid references public.subjects(id) on delete set null,
  subject_name text,
  question_text text not null,
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  explanation text,
  difficulty text default 'Medium',
  language text default 'English',
  source_type text,
  source_details text,
  status public.kep_status default 'submitted',
  submitted_by uuid references public.profiles(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  resource_type text not null default 'Book / Notes',
  subject_id uuid references public.subjects(id) on delete set null,
  subject_name text,
  language text default 'English',
  grade text,
  year text,
  file_url text,
  source_type text,
  source_details text,
  status public.kep_status default 'submitted',
  submitted_by uuid references public.profiles(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.exam_templates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  time_minutes integer default 20,
  verification_status text default 'Practice template',
  distribution jsonb not null default '[]'::jsonb,
  source_note text,
  status public.kep_status default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.exam_attempts (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id) on delete cascade,
  attempt_type text default 'practice',
  template_id uuid references public.exam_templates(id) on delete set null,
  score integer not null default 0,
  total integer not null default 0,
  percentage integer not null default 0,
  subject_breakdown jsonb default '{}'::jsonb,
  wrong_answers jsonb default '[]'::jsonb,
  time_used_seconds integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.saved_resources (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  created_at timestamptz default now(),
  unique(student_id, resource_id)
);

create or replace function public.set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists set_questions_updated_at on public.questions;
create trigger set_questions_updated_at before update on public.questions for each row execute function public.set_updated_at();
drop trigger if exists set_resources_updated_at on public.resources;
create trigger set_resources_updated_at before update on public.resources for each row execute function public.set_updated_at();
drop trigger if exists set_exam_templates_updated_at on public.exam_templates;
create trigger set_exam_templates_updated_at before update on public.exam_templates for each row execute function public.set_updated_at();

create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)), 'student')
  on conflict (id) do nothing;
  return new;
end; $$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_admin() returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','reviewer'));
$$ language sql stable security definer;

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.questions enable row level security;
alter table public.resources enable row level security;
alter table public.exam_templates enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.saved_resources enable row level security;

drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin on public.profiles for select using (auth.uid() = id or public.is_admin());
drop policy if exists profiles_update_own_or_admin on public.profiles;
create policy profiles_update_own_or_admin on public.profiles for update using (auth.uid() = id or public.is_admin()) with check (auth.uid() = id or public.is_admin());

drop policy if exists subjects_public_read on public.subjects;
create policy subjects_public_read on public.subjects for select using (true);
drop policy if exists subjects_admin_manage on public.subjects;
create policy subjects_admin_manage on public.subjects for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists questions_public_published_read on public.questions;
create policy questions_public_published_read on public.questions for select using (status = 'published' or public.is_admin() or submitted_by = auth.uid());
drop policy if exists questions_authenticated_submit on public.questions;
create policy questions_authenticated_submit on public.questions for insert with check (auth.uid() is not null);
drop policy if exists questions_admin_update on public.questions;
create policy questions_admin_update on public.questions for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists resources_public_published_read on public.resources;
create policy resources_public_published_read on public.resources for select using (status = 'published' or public.is_admin() or submitted_by = auth.uid());
drop policy if exists resources_authenticated_submit on public.resources;
create policy resources_authenticated_submit on public.resources for insert with check (auth.uid() is not null);
drop policy if exists resources_admin_update on public.resources;
create policy resources_admin_update on public.resources for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists templates_public_published_read on public.exam_templates;
create policy templates_public_published_read on public.exam_templates for select using (status = 'published' or public.is_admin() or created_by = auth.uid());
drop policy if exists templates_admin_manage on public.exam_templates;
create policy templates_admin_manage on public.exam_templates for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists attempts_student_own on public.exam_attempts;
create policy attempts_student_own on public.exam_attempts for all using (student_id = auth.uid() or public.is_admin()) with check (student_id = auth.uid() or public.is_admin());
drop policy if exists saved_resources_student_own on public.saved_resources;
create policy saved_resources_student_own on public.saved_resources for all using (student_id = auth.uid() or public.is_admin()) with check (student_id = auth.uid() or public.is_admin());

insert into public.subjects (name, slug, language, description) values
('Mathematics','mathematics','English','Core Kankor mathematics practice'),
('Physics','physics','English','Physics concepts and MCQs'),
('Chemistry','chemistry','English','Chemistry practice and review'),
('Biology','biology','English','Biology practice and review'),
('English','english','English','English language practice')
on conflict (slug) do nothing;

insert into public.exam_templates (name, description, time_minutes, verification_status, distribution, status) values
('Quick Mock Exam','Short mixed practice. Not official Kankor format.',10,'Practice template','[{"subject":"All subjects","count":10}]','published'),
('Flexible Full Kankor-style Mock','Balanced mock based on available questions. Official distribution must be verified later.',60,'Needs verification','[{"subject":"Balanced from available subjects","count":30}]','published');
