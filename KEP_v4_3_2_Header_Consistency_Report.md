# KEP v4.3.2 — Header, Logo & Navigation Consistency Fix

You noticed that pages after Dashboard, such as Login, Database, and Migration, changed the logo/header style.

## Cause

Older KEP pages used the original header:

`header.header` with `a.logo` and `assets/logo.svg`

New database pages used a newer separate header:

`header.site-header` with `a.brand` and `assets/kep-logo.svg`

That made the logo/header look different when moving between the normal pages and database pages.

## Fixed

- Replaced the separate database-page header with the same homepage/dashboard header style.
- Standardised all top-level pages to use:
  - `header.header`
  - `a.logo`
  - `assets/logo.svg`
- Kept database links in the same navigation:
  - Login
  - Database
  - Migration
  - Review DB
- Added mobile navigation support to `app-v4.js`.
- Added CSS to keep logo size stable.
- Rebuilt the service worker cache as `kep-v4.3.2`.

## Checked

- Updated headers on 26 HTML pages.
- Local link/image/script check passed.
- JavaScript syntax check passed for `app.js`, `app-v4.js`, and `app-v4-migration.js`.

## Result

Use this as the new safe base before continuing:

`KEP v4.3.2`
