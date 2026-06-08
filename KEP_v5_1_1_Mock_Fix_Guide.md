# KEP v5.1.1 — Mock Exam Fix Guide

## What was fixed

- Mock exam count now respects how many questions are actually available.
- If only 1 question exists, KEP will not pretend there are 5 or 10.
- Question mapping now supports different column names:
  - `question_text`
  - `question`
  - `questionText`
  - `Question`
  - `Question Text`
- Correct answer mapping now supports:
  - answer text
  - option index
  - A/B/C/D letters
  - `correct_answer`
- Added v5.1.1 demo content SQL with 72 safe demo questions.
- Added AI automation roadmap page.

## What you should run now

Run this SQL in Supabase SQL Editor:

`scripts/KEP_v5_1_1_Demo_Content_Boost.sql`

Then open:

- `mock-db.html`
- Click Load DB exam data
- Choose 10 or 30 questions
- Start mock

## Important

The demo content is only for system testing. It is not official Kankor material.
