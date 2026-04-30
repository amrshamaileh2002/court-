'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/context/LanguageContext'
import { KortnaLogoMark } from './KortnaLogo'

const NAV_LINKS = [
  { href: '/',        en: 'Home',    ar: 'الرئيسية' },
  { href: '/courts',  en: 'Book',    ar: 'احجز' },
  { href: '/match',   en: 'Match',   ar: 'تطابق' },
  { href: '/deals',   en: 'Deals ⚡', ar: 'عروض ⚡' },
  { href: '/rewards', en: 'Rewards', ar: 'مكافآت' },
]

export default function Navbar() {
  const { lang, toggleLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isAr = lang === 'ar'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

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
                fontWeight: 900, fontSize: 24, color: 'white',
                letterSpacing: '0.04em', lineHeight: 1,
              }}>
                KORTNA
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
              {NAV_LINKS.map(({ href, en, ar }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      position: 'relative',
                      padding: '6px 14px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: active ? 700 : 500,
                      color: active ? '#E2FF67' : 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                      transition: 'color 0.2s, background 0.2s',
                      background: active ? 'rgba(226,255,103,0.08)' : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.color = 'white'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {isAr ? ar : en}
                  </Link>
                )
              })}
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={toggleLang}
                className="hidden md:flex"
                style={{
                  alignItems: 'center', gap: 6,
                  padding: '7px 12px', borderRadius: 999,
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(226,255,103,0.4)'; e.currentTarget.style.color = '#E2FF67' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
              >
                {lang === 'en' ? '🇯🇴 AR' : '🇬🇧 EN'}
              </button>

              <button
                onClick={() => window.location.href = '/courts'}
                className="hidden md:inline-flex"
                style={{
                  alignItems: 'center', padding: '9px 20px', borderRadius: 12,
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', border: 'none',
                  background: '#E2FF67', color: '#122744',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  boxShadow: '0 4px 16px rgba(226,255,103,0.3)',
                  transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = 'translateY(-2px) scale(1.03)'
                  b.style.boxShadow = '0 8px 28px rgba(226,255,103,0.45)'
                  b.style.filter = 'brightness(1.05)'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = ''
                  b.style.boxShadow = '0 4px 16px rgba(226,255,103,0.3)'
                  b.style.filter = ''
                }}
              >
                {isAr ? 'احجز الآن' : 'Book Now'}
              </button>

              {/* Hamburger */}
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
            background: 'rgba(10,22,40,0.98)', backdropFilter: 'blur(20px)',
          }}
        >
          <button
            style={{ position: 'absolute', top: 24, right: 24, fontSize: 28, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <KortnaLogoMark size={44} />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32, color: 'white', letterSpacing: '0.04em' }}>
                KORTNA
              </span>
            </div>

            {NAV_LINKS.map(({ href, en, ar }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: isActive(href) ? '#E2FF67' : 'white',
                  textDecoration: 'none',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                  letterSpacing: '0.02em',
                }}
                onClick={() => setOpen(false)}
              >
                {isAr ? ar : en}
              </Link>
            ))}

            <button
              onClick={() => { toggleLang(); setOpen(false) }}
              style={{
                marginTop: 4, padding: '8px 20px', borderRadius: 999,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: '1px solid rgba(226,255,103,0.3)', color: '#E2FF67',
                background: 'rgba(226,255,103,0.06)',
              }}
            >
              {lang === 'en' ? '🇯🇴 Switch to Arabic' : '🇬🇧 Switch to English'}
            </button>

            <button
              onClick={() => { window.location.href = '/courts'; setOpen(false) }}
              style={{
                padding: '14px 40px', borderRadius: 14,
                fontSize: 16, fontWeight: 800, cursor: 'pointer', border: 'none',
                background: '#E2FF67', color: '#122744',
                boxShadow: '0 6px 24px rgba(226,255,103,0.35)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                fontFamily: 'Barlow Condensed, sans-serif',
              }}
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
