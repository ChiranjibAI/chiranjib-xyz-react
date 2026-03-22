'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/GlitchText'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Chiranjib built our entire WhatsApp lead qualification bot in under two weeks. Our sales team now handles 3x the volume with the same headcount. ROI was visible in month one.',
    author: 'Raghav Mehrotra',
    role: 'Founder',
    company: 'VedaGrow Agritech',
    initials: 'RM',
  },
  {
    quote: 'We had tried three other automation vendors before. Chiranjib was the only one who actually understood our operations, not just the tech. The n8n pipelines run flawlessly six months in.',
    author: 'Priya Subramanian',
    role: 'Head of Operations',
    company: 'Kalarava Finserv',
    initials: 'PS',
  },
  {
    quote: 'The RAG system he deployed on top of our product documentation eliminated 70% of repetitive support tickets. Our team finally has time to focus on real problems.',
    author: 'Arjun Bhatnagar',
    role: 'CTO',
    company: 'Nirmaan SaaS Solutions',
    initials: 'AB',
  },
  {
    quote: 'He scoped our entire AI agent project in a single discovery call, gave us a fixed price, and delivered two days early. That kind of professionalism is rare.',
    author: 'Sanya Khosla',
    role: 'Co-Founder',
    company: 'Dhruva EdTech',
    initials: 'SK',
  },
  {
    quote: 'Our n8n automation stack saves us 40+ hours per week. Chiranjib built it in 8 days and it has not needed a single fix since deployment. Exceptional work.',
    author: 'Vikram Iyer',
    role: 'Operations Lead',
    company: 'TrueBalance Fintech',
    initials: 'VI',
  },
]

// Triple for seamless infinite loop
const row1 = [...testimonials, ...testimonials, ...testimonials]
const row2 = [...testimonials.slice(2), ...testimonials, ...testimonials, ...testimonials.slice(0, 2)]

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#00e5ff" className="opacity-80" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex-shrink-0 w-[340px] bg-card border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {/* Big quote mark — purely decorative */}
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-white/[0.04]"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M10 8C5.6 8 2 11.6 2 16s3.6 8 8 8 8-3.6 8-8V8h-8zm18 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V8h-8z" />
      </svg>

      <StarRow />

      <blockquote className="text-sm text-muted leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <footer className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full bg-cyan/[0.08] border border-cyan/20 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-[10px] font-bold text-cyan">{t.initials}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-text">{t.author}</p>
          <p className="text-[11px] text-muted mt-0.5">{t.role} · {t.company}</p>
        </div>
      </footer>
    </article>
  )
}

// Memoized marquee rows — isolated perpetual animations
const MarqueeRow1 = memo(function MarqueeRow1() {
  return (
    <div className="flex gap-5 animate-marquee-slow">
      {row1.map((t, i) => (
        <TestimonialCard key={`r1-${i}`} t={t} />
      ))}
    </div>
  )
})

const MarqueeRow2 = memo(function MarqueeRow2() {
  return (
    <div className="flex gap-5 animate-marquee-reverse">
      {row2.map((t, i) => (
        <TestimonialCard key={`r2-${i}`} t={t} />
      ))}
    </div>
  )
})

export default function TestimonialsSection() {
  return (
    <section className="bg-bg py-24 overflow-hidden border-t border-white/[0.06]">
      {/* Section header — left-aligned, padded */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-cyan mb-4"><GlitchText text="Client Results" duration={900} /></p>
          <AnimatedLetters text="What founders say after shipping" tag="h2" className="text-3xl md:text-4xl font-bold tracking-tighter text-text" startDelay={0.1} letterDelay={0.04} />
          <p className="mt-3 text-base text-muted leading-relaxed max-w-lg">
            From lean startups to funded companies. Real feedback from real engagements.
          </p>
        </motion.div>
      </div>

      {/* Dual carousel rows */}
      <div className="space-y-5">
        {/* Row 1: scrolls left */}
        <div className="marquee-fade overflow-hidden" aria-hidden="true">
          <MarqueeRow1 />
        </div>
        {/* Row 2: scrolls right */}
        <div className="marquee-fade overflow-hidden" aria-hidden="true">
          <MarqueeRow2 />
        </div>
      </div>

      {/* Screen-reader version */}
      <ul className="sr-only">
        {testimonials.map((t) => (
          <li key={t.author}>
            <q>{t.quote}</q> — {t.author}, {t.role} at {t.company}
          </li>
        ))}
      </ul>
    </section>
  )
}
