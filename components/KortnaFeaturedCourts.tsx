'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const COURTS = [
  { id: '1', name: 'Padel Pro Court', sport: 'Padel', emoji: '🎾', loc: 'Abdoun', price: 25, rating: 4.9, reviews: 128, img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=75', hot: true },
  { id: '2', name: 'Champions Football', sport: 'Football', emoji: '⚽', loc: 'Khalda', price: 40, rating: 4.8, reviews: 96, img: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=75', hot: false },
  { id: '3', name: 'Slam Dunk Basketball', sport: 'Basketball', emoji: '🏀', loc: 'Sweifieh', price: 20, rating: 4.7, reviews: 84, img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=75', hot: false },
  { id: '4', name: 'Ace Tennis Club', sport: 'Tennis', emoji: '🎾', loc: 'Dabouq', price: 18, rating: 4.9, reviews: 72, img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=75', hot: true },
]

export default function KortnaFeaturedCourts() {
  const { lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isAr = lang === 'ar'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: 'white', padding: '96px 0' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          marginBottom: 48,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div>
            <div className="section-label section-label-navy" style={{ marginBottom: 14 }}>
              {isAr ? 'الملاعب المميزة' : 'Featured Courts'}
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, color: 'var(--navy)', lineHeight: 1.05,
            }}>
              {isAr ? 'أفضل الملاعب في عمّان' : 'Top Courts in Amman'}
            </h2>
          </div>
          <a href="/courts" style={{
            fontSize: 14, fontWeight: 700, color: 'var(--blue)',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {isAr ? 'عرض الكل' : 'View all courts'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {COURTS.map((c, i) => (
            <div
              key={c.id}
              className="court-card-new"
              onClick={() => window.location.href = `/courts/${c.id}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,39,68,0.5) 0%, transparent 50%)' }} />

                {c.hot && (
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: '#E2FF67', color: '#122744',
                    fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 8,
                    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  }}>
                    🔥 {isAr ? 'الأكثر حجزاً' : 'Hot'}
                  </div>
                )}

                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>
                    {c.emoji} {c.sport}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy)', marginBottom: 3 }}>{c.name}</h3>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>📍 {c.loc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--navy)', fontFamily: 'Barlow Condensed, sans-serif' }}>
                      {c.price} JD
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text3)' }}>{isAr ? '/ ساعة' : '/ hr'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text3)' }}>
                    <span style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
                    <strong style={{ color: 'var(--navy)' }}>{c.rating}</strong>
                    <span>({c.reviews})</span>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); window.location.href = `/courts/${c.id}` }}
                    style={{
                      padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
                      background: '#E2FF67', color: '#122744',
                      fontSize: 12, fontWeight: 800,
                      letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                      fontFamily: 'Barlow Condensed, sans-serif',
                    }}
                  >
                    {isAr ? 'احجز' : 'Book'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
