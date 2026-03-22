'use client'

import { useState, useCallback, useRef, memo } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import type { SERVICES_DATA } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

type Service = (typeof SERVICES_DATA)[number]

interface ServicesGridProps {
  services: Service[]
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const CATEGORIES = ['All', 'Agentic AI', 'AI & LLM', 'Automation', 'Data & Scraping', 'Security'] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_MAP: Record<string, Category> = {
  'multi-agent-systems': 'Agentic AI',
  'mcp-servers': 'Agentic AI',
  'browser-agents': 'Agentic AI',
  'ai-agents': 'AI & LLM',
  'rag-llm': 'AI & LLM',
  'voice-ai': 'AI & LLM',
  'chatbot-builder': 'AI & LLM',
  'whatsapp-automation': 'Automation',
  'n8n-workflows': 'Automation',
  'email-automation': 'Automation',
  'crm-automation': 'Automation',
  'make-automation': 'Automation',
  'zapier-automation': 'Automation',
  'airtable-automation': 'Automation',
  'web-scraping': 'Data & Scraping',
  'computer-vision': 'Data & Scraping',
  'data-pipelines': 'Data & Scraping',
  'security-audits': 'Security',
  'api-pentesting': 'Security',
  'vapt': 'Security',
}

const DELIVERY_TIMES: Record<string, string> = {
  'multi-agent-systems': '14–28 days',
  'mcp-servers': '5–10 days',
  'browser-agents': '7–14 days',
  'ai-agents': '14–21 days',
  'whatsapp-automation': '7–14 days',
  'n8n-workflows': '5–10 days',
  'rag-llm': '10–21 days',
  'web-scraping': '5–7 days',
  'security-audits': '7–10 days',
  'computer-vision': '14–28 days',
  'voice-ai': '10–21 days',
  'email-automation': '7–10 days',
  'crm-automation': '5–10 days',
  'data-pipelines': '7–14 days',
  'api-pentesting': '5–7 days',
  'vapt': '7–14 days',
  'chatbot-builder': '7–14 days',
  'make-automation': '5–10 days',
  'zapier-automation': '3–7 days',
  'airtable-automation': '5–10 days',
}

const CTA_LABELS: Record<string, string> = {
  'multi-agent-systems': 'Build Multi-Agent Pipeline',
  'mcp-servers': 'Build My MCP Server',
  'browser-agents': 'Automate My Browser Tasks',
  'ai-agents': 'Build My AI Agent',
  'whatsapp-automation': 'Start WhatsApp Bot',
  'n8n-workflows': 'Automate My Workflows',
  'rag-llm': 'Build My RAG System',
  'web-scraping': 'Start Scraping Project',
  'security-audits': 'Get Security Audit',
  'computer-vision': 'Build Vision System',
  'voice-ai': 'Build Voice Agent',
  'email-automation': 'Set Up Email Flows',
  'crm-automation': 'Automate My CRM',
  'data-pipelines': 'Build My Data Pipeline',
  'api-pentesting': 'Test My API',
  'vapt': 'Get VAPT Report',
  'chatbot-builder': 'Build My Chatbot',
  'make-automation': 'Build Make Scenarios',
  'zapier-automation': 'Set Up Zapier Flows',
  'airtable-automation': 'Set Up Airtable Base',
}

// ─────────────────────────────────────────────
// DELIVERY TIME — color coding by duration
// ─────────────────────────────────────────────
function getDeliveryMeta(time: string): { color: string; barWidth: string } {
  const num = parseInt(time)
  if (num <= 7)  return { color: 'text-green-400',  barWidth: 'w-[25%]' }
  if (num <= 14) return { color: 'text-cyan',       barWidth: 'w-[50%]' }
  if (num <= 21) return { color: 'text-yellow-400', barWidth: 'w-[75%]' }
  return           { color: 'text-orange-400',      barWidth: 'w-full'  }
}

// ─────────────────────────────────────────────
// HOT BADGE — pulsing orange glow (memoized, perpetual)
// ─────────────────────────────────────────────
const HotBadge = memo(function HotBadge() {
  return (
    <motion.span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-[0.12em] bg-orange-500/[0.12] text-orange-400 border border-orange-500/25"
      animate={{
        boxShadow: [
          '0 0 0px rgba(249,115,22,0)',
          '0 0 14px rgba(249,115,22,0.45)',
          '0 0 0px rgba(249,115,22,0)',
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Pulsing dot */}
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-orange-400"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      Hot
    </motion.span>
  )
})

// ─────────────────────────────────────────────
// POPULAR BADGE — shimmer sweep (memoized, perpetual)
// ─────────────────────────────────────────────
const PopularBadge = memo(function PopularBadge() {
  return (
    <span className="relative inline-flex overflow-hidden items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-[0.12em] bg-cyan/[0.08] text-cyan border border-cyan/25">
      Popular
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />
    </span>
  )
})

// ─────────────────────────────────────────────
// ANIMATED CHECKMARK — SVG path draw on mount
// ─────────────────────────────────────────────
function AnimatedCheck({ delay }: { delay: number }) {
  return (
    <motion.svg
      className="w-3.5 h-3.5 text-cyan/70 flex-shrink-0 mt-[2px]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4.5 12.75l6 6 9-13.5"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  )
}

// ─────────────────────────────────────────────
// MAIN GRID
// ─────────────────────────────────────────────
export default function ServicesGrid({ services }: ServicesGridProps) {
  const [active, setActive] = useState<Category>('All')

  // Count per category for tab labels
  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === 'All'
      ? services.length
      : services.filter(s => CATEGORY_MAP[s.id] === cat).length
    return acc
  }, {})

  const filtered =
    active === 'All'
      ? services
      : services.filter(s => CATEGORY_MAP[s.id] === active)

  return (
    <div>
      {/* ── Filter tabs ── */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1 mb-10">
        <div className="flex gap-1 min-w-max">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`relative px-4 py-2 text-[13px] font-medium rounded-lg whitespace-nowrap transition-colors duration-150 ${
                active === cat ? 'text-cyan' : 'text-muted hover:text-text'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-lg bg-cyan/[0.08] border border-cyan/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat}
                <span className={`text-[10px] font-mono ${active === cat ? 'text-cyan/60' : 'text-muted/40'}`}>
                  {counts[cat]}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid — key forces instant remount on filter change ── */}
      <div key={active} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// SERVICE CARD — 3D tilt via useMotionValue (NO useState for tilt)
// ─────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt — useMotionValue stays outside render cycle, zero re-renders
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-60, 60], [7, -7]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-60, 60], [-7, 7]), { stiffness: 300, damping: 30 })

  // Spotlight position — also motion value, no useState
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const spotXPx = useTransform(spotX, v => `${v}px`)
  const spotYPx = useTransform(spotY, v => `${v}px`)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set(e.clientX - rect.left - rect.width / 2)
    rawY.set(e.clientY - rect.top - rect.height / 2)
    spotX.set(e.clientX - rect.left)
    spotY.set(e.clientY - rect.top)
  }, [rawX, rawY, spotX, spotY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const deliveryTime = DELIVERY_TIMES[service.id]
  const { color: deliveryColor, barWidth } = getDeliveryMeta(deliveryTime ?? '')
  const ctaLabel = CTA_LABELS[service.id] ?? 'Get This Service'
  const isHot     = service.badge === 'Hot'
  const isPopular = service.badge === 'Popular'

  const cardVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 32, delay: index * 0.018 },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      id={service.id}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-card rounded-2xl border transition-[border-color,box-shadow] duration-300 cursor-default ${
        isHot
          ? 'border-orange-500/20 shadow-[0_0_32px_-12px_rgba(249,115,22,0.12)]'
          : isPopular
          ? 'border-cyan/20 shadow-[0_0_28px_-12px_rgba(0,229,255,0.10)]'
          : 'border-white/[0.07] hover:border-white/[0.16]'
      }`}
    >
      {/* Spotlight radial — tracks mouse via motion values, no re-render */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(380px circle at ${spotXPx} ${spotYPx}, rgba(0,229,255,0.06), transparent 40%)`,
        }}
      />

      {/* Hover border glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan/[0.18]"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">

        {/* ── Header: icon + badges ── */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isHot
                ? 'bg-orange-500/[0.08] border border-orange-500/15'
                : isPopular
                ? 'bg-cyan/[0.07] border border-cyan/15'
                : 'bg-surface border border-white/[0.08]'
            }`}
            whileHover={{ scale: 1.12, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <svg
              className={`w-5 h-5 ${isHot ? 'text-orange-400' : isPopular ? 'text-cyan' : 'text-muted'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
            </svg>
          </motion.div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-muted/30 hidden sm:block">
              {CATEGORY_MAP[service.id]}
            </span>
            {isHot     && <HotBadge />}
            {isPopular && <PopularBadge />}
          </div>
        </div>

        {/* ── Title ── */}
        <AnimatedLetters
          text={service.title}
          tag="h3"
          className="text-[15px] font-semibold text-text mb-2 tracking-tight leading-snug"
          letterDelay={0.02}
          startDelay={index * 0.04}
        />

        {/* ── Description ── */}
        <p className="text-[13px] text-muted leading-[1.75] mb-4 flex-1">{service.description}</p>

        {/* ── Delivery time — color coded + mini bar ── */}
        {deliveryTime && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3 h-3 text-muted/40" />
              <span className={`text-[11px] font-mono font-medium ${deliveryColor}`}>
                {deliveryTime}
              </span>
              <span className="text-[10px] text-muted/30 font-mono">delivery</span>
            </div>
            {/* Progress bar */}
            <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  deliveryColor === 'text-green-400'  ? 'bg-green-400' :
                  deliveryColor === 'text-cyan'       ? 'bg-cyan' :
                  deliveryColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-orange-400'
                }`}
                initial={{ width: 0 }}
                animate={{ width: barWidth.replace('w-', '').replace('[', '').replace(']', '').replace('%', '') + '%' }}
                transition={{ duration: 0.6, delay: index * 0.018 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}

        {/* ── Features — animated checkmark draw on mount ── */}
        <ul className="space-y-1.5 mb-6">
          {service.features.map((feature, fi) => (
            <li key={feature} className="flex items-start gap-2 text-[12px] text-muted group/feat hover:text-text/80 transition-colors duration-150">
              <AnimatedCheck delay={index * 0.018 + 0.08 + fi * 0.045} />
              <span className={fi === 0 ? 'text-text/70 font-medium' : ''}>{feature}</span>
            </li>
          ))}
        </ul>

        {/* ── CTA — directional fill + arrow slide ── */}
        <a
          href="/hire"
          className={`group/btn relative self-start inline-flex overflow-hidden items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium active:scale-[0.97] transition-transform duration-100 ${
            isHot
              ? 'bg-orange-500/[0.1] text-orange-300 border border-orange-500/20 hover:border-orange-500/40'
              : isPopular
              ? 'bg-cyan text-bg hover:bg-cyan/90 shadow-[0_0_18px_-4px_rgba(0,229,255,0.3)]'
              : 'border border-white/[0.1] text-muted hover:text-text hover:border-white/[0.22]'
          }`}
        >
          {/* Directional fill layer — enters from left */}
          {!isPopular && (
            <span
              aria-hidden="true"
              className={`absolute inset-0 origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out rounded-xl ${
                isHot ? 'bg-orange-500/[0.08]' : 'bg-white/[0.04]'
              }`}
            />
          )}
          <span className="relative z-10">{ctaLabel}</span>
          <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
        </a>

      </div>
    </motion.div>
  )
}
