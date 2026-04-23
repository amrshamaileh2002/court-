'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const STEP_ICONS = [
  <svg key="s" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>,
  <svg key="c" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>,
  <svg key="p" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>,
  <svg key="play" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
  </svg>,
]

export default function KortnaHowItWorks() {
  const { t, lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.08 })
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
    <section style={{ background: 'var(--navy)', padding: '96px 0' }}>
      <div
        ref={ref}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
      >
        {/* Header */}
        <div
          className="text-center"
          style={{
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            background: 'rgba(226,255,103,0.1)',
            color: '#E2FF67',
            marginBottom: 16,
          }}>
            {isAr ? 'كيف يعمل' : 'How It Works'}
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.05,
          }}>
            {t('howTitle')}
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
          position: 'relative',
        }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: 40,
            left: '12.5%',
            right: '12.5%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(226,255,103,0.25) 20%, rgba(226,255,103,0.25) 80%, transparent)',
            display: 'none',
            pointerEvents: 'none',
          }} className="lg-connector" />

          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                padding: '32px 20px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                backdropFilter: 'blur(12px)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`,
              }}
            >
              {/* Icon circle */}
              <div style={{
                position: 'relative',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(232,90,30,0.1)',
                border: '1.5px solid rgba(232,90,30,0.28)',
                color: '#E85A1E',
                marginBottom: 20,
                flexShrink: 0,
              }}>
                {STEP_ICONS[i]}
                {/* Number badge */}
                <span style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E85A1E, #F87C3F)',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 900,
                  fontFamily: 'Barlow Condensed, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}>
                  {step.num}
                </span>
              </div>

              <h3 style={{
                fontWeight: 700,
                fontSize: 16,
                color: 'white',
                marginBottom: 10,
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: 'rgba(235,235,225,0.5)',
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                maxWidth: 220,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
