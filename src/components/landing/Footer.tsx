'use client'

import React from 'react'

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-[14.5px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors duration-150 block mb-2.5">
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t py-16 pb-8" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-10">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-2.5 font-bold text-xl tracking-tight text-[var(--text)] mb-4" style={{ fontFamily: 'var(--font-ui)' }}>
              <span>Strings</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
            </div>
            <p className="text-[14.5px] text-[var(--text-2)] leading-relaxed max-w-[30ch]">
              Learn guitar with real-time AI guidance.{' '}
              <span className="text-[var(--accent)]">Built with love.</span>
            </p>
          </div>

          {/* Learn */}
          <FooterCol title="Learn">
            <FooterLink href="/dashboard">Dashboard</FooterLink>
            <FooterLink href="/songs">Songs</FooterLink>
            <FooterLink href="/leaderboard">Leaderboard</FooterLink>
            <FooterLink href="/profile">Profile</FooterLink>
          </FooterCol>

          {/* Legal */}
          <FooterCol title="Legal">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterCol>

          {/* Device */}
          <FooterCol title="On your device">
            <p className="text-[14px] text-[var(--text-2)] leading-relaxed">
              All audio and video processing happens entirely in your browser.
              Nothing is uploaded to the cloud. We literally can&apos;t hear you practise.
            </p>
          </FooterCol>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center mt-14 pt-6 border-t gap-2.5"
          style={{ borderColor: 'var(--border)', fontFamily: 'var(--font-mono)' }}
        >
          <span className="text-[13px] text-[var(--text-muted)]">© 2026 Strings</span>
          <span className="text-[13px] text-[var(--text-muted)]">All songs are public domain</span>
        </div>
      </div>
    </footer>
  )
}
