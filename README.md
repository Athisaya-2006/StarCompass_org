# Compass — Saranathan Freshers Hub

GSAT Hackathon 2026 submission. An AI-powered freshers portal with a Guest
Mode (no login needed to browse) and a Student Mode (login only for
personalized features), a rule-based AI Campus Assistant, and a real
Node.js + SQL backend for student accounts.

## AI Campus Assistant — now backed by real Gemini

The assistant calls the Gemini API directly from `server.js` (`callGemini`),
grounded in `data.js` (the same events/clubs/faculty/campus/resources shown
on the pages) via a system instruction, so answers stay accurate to the site.

**Setup:**
1. Get a free key at https://aistudio.google.com/apikey
2. Put it in `.env` (already created for you — copy `.env.example` if you
   need a fresh one):
   ```
   GEMINI_API_KEY=your-key-here
   GEMINI_MODEL=gemini-2.5-flash
   ```
3. Run `node server.js` and open the Assistant page — a status badge shows
   whether it's live on Gemini or running in offline demo mode.

**Fallback by design:** if the key is missing, invalid, or the network is
down, `/api/assistant` returns `useFallback:true` and the frontend silently
uses the original rule-based `botReply()` in `public/app.js` instead — the
demo never breaks on stage even without internet.

**Security note:** `.env` is git-ignored so the key won't get committed.
Since this key was shared in a chat, treat it as already exposed — rotate
it at https://aistudio.google.com/apikey before relying on it long-term or
pushing this repo anywhere public.

## Run it

No dependencies to install — everything uses Node's built-in modules.

```
node server.js
```

Then open **http://localhost:3000**.

## What's where

- `server.js` — HTTP server. Serves the frontend and exposes the API:
  - `POST /api/register` — create a student account
  - `POST /api/login` — verify credentials
  - `GET /api/students/:email` — fetch a student's saved data
  - `PUT /api/students/:email` — save profile edits / event registrations / favourite clubs
  - `GET /api/assistant/status` — whether Gemini is connected
  - `POST /api/assistant` — chat with the AI Campus Assistant (Gemini, with local fallback)
- `data.js` — shared campus dataset (events, clubs, faculty, campus locations,
  resources) used both to render the pages and to ground Gemini's answers
- `db.js` — the database layer. Uses Node's built-in SQLite (`node:sqlite`)
  to store the `students` table. If your Node version doesn't support it
  yet, it automatically falls back to a JSON file (`data/students.json`)
  with the exact same interface — nothing else changes.
- `public/` — the frontend (plain HTML/CSS/JS, no build step):
  - `index.html` — all pages (Home, Events, Clubs, Faculty, Campus,
    Assistant, Resources, Dashboard) as a single-page app
  - `styles.css` — design system and layout
  - `app.js` — page logic, the local fallback replies, and calls to the
    backend API above

## Notes for judges

- Guest Mode is the default: every page is browsable, searchable and
  translatable (EN / தமிழ் / हिंदी) without an account.
- Student Mode only asks for login on actions that need to remember you:
  registering for an event, favouriting a club, or viewing your dashboard.
- Passwords are stored as plain text in `db.js` for hackathon-demo
  simplicity only — swap in `bcrypt` hashing before using this for real
  student data.
- The AI Campus Assistant calls the real Gemini API (see above) and
  degrades gracefully to local rule-based replies if it can't reach it.
- Deploy anywhere that runs Node (Render, Railway, a college server, etc).
  For static-only hosting (GitHub Pages), you'd need to point `public/app.js`
  at a separately-hosted instance of `server.js`.
