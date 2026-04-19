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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
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
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
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
            style={{ background: 'rgba(22,69,211,0.08)', color: 'var(--blue)' }}
          >
            {isAr ? 'آراء اللاعبين' : 'Testimonials'}
          </span>
          <h2
            className="font-barlow-cond font-black"
            style={{
              fontSize: 'clamp(36px,5vw,60px)',
              color: 'var(--navy)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            }}
          >
            {t('testimonialsTitle')}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              className="testimonial-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#E2FF67" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--text2)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(226,255,103,0.15)' }}
                >
                  {AVATARS[i]}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: 'var(--navy)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                  >
                    {item.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text3)' }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
