# KEP v4.3 — Database Admin Review Dashboard Guide

KEP v4.3 adds a proper Supabase review dashboard.

This is a careful step toward replacing the Google Sheets review workflow.

## New page

- `admin-review-db.html`

## What it does

The dashboard loads content from:

- `questions`
- `resources`

It lets admin/reviewer users:

- filter by content type
- filter by status
- search content
- review questions
- review resources
- edit mistakes before publishing
- mark content as:
  - needs_review
  - approved
  - published
  - rejected

## Why this matters

Before v4.3, database content could be added and migrated, but review still depended heavily on Google Sheets.

Now KEP has a real database review path:

Submit / import content → Review DB → Approve → Publish → Library DB / Practice DB / Mock DB

## Permission requirement

The logged-in user must have profile role:

- `admin`
- or `reviewer`

If you are the owner, create your account first, then in Supabase Table Editor open `profiles` and set your row:

`role = admin`

## Optional audit log

v4.3 includes optional SQL:

`scripts/KEP_v4_3_Review_Audit_Log.sql`

Run it if you want to store simple review event history.

The dashboard tries to write audit events, but it still works even if you do not run the optional SQL.

## Safe publishing checklist

Before pressing Publish:

1. Question answer is correct.
2. Options are clear.
3. Explanation is useful.
4. Source is trusted.
5. No private data is exposed.
6. Content is respectful and suitable for students.

## Best next step

KEP v4.4 should add a student-facing Study Plan connected to database progress:

- weak subjects from database attempts
- recommended practice
- recommended library resources
- next mock exam suggestion
- weekly plan saved to account
