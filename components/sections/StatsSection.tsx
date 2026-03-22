'use client'

import { memo } from 'react'

interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  { value: '50+', label: 'Clients Automated' },
  { value: '&#8377;2Cr+', label: 'Revenue Automated*' },
  { value: '4.9&#9733;', label: 'Client Rating' },
  { value: '100%', label: 'Projects Shipped' },
  { value: '5 yrs', label: 'AI Experience' },
  { value: '200+', label: 'Automations Built' },
]

// Triple for seamless loop
const allStats = [...stats, ...stats, ...stats]

// Memoized — isolated perpetual animation
const StatsMarquee = memo(function StatsMarquee() {
  return (
    <div className="flex items-center animate-marquee-slow" aria-hidden="true">
      {allStats.map((stat, i) => (
        <div key={i} className="flex items-center gap-10 flex-shrink-0 px-10">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-bold font-mono text-cyan"
              dangerouslySetInnerHTML={{ __html: stat.value }}
            />
            <span className="text-xs text-muted uppercase tracking-wider whitespace-nowrap">
              {stat.label}
            </span>
          </div>
          <span className="w-px h-6 bg-white/10 flex-shrink-0" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
})

export default function StatsSection() {
  return (
    <section className="bg-surface border-y border-white/[0.06] py-5 overflow-hidden">
      {/* Screen-reader friendly version */}
      <ul className="sr-only">
        {stats.map((s) => (
          <li key={s.label}>
            <span dangerouslySetInnerHTML={{ __html: s.value }} /> {s.label}
          </li>
        ))}
      </ul>

      <div className="marquee-fade">
        <StatsMarquee />
      </div>

      {/* Proof footnote for bold claims */}
      <p className="text-center text-[10px] text-muted/30 font-mono mt-3 px-6">
        * &#8377;2Cr+ revenue automated across 50+ client projects since 2022
      </p>
    </section>
  )
}
