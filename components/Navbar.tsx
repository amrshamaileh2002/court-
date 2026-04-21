'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { KortnaLogoMark } from './KortnaLogo'

const NAV_LINKS = [
  { href: '/',             labelKey: 'home'       as const },
  { href: '/courts',       labelKey: 'courts'     as const },
  { href: '/how-it-works', labelKey: 'howItWorks' as const },
  { href: '/for-courts',   labelKey: 'forCourts'  as const },
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
        className={`nav-root${scrolled ? ' scrolled' : ''}`}
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none' }}>
              <KortnaLogoMark size={32} />
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 24,
                color: 'white',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}>
                KORTNA
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    position: 'relative',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                >
                  {t(labelKey)}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={toggleLang}
                className="hidden md:flex"
                style={{
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s',
                }}
              >
                {lang === 'en' ? '🇯🇴 AR' : '🇬🇧 EN'}
              </button>

              <button
                onClick={() => window.location.href = '/courts'}
                className="hidden md:inline-flex"
                style={{
                  alignItems: 'center',
                  padding: '10px 22px',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: 'none',
                  background: '#E85A1E',
                  color: 'white',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 16px rgba(232,90,30,0.4)',
                  transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, background 0.2s ease',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = 'translateY(-2px) scale(1.03)'
                  b.style.boxShadow = '0 8px 28px rgba(232,90,30,0.55)'
                  b.style.background = '#F06C30'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = ''
                  b.style.boxShadow = '0 4px 16px rgba(232,90,30,0.4)'
                  b.style.background = '#E85A1E'
                }}
              >
                {t('bookNow')}
              </button>

              {/* Mobile hamburger */}
              <button
                className="flex md:hidden"
                style={{ flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <span style={{ width: 24, height: 2, background: 'white', borderRadius: 2, display: 'block' }} />
                <span style={{ width: 16, height: 2, background: 'rgba(255,255,255,0.6)', borderRadius: 2, display: 'block' }} />
                <span style={{ width: 24, height: 2, background: 'white', borderRadius: 2, display: 'block' }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: 72 }} />

      {/* Mobile overlay */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(18,39,68,0.97)', backdropFilter: 'blur(20px)',
          }}
        >
          <button
            style={{ position: 'absolute', top: 24, right: 24, fontSize: 28, color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            {/* Mobile logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <KortnaLogoMark size={44} />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32, color: 'white', letterSpacing: '0.04em' }}>
                KORTNA
              </span>
            </div>

            {NAV_LINKS.map(({ href, labelKey }, i) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E85A1E')}
                onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                onClick={() => setOpen(false)}
              >
                {t(labelKey)}
              </Link>
            ))}

            <button
              onClick={() => { toggleLang(); setOpen(false) }}
              style={{
                marginTop: 8, padding: '8px 20px', borderRadius: 999,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: '1px solid rgba(232,90,30,0.4)', color: '#E85A1E',
                background: 'none', fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}
            >
              {lang === 'en' ? '🇯🇴 Switch to Arabic' : '🇬🇧 Switch to English'}
            </button>

            <button
              onClick={() => { window.location.href = '/courts'; setOpen(false) }}
              style={{
                padding: '14px 36px', borderRadius: 16,
                fontSize: 16, fontWeight: 800, cursor: 'pointer', border: 'none',
                background: '#E85A1E', color: 'white',
                boxShadow: '0 6px 24px rgba(232,90,30,0.45)',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
              }}
            >
              {t('bookNow')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
