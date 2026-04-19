'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HowItWorksSection from '@/components/HowItWorksSection'
import WaitlistCTA from '@/components/WaitlistCTA'
import RevealSection from '@/components/RevealSection'
import { useLang } from '@/context/LanguageContext'

const FAQ = [
  { en: { q: 'Is La3ebeh Arena free to use?', a: 'Yes! Players can browse and book courts for free. Pro and Owner plans are optional upgrades.' }, ar: { q: 'هل لعيبة أرينا مجانية؟', a: 'نعم! يمكن للاعبين التصفح والحجز مجاناً. خطط برو والمالك اختيارية.' } },
  { en: { q: 'How do I pay for a booking?', a: 'Pay online via card or at the court via cash. We support CliQ and Visa.' }, ar: { q: 'كيف أدفع للحجز؟', a: 'ادفع أونلاين بالبطاقة أو في الملعب نقداً. ندعم CliQ وVisa.' } },
  { en: { q: 'Can I cancel or reschedule?', a: 'Yes, you can cancel up to 2 hours before your slot for a full refund.' }, ar: { q: 'هل يمكنني الإلغاء أو إعادة الجدولة؟', a: 'نعم، يمكنك الإلغاء حتى ساعتين قبل موعدك لاسترداد كامل.' } },
  { en: { q: 'When does the app launch?', a: 'We are targeting Q1 2025. Join the waitlist for early access.' }, ar: { q: 'متى ينطلق التطبيق؟', a: 'نستهدف الربع الأول من 2025. انضم للقائمة للوصول المبكر.' } },
]

export default function HowItWorksPage() {
  const { lang } = useLang()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-5 sm:px-8 text-center" style={{ background: 'var(--navy)' }}>
        <RevealSection>
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
            {lang === 'ar' ? 'كيف يعمل' : 'How It Works'}
          </span>
          <h1 className="font-bebas text-6xl md:text-7xl text-white mb-4">
            {lang === 'ar' ? 'بسيط. سريع. رياضي.' : 'Simple. Fast. Sporty.'}
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lang === 'ar'
              ? 'من التصفح إلى الملعب في أقل من دقيقة.'
              : 'From browsing to the court in under a minute.'}
          </p>
        </RevealSection>
      </section>

      <HowItWorksSection />

      {/* FAQ */}
      <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--off-white)' }}>
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="font-bebas text-5xl text-center mb-12" style={{ color: 'var(--navy)' }}>
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </h2>
          </RevealSection>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid rgba(11,28,44,0.08)' }}>
                  <div className="font-semibold mb-2" style={{ color: 'var(--navy)' }}>
                    {lang === 'ar' ? item.ar.q : item.en.q}
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                    {lang === 'ar' ? item.ar.a : item.en.a}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <WaitlistCTA />
      <Footer />
    </div>
  )
}
