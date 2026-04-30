'use client'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'

const TIERS = [
  { id: 'starter', en: 'Starter',  ar: 'مبتدئ', icon: '🥉', color: '#CD7F32', minXp: 0,    maxXp: 499 },
  { id: 'pro',     en: 'Pro',      ar: 'محترف',  icon: '🥈', color: '#C0C0C0', minXp: 500,  maxXp: 1999 },
  { id: 'elite',   en: 'Elite',    ar: 'نخبة',   icon: '🥇', color: '#E2FF67', minXp: 2000, maxXp: 4999 },
  { id: 'legend',  en: 'Legend',   ar: 'أسطورة', icon: '💎', color: '#8BC4DE', minXp: 5000, maxXp: 9999 },
]

const EARN_WAYS = [
  { icon: '🎾', en: 'Book a court', ar: 'احجز ملعباً', pts: '+50 XP', desc_en: 'Per booking', desc_ar: 'لكل حجز' },
  { icon: '🤝', en: 'Join a match', ar: 'انضم لمباراة', pts: '+30 XP', desc_en: 'Per game joined', desc_ar: 'لكل مباراة' },
  { icon: '⭐', en: 'Leave a review', ar: 'اكتب تقييماً', pts: '+20 XP', desc_en: 'After playing', desc_ar: 'بعد اللعب' },
  { icon: '👥', en: 'Refer a friend', ar: 'ادعُ صديقاً', pts: '+100 XP', desc_en: 'When they book', desc_ar: 'عند حجزه' },
  { icon: '📅', en: 'Weekly streak', ar: 'سلسلة أسبوعية', pts: '+75 XP', desc_en: '3+ games/week', desc_ar: '3+ مباريات أسبوعياً' },
  { icon: '🏆', en: 'Win a tournament', ar: 'فز ببطولة', pts: '+200 XP', desc_en: 'First place', desc_ar: 'المركز الأول' },
]

const REWARDS = [
  { icon: '🎾', en: 'Free padel hour', ar: 'ساعة بادل مجانية', pts: 500, category: 'free' },
  { icon: '💳', en: '20% off next booking', ar: 'خصم 20% على الحجز التالي', pts: 300, category: 'discount' },
  { icon: '⚽', en: 'Football night slot', ar: 'ملعب كرة قدم ليلي', pts: 700, category: 'free' },
  { icon: '👕', en: 'Kortna sports gear', ar: 'معدات رياضية كورتنا', pts: 1200, category: 'merch' },
  { icon: '🎁', en: 'VIP court upgrade', ar: 'ترقية إلى ملعب VIP', pts: 800, category: 'upgrade' },
  { icon: '🌟', en: 'Guest pass (1 friend)', ar: 'تذكرة ضيف (صديق)', pts: 400, category: 'social' },
]

const USER_XP = 1340

