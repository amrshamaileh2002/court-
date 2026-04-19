'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SportsTicker from '@/components/SportsTicker'
import ProblemSection from '@/components/ProblemSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import FeaturesGrid from '@/components/FeaturesGrid'
import SportsGrid from '@/components/SportsGrid'
import LoyaltySection from '@/components/LoyaltySection'
import PricingSection from '@/components/PricingSection'
import WaitlistCTA from '@/components/WaitlistCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <SportsTicker />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesGrid />
      <SportsGrid />
      <LoyaltySection />
      <PricingSection />
      <WaitlistCTA />
      <Footer />
    </div>
  )
}
