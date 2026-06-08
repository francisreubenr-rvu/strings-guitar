'use client'

import React from 'react'

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-[130px] text-center border-y overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div
        className="absolute left-1/2 top-[-10%] w-[1000px] h-[600px] pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, var(--accent-soft) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-[1] max-w-[660px] mx-auto px-5">
        <h2
          className="font-bold tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          Your first chord is 5 minutes away.
        </h2>
        <p className="text-[19px] text-[var(--text-2)] mt-5 mb-9 max-w-[46ch] mx-auto">
          Pick up your guitar, open your browser, and let the camera show you exactly where to press.
        </p>
        <a
          href="/signup"
          className="inline-flex items-center gap-2 h-14 px-8 rounded-lg text-base font-semibold text-[var(--bg)] transition-all duration-200"
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
          Start with your webcam
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
        <p className="mt-7 text-[13px] text-[var(--text-muted)] leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
          No downloads. No sign-up required to try.<br />
          Your webcam feed is processed entirely on your device.
        </p>
      </div>
    </section>
  )
}
