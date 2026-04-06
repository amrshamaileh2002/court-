'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { mockBookings, mockTimeSlots, mockCourts } from '@/lib/mock-data'
import { Booking } from '@/lib/supabase'

type EnrichedBooking = Booking & {
  courtName: string
  sport: string
  date: string
  startTime: string
  endTime: string
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
}

export default function AdminPage() {
  const { t, lang } = useLang()
  const [bookings, setBookings] = useState<EnrichedBooking[]>([])
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all')

  useEffect(() => {
    // Enrich mock bookings with slot/court info
    const enriched: EnrichedBooking[] = mockBookings.map((b) => {
      const slot = mockTimeSlots.find((s) => s.id === b.timeslot_id)
      const court = slot ? mockCourts.find((c) => c.id === slot.court_id) : undefined
      return {
        ...b,
        courtName: court?.name || 'Unknown Court',
        sport: court?.sport || '',
        date: slot?.date || '',
        startTime: slot?.start_time || '',
        endTime: slot?.end_time || '',
      }
    })
    setBookings(enriched)
  }, [])

  const filteredBookings = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  const statusCounts = {
    all: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }

  const SPORT_EMOJIS: Record<string, string> = {
    padel: '🏓', football: '⚽', basketball: '🏀',
    tennis: '🎾', swimming: '🏊', badminton: '🏸',
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-3xl font-black text-[#0B1C2C]"
              style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
            >
              {t('adminPanel')}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {lang === 'en' ? 'Manage all court bookings' : 'إدارة جميع حجوزات الملاعب'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#0B1C2C] text-white px-4 py-2 rounded-xl text-sm font-semibold">
            <span>📊</span>
            <span>{bookings.length} {lang === 'en' ? 'Total Bookings' : 'حجز إجمالي'}</span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'all', label: lang === 'en' ? 'All' : 'الكل', color: 'bg-white border-gray-200', textColor: 'text-[#0B1C2C]' },
            { key: 'confirmed', label: t('confirmed'), color: 'bg-emerald-50 border-emerald-200', textColor: 'text-emerald-700' },
            { key: 'pending', label: t('pending'), color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700' },
            { key: 'cancelled', label: t('cancelled'), color: 'bg-red-50 border-red-200', textColor: 'text-red-600' },
          ].map((card) => (
            <button
              key={card.key}
              onClick={() => setFilter(card.key as any)}
              className={`${card.color} border-2 rounded-2xl p-4 text-start transition-all hover:shadow-md ${
                filter === card.key ? 'ring-2 ring-[#1B6CA8] ring-offset-2' : ''
              }`}
            >
              <div className={`text-2xl font-black ${card.textColor}`}>
                {statusCounts[card.key as keyof typeof statusCounts]}
              </div>
              <div className="text-sm text-gray-500 mt-0.5 font-medium">{card.label}</div>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2
              className="text-lg font-bold text-[#0B1C2C]"
              style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
            >
              {t('allBookings')}
            </h2>
            <span className="text-sm text-gray-400">{filteredBookings.length} {lang === 'en' ? 'entries' : 'سجل'}</span>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <span className="text-4xl block mb-3">📋</span>
              <p>{t('noBookings')}</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                      <th className="text-start px-6 py-3 font-semibold">{t('bookingId')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('courtName')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('slotDate')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('slotTime')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('userName')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('userWhatsapp')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('status')}</th>
                      <th className="text-start px-6 py-3 font-semibold">{t('createdAt')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredBookings.map((booking, idx) => (
                      <tr key={booking.id} className={`hover:bg-gray-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-[#1B6CA8] bg-[#1B6CA8]/10 px-2 py-1 rounded-lg">
                            {booking.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <span>{SPORT_EMOJIS[booking.sport] || '🏟️'}</span>
                            <span className="font-medium text-[#0B1C2C]">{booking.courtName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{formatDate(booking.date)}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                          {booking.startTime} – {booking.endTime}
                        </td>
                        <td className="px-6 py-4 font-medium text-[#0B1C2C]">{booking.user_name}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-xs" dir="ltr">{booking.user_whatsapp}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[booking.status] || STATUS_STYLES.pending}`}>
                            {t(booking.status as any)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {new Date(booking.created_at).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-GB')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span>{SPORT_EMOJIS[booking.sport] || '🏟️'}</span>
                          <span className="font-bold text-[#0B1C2C] text-sm">{booking.courtName}</span>
                        </div>
                        <span className="font-mono text-xs text-[#1B6CA8]">{booking.id}</span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[booking.status] || STATUS_STYLES.pending}`}>
                        {t(booking.status as any)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                      <span>📅 {formatDate(booking.date)}</span>
                      <span>⏰ {booking.startTime}–{booking.endTime}</span>
                      <span>👤 {booking.user_name}</span>
                      <span dir="ltr">📱 {booking.user_whatsapp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
