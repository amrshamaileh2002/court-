'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const STEP_ICONS = [
  <svg key="search" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>,
  <svg key="calendar" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>,
  <svg key="pay" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>,
  <svg key="play" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
  </svg>,
]

export default function KortnaHowItWorks() {
  const { t, lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isAr = lang === 'ar'

  const steps = [
    { num: '01', title: t('howStep1Title'), desc: t('howStep1Desc') },
    { num: '02', title: t('howStep2Title'), desc: t('howStep2Desc') },
    { num: '03', title: t('howStep3Title'), desc: t('howStep3Desc') },
    { num: '04', title: t('howStep4Title'), desc: t('howStep4Desc') },
  ]

  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(226,255,103,0.12)', color: '#E2FF67' }}
          >
            {isAr ? 'كيف يعمل' : 'How It Works'}
          </span>
          <h2
            className="font-barlow-cond font-black text-white"
            style={{
              fontSize: 'clamp(36px,5vw,60px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            }}
          >
            {t('howTitle')}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(226,255,103,0.3) 20%, rgba(226,255,103,0.3) 80%, transparent)',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="step-card flex flex-col items-center text-center relative z-10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* Circle icon */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 relative"
                style={{
                  background: 'rgba(226,255,103,0.1)',
                  border: '2px solid rgba(226,255,103,0.25)',
                  color: '#E2FF67',
                }}
              >
                {STEP_ICONS[i]}
                {/* Step number */}
                <span
                  className="step-number absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{
                    background: '#E2FF67',
                    color: '#122744',
                    fontFamily: 'Barlow Condensed, sans-serif',
                    opacity: 1,
                    textShadow: 'none',
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h3
                className="font-bold text-lg mb-2"
                style={{ color: 'white', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(235,235,225,0.55)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
