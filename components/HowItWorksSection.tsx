'use client'
import { useLang } from '@/context/LanguageContext'

const STEPS = [
  { num: '01', icon: '🔍', en: { title: 'Browse Courts', desc: 'Filter by sport, location, price, and rating. See live availability.' }, ar: { title: 'تصفح الملاعب', desc: 'فلتر حسب الرياضة، الموقع، السعر، والتقييم. شاهد التوفر الفوري.' } },
  { num: '02', icon: '📅', en: { title: 'Pick Your Slot', desc: 'Select date and time from real-time availability. No double-bookings ever.' }, ar: { title: 'اختر وقتك', desc: 'اختر التاريخ والوقت من التوفر الفوري. لا تعارض في الحجوزات أبداً.' } },
  { num: '03', icon: '💳', en: { title: 'Pay Securely', desc: 'Pay online or at court. Get instant confirmation and QR code.' }, ar: { title: 'ادفع بأمان', desc: 'ادفع أونلاين أو في الملعب. احصل على تأكيد فوري وQR code.' } },
  { num: '04', icon: '🏆', en: { title: 'Earn Points', desc: 'Every booking earns loyalty points. Climb tiers. Unlock rewards.' }, ar: { title: 'اكسب نقاط', desc: 'كل حجز يكسبك نقاط ولاء. ارتقِ المراتب. افتح مكافآت حصرية.' } },
]

export default function HowItWorksSection() {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  return (
    <section id="how-it-works" style={{ background: 'var(--navy)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
            background: 'rgba(226,255,103,0.12)', color: '#E2FF67', marginBottom: 16,
          }}>
            {isAr ? 'كيف يعمل' : 'How It Works'}
          </span>
          <h2 style={{
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900, fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'white', lineHeight: 1,
          }}>
            {isAr ? 'أربع خطوات بسيطة' : 'Four Simple Steps'}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
        }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                width: 80, height: 80, borderRadius: 20, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
                background: 'rgba(226,255,103,0.08)',
                border: '1.5px solid rgba(226,255,103,0.25)',
              }}>
                <span style={{ fontSize: 32 }}>{step.icon}</span>
                <span style={{
                  position: 'absolute', top: -10, right: -10,
                  fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 11,
                  width: 26, height: 26, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#E2FF67', color: '#122744',
                }}>
                  {step.num}
                </span>
              </div>
              <h3 style={{
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                fontWeight: 900, fontSize: 22, color: 'white', marginBottom: 8,
              }}>
                {isAr ? step.ar.title : step.en.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr ? step.ar.desc : step.en.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
