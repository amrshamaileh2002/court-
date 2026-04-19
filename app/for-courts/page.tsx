'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RevealSection from '@/components/RevealSection'
import MagneticButton from '@/components/MagneticButton'
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setDone(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                {lang === 'ar' ? 'لأصحاب الملاعب' : 'For Court Owners'}
              </span>
              <h1 className="font-bebas text-5xl md:text-7xl text-white mb-6">
                {lang === 'ar' ? 'زِد إيرادات ملعبك' : 'Grow Your Court Revenue'}
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {lang === 'ar'
                  ? 'انضم لشبكة لعيبة أرينا واحصل على المزيد من الحجوزات، التحليلات، وإدارة مبسّطة.'
                  : 'Join the La3ebeh Arena network and get more bookings, analytics, and simplified management.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="rounded-2xl p-4"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-2xl mb-2">{b.icon}</div>
                    <div className="font-semibold text-sm text-white mb-1">{lang === 'ar' ? b.ar.t : b.en.t}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{lang === 'ar' ? b.ar.d : b.en.d}</div>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* Partner form */}
            <RevealSection delay={200}>
              <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {done ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="font-bebas text-3xl text-white mb-2">
                      {lang === 'ar' ? 'شكراً لك!' : 'Thank You!'}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {lang === 'ar' ? 'سنتواصل معك قريباً.' : "We'll be in touch soon."}
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-bebas text-3xl text-white mb-6">
                      {lang === 'ar' ? 'أضف ملعبك' : 'List Your Court'}
                    </h2>
                    <form onSubmit={submit} className="space-y-4">
                      {[
                        { label: lang === 'ar' ? 'اسمك' : 'Your Name', value: name, set: setName, type: 'text', ph: lang === 'ar' ? 'الاسم الكامل' : 'Full name' },
                        { label: lang === 'ar' ? 'البريد الإلكتروني' : 'Email', value: email, set: setEmail, type: 'email', ph: 'email@example.com' },
                        { label: lang === 'ar' ? 'اسم الملعب' : 'Court Name', value: court, set: setCourt, type: 'text', ph: lang === 'ar' ? 'اسم ملعبك' : 'Your court name' },
                      ].map(f => (
                        <div key={f.label}>
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.label}</label>
                          <input type={f.type} required value={f.value} onChange={e => f.set(e.target.value)}
                            placeholder={f.ph}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }} />
                        </div>
                      ))}
                      <MagneticButton type="submit" disabled={loading}
                        className="w-full py-3 rounded-2xl font-semibold text-sm mt-2"
                        style={{ background: 'var(--gold)', color: 'var(--navy)', opacity: loading ? 0.7 : 1 } as React.CSSProperties}>
                        {loading ? '...' : (lang === 'ar' ? 'أرسل الطلب' : 'Submit Request')}
                      </MagneticButton>
                    </form>
                  </>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
