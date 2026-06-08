# KEP v4.0 — Real Database + Login System Guide

KEP v4.0 moves the project from prototype storage toward a real platform.

## Added files

- `database-setup.html`
- `auth.html`
- `student-db.html`
- `practice-db.html`
- `admin-db.html`
- `supabase-config.js`
- `app-v4.js`
- `scripts/KEP_v4_0_Supabase_Database.sql`

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `scripts/KEP_v4_0_Supabase_Database.sql`.
4. Copy Project URL and anon public key from Supabase settings.
5. Open `database-setup.html`.
6. Paste URL/key and click Save connection.
7. Click Test connection.
8. Open `auth.html` and create your account.
9. In Supabase Table Editor, set your row in `profiles.role` to `admin`.
10. Open `admin-db.html`, add a question with status `published`.
11. Open `practice-db.html`, load questions, and practise.

## Security rules

Never paste the service-role key into the website.

The frontend uses only the anon public key. Row Level Security protects private student data and admin-only content actions.

## What v4.0 gives KEP

- Real login/signup
- Student profiles in database
- Saved attempts in database
- Admin-managed questions
- Published questions loaded from database
- Migration path away from Google Sheets/localStorage

## What still comes later

- Password reset page
- Full admin review workflow
- PDF upload/storage
- Google Sheets to Supabase import tool
- Real production deployment settings
- Server-side admin functions

Next recommended step: KEP v4.1 — migrate approved Google Sheets content into Supabase.
