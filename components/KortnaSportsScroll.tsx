'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const SPORTS = [
  { id: 'all',        emoji: '🏅', en: 'All Sports', ar: 'الكل',          count: 48 },
  { id: 'padel',      emoji: '🎾', en: 'Padel',      ar: 'بادل',          count: 14 },
  { id: 'football',   emoji: '⚽', en: 'Football',   ar: 'كرة القدم',     count: 18 },
  { id: 'basketball', emoji: '🏀', en: 'Basketball', ar: 'كرة السلة',     count: 8  },
  { id: 'tennis',     emoji: '🎾', en: 'Tennis',     ar: 'تنس',           count: 6  },
  { id: 'swimming',   emoji: '🏊', en: 'Swimming',   ar: 'سباحة',         count: 4  },
  { id: 'badminton',  emoji: '🏸', en: 'Badminton',  ar: 'ريشة طائرة',    count: 5  },
  { id: 'volleyball', emoji: '🏐', en: 'Volleyball', ar: 'كرة طائرة',     count: 3  },
  { id: 'gym',        emoji: '🏋️', en: 'Gym',        ar: 'صالة رياضية',   count: 7  },
  { id: 'squash',     emoji: '🏸', en: 'Squash',     ar: 'إسكواش',        count: 3  },
]

export default function KortnaSportsScroll() {
  const { lang } = useLang()
  const [active, setActive] = useState('all')
  const [inView, setInView] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isAr = lang === 'ar'
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current
    if (!track) return
    isDragging.current = true
    startX.current = e.pageX - track.offsetLeft
    scrollLeft.current = track.scrollLeft
    track.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }

  return (
    <section style={{ background: 'white', padding: '80px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{
          padding: '0 24px', marginBottom: 32,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div className="section-label section-label-navy" style={{ marginBottom: 12 }}>
            {isAr ? 'جميع الرياضات' : 'Browse by Sport'}
          </div>
          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900, color: 'var(--navy)', lineHeight: 1.05,
          }}>
            {isAr ? 'كل الرياضات، مكان واحد' : 'Every Sport, One Platform'}
          </h2>
        </div>

        <div
          ref={trackRef}
          className="sports-track"
          style={{ padding: '4px 24px 16px', opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {SPORTS.map(sp => (
            <div
              key={sp.id}
              className={`sport-pill${active === sp.id ? ' active' : ''}`}
              onClick={() => { setActive(sp.id); window.location.href = `/courts?sport=${sp.id}` }}
            >
              <span style={{ fontSize: 28 }}>{sp.emoji}</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: active === sp.id ? '#122744' : 'var(--navy)', whiteSpace: 'nowrap' as const }}>
                  {isAr ? sp.ar : sp.en}
                </div>
                <div style={{ fontSize: 10, color: active === sp.id ? 'rgba(18,39,68,0.5)' : 'var(--text3)', marginTop: 2 }}>
                  {sp.count} {isAr ? 'ملعب' : 'courts'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
