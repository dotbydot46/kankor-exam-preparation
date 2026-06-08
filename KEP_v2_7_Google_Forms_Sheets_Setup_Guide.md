# KEP v2.7 — Google Forms + Google Sheets Setup Guide

This launch kit creates the first live content collection system for KEP.

It is designed for four goals:

1. Collect questions, past papers, books/notes, corrections, and volunteers.
2. Keep everything structured before publishing.
3. Protect trust with the KEP pipeline: **Collect → Check Source → Review → Translate → Publish**.
4. Avoid collecting unnecessary personal data from students or contributors.

## What this kit includes

- `scripts/KEP_Google_Forms_Auto_Setup.gs` — Apps Script that creates the master Google Sheet and five Google Forms.
- `templates/google-form-links-template.json` — placeholders for the live form links after you run the script.
- `templates/KEP_Form_Question_Blueprints.md` — manual form field structure if you want to build forms yourself.
- `templates/KEP_Content_Governance_Policy.md` — trust, copyright, and review rules.
- `templates/KEP_Volunteer_Outreach_Messages.md` — messages to send to teachers, centres, students, and friends.

## Forms created by the script

1. **KEP — Submit MCQ / Question**
2. **KEP — Submit Past Paper**
3. **KEP — Submit Book / Notes / PDF**
4. **KEP — Report a Mistake / Correction**
5. **KEP — Volunteer Application**

## How to set it up

### Step 1 — Open Apps Script

Go to Google Apps Script, create a new project, and paste the content of:

```text
scripts/KEP_Google_Forms_Auto_Setup.gs
```

### Step 2 — Run the setup function

Run:

```js
setupKEPFormsAndSheets()
```

Google will ask for permission because the script creates Forms and Sheets in your Drive.

### Step 3 — Copy your links

After it runs, open Apps Script logs. The script will show the master spreadsheet URL. Inside the spreadsheet, open the tab:

```text
Setup Links
```

You will find public and edit links for every form.

### Step 4 — Add links to the website

Copy the public form links into:

```text
templates/google-form-links-template.json
```

Later we can connect those links directly to the KEP website buttons.

### Step 5 — Start collecting safely

Share only the correct form link with the right people:

- Teachers/reviewers → MCQ form and correction form
- Students → correction form and volunteer form
- Centres → past paper form
- Trusted contributors → book/notes form

## Review rule

Nothing should be published directly from a form response.

Every item should be reviewed first:

```text
New → Needs source check → Needs academic review → Needs translation → Approved → Published
```

## Privacy rule

The script does **not** automatically collect email addresses. Contributors may provide contact details voluntarily. This keeps KEP safer and more respectful for sensitive users.

## Technical note

The script uses Google Apps Script Forms and Sheets services. Google documents that Apps Script can create and modify Google Forms through `FormApp`, and that triggers can automate actions such as form-submit workflows when we later need automation.
