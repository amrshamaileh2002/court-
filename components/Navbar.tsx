'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#0B1C2C] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🏟️</span>
            <span
              className="font-bold text-white text-lg leading-tight"
              style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
            >
              {t('appName')}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm font-medium"
            >
              {t('home')}
            </Link>
            <Link
              href="/waitlist"
              className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm font-medium"
            >
              {t('waitlist')}
            </Link>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm font-medium"
            >
              {t('admin')}
            </Link>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 bg-[#1B6CA8] hover:bg-[#1558891] text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors border border-[#1B6CA8] hover:border-[#C9A84C]"
              style={{ fontFamily: lang === 'ar' ? 'DM Sans, sans-serif' : 'Tajawal, sans-serif' }}
            >
              <span>{lang === 'en' ? '🇯🇴 عربي' : '🇬🇧 EN'}</span>
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-white text-sm bg-[#1B6CA8] px-2.5 py-1 rounded-full"
              style={{ fontFamily: lang === 'ar' ? 'DM Sans, sans-serif' : 'Tajawal, sans-serif' }}
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d2236] border-t border-[#1B6CA8]/30 px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-300 hover:text-[#C9A84C] py-2 text-sm font-medium"
          >
            {t('home')}
          </Link>
          <Link
            href="/waitlist"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-300 hover:text-[#C9A84C] py-2 text-sm font-medium"
          >
            {t('waitlist')}
          </Link>
          <Link
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-300 hover:text-[#C9A84C] py-2 text-sm font-medium"
          >
            {t('admin')}
          </Link>
        </div>
      )}
    </nav>
  )
}
