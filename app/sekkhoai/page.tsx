import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import SekkhoAIFeatures from '@/components/sections/SekkhoAIFeatures'
import { SekkhoAIHeroHeading } from '@/components/sections/SekkhoAIHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'SekkhoAI | AI-Powered Learning for Indian Students',
    description:
      'SekkhoAI is an AI-powered education platform built for Bengali and Indian regional language students. Affordable AI tutoring, adaptive quizzes, and doubt resolution in your own language.',
    openGraph: {
      title: 'SekkhoAI | AI-Powered Learning for Indian Students',
      description:
        'World-class AI education accessible to Tier 2 and Tier 3 city learners in Bengali and Hindi.',
    },
  }
}

const FEATURES = [
  {
    title: 'AI Tutoring in Bengali and Hindi',
    description:
      'Ask questions and get detailed explanations in Bengali or Hindi — not just translated English. The AI tutor understands regional language nuance and cultural context.',
    icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  },
  {
    title: 'Adaptive Quiz Engine',
    description:
      'Quizzes that adjust difficulty based on your performance. The system identifies weak topics and focuses practice where it matters most — reducing wasted study time.',
    icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z',
  },
  {
    title: 'Affordable for Tier 2 and Tier 3 Cities',
    description:
      'Priced for Indian students — not US SaaS pricing transplanted to India. Plans starting under 200 INR per month with access to full AI tutoring capabilities.',
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Doubt Resolution 24/7',
    description:
      'Students can ask any question at any time and receive a detailed explanation within seconds — not waiting days for a teacher to respond or paying for expensive tutoring sessions.',
    icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z',
  },
  {
    title: 'Progress Dashboard for Parents',
    description:
      'Parents can track study hours, quiz scores, topic mastery, and AI tutor usage — giving visibility into learning without being physically present.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  },
  {
    title: 'Curriculum Aligned to Indian Boards',
    description:
      'Content aligned to CBSE, WBBSE (West Bengal Board), and state board curricula. Not generic global content — lessons built for the actual syllabus Indian students are studying.',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
]

const STATS = [
  { value: '79%', label: 'Average course completion rate' },
  { value: '24/7', label: 'AI tutor availability' },
  { value: '3 languages', label: 'Bengali, Hindi, English' },
  { value: '200 INR', label: 'Starting monthly price' },
]

export default function SekkhoAIPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <SekkhoAIHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            An AI-powered education platform for Bengali and Indian regional language students. World-class AI tutoring — affordable, in your language, aligned to your syllabus.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <Badge color="purple">What Is SekkhoAI</Badge>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-text mb-5">
              AI Education Without the Privilege Tax
            </h2>
            <div className="space-y-4 text-sm text-muted leading-relaxed">
              <p>
                Most AI tutoring tools cost 2,000 to 5,000 INR per month and are designed for
                English-speaking students with a stable internet connection and a laptop. That
                describes a fraction of India&apos;s student population.
              </p>
              <p>
                SekkhoAI was built for the other India — for students in Howrah, Burdwan, Siliguri,
                Patna, and Ranchi who study in Bengali or Hindi, use mobile data, and need real
                academic support they can afford.
              </p>
              <p>
                The platform uses the same underlying AI technology as premium global tools — but
                adapted for Indian curricula, Indian languages, and Indian price points.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-5 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-cyan mb-1">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <SectionHeader
          eyebrow="Platform Features"
          title="What SekkhoAI Offers"
          subtitle="Every feature is designed around the actual needs of Indian students — not translated from a Western education product."
        />

        <SekkhoAIFeatures features={FEATURES} />

        <div className="mt-20 bg-surface border border-white/[0.07] rounded-2xl p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <Badge color="cyan">Beta Access</Badge>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-text mb-4">
            Join SekkhoAI
          </h2>
          <p className="text-[14px] text-muted max-w-xl leading-relaxed mb-7">
            SekkhoAI is currently in beta. Early access is available at a reduced price.
            If you are a student, parent, or school looking to adopt AI tutoring for Indian
            curricula, get in touch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="https://sekkhoai.com" variant="primary" size="lg" external>
              Visit SekkhoAI
            </Button>
            <Button href="/hire" variant="secondary" size="lg">
              Deploy for Your School
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
