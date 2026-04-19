import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: 'La3ebeh Arena | لعيبة أرينا',
  description: "Jordan's premier sports court booking platform — Book padel, football, basketball, tennis, swimming & badminton courts.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Tajawal:wght@300;400;500;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Preloader />
          <Cursor />
          <ScrollProgress />
          <div id="scroll-progress" />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
