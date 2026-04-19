'use client'
import RevealSection from './RevealSection'
import { useLang } from '@/context/LanguageContext'
import Link from 'next/link'

const SPORTS = [
  { emoji: '🏓', slug: 'padel',      en: 'Padel',      ar: 'بادل',      tint: 'rgba(201,168,76,0.15)',  count: 42 },
  { emoji: '⚽', slug: 'football',   en: 'Football',   ar: 'كرة القدم', tint: 'rgba(34,197,94,0.15)',   count: 38 },
  { emoji: '🏀', slug: 'basketball', en: 'Basketball', ar: 'كرة السلة', tint: 'rgba(249,115,22,0.15)',  count: 24 },
  { emoji: '🎾', slug: 'tennis',     en: 'Tennis',     ar: 'تنس',       tint: 'rgba(234,179,8,0.15)',   count: 19 },
  { emoji: '🏊', slug: 'swimming',   en: 'Swimming',   ar: 'سباحة',     tint: 'rgba(59,130,246,0.15)',  count: 11 },
  { emoji: '🏸', slug: 'badminton',  en: 'Badminton',  ar: 'ريشة طائرة',tint: 'rgba(168,85,247,0.15)', count: 8  },
  { emoji: '🏐', slug: 'volleyball', en: 'Volleyball', ar: 'كرة الطائرة',tint: 'rgba(20,184,166,0.15)', count: 15 },
  { emoji: '🥊', slug: 'boxing',     en: 'Boxing',     ar: 'ملاكمة',    tint: 'rgba(239,68,68,0.15)',   count: 6  },
]

export default function SportsGrid() {
  const { lang } = useLang()
  return (
    <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                {lang === 'ar' ? 'الرياضات' : 'Sports'}
              </span>
              <h2 className="font-bebas text-5xl md:text-6xl text-white">
                {lang === 'ar' ? '8 رياضات، مكان واحد' : '8 Sports, One Platform'}
              </h2>
            </div>
            <Link href="/courts"
              className="text-sm font-semibold flex items-center gap-2 transition-colors"
              style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'تصفح الكل ←' : 'Browse All →'}
            </Link>
          </div>
        </RevealSection>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SPORTS.map((s, i) => (
            <RevealSection key={s.slug} delay={i * 60}>
              <Link href={`/courts?sport=${s.slug}`}
                className="sport-card group relative rounded-2xl p-6 flex flex-col items-center gap-3 text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: s.tint }} />
                <span className="text-4xl relative z-10 transition-transform duration-300 group-hover:scale-110">{s.emoji}</span>
                <div className="relative z-10">
                  <div className="font-bebas text-xl text-white">{lang === 'ar' ? s.ar : s.en}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.count} {lang === 'ar' ? 'ملعب' : 'courts'}</div>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
