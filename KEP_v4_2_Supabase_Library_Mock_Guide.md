# KEP v4.2 — Supabase Library + Mock Exam Guide

KEP v4.2 moves two more major student-facing features from the Google Sheets prototype into the real Supabase database.

## New pages

- `library-db.html`
- `mock-db.html`

## What Library DB does

`library-db.html` loads published resources from the Supabase `resources` table.

It supports:

- Books / Notes
- Past Papers
- subject filter
- language filter
- open file link
- save resource to logged-in student account

Only rows with:

`status = published`

appear to students.

## What Mock DB does

`mock-db.html` loads:

- published questions from `questions`
- published templates from `exam_templates`

It supports:

- Quick Mock
- Subject Mock
- Database Template Mock
- timer
- question navigation
- result page
- subject breakdown
- wrong-answer review
- field-readiness estimate
- saving result into `exam_attempts` for logged-in students

## Recommended workflow

1. Submit content through forms.
2. Review/publish content in Google Sheets.
3. Use `migrate-to-db.html` to import published content into Supabase.
4. Open `library-db.html` to check resources.
5. Open `mock-db.html` to run database mock exams.
6. Open `student-db.html` to see saved results.

## Important honesty rule

KEP mock results are study estimates.

Do not tell students:

- you passed Medicine
- you got Kabul University
- you failed Engineering
- this is your official result

KEP should say:

- readiness estimate
- strong / medium / needs work
- weak subjects
- suggested next study plan

Official placement depends on official Kankor results, capacity, competition, and official rules.

## What v4.3 should do next

Build a proper database Admin Review Dashboard:

- list submitted questions/resources
- approve/reject
- publish/unpublish
- edit mistakes
- manage volunteers/reviewers
- replace Google Sheets gradually
