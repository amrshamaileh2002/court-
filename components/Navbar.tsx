'use client'
import { useState, useEffect } from 'react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAr = lang === 'ar'

  return (
    <>
      <nav
        className={`nav-root w-full ${scrolled ? 'scrolled' : ''}`}
        style={{
          background: scrolled ? undefined : 'transparent',
          position: 'fixed',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm transition-all group-hover:scale-110"
                style={{
                  background: '#E2FF67',
                  color: '#122744',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                K
              </div>
              <span
                className="font-barlow-cond font-black text-2xl tracking-tight text-white"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                KORTNA
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
                  style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                >
                  {t(labelKey)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: '#E2FF67' }} />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {lang === 'en' ? '🇯🇴 AR' : '🇬🇧 EN'}
              </button>

              <MagneticButton
                onClick={() => window.location.href = '/courts'}
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-2xl text-sm font-bold"
                style={{ background: '#E2FF67', color: '#122744' } as React.CSSProperties}
              >
                {t('bookNow')}
              </MagneticButton>

              {/* Mobile hamburger */}
              <button
                className="flex md:hidden flex-col gap-1.5 p-2"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <span className="w-6 h-0.5 rounded" style={{ background: 'white' }} />
                <span className="w-4 h-0.5 rounded" style={{ background: 'rgba(255,255,255,0.6)' }} />
                <span className="w-6 h-0.5 rounded" style={{ background: 'white' }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center"
          style={{ background: 'rgba(18,39,68,0.97)', backdropFilter: 'blur(20px)' }}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base" style={{ background: '#E2FF67', color: '#122744', fontFamily: 'Barlow Condensed, sans-serif' }}>K</div>
              <span className="font-barlow-cond font-black text-3xl text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>KORTNA</span>
            </div>

            {NAV_LINKS.map(({ href, labelKey }, i) => (
              <Link
                key={href}
                href={href}
                className="font-barlow-cond font-black text-4xl tracking-wide transition-colors hover:text-[#E2FF67]"
                style={{
                  color: 'white',
                  animationDelay: `${i * 60}ms`,
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                }}
                onClick={() => setOpen(false)}
              >
                {t(labelKey)}
              </Link>
            ))}

            <button
              onClick={() => { toggleLang(); setOpen(false) }}
              className="mt-4 px-6 py-2 rounded-full text-sm font-semibold"
              style={{ border: '1px solid rgba(226,255,103,0.4)', color: '#E2FF67' }}
            >
              {lang === 'en' ? '🇯🇴 Switch to Arabic' : '🇬🇧 Switch to English'}
            </button>

            <MagneticButton
              onClick={() => { window.location.href = '/courts'; setOpen(false) }}
              className="px-8 py-3 rounded-2xl text-sm font-bold"
              style={{ background: '#E2FF67', color: '#122744' } as React.CSSProperties}
            >
              {t('bookNow')}
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  )
}
