'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import KortnaButton from '@/components/KortnaButton'
import { useLang } from '@/context/LanguageContext'

const BENEFITS = [
  { icon: '📊', en: { t: 'Analytics Dashboard', d: 'Real-time revenue, occupancy, and player data.' }, ar: { t: 'لوحة تحليلات', d: 'إيرادات ومعدل إشغال وبيانات لاعبين في الوقت الحقيقي.' } },
  { icon: '📅', en: { t: 'Smart Scheduling', d: 'Automated booking calendar. Zero double-bookings.' }, ar: { t: 'جدولة ذكية', d: 'تقويم حجز آلي. لا تعارض في الحجوزات.' } },
  { icon: '💳', en: { t: 'Online Payments', d: 'Accept card and CliQ. Instant settlement.' }, ar: { t: 'مدفوعات أونلاين', d: 'اقبل البطاقة وCliQ. تسوية فورية.' } },
  { icon: '📣', en: { t: 'Marketing Tools', d: 'Promote offers to 1,000+ active players.' }, ar: { t: 'أدوات تسويق', d: 'روّج عروضك لـ +1000 لاعب نشط.' } },
]

export default function ForCourtsPage() {
  const { lang } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [court, setCourt] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const isAr = lang === 'ar'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setDone(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56,
            alignItems: 'center',
          }}>
            {/* Left — Benefits */}
            <div>
              <span style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: 999,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'rgba(226,255,103,0.12)', color: '#E2FF67', marginBottom: 20,
              }}>
                {isAr ? 'لأصحاب الملاعب' : 'For Court Owners'}
              </span>
              <h1 style={{
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(40px, 6vw, 76px)',
                color: 'white',
                lineHeight: 1,
                marginBottom: 20,
              }}>
                {isAr ? 'زِد إيرادات ملعبك' : 'Grow Your Court Revenue'}
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', marginBottom: 40, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr
                  ? 'انضم لشبكة كورتنا واحصل على المزيد من الحجوزات، التحليلات، وإدارة مبسّطة.'
                  : 'Join the Kortna network and get more bookings, analytics, and simplified management.'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {BENEFITS.map((b, i) => (
                  <div key={i} style={{
                    borderRadius: 16, padding: '20px 18px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{b.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'white', marginBottom: 4, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{isAr ? b.ar.t : b.en.t}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{isAr ? b.ar.d : b.en.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div style={{
              borderRadius: 24, padding: 36,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(226,255,103,0.12)',
              backdropFilter: 'blur(12px)',
            }}>
              {done ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                  <h3 style={{
                    fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                    fontWeight: 900, color: 'white', fontSize: 28, marginBottom: 8,
                  }}>
                    {isAr ? 'شكراً لك!' : 'Thank You!'}
                  </h3>
                  <p style={{ color: 'rgba(226,255,103,0.75)', fontSize: 14, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                    {isAr ? 'سنتواصل معك قريباً.' : "We'll be in touch soon."}
                  </p>
                </div>
              ) : (
                <>
                  <h2 style={{
                    fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                    fontWeight: 900, color: 'white', fontSize: 28, marginBottom: 24,
                  }}>
                    {isAr ? 'أضف ملعبك' : 'List Your Court'}
                  </h2>
                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { label: isAr ? 'اسمك' : 'Your Name', value: name, set: setName, type: 'text', ph: isAr ? 'الاسم الكامل' : 'Full name' },
                      { label: isAr ? 'البريد الإلكتروني' : 'Email', value: email, set: setEmail, type: 'email', ph: 'email@example.com' },
                      { label: isAr ? 'اسم الملعب' : 'Court Name', value: court, set: setCourt, type: 'text', ph: isAr ? 'اسم ملعبك' : 'Your court name' },
                    ].map(f => (
                      <div key={f.label}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(235,235,225,0.55)', marginBottom: 6, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          required
                          value={f.value}
                          onChange={e => f.set(e.target.value)}
                          placeholder={f.ph}
                          className="venue-form-input"
                          style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                        />
                      </div>
                    ))}
                    <KortnaButton
                      type="submit"
                      variant="primary"
                      size="md"
                      fullWidth
                      disabled={loading}
                      style={{ marginTop: 8, fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif' }}
                    >
                      {loading ? '...' : (isAr ? 'أرسل الطلب' : 'Submit Request')}
                    </KortnaButton>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
