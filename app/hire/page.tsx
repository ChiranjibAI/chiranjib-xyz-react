import type { Metadata } from 'next'
import HireForm from '@/components/sections/HireForm'
import { HireHeroHeading } from '@/components/sections/HireHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hire Chiranjib | Start an AI Automation Project',
    description:
      'Submit your project brief to start an AI automation project with Chiranjib. Response within 24 hours. Discovery call is free.',
    openGraph: {
      title: 'Hire Chiranjib | Start an AI Automation Project',
      description:
        'Tell me about your automation problem and get a clear scope, timeline, and price within 24 hours.',
    },
  }
}

const QUICK_FACTS = [
  { label: 'Response time', value: 'Within 24 hours' },
  { label: 'Discovery call', value: 'Free, no obligation' },
  { label: 'Minimum project', value: 'INR 25,000' },
  { label: 'Delivery starts', value: 'Within 1 week of scoping' },
]

const NEXT_STEPS = [
  'I review your brief within 24 hours',
  'I send a proposed scope and price',
  'We do a 30-minute discovery call',
  'Architecture document shared for approval',
  'Development begins after 50% deposit',
]

export default function HirePage() {
  return (
    <main className="bg-bg min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <HireHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            Fill in your project brief below. I will review it and respond within 24 hours
            with a proposed scope, timeline, and fixed price.
          </p>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Left: Form */}
          <div>
            <HireForm />
          </div>

          {/* Right: Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-0 rounded-2xl border border-white/[0.07] bg-surface/50 overflow-hidden">

            {/* Quick facts */}
            <div className="px-7 pt-7 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/50 mb-5">
                Quick Facts
              </p>
              <div className="divide-y divide-white/[0.05]">
                {QUICK_FACTS.map((fact) => (
                  <div key={fact.label} className="flex justify-between items-center py-3.5">
                    <span className="text-[13px] text-muted">{fact.label}</span>
                    <span className="text-[13px] font-semibold text-cyan">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* What happens next */}
            <div className="px-7 py-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/50 mb-5">
                What Happens Next
              </p>
              <ol className="space-y-4">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="w-5 h-5 rounded-full bg-cyan/8 border border-cyan/20 flex items-center justify-center text-[10px] text-cyan font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-muted leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Telegram CTA */}
            <div className="px-7 py-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/50 mb-4">
                Faster Path
              </p>
              <p className="text-[13px] text-muted leading-relaxed mb-4">
                For the fastest response, message me directly on Telegram.
                I usually respond within 2 hours during business hours.
              </p>
              <a
                href="https://t.me/chiranjibai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-cyan hover:text-cyan/70 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.425l-2.968-.924c-.645-.204-.657-.645.136-.953l11.57-4.461c.537-.194 1.006.131.896.134z" />
                </svg>
                Message on Telegram
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
