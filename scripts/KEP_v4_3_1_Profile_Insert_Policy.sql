-- KEP v4.3.1 — Profile Insert Safety Policy
-- Optional patch. Run after v4.0 schema if a newly signed-up user cannot save their profile.
-- The auth trigger normally creates profile rows automatically, but this gives a safe fallback.

alter table public.profiles enable row level security;

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
for insert
with check (auth.uid() = id);
