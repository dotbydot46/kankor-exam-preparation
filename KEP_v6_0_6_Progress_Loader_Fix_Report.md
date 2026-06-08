# KEP v6.0.6 — Progress Loader Fix Report

## Issue

Progress Analytics still showed `Loaded 0 attempt(s)` even though Student Profile showed saved database attempts.

## Exact cause

The project database client is stored as `window.KEP_DB`, but the v6.0.5 Progress page checked only `window.kepSupabase` before loading database attempts.

So it skipped the database query and only checked local storage.

## Fixed

- Progress Analytics now recognises the real KEP database client:
  - `window.KEP_DB.client()`
- It now loads database attempts the same way Student Profile does.
- Status message now shows database + local attempt counts.
- Added `window.kepProgressDebug()` for console debugging.

## No SQL required

This is a frontend loader fix only.
