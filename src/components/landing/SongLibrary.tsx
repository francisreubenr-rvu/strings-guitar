'use client'

import React from 'react'
import Link from 'next/link'

const SONGS = [
  { title: 'Greensleeves', composer: 'Traditional English', diff: 'beginner', week: true, chords: ['Am','G','E','F'], tint: 'tint-1' },
  { title: 'Scarborough Fair', composer: 'Traditional', diff: 'beginner', chords: ['Am','G','C','D'], tint: 'tint-2' },
  { title: 'Canon in D', composer: 'Johann Pachelbel', diff: 'intermediate', chords: ['D','A','Bm','G'], tint: 'tint-4' },
  { title: 'Ode to Joy', composer: 'Ludwig van Beethoven', diff: 'beginner', week: true, chords: ['C','G','F','Am'], tint: 'tint-6' },
  { title: 'Bourrée in E minor', composer: 'J.S. Bach', diff: 'intermediate', chords: ['Em','B7','Am'], tint: 'tint-5' },
  { title: 'Asturias', composer: 'Isaac Albéniz', diff: 'advanced', chords: ['Em','Dm','C','B7'], tint: 'tint-3' },
  { title: 'Auld Lang Syne', composer: 'Traditional Scottish', diff: 'beginner', chords: ['G','C','D','Em'], tint: 'tint-2' },
]

const DIFF_STYLES: Record<string, { color: string; border: string; bg: string }> = {
  beginner: { color: 'var(--green)', border: 'color-mix(in srgb, var(--green) 40%, transparent)', bg: 'color-mix(in srgb, var(--green) 8%, transparent)' },
  intermediate: { color: 'var(--accent)', border: 'color-mix(in srgb, var(--accent) 40%, transparent)', bg: 'color-mix(in srgb, var(--accent) 10%, transparent)' },
  advanced: { color: '#ff7ac3', border: 'color-mix(in srgb, #ff7ac3 40%, transparent)', bg: 'color-mix(in srgb, #ff7ac3 10%, transparent)' },
}

const TINTS: Record<string, string> = {
  'tint-1': 'linear-gradient(160deg, #1b1530, #0d0b14)',
  'tint-2': 'linear-gradient(160deg, #102016, #0b0f0c)',
  'tint-3': 'linear-gradient(160deg, #201018, #14090f)',
  'tint-4': 'linear-gradient(160deg, #161526, #0c0c14)',
  'tint-5': 'linear-gradient(160deg, #1a1726, #0e0d15)',
  'tint-6': 'linear-gradient(160deg, #131a22, #0a0e12)',
}

function SongCard({ s }: { s: typeof SONGS[0] }) {
  const ds = DIFF_STYLES[s.diff]

  return (
    <Link
      href="/songs"
      className="group flex-shrink-0 w-[220px] h-[300px] rounded-[14px] border overflow-hidden relative flex flex-col justify-end p-5 select-none snap-start transition-all duration-200 hover:scale-[1.04] hover:border-[var(--accent)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
      style={{ background: TINTS[s.tint], borderColor: 'var(--border)' }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 10px, transparent 10px 20px)' }}
      />
      <div className="relative z-[1]">
        <span
          className="absolute top-0 right-0 translate-x-0 -translate-y-0 text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded-[5px] border"
          style={{ color: ds.color, borderColor: ds.border, background: ds.bg, fontFamily: 'var(--font-mono)' }}
        >
          {s.diff}
        </span>
        {s.week && (
          <span className="absolute top-0 left-0 translate-x-0 -translate-y-0 text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-[5px] bg-[var(--cta)] text-[var(--bg)]" style={{ fontFamily: 'var(--font-mono)' }}>
            THIS WEEK
          </span>
        )}
        <h3 className="font-bold text-lg leading-tight mt-8">{s.title}</h3>
        <p className="text-[13px] text-[var(--text-2)] mt-1">{s.composer}</p>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {s.chords.map((ch) => (
            <span key={ch} className="text-[10px] text-[var(--text-2)] bg-[var(--surface-raised)] border border-[var(--border)] px-[7px] py-[3px] rounded-[5px]" style={{ fontFamily: 'var(--font-mono)' }}>
              {ch}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 mt-3.5 text-[13px] font-semibold text-[var(--cta)] opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          Learn
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </Link>
  )
}

export default function SongLibrary() {
  return (
    <section id="songs" className="relative z-10 py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10" data-reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
              Songs to learn
            </p>
            <h2 className="mt-4 font-bold tracking-tight leading-[1.04]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 56px)' }}>
              Real songs. No copyright issues.
            </h2>
            <p className="mt-4 text-[18px] text-[var(--text-2)] max-w-[56ch]">
              Public domain classics — from Greensleeves to Bach. New songs added every Monday.
            </p>
          </div>
          <Link href="/songs" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--accent)] hover:underline underline-offset-[3px] shrink-0">
            View all songs →
          </Link>
        </div>
      </div>

      <div
        className="flex gap-[18px] overflow-x-auto px-5 md:px-10 pb-6 snap-x snap-mandatory cursor-grab"
        style={{ scrollbarWidth: 'none' }}
        data-reveal data-delay="80"
      >
        {SONGS.map((s) => (
          <SongCard key={s.title} s={s} />
        ))}
      </div>
    </section>
  )
}
