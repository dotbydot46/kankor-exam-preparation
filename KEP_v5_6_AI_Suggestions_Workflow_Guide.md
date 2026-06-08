# KEP v5.6 — AI Suggestions Review Workflow Guide

## What this version adds

- `ai-suggestions-db.html`
- `ai-suggestions-db.js`
- `ai-suggestion-save.js`
- Save AI Suggestion button on `ai-review-assistant.html`
- Saved AI Suggestions dashboard for admin/reviewer decisions

## What problem this solves

In v5.4 and v5.5, AI could suggest content improvements.

In v5.6, reviewers can now save those suggestions and decide later:

- accepted
- edited
- rejected
- suggested

This makes the AI workflow traceable.

## How to use

1. Make sure you ran:
   - `scripts/KEP_v5_4_AI_Review_Suggestions_Table.sql`
2. Login as admin/reviewer.
3. Open `ai-review-assistant.html`.
4. Fill demo or type a question.
5. Run local AI review or backend AI review.
6. Click `Save AI Suggestion`.
7. Open `ai-suggestions-db.html`.
8. Click `Load Suggestions`.
9. Accept, mark edited, or reject.

## Important

AI suggestions are still not published automatically.

The reviewer decision is only a review record.

## Next recommended version

KEP v5.7 — Content Quality Dashboard

That can show:

- total questions by subject
- published vs needs review
- weak content warnings
- missing explanations
- duplicate risk
- content readiness score
