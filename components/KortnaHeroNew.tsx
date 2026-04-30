'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function KortnaHeroNew() {
  const { lang } = useLang()
  const [v, setV] = useState(false)
  const isAr = lang === 'ar'

  useEffect(() => {
    const t = setTimeout(() => setV(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0A1628 0%, #0d1f3e 45%, #060d1c 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Dot grid */}
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />

      {/* Lime glow orb */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '20%',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(226,255,103,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Blue glow orb */}
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '10%',
        width: 500, height: 400,
        background: 'radial-gradient(ellipse, rgba(22,69,211,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to top, #0A1628, transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
             className="hero-grid">

          {/* LEFT: Text content */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
              background: 'rgba(226,255,103,0.1)',
              border: '1px solid rgba(226,255,103,0.2)',
              color: '#E2FF67',
              marginBottom: 32,
              opacity: v ? 1 : 0,
              transform: v ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E2FF67', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              {isAr ? 'إطلاق قريب · الأردن 2026' : 'Launching Soon · Jordan 2026'}
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(52px, 8vw, 104px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: isAr ? '-0.01em' : '-0.03em',
              color: 'white',
              marginBottom: '1.5rem',
              opacity: v ? 1 : 0,
              transform: v ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              {isAr ? (
                <>
                  لعبتك،<br />
                  <span style={{ color: '#E2FF67' }}>ملعبنا</span>
                </>
              ) : (
                <>
                  YOUR GAME,<br />
                  <span style={{ color: '#E2FF67' }}>OUR COURT</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: 'rgba(235,235,225,0.55)',
              maxWidth: 440,
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
              fontWeight: 400,
              opacity: v ? 1 : 0,
              transform: v ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s',
            }}>
              {isAr
                ? 'احجز أي ملعب رياضي في عمّان خلال ثوانٍ. بادل، كرة قدم، كرة سلة، تنس وأكثر.'
                : "Book any sports court in Amman in seconds. Padel, football, basketball, tennis & more."}
            </p>

            {/* CTA row */}
            <div style={{
              display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
              opacity: v ? 1 : 0,
              transform: v ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.7s ease 0.34s, transform 0.7s ease 0.34s',
            }}>
              <button
                onClick={() => window.location.href = '/courts'}
                style={{
                  padding: '14px 32px', borderRadius: 14,
                  fontSize: 15, fontWeight: 800, cursor: 'pointer', border: 'none',
                  background: '#E2FF67', color: '#122744',
                  letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                  boxShadow: '0 4px 24px rgba(226,255,103,0.4)',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s, filter 0.2s',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = 'translateY(-3px) scale(1.04)'
                  b.style.boxShadow = '0 12px 36px rgba(226,255,103,0.55)'
                  b.style.filter = 'brightness(1.05)'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = ''
                  b.style.boxShadow = '0 4px 24px rgba(226,255,103,0.4)'
                  b.style.filter = ''
                }}
              >
                {isAr ? 'احجز الآن' : 'Book a Court'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              <button
                onClick={() => window.location.href = '/match'}
                style={{
                  padding: '14px 28px', borderRadius: 14,
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 0.2s, background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = 'translateY(-2px)'
                  b.style.background = 'rgba(255,255,255,0.1)'
                  b.style.borderColor = 'rgba(226,255,103,0.4)'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.transform = ''
                  b.style.background = 'rgba(255,255,255,0.06)'
                  b.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
              >
                {isAr ? 'ابحث عن لاعب' : 'Find a Match'}
              </button>
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 0, marginTop: 56,
              opacity: v ? 1 : 0, transition: 'opacity 0.9s ease 0.55s',
            }}>
              {[
                { n: '100+', l: isAr ? 'ملعب' : 'Courts' },
                { n: '10K+', l: isAr ? 'لاعب' : 'Players' },
                { n: '50K+', l: isAr ? 'حجز' : 'Bookings' },
              ].map((s, i) => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', padding: '0 28px' }}>
                    <div style={{
                      fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
                      fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1,
                      color: '#E2FF67',
                    }}>
                      {s.n}
                    </div>
                    <div style={{
                      fontSize: 10, marginTop: 4, color: 'rgba(235,235,225,0.4)',
                      fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                      letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                    }}>
                      {s.l}
                    </div>
                  </div>
                  {i < 2 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Floating app UI cards */}
          <div style={{
            position: 'relative', height: 520,
            opacity: v ? 1 : 0,
            transition: 'opacity 0.9s ease 0.4s',
          }} className="hero-cards-col">

            {/* Main booking card */}
            <div className="float-card-1" style={{
              position: 'absolute', top: 20, left: 0, right: 60,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: 24,
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
                    {isAr ? 'الحجز التالي' : 'Next Booking'}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'white', fontFamily: 'Barlow Condensed, sans-serif' }}>
                    Padel Pro Court
                  </div>
                </div>
                <div style={{
                  background: '#E2FF67', color: '#122744',
                  fontSize: 11, fontWeight: 800, padding: '4px 10px',
                  borderRadius: 8, textTransform: 'uppercase' as const, letterSpacing: '0.06em',
                }}>
                  {isAr ? 'مؤكد' : 'Confirmed'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                {[
                  { icon: '📅', label: isAr ? 'الأحد، 20 أبريل' : 'Sun, Apr 20' },
                  { icon: '⏰', label: '18:00 – 19:00' },
                  { icon: '📍', label: isAr ? 'عبدون، عمّان' : 'Abdoun, Amman' },
                ].map(i => (
                  <div key={i.label} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '6px 10px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    fontSize: 11, color: 'rgba(255,255,255,0.65)',
                  }}>
                    <span>{i.icon}</span>
                    <span>{i.label}</span>
                  </div>
                ))}
              </div>
              {/* Time slots preview */}
              <div style={{ display: 'flex', gap: 6 }}>
                {['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'].map((t, idx) => (
                  <div key={t} style={{
                    flex: 1, padding: '6px 4px', borderRadius: 8, textAlign: 'center',
                    fontSize: 10, fontWeight: 700,
                    background: idx === 2 ? '#E2FF67' : 'rgba(255,255,255,0.05)',
                    color: idx === 2 ? '#122744' : 'rgba(255,255,255,0.4)',
                    border: idx === 3 || idx === 4 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Match card */}
            <div className="float-card-2" style={{
              position: 'absolute', top: 200, right: 0, width: 220,
              background: 'linear-gradient(135deg, rgba(22,69,211,0.2), rgba(10,22,40,0.6))',
              border: '1px solid rgba(22,69,211,0.3)',
              borderRadius: 20, padding: 20,
              backdropFilter: 'blur(16px)',
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 12 }}>
                {isAr ? 'تطابق اللاعبين' : 'Player Match'}
              </div>
              {[
                { name: 'Khalid A.', sport: '🎾', level: 'Pro', color: '#E2FF67' },
                { name: 'Sara M.', sport: '⚽', level: 'Mid', color: '#8BC4DE' },
              ].map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`,
                    border: `1.5px solid ${p.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>
                    {p.sport}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: p.color, fontWeight: 600 }}>{p.level}</div>
                  </div>
                </div>
              ))}
              <button style={{
                width: '100%', padding: '9px', borderRadius: 10, border: 'none',
                background: '#1645D3', color: 'white',
                fontSize: 11, fontWeight: 800, cursor: 'pointer',
                letterSpacing: '0.06em', textTransform: 'uppercase' as const,
              }}>
                {isAr ? 'انضم الآن' : 'Join Match'}
              </button>
            </div>

            {/* Flash deal card */}
            <div className="float-card-3" style={{
              position: 'absolute', bottom: 40, left: 20, width: 210,
              background: 'rgba(226,255,103,0.06)',
              border: '1px solid rgba(226,255,103,0.2)',
              borderRadius: 18, padding: 18,
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#E2FF67', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                  {isAr ? 'عرض وميض' : 'Flash Deal'}
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 6 }}>
                {isAr ? 'ملعب بادل — خصم 30%' : 'Padel Court — 30% Off'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#E2FF67', fontFamily: 'Barlow Condensed, sans-serif' }}>
                  17.5 JD
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>
                  25 JD
                </span>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>
                {isAr ? 'تنتهي خلال 02:34:17' : 'Ends in 02:34:17'}
              </div>
            </div>

            {/* XP notification */}
            <div style={{
              position: 'absolute', top: 10, right: 10,
              background: 'rgba(18,39,68,0.85)',
              border: '1px solid rgba(226,255,103,0.2)',
              borderRadius: 14, padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E2FF67, #b8d93a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                🏆
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>
                  {isAr ? '+150 نقطة' : '+150 XP Earned'}
                </div>
                <div style={{ fontSize: 10, color: '#E2FF67' }}>
                  {isAr ? 'مستوى جديد: ذهبي' : 'New tier: Gold'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: v ? 0.4 : 0, transition: 'opacity 1.2s ease 1.2s',
      }}>
        <span style={{ fontSize: 9, color: 'white', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontFamily: 'Barlow, sans-serif' }}>
          {isAr ? 'تمرير' : 'Scroll'}
        </span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, #E2FF67, transparent)' }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-cards-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}
