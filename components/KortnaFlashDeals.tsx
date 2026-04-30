'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

function useCountdown(targetHours = 2, targetMins = 47, targetSecs = 33) {
  const [t, setT] = useState({ h: targetHours, m: targetMins, s: targetSecs })
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function KortnaFlashDeals() {
  const { lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isAr = lang === 'ar'
  const { h, m, s } = useCountdown(2, 47, 33)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: 'var(--navy)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(226,255,103,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(22,69,211,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }} />

      <div
        ref={ref}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 64,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div className="section-label section-label-lime" style={{ marginBottom: 16 }}>
            ⚡ {isAr ? 'عروض وميض' : 'Flash Deals'}
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900, color: 'white', lineHeight: 1.05,
          }}>
            {isAr ? 'عروض محدودة الوقت' : 'Limited Time Offers'}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(235,235,225,0.5)', marginTop: 12, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {isAr ? 'لا تفوّت هذه العروض — تنتهي قريباً' : "Don't miss these deals — they're going fast"}
          </p>
        </div>

        {/* Main deal highlight */}
        <div className="flash-deal-card" style={{
          marginBottom: 32, padding: '0',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 280 }}
               className="flash-main-grid">
            {/* Left: image */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 200 }}>
              <img
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=75"
                alt="Flash deal court"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 200 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(18,39,68,0.8))' }} />
              <div style={{
                position: 'absolute', top: 20, left: 20,
                background: '#E2FF67', color: '#122744',
                fontSize: 14, fontWeight: 900, padding: '6px 14px', borderRadius: 10,
                letterSpacing: '0.04em',
              }}>
                30% OFF
              </div>
            </div>

            {/* Right: deal info */}
            <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
                {isAr ? 'العرض المميز اليوم' : "Today's Featured Deal"}
              </div>
              <h3 style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32,
                color: 'white', lineHeight: 1.1, marginBottom: 12,
              }}>
                Padel Pro Court<br /><span style={{ color: '#E2FF67' }}>Full Hour</span>
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 44, color: '#E2FF67' }}>
                  17.5 JD
                </span>
                <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', fontFamily: 'Barlow Condensed, sans-serif' }}>
                  25 JD
                </span>
              </div>

              {/* Countdown */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  {isAr ? 'ينتهي خلال' : 'Ends in'}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {[{ v: h, l: isAr ? 'ساعة' : 'HRS' }, { v: m, l: isAr ? 'دقيقة' : 'MIN' }, { v: s, l: isAr ? 'ثانية' : 'SEC' }].map((unit, i) => (
                    <div key={unit.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="countdown-box">
                        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 24, color: '#E2FF67', lineHeight: 1 }}>
                          {pad(unit.v)}
                        </div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 2, letterSpacing: '0.06em' }}>
                          {unit.l}
                        </div>
                      </div>
                      {i < 2 && <span style={{ fontSize: 20, fontWeight: 900, color: 'rgba(255,255,255,0.3)', lineHeight: 1 }}>:</span>}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.location.href = '/deals'}
                style={{
                  padding: '14px 32px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: '#E2FF67', color: '#122744',
                  fontSize: 15, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                  fontFamily: 'Barlow Condensed, sans-serif',
                  boxShadow: '0 4px 24px rgba(226,255,103,0.35)',
                  alignSelf: 'flex-start',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'translateY(-2px)'; b.style.boxShadow = '0 10px 32px rgba(226,255,103,0.5)' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ''; b.style.boxShadow = '0 4px 24px rgba(226,255,103,0.35)' }}
              >
                {isAr ? 'احجز بالسعر المخفّض' : 'Claim Deal Now'}
              </button>
            </div>
          </div>
        </div>

        {/* More deals row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s',
        }}>
          {[
            { title: 'Football Night', sport: '⚽', disc: '20%', orig: 40, sale: 32, court: 'Champions', time: '01:23' },
            { title: 'Basketball Hour', sport: '🏀', disc: '15%', orig: 20, sale: 17, court: 'Slam Dunk', time: '03:45' },
            { title: 'Tennis Slot', sport: '🎾', disc: '25%', orig: 18, sale: 13.5, court: 'Ace Club', time: '00:58' },
          ].map((d, i) => (
            <div key={d.title} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '20px',
              cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(226,255,103,0.3)'; el.style.background = 'rgba(226,255,103,0.04)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>{d.sport}</span>
                <span style={{ background: '#E2FF67', color: '#122744', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6 }}>
                  {d.disc} OFF
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 4 }}>{d.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>{d.court}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 24, color: '#E2FF67' }}>
                  {d.sale} JD
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>{d.orig} JD</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                ⏱ {isAr ? 'ينتهي خلال' : 'Ends:'} {d.time}
              </div>
            </div>
          ))}
        </div>

        {/* See all deals */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="/deals" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 12,
            border: '1px solid rgba(226,255,103,0.25)', color: '#E2FF67',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = 'rgba(226,255,103,0.08)'; a.style.borderColor = 'rgba(226,255,103,0.5)' }}
          onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = 'transparent'; a.style.borderColor = 'rgba(226,255,103,0.25)' }}
          >
            {isAr ? 'عرض جميع العروض ⚡' : 'View All Deals ⚡'}
          </a>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .flash-main-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
