'use client'

import { useReveal } from '@/hooks/useReveal'
import Navigation from '@/components/landing/Navigation'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import CurriculumBento from '@/components/landing/CurriculumBento'
import SongLibrary from '@/components/landing/SongLibrary'
import FeatureSplits from '@/components/landing/FeatureSplits'
import Leaderboard from '@/components/landing/Leaderboard'
import Pricing from '@/components/landing/Pricing'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  useReveal()

  return (
    <main className="flex flex-col min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navigation />
      <Hero />
      <HowItWorks />
      <CurriculumBento />
      <SongLibrary />
      <FeatureSplits />
      <Leaderboard />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  )
}
