'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/context/LanguageContext'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-canvas" style={{ background: 'linear-gradient(135deg, #122744 0%, #080f20 100%)' }} />,
})

export default function KortnaHero() {
  const { t, lang } = useLang()
  const [visible, setVisible] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const isAr = lang === 'ar'

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(135deg, #122744 0%, #0a1a35 50%, #080f20 100%)' }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to top, #122744, transparent)' }} />
        <div className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, rgba(18,39,68,0.6), transparent)' }} />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-5 sm:px-8 pt-24 pb-20">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{
            background: 'rgba(226,255,103,0.12)',
            border: '1px solid rgba(226,255,103,0.3)',
            color: '#E2FF67',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" style={{ background: '#E2FF67' }} />
          {isAr ? 'الأردن 2026 — إطلاق قريب' : 'Jordan 2026 — Launching Soon'}
        </div>

        {/* Headline */}
        <h1
          className="font-barlow-cond font-black text-white mb-6 leading-none"
          style={{
            fontSize: 'clamp(64px, 12vw, 140px)',
            letterSpacing: '-0.02em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
          }}
        >
          {isAr ? (
            <>لعبتك،<br /><span style={{ color: '#E2FF67' }}>ملعبنا</span></>
          ) : (
            <>YOUR GAME,<br /><span style={{ color: '#E2FF67' }}>OUR COURT</span></>
          )}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed"
          style={{
            color: 'rgba(235,235,225,0.75)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
          }}
        >
          {t('heroSubtitle')}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
          }}
        >
          <button
            onClick={() => window.location.href = '/courts'}
            className="px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: '#E2FF67',
              color: '#122744',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
              boxShadow: '0 0 30px rgba(226,255,103,0.3)',
            }}
          >
            {t('bookNow')}
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('for-venues')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
              backdropFilter: 'blur(8px)',
            }}
          >
            {t('heroCta2')}
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-8 sm:gap-12 mt-16 flex-wrap justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          {[
            { n: '100+', l: isAr ? 'ملعب شريك' : 'Partner Courts' },
            { n: '10K+', l: isAr ? 'لاعب نشط' : 'Active Players' },
            { n: '50K+', l: isAr ? 'حجز تم' : 'Bookings Made' },
          ].map(s => (
            <div key={s.n} className="text-center">
              <div
                className="font-barlow-cond font-black text-3xl sm:text-4xl"
                style={{ color: '#E2FF67', fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                {s.n}
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(235,235,225,0.5)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-chevron hidden sm:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="rgba(226,255,103,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
