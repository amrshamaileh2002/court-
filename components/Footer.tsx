'use client'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

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

  return (
    <footer style={{ background: '#07111e', color: 'rgba(255,255,255,0.45)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-all group-hover:scale-110"
                style={{ background: '#E2FF67', color: '#122744', fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                K
              </div>
              <span
                className="font-barlow-cond font-black text-2xl text-white tracking-tight"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                KORTNA
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ maxWidth: 200, fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
            >
              {isAr
                ? 'أول منصة ذكية لحجز الملاعب الرياضية في الأردن.'
                : "Jordan's first smart sports court booking platform."}
            </p>

            {/* Social links */}
            <div className="flex gap-2.5">
              {[
                { label: '𝕏', href: '#' },
                { label: 'in', href: '#' },
                { label: 'ig', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all hover:text-white hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: isAr ? 'المنتج' : 'Product',           items: LINKS.product },
            { title: isAr ? 'لأصحاب الملاعب' : 'For Venues', items: LINKS.venues },
            { title: isAr ? 'الشركة' : 'Company',           items: LINKS.company },
          ].map(col => (
            <div key={col.title}>
              <div
                className="text-xs font-bold uppercase tracking-widest text-white mb-4"
                style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
              >
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.items.map(link => (
                  <li key={link.en}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}
                    >
                      {isAr ? link.ar : link.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <span style={{ fontFamily: isAr ? 'Cairo, sans-serif' : undefined }}>
            {isAr ? '© 2026 كورتنا. جميع الحقوق محفوظة.' : '© 2026 Kortna · كورتنا. All rights reserved.'}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#E2FF67' }}
            />
            <span style={{ color: '#E2FF67' }}>
              {isAr ? 'عمّان، الأردن — إطلاق 2026' : 'Amman, Jordan — Launching 2026'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
