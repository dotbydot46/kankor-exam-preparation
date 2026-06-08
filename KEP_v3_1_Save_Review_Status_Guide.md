# KEP v3.1 — Save Review Status Back to Google Sheets

This update makes the Review Dashboard a real admin workflow.

Before v3.1:

Google Form → Google Sheet → KEP Review Dashboard

Now v3.1:

Google Form → Google Sheet → KEP Review Dashboard → Save status/notes back to Google Sheet

## Files changed

- `review-dashboard.html`
- `app.js`
- `styles.css`
- `scripts/KEP_Google_Sheets_Web_API.gs`
- `scripts/KEP_Google_Sheets_Web_API_v3_1.gs`

## Important: update the Apps Script

1. Open your existing Google Apps Script project.
2. Open your API file: `KEP_Google_Sheets_Web_API`.
3. Delete the old API code.
4. Copy all code from:

   `scripts/KEP_Google_Sheets_Web_API_v3_1.gs`

5. Paste it into the API file.
6. Save.
7. Click **Deploy** → **Manage deployments**.
8. Edit the existing Web App deployment, or create a new version.
9. Keep these settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Copy the Web App URL again.

## How to use the Review Dashboard

1. Open `review-dashboard.html`.
2. Paste your Apps Script Web App URL.
3. Enter your reviewer name, for example `Sharafat`.
4. Click **Load live submissions**.
5. Open a live submission card.
6. Change the status.
7. Add reviewer notes.
8. Click **Save to Google Sheet**.
9. Go to the Google Sheet and check that these columns were added/updated:
   - Review Status
   - Reviewer Notes
   - Reviewed By
   - Reviewed At

## Review statuses

- Collected
- Source Check
- Academic Review
- Translation Review
- Ready to Publish
- Published
- Rejected

## Optional access key

The API has an optional setting:

```js
reviewKey: ''
```

For simple testing, leave it empty.

Later, for more protection, set it to something private like:

```js
reviewKey: 'my-private-key'
```

Then paste the same key into the dashboard field called **Review access key optional**.

## Privacy rule

Keep the review dashboard private. Do not publish it publicly while volunteer/contact information exists in the Google Sheet.
