'use client'

import { memo, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Service data for the video
const SERVICE_VIDEO_DATA: Record<string, {
  title: string
  category: string
  tagline: string
  problem: string
  solution: string
  results: string[]
  tech: string[]
  deliveryDays: string
}> = {
  'whatsapp-bot': {
    title: 'WhatsApp Bot',
    category: 'Automation',
    tagline: 'Automate your lead qualification 24/7',
    problem: 'Your team spends hours manually qualifying leads on WhatsApp — missing hot prospects while they sleep.',
    solution: 'AI-powered WhatsApp bot using Meta Business API. Qualifies leads, answers FAQs, and routes hot prospects to your sales team — all in under 60 seconds.',
    results: ['3× lead response speed', '40hrs/week saved', '0 leads missed overnight'],
    tech: ['Meta Business API', 'GPT-4o', 'n8n', 'Webhook'],
    deliveryDays: '7–14 days',
  },
  'n8n-workflow': {
    title: 'n8n Workflow Automation',
    category: 'Automation',
    tagline: 'Connect every tool in your stack',
    problem: 'Your team manually copies data between tools all day. CRM updates, email triggers, Slack alerts — all done by hand.',
    solution: 'Visual n8n automation pipeline connecting 400+ tools. Data flows automatically between your CRM, email, spreadsheets, and messaging apps.',
    results: ['400+ integrations', '5-10 day delivery', '0 manual data entry'],
    tech: ['n8n', 'REST APIs', 'Webhooks', 'PostgreSQL'],
    deliveryDays: '5–10 days',
  },
  'ai-agent': {
    title: 'AI Agent Development',
    category: 'Agentic AI',
    tagline: 'Autonomous AI that works while you sleep',
    problem: 'Multi-step tasks like research, outreach, and reporting require constant human attention and context switching.',
    solution: 'Custom AI agents using LangChain/LangGraph that plan, execute, and verify multi-step tasks autonomously — with human oversight when needed.',
    results: ['Multi-step autonomy', '24/7 operation', 'Human-in-the-loop'],
    tech: ['LangChain', 'GPT-4o', 'Python', 'Tool Use'],
    deliveryDays: '14–21 days',
  },
  'rag-llm': {
    title: 'RAG & LLM Integration',
    category: 'AI & LLM',
    tagline: 'AI that knows your business inside out',
    problem: "Generic LLMs hallucinate and don't know your products, policies, or internal docs.",
    solution: 'Retrieval-augmented generation system trained on your knowledge base. Accurate, grounded responses from your own data — no hallucinations.',
    results: ['Zero hallucinations', 'Your data, your answers', 'Scales to 100k+ docs'],
    tech: ['Pinecone', 'OpenAI Embeddings', 'Supabase pgvector', 'Claude API'],
    deliveryDays: '10–21 days',
  },
  'web-scraping': {
    title: 'Web Scraping & Crawling',
    category: 'Data & Scraping',
    tagline: 'Turn any website into structured data',
    problem: 'Competitor prices, market data, and leads are locked behind websites with no API.',
    solution: 'Production-grade scraper with anti-bot bypass, proxy rotation, and automatic re-try. Data delivered clean and structured to your database.',
    results: ['Anti-bot bypass', '99.9% uptime', 'Structured output'],
    tech: ['Playwright', 'Python', 'Proxy Rotation', 'PostgreSQL'],
    deliveryDays: '5–10 days',
  },
  'multi-agent-systems': {
    title: 'Multi-Agent Systems',
    category: 'Agentic AI',
    tagline: 'AI teams that outperform human workflows',
    problem: 'Complex business processes require multiple specialized steps — research, writing, verification, approval — that no single AI can handle alone.',
    solution: 'Multi-agent pipelines with specialized agents (researcher, writer, critic, executor) collaborating autonomously using CrewAI or LangGraph.',
    results: ['Parallel execution', 'Specialized agents', 'Human oversight gates'],
    tech: ['CrewAI', 'LangGraph', 'AutoGen', 'GPT-4o'],
    deliveryDays: '14–21 days',
  },
}

type ServiceData = {
  title: string
  category: string
  tagline: string
  problem: string
  solution: string
  results: string[]
  tech: string[]
  deliveryDays: string
}

// Default data for unknown services
function getServiceData(serviceId: string): ServiceData {
  return SERVICE_VIDEO_DATA[serviceId] ?? {
    title: 'AI Automation Service',
    category: 'Automation',
    tagline: 'Custom automation built for your business',
    problem: 'Manual processes are slowing your business down and costing you time and money.',
    solution: 'Custom AI automation system designed specifically for your workflow, deployed in production with ongoing support.',
    results: ['Hours saved weekly', 'Faster responses', 'Zero manual work'],
    tech: ['AI/LLM', 'Automation', 'APIs', 'Custom Build'],
    deliveryDays: 'Scoped per project',
  }
}

type Scene = 'intro' | 'problem' | 'solution' | 'results' | 'cta'
const SCENES: Scene[] = ['intro', 'problem', 'solution', 'results', 'cta']
const SCENE_DURATION = 3500 // ms per scene

const sceneVariants = {
  enter: { opacity: 0, y: 20, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 1.02 },
}

function SceneIntro({ data }: { data: ServiceData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan/70 mb-3"
      >
        {data.category}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="text-3xl font-bold tracking-tighter text-text leading-tight mb-3"
      >
        {data.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-base text-cyan font-medium"
      >
        {data.tagline}
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
      />
    </div>
  )
}

function SceneProblem({ data }: { data: ServiceData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 py-6">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-400/70 mb-3"
      >
        The Problem
      </motion.span>
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 80 }}
        className="text-[15px] text-muted leading-relaxed"
      >
        {data.problem}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 px-4 py-3 rounded-xl bg-orange-400/[0.05] border border-orange-400/20"
      >
        <span className="text-[12px] text-orange-400/80 font-mono">↓ Manual work killing your growth</span>
      </motion.div>
    </div>
  )
}

