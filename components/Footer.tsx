'use client'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

const LINKS = {
  product: [
    { href: '/courts',       en: 'Browse Courts',   ar: 'تصفح الملاعب' },
    { href: '/how-it-works', en: 'How It Works',    ar: 'كيف يعمل' },
    { href: '/waitlist',     en: 'Join Waitlist',   ar: 'انضم للقائمة' },
  ],
  owners: [
    { href: '/for-courts',   en: 'List Your Court', ar: 'أضف ملعبك' },
    { href: '/for-courts',   en: 'Analytics',       ar: 'التحليلات' },
    { href: '/for-courts',   en: 'Pricing',         ar: 'الأسعار' },
  ],
  company: [
    { href: '/',             en: 'About',           ar: 'عن المشروع' },
    { href: '/',             en: 'Contact',         ar: 'تواصل معنا' },
    { href: '/',             en: 'Privacy',         ar: 'الخصوصية' },
  ],
}

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer style={{ background: '#060e16', color: 'rgba(255,255,255,0.5)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="pulse-dot" />
              <span className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--gold)' }}>
                LA3EBEH ARENA
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ maxWidth: 220 }}>
              {lang === 'ar' ? 'منصة حجز الملاعب الرياضية في الأردن.' : "Jordan's sports court booking platform."}
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: lang === 'ar' ? 'المنتج' : 'Product',           items: LINKS.product },
            { title: lang === 'ar' ? 'لأصحاب الملاعب' : 'For Owners', items: LINKS.owners },
            { title: lang === 'ar' ? 'الشركة' : 'Company',           items: LINKS.company },
          ].map(col => (
            <div key={col.title}>
              <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.items.map(link => (
                  <li key={link.en}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-white">
                      {lang === 'ar' ? link.ar : link.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <span>© 2025 La3ebeh Arena · لعيبة أرينا. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span className="pulse-dot" style={{ width: 6, height: 6 }} />
            <span style={{ color: 'var(--gold)' }}>Launching Jordan 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
