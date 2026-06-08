# KEP v4.5 — Student Home Dashboard Guide

KEP v4.5 creates one student-facing home page that brings the database features together.

## New page

- `student-home.html`

## What it shows

- Welcome message
- Profile summary
- Today’s best next step
- Attempts count
- Average score
- Latest score
- Weakest subject
- Current weekly plan preview
- Recommended resources
- Wrong answers to revisit
- Quick links to:
  - Practice DB
  - Mock DB
  - Library DB
  - Study Plan
  - Student DB

## Why this matters

Before v4.5, students had to move between many pages:

Login → Student DB → Practice DB → Mock DB → Study Plan → Library DB

Now Student Home gives one simple starting point:

“Open KEP and know what to do today.”

## Data sources

Student Home reads:

- `profiles`
- `exam_attempts`
- `resources`
- optional `study_plans`

If the `study_plans` table is not created, Student Home still works and can use the latest locally saved plan.

## Recommended next step

KEP v5.0 should be a full system review and UI polish:

- navigation
- mobile view
- student journey
- admin journey
- database flow
- service worker
- links
- readability
- deployment readiness
