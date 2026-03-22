'use client'
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion'

// ── SplitText: per-letter unique animations ───────────────────────────────────
type LetterAnimStyle = 'bounce' | 'flip' | 'skew' | 'scale' | 'slide' | 'wave' | 'drop'

function SplitText({
  text,
  startFrame = 0,
  letterDelay = 3,
  color = '#ffffff',
  fontSize = 48,
  fontWeight = 700,
  fontFamily = 'sans-serif',
}: {
  text: string
  startFrame?: number
  letterDelay?: number
  color?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const ANIM_STYLES: LetterAnimStyle[] = ['bounce', 'flip', 'skew', 'scale', 'slide', 'wave', 'drop']

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', fontFamily, color, fontSize, fontWeight, lineHeight: 1.1 }}>
      {text.split('').map((char, i) => {
        if (char === ' ') return <span key={i} style={{ display: 'inline-block', width: fontSize * 0.3 }} />

        const delay = startFrame + i * letterDelay
        const localFrame = frame - delay

        const configs = [
          { damping: 8, stiffness: 300 },
          { damping: 200, stiffness: 100 },
          { damping: 5, stiffness: 400 },
          { damping: 15, stiffness: 200 },
          { damping: 12, stiffness: 150 },
        ]
        const config = configs[i % configs.length]
        const prog = spring({ frame: localFrame, fps, config })
        const opacity = interpolate(prog, [0, 0.01], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

        const style = ANIM_STYLES[i % ANIM_STYLES.length]

        let transform = ''
        let textShadow = 'none'

        if (style === 'bounce') {
          const y = interpolate(prog, [0, 1], [-60, 0])
          transform = `translateY(${y}px)`
        } else if (style === 'flip') {
          const rotateX = interpolate(prog, [0, 1], [90, 0])
          transform = `perspective(400px) rotateX(${rotateX}deg)`
        } else if (style === 'skew') {
          const skew = interpolate(prog, [0, 1], [40, 0])
          const y = interpolate(prog, [0, 1], [-40, 0])
          transform = `skewX(${skew}deg) translateY(${y}px)`
        } else if (style === 'scale') {
          const scale = interpolate(prog, [0, 1], [0, 1])
          const rotate = interpolate(prog, [0, 1], [-180, 0])
          transform = `scale(${scale}) rotate(${rotate}deg)`
        } else if (style === 'slide') {
          const x = interpolate(prog, [0, 1], [i % 2 === 0 ? -60 : 60, 0])
          transform = `translateX(${x}px)`
        } else if (style === 'wave') {
          const y = interpolate(prog, [0, 1], [50, 0])
          const rotate = interpolate(prog, [0, 1], [i % 2 === 0 ? -30 : 30, 0])
          transform = `translateY(${y}px) rotate(${rotate}deg)`
        } else if (style === 'drop') {
          const y = interpolate(prog, [0, 1], [-80, 0])
          const scale = interpolate(prog, [0, 1], [1.5, 1])
          transform = `translateY(${y}px) scale(${scale})`
          const colorFlash = interpolate(prog, [0, 0.3, 1], [0, 1, 0], { extrapolateRight: 'clamp' })
          textShadow = `0 0 ${colorFlash * 20}px rgba(0,229,255,${colorFlash})`
        }

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform,
              textShadow,
              transition: 'none',
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Agentic AI', services: ['Multi-Agent Systems', 'MCP Servers', 'Browser Agents', 'Chatbot Builder'], color: '#a855f7', count: 4 },
  { name: 'AI & LLM', services: ['AI Agent Dev', 'RAG Systems', 'LangChain', 'Voice AI'], color: '#00e5ff', count: 4 },
  { name: 'Automation', services: ['n8n Workflows', 'WhatsApp Bots', 'Make/Zapier', 'CRM Auto'], color: '#22c55e', count: 7 },
  { name: 'Data & Scraping', services: ['Web Scraping', 'Data Pipelines'], color: '#f59e0b', count: 2 },
  { name: 'Security', services: ['Ethical Hacking', 'VAPT', 'API Pentest'], color: '#ef4444', count: 3 },
]

// ── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const delay = 40 + index * 20
  const prog = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 180 } })
  const opacity = interpolate(prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const y = interpolate(prog, [0, 1], [60, 0])
  const rotate = interpolate(prog, [0, 0.5, 1], [index % 2 === 0 ? -6 : 6, 1, 0])

  return (
    <div style={{
      opacity, transform: `translateY(${y}px) rotate(${rotate}deg)`,
      background: '#0a0a0a', border: `1px solid ${cat.color}20`,
      borderRadius: 16, padding: '18px 20px', flex: 1,
    }}>
      <div style={{ color: cat.color, fontSize: 9, fontFamily: 'monospace', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
        {cat.count} services
      </div>
      <SplitText
        text={cat.name}
        startFrame={delay + 8}
        letterDelay={4}
        color="#ffffff"
        fontSize={14}
        fontWeight={600}
        fontFamily="sans-serif"
      />
      <div style={{ marginTop: 12 }}>
        {cat.services.map((s, si) => {
          const sDelay = delay + 20 + si * 8
          const sProg = interpolate(frame, [sDelay, sDelay + 12], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          })
          const sx = interpolate(sProg, [0, 1], [-16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          return (
            <div key={s} style={{
              opacity: sProg, transform: `translateX(${sx}px)`,
              color: '#64748b', fontSize: 11, fontFamily: 'sans-serif', marginBottom: 4,
              paddingLeft: 8, borderLeft: `2px solid ${cat.color}35`,
            }}>
              {s}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Composition ──────────────────────────────────────────────────────────
export function ServicesShowreel() {
  return (
    <AbsoluteFill style={{ background: '#050505', padding: '36px 40px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <SplitText text="20 PRODUCTION SERVICES" startFrame={0} letterDelay={2} color="#00e5ff" fontSize={10} fontWeight={400} fontFamily="monospace" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SplitText text="Everything You Need." startFrame={10} letterDelay={4} color="#ffffff" fontSize={34} fontWeight={700} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SplitText text="One Specialist." startFrame={30} letterDelay={5} color="#00e5ff" fontSize={34} fontWeight={700} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flex: 1 }}>
        {CATEGORIES.map((cat, i) => <CategoryCard key={cat.name} cat={cat} index={i} />)}
      </div>
    </AbsoluteFill>
  )
}
