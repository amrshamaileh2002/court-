'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Court } from '@/lib/supabase'
import { useLang } from '@/context/LanguageContext'

const SPORT_EMOJIS: Record<string, string> = {
  padel: '🏓',
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  swimming: '🏊',
  badminton: '🏸',
}

const SPORT_COLORS: Record<string, string> = {
  padel: 'bg-emerald-100 text-emerald-700',
  football: 'bg-green-100 text-green-700',
  basketball: 'bg-orange-100 text-orange-700',
  tennis: 'bg-yellow-100 text-yellow-700',
  swimming: 'bg-blue-100 text-blue-700',
  badminton: 'bg-purple-100 text-purple-700',
}

type Props = {
  court: Court
}

export default function CourtCard({ court }: Props) {
  const { t, lang } = useLang()

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {court.image_url ? (
          <img
            src={court.image_url}
            alt={court.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0B1C2C] to-[#1B6CA8]">
            <span className="text-6xl">{SPORT_EMOJIS[court.sport] || '🏟️'}</span>
          </div>
        )}
        {/* Sport badge */}
        <div className="absolute top-3 start-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${SPORT_COLORS[court.sport] || 'bg-gray-100 text-gray-700'}`}>
            {SPORT_EMOJIS[court.sport]} {t(court.sport as any)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0B1C2C] text-lg mb-1 leading-tight">{court.name}</h3>
        <p className="text-gray-500 text-sm mb-2 flex items-center gap-1">
          <span>📍</span> {court.location}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {court.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-[#0B1C2C]">{court.price}</span>
            <span className="text-sm text-gray-500 ms-1">{t('jd')} {t('perHour')}</span>
          </div>
          <Link
            href={`/courts/${court.id}`}
            className="bg-[#1B6CA8] hover:bg-[#155d91] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {t('viewSlots')}
          </Link>
        </div>
      </div>
    </div>
  )
}
