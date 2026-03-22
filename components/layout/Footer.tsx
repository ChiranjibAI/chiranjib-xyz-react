'use client'

import Link from 'next/link'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

const SERVICES_LINKS = [
  { label: 'AI Agents', href: '/services#ai-agents' },
  { label: 'WhatsApp Bots', href: '/services#whatsapp-automation' },
  { label: 'n8n Workflows', href: '/services#n8n-workflows' },
  { label: 'RAG & LLM', href: '/services#rag-llm' },
  { label: 'Security Audits', href: '/services#security-audits' },
  { label: 'Web Scraping', href: '/services#web-scraping' },
]

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Hire Me', href: '/hire' },
]

const CONNECT_LINKS = [
  { label: 'Telegram', href: 'https://t.me/ChiranjibAI', external: true },
  { label: 'Twitter / X', href: 'https://x.com/Chiranjibai', external: true },
  { label: 'GitHub', href: 'https://github.com/ChiranjibAI', external: true },
  { label: 'ChiranjibAI', href: '/chat', external: false },
  { label: 'SekkhoAI — Bengali AI Ed-Tech', href: '/sekkhoai', external: false },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Main grid: 40% left identity, 60% right links */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">

          {/* Left: Identity */}
          <div>
            <Link href="/" className="inline-block group">
              <span className="font-mono font-bold text-3xl md:text-4xl text-text group-hover:opacity-80 transition-opacity flex flex-wrap">
                <AnimatedLetters
                  text="chiranjib"
                  tag="span"
                  className="font-mono font-bold text-3xl md:text-4xl text-text"
                  letterDelay={0.06}
                  startDelay={0.1}
                />
                <AnimatedLetters
                  text=".xyz"
                  tag="span"
                  className="font-mono font-bold text-3xl md:text-4xl text-cyan"
                  letterDelay={0.06}
                  startDelay={0.1 + 'chiranjib'.length * 0.06}
                />
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-[32ch]">
              India-based AI automation specialist. Building systems that actually work since 2022.
            </p>

            {/* Social links */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { label: 'Telegram', href: 'https://t.me/ChiranjibAI' },
                { label: 'Twitter', href: 'https://x.com/Chiranjibai' },
                { label: 'GitHub', href: 'https://github.com/ChiranjibAI' },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-cyan transition-colors duration-200 font-mono"
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Email */}
            <p className="mt-4 text-xs text-muted/60 font-mono">
              chiranjibai@gmail.com
            </p>
          </div>

          {/* Right: Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Services */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60 mb-5">
                <GlitchText text="Services" />
              </p>
              <ul className="space-y-3">
                {SERVICES_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted hover:text-text transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60 mb-5">
                <GlitchText text="Company" />
              </p>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted hover:text-text transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60 mb-5">
                <GlitchText text="Connect" />
              </p>
              <ul className="space-y-3">
                {CONNECT_LINKS.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-text transition-colors duration-200"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-muted hover:text-text transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted/50">
            &copy; 2026 Chiranjib AI Systems. All rights reserved.
          </p>
          <p className="text-xs text-muted/40 font-mono">
            Built with Next.js · Three.js · Deployed on Vercel
          </p>
        </div>

      </div>
    </footer>
  )
}
