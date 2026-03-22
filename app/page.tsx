import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { AutomationCalculator } from '@/components/sections/AutomationCalculator'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import dynamic from 'next/dynamic'

const HeroIntroPlayer = dynamic(
  () => import('@/components/remotion/players/HeroIntroPlayer').then(m => m.HeroIntroPlayer),
  { ssr: false }
)

export const metadata = {
  title: 'Chiranjib — AGI Developer & AI Automation Specialist',
  description:
    "India's leading AI automation specialist. WhatsApp bots, n8n workflows, RAG systems, and custom AI agents for founders who want results.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />

      {/* ── Animated Showreel ── */}
      <section className="py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-6">Live Preview</p>
          <HeroIntroPlayer />
        </div>
      </section>

      <ServicesOverview />
      <TestimonialsSection />

      {/* ── Automation ROI Calculator ── */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-4">
              Free ROI Estimator
            </p>
            <AnimatedLetters
              text="Calculate Your Automation ROI"
              tag="h2"
              className="text-3xl md:text-4xl font-bold tracking-tight text-text justify-center"
              letterDelay={0.03}
            />
            <p className="mt-4 text-[14px] text-muted leading-relaxed max-w-xl mx-auto">
              Enter your industry, wasted hours, and team size — get a personalized automation
              analysis with concrete ROI numbers in seconds.
            </p>
          </div>
          <AutomationCalculator />
        </div>
      </section>

      <CTASection />
    </>
  )
}
