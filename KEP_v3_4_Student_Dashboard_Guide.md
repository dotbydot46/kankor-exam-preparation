# KEP v3.4 — Student Dashboard Progress Guide

## What changed

KEP now has a local-first Student Dashboard. When a student completes a Practice MCQ quiz, the attempt is saved in the browser and the Dashboard updates automatically.

This is an MVP approach. It does not need login yet, and it does not send student progress to Google Sheets. That keeps testing simple and private.

## How to test

1. Open `practice.html`.
2. Load published questions from Google Sheets, or use sample questions.
3. Start a quiz and finish it.
4. Open `dashboard.html`.
5. You should see:
   - Study streak
   - Last quiz score
   - Average score
   - Weak focus subject
   - Dream field
   - Total attempts
   - Subject progress bars
   - Recent quiz attempts
   - Wrong answers to revisit

## Dream field

The dashboard has a dream field selector:

- Medicine
- Engineering
- Computer Science
- Law
- Education
- General Kankor

After saving a dream field, the dashboard shows recommended focus subjects.

## Privacy note

Progress is stored in local browser storage under:

```text
kepPracticeAttempts
kepDreamField
```

This means progress stays on the same device/browser. Later, when KEP gets real student login, this can move into Supabase or Firebase.

## Next recommended version

KEP v3.5 should upgrade the Student Dashboard further by adding:

- Simple student profile
- Weekly study plan
- Saved books/papers
- Mock exam score history
- Export progress report as PDF

After that, KEP can move toward real login and cloud progress sync.
