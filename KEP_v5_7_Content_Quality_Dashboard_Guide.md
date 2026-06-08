# KEP v5.7 — Content Quality Dashboard Guide

## What this version adds

- `content-quality-db.html`
- `content-quality-db.js`
- Content readiness score
- Subject coverage table
- Weak question list
- Missing explanation check
- Correct answer / options warning
- Exact duplicate question check
- AI suggestion pending count
- Export quality report as JSON

## Why this matters

Before KEP is shared with real students, the admin/reviewer needs to know:

- How many questions exist?
- How many are published?
- Which subjects are weak?
- Which questions need better explanations?
- Are there duplicate questions?
- Are AI suggestions waiting for review?

## How to use

1. Login as admin or reviewer.
2. Open `content-quality-db.html`.
3. Click `Load Quality Data`.
4. Review:
   - overall readiness score
   - subject coverage
   - quality issues
   - duplicate risks
5. Export report if needed.

## Important

This dashboard does not publish or edit questions.

It only helps reviewers see what needs work.

## Recommended next version

KEP v5.8 — Student Progress Analytics

That can show:

- student attempts over time
- weak subjects
- average score trend
- mock exam history
- study plan progress
