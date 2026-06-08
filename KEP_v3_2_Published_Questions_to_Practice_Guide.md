# KEP v3.2 — Published Questions to Practice MCQs

This version connects the Practice MCQs page to your reviewed Google Sheet content.

## What this version does

- Reads questions from your Google Sheet.
- Only loads rows where **Review Status = Published**.
- Adds those questions to the Practice MCQs page.
- Keeps sample questions as fallback.

## Setup

1. Open your existing **KEP_Google_Sheets_Web_API** Apps Script project.
2. Replace the old API code with `scripts/KEP_Google_Sheets_Web_API_v3_2.gs`.
3. Save.
4. Go to **Deploy → Manage deployments → Edit pencil**.
5. Choose **New version**.
6. Keep:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Deploy and copy the Web App URL.
8. Open `practice.html`.
9. Paste the Web App URL into the **Load published questions** box.
10. Click **Load published questions**.

## Important

A question will not appear in Practice until its row in Google Sheets has:

- Review Status = **Published**
- Question text
- Option A
- Option B
- Correct answer

Options C and D are recommended, but the loader can still work with at least two options.

## Full KEP workflow

Submit question → Review Dashboard → Mark Published → Practice MCQs
