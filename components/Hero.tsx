'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import MagneticButton from './MagneticButton'
import Counter from './Counter'

function splitAndAnimate(el: HTMLElement) {
  const text = el.getAttribute('data-text') || el.textContent || ''
  el.innerHTML = ''
  ;[...text].forEach((char, i) => {
    const wrap = document.createElement('span')
    wrap.className = 'char-wrap'
    const inner = document.createElement('span')
    inner.className = 'char'
    inner.style.animationDelay = `${i * 30}ms`
    inner.textContent = char === ' ' ? '\u00A0' : char
    wrap.appendChild(inner)
    el.appendChild(wrap)
  })
}

export default function Hero() {
  const { t, lang } = useLang()
  const h1Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const run = () => {
      if (h1Ref.current) {
        h1Ref.current.querySelectorAll('[data-split]').forEach(el => {
          splitAndAnimate(el as HTMLElement)
        })
      }
    }
    if (document.body.classList.contains('loaded')) run()
    else document.addEventListener('preloader-done', run, { once: true })
  }, [lang])

  // Parallax
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      requestAnimationFrame(() => {
        const y = window.scrollY
        const slow = document.getElementById('hero-parallax-slow')
        const text = document.getElementById('hero-parallax-text')
        const cards = document.getElementById('hero-parallax-cards')
        if (slow)  slow.style.transform  = `translateY(${y * 0.3}px)`
        if (text)  text.style.transform  = `translateY(${y * 0.7}px)`
        if (cards) cards.style.transform = `translateY(${-y * 0.5}px)`
        ticking = false
      })
      ticking = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--navy)' }}>

      {/* Background layers */}
      <div id="hero-parallax-slow" className="absolute inset-0 pointer-events-none">
        <div className="dot-grid absolute inset-0 opacity-[0.03]" />
        <div className="glow-orb" style={{ top: '10%', right: '15%' }} />
        <div className="glow-orb" style={{ top: '60%', left: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="relative flex-1 flex items-center max-w-7xl mx-auto w-full px-5 sm:px-8 py-20">
        <div className="hero-inner flex w-full gap-12 items-center" style={{ direction: 'ltr' }}>

          {/* LEFT – Text */}
          <div id="hero-parallax-text" className="hero-text flex-1 flex flex-col gap-6" style={{ alignItems: lang === 'ar' ? 'flex-end' : 'flex-start', textAlign: lang === 'ar' ? 'right' : 'left' }}>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'var(--gold)', background: 'rgba(201,168,76,0.08)' }}>
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              <span data-en="Coming Soon · Jordan 2025" data-ar="قريباً · الأردن 2025">
                {t('comingSoon')}
              </span>
            </div>

            {/* Headline */}
            <div ref={h1Ref} className="leading-none">
              <div className="font-bebas" style={{ fontSize: 'clamp(72px, 11vw, 136px)', color: 'white', lineHeight: 1 }}>
                <div data-split data-text="BOOK." style={{ display: 'block' }}>BOOK.</div>
              </div>
              <div className="font-bebas text-gold-gradient" style={{ fontSize: 'clamp(72px, 11vw, 136px)', lineHeight: 1 }}>
                <div data-split data-text="PLAY." style={{ display: 'block' }}>PLAY.</div>
              </div>
              <div className="font-bebas text-outline" style={{ fontSize: 'clamp(72px, 11vw, 136px)', lineHeight: 1 }}>
                <div data-split data-text="WIN." style={{ display: 'block' }}>WIN.</div>
              </div>
              <div className="font-arabic mt-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--gold)', opacity: 0.7, fontWeight: 700 }}>
                لعيبة أرينا
              </div>
            </div>

            {/* Sub */}
            <p className="max-w-md font-sans text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              {t('heroDesc')}
            </p>

            {/* Badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border"
              style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
              <span className="text-2xl">🚀</span>
              <div>
                <div className="text-sm font-semibold text-white">App Launching 2025</div>
                <div className="text-xs" style={{ color: 'var(--text3)' }}>iOS · Android · Arabic & English</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                onClick={() => window.location.href = '/waitlist'}
                className="px-7 py-3 rounded-2xl font-semibold text-sm"
                style={{ background: 'var(--gold)', color: 'var(--navy)' } as React.CSSProperties}>
                🎯 {t('joinWaitlist')}
              </MagneticButton>
              <Link href="/how-it-works"
                className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-sm border text-white transition-all hover:border-white/50"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                {t('seeHowItWorks')} →
              </Link>
            </div>

            {/* Stats */}
            <div className="stats-row flex items-center gap-6 pt-2" style={{ flexWrap: 'wrap' }}>
              {[
                { target: 200, suffix: '+', label: lang === 'ar' ? 'ملعب' : 'Courts' },
                { target: 8,   suffix: '',  label: lang === 'ar' ? 'رياضات' : 'Sports' },
                { target: 0,   suffix: '',  label: lang === 'ar' ? 'منافسين' : 'Competitors' },
                { target: 0,   suffix: '',  label: lang === 'ar' ? 'مجاناً للبدء' : 'Free to Start', freeText: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  {i > 0 && <div className="stats-divider h-8 w-px" style={{ background: 'rgba(255,255,255,0.12)' }} />}
                  <div>
                    <div className="font-bebas text-3xl" style={{ color: 'var(--gold)' }}>
                      {s.freeText ? (lang === 'ar' ? 'مجاناً' : 'Free') : <Counter target={s.target} suffix={s.suffix} />}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text3)' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – Floating cards */}
          <div id="hero-parallax-cards" className="hero-cards relative flex-shrink-0"
            style={{ width: 340, height: 520, display: 'none' }}>
            <style>{`@media(min-width:1200px){#hero-parallax-cards{display:block}}`}</style>

            {/* Card 1 – Booking */}
            <div className="float-card-1 absolute" style={{ top: 0, left: 0, width: 280, zIndex: 3 }}>
              <div className="app-card p-4" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🏓</span>
                  <div>
                    <div className="text-xs font-semibold text-white">Padel Pro Court</div>
                    <div className="text-xs" style={{ color: 'var(--text3)' }}>Abdoun · 25 JD/hr</div>
                  </div>
                  <span className="ms-auto text-xs font-bold" style={{ color: 'var(--gold)' }}>★ 4.9</span>
                </div>
                <div className="text-xs mb-2" style={{ color: 'var(--text3)' }}>Select Time Slot</div>
                <div className="grid grid-cols-4 gap-1 mb-3">
                  {['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00'].map((t, i) => (
                    <div key={t} className="text-center py-1 rounded text-xs font-medium"
                      style={{ background: i === 2 ? 'var(--gold)' : i === 5 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)',
                               color: i === 2 ? 'var(--navy)' : i === 5 ? '#ef4444' : 'rgba(255,255,255,0.7)',
                               fontSize: 10 }}>
                      {t}
                    </div>
                  ))}
                </div>
                <div className="w-full py-2 rounded-xl text-xs font-bold text-center"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                  Book — 25 JD
                </div>
              </div>
            </div>

            {/* Card 2 – Player Matching */}
            <div className="float-card-2 absolute" style={{ top: 120, right: -20, width: 260, zIndex: 2 }}>
              <div className="app-card p-4" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🤝</span>
                  <div className="text-xs font-semibold text-white">Find a Player</div>
                </div>
                {[
                  { name: 'Ahmad K.', sport: 'Padel · Mid', stars: '4.8', color: '#C9A84C' },
                  { name: 'Sara M.',  sport: 'Tennis · Adv', stars: '4.9', color: '#1B6CA8' },
                ].map(p => (
                  <div key={p.name} className="flex items-center gap-2 mb-2 p-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: p.color }}>{p.name[0]}</div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-white">{p.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text3)' }}>{p.sport}</div>
                    </div>
                    <div className="text-xs font-bold" style={{ color: 'var(--gold)' }}>★{p.stars}</div>
                  </div>
                ))}
                <div className="w-full py-1.5 rounded-lg text-xs font-bold text-center mt-2"
                  style={{ background: 'var(--teal)', color: 'white' }}>
                  Find My Match
                </div>
              </div>
            </div>

            {/* Card 3 – Loyalty */}
            <div className="float-card-3 absolute" style={{ bottom: 0, left: 20, width: 260, zIndex: 4 }}>
              <div className="app-card p-4" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)', background: 'linear-gradient(135deg, #0B1C2C 0%, #1A3048 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-semibold">🏆 Your Points</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}>GOLD</span>
                </div>
                <div className="font-bebas text-4xl mb-1" style={{ color: 'var(--gold)' }}>2,450</div>
                <div className="text-xs mb-2" style={{ color: 'var(--text3)' }}>550 pts to Legend tier</div>
                <div className="w-full rounded-full overflow-hidden mb-3" style={{ height: 6, background: 'rgba(255,255,255,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: '82%', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }} />
                </div>
                {['+50 pts  Padel Court  Yesterday', '+25 pts  Referral Bonus  Mon'].map(r => (
                  <div key={r} className="text-xs py-1" style={{ color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>{r}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="scroll-chevron text-white opacity-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </section>
  )
}
