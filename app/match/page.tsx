'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'

const SPORTS_FILTER = [
  { id: 'all', emoji: '🏅', en: 'All', ar: 'الكل' },
  { id: 'padel', emoji: '🎾', en: 'Padel', ar: 'بادل' },
  { id: 'football', emoji: '⚽', en: 'Football', ar: 'كرة القدم' },
  { id: 'basketball', emoji: '🏀', en: 'Basketball', ar: 'كرة السلة' },
  { id: 'tennis', emoji: '🎾', en: 'Tennis', ar: 'تنس' },
]

const MATCHES = [
  { id: 1, title: '3v3 Padel — Need 1 More', sport: 'padel', emoji: '🎾', host: 'Khalid A.', level: 'Intermediate', date: 'Today', time: '18:00', loc: 'Padel Pro Court, Abdoun', spots: 1, total: 4, price: 25, color: '#E2FF67', hostRating: 4.9 },
  { id: 2, title: '5v5 Football — 3 Spots Left', sport: 'football', emoji: '⚽', host: 'Ahmad N.', level: 'Beginner', date: 'Tomorrow', time: '20:00', loc: 'Champions Ground, Khalda', spots: 3, total: 10, price: 40, color: '#4ade80', hostRating: 4.7 },
  { id: 3, title: 'Basketball 5v5 — Full Squad', sport: 'basketball', emoji: '🏀', host: 'Omar K.', level: 'Advanced', date: 'Apr 28', time: '17:00', loc: 'Slam Dunk, Sweifieh', spots: 4, total: 10, price: 20, color: '#F87C3F', hostRating: 4.8 },
  { id: 4, title: 'Singles Tennis — Find Opponent', sport: 'tennis', emoji: '🎾', host: 'Rania M.', level: 'Pro', date: 'Apr 29', time: '09:00', loc: 'Ace Tennis, Dabouq', spots: 1, total: 2, price: 18, color: '#8BC4DE', hostRating: 5.0 },
  { id: 5, title: 'Padel Doubles — 2 Needed', sport: 'padel', emoji: '🎾', host: 'Sara H.', level: 'Beginner', date: 'May 1', time: '16:00', loc: 'Elite Padel, Khalda', spots: 2, total: 4, price: 30, color: '#E2FF67', hostRating: 4.6 },
  { id: 6, title: '7v7 Football League', sport: 'football', emoji: '⚽', host: 'Yousef T.', level: 'Intermediate', date: 'May 2', time: '19:30', loc: 'Green Field, Marj', spots: 5, total: 14, price: 35, color: '#4ade80', hostRating: 4.5 },
]

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#4ade80', Intermediate: '#E2FF67', Advanced: '#F87C3F', Pro: '#8BC4DE'
}

