'use client'

import React from 'react'
import Link from 'next/link'

export default function CurriculumBento() {
  return (
    <section className="relative z-10 py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-[720px] mb-16" data-reveal>
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
            The curriculum
          </p>
          <h2 className="mt-4 font-bold tracking-tight leading-[1.04]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 56px)' }}>
            From your first Em chord<br/>to jazz voicings.
          </h2>
          <p className="mt-4 text-[18px] text-[var(--text-2)] max-w-[56ch]">
            27 chapters. 135 lessons. Sequenced the way pros actually teach — every lesson builds on the last.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-[18px]">
          {/* Beginner — large cell, spans 2 cols */}
          <Link
            href="/learn"
            className="md:col-span-2 rounded-[14px] border p-[26px] flex flex-col overflow-hidden transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)] group"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal data-delay="0"
          >
            <span className="inline-flex items-center gap-1.5 mb-4 text-[11px] uppercase tracking-[0.1em] text-[var(--cta)]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="w-2 h-2 rounded-sm bg-[var(--cta)]"/> Beginner
            </span>
            <h3 className="font-semibold text-[19px] mb-1">First chords &amp; rhythm</h3>
            <div className="mt-auto flex flex-col gap-3">
              {[
                { name: '01 · First open chords', pct: '100%', cnt: '6 / 6' },
                { name: '02 · Switching cleanly', pct: '60%', cnt: '3 / 5' },
                { name: '03 · Strumming patterns', pct: '14%', cnt: '1 / 7' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3.5">
                  <span className="text-sm text-[var(--text)] w-[200px] shrink-0 group-hover:text-[var(--text)]">{c.name}</span>
                  <div className="flex-1 h-[5px] bg-[var(--bg)] rounded-[3px] overflow-hidden">
                    <span className="block h-full rounded-[3px] bg-[var(--cta)]" style={{ width: c.pct }} />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] w-[52px] text-right" style={{ fontFamily: 'var(--font-mono)' }}>{c.cnt}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 flex items-center gap-1.5 text-[13px] font-semibold" style={{ borderTop: '1px solid var(--border)', color: 'var(--cta)' }}>
              Start Learning
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </Link>

          {/* Intermediate */}
          <div
            className="rounded-[14px] border p-[26px] flex flex-col overflow-hidden transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal data-delay="80"
          >
            <span className="inline-flex items-center gap-1.5 mb-4 text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="w-2 h-2 rounded-sm bg-[var(--accent)]"/> Intermediate
            </span>
            <h3 className="font-semibold text-[19px] mb-1">Barre &amp; blues</h3>
            <p className="text-[13.5px] text-[var(--text-2)]">Barre chords, the blues shuffle, pentatonic scales, and fingerpicking fundamentals.</p>
          </div>

          {/* Advanced */}
          <div
            className="rounded-[14px] border p-[26px] flex flex-col overflow-hidden relative transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal data-delay="160"
          >
            <div className="absolute right-[-40px] bottom-[-40px] w-[140px] h-[140px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,122,195,0.2), transparent 70%)' }} />
            <span className="relative inline-flex items-center gap-1.5 mb-4 text-[11px] uppercase tracking-[0.1em] text-[#c9a7ff]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="w-2 h-2 rounded-sm" style={{ background: 'linear-gradient(135deg, var(--accent), #ff7ac3)' }}/> Advanced
            </span>
            <h3 className="relative font-semibold text-[19px] mb-1">Jazz &amp; modes</h3>
            <p className="relative text-[13.5px] text-[var(--text-2)]">Extended voicings, modal theory, improvisation, and original composition.</p>
          </div>

          {/* Stat — 135 lessons */}
          <div
            className="rounded-[14px] border p-[26px] flex flex-col justify-center overflow-hidden transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal data-delay="60"
          >
            <span className="text-[76px] leading-[0.9] font-bold tracking-[-0.03em] text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>135</span>
            <span className="text-xs text-[var(--text-2)] mt-2.5 uppercase tracking-[0.06em]" style={{ fontFamily: 'var(--font-mono)' }}>lessons</span>
          </div>

          {/* Stat — 27 chapters */}
          <div
            className="rounded-[14px] border p-[26px] flex flex-col justify-center overflow-hidden transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal data-delay="140"
          >
            <span className="text-[76px] leading-[0.9] font-bold tracking-[-0.03em] text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>27</span>
            <span className="text-xs text-[var(--text-2)] mt-2.5 uppercase tracking-[0.06em]" style={{ fontFamily: 'var(--font-mono)' }}>chapters</span>
          </div>

          {/* Pace */}
          <div
            className="rounded-[14px] border p-[26px] flex flex-col overflow-hidden transition-all duration-250 hover:border-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-faint)]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            data-reveal data-delay="200"
          >
            <span className="inline-flex items-center gap-1.5 mb-4 text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="w-2 h-2 rounded-sm bg-[var(--accent)]"/> Pace
            </span>
            <h3 className="font-semibold text-[19px] mb-1">Built on research</h3>
            <p className="text-[13.5px] text-[var(--text-2)]">Sequenced from JustinGuitar, Fender Play, and Guitar Tricks — no skipped fundamentals.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
