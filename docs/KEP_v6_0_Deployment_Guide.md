# KEP v6.0 — Deployment Guide

## Recommended launch approach

Start with a controlled test, not a public mass launch.

1. Deploy KEP to GitHub Pages or Netlify.
2. Open the live URL.
3. Go to `database-setup.html` on the live domain.
4. Save Supabase Project URL and public publishable/anon key again.
5. Login with a test student account.
6. Test Practice, Mock Exam, Progress, Study Plan, and Library.
7. Login with an admin/reviewer account.
8. Test Admin Home, Review DB, Content Quality, AI Review Assistant, and Saved AI Suggestions.
9. Invite 2–3 trusted testers.
10. Fix feedback before wider release.

## GitHub Pages

- Upload the extracted v6.0 folder to a repository.
- Go to Settings → Pages.
- Deploy from the main branch.
- Open the live URL.
- Save Supabase connection again on the live domain.

## Netlify

- Drag and drop the extracted folder into Netlify Deploys, or connect a GitHub repo.
- Publish folder should be the project root.
- Open the live URL.
- Save Supabase connection again on the live domain.

## Supabase production checks

- Add live domain to Supabase Auth redirect URLs.
- Confirm RLS policies are enabled.
- Never expose service-role key in frontend.
- Never expose AI secret key in frontend.
- Use Edge Function for real AI calls.

## First test accounts

Create:
- one student account
- one reviewer/admin account

Then test both journeys.
