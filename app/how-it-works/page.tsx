'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HowItWorksSection from '@/components/HowItWorksSection'
import WaitlistCTA from '@/components/WaitlistCTA'
import { useLang } from '@/context/LanguageContext'

const FAQ = [
  { en: { q: 'Is Kortna free to use?', a: 'Yes! Players can browse and book courts for free. Pro and Owner plans are optional upgrades.' }, ar: { q: 'هل كورتنا مجانية؟', a: 'نعم! يمكن للاعبين التصفح والحجز مجاناً. خطط برو والمالك اختيارية.' } },
  { en: { q: 'How do I pay for a booking?', a: 'Pay online via card or at the court via cash. We support CliQ and Visa.' }, ar: { q: 'كيف أدفع للحجز؟', a: 'ادفع أونلاين بالبطاقة أو في الملعب نقداً. ندعم CliQ وVisa.' } },
  { en: { q: 'Can I cancel or reschedule?', a: 'Yes, you can cancel up to 2 hours before your slot for a full refund.' }, ar: { q: 'هل يمكنني الإلغاء أو إعادة الجدولة؟', a: 'نعم، يمكنك الإلغاء حتى ساعتين قبل موعدك لاسترداد كامل.' } },
  { en: { q: 'When does the app launch?', a: 'We are targeting 2026. Join the waitlist for early access.' }, ar: { q: 'متى ينطلق التطبيق؟', a: 'نستهدف 2026. انضم للقائمة للوصول المبكر.' } },
]

export default function HowItWorksPage() {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '80px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <span style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
            background: 'rgba(226,255,103,0.12)', color: '#E2FF67', marginBottom: 16,
          }}>
            {isAr ? 'كيف يعمل' : 'How It Works'}
          </span>
          <h1 style={{
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900, fontSize: 'clamp(44px, 7vw, 80px)',
            color: 'white', lineHeight: 1, marginBottom: 16,
          }}>
            {isAr ? 'بسيط. سريع. رياضي.' : 'Simple. Fast. Sporty.'}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {isAr ? 'من التصفح إلى الملعب في أقل من دقيقة.' : 'From browsing to the court in under a minute.'}
          </p>
        </div>
      </section>

      <HowItWorksSection />

      {/* FAQ */}
      <section style={{ background: 'var(--off-white)', padding: '96px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)',
            color: 'var(--navy)', textAlign: 'center', marginBottom: 48,
          }}>
            {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{
                borderRadius: 16, padding: '24px',
                background: 'white',
                border: '1px solid rgba(18,39,68,0.08)',
                boxShadow: '0 2px 8px rgba(18,39,68,0.04)',
              }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 8, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                  {isAr ? item.ar.q : item.en.q}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text2)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                  {isAr ? item.ar.a : item.en.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaitlistCTA />
      <Footer />
    </div>
  )
}
