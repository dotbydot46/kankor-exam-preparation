# KEP v5.1 — Real Supabase Setup Walkthrough

This version is about making KEP work with a real Supabase database.

Do not add more features before testing this setup.

## Main page

- `supabase-setup.html`

## Setup order

1. Create a Supabase project.
2. Run the main database SQL:
   - `scripts/KEP_v4_0_Supabase_Database.sql`
3. Run optional support SQL if needed:
   - `scripts/KEP_v4_3_1_Profile_Insert_Policy.sql`
   - `scripts/KEP_v4_3_Review_Audit_Log.sql`
   - `scripts/KEP_v4_4_Study_Plans_Table.sql`
4. Run sample content SQL:
   - `scripts/KEP_v5_1_Sample_Content.sql`
5. Open `database-setup.html`.
6. Paste Supabase Project URL and public publishable/anon key.
7. Click Test Connection.
8. Open `auth.html`.
9. Create your account.
10. In Supabase `profiles`, change your role to `admin`.
11. Open `admin-review-db.html`.
12. Test publishing.
13. Open `student-home.html`.
14. Test the full student journey.

## What to test

- Student signup
- Student login
- Profile saving
- Practice DB loading questions
- Practice result saving
- Mock DB loading templates
- Mock result saving
- Study Plan generation
- Study Plan saving
- Student Home summary
- Review DB admin access
- Library DB resources

## Important security

Never paste the service-role key or secret key into frontend pages.

Frontend should only use public publishable/anon key.

## Good next step after v5.1

After this setup is tested, continue with:

- v5.2 Mobile UI Polish
- v5.3 Real Content Import Cleanup
- v5.4 Student Progress Charts
