'use client'

import { useState, useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { mockCourts, mockTimeSlots, mockBookings } from '@/lib/mock-data'
import { TimeSlot } from '@/lib/supabase'

const SPORT_EMOJIS: Record<string, string> = {
  padel: '🏓',
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  swimming: '🏊',
  badminton: '🏸',
}

export default function CourtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t, lang } = useLang()
  const router = useRouter()

  const court = mockCourts.find((c) => c.id === id)

  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [userName, setUserName] = useState('')
  const [userWhatsapp, setUserWhatsapp] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set())

  // Generate next 7 days
  const dateOptions = useMemo(() => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      days.push(d.toISOString().split('T')[0])
    }
    return days
  }, [])

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    const dayNames = lang === 'ar'
      ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = lang === 'ar'
      ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
      : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return {
      day: dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
      isToday: dateStr === today,
    }
  }

  const slotsForDate = useMemo(() => {
    if (!court) return []
    return mockTimeSlots
      .filter((s) => s.court_id === court.id && s.date === selectedDate)
      .sort((a, b) => a.start_time.localeCompare(b.start_time))
  }, [court, selectedDate])

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.is_booked || bookedSlots.has(slot.id)) return
    setSelectedSlot(slot)
    setShowForm(true)
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !userName.trim() || !userWhatsapp.trim()) return

    setLoading(true)
    // Simulate API call / mock booking
    await new Promise((r) => setTimeout(r, 800))

    const bookingId = `bk-${Date.now()}`
    setBookedSlots((prev) => new Set([...prev, selectedSlot.id]))

    // Store booking in sessionStorage for confirmation page
    const bookingData = {
      id: bookingId,
      courtName: court?.name,
      sport: court?.sport,
      date: selectedSlot.date,
      startTime: selectedSlot.start_time,
      endTime: selectedSlot.end_time,
      userName,
      userWhatsapp,
      price: court?.price,
    }
    sessionStorage.setItem('lastBooking', JSON.stringify(bookingData))

    setLoading(false)
    setShowForm(false)
    setUserName('')
    setUserWhatsapp('')
    setSelectedSlot(null)
    router.push(`/booking-confirmation?id=${bookingId}`)
  }

  if (!court) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl mb-4 block">🏟️</span>
            <h2 className="text-2xl font-bold text-[#0B1C2C] mb-2">Court not found</h2>
            <Link href="/" className="text-[#1B6CA8] hover:underline">← Back to courts</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* Court Hero */}
      <div className="relative bg-[#0B1C2C] h-56 md:h-72 overflow-hidden">
        {court.image_url ? (
          <img
            src={court.image_url}
            alt={court.name}
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl opacity-30">{SPORT_EMOJIS[court.sport]}</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-end p-6 md:p-10">
          <div>
            <span className="inline-flex items-center gap-1 bg-[#C9A84C] text-[#0B1C2C] text-xs font-bold px-3 py-1 rounded-full mb-3">
              {SPORT_EMOJIS[court.sport]} {t(court.sport as any)}
            </span>
            <h1
              className="text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
            >
              {court.name}
            </h1>
            <p className="text-gray-300 text-sm mt-1">📍 {court.location}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px', width: '100%', boxSizing: 'border-box' }}>
        {/* Court Info */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-gray-600 leading-relaxed flex-1">{court.description}</p>
            <div className="flex-shrink-0 text-center bg-[#F8F9FB] rounded-xl px-6 py-4">
              <div className="text-3xl font-black text-[#0B1C2C]">{court.price}</div>
              <div className="text-sm text-gray-500">{t('jd')} {t('perHour')}</div>
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <h2
            className="text-lg font-bold text-[#0B1C2C] mb-3"
            style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
          >
            {t('selectDate')}
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dateOptions.map((date) => {
              const label = formatDateLabel(date)
              const active = selectedDate === date
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                    active
                      ? 'border-[#1B6CA8] bg-[#1B6CA8] text-white'
                      : 'border-gray-200 bg-white text-[#0B1C2C] hover:border-[#1B6CA8]'
                  }`}
                >
                  <span className="text-xs font-medium opacity-80">{label.day}</span>
                  <span className="text-xl font-bold">{label.date}</span>
                  <span className="text-xs opacity-70">{label.month}</span>
                  {label.isToday && (
                    <span className={`text-xs mt-0.5 font-semibold ${active ? 'text-[#C9A84C]' : 'text-[#1B6CA8]'}`}>
                      {lang === 'en' ? 'Today' : 'اليوم'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h2
            className="text-lg font-bold text-[#0B1C2C] mb-4"
            style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
          >
            {t('availableSlots')}
          </h2>

          {slotsForDate.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <span className="text-4xl block mb-3">📅</span>
              <p>{t('noSlots')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slotsForDate.map((slot) => {
                const isBooked = slot.is_booked || bookedSlots.has(slot.id)
                const isSelected = selectedSlot?.id === slot.id
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotClick(slot)}
                    disabled={isBooked}
                    className={`relative p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      isBooked
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#0B1C2C]'
                        : 'bg-white border-gray-200 text-[#0B1C2C] hover:border-[#1B6CA8] hover:bg-[#1B6CA8]/5 cursor-pointer'
                    }`}
                  >
                    <div className="font-bold">{slot.start_time}</div>
                    <div className="text-xs opacity-70 mt-0.5">→ {slot.end_time}</div>
                    {isBooked && (
                      <div className="text-xs text-red-400 font-semibold mt-1">{t('booked')}</div>
                    )}
                    {!isBooked && (
                      <div className="text-xs text-emerald-500 font-semibold mt-1">{t('available')}</div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Booking Legend */}
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" />
            {t('available')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200 inline-block" />
            {t('booked')}
          </span>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4 pb-0 sm:pb-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold text-[#0B1C2C]"
                style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
              >
                {t('bookingForm')}
              </h2>
              <button
                onClick={() => { setShowForm(false); setSelectedSlot(null) }}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Slot summary */}
            <div className="bg-[#F8F9FB] rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">{t('court')}</span>
                <span className="font-semibold text-[#0B1C2C]">{court.name}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">{t('date')}</span>
                <span className="font-semibold text-[#0B1C2C]">{selectedSlot.date}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">{t('time')}</span>
                <span className="font-semibold text-[#0B1C2C]">{selectedSlot.start_time} – {selectedSlot.end_time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{lang === 'en' ? 'Price' : 'السعر'}</span>
                <span className="font-bold text-[#1B6CA8]">{court.price} {t('jd')}</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0B1C2C] mb-1.5">
                  {t('yourName')} *
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1B6CA8] focus:outline-none text-[#0B1C2C] placeholder-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1C2C] mb-1.5">
                  {t('whatsappNumber')} *
                </label>
                <input
                  type="tel"
                  value={userWhatsapp}
                  onChange={(e) => setUserWhatsapp(e.target.value)}
                  placeholder={t('whatsappPlaceholder')}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1B6CA8] focus:outline-none text-[#0B1C2C] placeholder-gray-400 transition-colors"
                  dir="ltr"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setSelectedSlot(null) }}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-[#1B6CA8] hover:bg-[#155d91] text-white font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {lang === 'en' ? 'Booking...' : 'جاري الحجز...'}
                    </span>
                  ) : t('confirmBooking')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
