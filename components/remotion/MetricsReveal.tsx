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
const METRICS = [
  { value: 50, suffix: '+', label: 'Clients Served', sub: 'E-commerce · Real Estate · EdTech · Logistics' },
  { value: 2, prefix: '₹', suffix: 'Cr+', label: 'Revenue Automated', sub: 'Across all client engagements' },
  { value: 4.9, suffix: '★', label: 'Client Rating', sub: 'Average across all projects' },
  { value: 100, suffix: '%', label: 'Projects Shipped', sub: 'Zero abandoned engagements' },
]

// ── Main Composition ──────────────────────────────────────────────────────────
export function MetricsReveal() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ background: '#050505', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ color: '#64748b', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 10 }}>
          Proven Outcomes
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SplitText text="Real automation." startFrame={5} letterDelay={4} color="#ffffff" fontSize={40} fontWeight={700} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
          <SplitText text="Real results." startFrame={25} letterDelay={5} color="#00e5ff" fontSize={40} fontWeight={700} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {METRICS.map((m, i) => {
          const delay = i * 18 + 10
          const prog = spring({ frame: frame - delay, fps, config: { damping: 8, stiffness: 160 } })
          const count = m.value % 1 === 0
            ? Math.round(interpolate(prog, [0, 1], [0, m.value]))
            : parseFloat(interpolate(prog, [0, 1], [0, m.value]).toFixed(1))
          const opacity = interpolate(prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const scale = interpolate(prog, [0, 0.5, 1], [0.7, 1.1, 1])
          const rotate = interpolate(prog, [0, 0.4, 1], [i % 2 === 0 ? -10 : 10, 2, 0])

          return (
            <div key={m.label} style={{
              opacity, transform: `scale(${scale}) rotate(${rotate}deg)`,
              background: '#0a0a0a', border: '1px solid rgba(0,229,255,0.08)',
              borderRadius: 20, padding: 24,
            }}>
              <div style={{ color: '#00e5ff', fontSize: 54, fontWeight: 700, fontFamily: 'monospace', lineHeight: 1, marginBottom: 8 }}>
                {m.prefix || ''}{count}{m.suffix}
              </div>
              <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, fontFamily: 'sans-serif', marginBottom: 5 }}>{m.label}</div>
              <div style={{ color: '#475569', fontSize: 11, fontFamily: 'sans-serif' }}>{m.sub}</div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
