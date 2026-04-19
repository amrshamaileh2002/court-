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

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--off-white)' }}>
      <Navbar />

      {/* Header */}
      <section className="py-16 px-5 sm:px-8" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
            {lang === 'ar' ? 'الملاعب' : 'Courts'}
          </span>
          <h1 className="font-bebas text-5xl md:text-6xl text-white mb-4">
            {lang === 'ar' ? 'تصفح الملاعب' : 'Browse Courts'}
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lang === 'ar' ? `${mockCourts.length} ملعب متاح في عمّان` : `${mockCourts.length} courts available across Amman`}
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mt-8">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن ملعب أو موقع...' : 'Search court or location...'}
              className="w-full px-5 py-3 rounded-2xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
            />
            <span className="absolute top-1/2 -translate-y-1/2 end-4 text-white opacity-40">🔍</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 w-full flex-1">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {SPORTS.map(s => (
              <button key={s} onClick={() => setSport(s)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={sport === s
                  ? { background: 'var(--navy)', color: 'white' }
                  : { background: 'white', color: 'var(--navy)', border: '1px solid rgba(11,28,44,0.12)' }}>
                <span>{SPORT_EMOJIS[s]}</span>
                <span>{lang === 'ar' ? SPORT_AR[s] : s.charAt(0).toUpperCase() + s.slice(1)}</span>
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl text-sm font-medium outline-none"
            style={{ background: 'white', border: '1px solid rgba(11,28,44,0.12)', color: 'var(--navy)' }}>
            <option value="name">{lang === 'ar' ? 'الاسم' : 'Name'}</option>
            <option value="price-asc">{lang === 'ar' ? 'السعر: تصاعدي' : 'Price: Low to High'}</option>
            <option value="price-desc">{lang === 'ar' ? 'السعر: تنازلي' : 'Price: High to Low'}</option>
          </select>
        </div>

        {/* Grid */}
        {courts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courts.map(court => <CourtCard key={court.id} court={court} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg" style={{ color: 'var(--text3)' }}>
              {lang === 'ar' ? 'لا توجد ملاعب مطابقة' : 'No courts match your search'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
