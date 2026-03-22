import type { Metadata } from 'next'
import Link from 'next/link'
import AboutTimeline from '@/components/sections/AboutTimeline'
import AvatarOrb from '@/components/ui/AvatarOrb'
import AboutHeroHeading from '@/components/sections/AboutHeroHeading'
import dynamic from 'next/dynamic'

const AboutTimelinePlayer = dynamic(
  () => import('@/components/remotion/players/AboutTimelinePlayer').then(m => m.AboutTimelinePlayer),
  { ssr: false }
)

const GlobePlayer = dynamic(
  () => import('@/components/remotion/players/GlobePlayer').then(m => m.GlobePlayer),
  { ssr: false }
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Chiranjib | AI Automation Specialist',
    description:
      'Chiranjib — India-based AI automation specialist, ethical hacker, and AGI researcher. 5 years of experience, 50+ clients, founder of SekkhoAI.',
    openGraph: {
      title: 'About Chiranjib | AI Automation Specialist',
      description:
        "The story, philosophy, and contact information of India's hands-on AI automation specialist.",
    },
  }
}

const PHILOSOPHY = [
  {
    principle: 'Build to Ship, Not to Impress',
    description:
      'Good engineering is invisible. The best automation system is the one that works silently in the background, handles failures gracefully, and requires no manual babysitting. I measure success by uptime and outcome — not by how clever the code is.',
  },
  {
    principle: 'Indian Context Is Not an Afterthought',
    description:
      'Most AI tools are built for US and European markets. GST APIs, UPI payment flows, regional languages, WhatsApp-first communication, and the specific realities of Indian SMBs require a practitioner who understands them from the inside.',
  },
  {
    principle: 'Transparency Over Mystique',
    description:
      'AI is often sold as magic. It is not — it is engineering with probabilities and APIs. I explain exactly what I am building, why it works, and where its limits are. Clients who understand their systems make better decisions.',
  },
]

const CONTACT_LINKS = [
  {
    label: 'Telegram',
    value: '@chiranjibai',
    href: 'https://t.me/chiranjibai',
    description: 'Fastest response — usually within 2 hours',
  },
  {
    label: 'Email',
    value: 'chiranjibai@gmail.com',
    href: 'mailto:chiranjibai@gmail.com',
    description: 'For formal project inquiries and RFPs',
  },
  {
    label: 'Twitter / X',
    value: '@chiranjibAI',
    href: 'https://x.com/Chiranjibai',
    description: 'AI automation insights and project updates',
  },
]

const INFO_ROWS = [
  { label: 'Location', value: 'Kolkata, West Bengal, India' },
  { label: 'Experience', value: '5+ years · 50+ clients' },
  { label: 'Speciality', value: 'AI Agents · WhatsApp Bots · n8n' },
  { label: 'Languages', value: 'Bengali · Hindi · English' },
  { label: 'Status', value: 'Available for projects', accent: true },
]

