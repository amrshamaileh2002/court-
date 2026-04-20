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
  padel: '🏓', football: '⚽', basketball: '🏀',
  tennis: '🎾', swimming: '🏊', badminton: '🏸',
}

function ConfirmationContent() {
  const { t, lang } = useLang()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  const [booking, setBooking] = useState<BookingData | null>(null)
  const isAr = lang === 'ar'

  useEffect(() => {
    const data = sessionStorage.getItem('lastBooking')
    if (data) setBooking(JSON.parse(data))
  }, [])

  const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }
  const labelStyle = { color: 'var(--text3)' }
  const valueStyle = { fontWeight: 600, color: 'var(--navy)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--off-white)' }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{
          background: 'white', borderRadius: 24,
          boxShadow: '0 8px 40px rgba(18,39,68,0.12)',
          padding: '40px 36px', maxWidth: 480, width: '100%',
          border: '1px solid rgba(18,39,68,0.08)',
        }}>
          {/* Success icon */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(34,197,94,0.12)', marginBottom: 16,
            }}>
              <svg width="40" height="40" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 style={{
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, fontSize: 32, color: 'var(--navy)', marginBottom: 6,
            }}>
              {t('bookingConfirmed')}
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {t('bookingSuccess')}
            </p>
          </div>

          {/* Booking details */}
          {booking ? (
            <div style={{
              background: 'var(--off-white)', borderRadius: 16, padding: '20px',
              marginBottom: 24, border: '1px solid rgba(18,39,68,0.07)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ ...rowStyle, paddingBottom: 12, borderBottom: '1px solid rgba(18,39,68,0.08)' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  {isAr ? 'رقم الحجز' : 'Booking ID'}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--blue)', background: 'rgba(22,69,211,0.08)', padding: '3px 8px', borderRadius: 6 }}>
                  {booking.id}
                </span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>{SPORT_EMOJIS[booking.sport]} {t('court')}</span>
                <span style={valueStyle}>{booking.courtName}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>📅 {t('date')}</span>
                <span style={valueStyle}>{booking.date}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>⏰ {t('time')}</span>
                <span style={valueStyle}>{booking.startTime} – {booking.endTime}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>👤 {t('name')}</span>
                <span style={valueStyle}>{booking.userName}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>📱 {t('whatsapp')}</span>
                <span style={{ ...valueStyle, direction: 'ltr' as const }}>{booking.userWhatsapp}</span>
              </div>
              <div style={{ ...rowStyle, paddingTop: 12, borderTop: '1px solid rgba(18,39,68,0.08)' }}>
                <span style={labelStyle}>{isAr ? '💰 المجموع' : '💰 Total'}</span>
                <span style={{ fontWeight: 900, color: 'var(--blue)', fontSize: 18 }}>{booking.price} {t('jd')}</span>
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--off-white)', borderRadius: 16, padding: 20, marginBottom: 24, textAlign: 'center', color: 'var(--text3)' }}>
              <p style={{ fontSize: 13, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr ? 'لم يتم العثور على تفاصيل الحجز.' : 'Booking details not found.'}
              </p>
              <p style={{ fontSize: 11, marginTop: 4, fontFamily: 'monospace' }}>ID: {bookingId}</p>
            </div>
          )}

          {/* Status badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#ecfdf5', color: '#065f46', fontSize: 13, fontWeight: 700,
              padding: '8px 16px', borderRadius: 999, border: '1px solid #6ee7b7',
              fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
            }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('confirmed')}
            </span>
          </div>

          {/* WhatsApp note */}
          <div style={{
            background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)',
            borderRadius: 14, padding: '14px 16px', marginBottom: 24, textAlign: 'center',
          }}>
            <p style={{ fontSize: 13, color: 'var(--text2)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? '📲 سنرسل لك تأكيد الحجز على رقم واتساب الخاص بك.' : "📲 We'll send your booking confirmation to your WhatsApp number."}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/" style={{
              flex: 1, textAlign: 'center', padding: '13px', borderRadius: 14,
              border: '1.5px solid rgba(18,39,68,0.15)', color: 'var(--text2)',
              fontWeight: 600, fontSize: 14, textDecoration: 'none',
              background: 'white', transition: 'background 0.2s',
              fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
            }}>
              {t('backHome')}
            </Link>
            <Link href="/admin" style={{
              flex: 1, textAlign: 'center', padding: '13px', borderRadius: 14,
              background: 'var(--navy)', color: 'white',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              transition: 'opacity 0.2s',
              fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
            }}>
              {isAr ? 'عرض الحجوزات' : 'View Bookings'}
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
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)' }}>
        <svg style={{ width: 32, height: 32, animation: 'spin 1s linear infinite', color: 'var(--blue)' }} viewBox="0 0 24 24" fill="none">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
