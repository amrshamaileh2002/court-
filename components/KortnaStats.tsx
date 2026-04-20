'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function StatItem({ value, suffix, label, started, delay }: { value: number; suffix: string; label: string; started: boolean; delay: number }) {
  const [go, setGo] = useState(false)
  useEffect(() => { if (started) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t) } }, [started, delay])
  const count = useCountUp(value, 1.8, go)

  return (
    <div style={{
      textAlign: 'center',
      padding: '0 12px',
      opacity: started ? 1 : 0,
      transform: started ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(44px, 5.5vw, 72px)',
        color: 'var(--navy)',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 500, letterSpacing: '0.03em' }}>
        {label}
      </div>
    </div>
  )
}

export default function KortnaStats() {
  const { t, lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isAr = lang === 'ar'

  const stats = [
    { value: 100,   suffix: '+',  label: t('statsCourts'),   delay: 0 },
    { value: 10000, suffix: '+',  label: t('statsPlayers'),  delay: 120 },
    { value: 50000, suffix: '+',  label: t('statsBookings'), delay: 240 },
    { value: 48,    suffix: '/5', label: t('statsRating'),   delay: 360 },
  ]

  return (
    <section style={{ background: 'white', padding: '96px 0' }}>
      <div
        ref={ref}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 64,
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
            {isAr ? 'بالأرقام' : 'By the Numbers'}
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            color: 'var(--navy)',
            lineHeight: 1.05,
          }}>
            {t('statsTitle')}
          </h2>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}>
          {stats.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} started={inView} delay={s.delay} />
          ))}
        </div>

        <div style={{
          marginTop: 64,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(226,255,103,0.5) 50%, transparent)',
        }} />
      </div>
    </section>
  )
}
