# KEP v3.8 — Live Library Resources Guide

This version connects the Library page to your Google Sheets content system.

## What it does

- Reads approved books, notes, PDFs, and past papers from your KEP Google Sheet.
- Only resources marked `Published` appear on the website.
- Supports filters for:
  - All
  - Books / Notes
  - Past Papers
  - Subject
  - Language
- Keeps sample library cards as backup.

## What you need to do

1. Open `scripts/KEP_Google_Sheets_Web_API_v3_8.gs`.
2. Copy all code.
3. In Google Apps Script, replace the current v3.2 API code with this v3.8 code.
4. Save.
5. Deploy as a new Web App version.
6. Use the same Web App URL on:
   - Review Dashboard
   - Practice MCQs
   - Library page

## How to publish a book or past paper

1. Submit a book/notes or past paper through the Google Form.
2. Open the Review Dashboard.
3. Load live submissions.
4. Mark the resource as `Published`.
5. Save to Google Sheet.
6. Open `library.html`.
7. Paste the Web App URL.
8. Click `Load approved resources`.

## Why this matters

KEP now has a full content pipeline:

Submit content → Review content → Mark Published → Show to students

This applies to questions, books, notes, PDFs, and past papers.
