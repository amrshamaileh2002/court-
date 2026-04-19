'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

function fireConfetti() {
  const colors = ['#E2FF67', '#1645D3', '#8BC4DE', '#ffffff']
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-particle'
    const vx = (Math.random() - 0.5) * 300
    const vy = -(Math.random() * 200 + 100)
    const rot = Math.random() * 720 - 360
    el.style.cssText = `
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${1+Math.random()*1.2}s;
      animation-delay:${Math.random()*0.3}s;
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      border-radius:${Math.random()>0.5?'50%':'3px'};
      --vx:${vx}px;
      --vy:${vy}px;
      --rot:${rot}deg;
    `
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.15 })
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
    <section
      className="py-28 px-5 sm:px-8 relative overflow-hidden"
      style={{ background: 'var(--navy)' }}
    >
      {/* Glow orbs */}
      <div className="glow-orb pointer-events-none" style={{ top: '10%', left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(22,69,211,0.18) 0%, transparent 70%)' }} />
      <div className="glow-orb pointer-events-none" style={{ bottom: '5%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(226,255,103,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-2xl mx-auto text-center relative z-10" ref={ref}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="text-5xl mb-6">⚽</div>

          <h2
            className="font-barlow-cond font-black text-white mb-4"
            style={{
              fontSize: 'clamp(40px,7vw,80px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            }}
          >
            {t('ctaTitle')}{' '}
            <span style={{ color: '#E2FF67' }}>
              {isAr ? '⚡' : '🏅'}
            </span>
          </h2>

          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: 'rgba(235,235,225,0.65)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
          >
            {t('ctaSubtitle')}
          </p>

          {done ? (
            <div
              className="rounded-3xl p-8"
              style={{ background: 'rgba(226,255,103,0.1)', border: '1px solid rgba(226,255,103,0.3)' }}
            >
              <div className="text-4xl mb-3">🎉</div>
              <div
                className="font-barlow-cond font-black text-white text-3xl mb-1"
                style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif' }}
              >
                {isAr ? 'أنت في القائمة!' : "You're on the list!"}
              </div>
              <div className="text-sm" style={{ color: 'rgba(226,255,103,0.7)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr ? 'سنعلمك عند الإطلاق.' : "We'll notify you when we launch."}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'}
                className="flex-1 px-5 py-3.5 rounded-2xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  direction: isAr ? 'rtl' : 'ltr',
                  fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all hover:scale-105 active:scale-95"
                style={{
                  background: loading ? 'rgba(226,255,103,0.5)' : '#E2FF67',
                  color: '#122744',
                  opacity: loading ? 0.7 : 1,
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                }}
              >
                {loading ? '...' : (isAr ? 'انضم الآن' : 'Join Now')}
              </button>
            </form>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => window.location.href = '/courts'}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: '#E2FF67',
                color: '#122744',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
              }}
            >
              {t('ctaBookButton')}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('for-venues')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
              }}
            >
              {t('ctaVenueButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
