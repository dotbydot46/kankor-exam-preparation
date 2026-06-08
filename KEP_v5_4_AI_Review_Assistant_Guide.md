# KEP v5.4 — AI Review Assistant Prototype Guide

## What this version adds

- `ai-review-assistant.html`
- `ai-review-assistant.js`
- `scripts/KEP_v5_4_AI_Review_Suggestions_Table.sql`
- AI support panel inside `admin-review-db.html`
- Admin navigation updated to point to the AI Review Assistant

## What the prototype does

The assistant can:

- check question quality
- find missing/weak explanation
- warn about too few options
- warn if the correct answer does not match an option
- suggest Easy/Medium/Hard difficulty
- draft a simple explanation
- prepare duplicate-check search terms
- export suggestion JSON

## What it does not do yet

- It does not call a real AI API.
- It does not store suggestions to Supabase automatically.
- It does not publish content.
- It does not replace human review.

## Safety rule

AI suggests. Human reviewer approves.

## Optional SQL

Run this if you want to prepare the database for future AI suggestions:

`scripts/KEP_v5_4_AI_Review_Suggestions_Table.sql`

## Future v5.5

KEP v5.5 can add a real backend/Edge Function connection:

- frontend sends question to backend
- backend calls AI securely
- AI key stays private
- suggestion is returned to reviewer
- reviewer accepts, edits, or rejects

Never put a secret AI API key in frontend HTML or JavaScript.
