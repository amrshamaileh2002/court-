'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const AVATARS = ['🧑‍💼', '🧔', '👩']

export default function KortnaTestimonials() {
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

  const testimonials = [
    { name: t('testimonial1Name'), role: t('testimonial1Role'), text: t('testimonial1Text') },
    { name: t('testimonial2Name'), role: t('testimonial2Role'), text: t('testimonial2Text') },
    { name: t('testimonial3Name'), role: t('testimonial3Role'), text: t('testimonial3Text') },
  ]

  return (
    <section style={{ background: 'var(--off-white)', padding: '96px 0' }}>
      <div
        ref={ref}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 56,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            background: 'rgba(22,69,211,0.08)',
            color: 'var(--blue)',
            marginBottom: 16,
          }}>
            {isAr ? 'آراء اللاعبين' : 'Testimonials'}
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            color: 'var(--navy)',
            lineHeight: 1.05,
          }}>
            {t('testimonialsTitle')}
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              style={{
                background: 'white',
                borderRadius: 20,
                padding: '28px 28px 24px',
                border: '1px solid rgba(18,39,68,0.07)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 48px rgba(18,39,68,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#E2FF67">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--text2)',
                marginBottom: 20,
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}>
                &ldquo;{item.text}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: 'rgba(226,255,103,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>
                  {AVATARS[i]}
                </div>
                <div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: 'var(--navy)',
                    fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                  }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
