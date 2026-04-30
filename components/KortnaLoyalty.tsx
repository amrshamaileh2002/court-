'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const TIERS = [
  { id: 'starter', en: 'Starter', ar: 'مبتدئ',  icon: '🥉', color: '#CD7F32', xp: '0',      perks: ['Basic booking', 'Email support'] },
  { id: 'pro',     en: 'Pro',     ar: 'محترف',   icon: '🥈', color: '#C0C0C0', xp: '500',    perks: ['Priority slots', '5% off deals'] },
  { id: 'elite',   en: 'Elite',   ar: 'نخبة',    icon: '🥇', color: '#E2FF67', xp: '2000',   perks: ['VIP courts', '15% off', 'Match badge'] },
  { id: 'legend',  en: 'Legend',  ar: 'أسطورة',  icon: '💎', color: '#8BC4DE', xp: '5000',   perks: ['All perks', 'Kortna gear', 'Free slots'] },
]

export default function KortnaLoyalty() {
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
    <section style={{ background: 'var(--navy)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(226,255,103,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 64,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div className="section-label section-label-lime" style={{ marginBottom: 16 }}>
            🏆 {isAr ? 'نظام المكافآت' : 'Rewards System'}
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900, color: 'white', lineHeight: 1.05,
          }}>
            {isAr ? 'العب واكسب مكافآت' : 'Play More, Earn More'}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(235,235,225,0.45)', marginTop: 12, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {isAr ? 'كل حجز يكسبك نقاطاً. ارتقِ لمستويات أعلى واحصل على مكافآت حصرية.' : 'Every booking earns you XP. Level up and unlock exclusive rewards.'}
          </p>
        </div>

        {/* Tier cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className="loyalty-tier"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
                borderColor: tier.id === 'elite' ? `${tier.color}40` : undefined,
                background: tier.id === 'elite' ? `rgba(226,255,103,0.06)` : undefined,
              }}
            >
              {tier.id === 'elite' && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)`,
                }} />
              )}

              <div style={{ fontSize: 36, marginBottom: 12 }}>{tier.icon}</div>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 22,
                color: tier.color, marginBottom: 4,
              }}>
                {isAr ? tier.ar : tier.en}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
                {tier.xp === '0' ? (isAr ? 'ابدأ مجاناً' : 'Start free') : `${tier.xp}+ XP`}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tier.perks.map(perk => (
                  <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span style={{ color: tier.color, flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center', marginTop: 56,
          opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.5s',
        }}>
          <button
            onClick={() => window.location.href = '/rewards'}
            style={{
              padding: '14px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
              background: '#E2FF67', color: '#122744',
              fontSize: 15, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' as const,
              fontFamily: 'Barlow Condensed, sans-serif',
              boxShadow: '0 4px 24px rgba(226,255,103,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'translateY(-2px)'; b.style.boxShadow = '0 10px 32px rgba(226,255,103,0.5)' }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ''; b.style.boxShadow = '0 4px 24px rgba(226,255,103,0.35)' }}
          >
            {isAr ? 'اعرف نقاطك' : 'View My Rewards'}
          </button>
        </div>
      </div>
    </section>
  )
}
