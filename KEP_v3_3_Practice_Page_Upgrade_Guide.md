# KEP v3.3 — Practice MCQs Upgrade Guide

This version improves the Practice MCQs page after the Google Sheets publishing system started working.

## What changed

- Published questions still load from the same Apps Script Web App URL.
- Subject dropdown now updates dynamically from the available question bank.
- Question count automatically adjusts based on how many questions exist for the selected subject.
- Practice page now shows a question bank summary.
- Result screen now gives a short improvement suggestion.
- Students can practise only the questions they answered wrong.
- Every question has a **Report issue** link connected to the correction form.
- Empty states are clearer when no questions exist for a subject.

## How to use

1. Open `practice.html`.
2. Paste the same Apps Script Web App URL.
3. Click **Load published questions**.
4. Choose the subject.
5. Choose the number of questions.
6. Start the quiz.
7. Review the result.

## Full current flow

Google Form submission → Google Sheet → Review Dashboard → Mark as Published → Practice page loads published question.

## Important content rule

Only questions with `Review Status = Published` should appear for students.

If a question is wrong, unclear, or not properly sourced, leave it in review and do not publish it yet.
