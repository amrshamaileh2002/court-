'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="bg-[#0B1C2C] text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏟️</span>
              <span
                className="font-bold text-white text-lg"
                style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
              >
                {t('appName')}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{t('footerDesc')}</p>
            <p className="text-sm mt-2">📍 {t('location')}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#C9A84C] transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/waitlist" className="hover:text-[#C9A84C] transition-colors">
                  {t('waitlist')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C9A84C] transition-colors">
                  {t('admin')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              {lang === 'en' ? 'Sports' : 'الرياضات'}
            </h3>
            <ul className="space-y-1 text-sm">
              {['padel', 'football', 'basketball', 'tennis', 'swimming', 'badminton'].map((s) => (
                <li key={s} className="capitalize">
                  {t(s as any)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs">
          {t('footerRights')}
        </div>
      </div>
    </footer>
  )
}
