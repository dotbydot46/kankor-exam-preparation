# KEP v6.0 — Security Checklist

## Frontend

- [ ] No service-role key in HTML or JS.
- [ ] No AI secret key in HTML or JS.
- [ ] Only public Supabase URL and publishable/anon key used in browser.
- [ ] Public pages do not show confusing admin/dev navigation.
- [ ] Privacy and Terms pages are visible.

## Supabase

- [ ] RLS enabled.
- [ ] Profiles roles are correct.
- [ ] Students cannot update admin-only content.
- [ ] Admin/reviewer functions require role checks.
- [ ] Auth redirect URLs include live domain.

## AI

- [ ] AI suggestions are labelled as suggestions.
- [ ] AI does not auto-publish content.
- [ ] Real AI keys are stored only in server-side/Edge Function secrets.
- [ ] Student private data is not sent to AI unnecessarily.

## Launch

- [ ] Test with 2–3 trusted users first.
- [ ] Review feedback.
- [ ] Fix serious issues before wider sharing.
