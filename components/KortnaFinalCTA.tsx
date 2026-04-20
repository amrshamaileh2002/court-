'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import KortnaButton from './KortnaButton'

function fireConfetti() {
  const colors = ['#E2FF67', '#1645D3', '#8BC4DE', '#ffffff']
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-particle'
    const vx = (Math.random() - 0.5) * 300
    const vy = -(Math.random() * 200 + 100)
    const rot = Math.random() * 720 - 360
    el.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${1+Math.random()*1.2}s;animation-delay:${Math.random()*0.3}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;border-radius:${Math.random()>0.5?'50%':'3px'};--vx:${vx}px;--vy:${vy}px;--rot:${rot}deg;`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2500)
  }
}

export default function KortnaFinalCTA() {
  const { t, lang } = useLang()
  const [inView, setInView] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isAr = lang === 'ar'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setDone(true)
    fireConfetti()
  }

  return (
    <section style={{ background: 'var(--navy)', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Glow orbs */}
      <div className="glow-orb" style={{ top: '5%', left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(22,69,211,0.18) 0%, transparent 70%)' }} />
      <div className="glow-orb" style={{ bottom: '5%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(226,255,103,0.07) 0%, transparent 70%)' }} />

      <div
        ref={ref}
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 24 }}>⚽</div>

        <h2 style={{
          fontSize: 'clamp(40px, 7vw, 76px)',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1,
          marginBottom: 16,
        }}>
          {t('ctaTitle')}{' '}
          <span style={{ color: '#E2FF67' }}>🏅</span>
        </h2>

        <p style={{
          fontSize: 16,
          lineHeight: 1.65,
          color: 'rgba(235,235,225,0.6)',
          marginBottom: 40,
          fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
        }}>
          {t('ctaSubtitle')}
        </p>

        {done ? (
          <div style={{
            borderRadius: 20,
            padding: '32px 28px',
            background: 'rgba(226,255,103,0.08)',
            border: '1px solid rgba(226,255,103,0.25)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
            <div style={{
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              color: 'white',
              fontSize: 26,
              marginBottom: 6,
            }}>
              {isAr ? 'أنت في القائمة!' : "You're on the list!"}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(226,255,103,0.7)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? 'سنعلمك عند الإطلاق.' : "We'll notify you when we launch."}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              maxWidth: 420,
              margin: '0 auto 32px',
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: 14,
                  fontSize: 14,
                  outline: 'none',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  direction: isAr ? 'rtl' : 'ltr',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(226,255,103,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <KortnaButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif', whiteSpace: 'nowrap' }}
              >
                {loading ? '...' : (isAr ? 'انضم' : 'Join')}
              </KortnaButton>
            </div>
          </form>
        )}

        {/* Main CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <KortnaButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/courts'}
            style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif' }}
          >
            {t('ctaBookButton')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </KortnaButton>
          <KortnaButton
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('for-venues')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif' }}
          >
            {t('ctaVenueButton')}
          </KortnaButton>
        </div>
      </div>
    </section>
  )
}
