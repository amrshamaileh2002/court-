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
    <div
      className="text-center"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div
        className="font-barlow-cond font-black mb-2"
        style={{ fontSize: 'clamp(48px,6vw,80px)', color: 'var(--navy)', fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 1 }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium" style={{ color: 'var(--text3)' }}>{label}</div>
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
    { value: 10000, suffix: '+',  label: t('statsPlayers'),  delay: 150 },
    { value: 50000, suffix: '+',  label: t('statsBookings'), delay: 300 },
    { value: 48,    suffix: '/5', label: t('statsRating'),   delay: 450 },
  ]

  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-16"
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
            {isAr ? 'بالأرقام' : 'By the Numbers'}
          </span>
          <h2
            className="font-barlow-cond font-black"
            style={{
              fontSize: 'clamp(36px,5vw,60px)',
              color: 'var(--navy)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            }}
          >
            {t('statsTitle')}
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {stats.map((s) => (
            <StatItem
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              started={inView}
              delay={s.delay}
            />
          ))}
        </div>

        {/* Divider with lime */}
        <div className="mt-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(226,255,103,0.5) 50%, transparent)' }} />
      </div>
    </section>
  )
}
