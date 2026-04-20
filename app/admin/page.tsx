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

const STATUS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  confirmed: { bg: '#ecfdf5', color: '#065f46', border: '#6ee7b7' },
  pending:   { bg: '#fffbeb', color: '#92400e', border: '#fcd34d' },
  cancelled: { bg: '#fef2f2', color: '#991b1b', border: '#fca5a5' },
}

export default function AdminPage() {
  const { t, lang } = useLang()
  const [bookings, setBookings] = useState<EnrichedBooking[]>([])
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all')
  const isAr = lang === 'ar'

  useEffect(() => {
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
    return d.toLocaleDateString(isAr ? 'ar-JO' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const FILTERS = [
    { key: 'all',       label: isAr ? 'الكل' : 'All',        bg: '#122744', color: 'white' },
    { key: 'confirmed', label: isAr ? 'مؤكد' : 'Confirmed',  bg: '#ecfdf5', color: '#065f46' },
    { key: 'pending',   label: isAr ? 'معلّق' : 'Pending',   bg: '#fffbeb', color: '#92400e' },
    { key: 'cancelled', label: isAr ? 'ملغى' : 'Cancelled',  bg: '#fef2f2', color: '#991b1b' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--off-white)' }}>
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 64px', width: '100%', flex: 1, boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
              fontWeight: 900, fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--navy)', lineHeight: 1, marginBottom: 6,
            }}>
              {t('adminPanel')}
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text3)', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
              {isAr ? 'إدارة جميع حجوزات الملاعب' : 'Manage all court bookings'}
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--navy)', color: 'white',
            padding: '10px 18px', borderRadius: 12, fontSize: 14, fontWeight: 600,
          }}>
            <span>📊</span>
            <span>{bookings.length} {isAr ? 'حجز إجمالي' : 'Total Bookings'}</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                cursor: 'pointer', border: filter === f.key ? 'none' : '1.5px solid rgba(18,39,68,0.1)',
                background: filter === f.key ? f.bg : 'white',
                color: filter === f.key ? f.color : 'var(--text2)',
                boxShadow: filter === f.key ? '0 4px 12px rgba(18,39,68,0.15)' : 'none',
                transition: 'all 0.2s ease',
                fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 900, fontFamily: 'Barlow Condensed, sans-serif' }}>
                {statusCounts[f.key as keyof typeof statusCounts]}
              </span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid rgba(18,39,68,0.08)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(18,39,68,0.06)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(18,39,68,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--navy)' }}>
              {t('allBookings')}
            </h2>
            <span style={{ fontSize: 13, color: 'var(--text3)' }}>{filteredBookings.length} {isAr ? 'سجل' : 'entries'}</span>
          </div>

          {filteredBookings.length === 0 ? (
            <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--text3)' }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>📋</span>
              <p style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>{t('noBookings')}</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8f9fb' }}>
                    {[t('bookingId'), t('courtName'), t('slotDate'), t('slotTime'), t('userName'), t('userWhatsapp'), t('status'), t('createdAt')].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: isAr ? 'right' : 'left', fontWeight: 600, fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, idx) => {
                    const sc = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
                    return (
                      <tr key={booking.id} style={{ background: idx % 2 === 0 ? 'white' : 'rgba(248,249,251,0.5)', borderTop: '1px solid rgba(18,39,68,0.05)' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--blue)', background: 'rgba(22,69,211,0.08)', padding: '3px 8px', borderRadius: 6 }}>
                            {booking.id}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>
                            <span>{SPORT_EMOJIS[booking.sport] || '🏟️'}</span>
                            {booking.courtName}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--text2)', whiteSpace: 'nowrap' }}>{formatDate(booking.date)}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--text2)', fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' }}>
                          {booking.startTime} – {booking.endTime}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{booking.user_name}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--text2)', fontFamily: 'monospace', fontSize: 12, direction: 'ltr', whiteSpace: 'nowrap' }}>{booking.user_whatsapp}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                            fontSize: 11, fontWeight: 700,
                            background: sc.bg, color: sc.color,
                            border: `1px solid ${sc.border}`,
                            fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
                          }}>
                            {t(booking.status as any)}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--text3)', fontSize: 12, whiteSpace: 'nowrap' }}>
                          {new Date(booking.created_at).toLocaleDateString(isAr ? 'ar-JO' : 'en-GB')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
