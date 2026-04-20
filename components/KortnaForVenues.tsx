'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import KortnaButton from './KortnaButton'

const BENEFIT_ICONS = [
  <svg key="b1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="b2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  <svg key="b3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  <svg key="b4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.08 })
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
    <section id="for-venues" style={{ background: 'var(--navy)', padding: '96px 0' }}>
      <div
        ref={ref}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 56,
          alignItems: 'center',
        }}>
          {/* Left — Benefits */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : isAr ? 'translateX(24px)' : 'translateX(-24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              background: 'rgba(226,255,103,0.1)',
              color: '#E2FF67',
              marginBottom: 20,
            }}>
              {isAr ? 'لأصحاب الملاعب' : 'For Venues'}
            </span>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.05,
              marginBottom: 16,
            }}>
              {t('venueTitle')}
            </h2>
            <p style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: 'rgba(235,235,225,0.6)',
              marginBottom: 40,
              fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              maxWidth: 440,
            }}>
              {t('venueSubtitle')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  style={{
                    display: 'flex',
                    gap: 16,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ease ${0.18 + i * 0.1}s, transform 0.5s ease ${0.18 + i * 0.1}s`,
                  }}
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 12,
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(226,255,103,0.1)',
                    color: '#E2FF67',
                    marginTop: 2,
                  }}>
                    {b.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: 14, marginBottom: 4, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{b.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(235,235,225,0.5)', lineHeight: 1.6, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(226,255,103,0.12)',
              borderRadius: 24,
              padding: 36,
              backdropFilter: 'blur(12px)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : isAr ? 'translateX(-24px)' : 'translateX(24px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  color: 'white',
                  fontSize: 24,
                  marginBottom: 8,
                }}>
                  {isAr ? 'تم استلام طلبك!' : 'Request Received!'}
                </h3>
                <p style={{ color: 'rgba(226,255,103,0.75)', fontSize: 14, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                  {t('venueFormSuccess')}
                </p>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  color: 'white',
                  fontSize: 24,
                  marginBottom: 24,
                }}>
                  {t('venueFormTitle')}
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { key: 'name',  label: t('venueFormName'),  ph: isAr ? 'أدخل اسمك' : 'Your full name', type: 'text' },
                    { key: 'court', label: t('venueFormCourt'), ph: isAr ? 'اسم الملعب' : 'e.g. Mecca Court', type: 'text' },
                    { key: 'phone', label: t('venueFormPhone'), ph: '+962 7X XXX XXXX', type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'rgba(235,235,225,0.55)',
                        marginBottom: 6,
                        fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                      }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        placeholder={field.ph}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        className="venue-form-input"
                        style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'rgba(235,235,225,0.55)',
                      marginBottom: 6,
                      fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                    }}>
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

                  <KortnaButton
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    disabled={loading}
                    style={{
                      marginTop: 8,
                      fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                    }}
                  >
                    {loading ? '...' : t('venueFormSubmit')}
                  </KortnaButton>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
