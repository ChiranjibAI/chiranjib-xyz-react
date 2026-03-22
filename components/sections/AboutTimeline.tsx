'use client'
import { motion } from 'framer-motion'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

const TIMELINE = [
  {
    year: '2020',
    title: 'Started Programming',
    description:
      'Began coding during the pandemic — Python first, then JavaScript. Built small tools for personal use and started understanding APIs and automation basics.',
  },
  {
    year: '2021',
    title: 'First AI Project',
    description:
      'Built first AI project: a document Q&A chatbot for a local business. Learned LangChain, embeddings, and vector stores the hard way — by breaking everything first.',
  },
  {
    year: '2022',
    title: 'Launched chiranjib.xyz',
    description:
      'Launched chiranjib.xyz as an AI automation portal. First 5 paid clients. Delivered WhatsApp bots, n8n workflows, and web scrapers. Earned ethical hacking certification.',
  },
  {
    year: '2023',
    title: '50+ Clients Milestone',
    description:
      'Crossed 50 delivered projects across e-commerce, real estate, logistics, and EdTech. Started building more complex multi-agent systems. First security audit contract.',
  },
  {
    year: '2024',
    title: 'AGI Research',
    description:
      'Began deep research into goal-directed multi-agent architectures. Built Project Shakti — an AGI prototype with self-correction loops and tool-use chaining across 15+ APIs.',
  },
  {
    year: '2025',
    title: 'SekkhoAI Launch',
    description:
      'Launched SekkhoAI — an AI-powered education platform for Bengali and Indian regional language students. Serving Tier 2 and Tier 3 city learners with AI tutoring in their native language.',
  },
]

export default function AboutTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      <div className="space-y-8">
        {TIMELINE.map((item, index) => {
          const isEven = index % 2 === 0
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: isEven ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="relative z-10 flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan/10 border-2 border-cyan flex items-center justify-center md:mx-auto md:absolute md:left-1/2 md:-translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-cyan" />
              </div>

              <div className={`flex-1 pb-2 pl-0 md:pl-0 md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className={`bg-card border border-border rounded-xl p-5 ${isEven ? 'md:ml-auto' : 'md:mr-0'}`}>
                  <span className="text-xs font-bold text-cyan"><GlitchText text={item.year} /></span>
                  <AnimatedLetters text={item.title} tag="h3" className="text-sm font-semibold text-text mt-1 mb-2" letterDelay={0.03} startDelay={index * 0.08} />
                  <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
