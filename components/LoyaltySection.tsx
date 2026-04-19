'use client'
import RevealSection from './RevealSection'
import { useLang } from '@/context/LanguageContext'

const TIERS = [
  { name: 'Starter',  nameAr: 'مبتدئ',  pts: '0',     color: '#9ca3af' },
  { name: 'Silver',   nameAr: 'فضي',    pts: '500',   color: '#94a3b8' },
  { name: 'Gold',     nameAr: 'ذهبي',   pts: '1,500', color: '#C9A84C' },
  { name: 'Legend',   nameAr: 'أسطورة', pts: '3,000', color: '#ef4444' },
]

const EARN = [
  { icon: '🏟️', en: 'Court Booking +50 pts',  ar: 'حجز ملعب +50 نقطة' },
  { icon: '👥', en: 'Refer a Friend +100 pts', ar: 'دعوة صديق +100 نقطة' },
  { icon: '⭐', en: 'Leave a Review +20 pts',  ar: 'كتابة تقييم +20 نقطة' },
  { icon: '🗓️', en: 'Weekly Streak +75 pts',  ar: 'لعب أسبوعي +75 نقطة' },
]

export default function LoyaltySection() {
  const { lang } = useLang()
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <RevealSection>
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)' }}>
                {lang === 'ar' ? 'برنامج الولاء' : 'Loyalty Program'}
              </span>
              <h2 className="font-bebas text-5xl md:text-6xl mb-5" style={{ color: 'var(--navy)' }}>
                {lang === 'ar' ? 'العب أكثر، اربح أكثر' : 'Play More. Earn More.'}
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
                {lang === 'ar'
                  ? 'كل حجز يكسبك نقاط. ارتقِ من مبتدئ إلى أسطورة وافتح خصومات حصرية وأولوية حجز.'
                  : 'Every booking earns you points. Rise from Starter to Legend and unlock exclusive discounts and priority booking.'}
              </p>
              <div className="space-y-3">
                {EARN.map((e, i) => (
                  <RevealSection key={i} delay={i * 80}>
                    <div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'white', border: '1px solid rgba(11,28,44,0.07)' }}>
                      <span className="text-2xl">{e.icon}</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--navy)' }}>
                        {lang === 'ar' ? e.ar : e.en}
                      </span>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </RevealSection>
          </div>

          {/* Right — tier track */}
          <RevealSection delay={200}>
            <div className="rounded-3xl p-8" style={{ background: 'var(--navy)' }}>
              <div className="font-bebas text-2xl text-white mb-6">
                {lang === 'ar' ? 'مساران المراتب' : 'Tier Ladder'}
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                {TIERS.map((tier, i) => (
                  <div key={tier.name} className="relative flex items-center gap-4 mb-6 last:mb-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 z-10"
                      style={{ background: tier.color }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bebas text-xl text-white">
                          {lang === 'ar' ? tier.nameAr : tier.name}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.08)', color: tier.color }}>
                          {tier.pts} pts
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: i === 2 ? '82%' : i === 1 ? '45%' : i === 0 ? '100%' : '0%', background: tier.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