export default function MatchPage() {
  const { lang } = useLang()
  const [sport, setSport] = useState('all')
  const [inView, setInView] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', sport: 'padel', level: 'Beginner', date: '', time: '', loc: '', spots: '2' })
  const [posted, setPosted] = useState(false)
  const isAr = lang === 'ar'

  useEffect(() => { setTimeout(() => setInView(true), 100) }, [])

  const filtered = sport === 'all' ? MATCHES : MATCHES.filter(m => m.sport === sport)

  const postMatch = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => { setPosted(true); setShowForm(false) }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '72px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(226,255,103,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div style={{
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}>
              <div className="section-label section-label-lime" style={{ marginBottom: 16 }}>
                🤝 {isAr ? 'تطابق اللاعبين' : 'Player Matching'}
              </div>
              <h1 style={{
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                fontWeight: 900, fontSize: 'clamp(36px, 5vw, 64px)', color: 'white', lineHeight: 1.05,
              }}>
                {isAr ? 'ابحث عن شريكك\nعلى الملعب' : 'Find Your\nNext Match'}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 12, maxWidth: 400, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr
                  ? 'انضم للمباريات القائمة أو أنشئ مباراتك الخاصة وابحث عن لاعبين.'
                  : 'Join existing games or create your own match and find players to fill up.'}
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '16px 36px', borderRadius: 16, border: 'none', cursor: 'pointer',
                background: '#E2FF67', color: '#122744',
                fontSize: 16, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                fontFamily: 'Barlow Condensed, sans-serif',
                boxShadow: '0 4px 24px rgba(226,255,103,0.4)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>+</span>
              {isAr ? 'أضف مباراتك' : 'Post a Match'}
            </button>
          </div>
        </div>
      </section>

      {/* Posted success */}
      {posted && (
        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', padding: '16px 24px', textAlign: 'center' }}>
          <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 15 }}>
            🎉 {isAr ? 'تم نشر مباراتك! ستجد لاعبين قريباً.' : 'Match posted! Players will find you soon.'}
          </span>
        </div>
      )}

      {/* Sport filter */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(18,39,68,0.06)', position: 'sticky', top: 72, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 0', scrollbarWidth: 'none' as const }}>
            {SPORTS_FILTER.map(s => (
              <button
                key={s.id}
                onClick={() => setSport(s.id)}
                style={{
                  flexShrink: 0, padding: '8px 18px', borderRadius: 10, cursor: 'pointer', border: 'none',
                  background: sport === s.id ? '#122744' : 'rgba(18,39,68,0.05)',
                  color: sport === s.id ? 'white' : 'var(--navy)',
                  fontSize: 13, fontWeight: 700,
                  transition: 'all 0.2s',
                }}
              >
                {s.emoji} {isAr ? s.ar : s.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Matches grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {filtered.map((m, i) => (
            <div key={m.id} className="player-card" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: `${m.color}18`, border: `1.5px solid ${m.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>
                    {m.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy)', lineHeight: 1.2 }}>{m.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                      👤 {m.host} · ⭐ {m.hostRating}
                    </div>
                  </div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, flexShrink: 0,
                  background: `${LEVEL_COLORS[m.level]}18`,
                  color: m.level === 'Beginner' ? '#166534' : LEVEL_COLORS[m.level] === '#E2FF67' ? '#7a8e10' : LEVEL_COLORS[m.level],
                }}>
                  {m.level}
                </span>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {[
                  { icon: '📅', label: `${m.date}` },
                  { icon: '⏰', label: m.time },
                  { icon: '📍', label: m.loc },
                ].map(d => (
                  <div key={d.label} style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 8,
                    background: 'rgba(18,39,68,0.04)', fontSize: 11, color: 'var(--text3)',
                  }}>
                    <span>{d.icon}</span><span>{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(18,39,68,0.07)' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--navy)', fontFamily: 'Barlow Condensed, sans-serif' }}>
                    {m.price} JD
                  </div>
                  <div style={{ fontSize: 11, color: m.spots <= 1 ? '#ef4444' : 'var(--text3)', fontWeight: m.spots <= 1 ? 700 : 400 }}>
                    {m.spots <= 1
                      ? (isAr ? `مكان واحد متبقي!` : `Only ${m.spots} spot left!`)
                      : (isAr ? `${m.spots}/${m.total} أماكن متبقية` : `${m.spots}/${m.total} spots open`)}
                  </div>
                </div>
                <button style={{
                  padding: '10px 22px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: m.spots <= 1 ? '#ef4444' : '#E2FF67',
                  color: m.spots <= 1 ? 'white' : '#122744',
                  fontSize: 13, fontWeight: 800,
                  letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                  fontFamily: 'Barlow Condensed, sans-serif',
                }}>
                  {isAr ? 'انضم' : 'Join Match'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Match Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 5000,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: 'white', borderRadius: 24, padding: 32, width: '100%', maxWidth: 480,
            maxHeight: '90vh', overflowY: 'auto',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 24, color: 'var(--navy)' }}>
                {isAr ? 'أضف مباراتك' : 'Post a Match'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
            </div>

            <form onSubmit={postMatch} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'title', label: isAr ? 'عنوان المباراة' : 'Match Title', type: 'text', placeholder: isAr ? 'مثال: 3v3 بادل — نحتاج لاعب' : 'e.g. 3v3 Padel — Need 1 Player' },
                { key: 'date', label: isAr ? 'التاريخ' : 'Date', type: 'date', placeholder: '' },
                { key: 'time', label: isAr ? 'الوقت' : 'Time', type: 'time', placeholder: '' },
                { key: 'loc', label: isAr ? 'الملعب / الموقع' : 'Court / Location', type: 'text', placeholder: isAr ? 'اسم الملعب والمنطقة' : 'Court name and area' },
                { key: 'spots', label: isAr ? 'عدد الأماكن المطلوبة' : 'Spots Needed', type: 'number', placeholder: '2' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--navy)', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={(formData as Record<string, string>)[field.key]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14,
                      border: '1.5px solid rgba(18,39,68,0.15)', outline: 'none', color: 'var(--navy)',
                      fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                    }}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--navy)', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  {isAr ? 'مستوى اللعب' : 'Skill Level'}
                </label>
                <select
                  value={formData.level}
                  onChange={e => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, border: '1.5px solid rgba(18,39,68,0.15)', outline: 'none', color: 'var(--navy)', background: 'white' }}
                >
                  {['Beginner', 'Intermediate', 'Advanced', 'Pro'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: '#E2FF67', color: '#122744',
                  fontSize: 15, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                  fontFamily: 'Barlow Condensed, sans-serif', marginTop: 8,
                }}
              >
                {isAr ? 'نشر المباراة' : 'Post Match'}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
