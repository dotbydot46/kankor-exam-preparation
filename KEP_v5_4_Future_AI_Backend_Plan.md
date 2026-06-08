# KEP v5.4 — Future AI Backend Plan

## Why backend is needed

A real AI model needs an API key.

That key must not be placed in frontend files such as:

- HTML
- CSS
- browser JavaScript
- GitHub public repository

The safe method is:

Student/Admin browser → KEP backend/Edge Function → AI provider → KEP backend → browser

## Suggested request

```json
{
  "task": "review_question",
  "question": "Which part of the plant makes food?",
  "options": ["Root", "Leaf", "Stem", "Flower"],
  "correct_answer": "Leaf",
  "subject": "Biology",
  "language": "English"
}
```

## Suggested AI response

```json
{
  "quality_notes": [],
  "difficulty": "Easy",
  "explanation_draft": "Leaves make food through photosynthesis...",
  "translation_drafts": {
    "pashto": "...",
    "dari": "..."
  },
  "duplicate_search_terms": ["plant", "makes", "food", "leaf"]
}
```

## Reviewer workflow

1. Reviewer opens submitted content.
2. Reviewer clicks AI Review.
3. AI returns suggestions.
4. Reviewer edits if needed.
5. Reviewer accepts/rejects.
6. Only approved content becomes Published.

## KEP rule

No automatic publishing from AI.
