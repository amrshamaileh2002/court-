'use client'
import { useRef, useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const PLAYERS = [
  { name: 'Khalid A.', sport: '🎾', level: 'Pro', rating: 4.9, age: 26, looking: 'Padel Partner', color: '#E2FF67' },
  { name: 'Rania K.', sport: '⚽', level: 'Mid', rating: 4.6, age: 24, looking: 'Football Team', color: '#8BC4DE' },
  { name: 'Omar N.', sport: '🏀', level: 'Beg', rating: 4.3, age: 22, looking: 'Basketball 3v3', color: '#F87C3F' },
]

export default function KortnaMatchSplit() {
  const { lang } = useLang()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isAr = lang === 'ar'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: 'var(--off-white)', padding: '96px 0' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}
             className="split-grid">

          {/* Text content (left) */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div className="section-label section-label-blue" style={{ marginBottom: 18 }}>
              {isAr ? 'تطابق اللاعبين' : 'Player Matching'}
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, color: 'var(--navy)', lineHeight: 1.05, marginBottom: 20,
            }}>
              {isAr ? 'ابحث عن شريكك\nعلى الملعب' : 'Find Your\nPerfect Match'}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text3)', marginBottom: 32, fontFamily: isAr ? 'Cairo, sans-serif' : undefined, maxWidth: 400 }}>
              {isAr
                ? 'لا تلعب وحدك. أنشئ طلب مباراة أو انضم لمجموعة. ابحث عن لاعبين بنفس المستوى والرياضة.'
                : "Don't play alone. Post a match request or join an existing game. Find players at your level for any sport."}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { icon: '🎯', title: isAr ? 'مطابقة حسب المستوى' : 'Level-Based Matching', desc: isAr ? 'ابحث عن لاعبين بنفس مستواك' : 'Find players that match your skill level' },
                { icon: '📢', title: isAr ? 'أعلن عن مباراة' : 'Post a Match Request', desc: isAr ? 'أنشئ إعلاناً وانتظر انضمام الآخرين' : 'Create a game request and fill your team' },
                { icon: '🏆', title: isAr ? 'كسب نقاط' : 'Earn Rewards', desc: isAr ? 'كل مباراة تكسبك نقاطاً ومكافآت' : 'Every match earns you XP and rewards' },
              ].map(f => (
                <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(22,69,211,0.08)', border: '1px solid rgba(22,69,211,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.href = '/match'}
              style={{
                padding: '14px 32px', borderRadius: 14,
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                background: 'var(--navy)', color: 'white', border: 'none',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow, sans-serif',
                boxShadow: '0 4px 20px rgba(18,39,68,0.25)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'translateY(-2px)'; b.style.boxShadow = '0 10px 30px rgba(18,39,68,0.35)' }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ''; b.style.boxShadow = '0 4px 20px rgba(18,39,68,0.25)' }}
            >
              {isAr ? 'ابحث عن لاعب' : 'Find a Match'}
            </button>
          </div>

          {/* Player cards */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 16,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(32px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            {PLAYERS.map((p, i) => (
              <div key={p.name} className="player-card" style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.1 + 0.2}s`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`,
                    border: `2px solid ${p.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>
                    {p.sport}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy)' }}>{p.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: `${p.color}18`, color: p.color === '#E2FF67' ? '#7a8e10' : p.color }}>
                        {p.level}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                      ⭐ {p.rating} · 🔍 {p.looking}
                    </div>
                  </div>
                  <button style={{
                    padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: 'var(--navy)', color: 'white', fontSize: 12, fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {isAr ? 'انضم' : 'Join'}
                  </button>
                </div>
              </div>
            ))}

            {/* Post a match CTA */}
            <div style={{
              padding: '20px 24px', borderRadius: 20, cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--navy), #0d1e36)',
              border: '1px solid rgba(226,255,103,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 3 }}>
                  {isAr ? 'أضف مباراتك الآن' : 'Post Your Own Match'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                  {isAr ? 'أعلن وابحث عن لاعبين' : 'List your game and find players'}
                </div>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#E2FF67', color: '#122744',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 900,
              }}>+</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  )
}
