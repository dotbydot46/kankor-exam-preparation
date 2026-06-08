# KEP v5.1.1 — AI Automation Roadmap

AI can help KEP a lot, but it must be used carefully.

## Principle

AI suggests. Human reviewers approve.

No AI-generated or AI-edited educational content should become Published without human checking.

## Best AI automations for KEP

### 1. Content cleaner

Input: submitted question  
Output: cleaned question text, cleaned options, spelling fixes, formatting fixes

### 2. Duplicate detector

Input: new question + existing question bank  
Output: similarity warning if the question already exists

### 3. Explanation helper

Input: question, options, correct answer  
Output: simple student-friendly explanation

### 4. Translation draft

Input: English/Pashto/Dari question  
Output: draft translation in other languages

Important: translation must be reviewed by a human.

### 5. Difficulty estimate

Input: question text + student performance history  
Output: Easy / Medium / Hard suggestion

### 6. Student study coach

Input: student attempts, weak subjects, available resources  
Output: weekly study advice

## Safe technical plan

Do not call AI directly from frontend HTML/JS.

Use:

- Supabase Edge Function or backend server
- private AI key stored on the server
- frontend sends only the needed content
- backend returns suggestion
- reviewer decides whether to accept it

## Suggested future database table

```sql
create table public.ai_review_suggestions (
  id uuid primary key default uuid_generate_v4(),
  content_type text not null,
  content_id uuid,
  suggestion_type text not null,
  suggestion jsonb not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);
```

## v5.2 suggestion

Next version can be:

KEP v5.2 — AI Review Assistant Prototype

This would add:

- AI suggestion panel in Review DB
- duplicate warning placeholder
- explanation draft field
- reviewer accept/reject buttons
