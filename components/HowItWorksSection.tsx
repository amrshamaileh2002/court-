'use client'
import RevealSection from './RevealSection'
import { useLang } from '@/context/LanguageContext'

const STEPS = [
  { num: '01', icon: '🔍', en: { title: 'Browse Courts', desc: 'Filter by sport, location, price, and rating. See live availability.' }, ar: { title: 'تصفح الملاعب', desc: 'فلتر حسب الرياضة، الموقع، السعر، والتقييم. شاهد التوفر الفوري.' } },
  { num: '02', icon: '📅', en: { title: 'Pick Your Slot', desc: 'Select date and time from real-time availability. No double-bookings ever.' }, ar: { title: 'اختر وقتك', desc: 'اختر التاريخ والوقت من التوفر الفوري. لا تعارض في الحجوزات أبداً.' } },
  { num: '03', icon: '💳', en: { title: 'Pay Securely', desc: 'Pay online or at court. Get instant confirmation and QR code.' }, ar: { title: 'ادفع بأمان', desc: 'ادفع أونلاين أو في الملعب. احصل على تأكيد فوري وQR code.' } },
  { num: '04', icon: '🏆', en: { title: 'Earn Points', desc: 'Every booking earns loyalty points. Climb tiers. Unlock rewards.' }, ar: { title: 'اكسب نقاط', desc: 'كل حجز يكسبك نقاط ولاء. ارتقِ المراتب. افتح مكافآت حصرية.' } },
]

export default function HowItWorksSection() {
  const { lang } = useLang()
  return (
    <section id="how-it-works" className="py-24 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
              {lang === 'ar' ? 'كيف يعمل' : 'How It Works'}
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl text-white">
              {lang === 'ar' ? 'أربع خطوات بسيطة' : 'Four Simple Steps'}
            </h2>
          </div>
        </RevealSection>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SVG connector line — desktop only */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.3 }} />

          {STEPS.map((step, i) => (
            <RevealSection key={i} delay={i * 120}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-2"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <span className="text-3xl">{step.icon}</span>
                  <span className="absolute -top-3 -right-3 font-bebas text-xs w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}>{step.num}</span>
                </div>
                <h3 className="font-bebas text-2xl text-white mb-2">
                  {lang === 'ar' ? step.ar.title : step.en.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {lang === 'ar' ? step.ar.desc : step.en.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
