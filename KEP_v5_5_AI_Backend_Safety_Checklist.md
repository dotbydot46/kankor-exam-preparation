# KEP v5.5 — AI Backend Safety Checklist

## Before real AI

- [ ] Database connection works
- [ ] Login works
- [ ] Your profile role is `admin` or `reviewer`
- [ ] `ai_review_suggestions` table exists if you want to save suggestions
- [ ] Edge Function is deployed
- [ ] Secret key is stored only in Supabase function secrets
- [ ] No AI key appears in frontend files
- [ ] AI suggestions are labelled as suggestions only
- [ ] Reviewer approval remains required

## Never do this

- Do not paste secret AI keys into browser JavaScript
- Do not commit `.env.local`
- Do not auto-publish AI output
- Do not send unnecessary private student information to AI

## Good future improvement

Add a Save Suggestion button that writes accepted/rejected suggestions to `ai_review_suggestions`.
