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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
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
    <section className="py-24 px-5 sm:px-8" style={{ background: 'white' }}>
      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(226,255,103,0.2)', color: 'var(--navy)' }}
          >
            FAQ
          </span>
          <h2
            className="font-barlow-cond font-black"
            style={{
              fontSize: 'clamp(36px,5vw,60px)',
              color: 'var(--navy)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            }}
          >
            {t('faqTitle')}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.07}s, border-color 0.2s`,
              }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                <span
                  className="font-semibold text-base"
                  style={{ color: 'var(--navy)', textAlign: isAr ? 'right' : 'left' }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: open === i ? '#E2FF67' : 'rgba(18,39,68,0.06)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'background 0.2s, transform 0.3s ease',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </span>
              </button>
              <div
                className="faq-answer pb-5 pr-10"
                style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text3)' }}>
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
