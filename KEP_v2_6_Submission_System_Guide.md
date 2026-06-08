# KEP v2.6 — Volunteer & Content Submission System Guide

This guide explains how KEP should collect questions, past papers, books, notes, corrections, and volunteer contributions.

## Purpose

KEP should never publish random or unverified content directly to students. The content flow should be:

**Collect → Check Source → Review → Translate → Publish**

## Recommended Google Forms

Create separate Google Forms for:

1. Join KEP Volunteer Team
2. Submit MCQ / Question
3. Submit Past Paper
4. Submit Book / Note / PDF Resource
5. Report Correction / Wrong Answer

Each form should feed into a Google Sheet. Later, those sheets can be imported into Supabase, Firebase, or the KEP admin panel.

## Form 1: Volunteer Team

Fields:
- Name
- Contact method
- Country/city (optional)
- Role: Question contributor, Teacher reviewer, Past paper collector, Translator, Girls Education support, Student tester
- Strong subjects
- Languages: Pashto, Dari, English
- Experience or centre connection
- Availability
- Consent to be contacted

## Form 2: Submit MCQ / Question

Fields:
- Subject
- Chapter/topic
- Grade/class
- Language
- Question text
- Option A
- Option B
- Option C
- Option D
- Correct answer
- Explanation
- Difficulty
- Source type: Textbook, Official past paper, Centre paper, Teacher-created, Volunteer-created
- Source details
- Contributor name/contact

## Form 3: Submit Past Paper

Fields:
- Paper title
- Year
- Subject or full paper
- Language
- Paper type: Official, Centre practice, Teacher-shared, Collected practice, Unverified
- Source details
- Permission status
- File upload or link
- Notes

## Form 4: Submit Book / Note / PDF Resource

Fields:
- Title
- Subject
- Grade/class
- Language
- Resource type: Book, Notes, Formula sheet, Guide, Revision pack
- Source
- Copyright/permission status
- File upload or link
- Notes

## Form 5: Report Correction

Fields:
- Issue type: Wrong answer, Translation issue, Unclear explanation, Broken link, Source concern
- Page or question ID
- What is wrong?
- Suggested correction
- Optional contact

## Review rules

A question should not be published until:
- The answer is checked.
- The explanation is clear.
- The source is labelled.
- The language is student-friendly.
- The reviewer approves it.

A past paper should not be labelled official unless the source is official or verified.

## Suggested reviewer statuses

- Collected
- Source checked
- Needs correction
- Approved
- Published
- Rejected

## Next technical step

Connect the forms to:
- Google Sheets first for simple management.
- Supabase/Firebase later for a real admin panel.
- KEP website pages after approval.
