import type { Metadata } from 'next'
import { PORTFOLIO_ITEMS } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import { PortfolioHeroHeading } from '@/components/sections/PortfolioHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Portfolio | Chiranjib — AI Projects',
    description:
      'Selected AI automation and development projects: BharatMonitor, AGI Prototype, WhatsApp HR Bot, SekkhoAI, and more.',
    openGraph: {
      title: 'Portfolio | Chiranjib — AI Projects',
      description:
        'Production AI systems, research prototypes, and automation platforms built by Chiranjib.',
    },
  }
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <PortfolioHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            Six projects across AI research, business automation, security tooling, and education technology. Some are live, some are private, one is ongoing research.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Projects"
          title="What I Have Built"
          subtitle="Production systems and research prototypes. Every project here was built to solve a real problem."
        />

        <PortfolioGrid items={PORTFOLIO_ITEMS} />

        <div className="mt-20 pt-12 border-t border-white/[0.05]">
          <p className="text-[13px] text-muted mb-6">
            Want to see more or discuss a custom build?
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/case-studies" variant="primary" size="lg">
              Read Case Studies
            </Button>
            <Button href="/hire" variant="secondary" size="lg">
              Build Something Together
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
