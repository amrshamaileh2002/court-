'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Lang, translations, TranslationKey } from '@/lib/i18n'

type LanguageContextType = {
  lang: Lang
  toggleLang: () => void
  t: (key: TranslationKey) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: (key) => key,
  dir: 'ltr',
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang
    if (saved === 'en' || saved === 'ar') {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))

  const t = (key: TranslationKey): string => translations[lang][key] || translations.en[key] || key

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
