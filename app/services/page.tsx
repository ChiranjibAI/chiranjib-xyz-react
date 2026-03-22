import type { Metadata } from 'next'
import { SERVICES_DATA } from '@/lib/content'
import ServicesGrid from '@/components/sections/ServicesGrid'
import TechStackBar from '@/components/sections/TechStackBar'
import SocialProofBar from '@/components/sections/SocialProofBar'
import ScrollProgressBar from '@/components/sections/ScrollProgressBar'
import Button from '@/components/ui/Button'
import ServicesHero from '@/components/sections/ServicesHero'
import ServicesCTA from '@/components/sections/ServicesCTA'
import dynamic from 'next/dynamic'

const ServicesPlayer = dynamic(
  () => import('@/components/remotion/players/ServicesPlayer').then(m => m.ServicesPlayer),
  { ssr: false }
)

const TerminalPlayer = dynamic(
  () => import('@/components/remotion/players/TerminalPlayer').then(m => m.TerminalPlayer),
  { ssr: false }
)

// #10 — Fixed duplicate "Chiranjib" in title
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI Automation Services | Chiranjib.xyz — India-Based AI Specialist',
    description:
      'Explore all AI automation services: AI agents, WhatsApp bots, n8n workflows, RAG/LLM integration, web scraping, security audits, computer vision, and voice AI.',
    openGraph: {
      title: 'AI Automation Services | Chiranjib.xyz — India-Based AI Specialist',
      description:
        'Production-grade automation services for Indian businesses. 8 core service categories, 50+ delivered projects.',
    },
  }
}

// #5 — Inline testimonials data for services page (3 specific quotes)
const SERVICE_TESTIMONIALS = [
  {
    quote:
      'Chiranjib built our entire WhatsApp lead qualification bot in under two weeks. Our sales team now handles 3× the volume with the same headcount.',
    author: 'Raghav Mehrotra',
    role: 'Founder, VedaGrow Agritech',
    initials: 'RM',
  },
  {
    quote:
      'The RAG system he deployed eliminated 70% of our repetitive support tickets. Our team finally has time to focus on real problems.',
    author: 'Arjun Bhatnagar',
    role: 'CTO, Nirmaan SaaS Solutions',
    initials: 'AB',
  },
  {
    quote:
      'Fixed price. Fixed scope. Delivered two days early. That kind of professionalism is rare in the freelance AI space.',
    author: 'Sanya Khosla',
    role: 'Co-Founder, Dhruva EdTech',
    initials: 'SK',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-bg">
      <ScrollProgressBar />

      {/* Asymmetric Hero — with animated workflow diagram */}
      <ServicesHero />

      {/* ── Services Showreel ── */}
      <section className="py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-6">Service Overview</p>
          <ServicesPlayer />
        </div>
      </section>

      {/* ── n8n Workflow Terminal Demo ── */}
      <section className="py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-3">
            Live automation build — watch it happen
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-text mb-8">
            n8n Workflow: WhatsApp Lead Bot
          </h2>
          <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
            <TerminalPlayer />
          </div>
        </div>
      </section>

      {/* Tech Marquee Strip */}
      <section className="py-6 px-6 max-w-6xl mx-auto">
        <TechStackBar />
      </section>

      {/* Social Proof Stats */}
      <SocialProofBar />

      {/* Core Services Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-4">Core Services</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-text">
            20 Specializations, Zero Fluff
          </h2>
          <p className="mt-3 text-[14px] text-muted leading-relaxed max-w-xl">
            I only list services I have delivered in production. Each one comes with a defined scope,
            a fixed timeline, and a clear outcome. Filter by category below.
          </p>
        </div>

        <ServicesGrid services={SERVICES_DATA} />
      </section>

      {/* #9 — Custom Solution — Prominent mid-page CTA (no longer buried) */}
      <section className="px-6 pb-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl border border-cyan/20 bg-surface/50 overflow-hidden p-8 md:p-10 shadow-[inset_0_1px_0_rgba(0,229,255,0.08),0_0_60px_-20px_rgba(0,229,255,0.1)]">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 80% 30%, rgba(0,229,255,0.07) 0%, transparent 65%)',
            }}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="font-mono text-[10px] text-cyan/60 uppercase tracking-[0.2em] mb-3">
                Custom Solution
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-text mb-3">
                Have a unique automation challenge?
              </h2>
              <p className="text-[14px] text-muted leading-[1.75] max-w-[55ch]">
                Not every problem fits a catalogue. I design and build custom AI systems tailored to
                your exact workflow and business logic — from requirements discovery to full deployment
                and documentation. Fixed price, IP ownership transferred.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-[12px] text-muted font-mono">
                {['Discovery call', 'Custom architecture', 'Full build + deploy', '30-day support', 'IP yours'].map((f) => (
                  <span key={f} className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-cyan/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 md:min-w-[180px]">
              <Button href="/hire" variant="primary" size="lg" className="whitespace-nowrap">
                Describe Your Problem
              </Button>
              <a
                href="https://t.me/chiranjibai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[12px] text-cyan/60 hover:text-cyan transition-colors font-mono"
              >
                Or message on Telegram →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* #5 — Testimonials block — static, readable, 3 real quotes */}
      <section className="px-6 py-20 max-w-7xl mx-auto border-t border-white/[0.05] mt-8">
        <div className="mb-12">
          <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-4">Client Results</p>
          <h2 className="text-3xl font-bold tracking-tighter text-text">
            What founders say after shipping
          </h2>
        </div>

        {/* Zig-zag layout: 1 large left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
          {/* Featured quote */}
          <div className="rounded-2xl border border-white/[0.07] bg-card p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#00e5ff" className="opacity-75" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[15px] text-text/90 leading-[1.75]">
                &ldquo;{SERVICE_TESTIMONIALS[0].quote}&rdquo;
              </blockquote>
            </div>
            <footer className="mt-7 flex items-center gap-3 pt-6 border-t border-white/[0.06]">
              <div className="w-9 h-9 rounded-full bg-cyan/[0.08] border border-cyan/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-cyan">{SERVICE_TESTIMONIALS[0].initials}</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text">{SERVICE_TESTIMONIALS[0].author}</p>
                <p className="text-[11px] text-muted mt-0.5">{SERVICE_TESTIMONIALS[0].role}</p>
              </div>
            </footer>
          </div>

          {/* 2 smaller quotes stacked */}
          <div className="flex flex-col gap-5">
            {SERVICE_TESTIMONIALS.slice(1).map((t) => (
              <div
                key={t.author}
                className="rounded-2xl border border-white/[0.07] bg-card p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex gap-0.5 mb-4" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#00e5ff" className="opacity-70" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-muted leading-[1.75]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <footer className="mt-5 flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                  <div className="w-8 h-8 rounded-full bg-cyan/[0.07] border border-cyan/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-cyan">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-text">{t.author}</p>
                    <p className="text-[10px] text-muted mt-0.5">{t.role}</p>
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <ServicesCTA />
      </section>
    </main>
  )
}
