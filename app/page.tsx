'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SportFilterChips from '@/components/SportFilterChips'
import CourtCard from '@/components/CourtCard'
import { useLang } from '@/context/LanguageContext'
import { mockCourts } from '@/lib/mock-data'
import Link from 'next/link'

export default function HomePage() {
  const { t, lang } = useLang()
  const [selectedSport, setSelectedSport] = useState('all')

  const filteredCourts = useMemo(() => {
    if (selectedSport === 'all') return mockCourts
    return mockCourts.filter((c) => c.sport === selectedSport)
  }, [selectedSport])

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0B1C2C] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <span className="text-6xl">🏟️</span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-4 leading-tight"
              style={{
                fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif',
                color: '#C9A84C',
              }}
            >
              {t('heroTitle')}
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold text-white/90 mb-4"
              style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
            >
              {t('heroSubtitle')}
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t('heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#courts"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8962f] text-[#0B1C2C] font-bold px-8 py-3 rounded-2xl text-base transition-colors"
              >
                {t('exploreCourts')} ↓
              </a>
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-2xl text-base transition-colors"
              >
                {t('waitlist')}
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-10 overflow-hidden">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full"
          >
            <path
              d="M0 40L60 33.3C120 26.7 240 13.3 360 10C480 6.7 600 13.3 720 18.3C840 23.3 960 26.7 1080 25C1200 23.3 1320 16.7 1380 13.3L1440 10V40H0Z"
              fill="#F8F9FB"
            />
          </svg>
        </div>
      </section>

      {/* Courts Section */}
      <section id="courts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 w-full">
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3"
            style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
          >
            {lang === 'en' ? 'Our Courts' : 'ملاعبنا'}
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            {lang === 'en'
              ? 'Choose from 6 premium courts across Amman'
              : 'اختر من بين 6 ملاعب متميزة في جميع أنحاء عمّان'}
          </p>
        </div>

        <div className="mb-8">
          <SportFilterChips selected={selectedSport} onChange={setSelectedSport} />
        </div>

        {filteredCourts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-lg">
              {lang === 'en' ? 'No courts found for this sport.' : 'لا توجد ملاعب لهذه الرياضة.'}
            </p>
          </div>
        )}
      </section>

      {/* Stats strip */}
      <section className="bg-[#0B1C2C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '6+', label: lang === 'en' ? 'Courts' : 'ملاعب' },
              { num: '6', label: lang === 'en' ? 'Sports' : 'رياضات' },
              { num: '500+', label: lang === 'en' ? 'Bookings' : 'حجز' },
              { num: '24/7', label: lang === 'en' ? 'Online Booking' : 'حجز إلكتروني' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-[#C9A84C]">{stat.num}</div>
                <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
