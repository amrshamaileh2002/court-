'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/context/LanguageContext'
import KortnaButton from './KortnaButton'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="hero-canvas" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #06101f 100%)' }} />
  ),
})

export default function KortnaHero() {
  const { t, lang } = useLang()
  const [visible, setVisible] = useState(false)
  const isAr = lang === 'ar'

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #0A1628 0%, #0d1f3e 40%, #080f1e 100%)',
      }}
    >
      {/* 3D canvas */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.45 }}>
        <HeroScene />
      </div>

      {/* Orange radial spotlight */}
      <div style={{
        position: 'absolute',
        top: '15%', left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse, rgba(232,90,30,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, background: 'linear-gradient(to top, #0A1628, transparent)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, rgba(10,22,40,0.8), transparent)' }} />
      </div>

      {/* Dot grid */}
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }} />

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '96px 24px 80px',
        maxWidth: 1200, margin: '0 auto', width: '100%',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 18px', borderRadius: 999,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          background: 'rgba(232,90,30,0.12)',
          border: '1px solid rgba(232,90,30,0.3)',
          color: '#F87C3F',
          backdropFilter: 'blur(12px)',
          marginBottom: 40,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E85A1E', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          {isAr ? 'إطلاق قريب · الأردن 2026' : 'Launching Soon · Jordan 2026'}
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(56px, 11vw, 128px)',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
          fontWeight: 900,
          lineHeight: 0.92,
          letterSpacing: isAr ? '-0.01em' : '-0.03em',
          color: 'white',
          marginBottom: '1.5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          {isAr ? (
            <>لعبتك،<br /><span style={{ background: 'linear-gradient(135deg, #E85A1E, #F87C3F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ملعبنا</span></>
          ) : (
            <>YOUR GAME,<br /><span style={{ background: 'linear-gradient(135deg, #E85A1E, #F87C3F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>OUR COURT</span></>
          )}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 19px)',
          color: 'rgba(235,235,225,0.6)',
          maxWidth: 500,
          lineHeight: 1.7,
          marginBottom: '3rem',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
          fontWeight: 400,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s',
        }}>
          {t('heroSubtitle')}
        </p>

        {/* CTA row */}
        <div style={{
          display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 0.7s ease 0.34s, transform 0.7s ease 0.34s',
        }}>
          <KortnaButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/courts'}
            style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif', minWidth: 190 }}
          >
            {t('bookNow')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </KortnaButton>
          <KortnaButton
            variant="secondary"
            size="lg"
            onClick={() => scrollTo('for-venues')}
            style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif', minWidth: 190 }}
          >
            {t('heroCta2')}
          </KortnaButton>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          marginTop: 72,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.9s ease 0.55s',
        }}>
          {[
            { n: '100+', l: isAr ? 'ملعب شريك' : 'Partner Courts' },
            { n: '10K+', l: isAr ? 'لاعب نشط' : 'Active Players' },
            { n: '50K+', l: isAr ? 'حجز تم' : 'Bookings Made' },
          ].map((s, i) => (
            <>
              <div key={s.n} style={{ textAlign: 'center', padding: '0 40px' }}>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(30px, 4vw, 48px)',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #E85A1E, #F87C3F)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontSize: 10,
                  marginTop: 5,
                  color: 'rgba(235,235,225,0.4)',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                }}>
                  {s.l}
                </div>
              </div>
              {i < 2 && (
                <div key={`div-${i}`} style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
              )}
            </>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: visible ? 0.45 : 0,
        transition: 'opacity 1.2s ease 1.2s',
      }}>
        <span style={{ fontSize: 9, color: 'white', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontFamily: 'Barlow, sans-serif' }}>
          {isAr ? 'تمرير' : 'Scroll'}
        </span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(232,90,30,0.8), transparent)' }} />
      </div>
    </section>
  )
}
