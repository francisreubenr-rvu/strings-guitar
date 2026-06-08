'use client'

import React from 'react'

const FREE_FEATURES = [
  'First 5 beginner lessons',
  'Real-time webcam tracking',
  'Built-in chromatic tuner',
  'Song library (5 public domain songs)',
  'Community leaderboard',
]

const PRO_FEATURES = [
  'Everything in Free, plus',
  'Full curriculum (Beginner → Advanced)',
  'Unlimited song library',
  'Weekly leaderboard prizes',
  'AI practice tutor & feedback',
  'Priority support',
]

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-[3px]">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-14" data-reveal>
          <h2
            className="font-bold tracking-tight text-[clamp(34px,5vw,56px)] leading-[1.04]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Free to start. Seriously.
          </h2>
        </div>

        <div className="grid md:grid-cols-[repeat(2,minmax(0,380px))] gap-7 justify-center">
          {/* Free */}
          <div
            className="rounded-[18px] border p-[34px_30px]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal
            data-delay="100"
          >
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border"
              style={{ color: 'var(--text-2)', background: 'var(--surface-raised)', borderColor: 'var(--border)' }}
            >
              FREE
            </span>
            <div className="mt-5 mb-1 font-bold text-[60px] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              $0
            </div>
            <p className="text-sm text-[var(--text-2)] min-h-[22px]" />
            <ul className="flex flex-col gap-3.5 my-7">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] text-[var(--text)]">
                  <CheckMark />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/signup"
              className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-lg text-[15px] font-semibold border transition-all duration-200"
              style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-faint)'
                e.currentTarget.style.boxShadow = '0 0 24px var(--accent-faint)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>

          {/* Pro */}
          <div
            className="rounded-[18px] border-2 p-[34px_30px] relative"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--accent)',
              boxShadow: '0 0 40px var(--accent-soft)',
            }}
            data-reveal
            data-delay="200"
          >
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md"
              style={{ color: 'var(--cta)', background: 'var(--accent)' }}
            >
              PRO
            </span>
            <div className="mt-5 mb-1 font-bold text-[60px] tracking-tight flex items-baseline gap-1.5" style={{ fontFamily: 'var(--font-display)' }}>
              $9 <span className="text-lg font-medium text-[var(--text-2)]" style={{ fontFamily: 'var(--font-ui)' }}>/ month</span>
            </div>
            <p className="text-sm text-[var(--text-2)]">Everything in Free, plus</p>
            <ul className="flex flex-col gap-3.5 my-7">
              {PRO_FEATURES.map((f, i) => (
                <li key={f} className={`flex items-start gap-2.5 text-[15px] ${i === 0 ? 'text-[var(--text-2)] uppercase text-xs tracking-wider font-mono' : 'text-[var(--text)]'}`}>
                  {i === 0 ? null : <CheckMark />}
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/signup?plan=pro"
              className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-lg text-[15px] font-semibold text-[var(--bg)] transition-all duration-200"
              style={{
                background: 'var(--cta)',
                boxShadow: '0 0 28px var(--cta-glow)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 0 40px var(--cta-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 28px var(--cta-glow)'
              }}
            >
              Upgrade to Pro
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
