'use client'

const ITEMS = [
  '🎾 PADEL','⚽ FOOTBALL','🏀 BASKETBALL','🎾 TENNIS',
  '🏊 SWIMMING','🏸 BADMINTON','🏐 VOLLEYBALL','🥊 BOXING',
]

export default function SportsTicker() {
  const repeated = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker-wrap overflow-hidden py-4" style={{ background: 'var(--gold)' }}>
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="font-bebas text-[28px] whitespace-nowrap mx-6 flex-shrink-0"
            style={{ color: 'var(--navy)', letterSpacing: '0.04em' }}>
            {item}
            <span className="mx-6 opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
