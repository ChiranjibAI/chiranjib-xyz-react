import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SolutionsGrid from '@/components/sections/SolutionsGrid'
import { SolutionsHeroHeading } from '@/components/sections/SolutionsHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Automation Solutions by Outcome | Chiranjib',
    description:
      'Find the right automation for your business goal. Browse by outcome: customer support, lead generation, HR, e-commerce, security, and more.',
    openGraph: {
      title: 'Automation Solutions by Outcome | Chiranjib',
      description:
        'I want to automate X — find exactly what you need and how I can build it for you.',
    },
  }
}

const SOLUTIONS = [
  {
    id: 'customer-support',
    problem: 'I want to automate customer support',
    solution: 'WhatsApp AI Support Bot',
    description:
      'An AI-powered bot on WhatsApp that handles order tracking, FAQs, return requests, and complaint logging without any human involvement.',
    outcomes: [
      '87% of queries resolved without human agent',
      'Response time under 4 minutes, 24/7',
      'Integrated with your CRM and order system',
    ],
  },
  {
    id: 'lead-generation',
    problem: 'I want to generate leads automatically',
    solution: 'AI Outreach Agent',
    description:
      'An autonomous agent that responds to ad leads instantly, qualifies them with smart questions, scores them by intent, and books meetings directly into your calendar.',
    outcomes: [
      'Lead response in under 30 seconds',
      'Qualification questions adapted per lead source',
      'Calendar booking with confirmation and reminders',
    ],
  },
  {
    id: 'competitor-scraping',
    problem: 'I want to scrape competitor data',
    solution: 'Web Intelligence Scraper',
    description:
      'A production-grade scraper that monitors competitor prices, product listings, job postings, or any web data on a scheduled basis — feeding structured data into your dashboard or spreadsheet.',
    outcomes: [
      'Runs every 30 minutes without manual effort',
      'Handles JavaScript-rendered pages and anti-bot measures',
      'Delivers clean, structured data to Google Sheets or your database',
    ],
  },
  {
    id: 'chatbot',
    problem: 'I want to build a chatbot',
    solution: 'Custom AI Chatbot',
    description:
      'A context-aware AI chatbot trained on your own documents, product catalog, or knowledge base. Embeddable on your website or deployed on WhatsApp.',
    outcomes: [
      'Answers questions using only your approved knowledge base',
      'Remembers conversation context across sessions',
      'Escalates to human when confidence is low',
    ],
  },
  {
    id: 'hr-automation',
    problem: 'I want to automate my HR',
    solution: 'HR Automation System',
    description:
      'Automate leave management, salary slip delivery, onboarding workflows, policy FAQs, and employee document requests — all accessible over WhatsApp without an app install.',
    outcomes: [
      'Leave requests processed instantly via WhatsApp',
      'Salary slips auto-generated and sent monthly',
      'New employee onboarding completed in 1 day',
    ],
  },
  {
    id: 'ecommerce-ai',
    problem: 'I want AI for my e-commerce',
    solution: 'E-commerce AI Suite',
    description:
      'A full AI layer for your online store: product recommendation engine, inventory alert automation, abandoned cart recovery via WhatsApp, and customer segmentation pipelines.',
    outcomes: [
      'Abandoned cart recovery with personalized messages',
      'Low stock alerts sent to team automatically',
      'AI-driven upsell recommendations at checkout',
    ],
  },
  {
    id: 'threat-monitoring',
    problem: 'I want to monitor threats',
    solution: 'Security Audit and Monitoring',
    description:
      'A comprehensive security audit covering your web application, APIs, and infrastructure — plus optional ongoing monitoring for new vulnerabilities and anomalous traffic patterns.',
    outcomes: [
      'Full OWASP Top 10 assessment with severity ratings',
      'Detailed remediation roadmap with priority order',
      'Optional monthly automated vulnerability re-scan',
    ],
  },
  {
    id: 'staff-training',
    problem: 'I want to train staff with AI',
    solution: 'SekkhoAI Learning Platform',
    description:
      'Deploy an AI-powered training platform for your team. Adaptive quizzes, video learning, progress tracking, and AI tutor sessions — with support for Hindi, Bengali, and English.',
    outcomes: [
      'Course completion rates above 75% consistently',
      'AI tutor available 24/7 in regional languages',
      'Manager dashboard showing individual progress',
    ],
  },
]

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <SolutionsHeroHeading />
          <p className="mt-6 text-[15px] text-muted leading-[1.75] max-w-[52ch]">
            Pick the business problem you want solved. I will tell you exactly what to build, what it delivers, and how to get started.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SolutionsGrid solutions={SOLUTIONS} />

        <div className="mt-20 bg-surface border border-white/[0.07] rounded-2xl p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <Badge color="cyan">Custom Problem</Badge>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-text">
            Your use case not listed?
          </h2>
          <p className="mt-4 text-[14px] text-muted max-w-xl leading-relaxed">
            Describe your process and the outcome you want. I will tell you whether automation can
            help, what it would look like, and what it would cost — no commitment required.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/hire" variant="primary" size="lg">
              Describe My Problem
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Browse All Services
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
