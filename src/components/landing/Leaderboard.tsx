'use client'

import React, { useEffect, useRef } from 'react'

function AnimatedCount({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || animated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1800
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            const current = Math.round(eased * value)
            if (el) el.textContent = current.toLocaleString()
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{value.toLocaleString()}</span>
}

const LEADERBOARD = [
  { rank: '🥇', name: 'riffvalley', medal: true, lessons: 48, acc: 97, pts: 4656 },
  { rank: '🥈', name: 'minorjones', medal: true, lessons: 44, acc: 95, pts: 4180 },
  { rank: '🥉', name: 'capoanne', medal: true, lessons: 41, acc: 94, pts: 3854 },
  { rank: '#4', name: 'you', me: true, lessons: 38, acc: 92, pts: 3496 },
  { rank: '#5', name: 'fretburn', lessons: 36, acc: 90, pts: 3240 },
]

const QUOTES = [
  { text: "I'd given up twice before. Strings is the first thing that actually made my fingers obey.", by: '@sarah_acoustic' },
  { text: 'The chord detection is uncanny. It knew I was muting the B string before I did.', by: '@deadmoth' },
  { text: 'Three weeks in and I played Greensleeves for my mum. She cried. Worth every penny.', by: '@tkstrums' },
]

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="relative z-10 py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-16" data-reveal>
          <h2
            className="font-bold tracking-tight text-[clamp(34px,5vw,56px)] leading-[1.04]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Learning is better with competition.
          </h2>
          <p className="text-lg text-[var(--text-2)] max-w-[56ch] mx-auto mt-4">
            The weekly leaderboard resets every Monday. Score = lessons completed × average accuracy.
          </p>
        </div>

        <div className="max-w-[720px] mx-auto" data-reveal data-delay="100">
          <div
            className="rounded-2xl border p-3.5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 28px 70px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center justify-between px-4 pb-3.5 border-b border-[var(--border)]">
              <span className="font-semibold text-[15px]">This week</span>
              <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>Resets in 3d 14h</span>
            </div>
            {LEADERBOARD.map((row) => (
              <div
                key={row.name}
                className={`flex items-center gap-4 px-4 py-3 rounded-[10px] transition-colors ${row.me ? 'bg-[var(--surface-raised)] border border-[color-mix(in_srgb,_var(--accent)_30%,_transparent)]' : 'hover:bg-white/[0.02]'}`}
              >
                <span className={`w-[26px] text-center font-bold ${row.medal ? 'text-[19px]' : 'text-[15px]'}`}>
                  {row.rank}
                </span>
                <div className="w-[38px] h-[38px] rounded-full grid place-items-center text-[13px] font-semibold text-[#d8ccf5] shrink-0" style={{ background: 'linear-gradient(135deg,#3a2f55,#241d33)' }}>
                  {row.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-medium truncate">
                    {row.name}
                    {row.me && <span className="text-xs text-[var(--text-muted)] ml-1.5">(you)</span>}
                  </div>
                  <div className="text-[11.5px] text-[var(--text-2)] mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                    {row.lessons} lessons · {row.acc}% avg
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[17px] font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                    <AnimatedCount value={row.pts} /> pts
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-7 mt-16" data-reveal data-delay="200">
          {QUOTES.map((q) => (
            <div key={q.by} className="flex flex-col gap-4">
              <p
                className="italic text-[19px] leading-relaxed text-[var(--text)]"
                style={{ fontFamily: 'var(--font-quote)' }}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full grid place-items-center text-[11px] font-semibold text-[#d8ccf5]" style={{ background: 'linear-gradient(135deg,#3a2f55,#241d33)' }}>
                  {q.by[1].toUpperCase()}
                </div>
                <span className="text-[13px] text-[var(--text-2)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {q.by}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
