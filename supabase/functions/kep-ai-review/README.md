# kep-ai-review Edge Function

This is the backend AI bridge for KEP v5.5.

It keeps the AI provider key on the server side and checks that the logged-in user is an `admin` or `reviewer`.

If `OPENAI_API_KEY` and `OPENAI_MODEL` are not set, it returns a local backend fallback suggestion so you can test the connection safely.
