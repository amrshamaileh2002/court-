'use client'
import RevealSection from './RevealSection'
import { useLang } from '@/context/LanguageContext'
import MagneticButton from './MagneticButton'

const PLANS = [
  {
    name: 'Player',   nameAr: 'لاعب',   price: 'Free', priceAr: 'مجاناً', period: '',
    features: { en: ['Browse all courts', 'Book & pay online', 'Basic loyalty points', 'Email support'], ar: ['تصفح الملاعب', 'حجز ودفع أونلاين', 'نقاط ولاء أساسية', 'دعم بريد إلكتروني'] },
    cta: 'Get Started', ctaAr: 'ابدأ الآن', highlight: false,
  },
  {
    name: 'Pro',      nameAr: 'برو',     price: '9 JD', priceAr: '9 دينار', period: '/mo',
    features: { en: ['Everything in Player', 'Priority booking', '2× loyalty points', 'Player matching', 'Chat support'], ar: ['كل مميزات اللاعب', 'أولوية الحجز', 'ضعف نقاط الولاء', 'مطابقة اللاعبين', 'دعم دردشة'] },
    cta: 'Go Pro', ctaAr: 'اشترك الآن', highlight: true,
  },
  {
    name: 'Court Owner', nameAr: 'مالك ملعب', price: '29 JD', priceAr: '29 دينار', period: '/mo',
    features: { en: ['Unlimited court listings', 'Analytics dashboard', 'Booking management', 'Revenue reports', 'Dedicated support'], ar: ['إعلانات ملاعب غير محدودة', 'لوحة تحليلات', 'إدارة الحجوزات', 'تقارير الإيرادات', 'دعم مخصص'] },
    cta: 'List Your Court', ctaAr: 'أضف ملعبك', highlight: false,
  },
]

export default function PricingSection() {
  const { lang } = useLang()
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
              {lang === 'ar' ? 'الأسعار' : 'Pricing'}
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl text-white">
              {lang === 'ar' ? 'بسيط وشفاف' : 'Simple & Transparent'}
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <RevealSection key={plan.name} delay={i * 100}>
              <div className={`relative rounded-3xl p-7 flex flex-col h-full ${plan.highlight ? 'shimmer-border' : ''}`}
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, #0f2035 0%, #1a3048 100%)' : 'rgba(255,255,255,0.04)',
                  border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                    {lang === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-bebas text-2xl text-white mb-1">{lang === 'ar' ? plan.nameAr : plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bebas text-5xl" style={{ color: plan.highlight ? 'var(--gold)' : 'white' }}>
                      {lang === 'ar' ? plan.priceAr : plan.price}
                    </span>
                    {plan.period && <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-7">
                  {(lang === 'ar' ? plan.features.ar : plan.features.en).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  onClick={() => window.location.href = '/waitlist'}
                  className="w-full py-3 rounded-2xl font-semibold text-sm"
                  style={plan.highlight
                    ? { background: 'var(--gold)', color: 'var(--navy)' } as React.CSSProperties
                    : { background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' } as React.CSSProperties}>
                  {lang === 'ar' ? plan.ctaAr : plan.cta}
                </MagneticButton>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