export default function RewardsPage() {
  const { lang } = useLang()
  const [inView, setInView] = useState(false)
  const [xpAnimated, setXpAnimated] = useState(false)
  const [rewardFilter, setRewardFilter] = useState('all')
  const xpRef = useRef<HTMLDivElement>(null)
  const isAr = lang === 'ar'

  const currentTier = TIERS.find(t => USER_XP >= t.minXp && USER_XP <= t.maxXp) || TIERS[0]
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1]
  const xpToNext = nextTier ? nextTier.minXp - USER_XP : 0
  const progress = nextTier ? ((USER_XP - currentTier.minXp) / (nextTier.minXp - currentTier.minXp)) * 100 : 100

  useEffect(() => { setTimeout(() => setInView(true), 100) }, [])
  useEffect(() => {
    const el = xpRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setXpAnimated(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filteredRewards = rewardFilter === 'all' ? REWARDS : REWARDS.filter(r => r.category === rewardFilter)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>
      <Navbar />

      {/* Hero XP card */}
      <section style={{ background: 'var(--navy)', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.09, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(226,255,103,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
               className="rewards-hero-grid">

            {/* XP card */}
            <div ref={xpRef} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${currentTier.color}40`,
              borderRadius: 28, padding: 36,
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${currentTier.color}, transparent)` }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                  background: `${currentTier.color}18`, border: `2px solid ${currentTier.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
                }}>
                  {currentTier.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 4 }}>
                    {isAr ? 'مستواك الحالي' : 'Current Tier'}
                  </div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 28, color: currentTier.color }}>
                    {isAr ? currentTier.ar : currentTier.en}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 36, color: '#E2FF67', lineHeight: 1 }}>
                    {USER_XP.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>XP</div>
                </div>
              </div>

              {/* Progress bar */}
              {nextTier && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      {USER_XP} XP
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      {nextTier.minXp} XP ({isAr ? nextTier.ar : nextTier.en})
                    </span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
                    <div className="xp-bar-fill" style={{ width: xpAnimated ? `${progress}%` : '0%', height: '100%' }} />
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
                    {isAr
                      ? `${xpToNext} نقطة للوصول لـ ${nextTier.ar}`
                      : `${xpToNext} XP to reach ${nextTier.en}`}
                  </div>
                </div>
              )}
            </div>

            {/* Text */}
            <div style={{
              opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}>
              <div className="section-label section-label-lime" style={{ marginBottom: 18 }}>
                🏆 {isAr ? 'المكافآت والنقاط' : 'Loyalty Rewards'}
              </div>
              <h1 style={{
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
                fontWeight: 900, fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'white', lineHeight: 1.05,
              }}>
                {isAr ? 'العب أكثر،\nاكسب أكثر' : 'Play More,\nEarn More'}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 14, lineHeight: 1.7, maxWidth: 380, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
                {isAr
                  ? 'كل حجز أو مباراة يكسبك نقاطاً. اجمع النقاط وارتقِ للمستويات الأعلى للحصول على مكافآت حصرية.'
                  : 'Every booking and match earns you XP. Level up to unlock exclusive perks, free sessions, and gear.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* Tiers */}
        <div style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32, color: 'var(--navy)', marginBottom: 24 }}>
            {isAr ? 'المستويات' : 'Tier Levels'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {TIERS.map((tier, i) => {
              const active = tier.id === currentTier.id
              return (
                <div
                  key={tier.id}
                  className={`tier-card${active ? ' active' : ''}`}
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}
                >
                  {active && (
                    <div style={{ background: '#E2FF67', color: '#122744', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'inline-block', marginBottom: 10 }}>
                      {isAr ? 'مستواك الحالي' : 'Your Tier'}
                    </div>
                  )}
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{tier.icon}</div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 22, color: tier.color, marginBottom: 4 }}>
                    {isAr ? tier.ar : tier.en}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>
                    {tier.minXp === 0 ? (isAr ? 'ابدأ مجاناً' : 'Start free') : `${tier.minXp.toLocaleString()}+ XP`}
                  </div>
                  {active && (
                    <div style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 700 }}>
                      {isAr ? `${USER_XP} نقطة` : `${USER_XP} XP`}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* How to earn */}
        <div style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32, color: 'var(--navy)', marginBottom: 24 }}>
            {isAr ? 'كيف تكسب نقاطاً' : 'How to Earn XP'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {EARN_WAYS.map((w, i) => (
              <div key={w.en} className="kortna-card" style={{
                padding: '20px 24px',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                    background: 'rgba(226,255,103,0.1)', border: '1px solid rgba(226,255,103,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>
                    {w.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>{isAr ? w.ar : w.en}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{isAr ? w.desc_ar : w.desc_en}</div>
                  </div>
                  <div style={{
                    background: 'rgba(226,255,103,0.1)', color: '#7a8e10',
                    fontSize: 13, fontWeight: 800, padding: '4px 10px', borderRadius: 8,
                    flexShrink: 0, fontFamily: 'Barlow Condensed, sans-serif',
                  }}>
                    {w.pts}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem rewards */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 32, color: 'var(--navy)' }}>
              {isAr ? 'استبدل نقاطك' : 'Redeem Rewards'}
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: 'all', en: 'All', ar: 'الكل' },
                { id: 'free', en: 'Free Sessions', ar: 'جلسات مجانية' },
                { id: 'discount', en: 'Discounts', ar: 'خصومات' },
                { id: 'merch', en: 'Merch', ar: 'منتجات' },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setRewardFilter(c.id)}
                  style={{
                    padding: '7px 14px', borderRadius: 10, cursor: 'pointer', border: '1.5px solid transparent',
                    background: rewardFilter === c.id ? 'var(--navy)' : 'rgba(18,39,68,0.06)',
                    color: rewardFilter === c.id ? 'white' : 'var(--navy)',
                    fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
                  }}
                >
                  {isAr ? c.ar : c.en}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {filteredRewards.map((r, i) => {
              const canRedeem = USER_XP >= r.pts
              return (
                <div key={r.en} className="kortna-card" style={{
                  padding: '24px', opacity: canRedeem ? 1 : 0.6,
                }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{r.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy)', marginBottom: 6 }}>
                    {isAr ? r.ar : r.en}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    <div>
                      <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 22, color: canRedeem ? '#7a8e10' : 'var(--text3)' }}>
                        {r.pts}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text3)', marginLeft: 4 }}>XP</span>
                    </div>
                    <button
                      disabled={!canRedeem}
                      style={{
                        padding: '8px 18px', borderRadius: 10, border: 'none',
                        cursor: canRedeem ? 'pointer' : 'not-allowed',
                        background: canRedeem ? '#E2FF67' : 'rgba(18,39,68,0.08)',
                        color: canRedeem ? '#122744' : 'var(--text3)',
                        fontSize: 12, fontWeight: 800,
                        letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                        fontFamily: 'Barlow Condensed, sans-serif',
                      }}
                    >
                      {canRedeem ? (isAr ? 'استبدل' : 'Redeem') : (isAr ? 'تحتاج المزيد' : 'Need more XP')}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`@media (max-width: 768px) { .rewards-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </div>
  )
}
