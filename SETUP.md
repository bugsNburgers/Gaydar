# GAYDAR 3000 — Setup

## 1. Install the Gemini package

```bash
npm install @google/generative-ai
```

## 2. Get a free Gemini API key

Go to → https://aistudio.google.com/app/apikey
Free tier: 15 req/min, 1500 req/day. More than enough.

## 3. Add to .env.local

```
GEMINI_API_KEY=your_key_here
```

## 4. Drop in the files

```
lib/
  gaydar/
    types.ts
    questions.ts

app/
  gaydar/
    page.tsx          ← the whole UI
  api/
    gaydar/
      analyze/
        route.ts      ← gemini api call
```

## 5. Visit /gaydar

That's it. No Redis, no rate limit infra, no extra deps.
The route.ts has a simple in-memory rate limiter (15s between requests per IP) — totally fine for a fun app.

---

## Notes

- Built with Next.js 14 App Router + TypeScript
- All UI in `page.tsx` (single file, no extra component deps)
- Gemini 1.5 Flash generates the unhinged "reasons" dynamically
- Fallback text if Gemini fails or hits rate limit
- Font: Fredoka One + DM Sans via Google Fonts (loaded inline, no next/font needed)
