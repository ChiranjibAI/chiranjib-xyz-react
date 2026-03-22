import type { Metadata } from 'next'
import { EXPERTISE_SKILLS } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import SkillMatrix from '@/components/sections/SkillMatrix'
import { ExpertiseHeroHeading } from '@/components/sections/ExpertiseHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Expertise and Skills | Chiranjib',
    description:
      'Technical expertise in AI/ML, automation, development, and security. Skill proficiency across 30+ tools and technologies.',
    openGraph: {
      title: 'Expertise and Skills | Chiranjib',
      description:
        'Deep technical skills in LLMs, n8n, Python, web scraping, and ethical hacking.',
    },
  }
}

const CERTIFICATIONS = [
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: 2023 },
  { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', year: 2022 },
  { name: 'Google AI Fundamentals', issuer: 'Google', year: 2023 },
  { name: 'n8n Certified Automation Expert', issuer: 'n8n.io', year: 2024 },
]

const STATS = [
  { label: 'Years of experience', value: '5+' },
  { label: 'Projects delivered', value: '50+' },
  { label: 'Technologies used', value: '30+' },
  { label: 'AI models integrated', value: '12+' },
]

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ExpertiseHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            5 years of hands-on experience across AI engineering, workflow automation, full-stack development, and ethical hacking. Production-tested skills, not resume padding.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5 text-center"
            >
              <p className="text-3xl font-bold text-cyan mb-1">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <SectionHeader
          eyebrow="Skill Matrix"
          title="Proficiency by Category"
          subtitle="Each level represents real project experience. No self-assessed 10/10s — these are honest assessments based on delivered work."
        />

        <SkillMatrix skills={EXPERTISE_SKILLS} />

        <div className="mt-20">
          <SectionHeader
            eyebrow="Credentials"
            title="Certifications"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan/8 border border-cyan/15 flex items-center justify-center mb-3">
                  <svg
                    className="w-4 h-4 text-cyan"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-text mb-1">{cert.name}</p>
                <p className="text-xs text-muted">{cert.issuer}</p>
                <p className="text-xs text-muted mt-1">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.05]">
          <Button href="/hire" variant="primary" size="lg">
            Work With Me
          </Button>
        </div>
      </section>
    </main>
  )
}
