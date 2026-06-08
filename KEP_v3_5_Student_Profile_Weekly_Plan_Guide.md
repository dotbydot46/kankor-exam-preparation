# KEP v3.5 — Student Profile + Weekly Study Plan

This version makes the student dashboard more personal while staying local-first and private.

## What is new

- Student profile form: name/nickname, province/location, level, language, available study time, target exam date, and study days.
- Private learner mode: hides the student name on the dashboard.
- Weekly study plan generator based on:
  - dream field,
  - available study minutes,
  - selected study days,
  - weakest subject from quiz attempts.
- Export profile backup as JSON.
- Print / save weekly plan as PDF using the browser print feature.

## Privacy model

This MVP stores profile, weekly plan, and quiz attempts in the browser with `localStorage`.
No Tazkira, gender, or sensitive identity field is required.

Later, this can be moved to secure student accounts using Supabase/Firebase.

## Test flow

1. Open `practice.html`.
2. Complete a quiz.
3. Open `dashboard.html`.
4. Fill the student profile.
5. Save the profile.
6. Generate a weekly plan.
7. Print or export the plan if needed.

## Next recommended step

KEP v3.6 should improve the Girls Education Space with a dedicated self-study pathway and downloadable weekly plan for girls studying privately from home.
