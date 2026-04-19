import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: 'Kortna | كورتنا — Your Game, Our Court',
  description: "Jordan's first smart sports court booking platform. Find, book, and play padel, football, basketball, tennis, and more — all in one place.",
  keywords: 'sports court booking, padel Jordan, football court Amman, basketball court, kortna, كورتنا',
  openGraph: {
    title: 'Kortna — Your Game, Our Court',
    description: "Jordan's first smart sports court booking platform.",
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&family=Cairo:wght@300;400;600;700;800;900&display=swap"
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
