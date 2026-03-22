import type { Metadata } from 'next'
import { PROCESS_STEPS } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import { ProcessHeroHeading } from '@/components/sections/ProcessHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'How I Work | Chiranjib — Project Process',
    description:
      'The 5-step process for every AI automation project: Discovery, Architecture, Development, Testing, and Launch. What you do, what I do, and how long each step takes.',
    openGraph: {
      title: 'How I Work | Chiranjib — Project Process',
      description:
        'No surprises, no black boxes. A transparent 5-step process for delivering automation projects on time.',
    },
  }
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ProcessHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            Every project follows the same 5 steps. No surprises, no scope creep, no black boxes. You know exactly where we are at every stage.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="5 Steps"
          title="From Idea to Production"
          subtitle="Most automation projects are delivered in 2 to 4 weeks. Complex enterprise builds take 6 to 12 weeks. The process is the same either way."
        />

        <ProcessTimeline steps={PROCESS_STEPS} />

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-lg font-bold text-text mb-4">Your Responsibilities</h3>
            <ul className="space-y-3">
              {[
                'Show up to the discovery call prepared with your current process documented',
                'Respond to questions within 24 hours to keep momentum',
                'Test partial builds when I share them',
                'Have your team available for user acceptance testing in week 3+',
                'Provide access to necessary APIs, tools, and accounts before development starts',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <svg
                    className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-lg font-bold text-text mb-4">My Guarantees</h3>
            <ul className="space-y-3">
              {[
                'Architecture document shared before any code is written',
                'Progress updates every 2 to 3 days during development',
                'No scope changes without your written approval',
                'Full source code and documentation on delivery',
                '30 to 90 days post-launch support included in every tier',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <svg
                    className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.05]">
          <p className="text-[13px] text-muted mb-5">
            Ready to start the process? The discovery call is free.
          </p>
          <Button href="/hire" variant="primary" size="lg">
            Schedule Discovery Call
          </Button>
        </div>
      </section>
    </main>
  )
}
