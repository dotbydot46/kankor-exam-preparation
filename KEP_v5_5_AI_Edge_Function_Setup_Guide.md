# KEP v5.5 — AI Edge Function Setup Guide

## Goal

Connect KEP's AI Review Assistant to a safe backend function.

The browser must not contain private AI keys.

## Files added

- `supabase/functions/kep-ai-review/index.ts`
- `supabase/functions/.env.example`
- `supabase/config.toml`
- `ai-edge-client.js`
- `ai-edge-setup.html`

## How it works

1. Admin/reviewer logs into KEP.
2. AI Review Assistant sends the question to the Supabase Edge Function.
3. Edge Function checks the logged-in user.
4. Edge Function checks the user's role in `profiles`.
5. If the role is `admin` or `reviewer`, it returns AI suggestions.
6. Reviewer decides what to accept or reject.

## Environment secrets

Set these as Supabase function secrets:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=your_model_here
```

Do not put these in:

- HTML
- frontend JavaScript
- GitHub public files
- `database-setup.html`

## Deploy idea using Supabase CLI

From the project folder:

```bash
supabase functions deploy kep-ai-review
```

Set secrets:

```bash
supabase secrets set OPENAI_API_KEY=your_key_here
supabase secrets set OPENAI_MODEL=your_model_here
```

Or use an env file:

```bash
supabase secrets set --env-file supabase/functions/.env.local
```

## Test

1. Open `database-setup.html`
2. Make sure Supabase connection is saved
3. Login as admin or reviewer
4. Open `ai-review-assistant.html`
5. Fill demo question
6. Click `Run Backend AI Review`

## Fallback mode

If `OPENAI_API_KEY` or `OPENAI_MODEL` is missing, the Edge Function returns a local backend fallback suggestion.

This lets you test the function safely before paying for or configuring real AI.

## Safety

AI suggestions are not final content.

Human reviewer must approve before publishing.
