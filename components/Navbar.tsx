'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import MagneticButton from './MagneticButton'

const NAV_LINKS = [
  { href: '/',             labelKey: 'home' as const },
  { href: '/courts',       labelKey: 'courts' as const },
  { href: '/how-it-works', labelKey: 'howItWorks' as const },
  { href: '/for-courts',   labelKey: 'forCourts' as const },
]

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav-root w-full" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <span className="pulse-dot" />
              <span className="font-bebas text-2xl tracking-widest"
                style={{ color: 'var(--gold)' }}>
                LA3EBEH ARENA
              </span>
            </Link>

            {/* Desktop links */}
            <div className="nav-links-desktop hidden md:flex items-center gap-7">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Link key={href} href={href}
                  className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group">
                  {t(labelKey)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button onClick={toggleLang}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white',
                         background: 'rgba(255,255,255,0.06)' }}>
                {lang === 'en' ? '🇯🇴 AR' : '🇬🇧 EN'}
              </button>

              <MagneticButton
                onClick={() => window.location.href = '/waitlist'}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
                style={{ background: 'var(--gold)', color: 'var(--navy)' } as React.CSSProperties}>
                {t('joinWaitlist')}
              </MagneticButton>

              {/* Mobile hamburger */}
              <button className="nav-mobile-btn flex md:hidden flex-col gap-1.5 p-2"
                onClick={() => setOpen(true)} aria-label="Open menu">
                <span className="w-6 h-0.5 bg-white rounded" />
                <span className="w-4 h-0.5 bg-white rounded" />
                <span className="w-6 h-0.5 bg-white rounded" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-nav-overlay ${open ? 'open' : ''}`}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setOpen(false)}>✕</button>
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ href, labelKey }, i) => (
            <Link key={href} href={href}
              className="font-bebas text-4xl tracking-wider"
              style={{ color: 'var(--gold)', animationDelay: `${i * 60}ms` }}
              onClick={() => setOpen(false)}>
              {t(labelKey)}
            </Link>
          ))}
          <button onClick={() => { toggleLang(); setOpen(false) }}
            className="mt-4 px-6 py-2 rounded-full border text-white text-sm font-semibold"
            style={{ borderColor: 'var(--gold)' }}>
            {lang === 'en' ? '🇯🇴 Switch to Arabic' : '🇬🇧 Switch to English'}
          </button>
          <MagneticButton
            onClick={() => { window.location.href = '/waitlist'; setOpen(false) }}
            className="px-8 py-3 rounded-full text-sm font-bold"
            style={{ background: 'var(--gold)', color: 'var(--navy)' } as React.CSSProperties}>
            {t('joinWaitlist')}
          </MagneticButton>
        </div>
      </div>
    </>
  )
}
