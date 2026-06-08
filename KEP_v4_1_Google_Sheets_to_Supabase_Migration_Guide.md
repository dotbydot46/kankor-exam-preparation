# KEP v4.1 — Google Sheets to Supabase Migration Guide

KEP v4.1 adds a migration bridge between the Google Sheets prototype system and the real Supabase database.

## What this version adds

- New page: `migrate-to-db.html`
- New script: `app-v4-migration.js`
- Optional stricter RLS SQL: `scripts/KEP_v4_1_RLS_Admin_Status_Policies.sql`
- Import Published questions from Google Sheets into Supabase `questions`
- Import Published books, notes, PDFs, and past papers into Supabase `resources`
- Admin/reviewer check before import
- Preview before import

## Before you start

You should already have v4.0 working:

1. Supabase project created
2. v4.0 SQL schema run
3. Supabase URL and anon key saved in `database-setup.html`
4. Your account created in `auth.html`
5. Your role changed to `admin` or `reviewer` in the `profiles` table
6. Apps Script API from v3.8/v3.9 still deployed

## Recommended safety step

Run this optional SQL after v4.0:

`scripts/KEP_v4_1_RLS_Admin_Status_Policies.sql`

This makes content publishing stricter:

- normal users can submit content
- only admin/reviewer can insert or update `published` content

## Migration steps

1. Open `migrate-to-db.html`
2. Paste your Google Apps Script Web App URL
3. Click `Load published content`
4. Check the preview lists
5. Click `Import questions`
6. Click `Import resources`
7. Open `admin-db.html` to check imported questions
8. Open `practice-db.html` to practise from Supabase questions

## Important rule

Only import content that is already marked `Published` in the Review Dashboard.

Google Sheets remains useful for collection and volunteer review, but Supabase should become the main source for the student platform.

## After migration

The next step is KEP v4.2:

- Library from Supabase resources
- Mock Exam from Supabase questions/templates
- Student dashboard fully using database attempts
