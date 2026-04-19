'use client'
import { useState } from 'react'
import RevealSection from './RevealSection'
import MagneticButton from './MagneticButton'
import { useLang } from '@/context/LanguageContext'

function fireConfetti() {
  const colors = ['#C9A84C', '#F5D98A', '#0B1C2C', '#ffffff']
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
    <section className="py-28 px-5 sm:px-8 relative overflow-hidden" style={{ background: 'var(--off-white)' }}>
      <div className="glow-orb" style={{ top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <RevealSection>
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="font-bebas text-5xl md:text-7xl mb-4" style={{ color: 'var(--navy)' }}>
            {lang === 'ar' ? 'كن أول من يعرف' : 'Be First to Know'}
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--text2)' }}>
            {lang === 'ar'
              ? 'لعيبة أرينا قادمة في 2025. سجّل بريدك الآن للحصول على وصول مبكر وعروض حصرية.'
              : 'La3ebeh Arena launches in 2025. Join the waitlist for early access and exclusive launch offers.'}
          </p>

          {done ? (
            <div className="rounded-2xl p-8" style={{ background: 'var(--navy)' }}>
              <div className="text-4xl mb-3">🎉</div>
              <div className="font-bebas text-3xl text-white mb-1">
                {lang === 'ar' ? 'أنت في القائمة!' : "You're on the list!"}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {lang === 'ar' ? 'سنعلمك عند الإطلاق.' : "We'll notify you at launch."}
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
                className="flex-1 px-5 py-3 rounded-2xl text-sm outline-none"
                style={{ background: 'white', border: '1.5px solid rgba(11,28,44,0.15)', color: 'var(--navy)', direction: lang === 'ar' ? 'rtl' : 'ltr' }}
              />
              <MagneticButton
                type="submit"
                disabled={loading}
                className="px-7 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap"
                style={{ background: 'var(--gold)', color: 'var(--navy)', opacity: loading ? 0.7 : 1 } as React.CSSProperties}>
                {loading ? '...' : (lang === 'ar' ? 'انضم' : 'Join Now')}
              </MagneticButton>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {[
              { n: '1,200+', l: lang === 'ar' ? 'في القائمة' : 'on waitlist' },
              { n: '200+',   l: lang === 'ar' ? 'ملعب شريك' : 'partner courts' },
              { n: '2025',   l: lang === 'ar' ? 'إطلاق' : 'launch year' },
            ].map(s => (
              <div key={s.n} className="text-center">
                <div className="font-bebas text-2xl" style={{ color: 'var(--navy)' }}>{s.n}</div>
                <div className="text-xs" style={{ color: 'var(--text3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
