'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'

type BookingData = {
  id: string
  courtName: string
  sport: string
  date: string
  startTime: string
  endTime: string
  userName: string
  userWhatsapp: string
  price: number
}

const SPORT_EMOJIS: Record<string, string> = {
  padel: '🏓',
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  swimming: '🏊',
  badminton: '🏸',
}

function ConfirmationContent() {
  const { t, lang } = useLang()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  const [booking, setBooking] = useState<BookingData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('lastBooking')
    if (data) {
      setBooking(JSON.parse(data))
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 max-w-md w-full">
          {/* Success icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1
              className="text-2xl md:text-3xl font-black text-[#0B1C2C] mb-2"
              style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
            >
              {t('bookingConfirmed')}
            </h1>
            <p className="text-gray-500 text-sm">{t('bookingSuccess')}</p>
          </div>

          {/* Booking details */}
          {booking ? (
            <div className="bg-[#F8F9FB] rounded-2xl p-5 mb-6 space-y-3 border border-gray-100">
              {/* Booking ID */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  {lang === 'en' ? 'Booking ID' : 'رقم الحجز'}
                </span>
                <span className="text-xs font-mono text-[#1B6CA8] bg-[#1B6CA8]/10 px-2 py-0.5 rounded-lg">
                  {booking.id}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  {SPORT_EMOJIS[booking.sport]} {t('court')}
                </span>
                <span className="font-semibold text-[#0B1C2C]">{booking.courtName}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">📅 {t('date')}</span>
                <span className="font-semibold text-[#0B1C2C]">{booking.date}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">⏰ {t('time')}</span>
                <span className="font-semibold text-[#0B1C2C]">{booking.startTime} – {booking.endTime}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">👤 {t('name')}</span>
                <span className="font-semibold text-[#0B1C2C]">{booking.userName}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">📱 {t('whatsapp')}</span>
                <span className="font-semibold text-[#0B1C2C]" dir="ltr">{booking.userWhatsapp}</span>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-500">{lang === 'en' ? '💰 Total' : '💰 المجموع'}</span>
                <span className="font-black text-[#1B6CA8] text-base">{booking.price} {t('jd')}</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#F8F9FB] rounded-2xl p-5 mb-6 text-center text-gray-400">
              <p className="text-sm">
                {lang === 'en' ? 'Booking details not found.' : 'لم يتم العثور على تفاصيل الحجز.'}
              </p>
              <p className="text-xs mt-1 font-mono">ID: {bookingId}</p>
            </div>
          )}

          {/* Status badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full border border-emerald-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('confirmed')}
            </span>
          </div>

          {/* WhatsApp note */}
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-gray-600">
              {lang === 'en'
                ? '📲 We\'ll send your booking confirmation to your WhatsApp number.'
                : '📲 سنرسل لك تأكيد الحجز على رقم واتساب الخاص بك.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
            >
              {t('backHome')}
            </Link>
            <Link
              href="/admin"
              className="flex-1 text-center py-3 rounded-xl bg-[#1B6CA8] hover:bg-[#155d91] text-white font-bold transition-colors text-sm"
            >
              {lang === 'en' ? 'View All Bookings' : 'عرض جميع الحجوزات'}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
        <div className="text-center text-gray-400">
          <svg className="animate-spin h-8 w-8 mx-auto mb-3 text-[#1B6CA8]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
