'use client'
import RevealSection from './RevealSection'
import { useLang } from '@/context/LanguageContext'

const PROBLEMS = [
  { icon: '📞', en: 'Call to book, wait on hold, get told it\'s full', ar: 'تتصل للحجز، تنتظر، تكتشف أنه محجوز' },
  { icon: '🗺️', en: 'No idea which courts are available near you', ar: 'لا تعرف أي الملاعب متاحة بالقرب منك' },
  { icon: '👥', en: 'Can\'t find others to play with last minute', ar: 'صعب تلاقي لاعبين في اللحظة الأخيرة' },
  { icon: '💸', en: 'Pay cash, no receipt, no loyalty rewards', ar: 'تدفع كاش، بدون فاتورة أو نقاط ولاء' },
]

export default function ProblemSection() {
  const { t, lang } = useLang()
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)' }}>
              The Problem
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl" style={{ color: 'var(--navy)' }}>
              {lang === 'ar' ? 'حجز الملاعب في الأردن؟ ألم حقيقي' : 'Booking Courts in Jordan? Real Pain.'}
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROBLEMS.map((p, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div className="problem-card group relative overflow-hidden rounded-2xl p-7 cursor-default"
                style={{ background: 'white', border: '1px solid rgba(11,28,44,0.08)', transition: 'all 0.3s ease' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1a3048 100%)' }} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <p className="text-base font-medium leading-relaxed group-hover:text-white transition-colors duration-300"
                    style={{ color: 'var(--navy)' }}>
                    {lang === 'ar' ? p.ar : p.en}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'var(--gold)' }} />
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={400}>
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold" style={{ color: 'var(--navy)', opacity: 0.6 }}>
              {lang === 'ar' ? '← لعيبة أرينا تحل هذا كله →' : '← La3ebeh Arena fixes all of this →'}
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
