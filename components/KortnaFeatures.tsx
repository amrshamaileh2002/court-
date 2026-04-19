'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const ICONS = {
  instant: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  find: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  pay: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  match: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  track: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  owner: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
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
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--off-white)' }}>
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
            style={{ background: 'rgba(22,69,211,0.08)', color: 'var(--blue)' }}
          >
            {isAr ? 'المميزات' : 'Features'}
          </span>
          <h2
            className="font-barlow-cond font-black mb-4"
            style={{
              fontSize: 'clamp(36px,5vw,60px)',
              color: 'var(--navy)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            }}
          >
            {t('featuresTitle')}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.key}
              className="kortna-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(226,255,103,0.15)', color: 'var(--navy)' }}
              >
                {f.icon}
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: 'var(--navy)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
