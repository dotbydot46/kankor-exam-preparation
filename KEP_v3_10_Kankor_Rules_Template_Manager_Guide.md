# KEP v3.10 — Kankor Rules + Exam Template Manager

This version adds a trust layer before KEP claims a mock exam is close to the real Kankor format.

## What is new

- New page: `kankor-rules.html`
- Kankor Rules Research Sheet
- Exam Template Manager
- Saved templates appear in the Mock Exam page
- JSON export for rules and templates
- Full Kankor format remains `To be verified` until trusted sources confirm it

## Why this matters

KEP should be useful, but it must also be honest.

Do not hard-code:
- total questions
- questions per subject
- official time
- marking rules
- university placement claims

until they are verified from trusted sources.

## How to use the rules research section

Add one entry for each source:

- Year / Hijri year
- Source title
- Source link or reference
- Total questions
- Exam time
- Subjects included
- Questions per subject
- Marking rules
- Verified by
- Date checked
- Status

Only entries marked `Verified` should be used to update a real Kankor-style template.

## How to create an exam template

1. Open `kankor-rules.html`.
2. Go to Exam Template Manager.
3. Add template name, time limit, verification status, and description.
4. Add subject distribution rows.
5. Save template.
6. Open `mock.html`.
7. Select the saved template in the Mock Exam page.

## Safe result language

KEP should say:
- Readiness estimate
- Strong / Medium / Needs work
- Suggested weak subjects
- Recommended next study plan

KEP should not say:
- You passed Medicine
- You failed Engineering
- You got Kabul University
- This is your official Kankor result

Official admission depends on official exam result, yearly field capacity, competition, and official placement rules.
