'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function KortnaFAQ() {
  const { t, lang } = useLang()
  const [inView, setInView] = useState(false)
  const [open, setOpen] = useState<number | null>(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isAr = lang === 'ar'

  const faqs = [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
    { q: t('faqQ6'), a: t('faqA6') },
  ]

  return (
    <section style={{ background: 'white', padding: '96px 0' }}>
      <div
        ref={ref}
        style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}
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
            background: 'rgba(226,255,103,0.2)',
            color: 'var(--navy)',
            marginBottom: 16,
          }}>
            FAQ
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            color: 'var(--navy)',
            lineHeight: 1.05,
          }}>
            {t('faqTitle')}
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${open === i ? 'rgba(226,255,103,0.4)' : 'rgba(18,39,68,0.08)'}`,
                transition: 'border-color 0.2s',
                opacity: inView ? 1 : 0,
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  gap: 16,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: isAr ? 'right' : 'left',
                  fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--navy)', flex: 1 }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: open === i ? '#E2FF67' : 'rgba(18,39,68,0.06)',
                  transition: 'background 0.2s, transform 0.3s ease',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  color: 'var(--navy)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </span>
              </button>

              <div style={{
                maxHeight: open === i ? 240 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: 'var(--text3)',
                  paddingBottom: 20,
                  paddingRight: 44,
                  fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
