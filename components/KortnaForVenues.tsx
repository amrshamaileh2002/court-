'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const BENEFIT_ICONS = [
  <svg key="slots" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>,
  <svg key="dash" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>,
  <svg key="free" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>,
  <svg key="payout" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>,
]

export default function KortnaForVenues() {
  const { t, lang } = useLang()
  const [inView, setInView] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', court: '', phone: '', sport: '' })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isAr = lang === 'ar'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  const benefits = [
    { icon: BENEFIT_ICONS[0], title: t('venueBenefit1'), desc: t('venueBenefit1Desc') },
    { icon: BENEFIT_ICONS[1], title: t('venueBenefit2'), desc: t('venueBenefit2Desc') },
    { icon: BENEFIT_ICONS[2], title: t('venueBenefit3'), desc: t('venueBenefit3Desc') },
    { icon: BENEFIT_ICONS[3], title: t('venueBenefit4'), desc: t('venueBenefit4Desc') },
  ]

  return (
    <section id="for-venues" className="py-24 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Benefits */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : isAr ? 'translateX(24px)' : 'translateX(-24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: 'rgba(226,255,103,0.12)', color: '#E2FF67' }}
            >
              {isAr ? 'لأصحاب الملاعب' : 'For Venues'}
            </span>
            <h2
              className="font-barlow-cond font-black text-white mb-4"
              style={{
                fontSize: 'clamp(36px,4.5vw,56px)',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              }}
            >
              {t('venueTitle')}
            </h2>
            <p
              className="text-base mb-10 leading-relaxed"
              style={{ color: 'rgba(235,235,225,0.65)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
            >
              {t('venueSubtitle')}
            </p>

            {/* Benefits list */}
            <div className="space-y-6">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="flex gap-4"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(226,255,103,0.12)', color: '#E2FF67' }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: 'white', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                    >
                      {b.title}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: 'rgba(235,235,225,0.55)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                    >
                      {b.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="rounded-3xl p-8"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(226,255,103,0.15)',
              backdropFilter: 'blur(12px)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : isAr ? 'translateX(-24px)' : 'translateX(24px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3
                  className="font-barlow-cond font-black text-white text-2xl mb-2"
                  style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif' }}
                >
                  {isAr ? 'تم استلام طلبك!' : 'Request Received!'}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(226,255,103,0.8)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                  {t('venueFormSuccess')}
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="font-barlow-cond font-black text-white text-2xl mb-6"
                  style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif' }}
                >
                  {t('venueFormTitle')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name',  label: t('venueFormName'),  placeholder: isAr ? 'أدخل اسمك' : 'Your full name', type: 'text' },
                    { key: 'court', label: t('venueFormCourt'), placeholder: isAr ? 'اسم الملعب' : 'e.g. Mecca Court', type: 'text' },
                    { key: 'phone', label: t('venueFormPhone'), placeholder: '+962 7X XXX XXXX', type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(235,235,225,0.6)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        className="venue-form-input"
                        style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(235,235,225,0.6)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                      {t('venueFormSport')}
                    </label>
                    <select
                      value={form.sport}
                      onChange={e => setForm({ ...form, sport: e.target.value })}
                      className="venue-form-input"
                      style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                    >
                      <option value="">{isAr ? 'اختر الرياضة' : 'Select sport'}</option>
                      {['padel', 'football', 'basketball', 'tennis', 'swimming', 'badminton'].map(s => (
                        <option key={s} value={s} style={{ background: '#122744' }}>{t(s as any)}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                    style={{
                      background: loading ? 'rgba(226,255,103,0.5)' : '#E2FF67',
                      color: '#122744',
                      fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                    }}
                  >
                    {loading ? '...' : t('venueFormSubmit')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
