'use client'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { KortnaLogoMark } from './KortnaLogo'

const LINKS = {
  product: [
    { href: '/courts',       en: 'Browse Courts',   ar: 'تصفح الملاعب' },
    { href: '/how-it-works', en: 'How It Works',    ar: 'كيف يعمل' },
    { href: '/waitlist',     en: 'Join Waitlist',   ar: 'انضم للقائمة' },
  ],
  venues: [
    { href: '/for-courts',   en: 'List Your Court', ar: 'أضف ملعبك' },
    { href: '/for-courts',   en: 'Analytics',       ar: 'التحليلات' },
    { href: '/for-courts',   en: 'Pricing',         ar: 'الأسعار' },
  ],
  company: [
    { href: '/',             en: 'About Kortna',    ar: 'عن كورتنا' },
    { href: '/',             en: 'Contact Us',      ar: 'تواصل معنا' },
    { href: '/',             en: 'Privacy Policy',  ar: 'سياسة الخصوصية' },
    { href: '/',             en: 'Terms',           ar: 'الشروط' },
  ],
}

export default function Footer() {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  const colHeadStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'white',
    marginBottom: 18,
    fontFamily: isAr ? 'Cairo, sans-serif' : 'Barlow Condensed, sans-serif',
  }

  const linkStyle: React.CSSProperties = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.45)',
    textDecoration: 'none',
    display: 'block',
    marginBottom: 12,
    transition: 'color 0.2s',
    fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
  }

  return (
    <footer style={{ background: '#07111e', color: 'rgba(255,255,255,0.45)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 56,
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 8 }}>
              <KortnaLogoMark size={42} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  fontSize: 26,
                  color: 'white',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}>
                  KORTNA
                </span>
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 600,
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginTop: 3,
                }}>
                  YOUR GAME OUR COURT
                </span>
              </div>
            </Link>
            <p style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.4)',
              maxWidth: 200,
              marginTop: 16,
              marginBottom: 20,
              fontFamily: isAr ? 'Cairo, sans-serif' : undefined,
            }}>
              {isAr
                ? 'أول منصة ذكية لحجز الملاعب الرياضية في الأردن.'
                : "Jordan's first smart sports court booking platform."}
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: '𝕏', href: '#' },
                { label: 'in', href: '#' },
                { label: 'ig', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    const a = e.currentTarget as HTMLAnchorElement
                    a.style.color = 'white'
                    a.style.borderColor = 'rgba(232,90,30,0.4)'
                    a.style.background = 'rgba(232,90,30,0.12)'
                  }}
                  onMouseLeave={e => {
                    const a = e.currentTarget as HTMLAnchorElement
                    a.style.color = 'rgba(255,255,255,0.5)'
                    a.style.borderColor = 'rgba(255,255,255,0.09)'
                    a.style.background = 'rgba(255,255,255,0.06)'
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: isAr ? 'المنتج'           : 'Product',    items: LINKS.product  },
            { title: isAr ? 'لأصحاب الملاعب'  : 'For Venues', items: LINKS.venues   },
            { title: isAr ? 'الشركة'           : 'Company',    items: LINKS.company  },
          ].map(col => (
            <div key={col.title}>
              <div style={colHeadStyle}>{col.title}</div>
              {col.items.map(link => (
                <Link
                  key={link.en}
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {isAr ? link.ar : link.en}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <span style={{ fontSize: 12, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {isAr ? '© 2026 كورتنا. جميع الحقوق محفوظة.' : '© 2026 Kortna · كورتنا. All rights reserved.'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E85A1E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#E85A1E', fontWeight: 600 }}>
              {isAr ? 'عمّان، الأردن — إطلاق 2026' : 'Amman, Jordan — Launching 2026'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
