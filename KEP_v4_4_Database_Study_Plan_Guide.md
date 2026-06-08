# KEP v4.4 — Database Study Plan & Recommendations Guide

KEP v4.4 adds a student-facing study plan that uses real database progress.

## New page

- `study-plan-db.html`

## What it does

The page reads:

- logged-in student profile
- saved database attempts from `exam_attempts`
- published resources from `resources`

Then it creates:

- learning snapshot
- weak subject list
- strong subject list
- 7-day weekly study plan
- recommended resources
- next action links

## Saving plans

The page always saves the latest plan locally in the browser.

To save plans in Supabase, run:

`scripts/KEP_v4_4_Study_Plans_Table.sql`

Then the Save Plan button will also save the plan to the `study_plans` table.

## Why this matters

KEP should not only give tests.  
It should guide students after the test.

The flow becomes:

Practice / Mock → Saved attempt → Weak subjects → Recommended resources → Weekly plan → Next mock

## Safe guidance

The study plan is an educational recommendation only.  
It should not claim official Kankor results or admission placement.

## Recommended next step

KEP v4.5 should polish the student experience:

- one student home page
- show today's task
- show weekly progress
- show latest plan
- show saved resources
- make database pages easier to navigate
