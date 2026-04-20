'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/context/LanguageContext'
import KortnaButton from './KortnaButton'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="hero-canvas" style={{ background: 'linear-gradient(135deg, #122744 0%, #080f20 100%)' }} />
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
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #122744 0%, #0a1a35 55%, #07101e 100%)',
      }}
    >
      {/* 3D canvas */}
      <div className="absolute inset-0" style={{ opacity: 0.55 }}>
        <HeroScene />
      </div>

      {/* Gradient vignettes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-56"
          style={{ background: 'linear-gradient(to top, #122744, transparent)' }} />
        <div className="absolute inset-x-0 top-0 h-24"
          style={{ background: 'linear-gradient(to bottom, rgba(18,39,68,0.7), transparent)' }} />
        <div className="absolute inset-y-0 left-0 w-32"
          style={{ background: 'linear-gradient(to right, rgba(18,39,68,0.4), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-32"
          style={{ background: 'linear-gradient(to left, rgba(18,39,68,0.4), transparent)' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.2 }} />

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-5 sm:px-8"
        style={{ paddingTop: '6rem', paddingBottom: '5rem' }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-10"
          style={{
            background: 'rgba(226,255,103,0.1)',
            border: '1px solid rgba(226,255,103,0.25)',
            color: '#E2FF67',
            backdropFilter: 'blur(8px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E2FF67', flexShrink: 0, display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          {isAr ? 'إطلاق قريب · الأردن 2026' : 'Launching Soon · Jordan 2026'}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(52px, 10vw, 120px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: isAr ? '-0.01em' : '-0.03em',
            color: 'white',
            marginBottom: '1.5rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
          }}
        >
          {isAr ? (
            <>لعبتك،<br /><span style={{ color: '#E2FF67' }}>ملعبنا</span></>
          ) : (
            <>YOUR GAME,<br /><span style={{ color: '#E2FF67' }}>OUR COURT</span></>
          )}
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 20px)',
            color: 'rgba(235,235,225,0.65)',
            maxWidth: 520,
            lineHeight: 1.65,
            marginBottom: '2.5rem',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
            fontWeight: 400,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease 0.22s, transform 0.65s ease 0.22s',
          }}
        >
          {t('heroSubtitle')}
        </p>

        {/* CTA row */}
        <div
          className="flex flex-col sm:flex-row gap-3 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.65s ease 0.34s, transform 0.65s ease 0.34s',
          }}
        >
          <KortnaButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/courts'}
            style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif', minWidth: 180 }}
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
            style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif', minWidth: 180 }}
          >
            {t('heroCta2')}
          </KortnaButton>
        </div>

        {/* Stats strip */}
        <div
          className="flex items-center gap-10 sm:gap-16 mt-16 flex-wrap justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.55s',
          }}
        >
          {[
            { n: '100+', l: isAr ? 'ملعب شريك' : 'Partner Courts' },
            { n: '10K+', l: isAr ? 'لاعب نشط' : 'Active Players' },
            { n: '50K+', l: isAr ? 'حجز تم' : 'Bookings Made' },
          ].map((s, i) => (
            <div key={s.n} className="text-center" style={{ animationDelay: `${i * 100}ms` }}>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(28px, 4vw, 42px)',
                color: '#E2FF67',
                lineHeight: 1,
              }}>
                {s.n}
              </div>
              <div style={{
                fontSize: 11,
                marginTop: 4,
                color: 'rgba(235,235,225,0.45)',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: visible ? 0.5 : 0,
          transition: 'opacity 1s ease 1s',
        }}
      >
        <span style={{ fontSize: 9, color: 'white', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Barlow, sans-serif' }}>
          {isAr ? 'تمرير' : 'Scroll'}
        </span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, white, transparent)' }} />
      </div>
    </section>
  )
}
