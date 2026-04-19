'use client'
import Link from 'next/link'
import { Court } from '@/lib/supabase'
import { useLang } from '@/context/LanguageContext'
import TiltCard from './TiltCard'

const SPORT_EMOJIS: Record<string, string> = {
  padel: '🏓', football: '⚽', basketball: '🏀',
  tennis: '🎾', swimming: '🏊', badminton: '🏸', volleyball: '🏐', boxing: '🥊',
}

const SPORT_TINTS: Record<string, string> = {
  padel:      'rgba(201,168,76,0.12)',
  football:   'rgba(34,197,94,0.12)',
  basketball: 'rgba(249,115,22,0.12)',
  tennis:     'rgba(234,179,8,0.12)',
  swimming:   'rgba(59,130,246,0.12)',
  badminton:  'rgba(168,85,247,0.12)',
  volleyball: 'rgba(20,184,166,0.12)',
  boxing:     'rgba(239,68,68,0.12)',
}

export default function CourtCard({ court }: { court: Court }) {
  const { t, lang } = useLang()
  return (
    <TiltCard className="h-full">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full"
        style={{ border: '1px solid rgba(11,28,44,0.08)', boxShadow: '0 4px 16px rgba(11,28,44,0.06)' }}>

        {/* Image / placeholder */}
        <div className="relative h-48 overflow-hidden flex-shrink-0"
          style={{ background: SPORT_TINTS[court.sport] || 'rgba(11,28,44,0.04)' }}>
          {court.image_url ? (
            <img src={court.image_url} alt={court.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1a3048 100%)' }}>
              <span className="text-6xl opacity-80">{SPORT_EMOJIS[court.sport] || '🏟️'}</span>
            </div>
          )}

          {/* Sport badge */}
          <div className="absolute top-3 start-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'white', color: 'var(--navy)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              {SPORT_EMOJIS[court.sport]} {t(court.sport as any)}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-3 end-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
              ★ {(4.5 + Math.random() * 0.5).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-base mb-1 leading-tight" style={{ color: 'var(--navy)' }}>{court.name}</h3>
          <p className="text-sm mb-3 flex items-center gap-1" style={{ color: 'var(--text3)' }}>
            <span>📍</span> {court.location}
          </p>
          <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2" style={{ color: 'var(--text2)' }}>
            {court.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4"
            style={{ borderTop: '1px solid rgba(11,28,44,0.07)' }}>
            <div>
              <span className="font-bebas text-2xl" style={{ color: 'var(--navy)' }}>{court.price}</span>
              <span className="text-xs ms-1" style={{ color: 'var(--text3)' }}>{t('jd')} {t('perHour')}</span>
            </div>
            <Link href={`/courts/${court.id}`}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'var(--navy)', color: 'white' }}>
              {t('viewSlots')}
            </Link>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
