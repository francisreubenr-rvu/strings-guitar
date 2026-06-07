# Strings — Guitar Learning Platform

Webcam-powered, audio-aware guitar learning app. Real-time finger placement overlays, live chord recognition, structured curriculum (beginner → advanced), public domain song library, leaderboard.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database / Auth | Supabase (Postgres + RLS + Auth) |
| Hand tracking | MediaPipe Hands (browser-side WASM) |
| Pitch detection | Pitchy (Web Audio API) |
| Chord recognition | Custom FFT chromagram |
| AI Tutor | OpenRouter (free models) |
| Styling | Tailwind CSS + shadcn/ui |
| Deployment | Vercel |

All webcam and audio processing is **100% client-side**. Nothing is uploaded.

---

## Setup

### 1. Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Then run `supabase/seed.sql` to populate the curriculum and songs
4. Copy your **Project URL** and **anon key** from Settings → API

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
OPENROUTER_API_KEY=sk-or-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

```bash
npx vercel
```

Add all env vars in the Vercel dashboard (Settings → Environment Variables).

---

## Key Files

| File | Purpose |
|---|---|
| `src/lib/mediapipe/hand-tracker.ts` | MediaPipe Hands — maps 21 landmarks to fretboard positions |
| `src/lib/audio/pitch-detector.ts` | Real-time pitch detection via Pitchy (<50ms) |
| `src/lib/audio/chord-recognizer.ts` | FFT chromagram → chord template matching |
| `src/components/webcam/FingerOverlay.tsx` | Canvas overlay: target vs actual finger positions |
| `src/components/lessons/LessonPlayer.tsx` | Main lesson UI — webcam + audio + content |
| `src/components/audio/Tuner.tsx` | Chromatic tuner with cents display |
| `src/app/api/ai/tutor/route.ts` | OpenRouter AI tutor tip endpoint |
| `supabase/schema.sql` | Full DB schema with RLS policies |
| `supabase/seed.sql` | Curriculum (27 chapters, 135 lessons) + 12 public domain songs |

---

## Freemium Boundary

- **Free**: Chapters 1–2 of beginner, tuner, 8 songs
- **Pro**: Full curriculum, all songs, weekly board, leaderboard, AI tutor

Set `is_premium = true` on a profile row in Supabase to grant Pro access manually.
