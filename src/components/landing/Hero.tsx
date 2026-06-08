'use client'

import React from 'react'

function DemoWidget() {
  return (
    <div className="relative flex justify-center">
      <div
        className="absolute -top-[16px] left-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold tracking-[0.04em] text-[var(--green)]"
        style={{
          transform: 'translateX(-50%)',
          background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
          borderColor: 'var(--border)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <span
          className="block w-[7px] h-[7px] rounded-full bg-[var(--green)]"
          style={{ animation: 'livePulse 1.5s ease-in-out infinite' }}
        />
        LIVE
      </div>
      <div
        className="relative w-full max-w-[520px] aspect-[520/380] rounded-2xl border overflow-hidden"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--accent-faint)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'repeating-linear-gradient(115deg, #15131c 0 14px, #181522 14px 28px)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 80% at 45% 45%, transparent 30%, rgba(5,4,9,0.55) 100%)' }}
        />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 380" preserveAspectRatio="xMidYMid slice">
          <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
            <line x1="60" y1="120" x2="380" y2="120"/>
            <line x1="60" y1="150" x2="380" y2="150"/>
            <line x1="60" y1="180" x2="380" y2="180"/>
            <line x1="60" y1="210" x2="380" y2="210"/>
            <line x1="60" y1="240" x2="380" y2="240"/>
            <line x1="60" y1="270" x2="380" y2="270"/>
          </g>
          <g stroke="rgba(255,255,255,0.10)" strokeWidth="1">
            <line x1="60" y1="120" x2="60" y2="270"/>
            <line x1="124" y1="120" x2="124" y2="270"/>
            <line x1="188" y1="120" x2="188" y2="270"/>
            <line x1="252" y1="120" x2="252" y2="270"/>
            <line x1="316" y1="120" x2="316" y2="270"/>
            <line x1="380" y1="120" x2="380" y2="270"/>
          </g>
          <g stroke="var(--accent-soft)" strokeWidth="1.5" strokeDasharray="3 4">
            <line x1="156" y1="180" x2="245" y2="95"/>
            <line x1="156" y1="210" x2="300" y2="320"/>
          </g>
          <circle cx="156" cy="180" r="16" fill="color-mix(in srgb, var(--green) 18%, transparent)" stroke="var(--green)" strokeWidth="2.5"/>
          <text x="156" y="185" fill="var(--green)" fontFamily="'JetBrains Mono',monospace" fontSize="13" fontWeight="700" textAnchor="middle">2</text>
          <circle cx="156" cy="210" r="16" fill="color-mix(in srgb, var(--green) 18%, transparent)" stroke="var(--green)" strokeWidth="2.5"/>
          <text x="156" y="215" fill="var(--green)" fontFamily="'JetBrains Mono',monospace" fontSize="13" fontWeight="700" textAnchor="middle">3</text>
          <g fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5">
            <circle cx="110" cy="150" r="10"/>
            <circle cx="156" cy="180" r="10"/>
            <circle cx="156" cy="210" r="10"/>
            <circle cx="205" cy="244" r="10"/>
            <circle cx="250" cy="268" r="10"/>
          </g>
          <text x="245" y="90" fill="var(--text-2)" fontFamily="'JetBrains Mono',monospace" fontSize="10">A · fret 2</text>
          <text x="262" y="334" fill="var(--text-2)" fontFamily="'JetBrains Mono',monospace" fontSize="10">D · fret 2</text>
        </svg>

        <div className="absolute top-[18px] left-[18px] z-10">
          <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', textShadow: '0 0 18px var(--accent-soft)' }}>
            Em
          </div>
          <div className="text-[10px] font-medium tracking-[0.1em] text-[var(--text-2)]" style={{ fontFamily: 'var(--font-mono)' }}>
            E MINOR
          </div>
        </div>

        <svg className="absolute top-4 right-4 z-10" width="58" height="58" viewBox="0 0 58 58">
          <circle cx="29" cy="29" r="25" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5"/>
          <circle
            cx="29" cy="29" r="25" fill="none" stroke="var(--green)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="157" strokeDashoffset="14" transform="rotate(-90 29 29)"
          />
        </svg>
        <div className="absolute top-4 right-4 z-10 w-[58px] h-[58px] grid place-items-center">
          <span className="text-[15px] font-bold text-[var(--green)]" style={{ fontFamily: 'var(--font-mono)' }}>91%</span>
        </div>

        <div
          className="absolute left-0 right-0 bottom-0 z-10 h-10 flex items-center gap-2.5 px-3.5 border-t"
          style={{
            background: 'linear-gradient(180deg, transparent, var(--bg))',
            borderColor: 'rgba(255,255,255,0.05)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          }}
        >
          <span className="text-[var(--text-2)]">Detected:</span>
          <span className="text-[var(--green)] font-bold">E Minor ✓</span>
          <svg className="ml-auto" width="86" height="22" viewBox="0 0 86 22" fill="none">
            <path
              d="M2 11 L10 11 L14 4 L18 18 L22 7 L26 15 L30 11 L40 11 L44 5 L48 17 L52 9 L56 13 L60 11 L72 11 L76 6 L80 16 L84 11"
              stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            >
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center pt-[120px] pb-20 overflow-hidden">
      <div
        className="absolute right-[-120px] top-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute left-[4%] top-[58%] w-[500px] h-[380px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--cta) 7%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute left-[4%] top-[58%] w-[500px] h-[380px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--cta) 7%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 grid md:grid-cols-[1.05fr_0.95fr] gap-14 items-center w-full">
        <div className="max-w-[620px]">
          <p
            className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Webcam-powered guitar learning
          </p>
          <h1
            className="mt-5 mb-7 font-bold leading-none"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 5.4vw, 76px)', letterSpacing: '-0.04em' }}
          >
            <span className="block">Your fingers</span>
            <span className="block">already know.</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #d8d3e8 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Let them prove it.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-2)] leading-relaxed max-w-[46ch]">
            Turn on your webcam. Play a chord. See exactly where your fingers need to go — in real time.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-9 mb-7">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg text-[15px] font-semibold text-[var(--bg)] transition-all duration-200"
              style={{
                background: 'var(--cta)',
                boxShadow: '0 0 28px color-mix(in srgb, var(--cta) 35%, transparent)',
                animation: 'amberPulse 3s ease-in-out infinite',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--cta-hi)'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 0 40px color-mix(in srgb, var(--cta) 60%, transparent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--cta)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 28px color-mix(in srgb, var(--cta) 35%, transparent)'
              }}
            >
              Start with your webcam
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg text-[15px] font-semibold border transition-all duration-200 text-[var(--text)]"
              style={{ borderColor: 'var(--border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
            >
              Watch it work&nbsp;▶
            </a>
          </div>
          <div className="flex items-center gap-3 text-[13px] text-[var(--text-muted)]">
            <div className="flex">
              {['JR','MK','SA','LB','TN'].map((init, i) => (
                <span
                  key={init}
                  className="w-[26px] h-[26px] rounded-full grid place-items-center text-[10px] font-semibold text-[#cbb9f0]"
                  style={{
                    background: 'linear-gradient(135deg, #3a2f55, #241d33)',
                    border: '2px solid var(--bg)',
                    marginLeft: i === 0 ? 0 : '-8px',
                  }}
                >
                  {init}
                </span>
              ))}
              <span
                className="w-[26px] h-[26px] rounded-full grid place-items-center text-[10px] font-semibold text-[#cbb9f0]"
                style={{
                  background: 'linear-gradient(135deg, #3a2f55, #241d33)',
                  border: '2px solid var(--bg)',
                  marginLeft: '-8px',
                }}
              >
                +
              </span>
            </div>
            <span>47,000 guitarists learning free</span>
          </div>
        </div>

        <DemoWidget />
      </div>
    </section>
  )
}
