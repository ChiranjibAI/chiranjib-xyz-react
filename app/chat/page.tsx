import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ChatInterface from '@/components/sections/ChatInterface'
import ChatHeroHeading from '@/components/sections/ChatHeroHeading'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Chat with ChiranjibAI | Ask Anything',
    description:
      'Chat with ChiranjibAI\'s AI assistant. Ask about automation services, pricing, past projects, or describe your problem and get an instant response.',
    openGraph: {
      title: 'Chat with ChiranjibAI | Ask Anything',
      description:
        'Instant answers about AI automation services, pricing, and project scoping.',
    },
  }
}

const SIDEBAR_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Start a Project', href: '/hire' },
]

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'How much does a WhatsApp bot cost?',
  'Can you build an AI agent for my business?',
  'What is the typical project timeline?',
  'Do you work with small businesses?',
]

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 py-8 gap-6">
        <div className="hidden lg:flex lg:w-72 xl:w-80 flex-col gap-5 flex-shrink-0">
          <div>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent mb-6" />
            <Badge color="cyan">ChiranjibAI Assistant</Badge>
            <ChatHeroHeading />
            <p className="mt-2 text-sm text-muted leading-relaxed">
              I can answer questions about services, pricing, project timelines, technical
              capabilities, and past work. For project-specific discussions, use the hire form.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
              Suggested Questions
            </p>
            <ul className="space-y-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <li key={q}>
                  <span className="text-xs text-muted leading-relaxed block py-1.5 px-3 rounded-lg bg-surface border border-border">
                    {q}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
              Quick Navigation
            </p>
            <ul className="space-y-1">
              {SIDEBAR_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between text-sm text-muted hover:text-cyan py-1.5 transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
              Ready to Start?
            </p>
            <p className="text-xs text-muted mb-3 leading-relaxed">
              Skip the chat and submit a project brief directly.
            </p>
            <Button href="/hire" variant="primary" size="sm" className="w-full justify-center">
              Hire Me
            </Button>
          </div>
        </div>

        <div className="flex-1 min-h-0" style={{ minHeight: 'calc(100vh - 8rem)' }}>
          <div className="lg:hidden mb-4">
            <ChatHeroHeading mobile />
            <p className="text-sm text-muted mt-1">
              Ask about services, pricing, or describe your project.
            </p>
          </div>
          <div className="h-full" style={{ height: 'calc(100vh - 12rem)' }}>
            <ChatInterface />
          </div>
        </div>
      </div>
    </main>
  )
}
