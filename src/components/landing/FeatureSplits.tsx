'use client'

import React from 'react'

function VisualCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-[6%] rounded-[24px]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, var(--accent-soft), transparent 70%)', filter: 'blur(36px)' }}
      />
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-250"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: '0 28px 70px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function StatBlock({ num, text, green = false }: { num: React.ReactNode; text: string; green?: boolean }) {
  return (
    <div className="mt-8 flex items-baseline gap-3.5">
      <span
        className="text-[60px] leading-none font-bold tracking-tight"
        style={{
          fontFamily: 'var(--font-display)',
          background: green ? 'none' : 'linear-gradient(180deg, #fff, #c9bdf0)',
          WebkitBackgroundClip: green ? 'initial' : 'text',
          backgroundClip: green ? 'initial' : 'text',
          color: green ? 'var(--green)' : 'transparent',
        }}
      >
        {num}
      </span>
      <span className="text-[13px] leading-snug text-[var(--text-2)] max-w-[18ch]" style={{ fontFamily: 'var(--font-mono)' }}>
        {text}
      </span>
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
      {children}
    </span>
  )
}

export default function FeatureSplits() {
  return (
    <section className="relative z-10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-[88px]">
        {/* Feature 1 — Real-Time Finger Overlay */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-[72px] items-center py-[88px]" data-reveal="left">
          <VisualCard>
            <div className="relative aspect-video bg-[#15131c] overflow-hidden" style={{ background: 'repeating-linear-gradient(115deg,#15131c 0 14px,#181522 14px 28px)' }}>
              <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full">
                {/* Horizontal fret lines */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`fret-${i}`} x1="40" y1={40 + i * 36} x2="560" y2={40 + i * 36} stroke="var(--border)" strokeWidth="1" />
                ))}
                {/* Vertical string lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`string-${i}`} x1={70 + i * 80} y1="28" x2={70 + i * 80} y2="280" stroke="var(--border)" strokeWidth="1" />
                ))}
                {/* Target circles */}
                <circle cx="230" cy="130" r="22" stroke="var(--green)" strokeWidth="2" fill="none" />
                <text x="230" y="136" textAnchor="middle" fill="var(--green)" fontSize="18" fontFamily="var(--font-mono)" fontWeight={700}>2</text>
                <circle cx="310" cy="212" r="22" stroke="var(--green)" strokeWidth="2" fill="none" />
                <text x="310" y="218" textAnchor="middle" fill="var(--green)" fontSize="18" fontFamily="var(--font-mono)" fontWeight={700}>3</text>
                {/* Tracked fingertips */}
                <circle cx="235" cy="125" r="8" fill="var(--accent)" opacity="0.85" />
                <circle cx="305" cy="218" r="8" fill="var(--accent)" opacity="0.85" />
                <circle cx="155" cy="255" r="7" fill="var(--accent)" opacity="0.6" />
                <circle cx="480" cy="200" r="7" fill="var(--accent)" opacity="0.6" />
                {/* Dashed guide line */}
                <line x1="160" y1="120" x2="320" y2="210" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
              </svg>
              <div
                className="absolute top-4 left-4 text-[11px] text-[var(--text-2)] px-2.5 py-1 rounded-md border"
                style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                21 landmarks tracked
              </div>
            </div>
          </VisualCard>
          <div>
            <Eyebrow>WEBCAM TRACKING</Eyebrow>
            <h3
              className="mt-4 mb-5 font-bold tracking-tight text-[clamp(30px,3.6vw,44px)] leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              See every finger. Fix every mistake.
            </h3>
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed max-w-[46ch]">
              MediaPipe AI tracks 21 hand landmarks in real time. The fretboard overlay highlights exactly which fingers land where — so you can correct posture before it becomes a bad habit.
            </p>
            <StatBlock num="< 50ms" text="detection latency" />
          </div>
        </div>

        {/* Feature 2 — Chord Recognition */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-[72px] items-center py-[88px]">
          <div className="order-2 md:order-1" data-reveal="left">
            <Eyebrow>LIVE AUDIO ANALYSIS</Eyebrow>
            <h3
              className="mt-4 mb-5 font-bold tracking-tight text-[clamp(30px,3.6vw,44px)] leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The app hears what you play.
            </h3>
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed max-w-[46ch]">
              Every chord you strum is analysed locally — no cloud, no uploads. Get instant feedback on whether you nailed the fingering or need to press harder on that G string.
            </p>
            <StatBlock num={<>100%<br /></>} text="client-side · your audio never leaves your browser" green />
          </div>
          <VisualCard>
            <div className="p-6" data-reveal="right">
              <div className="h-[120px] bg-[var(--bg)] rounded-[10px] border border-[var(--border)] grid place-items-center overflow-hidden">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                  <path
                    d="M0 80 Q20 30 40 50 T80 40 T120 55 T160 35 T200 45 T240 25 T280 50 T320 30 T360 40 T400 20 V90 H0 Z"
                    fill="color-mix(in srgb, var(--accent) 25%, transparent)"
                  />
                  <path
                    d="M0 80 Q20 30 40 50 T80 40 T120 55 T160 35 T200 45 T240 25 T280 50 T320 30 T360 40 T400 20"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line x1="0" y1="77" x2="400" y2="77" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                </svg>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="text-[40px] font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  A
                </div>
                <div className="flex flex-col gap-2 w-[200px]">
                  {[
                    { label: 'A', pct: 96, lead: true },
                    { label: 'Am', pct: 3, lead: false },
                    { label: 'Asus2', pct: 1, lead: false },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-2.5" style={{ fontFamily: 'var(--font-mono)' }}>
                      <span className="w-7 text-xs text-[var(--text)]">{c.label}</span>
                      <div className="flex-1 h-[5px] bg-[var(--surface)] rounded-[3px] overflow-hidden">
                        <span className="block h-full rounded-[3px]" style={{ width: `${c.pct}%`, background: c.lead ? 'var(--green)' : 'var(--accent)' }} />
                      </div>
                      <span className="text-[11px] text-[var(--text-2)]">{c.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-5 text-[13px]" style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="text-[var(--green)] font-bold">DETECTED</span>
                <span className="text-[var(--text-2)]" style={{ fontFamily: 'var(--font-ui)' }}>A major · 440 Hz</span>
                <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
            </div>
          </VisualCard>
        </div>

        {/* Feature 3 — Chromatic Tuner */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-[72px] items-center py-[88px]" data-reveal="left">
          <VisualCard>
            <div className="py-8 px-6 flex flex-col items-center gap-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-2)]" style={{ fontFamily: 'var(--font-mono)' }}>
                Chromatic Tuner
              </span>
              <span className="text-[88px] leading-none font-bold text-[var(--green)]" style={{ fontFamily: 'var(--font-display)' }}>
                A
              </span>
              <div className="w-full">
                <div className="relative h-2.5 bg-[var(--surface)] rounded-md overflow-hidden">
                  <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white/20" />
                  <div className="absolute top-[2px] h-[6px] w-[18px] rounded bg-[var(--green)]" style={{ left: '48%' }} />
                </div>
                <div className="flex justify-between mt-2 text-[11px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span>-50¢</span>
                  <span className="text-[var(--green)] font-semibold">0¢</span>
                  <span>+50¢</span>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 w-full">
                {[
                  { note: 'E', oct: '2', active: false },
                  { note: 'A', oct: '2', active: true },
                  { note: 'D', oct: '3', active: false },
                  { note: 'G', oct: '3', active: false },
                  { note: 'B', oct: '3', active: false },
                  { note: 'e', oct: '4', active: false },
                ].map((s) => (
                  <div key={s.note} className={`flex flex-col items-center gap-1 ${s.active ? 'active' : ''}`}>
                    <div
                      className="w-[34px] h-[34px] rounded-full grid place-items-center text-[13px] font-bold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        border: s.active ? '2px solid var(--green)' : '2px solid var(--border)',
                        background: s.active ? 'color-mix(in srgb, var(--green) 10%, transparent)' : 'transparent',
                        color: s.active ? 'var(--green)' : 'var(--text-2)',
                      }}
                    >
                      {s.note}
                    </div>
                    <span className="text-[9px] text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {s.oct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </VisualCard>
          <div data-reveal="right">
            <Eyebrow>BUILT-IN TUNER</Eyebrow>
            <h3
              className="mt-4 mb-5 font-bold tracking-tight text-[clamp(30px,3.6vw,44px)] leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Always in tune. Always.
            </h3>
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed max-w-[46ch]">
              The chromatic tuner gives cent-accurate pitch for every string — no external hardware needed. Just pluck, watch the needle, and dial in.
            </p>
            <StatBlock num="±1¢" text="tuning accuracy" />
          </div>
        </div>
      </div>
    </section>
  )
}
