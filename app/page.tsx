'use client'
import Navbar from '@/components/Navbar'
import KortnaHero from '@/components/KortnaHero'
import KortnaFeatures from '@/components/KortnaFeatures'
import KortnaHowItWorks from '@/components/KortnaHowItWorks'
import KortnaStats from '@/components/KortnaStats'
import KortnaForVenues from '@/components/KortnaForVenues'
import KortnaTestimonials from '@/components/KortnaTestimonials'
import KortnaFAQ from '@/components/KortnaFAQ'
import KortnaFinalCTA from '@/components/KortnaFinalCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <KortnaHero />
      <KortnaFeatures />
      <KortnaHowItWorks />
      <KortnaStats />
      <KortnaForVenues />
      <KortnaTestimonials />
      <KortnaFAQ />
      <KortnaFinalCTA />
      <Footer />
    </div>
  )
}
