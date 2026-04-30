'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function KortnaBookSplit() {
  const { lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isAr = lang === 'ar'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: 'white', padding: '96px 0' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}
             className="split-grid">

          {/* Booking UI mockup */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div style={{
              background: 'var(--navy)',
              borderRadius: 28,
              padding: 28,
              boxShadow: '0 32px 80px rgba(18,39,68,0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: -50, left: -50, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(226,255,103,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 20, color: 'white', letterSpacing: '0.02em' }}>
                  {isAr ? 'احجز ملعباً' : 'Book a Court'}
                </div>
                <div style={{ background: 'rgba(226,255,103,0.12)', border: '1px solid rgba(226,255,103,0.2)', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 700, color: '#E2FF67', letterSpacing: '0.1em' }}>
                  LIVE
                </div>
              </div>

              {/* Sport filter */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {['🎾 Padel', '⚽ Football', '🏀 Basketball'].map((s, i) => (
                  <div key={s} style={{
                    padding: '7px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    background: i === 0 ? '#E2FF67' : 'rgba(255,255,255,0.05)',
                    color: i === 0 ? '#122744' : 'rgba(255,255,255,0.5)',
                    border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    whiteSpace: 'nowrap' as const,
                  }}>
                    {s}
                  </div>
                ))}
              </div>

              {/* Court list */}
              {[
                { name: 'Padel Pro Court', loc: 'Abdoun', price: 25, rating: 4.9, avail: true },
                { name: 'Elite Padel Hub', loc: 'Khalda', price: 30, rating: 4.8, avail: true },
                { name: 'Sky Padel Club', loc: 'Sweifieh', price: 22, rating: 4.7, avail: false },
              ].map((c, i) => (
                <div key={c.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: 14, marginBottom: 8,
                  background: i === 0 ? 'rgba(226,255,103,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${i === 0 ? 'rgba(226,255,103,0.2)' : 'rgba(255,255,255,0.06)'}`,
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>📍 {c.loc} · ⭐ {c.rating}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#E2FF67', fontFamily: 'Barlow Condensed, sans-serif' }}>
                      {c.price} JD
                    </div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, marginTop: 3,
                      color: c.avail ? '#4ade80' : '#f87171',
                    }}>
                      {c.avail ? (isAr ? '✓ متاح' : '✓ Available') : (isAr ? 'محجوز' : 'Booked')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(32px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            <div className="section-label section-label-navy" style={{ marginBottom: 18 }}>
              {isAr ? 'الحجز' : 'Smart Booking'}
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, color: 'var(--navy)', lineHeight: 1.05, marginBottom: 20,
            }}>
              {isAr ? 'احجز ملعبك\nخلال ثوانٍ' : 'Book Your Court\nin Seconds'}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text3)', marginBottom: 32, fontFamily: isAr ? 'Cairo, sans-serif' : undefined, maxWidth: 400 }}>
              {isAr
                ? 'تصفح الملاعب المتاحة حسب الرياضة والموقع والوقت. اختر موعدك وادفع بأمان — كل ذلك في دقيقة واحدة.'
                : 'Browse courts by sport, location, and time. Pick your slot and pay securely — all in under a minute.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { icon: '⚡', title: isAr ? 'حجز فوري' : 'Instant Confirmation', desc: isAr ? 'تأكيد خلال ثوانٍ بدون انتظار' : 'Confirmed in seconds, no waiting' },
                { icon: '🗓️', title: isAr ? 'توافر في الوقت الفعلي' : 'Real-Time Availability', desc: isAr ? 'شاهد المواعيد المتاحة مباشرة' : 'See live available slots instantly' },
                { icon: '💳', title: isAr ? 'دفع آمن' : 'Secure Payments', desc: isAr ? 'ادفع أونلاين أو في الملعب' : 'Pay online or at the venue' },
              ].map(f => (
                <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(226,255,103,0.1)', border: '1px solid rgba(226,255,103,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.href = '/courts'}
              style={{
                padding: '14px 32px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: '#E2FF67', color: '#122744',
                fontSize: 15, fontWeight: 800,
                letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                fontFamily: 'Barlow Condensed, sans-serif',
                boxShadow: '0 4px 20px rgba(226,255,103,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'translateY(-2px)'; b.style.boxShadow = '0 10px 30px rgba(226,255,103,0.45)' }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ''; b.style.boxShadow = '0 4px 20px rgba(226,255,103,0.3)' }}
            >
              {isAr ? 'استكشف الملاعب' : 'Explore Courts'}
            </button>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  )
}
