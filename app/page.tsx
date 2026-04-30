'use client'
import Navbar from '@/components/Navbar'
import KortnaHeroNew from '@/components/KortnaHeroNew'
import KortnaTicker from '@/components/KortnaTicker'
import KortnaBookSplit from '@/components/KortnaBookSplit'
import KortnaMatchSplit from '@/components/KortnaMatchSplit'
import KortnaFeaturedCourts from '@/components/KortnaFeaturedCourts'
import KortnaEventsSection from '@/components/KortnaEventsSection'
import KortnaFlashDeals from '@/components/KortnaFlashDeals'
import KortnaSportsScroll from '@/components/KortnaSportsScroll'
import KortnaTestimonials from '@/components/KortnaTestimonials'
import KortnaLoyalty from '@/components/KortnaLoyalty'
import WaitlistCTA from '@/components/WaitlistCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <KortnaHeroNew />
      <KortnaTicker />
      <KortnaBookSplit />
      <KortnaMatchSplit />
      <KortnaFeaturedCourts />
      <KortnaEventsSection />
      <KortnaFlashDeals />
      <KortnaSportsScroll />
      <KortnaTestimonials />
      <KortnaLoyalty />
      <WaitlistCTA />
      <Footer />
    </div>
  )
}
