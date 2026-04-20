'use client'
import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CourtCard from '@/components/CourtCard'
import { useLang } from '@/context/LanguageContext'
import { mockCourts } from '@/lib/mock-data'

const SPORTS = ['all', 'padel', 'football', 'basketball', 'tennis', 'swimming', 'badminton']
const SPORT_EMOJIS: Record<string, string> = {
  all: '🏟️', padel: '🏓', football: '⚽', basketball: '🏀',
  tennis: '🎾', swimming: '🏊', badminton: '🏸',
}
const SPORT_AR: Record<string, string> = {
  all: 'الكل', padel: 'بادل', football: 'كرة القدم', basketball: 'كرة السلة',
  tennis: 'تنس', swimming: 'سباحة', badminton: 'ريشة طائرة',
}

export default function CourtsPage() {
  const { lang } = useLang()
  const [sport, setSport] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const courts = useMemo(() => {
    let c = sport === 'all' ? mockCourts : mockCourts.filter(x => x.sport === sport)
    if (search) c = c.filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.location.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'price-asc') c = [...c].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') c = [...c].sort((a, b) => b.price - a.price)
    return c
  }, [sport, search, sortBy])

  const isAr = lang === 'ar'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--off-white)' }}>
      <Navbar />

      {/* Header */}
      <section style={{ background: 'var(--navy)', padding: '64px 0 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'rgba(226,255,103,0.12)', color: '#E2FF67', marginBottom: 16,
          }}>
            {isAr ? 'الملاعب' : 'Courts'}
          </span>
          <h1 style={{
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'white',
            lineHeight: 1,
            marginBottom: 12,
          }}>
            {isAr ? 'تصفح الملاعب' : 'Browse Courts'}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
            {isAr ? `${mockCourts.length} ملعب متاح في عمّان` : `${mockCourts.length} courts available across Amman`}
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث عن ملعب أو موقع...' : 'Search court or location...'}
              style={{
                width: '100%',
                padding: '14px 48px 14px 20px',
                borderRadius: 14,
                fontSize: 14,
                outline: 'none',
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: 'white',
                boxSizing: 'border-box',
                direction: isAr ? 'rtl' : 'ltr',
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}
            />
            <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 16, opacity: 0.4 }}>🔍</span>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 64px', width: '100%', flex: 1, boxSizing: 'border-box' }}>
        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SPORTS.map(s => (
              <button
                key={s}
                onClick={() => setSport(s)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: 'none', transition: 'all 0.2s ease',
                  background: sport === s ? 'var(--navy)' : 'white',
                  color: sport === s ? 'white' : 'var(--navy)',
                  boxShadow: sport === s ? '0 4px 12px rgba(18,39,68,0.2)' : '0 1px 4px rgba(18,39,68,0.08)',
                  fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                }}
              >
                <span>{SPORT_EMOJIS[s]}</span>
                <span>{isAr ? SPORT_AR[s] : s.charAt(0).toUpperCase() + s.slice(1)}</span>
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              outline: 'none', cursor: 'pointer',
              background: 'white', border: '1px solid rgba(18,39,68,0.12)', color: 'var(--navy)',
              fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
            }}
          >
            <option value="name">{isAr ? 'الاسم' : 'Name'}</option>
            <option value="price-asc">{isAr ? 'السعر: تصاعدي' : 'Price: Low to High'}</option>
            <option value="price-desc">{isAr ? 'السعر: تنازلي' : 'Price: High to Low'}</option>
          </select>
        </div>

        {/* Grid */}
        {courts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {courts.map(court => <CourtCard key={court.id} court={court} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? 'لا توجد ملاعب مطابقة' : 'No courts match your search'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
