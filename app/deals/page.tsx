'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'

interface Deal {
  id: number
  title: string
  court: string
  sport: string
  emoji: string
  discount: number
  orig: number
  sale: number
  loc: string
  endsH: number
  endsM: number
  endsS: number
  img: string
  hot: boolean
  category: string
}

const DEALS: Deal[] = [
  { id: 1, title: 'Padel Pro Hour', court: 'Padel Pro Court', sport: 'padel', emoji: '🎾', discount: 30, orig: 25, sale: 17.5, loc: 'Abdoun', endsH: 2, endsM: 47, endsS: 33, img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=75', hot: true, category: 'flash' },
  { id: 2, title: 'Night Football Special', court: 'Champions Ground', sport: 'football', emoji: '⚽', discount: 20, orig: 40, sale: 32, loc: 'Khalda', endsH: 1, endsM: 23, endsS: 17, img: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=75', hot: true, category: 'flash' },
  { id: 3, title: 'Basketball Morning Slot', court: 'Slam Dunk Court', sport: 'basketball', emoji: '🏀', discount: 15, orig: 20, sale: 17, loc: 'Sweifieh', endsH: 3, endsM: 45, endsS: 0, img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=75', hot: false, category: 'flash' },
  { id: 4, title: 'Tennis Afternoon', court: 'Ace Tennis Club', sport: 'tennis', emoji: '🎾', discount: 25, orig: 18, sale: 13.5, loc: 'Dabouq', endsH: 0, endsM: 58, endsS: 44, img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=75', hot: false, category: 'flash' },
  { id: 5, title: 'Swimming Lane', court: 'Aqua Sports Pool', sport: 'swimming', emoji: '🏊', discount: 10, orig: 15, sale: 13.5, loc: 'Mecca St', endsH: 5, endsM: 10, endsS: 22, img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=75', hot: false, category: 'weekly' },
  { id: 6, title: 'Badminton Duo Hour', court: 'Shuttle Master', sport: 'badminton', emoji: '🏸', discount: 12, orig: 12, sale: 10.5, loc: 'Gardens', endsH: 8, endsM: 30, endsS: 0, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=75', hot: false, category: 'weekly' },
]

function CountdownTimer({ h, m, s }: { h: number, m: number, s: number }) {
  const [time, setTime] = useState({ h, m, s })
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
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
  const pad = (n: number) => String(n).padStart(2, '0')
  const urgent = time.h === 0 && time.m < 10
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {[{ v: time.h, l: 'H' }, { v: time.m, l: 'M' }, { v: time.s, l: 'S' }].map((u, i) => (
        <div key={u.l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            background: urgent ? 'rgba(239,68,68,0.15)' : 'rgba(226,255,103,0.1)',
            border: `1px solid ${urgent ? 'rgba(239,68,68,0.3)' : 'rgba(226,255,103,0.2)'}`,
            borderRadius: 6, padding: '4px 7px', textAlign: 'center', minWidth: 30,
          }}>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 16, color: urgent ? '#ef4444' : '#E2FF67', lineHeight: 1 }}>
              {pad(u.v)}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{u.l}</div>
          </div>
          {i < 2 && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 700 }}>:</span>}
        </div>
      ))}
    </div>
  )
}

export default function DealsPage() {
  const { lang } = useLang()
  const [category, setCategory] = useState('all')
  const [inView, setInView] = useState(false)
  const isAr = lang === 'ar'

  useEffect(() => { setTimeout(() => setInView(true), 100) }, [])

  const filtered = category === 'all' ? DEALS : DEALS.filter(d => d.category === category)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '72px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(226,255,103,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <div className="section-label section-label-lime" style={{ marginBottom: 20 }}>
              ⚡ {isAr ? 'عروض خاصة' : 'Flash Deals'}
            </div>
            <h1 style={{
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, fontSize: 'clamp(40px, 6vw, 80px)', color: 'white', lineHeight: 1,
            }}>
              {isAr ? 'عروض محدودة الوقت' : 'Limited Time Deals'}
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 14, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? 'أسعار لا تقاوم على أفضل الملاعب. احجز قبل أن تنتهي!' : 'Unbeatable prices on top courts. Book before they expire!'}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, marginTop: 36, flexWrap: 'wrap' }}>
              {[
                { n: `${DEALS.length}`, l: isAr ? 'عروض نشطة' : 'Active Deals' },
                { n: 'Up to 30%', l: isAr ? 'خصم' : 'Discount' },
                { n: '24/7', l: isAr ? 'عروض جديدة' : 'New Deals' },
              ].map((s, i) => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32, color: '#E2FF67' }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{s.l}</div>
                  </div>
                  {i < 2 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.1)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 72, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: 4, padding: '10px 0', overflowX: 'auto', scrollbarWidth: 'none' as const }}>
            {[
              { id: 'all', en: '⚡ All Deals', ar: '⚡ كل العروض' },
              { id: 'flash', en: '🔥 Flash', ar: '🔥 وميض' },
              { id: 'weekly', en: '📅 Weekly', ar: '📅 أسبوعية' },
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                style={{
                  flexShrink: 0, padding: '8px 18px', borderRadius: 10, cursor: 'pointer', border: 'none',
                  background: category === c.id ? '#E2FF67' : 'rgba(255,255,255,0.07)',
                  color: category === c.id ? '#122744' : 'rgba(255,255,255,0.7)',
                  fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
                }}
              >
                {isAr ? c.ar : c.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deals grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {filtered.map((deal, i) => (
            <div
              key={deal.id}
              className="flash-deal-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`,
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 180 }}>
                <img src={deal.img} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,39,68,0.7) 0%, transparent 50%)' }} />

                {/* Badges */}
                <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
                  <span style={{ background: '#E2FF67', color: '#122744', fontSize: 12, fontWeight: 900, padding: '4px 10px', borderRadius: 8 }}>
                    {deal.discount}% OFF
                  </span>
                  {deal.hot && (
                    <span style={{ background: '#ef4444', color: 'white', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 8 }}>
                      🔥 HOT
                    </span>
                  )}
                </div>

                <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{deal.emoji} {deal.court}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 20px 24px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 8, fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {deal.title}
                </h3>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
                  📍 {deal.loc}
                </div>

                {/* Countdown */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                    {isAr ? 'ينتهي خلال' : 'Ends in'}
                  </div>
                  <CountdownTimer h={deal.endsH} m={deal.endsM} s={deal.endsS} />
                </div>

                {/* Price + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 28, color: '#E2FF67' }}>
                        {deal.sale} JD
                      </span>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>
                        {deal.orig} JD
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      {isAr ? '/ ساعة' : '/ hour'}
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = '/courts'}
                    style={{
                      padding: '11px 22px', borderRadius: 12, border: 'none', cursor: 'pointer',
                      background: '#E2FF67', color: '#122744',
                      fontSize: 13, fontWeight: 800,
                      letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                      fontFamily: 'Barlow Condensed, sans-serif',
                    }}
                  >
                    {isAr ? 'احجز الآن' : 'Book Deal'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
