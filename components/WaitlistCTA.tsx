'use client'
import { useState } from 'react'
import KortnaButton from './KortnaButton'
import { useLang } from '@/context/LanguageContext'

function fireConfetti() {
  const colors = ['#E2FF67', '#1645D3', '#8BC4DE', '#ffffff']
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-particle'
    el.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${0.8+Math.random()*1.2}s;animation-delay:${Math.random()*0.4}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;border-radius:${Math.random()>0.5?'50%':'2px'}`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2500)
  }
}

export default function WaitlistCTA() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const isAr = lang === 'ar'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setDone(true)
    fireConfetti()
  }

  return (
    <section style={{ background: 'var(--off-white)', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb" style={{ top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(22,69,211,0.05) 0%, transparent 70%)' }} />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🚀</div>
        <h2 style={{
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
          fontWeight: 900, fontSize: 'clamp(40px, 7vw, 72px)',
          color: 'var(--navy)', lineHeight: 1, marginBottom: 16,
        }}>
          {isAr ? 'كن أول من يعرف' : 'Be First to Know'}
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text2)', marginBottom: 40, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
          {isAr
            ? 'كورتنا قادمة. سجّل بريدك الآن للحصول على وصول مبكر وعروض حصرية.'
            : 'Kortna launches soon. Join the waitlist for early access and exclusive launch offers.'}
        </p>

        {done ? (
          <div style={{ borderRadius: 20, padding: '32px 28px', background: 'rgba(22,69,211,0.06)', border: '1px solid rgba(22,69,211,0.15)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
            <div style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif', fontWeight: 900, color: 'var(--navy)', fontSize: 26, marginBottom: 6 }}>
              {isAr ? 'أنت في القائمة!' : "You're on the list!"}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? 'سنعلمك عند الإطلاق.' : "We'll notify you at launch."}
            </div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'}
              style={{
                flex: 1, padding: '14px 18px', borderRadius: 14, fontSize: 14,
                outline: 'none',
                background: 'white',
                border: '1.5px solid rgba(18,39,68,0.15)',
                color: 'var(--navy)',
                direction: isAr ? 'rtl' : 'ltr',
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}
            />
            <KortnaButton
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              style={{ whiteSpace: 'nowrap', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
            >
              {loading ? '...' : (isAr ? 'انضم' : 'Join Now')}
            </KortnaButton>
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, marginTop: 40, flexWrap: 'wrap' }}>
          {[
            { n: '1,200+', l: isAr ? 'في القائمة' : 'on waitlist' },
            { n: '200+', l: isAr ? 'ملعب شريك' : 'partner courts' },
            { n: '2026', l: isAr ? 'إطلاق' : 'launch year' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 28, color: 'var(--navy)' }}>{s.n}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
