'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'

type WaitlistEntry = {
  id: string
  name: string
  whatsapp: string
  createdAt: string
}

export default function WaitlistPage() {
  const { t, lang } = useLang()
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [loading, setLoading] = useState(false)
  const [joined, setJoined] = useState(false)
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  // Seed some fake waitlist entries for display
  useEffect(() => {
    const saved = localStorage.getItem('waitlistEntries')
    if (saved) {
      setEntries(JSON.parse(saved))
    } else {
      const seed: WaitlistEntry[] = [
        { id: '1', name: 'Mohammad Al-Khatib', whatsapp: '+962790000001', createdAt: new Date().toISOString() },
        { id: '2', name: 'Lana Abukhait', whatsapp: '+962790000002', createdAt: new Date().toISOString() },
        { id: '3', name: 'Kareem Zidan', whatsapp: '+962790000003', createdAt: new Date().toISOString() },
        { id: '4', name: 'Nour Mansour', whatsapp: '+962790000004', createdAt: new Date().toISOString() },
        { id: '5', name: 'Hana Taha', whatsapp: '+962790000005', createdAt: new Date().toISOString() },
      ]
      setEntries(seed)
      localStorage.setItem('waitlistEntries', JSON.stringify(seed))
    }

    // Check if user already joined
    const myEntry = localStorage.getItem('myWaitlistEntry')
    if (myEntry) {
      setAlreadyJoined(true)
      setJoined(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !whatsapp.trim()) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))

    const newEntry: WaitlistEntry = {
      id: `wl-${Date.now()}`,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      createdAt: new Date().toISOString(),
    }

    const updated = [...entries, newEntry]
    setEntries(updated)
    localStorage.setItem('waitlistEntries', JSON.stringify(updated))
    localStorage.setItem('myWaitlistEntry', JSON.stringify(newEntry))

    setLoading(false)
    setJoined(true)
    setAlreadyJoined(true)
  }

  const sports = [
    { emoji: '🏓', name: lang === 'en' ? 'Padel' : 'بادل' },
    { emoji: '⚽', name: lang === 'en' ? 'Football' : 'كرة القدم' },
    { emoji: '🏀', name: lang === 'en' ? 'Basketball' : 'كرة السلة' },
    { emoji: '🎾', name: lang === 'en' ? 'Tennis' : 'تنس' },
    { emoji: '🏊', name: lang === 'en' ? 'Swimming' : 'سباحة' },
    { emoji: '🏸', name: lang === 'en' ? 'Badminton' : 'ريشة طائرة' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1C2C] to-[#1B3A5C] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A84C]/20 border border-[#C9A84C]/30 mb-5 text-3xl">
            📋
          </div>
          <h1
            className="text-3xl md:text-5xl font-black mb-4"
            style={{
              fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif',
              color: '#C9A84C',
            }}
          >
            {t('waitlistTitle')}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto">
            {t('waitlistDesc')}
          </p>

          {/* Counter */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 mt-6">
            <span className="text-2xl font-black text-[#C9A84C]">{entries.length}</span>
            <span className="text-sm text-gray-300">{t('currentWaitlist')}</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div>
            {!joined ? (
              <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                <h2
                  className="text-xl font-bold text-[#0B1C2C] mb-2"
                  style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
                >
                  {t('joinWaitlist')}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {lang === 'en'
                    ? "Fill in your details and we'll reach out via WhatsApp."
                    : 'أدخل بياناتك وسنتواصل معك عبر واتساب.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2C] mb-1.5">
                      {t('waitlistName')} *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('namePlaceholder')}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1B6CA8] focus:outline-none text-[#0B1C2C] placeholder-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2C] mb-1.5">
                      {t('waitlistWhatsapp')} *
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder={t('whatsappPlaceholder')}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1B6CA8] focus:outline-none text-[#0B1C2C] placeholder-gray-400 transition-colors"
                      dir="ltr"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b8962f] text-[#0B1C2C] font-bold text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {lang === 'en' ? 'Joining...' : 'جاري الانضمام...'}
                      </span>
                    ) : t('joinWaitlist')}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-md border border-emerald-100 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-bold text-[#0B1C2C] mb-2"
                  style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
                >
                  {t('waitlistSuccess')}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{t('waitlistSuccessDesc')}</p>

                {/* Position in queue */}
                <div className="bg-[#F8F9FB] rounded-2xl px-6 py-4 inline-block">
                  <div className="text-3xl font-black text-[#1B6CA8]">#{entries.length}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' ? 'Your position in queue' : 'موقعك في القائمة'}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-400">
                    {lang === 'en'
                      ? "You're all set! We'll notify you on WhatsApp when new courts or slots open."
                      : 'أنت جاهز! سنخطرك عبر واتساب عند فتح ملاعب أو مواعيد جديدة.'}
                  </p>
                </div>
              </div>
            )}

            {/* Sports chips */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3 text-center">
                {lang === 'en' ? 'Available sports at La3ebeh Arena:' : 'الرياضات المتاحة في لعيبة أرينا:'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {sports.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {s.emoji} {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Waitlist members counter + visual */}
          <div>
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 mb-4">
              <h3
                className="text-lg font-bold text-[#0B1C2C] mb-4"
                style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'DM Sans, sans-serif' }}
              >
                {lang === 'en' ? 'People waiting' : 'الأشخاص المنتظرون'}
              </h3>

              {/* Visual queue */}
              <div className="space-y-2">
                {entries.slice(0, 8).map((entry, idx) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FB] border border-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1B6CA8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0B1C2C] truncate">{entry.name}</div>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(entry.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-GB', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
                {entries.length > 8 && (
                  <div className="text-center py-2 text-sm text-gray-400">
                    +{entries.length - 8} {lang === 'en' ? 'more' : 'آخرين'}
                  </div>
                )}
              </div>

              {entries.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-4">
                  {lang === 'en' ? 'Be the first to join!' : 'كن أول من ينضم!'}
                </p>
              )}
            </div>

            {/* CTA to book */}
            <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1B3A5C] rounded-3xl p-6 text-white text-center">
              <div className="text-3xl mb-2">🏟️</div>
              <h3 className="font-bold text-[#C9A84C] mb-1">
                {lang === 'en' ? 'Courts available now?' : 'ملاعب متاحة الآن؟'}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {lang === 'en' ? 'Check our courts for open time slots.' : 'تحقق من ملاعبنا للمواعيد المتاحة.'}
              </p>
              <a
                href="/"
                className="inline-block bg-[#C9A84C] hover:bg-[#b8962f] text-[#0B1C2C] font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                {t('exploreCourts')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
