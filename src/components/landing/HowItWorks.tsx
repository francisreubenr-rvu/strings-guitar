'use client'

import React from 'react'

const STEPS = [
  {
    num: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
    ),
    title: 'Point your webcam',
    desc: 'Hold your guitar so the fretting hand is visible. Our AI handles the rest.',
    accent: 'violet',
  },
  {
    num: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
    ),
    title: 'Strum and listen',
    desc: 'Built-in microphone analysis tells you if each string rings true.',
    accent: 'green',
  },
  {
    num: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
    title: 'Level up weekly',
    desc: 'Curated lessons, real songs, and a leaderboard to keep you motivated.',
    accent: 'violet',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-[720px] mb-16">
          <span className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
            How it works
          </span>
          <h2
            className="mt-4 font-bold tracking-tight text-[clamp(34px,5vw,56px)] leading-[1.04]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Three steps to your first song.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="relative p-8 rounded-[14px] border overflow-hidden transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)]"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <span className="absolute top-2 right-[18px] text-[64px] font-bold text-[var(--border)] leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                {s.num}
              </span>
              <div
                className="w-[46px] h-[46px] rounded-[11px] grid place-items-center mb-5"
                style={{
                  background: s.accent === 'green' ? 'color-mix(in srgb, var(--green) 10%, transparent)' : 'var(--accent-faint)',
                  border: s.accent === 'green' ? '1px solid color-mix(in srgb, var(--green) 30%, transparent)' : '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                  color: s.accent === 'green' ? 'var(--green)' : 'var(--accent)',
                }}
              >
                {s.icon}
              </div>
              <h3 className="font-semibold text-[21px] tracking-tight mb-2.5">{s.title}</h3>
              <p className="text-[15.5px] text-[var(--text-2)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
