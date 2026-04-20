'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const ICONS = {
  instant: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  find: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  pay: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  match: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  track: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  owner: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
}

export default function KortnaFeatures() {
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

  const features = [
    { key: 'instant', icon: ICONS.instant, title: t('featureInstant'), desc: t('featureInstantDesc') },
    { key: 'find',    icon: ICONS.find,    title: t('featureFind'),    desc: t('featureFindDesc') },
    { key: 'pay',     icon: ICONS.pay,     title: t('featurePay'),     desc: t('featurePayDesc') },
    { key: 'match',   icon: ICONS.match,   title: t('featureMatch'),   desc: t('featureMatchDesc') },
    { key: 'track',   icon: ICONS.track,   title: t('featureTrack'),   desc: t('featureTrackDesc') },
    { key: 'owner',   icon: ICONS.owner,   title: t('featureOwner'),   desc: t('featureOwnerDesc') },
  ]

  return (
    <section style={{ background: 'var(--off-white)', padding: '96px 0' }}>
      <div
        ref={ref}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
      >
        {/* Header */}
        <div
          className="text-center"
          style={{
            marginBottom: 56,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'rgba(22,69,211,0.08)',
              color: 'var(--blue)',
              marginBottom: 16,
            }}
          >
            {isAr ? 'المميزات' : 'Features'}
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              color: 'var(--navy)',
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            {t('featuresTitle')}
          </h2>
          <p style={{ color: 'var(--text3)', fontSize: 15, maxWidth: 480, margin: '0 auto', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {features.map((f, i) => (
            <div
              key={f.key}
              className="kortna-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`,
              }}
            >
              <div style={{
                width: 48, height: 48,
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(226,255,103,0.18)',
                color: 'var(--navy)',
                marginBottom: 18,
                flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--navy)',
                marginBottom: 8,
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--text3)',
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
