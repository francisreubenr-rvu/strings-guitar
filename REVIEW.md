# Strings — Codebase Review (2026-06-07)

Status: **Build PASSES** (`next build` ✓, TypeScript ✓, 12 routes generated, deployable).
Runtime: `/`, `/login`, `/signup` all return **HTTP 200** (an initial 500 was cold-compile only).
But: **`bun run lint` FAILS** (119 errors) and there are real correctness/UX defects.

Reviewed: working-tree changes since `05a8f96` — new landing page (10 components),
custom ThemeProvider, 4 scroll hooks, `curriculum.ts`, `/learn` index page.

Verification note: route status, build, lint, git, and CSS/JS wiring are runtime/grep-verified.
Visual claims marked *(static)* are from CSS reading — a browser pass was blocked by a macOS
sandbox restriction on the preview server (`getcwd: Operation not permitted`).

---

## P0 — Critical (do first)

| # | Issue | Where | Impact | Fix |
|---|-------|-------|--------|-----|
| 1 | **98 tracked `._` macOS metadata files** still in git (gitignored but never untracked — the "removal" commit didn't take) | repo-wide | Pollutes repo; causes 80+ of the 119 lint errors ("Invalid character") | `git rm --cached $(git ls-files | grep '\._')` then commit |
| 2 | **`bun run lint` fails** — 119 errors (≈80 junk-file, ≈39 real) | whole app | Breaks any CI lint gate (build itself is unaffected — Next 16 doesn't lint on build) | Fix #1 + the real errors below |
| 3 | **Light mode breaks the landing page** *(static)* | `src/app/page.tsx:19` | `<main style={{background:'#0a0a0c'}}>` is hardcoded. Light theme flips `--text` to near-black → dark text on hardcoded dark bg = unreadable. Nav has a live theme toggle that produces this broken state. | Drive bg from `var(--bg)`, or hide the theme toggle on the landing route |

## P1 — High

| # | Issue | Where | Impact | Fix |
|---|-------|-------|--------|-----|
| 4 | **Most of the decorative CSS system is dead** (`.atmos*`, `.nav*`, `.btn-*`, `.song-card*`, `.bento-card`, `.pricing-card`, `.leaderboard-row`, `.feature-split`, `.footer-*`, `.rail*`, `.reveal*`, `.section`) — **0 uses** in TSX (`.wrap` is the lone survivor, used 11×) | `globals.css:~253-1037` | Maintenance trap; documented design system and shipped components have diverged | Refactor components onto the classes, or delete the dead CSS |
| 4b | **Scroll-reveal animations never fire** | components use `data-reveal`/`data-reveal="left"` attrs; `useReveal` adds `.in`; but CSS only styles `.reveal`/`.reveal-l`/`.reveal-r` *classes* — the attribute selectors are never matched | `globals.css:253-298`, `useReveal.ts:32`, all landing components | The designed entrance motion is silently absent (content just appears) | Style `[data-reveal]`/`[data-reveal].in` (and map `="left"/"right"`), or switch markup to the `.reveal*` classes |
| 5 | **`var(--font-quote)` is undefined** (referenced in a landing component) + font wiring mismatch: `globals.css` references literal `"Inter"`/`"JetBrains Mono"`/`"Instrument Serif"` while `layout.tsx` loads them as next/font CSS *variables* (`--font-inter`…) | `globals.css:104-106,132-134`, `layout.tsx` | Fonts silently fall back to system-ui/serif; design intent lost | Map `--font-display/ui/mono/quote` to the next/font `--font-*` variables |
| 6 | **Live OpenRouter API key exposed** in plaintext (`.env.local` on disk + shown in transcripts) | `.env.local:7` | Key is gitignored (good) but has been displayed repeatedly | Rotate the key in OpenRouter dashboard |
| 7 | **`/learn` page is orphaned** — not in `SideNav` (only Dashboard/Songs/Leaderboard/Profile) | `SideNav.tsx:12-17` | New curriculum index reachable only by direct URL | Add `{ href:'/learn', label:'Learn' }` to `NAV_ITEMS` |
| 8 | **React: impure call during render** + **setState-in-effect** (×6) | `LessonPlayer:40,83`, `ThemeProvider:30`, `ChordMeter:48`, `use-hand-tracker:41`, `use-pitch-detector:30` | Cascading renders / React-compiler violations; `Date.now()` in `useState()` runs every render | Lazy-init `useState(() => Date.now())`; move start/stop out of effect bodies or guard |

## P2 — Medium

| # | Issue | Where | Count | Fix |
|---|-------|-------|-------|-----|
| 9 | `@typescript-eslint/no-explicit-any` — Supabase rows cast `as any[]` everywhere | dashboard, learn, songs, leaderboard, `api/progress`, `hand-tracker` | ~39 | Generate Supabase types (`supabase gen types`) and type the queries |
| 10 | **Two theme systems** — custom `ThemeProvider` + unused `next-themes` dep | `package.json`, `ThemeProvider.tsx` | — | Remove `next-themes` |
| 11 | **7 font families** loaded (6 next/font + Clash via external link) vs brief's "max 2"; `DM_Sans` likely unused | `layout.tsx:2-49` | — | Drop unused families; self-host or trim |
| 12 | `className="relative fixed …"` — conflicting position utilities | `Navigation.tsx:21` | 1 | Remove `relative` |
| 13 | Raw `<a href="/songs/">` instead of `next/link` | `SongLibrary.tsx:34,89` | 2 | Use `<Link>` |
| 14 | `react/no-unescaped-entities` (`'`, `"`) | `onboarding:65-66`, `songs:77` | 4 | Escape or use curly strings |
| 15 | `middleware` convention deprecated in Next 16 | `src/middleware.ts` | 1 | Rename to `proxy` per Next 16 |
| 16 | Theme FOUC — initial `useState('dark')`, theme resolved in effect → flash for light-pref users | `ThemeProvider.tsx:26-32` | — | Inline pre-hydration script to set `data-theme` |

## P3 — Low / polish

| # | Issue | Where |
|---|-------|-------|
| 17 | Unused vars/imports: `Badge`, `sharp`, `hands`, `cameraReady`, `FingerPosition`, `FINGER_BASE_INDICES`, `WRIST_INDEX`, `isOnboarding`, `detectedType`… | leaderboard, Tuner, LessonPlayer, GuitarDetector, hand-tracker, supabase/middleware |
| 18 | `react-hooks/exhaustive-deps` missing `supabase` | `profile/page.tsx:34` |
| 19 | No tests, no error boundaries on webcam/audio init failures | app-wide |
| 20 | Design drift vs `DESIGN_BRIEF.md` (light theme adds a red accent + serif; amber-CTA-only & 2-font rules relaxed) | landing + globals |

---

## Quick wins (≈30 min, clears most of the noise)
1. `git rm --cached` the 98 `._` files → removes ~80 lint errors + cleans repo.
2. Lazy-init `Date.now()`; add `/learn` to SideNav; fix `relative fixed`; `<a>`→`<Link>` in SongLibrary.
3. Decide dead-CSS fate (delete vs adopt) — biggest single cleanup.
4. Rotate the OpenRouter key.
