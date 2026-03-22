'use client'
import {
  useCurrentFrame, useVideoConfig, interpolate, spring, Easing,
  AbsoluteFill, Sequence,
} from 'remotion'

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

// ── Scene 1: Boot sequence ────────────────────────────────────────────────────
function SceneBoot() {
  const frame = useCurrentFrame()

  const lines = [
    { text: 'CHIRANJIB.XYZ SYSTEMS v2026', color: '#ffffff', size: 20, delay: 0 },
    { text: '[OK] AI Engine .......... loaded', color: '#64748b', size: 14, delay: 18 },
    { text: '[OK] WhatsApp API ....... live', color: '#64748b', size: 14, delay: 30 },
    { text: '[OK] n8n Workflows ...... active', color: '#64748b', size: 14, delay: 42 },
    { text: '[OK] AGI Research ....... running', color: '#64748b', size: 14, delay: 54 },
    { text: '[READY] 50+ clients. 20 services.', color: '#00e5ff', size: 16, delay: 68 },
  ]

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: '#050505', padding: '40px 48px', justifyContent: 'center', display: 'flex', flexDirection: 'column', opacity: bgOpacity }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.015) 2px, rgba(0,229,255,0.015) 4px)',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'monospace', position: 'relative' }}>
        {lines.map((line, i) => (
          <SplitText
            key={i}
            text={line.text}
            startFrame={line.delay}
            letterDelay={i === 0 ? 2 : 1}
            color={line.color}
            fontSize={line.size}
            fontWeight={i === 0 ? 700 : 400}
            fontFamily="monospace"
          />
        ))}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 2: Stats Reveal ─────────────────────────────────────────────────────
function SceneStats() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const stats = [
    { value: 50, suffix: '+', label: 'Clients', delay: 20 },
    { value: 20, suffix: '', label: 'Services', delay: 35 },
    { value: 5, suffix: 'yr', label: 'Experience', delay: 50 },
    { value: 100, suffix: '%', label: 'Shipped', delay: 65 },
  ]

  return (
    <AbsoluteFill style={{ background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
      <div style={{ marginBottom: 40 }}>
        <SplitText text="Real Numbers." startFrame={0} letterDelay={4} color="#ffffff" fontSize={40} fontWeight={700} />
        <SplitText text="Real Clients." startFrame={20} letterDelay={4} color="#00e5ff" fontSize={40} fontWeight={700} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%', maxWidth: 560 }}>
        {stats.map((stat, i) => {
          const prog = spring({ frame: frame - stat.delay, fps, config: { damping: 8, stiffness: 200 } })
          const count = Math.round(interpolate(prog, [0, 1], [0, stat.value]))
          const opacity = interpolate(prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const scale = interpolate(prog, [0, 0.5, 1], [0.6, 1.15, 1])
          const rotate = interpolate(prog, [0, 0.3, 1], [i % 2 === 0 ? -15 : 15, 3, 0])
          return (
            <div key={i} style={{
              opacity, transform: `scale(${scale}) rotate(${rotate}deg)`,
              background: '#0a0a0a', border: '1px solid rgba(0,229,255,0.12)',
              borderRadius: 16, padding: '24px 28px', textAlign: 'center',
            }}>
              <div style={{ color: '#00e5ff', fontSize: 52, fontWeight: 700, fontFamily: 'monospace' }}>
                {count}{stat.suffix}
              </div>
              <div style={{ color: '#64748b', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'monospace', marginTop: 6 }}>
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 3: Services ─────────────────────────────────────────────────────────
function SceneServices() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const services = [
    { name: 'WhatsApp Bots', color: '#22c55e' },
    { name: 'AI Agents', color: '#00e5ff' },
    { name: 'n8n Workflows', color: '#00e5ff' },
    { name: 'RAG / LLM', color: '#a855f7' },
    { name: 'Web Scraping', color: '#f59e0b' },
    { name: 'Pentest & VAPT', color: '#ef4444' },
  ]

  return (
    <AbsoluteFill style={{ background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <SplitText text="20 Services." startFrame={0} letterDelay={5} color="#ffffff" fontSize={44} fontWeight={700} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <SplitText text="One Builder." startFrame={15} letterDelay={5} color="#00e5ff" fontSize={44} fontWeight={700} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, width: '100%', maxWidth: 680 }}>
        {services.map((svc, i) => {
          const delay = 30 + i * 12
          const prog = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 220 } })
          const opacity = interpolate(prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const y = interpolate(prog, [0, 1], [50, 0])
          const rotate = interpolate(prog, [0, 0.6, 1], [i % 2 === 0 ? -8 : 8, 2, 0])
          return (
            <div key={i} style={{
              opacity, transform: `translateY(${y}px) rotate(${rotate}deg)`,
              background: '#0a0a0a', border: `1px solid ${svc.color}25`,
              borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: svc.color, flexShrink: 0 }} />
              <span style={{ color: '#e2e8f0', fontSize: 12, fontFamily: 'sans-serif', fontWeight: 500 }}>{svc.name}</span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 4: CTA ──────────────────────────────────────────────────────────────
function SceneCTA() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const ctaProg = spring({ frame: frame - 40, fps, config: { damping: 8, stiffness: 200 } })
  const glowOpacity = interpolate(frame, [0, 30, 60, 90], [0, 0.8, 0.5, 0.7], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
      <div style={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 500, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)',
        opacity: glowOpacity,
      }} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <SplitText text="Your competitors" startFrame={0} letterDelay={4} color="#ffffff" fontSize={38} fontWeight={700} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
          <SplitText text="are already" startFrame={20} letterDelay={5} color="#e2e8f0" fontSize={38} fontWeight={700} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
          <SplitText text="automating." startFrame={40} letterDelay={6} color="#00e5ff" fontSize={38} fontWeight={700} />
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <SplitText text="Let's build yours." startFrame={70} letterDelay={5} color="#64748b" fontSize={20} fontWeight={400} />
        </div>
        <div style={{
          marginTop: 28,
          background: '#00e5ff', color: '#050505',
          padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 700,
          fontFamily: 'sans-serif', display: 'inline-block',
          opacity: ctaProg,
          transform: `scale(${interpolate(ctaProg, [0, 0.5, 1], [0.7, 1.08, 1])})`,
        }}>
          Start a Project →
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ── Main Composition ──────────────────────────────────────────────────────────
export function HeroIntroVideo() {
  return (
    <AbsoluteFill style={{ background: '#050505' }}>
      <Sequence durationInFrames={90}><SceneBoot /></Sequence>
      <Sequence from={90} durationInFrames={120}><SceneStats /></Sequence>
      <Sequence from={210} durationInFrames={150}><SceneServices /></Sequence>
      <Sequence from={360} durationInFrames={90}><SceneCTA /></Sequence>
    </AbsoluteFill>
  )
}
