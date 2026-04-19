'use client'
import RevealSection from './RevealSection'
import { useLang } from '@/context/LanguageContext'

const FEATURES = [
  { icon: '⚡', size: 'big', en: { title: 'Instant Booking', desc: 'Real-time court availability. Book in under 30 seconds. No calls, no waiting.' }, ar: { title: 'حجز فوري', desc: 'توفر الملاعب في الوقت الحقيقي. احجز خلال 30 ثانية. بدون مكالمات أو انتظار.' } },
  { icon: '🤝', size: 'sm', en: { title: 'Player Matching', desc: 'Find opponents or partners by skill level and sport.' }, ar: { title: 'مطابقة اللاعبين', desc: 'ابحث عن خصم أو شريك حسب المستوى والرياضة.' } },
  { icon: '🏆', size: 'sm', en: { title: 'Loyalty Points', desc: 'Earn points on every booking. Unlock exclusive tiers.' }, ar: { title: 'نقاط الولاء', desc: 'اكسب نقاط مع كل حجز. افتح مراتب حصرية.' } },
  { icon: '📊', size: 'sm', en: { title: 'Court Analytics', desc: 'Owners get real-time dashboards and revenue tracking.' }, ar: { title: 'تحليلات الملعب', desc: 'يحصل الملاك على لوحات تحكم ومتابعة الإيرادات.' } },
  { icon: '🌐', size: 'sm', en: { title: 'Arabic & English', desc: 'Full bilingual app. Seamless RTL / LTR switching.' }, ar: { title: 'عربي وإنجليزي', desc: 'تطبيق ثنائي اللغة. تبديل سلس بين RTL و LTR.' } },
  { icon: '🔔', size: 'sm', en: { title: 'Smart Reminders', desc: 'Push notifications for upcoming bookings and offers.' }, ar: { title: 'تذكيرات ذكية', desc: 'إشعارات فورية للحجوزات القادمة والعروض.' } },
  { icon: '🛡️', size: 'sm', en: { title: 'Secure Payments', desc: 'Multiple payment methods. Instant refunds if cancelled.' }, ar: { title: 'مدفوعات آمنة', desc: 'طرق دفع متعددة. استرداد فوري عند الإلغاء.' } },
]

export default function FeaturesGrid() {
  const { lang } = useLang()
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(11,28,44,0.08)', color: 'var(--navy)' }}>
              {lang === 'ar' ? 'المميزات' : 'Features'}
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl" style={{ color: 'var(--navy)' }}>
              {lang === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need, One App'}
            </h2>
          </div>
        </RevealSection>

        <div className="features-bento grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: '160px' }}>

          {/* Big feature card */}
          <RevealSection delay={0}>
            <div className="feature-big rounded-2xl p-6 flex flex-col justify-end h-full"
              style={{ background: 'var(--navy)', gridColumn: 'span 2', gridRow: 'span 2', minHeight: 320 }}>
              <div className="text-5xl mb-4">{FEATURES[0].icon}</div>
              <h3 className="font-bebas text-3xl text-white mb-1">
                {lang === 'ar' ? FEATURES[0].ar.title : FEATURES[0].en.title}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {lang === 'ar' ? FEATURES[0].ar.desc : FEATURES[0].en.desc}
              </p>
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 70%, rgba(201,168,76,0.08), transparent 60%)' }} />
            </div>
          </RevealSection>

          {/* Small cards */}
          {FEATURES.slice(1).map((f, i) => (
            <RevealSection key={i} delay={(i + 1) * 60}>
              <div className="feature-card group relative rounded-2xl p-5 flex flex-col justify-between h-full cursor-default overflow-hidden"
                style={{ background: 'white', border: '1px solid rgba(11,28,44,0.07)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(11,28,44,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}>
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: 'var(--navy)' }}>
                    {lang === 'ar' ? f.ar.title : f.en.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>
                    {lang === 'ar' ? f.ar.desc : f.en.desc}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
