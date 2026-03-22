import type { Metadata } from 'next'
import { CASE_STUDIES_DATA } from '@/lib/content'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import CaseStudiesGrid from '@/components/sections/CaseStudiesGrid'
import CaseStudiesHeroHeading from '@/components/sections/CaseStudiesHeroHeading'
import dynamic from 'next/dynamic'

const MetricsPlayer = dynamic(
  () => import('@/components/remotion/players/MetricsPlayer').then(m => m.MetricsPlayer),
  { ssr: false }
)

const ParticleFlowPlayer = dynamic(
  () => import('@/components/remotion/players/ParticleFlowPlayer').then(m => m.ParticleFlowPlayer),
  { ssr: false }
)

const CaseStudyDocPlayer = dynamic(
  () => import('@/components/remotion/players/CaseStudyDocPlayer').then(m => m.CaseStudyDocPlayer),
  { ssr: false }
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Case Studies | Chiranjib — AI Automation Results',
    description:
      'Real automation outcomes for Indian businesses. See how AI agents, WhatsApp bots, and workflow automation delivered measurable results.',
    openGraph: {
      title: 'Case Studies | Chiranjib — AI Automation Results',
      description:
        'E-commerce, real estate, logistics, and EdTech — real results from real automation projects.',
    },
  }
}

// Aggregate impact numbers shown in the hero right panel
const AGGREGATE_STATS = [
  { value: '50+', label: 'Clients served', sub: 'Since 2022' },
  { value: '₹2Cr+', label: 'Revenue automated', sub: 'Across all verticals' },
  { value: '4.9★', label: 'Average rating', sub: 'Client satisfaction' },
  { value: '100%', label: 'Projects shipped', sub: 'No abandoned work' },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-bg">

      {/* ── Hero — split screen with aggregate impact panel ── */}
      <section className="pt-28 pb-16 px-6" style={{ position: 'relative' }}>
        {/* Particle flow background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.4,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <ParticleFlowPlayer />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 items-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Left: text */}
          <div>
            <CaseStudiesHeroHeading />
            <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[50ch]">
              These are{' '}
              <span className="text-text font-medium">4 featured projects</span> from 50+ client
              engagements. Client names are anonymized — the numbers are not.
            </p>

            {/* Trust note */}
            <div className="mt-7 flex items-start gap-3 px-4 py-3.5 rounded-xl border border-white/[0.07] bg-surface/40 max-w-fit">
              <svg className="w-4 h-4 text-cyan/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p className="text-[12px] text-muted/70 leading-relaxed">
                Numbers independently verifiable from client invoices, CRM exports, and analytics dashboards.
              </p>
            </div>
          </div>

          {/* Right: aggregate impact card */}
          <div className="rounded-2xl border border-white/[0.08] bg-surface/50 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/50">
                Aggregate Impact — All Projects
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.05]">
              {AGGREGATE_STATS.map((stat) => (
                <div key={stat.label} className="px-6 py-5">
                  <p className="text-[22px] font-bold font-mono text-cyan leading-none">{stat.value}</p>
                  <p className="text-[12px] text-text/80 mt-1.5">{stat.label}</p>
                  <p className="text-[10px] text-muted/50 mt-0.5 font-mono">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
              <p className="text-[11px] text-muted/40 font-mono">Featured: 4 of 50+ projects</p>
              <Link
                href="/hire"
                className="text-[11px] text-cyan hover:text-cyan/70 transition-colors font-mono"
              >
                Add yours →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Metrics Animated Reveal ── */}
      <section className="py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-6">Impact Overview</p>
          <MetricsPlayer />
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="font-mono text-[11px] text-muted/50 uppercase tracking-[0.2em] mb-3">Results</p>
          <h2 className="text-2xl font-bold tracking-tight text-text">
            Numbers That Matter
          </h2>
          <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-xl">
            Every project here started with a manual, time-consuming process and ended with a
            measurable business outcome. Filtered by industry below.
          </p>
        </div>

        <CaseStudiesGrid caseStudies={CASE_STUDIES_DATA} />
      </section>

      {/* ── Featured Story — Mini-Documentary ── */}
      <section className="py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-3">
              Featured Story
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-text">
              From 200 Manual Leads to 847 Automated
            </h2>
            <p className="mt-2 text-[14px] text-muted leading-relaxed max-w-xl">
              Watch how a WhatsApp Bot + n8n CRM integration transformed a real estate brand&apos;s
              lead qualification pipeline — in under 15 seconds.
            </p>
          </div>
          <CaseStudyDocPlayer
            clientName="Real Estate Brand"
            industry="Real Estate"
            problem="Manually qualifying 200+ leads/day across WhatsApp and web forms"
            solution="WhatsApp Bot + CRM automation via n8n"
            result="847 leads/month automated, 12hrs saved daily"
            metric={847}
          />
        </div>
      </section>

      {/* ── Strong CTA ending ── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="relative rounded-2xl border border-cyan/20 bg-surface/50 overflow-hidden p-8 md:p-12 shadow-[inset_0_1px_0_rgba(0,229,255,0.07),0_0_80px_-24px_rgba(0,229,255,0.1)]">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.07) 0%, transparent 65%)' }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="font-mono text-[10px] text-cyan/50 uppercase tracking-[0.2em] mb-4">
                Your turn
              </p>
              <h2 className="text-[1.9rem] font-bold tracking-tight text-text leading-tight mb-4">
                Your competitors are already
                <span className="text-cyan"> automating.</span>
                <br />
                Let&apos;s build yours.
              </h2>
              <p className="text-[14px] text-muted leading-[1.75] max-w-[50ch]">
                Discovery call is free. I will review your current process and tell you exactly
                what to automate, how long it takes, and what it costs — before you commit to anything.
              </p>

              {/* Social proof strip */}
              <div className="mt-6 flex flex-wrap gap-5 text-[12px] text-muted">
                <span>
                  <span className="text-text font-mono font-bold">24h</span> response time
                </span>
                <span className="w-px h-4 bg-white/10 self-center" aria-hidden="true" />
                <span>
                  <span className="text-text font-mono font-bold">Fixed</span> price — no surprises
                </span>
                <span className="w-px h-4 bg-white/10 self-center" aria-hidden="true" />
                <span>
                  <span className="text-text font-mono font-bold">100%</span> code ownership
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:min-w-[200px]">
              <Button href="/hire" variant="primary" size="lg" className="whitespace-nowrap justify-center">
                Start a Project
              </Button>
              <a
                href="https://t.me/chiranjibai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-5 py-3 rounded-xl border border-white/10 text-sm text-muted hover:text-text hover:border-white/20 transition-all duration-200"
              >
                Message on Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
