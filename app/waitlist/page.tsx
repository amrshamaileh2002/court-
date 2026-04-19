'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MagneticButton from '@/components/MagneticButton'
import RevealSection from '@/components/RevealSection'
import { useLang } from '@/context/LanguageContext'

type WaitlistEntry = { id: string; name: string; whatsapp: string; createdAt: string }

function fireConfetti() {
  const colors = ['#C9A84C', '#F5D98A', '#0B1C2C', '#ffffff', '#1B6CA8']
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-particle'
    el.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${0.8+Math.random()*1.2}s;animation-delay:${Math.random()*0.5}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;border-radius:${Math.random()>0.5?'50%':'2px'}`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3000)
  }
}

export default function WaitlistPage() {
  const { t, lang } = useLang()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [sport, setSport] = useState('')
  const [loading, setLoading] = useState(false)
  const [joined, setJoined] = useState(false)
  const [entries, setEntries] = useState<WaitlistEntry[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('waitlistEntries')
    if (saved) setEntries(JSON.parse(saved))
    else {
      const seed = ['Ahmad K.', 'Sara M.', 'Khalid T.', 'Rania S.', 'Omar N.'].map((n, i) => ({
        id: `s${i}`, name: n, whatsapp: `+96279000000${i}`, createdAt: new Date().toISOString()
      }))
      setEntries(seed)
      localStorage.setItem('waitlistEntries', JSON.stringify(seed))
    }
    if (localStorage.getItem('myWaitlistEntry')) setJoined(true)
  }, [])

  const SPORTS_LIST = [
    { slug: 'padel', emoji: '🏓', en: 'Padel', ar: 'بادل' },
    { slug: 'football', emoji: '⚽', en: 'Football', ar: 'كرة القدم' },
    { slug: 'basketball', emoji: '🏀', en: 'Basketball', ar: 'كرة السلة' },
    { slug: 'tennis', emoji: '🎾', en: 'Tennis', ar: 'تنس' },
    { slug: 'swimming', emoji: '🏊', en: 'Swimming', ar: 'سباحة' },
    { slug: 'badminton', emoji: '🏸', en: 'Badminton', ar: 'ريشة طائرة' },
  ]

  const submit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    const entry: WaitlistEntry = { id: `wl-${Date.now()}`, name, whatsapp, createdAt: new Date().toISOString() }
    const updated = [...entries, entry]
    setEntries(updated)
    localStorage.setItem('waitlistEntries', JSON.stringify(updated))
    localStorage.setItem('myWaitlistEntry', JSON.stringify(entry))
    setLoading(false)
    setJoined(true)
    fireConfetti()
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--navy)' }}>
      <Navbar />

      <section className="flex-1 py-20 px-5 sm:px-8">
        <div className="max-w-lg mx-auto">
          <RevealSection>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                {lang === 'ar' ? 'قائمة الانتظار' : 'Waitlist'}
              </span>
              <h1 className="font-bebas text-6xl text-white mb-3">
                {lang === 'ar' ? 'احجز مكانك الآن' : 'Secure Your Spot'}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                {lang === 'ar'
                  ? `انضم إلى ${entries.length}+ شخص في القائمة`
                  : `Join ${entries.length}+ people on the waitlist`}
              </p>
            </div>
          </RevealSection>

          {joined ? (
            <RevealSection>
              <div className="rounded-3xl p-10 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-6xl mb-5">🎉</div>
                <h2 className="font-bebas text-4xl text-white mb-2">
                  {lang === 'ar' ? 'أنت في القائمة!' : "You're In!"}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {lang === 'ar' ? 'سنتواصل معك عبر واتساب عند الإطلاق.' : "We'll reach out via WhatsApp at launch."}
                </p>
                <div className="mt-8 font-bebas text-7xl" style={{ color: 'var(--gold)' }}>
                  #{entries.length}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {lang === 'ar' ? 'موقعك في القائمة' : 'Your position'}
                </div>
              </div>
            </RevealSection>
          ) : (
            <RevealSection delay={100}>
              <div className="rounded-3xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Step indicator */}
                <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {[1, 2, 3].map(s => (
                    <div key={s} className="flex-1 py-3 text-center text-xs font-bold transition-all"
                      style={{ color: step >= s ? 'var(--gold)' : 'rgba(255,255,255,0.3)', background: step === s ? 'rgba(201,168,76,0.1)' : 'transparent' }}>
                      {s === 1 ? (lang === 'ar' ? 'معلوماتك' : 'Your Info') : s === 2 ? (lang === 'ar' ? 'رياضتك' : 'Your Sport') : (lang === 'ar' ? 'تأكيد' : 'Confirm')}
                    </div>
                  ))}
                </div>

                <div className="p-8">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {lang === 'ar' ? 'اسمك' : 'Your Name'} *
                        </label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full name'}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {lang === 'ar' ? 'واتساب' : 'WhatsApp'} *
                        </label>
                        <input type="tel" required value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
                          placeholder="+962 7X XXX XXXX" dir="ltr"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }} />
                      </div>
                      <MagneticButton onClick={() => name && whatsapp && setStep(2)}
                        className="w-full py-3 rounded-2xl font-semibold text-sm mt-2"
                        style={{ background: 'var(--gold)', color: 'var(--navy)' } as React.CSSProperties}>
                        {lang === 'ar' ? 'التالي →' : 'Next →'}
                      </MagneticButton>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="text-sm mb-4 text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {lang === 'ar' ? 'ما رياضتك المفضلة؟' : "What's your favorite sport?"}
                      </p>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {SPORTS_LIST.map(s => (
                          <button key={s.slug} onClick={() => setSport(s.slug)}
                            className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                            style={sport === s.slug
                              ? { background: 'rgba(201,168,76,0.2)', border: '1.5px solid var(--gold)' }
                              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <span className="text-2xl">{s.emoji}</span>
                            <span className="text-xs font-semibold text-white">{lang === 'ar' ? s.ar : s.en}</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                          style={{ background: 'rgba(255,255,255,0.07)', color: 'white' }}>
                          ←
                        </button>
                        <MagneticButton onClick={() => sport && setStep(3)}
                          className="flex-[3] py-3 rounded-2xl font-semibold text-sm"
                          style={{ background: 'var(--gold)', color: 'var(--navy)' } as React.CSSProperties}>
                          {lang === 'ar' ? 'التالي →' : 'Next →'}
                        </MagneticButton>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="text-center">
                      <div className="text-4xl mb-4">✅</div>
                      <h3 className="font-bebas text-2xl text-white mb-4">{lang === 'ar' ? 'تأكيد الانضمام' : 'Confirm Join'}</h3>
                      <div className="rounded-2xl p-4 mb-6 text-left"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="text-sm text-white mb-1"><span style={{ color: 'var(--gold)' }}>Name:</span> {name}</div>
                        <div className="text-sm text-white mb-1"><span style={{ color: 'var(--gold)' }}>WhatsApp:</span> {whatsapp}</div>
                        <div className="text-sm text-white"><span style={{ color: 'var(--gold)' }}>Sport:</span> {SPORTS_LIST.find(s => s.slug === sport)?.[lang === 'ar' ? 'ar' : 'en']}</div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                          style={{ background: 'rgba(255,255,255,0.07)', color: 'white' }}>
                          ←
                        </button>
                        <MagneticButton onClick={submit} disabled={loading}
                          className="flex-[3] py-3 rounded-2xl font-semibold text-sm"
                          style={{ background: 'var(--gold)', color: 'var(--navy)', opacity: loading ? 0.7 : 1 } as React.CSSProperties}>
                          {loading ? '...' : (lang === 'ar' ? 'انضم الآن 🎉' : 'Join Now 🎉')}
                        </MagneticButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </RevealSection>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