export default function AboutPage() {
  return (
    <main className="bg-bg min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 items-center">

            {/* Left: Text */}
            <div>
              <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-7">
                The Person Behind the Work
              </p>
              <AboutHeroHeading />
              <p className="mt-8 text-[15px] text-muted leading-[1.75] max-w-[50ch]">
                AI automation specialist, ethical hacker, and AGI researcher based in India.
                I build systems that work — not demos that impress.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/hire"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-cyan text-bg hover:bg-cyan/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_20px_-4px_rgba(0,229,255,0.3)]"
                >
                  Start a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href="https://t.me/chiranjibai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-cyan/30 text-cyan hover:bg-cyan/[0.06] hover:border-cyan/50 active:scale-[0.97] transition-all duration-200"
                >
                  Telegram
                </a>
              </div>
            </div>

            {/* Right: Info card */}
            <div className="rounded-2xl border border-white/[0.08] bg-surface/60 overflow-hidden">
              {INFO_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-start gap-5 px-7 py-[18px] ${i > 0 ? 'border-t border-white/[0.05]' : ''}`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted/50 pt-0.5 w-[88px] shrink-0">
                    {row.label}
                  </span>
                  <span className={`text-[13px] leading-snug ${row.accent ? 'text-cyan' : 'text-text'}`}>
                    {row.accent && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green mr-2 mb-[1px] animate-availability" />
                    )}
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 items-start">

          {/* Left: Avatar Orb */}
          <div className="flex flex-col items-center gap-5">
            <AvatarOrb
              src="https://picsum.photos/seed/chiranjib-avatar/400/400"
              alt="Chiranjib — AI Automation Specialist, Kolkata"
              size={260}
            />

            {/* Name + location strip below orb */}
            <div className="text-center">
              <p className="text-[13px] font-semibold text-text tracking-tight">Chiranjib</p>
              <p className="text-[11px] text-muted/50 font-mono mt-0.5">Kolkata, West Bengal · India</p>
            </div>

            {/* Mini status badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green/20 bg-green/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-availability" aria-hidden="true" />
              <span className="text-[11px] text-green/80 font-mono">Available for projects</span>
            </div>
          </div>

          {/* Right: Bio */}
          <div className="pt-2">
            <p className="font-mono text-[11px] text-muted/60 uppercase tracking-[0.2em] mb-5">
              Background
            </p>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-text leading-tight mb-8">
              From Curious Coder<br />to AI Systems Builder
            </h2>
            <div className="space-y-5 text-[14px] text-muted leading-[1.85]">
              <p>
                I started programming in 2020 during the pandemic — not from a computer science
                background, but out of necessity and curiosity. Within a year I had built my first
                AI project: a simple chatbot that could answer questions about a local business.
                It worked badly, but it worked.
              </p>
              <p>
                By 2022, I had moved from experimenting to delivering — launching chiranjib.xyz as
                a portal for AI automation work and picking up my first paying clients. The problems
                were real: businesses drowning in manual work, teams spending 40 hours a week on
                tasks that could be automated, leads going cold because no one could follow up fast
                enough.
              </p>
              <p>
                By 2024, I had served 50+ clients across e-commerce, real estate, logistics, EdTech,
                and manufacturing — always as the person who actually builds the system, not the one
                who advises. Alongside client work, I began AGI research: studying goal-directed
                agent architectures and multi-agent reasoning.
              </p>
              <p>
                In 2025, I launched SekkhoAI — an AI-powered learning platform for Bengali and
                Indian regional language students, built on the belief that world-class AI education
                should be accessible to Tier 2 and Tier 3 city learners in their own language.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Global Reach ── */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="font-mono text-[11px] text-muted/60 uppercase tracking-[0.2em] mb-3">
              Global Reach
            </p>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-text leading-tight">
              Clients Across the World
            </h2>
            <p className="mt-3 text-[13px] text-muted leading-relaxed max-w-[50ch]">
              From Kolkata to New York, Dubai to Sydney — AI automation delivered globally.
            </p>
          </div>

          <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-white/[0.08]">
            <GlobePlayer />
          </div>

          <p className="mt-4 text-center font-mono text-[11px] text-cyan/60 uppercase tracking-[0.18em]">
            50+ clients across 12 countries
          </p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[11px] text-muted/60 uppercase tracking-[0.2em] mb-3">
                Timeline
              </p>
              <h2 className="text-[1.75rem] font-bold tracking-tight text-text leading-tight">
                The Journey
              </h2>
              <p className="mt-4 text-[13px] text-muted leading-relaxed">
                Key milestones from learning to code to building AI systems that run in production.
              </p>
            </div>
            <div className="space-y-10">
              <AboutTimeline />
              <AboutTimelinePlayer />
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[11px] text-muted/60 uppercase tracking-[0.2em] mb-3">
              Philosophy
            </p>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-text leading-tight">
              How I Think About This Work
            </h2>
          </div>

          <div className="space-y-12">
            {PHILOSOPHY.map((item, i) => (
              <div key={item.principle} className="border-l-2 border-cyan/25 pl-8">
                <span className="text-[10px] font-mono text-cyan/50 uppercase tracking-[0.2em]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-[15px] font-semibold text-text">{item.principle}</h3>
                <p className="mt-3 text-[13px] text-muted leading-[1.85]">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[11px] text-muted/60 uppercase tracking-[0.2em] mb-3">
              Contact
            </p>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-text leading-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-[13px] text-muted leading-relaxed">
              I respond to all messages personally. No assistants, no ticketing systems.
            </p>
          </div>

          <div>
            <div className="divide-y divide-white/[0.05]">
              {CONTACT_LINKS.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-6 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors duration-200"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/50">
                      {contact.label}
                    </span>
                    <p className="mt-1.5 text-[15px] font-semibold text-cyan">{contact.value}</p>
                    <p className="mt-1 text-[12px] text-muted/60">{contact.description}</p>
                  </div>
                  <svg
                    className="text-muted/30 group-hover:text-cyan/50 group-hover:translate-x-0.5 transition-all duration-200"
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                  >
                    <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-white/[0.05]">
              <p className="text-[13px] text-muted mb-5">
                Ready to automate? Let&apos;s scope it out.
              </p>
              <Link
                href="/hire"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-cyan text-bg hover:bg-cyan/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_24px_-4px_rgba(0,229,255,0.35)]"
              >
                Hire Me
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
