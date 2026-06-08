'use client'

import { useState } from 'react'
import { useNavScroll } from '@/hooks/useNavScroll'
import { useTheme } from '@/components/theme/ThemeProvider'

const NAV_LINKS = [
  { label: 'Learn', href: '#how-it-works' },
  { label: 'Songs', href: '#songs' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navigation() {
  const scrolled = useNavScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[60px] px-5 md:px-10 transition-all duration-250"
      style={{
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 80%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <a href="#" className="inline-flex items-center gap-2.5 font-bold text-xl tracking-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-ui), ui-sans-serif, system-ui, sans-serif' }}>
        <span>Strings</span>
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
      </a>

      <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: 'var(--font-ui), ui-sans-serif, system-ui, sans-serif' }}>
        {NAV_LINKS.map((l) => (
          <a key={l.label} href={l.href} className="text-sm font-medium text-[var(--text-2)] hover:text-[var(--text)] transition-colors duration-150">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3.5">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-md border transition-colors duration-200 hover:opacity-80"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'transparent' }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        <a href="/login" className="hidden md:inline-flex text-sm font-medium text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
          Sign in
        </a>

        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          )}
        </button>

        <a
          href="/signup"
          className="inline-flex items-center gap-1.5 h-[38px] px-4 rounded-lg text-sm font-semibold text-[var(--bg)] bg-[var(--cta)] shadow-[0_0_28px_var(--cta-glow)] hover:brightness-110 transition-all"
          style={{ fontFamily: 'var(--font-ui), ui-sans-serif, system-ui, sans-serif' }}
        >
          Start free
          <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>

      {menuOpen && (
        <>
          <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div
            className="md:hidden absolute top-full left-0 right-0 z-50 border-b px-5 py-6 flex flex-col gap-4"
            style={{
              background: 'color-mix(in srgb, var(--bg) 96%, transparent)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium hover:text-[var(--text)] transition-colors duration-150"
                style={{ color: 'var(--text-2)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium hover:text-[var(--text)] transition-colors duration-150"
              style={{ color: 'var(--text-2)' }}
            >
              Sign in
            </a>
          </div>
        </>
      )}
    </header>
  )
}
