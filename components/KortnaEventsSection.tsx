'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const EVENTS = [
  { id: 1, title: 'Amman Padel Championship', sport: '🎾', date: 'Apr 26', day: 'Sat', time: '09:00', loc: 'Abdoun', spots: 4, total: 16, color: '#E2FF67', level: 'Open' },
  { id: 2, title: '5v5 Football Night League', sport: '⚽', date: 'Apr 27', day: 'Sun', time: '20:00', loc: 'Khalda', spots: 8, total: 22, color: '#4ade80', level: 'Beginner' },
  { id: 3, title: 'Basketball 3x3 Tournament', sport: '🏀', date: 'Apr 28', day: 'Mon', time: '18:00', loc: 'Sweifieh', spots: 2, total: 12, color: '#F87C3F', level: 'Intermediate' },
  { id: 4, title: 'Tennis Doubles Open', sport: '🎾', date: 'May 2', day: 'Fri', time: '17:00', loc: 'Dabouq', spots: 6, total: 8, color: '#8BC4DE', level: 'Pro' },
]

export default function KortnaEventsSection() {
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
    <section style={{ background: '#f8f9fb', padding: '80px 0' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          marginBottom: 40,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div>
            <div className="section-label section-label-blue" style={{ marginBottom: 14 }}>
              {isAr ? 'الفعاليات' : 'Upcoming Events'}
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, color: 'var(--navy)', lineHeight: 1.05,
            }}>
              {isAr ? 'انضم لفعاليات قادمة' : 'Join Upcoming Events'}
            </h2>
          </div>
          <a href="/match" style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            {isAr ? 'عرض الكل' : 'See all events'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {EVENTS.map((ev, i) => (
            <div
              key={ev.id}
              className="event-row"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              {/* Date box */}
              <div style={{
                flexShrink: 0, width: 56, textAlign: 'center',
                background: `${ev.color}15`, border: `1px solid ${ev.color}30`, borderRadius: 12,
                padding: '8px 6px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' as const }}>{ev.day}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--navy)', fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {ev.date.split(' ')[1]}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{ev.date.split(' ')[0]}</div>
              </div>

              {/* Sport emoji */}
              <div style={{ fontSize: 28, flexShrink: 0 }}>{ev.sport}</div>

              {/* Event info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy)', marginBottom: 3 }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span>⏰ {ev.time}</span>
                  <span>📍 {ev.loc}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                    background: `${ev.color}15`, color: ev.color === '#E2FF67' ? '#7a8e10' : ev.color,
                  }}>
                    {ev.level}
                  </span>
                </div>
              </div>

              {/* Spots */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: ev.spots <= 3 ? '#ef4444' : 'var(--text3)', fontWeight: ev.spots <= 3 ? 700 : 400, marginBottom: 6 }}>
                  {ev.spots <= 3
                    ? (isAr ? `${ev.spots} أماكن متبقية!` : `${ev.spots} spots left!`)
                    : (isAr ? `${ev.spots}/${ev.total} مكان` : `${ev.spots}/${ev.total} spots`)}
                </div>
                <button style={{
                  padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: ev.spots <= 3 ? '#ef4444' : '#E2FF67',
                  color: ev.spots <= 3 ? 'white' : '#122744',
                  fontSize: 12, fontWeight: 800,
                  letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                }}>
                  {isAr ? 'انضم' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
