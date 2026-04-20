'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import KortnaButton from '@/components/KortnaButton'
import { useLang } from '@/context/LanguageContext'

type WaitlistEntry = { id: string; name: string; whatsapp: string; createdAt: string }

function fireConfetti() {
  const colors = ['#E2FF67', '#1645D3', '#8BC4DE', '#ffffff']
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-particle'
    el.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${0.8+Math.random()*1.2}s;animation-delay:${Math.random()*0.5}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;border-radius:${Math.random()>0.5?'50%':'2px'}`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3000)
  }
}

export default function WaitlistPage() {
  const { lang } = useLang()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [sport, setSport] = useState('')
  const [loading, setLoading] = useState(false)
  const [joined, setJoined] = useState(false)
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const isAr = lang === 'ar'

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

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 14, fontSize: 14,
    outline: 'none', boxSizing: 'border-box' as const,
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    color: 'white',
    fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
    direction: isAr ? 'rtl' as const : 'ltr' as const,
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />

      <section style={{ flex: 1, padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              background: 'rgba(226,255,103,0.12)', color: '#E2FF67', marginBottom: 16,
            }}>
              {isAr ? 'قائمة الانتظار' : 'Waitlist'}
            </span>
            <h1 style={{
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, fontSize: 'clamp(44px, 8vw, 72px)',
              color: 'white', lineHeight: 1, marginBottom: 12,
            }}>
              {isAr ? 'احجز مكانك الآن' : 'Secure Your Spot'}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? `انضم إلى ${entries.length}+ شخص في القائمة` : `Join ${entries.length}+ people on the waitlist`}
            </p>
          </div>

          {joined ? (
            <div style={{
              borderRadius: 24, padding: '48px 32px', textAlign: 'center',
              background: 'rgba(226,255,103,0.07)',
              border: '1px solid rgba(226,255,103,0.2)',
            }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h2 style={{
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                fontWeight: 900, fontSize: 36, color: 'white', marginBottom: 8,
              }}>
                {isAr ? 'أنت في القائمة!' : "You're In!"}
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr ? 'سنتواصل معك عبر واتساب عند الإطلاق.' : "We'll reach out via WhatsApp at launch."}
              </p>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
                fontSize: 80, color: '#E2FF67', lineHeight: 1,
              }}>
                #{entries.length}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr ? 'موقعك في القائمة' : 'Your position'}
              </div>
            </div>
          ) : (
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {/* Step indicator */}
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{
                    flex: 1, padding: '14px 0', textAlign: 'center', fontSize: 12, fontWeight: 700,
                    color: step >= s ? '#E2FF67' : 'rgba(255,255,255,0.3)',
                    background: step === s ? 'rgba(226,255,103,0.08)' : 'transparent',
                    transition: 'all 0.2s',
                    fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                  }}>
                    {s === 1 ? (isAr ? 'معلوماتك' : 'Your Info') : s === 2 ? (isAr ? 'رياضتك' : 'Your Sport') : (isAr ? 'تأكيد' : 'Confirm')}
                  </div>
                ))}
              </div>

              <div style={{ padding: 28 }}>
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 8, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                        {isAr ? 'اسمك' : 'Your Name'} *
                      </label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)}
                        placeholder={isAr ? 'الاسم الكامل' : 'Full name'} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 8, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                        {isAr ? 'واتساب' : 'WhatsApp'} *
                      </label>
                      <input type="tel" required value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
                        placeholder="+962 7X XXX XXXX" dir="ltr" style={inputStyle} />
                    </div>
                    <KortnaButton
                      variant="primary" size="md" fullWidth
                      onClick={() => name && whatsapp && setStep(2)}
                      style={{ marginTop: 8, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                    >
                      {isAr ? 'التالي ←' : 'Next →'}
                    </KortnaButton>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p style={{ fontSize: 14, marginBottom: 16, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                      {isAr ? 'ما رياضتك المفضلة؟' : "What's your favorite sport?"}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                      {SPORTS_LIST.map(s => (
                        <button key={s.slug} onClick={() => setSport(s.slug)} style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          padding: '14px 8px', borderRadius: 14, cursor: 'pointer',
                          background: sport === s.slug ? 'rgba(226,255,103,0.15)' : 'rgba(255,255,255,0.04)',
                          border: sport === s.slug ? '1.5px solid #E2FF67' : '1px solid rgba(255,255,255,0.08)',
                          transition: 'all 0.2s',
                        }}>
                          <span style={{ fontSize: 24 }}>{s.emoji}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'white', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{isAr ? s.ar : s.en}</span>
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(1)} style={{
                        flex: 1, padding: '14px', borderRadius: 14, fontSize: 14, fontWeight: 700,
                        cursor: 'pointer', border: 'none',
                        background: 'rgba(255,255,255,0.07)', color: 'white',
                      }}>←</button>
                      <KortnaButton
                        variant="primary" size="md"
                        onClick={() => sport && setStep(3)}
                        style={{ flex: 3, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                      >
                        {isAr ? 'التالي ←' : 'Next →'}
                      </KortnaButton>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                    <h3 style={{
                      fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                      fontWeight: 900, fontSize: 24, color: 'white', marginBottom: 16,
                    }}>
                      {isAr ? 'تأكيد الانضمام' : 'Confirm Join'}
                    </h3>
                    <div style={{ borderRadius: 14, padding: 16, marginBottom: 20, textAlign: isAr ? 'right' : 'left', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: 13, color: 'white', marginBottom: 6 }}><span style={{ color: '#E2FF67' }}>Name:</span> {name}</div>
                      <div style={{ fontSize: 13, color: 'white', marginBottom: 6 }}><span style={{ color: '#E2FF67' }}>WhatsApp:</span> {whatsapp}</div>
                      <div style={{ fontSize: 13, color: 'white' }}><span style={{ color: '#E2FF67' }}>Sport:</span> {SPORTS_LIST.find(s => s.slug === sport)?.[isAr ? 'ar' : 'en']}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(2)} style={{
                        flex: 1, padding: '14px', borderRadius: 14, fontSize: 14, fontWeight: 700,
                        cursor: 'pointer', border: 'none',
                        background: 'rgba(255,255,255,0.07)', color: 'white',
                      }}>←</button>
                      <KortnaButton
                        variant="primary" size="md"
                        onClick={submit}
                        disabled={loading}
                        style={{ flex: 3, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                      >
                        {loading ? '...' : (isAr ? 'انضم الآن 🎉' : 'Join Now 🎉')}
                      </KortnaButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