function SceneSolution({ data }: { data: ServiceData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 py-6">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan/70 mb-3"
      >
        The Solution
      </motion.span>
      <motion.p
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 80 }}
        className="text-[15px] text-muted leading-relaxed mb-5"
      >
        {data.solution}
      </motion.p>
      <div className="flex flex-wrap gap-2">
        {data.tech.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface border border-cyan/15 text-cyan/70"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function SceneResults({ data }: { data: ServiceData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 py-6">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10px] font-mono uppercase tracking-[0.2em] text-green-400/70 mb-4"
      >
        Real Results
      </motion.span>
      <div className="space-y-3">
        {data.results.map((result, i) => (
          <motion.div
            key={result}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.15, type: 'spring', stiffness: 100 }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 300 }}
              className="w-5 h-5 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center flex-shrink-0"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 2.5" stroke="rgb(74,222,128)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
            <span className="text-[14px] text-text">{result}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SceneCTA({ data }: { data: ServiceData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-[11px] font-mono text-muted/50 uppercase tracking-[0.2em] mb-2"
      >
        Delivery: {data.deliveryDays}
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-xl font-bold tracking-tight text-text mb-2"
      >
        Ready to build this?
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-[13px] text-muted mb-5"
      >
        Message Chiranjib on Telegram for a free scope call
      </motion.p>
      <motion.a
        href="https://t.me/chiranjibai"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-cyan text-bg shadow-[0_0_20px_-4px_rgba(0,229,255,0.4)]"
      >
        @chiranjibai on Telegram
      </motion.a>
    </div>
  )
}

const SCENE_LABELS: Record<Scene, string> = {
  intro: 'Overview',
  problem: 'Problem',
  solution: 'Solution',
  results: 'Results',
  cta: 'Get Started',
}

export const ServiceVideoPlayer = memo(function ServiceVideoPlayer({
  serviceId,
  onClose,
}: {
  serviceId: string
  onClose: () => void
}) {
  const [currentScene, setCurrentScene] = useState<Scene>('intro')
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const data = getServiceData(serviceId)
  const sceneIndex = SCENES.indexOf(currentScene)

  // Auto-advance scenes
  useEffect(() => {
    if (!isPlaying) return

    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / SCENE_DURATION, 1)
      setProgress(p)

      if (p >= 1) {
        clearInterval(tick)
        const nextIndex = sceneIndex + 1
        if (nextIndex < SCENES.length) {
          setCurrentScene(SCENES[nextIndex])
          setProgress(0)
        } else {
          setIsPlaying(false)
        }
      }
    }, 50)

    return () => clearInterval(tick)
  }, [currentScene, isPlaying, sceneIndex])

  const goToScene = useCallback((scene: Scene) => {
    setCurrentScene(scene)
    setProgress(0)
    setIsPlaying(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="relative w-full rounded-2xl border border-white/[0.08] bg-[#050505] overflow-hidden shadow-[0_0_60px_-10px_rgba(0,229,255,0.12)]"
      style={{ aspectRatio: '16/9', minHeight: '220px' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Scene content */}
      <div className="relative h-full" style={{ paddingBottom: '52px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="absolute inset-0"
          >
            {currentScene === 'intro' && <SceneIntro data={data} />}
            {currentScene === 'problem' && <SceneProblem data={data} />}
            {currentScene === 'solution' && <SceneSolution data={data} />}
            {currentScene === 'results' && <SceneResults data={data} />}
            {currentScene === 'cta' && <SceneCTA data={data} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 px-4 pb-3 pt-2 bg-gradient-to-t from-black/60 to-transparent">
        {/* Progress bar */}
        <div className="h-px bg-white/[0.08] rounded-full mb-2 overflow-hidden">
          <motion.div
            className="h-full bg-cyan/60 rounded-full"
            style={{ width: `${((sceneIndex + progress) / SCENES.length) * 100}%` }}
          />
        </div>

        {/* Scene nav dots */}
        <div className="flex items-center gap-1.5 justify-center">
          {SCENES.map((scene) => (
            <button
              key={scene}
              onClick={() => goToScene(scene)}
              className={`h-1 rounded-full transition-all duration-300 ${
                scene === currentScene ? 'bg-cyan w-6' : 'bg-white/20 w-1.5 hover:bg-white/40'
              }`}
              title={SCENE_LABELS[scene]}
            />
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-muted/60 hover:text-text hover:border-white/20 transition-colors"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying((p) => !p)}
        className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-muted/60 hover:text-text transition-colors"
      >
        {isPlaying ? (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
            <rect x="0" y="0" width="3" height="10" rx="1"/>
            <rect x="5" y="0" width="3" height="10" rx="1"/>
          </svg>
        ) : (
          <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
            <path d="M0 0l9 5L0 10V0z"/>
          </svg>
        )}
      </button>
    </motion.div>
  )
})
