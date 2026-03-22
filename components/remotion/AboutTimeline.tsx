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
const MILESTONES = [
  { year: '2020', title: 'First Line of Code', desc: 'Pandemic. Curiosity. First chatbot in 6 months.', color: '#64748b' },
  { year: '2022', title: 'Launched chiranjib.xyz', desc: 'First paying clients. Real automation, real money.', color: '#00e5ff' },
  { year: '2023', title: '25+ Clients Served', desc: 'E-commerce, Real Estate, EdTech — across India.', color: '#00e5ff' },
  { year: '2024', title: '50+ Clients + AGI Research', desc: 'Multi-agent architectures. Goal-directed systems.', color: '#a855f7' },
  { year: '2025', title: 'Founded SekkhoAI', desc: 'AI education for Bengali students in their language.', color: '#22c55e' },
]

// ── Main Composition ──────────────────────────────────────────────────────────
export function AboutTimeline() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ background: '#050505', padding: '36px 48px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SplitText text="From Curious Coder" startFrame={0} letterDelay={3} color="#ffffff" fontSize={30} fontWeight={700} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
          <SplitText text="to AI Systems Builder." startFrame={15} letterDelay={4} color="#00e5ff" fontSize={30} fontWeight={700} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
        {MILESTONES.map((m, i) => {
          const delay = i * 32 + 25
          const prog = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 160 } })
          const opacity = interpolate(prog, [0, 0.15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const x = interpolate(prog, [0, 1], [-40, 0])
          const lineH = interpolate(prog, [0, 1], [0, 1])

          return (
            <div key={m.year} style={{ display: 'flex', gap: 18, opacity }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, flexShrink: 0, marginTop: 3, boxShadow: `0 0 10px ${m.color}80` }} />
                {i < MILESTONES.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom, ${m.color}50, transparent)`, transform: `scaleY(${lineH})`, transformOrigin: 'top', minHeight: 32 }} />
                )}
              </div>
              <div style={{ paddingBottom: 20, transform: `translateX(${x}px)` }}>
                <div style={{ display: 'flex', marginBottom: 3 }}>
                  <SplitText text={m.year} startFrame={delay + 5} letterDelay={6} color={m.color} fontSize={11} fontFamily="monospace" />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <SplitText text={m.title} startFrame={delay + 10} letterDelay={3} color="#e2e8f0" fontSize={13} fontWeight={600} />
                </div>
                <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'sans-serif', lineHeight: 1.6, maxWidth: 380, marginTop: 3 }}>
                  {m.desc}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
