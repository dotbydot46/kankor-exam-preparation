# KEP v3.0 — Live Google Sheets Connection Guide

This step connects the KEP Review Dashboard to your real **KEP Content Collection System** Google Sheet.

## What this does

The website can load safe summary rows from your Google Sheet, including:

- MCQ / question submissions
- Past paper submissions
- Book / notes submissions
- Correction reports
- Volunteer applications

It does **not** return volunteer contact details to the website. Keep the full Google Sheet private.

## Step 1 — Open Apps Script

Go to Google Apps Script and create a new project.

Name it:

`KEP Live Sheet API`

## Step 2 — Paste the API script

Open this file from the website folder:

`scripts/KEP_Google_Sheets_Web_API.gs`

Copy everything and paste it into Apps Script.

The spreadsheet ID is already set to:

`1Kdd14yTn8mZtcR1JNPsWWpFV3-9lFBWIePDHezBbl0g`

## Step 3 — Save and run once

Click Save.

Run any function once, for example:

`getReviewItems_`

Google will ask for permission. Allow it.

## Step 4 — Deploy as Web App

Click:

`Deploy → New deployment`

Choose:

`Web app`

Settings:

- Execute as: **Me**
- Who has access: **Anyone with the link**

Click deploy, then copy the Web App URL.

## Step 5 — Paste the Web App URL into KEP

Open:

`review-dashboard.html`

Paste the Web App URL into the **Apps Script Web App URL** box.

Click:

`Save URL`

Then click:

`Load live submissions`

Your real submissions should appear in the review dashboard.

## Privacy warning

The Review Dashboard is an admin tool. Do not put it publicly online until you have proper login protection.

The API returns summary data only, but the safest approach is to use this locally or on a private admin version for now.

## Next after v3.0

After the live review dashboard works, KEP v3.1 should make approved questions appear inside the Practice MCQs page.
