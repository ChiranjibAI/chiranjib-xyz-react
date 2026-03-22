import type { Metadata } from 'next'
import { PRICING_TIERS } from '@/lib/content'
import PricingCards from '@/components/sections/PricingCards'
import { PricingHeroHeading } from '@/components/sections/PricingHeroHeading'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Check } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pricing | Chiranjib — AI Automation',
    description:
      'Transparent, fixed pricing for AI automation projects. Starter from 25,000 INR. Growth at 75,000 INR. Enterprise from 2,00,000 INR. No hourly surprises.',
    openGraph: {
      title: 'Pricing | Chiranjib — AI Automation',
      description:
        'Fixed-price automation projects. Clear scope, defined outcomes, no billing surprises.',
    },
  }
}

const FEATURE_COMPARISON = [
  { feature: 'Automations included', starter: '1', growth: 'Up to 3', enterprise: 'Unlimited' },
  { feature: 'AI / LLM integration', starter: 'Basic', growth: 'Full RAG + Agent', enterprise: 'Custom fine-tuning' },
  { feature: 'Integrations', starter: 'Up to 3', growth: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Delivery timeline', starter: '2 weeks', growth: '4 weeks', enterprise: 'Custom' },
  { feature: 'Post-launch support', starter: '30 days', growth: '60 days', enterprise: '90 days' },
  { feature: 'Response time', starter: 'Same day', growth: 'Within 4 hours', enterprise: 'Dedicated SLA' },
  { feature: 'Infrastructure setup', starter: 'Basic', growth: 'Included', enterprise: 'Dedicated servers' },
  { feature: 'Security audit', starter: null, growth: null, enterprise: true },
  { feature: 'Source code ownership', starter: true, growth: true, enterprise: true },
  { feature: 'Documentation', starter: true, growth: true, enterprise: 'Full technical docs' },
  { feature: 'Weekly sync calls', starter: null, growth: 'Optional', enterprise: true },
] as const

const ENTERPRISE_FEATURES = [
  'Custom AGI pipeline architecture',
  'Multi-tenant SaaS automation platforms',
  'Government or enterprise compliance requirements',
  'Ongoing engineering retainer',
  'Training and internal capability building',
]

export default function PricingPage() {
  return (
    <main className="min-h-[100dvh] bg-bg">
      {/* Hero — left-aligned, no PageHero */}
      <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <PricingHeroHeading />
          <p className="mt-6 text-base text-muted leading-relaxed max-w-xl">
            Every project is scoped before any code is written. You know exactly what you get and when.
          </p>
          <p className="mt-3 text-xs text-muted/60 font-mono">
            All prices exclude GST &middot; 50% upfront, 50% on delivery
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <PricingCards tiers={PRICING_TIERS} />
      </section>

      {/* Feature Comparison */}
      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Feature Comparison</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-text">
            What each tier includes
          </h2>
        </div>

        <div className="bg-surface/50 rounded-2xl overflow-hidden border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface border-b border-white/[0.06]">
                  <th className="text-left py-4 px-5 text-xs font-medium text-muted w-1/2">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-text/80 w-[16.67%]">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-cyan w-[16.67%]">
                    Growth
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-text/80 w-[16.67%]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/[0.04] last:border-0 ${
                      index % 2 === 0 ? 'bg-white/[0.015]' : ''
                    }`}
                  >
                    <td className="py-3.5 px-5 text-sm text-muted">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      {row.starter === true ? (
                        <Check className="w-3.5 h-3.5 text-cyan mx-auto" />
                      ) : row.starter === null ? (
                        <span className="text-muted/40 text-sm">&mdash;</span>
                      ) : (
                        <span className="text-xs text-text/70">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.growth === true ? (
                        <Check className="w-3.5 h-3.5 text-cyan mx-auto" />
                      ) : row.growth === null ? (
                        <span className="text-muted/40 text-sm">&mdash;</span>
                      ) : (
                        <span className="text-xs text-cyan font-medium">{row.growth}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.enterprise === true ? (
                        <Check className="w-3.5 h-3.5 text-cyan mx-auto" />
                      ) : row.enterprise === null ? (
                        <span className="text-muted/40 text-sm">&mdash;</span>
                      ) : (
                        <span className="text-xs text-text/70">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Enterprise CTA — glass panel */}
      <section className="pb-24 px-4 max-w-7xl mx-auto">
        <div className="bg-surface/60 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <Badge color="purple">Enterprise Custom</Badge>
              <h2 className="mt-5 text-2xl md:text-3xl font-bold tracking-tighter text-text">
                Building something larger?
              </h2>
              <p className="mt-4 text-sm text-muted leading-relaxed">
                If your project requires a full AI infrastructure build, multiple teams, compliance
                requirements, or a long-term engineering partnership — let us scope it properly.
                Enterprise projects start at 2,00,000 INR and the actual quote depends on your
                specific requirements.
              </p>
              <ul className="mt-6 space-y-3">
                {ENTERPRISE_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="w-3.5 h-3.5 text-cyan flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:pt-8">
              <Button href="/hire" variant="primary" size="lg" className="w-full justify-center">
                Get a Quote
              </Button>
              <Button href="/chat" variant="secondary" size="lg" className="w-full justify-center">
                Chat with AI First
              </Button>
              <p className="text-xs text-muted/60 text-center">
                Discovery call is free. No commitment required to get a quote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
