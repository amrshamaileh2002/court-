'use client'

const ITEMS = [
  '🎾 Tennis',  '⚽ Football',  '🏀 Basketball',  '🏸 Badminton',
  '🏊 Swimming', '🎾 Padel',    '⚡ Flash Deals',  '🏆 Earn Rewards',
  '🔍 Find Courts', '🤝 Find Players', '📅 Easy Booking', '💳 Secure Pay',
]

export default function KortnaTicker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="ticker-bar" style={{ padding: '12px 0', overflow: 'hidden' }}>
      <div className="ticker-wrap" style={{ overflow: 'hidden' }}>
        <div className="ticker-track" style={{ display: 'flex', willChange: 'transform' }}>
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span style={{
                display: 'inline-block', width: 4, height: 4, borderRadius: '50%',
                background: 'rgba(18,39,68,0.3)', marginLeft: 12,
              }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
