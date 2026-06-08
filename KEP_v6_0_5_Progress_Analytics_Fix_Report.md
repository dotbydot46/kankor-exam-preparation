# KEP v6.0.5 — Progress Analytics Fix Report

## Issue

The Student Profile page showed saved attempts from the database, but Progress Analytics still showed 0.

## Cause

`progress-analytics.html` was missing the Supabase browser script and `supabase-config.js`, so the Progress page could not read the same database attempts as the Student Profile page.

## Fixed

- Added Supabase JS CDN to `progress-analytics.html`.
- Added `supabase-config.js` before `app-v4.js`.
- Updated `progress-analytics.js` to read only the logged-in student's `exam_attempts`.
- Added support for the actual database fields:
  - `attempt_type`
  - `score`
  - `total`
  - `percentage`
  - `subject_breakdown`
- Progress now auto-loads after opening the page.
- Updated Student Profile label and fixed old mock link.

## No SQL required

This is a frontend connection/mapping fix only.
