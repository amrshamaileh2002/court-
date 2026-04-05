'use client'

import { useLang } from '@/context/LanguageContext'
import { TranslationKey } from '@/lib/i18n'

const SPORTS = [
  { key: 'allSports', value: 'all', emoji: '🏅' },
  { key: 'padel', value: 'padel', emoji: '🏓' },
  { key: 'football', value: 'football', emoji: '⚽' },
  { key: 'basketball', value: 'basketball', emoji: '🏀' },
  { key: 'tennis', value: 'tennis', emoji: '🎾' },
  { key: 'swimming', value: 'swimming', emoji: '🏊' },
  { key: 'badminton', value: 'badminton', emoji: '🏸' },
] as const

type Props = {
  selected: string
  onChange: (value: string) => void
}

export default function SportFilterChips({ selected, onChange }: Props) {
  const { t } = useLang()

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {SPORTS.map((sport) => {
        const active = selected === sport.value
        return (
          <button
            key={sport.value}
            onClick={() => onChange(sport.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              active
                ? 'bg-[#C9A84C] text-[#0B1C2C] border-[#C9A84C] shadow-md scale-105'
                : 'bg-white text-[#0B1C2C] border-gray-200 hover:border-[#C9A84C] hover:text-[#C9A84C]'
            }`}
          >
            <span>{sport.emoji}</span>
            <span>{t(sport.key as TranslationKey)}</span>
          </button>
        )
      })}
    </div>
  )
}
