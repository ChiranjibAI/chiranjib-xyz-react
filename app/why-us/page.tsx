import type { Metadata } from 'next'
import { WHY_US_POINTS } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import WhyUsCards from '@/components/sections/WhyUsCards'
import { WhyUsHeroHeading } from '@/components/sections/WhyUsHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Why Work With Me | Chiranjib vs Traditional Agency',
    description:
      'Compare working with Chiranjib directly versus hiring a traditional AI agency. Real differences in delivery, communication, pricing, and outcomes.',
    openGraph: {
      title: 'Why Work With Me | Chiranjib vs Traditional Agency',
      description:
        'Hands-on delivery, fixed pricing, direct communication, and full code ownership. Here is what that actually means.',
    },
  }
}

const COMPARISON_ROWS = [
  {
    aspect: 'Who delivers the work',
    agency: 'Project manager assigns to junior developers',
    chiranjib: 'I write every line of code personally',
  },
  {
    aspect: 'Communication',
    agency: 'Account manager as intermediary, ticket system',
    chiranjib: 'Direct WhatsApp/Telegram, response within 4 hours',
  },
  {
    aspect: 'Pricing',
    agency: 'Hourly billing, retainer fees, surprise change orders',
    chiranjib: 'Fixed price per project, scope agreed upfront',
  },
  {
    aspect: 'Timeline',
    agency: '8 to 16 week delivery for most projects',
    chiranjib: '2 to 4 weeks for most projects',
  },
  {
    aspect: 'Indian market understanding',
    agency: 'Generic solutions adapted poorly for India',
    chiranjib: 'Built for Indian APIs, languages, and business contexts',
  },
  {
    aspect: 'Code ownership',
    agency: 'Often proprietary platforms with monthly access fees',
    chiranjib: 'You own 100% of the code from day one',
  },
  {
    aspect: 'Post-delivery support',
    agency: 'Separate support contract required',
    chiranjib: '30 to 90 days support included in every project price',
  },
  {
    aspect: 'Accountability',
    agency: 'Diffused — multiple people, no single owner',
    chiranjib: 'One person, fully accountable for the outcome',
  },
]

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <WhyUsHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            There are hundreds of agencies selling AI automation. Here is an honest comparison of what you actually get when you work with me versus a traditional agency.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Side by Side"
          title="Agency vs. Working Directly With Me"
          subtitle="This is not marketing language. These are real structural differences in how work gets done."
        />

        <div className="overflow-x-auto mb-20">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-medium text-muted w-1/3">
                  What You Are Comparing
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-muted w-1/3">
                  Traditional Agency
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-cyan w-1/3">
                  Chiranjib
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, index) => (
                <tr
                  key={row.aspect}
                  className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-surface/20' : ''}`}
                >
                  <td className="py-4 px-4 text-sm font-medium text-text">{row.aspect}</td>
                  <td className="py-4 px-4 text-sm text-muted text-center">{row.agency}</td>
                  <td className="py-4 px-4 text-sm text-cyan text-center font-medium">{row.chiranjib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeader
          eyebrow="The Details"
          title="Six Reasons Clients Choose Me"
        />

        <WhyUsCards points={WHY_US_POINTS} />

        <div className="mt-20 bg-surface border border-white/[0.07] rounded-2xl p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl font-bold tracking-tight text-text mb-4">
            Still evaluating your options?
          </h2>
          <p className="text-[14px] text-muted max-w-xl leading-relaxed mb-7">
            Discovery calls are free. Describe your project, and I will tell you exactly what
            to build, how long it will take, and what it will cost — with no sales pressure.
            If a traditional agency is actually the better choice for your situation, I will tell
            you that too.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/hire" variant="primary" size="lg">
              Book a Free Discovery Call
            </Button>
            <Button href="/case-studies" variant="secondary" size="lg">
              Read the Case Studies
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
