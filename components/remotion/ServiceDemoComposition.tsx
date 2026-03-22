'use client'
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion'
import { TransitionSeries, springTiming } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'

// ── Interface ──────────────────────────────────────────────────────────────────
export interface ServiceDemoProps {
  serviceId: string
  title: string
  tagline: string
  category: string
  problem: string
  solution: string
  resultText: string
  metric: string
  metricLabel: string
  quote: string
  quotePerson: string
  painTags: string[]
  buildDays: string
}

// ── Default props (for Remotion Studio preview) ────────────────────────────────
export const serviceDemoDefaultProps: ServiceDemoProps = {
  serviceId: 'whatsapp-bot',
  title: 'WhatsApp Bot',
  tagline: 'Turn conversations into conversions',
  category: 'Automation',
  problem:
    'Your team manually handles 200+ lead messages daily. Hours wasted, leads lost, no follow-up system.',
  solution:
    'Custom WhatsApp Bot via Meta API — AI qualifies leads, sends sequences, syncs to your CRM automatically.',
  resultText: '847 leads/month automated, 12hrs saved daily',
  metric: '847',
  metricLabel: 'leads/month',
  quote:
    'We went from manually replying to 200 WhatsApp messages a day to our bot handling everything — qualification, FAQs, site visits, follow-ups. Our conversion rate jumped 40% because we stopped losing leads to slow replies.',
  quotePerson: 'Arjun M., Real Estate Agency, Pune',
  painTags: ['200 manual messages/day', 'Leads lost to slow replies', '12hrs/day wasted'],
  buildDays: '10 days',
}

// ── Category-based color system ────────────────────────────────────────────────
interface CategoryColor {
  primary: string
  secondary: string
  bg: string
  glow: string
}

const CATEGORY_COLORS: Record<string, CategoryColor> = {
  'Agentic AI':     { primary: '#a78bfa', secondary: '#7c3aed', bg: 'rgba(109,40,217,0.08)',  glow: 'rgba(167,139,250,0.3)' },
  'AI & LLM':       { primary: '#60a5fa', secondary: '#2563eb', bg: 'rgba(37,99,235,0.08)',   glow: 'rgba(96,165,250,0.3)' },
  'Automation':     { primary: '#00e5ff', secondary: '#0891b2', bg: 'rgba(8,145,178,0.08)',   glow: 'rgba(0,229,255,0.3)' },
  'Data & Scraping':{ primary: '#fb923c', secondary: '#ea580c', bg: 'rgba(234,88,12,0.08)',   glow: 'rgba(251,146,60,0.3)' },
  'Security':       { primary: '#f87171', secondary: '#dc2626', bg: 'rgba(220,38,38,0.08)',   glow: 'rgba(248,113,113,0.3)' },
}

const DEFAULT_COLOR: CategoryColor = CATEGORY_COLORS['Automation']

function getCategoryColor(category: string): CategoryColor {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLOR
}

// ── GlitchText: random chars → settle into real text ──────────────────────────
const GLITCH_CHARS = '!@#$%^&*<>?/|{}[]0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function GlitchText({
  text,
  startFrame = 0,
  settleDuration = 40,
  color = '#00e5ff',
  fontSize = 48,
  fontWeight = 700,
  fontFamily = 'ui-monospace, Menlo, monospace',
  letterSpacing = '0.05em',
}: {
  text: string
  startFrame?: number
  settleDuration?: number
  color?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  letterSpacing?: string
}) {
  const frame = useCurrentFrame()

  return (
    <span
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        fontFamily,
        color,
        fontSize,
        fontWeight,
        lineHeight: 1.1,
        letterSpacing,
      }}
    >
      {text.split('').map((char, i) => {
        if (char === ' ')
          return (
            <span
              key={i}
              style={{ display: 'inline-block', width: fontSize * 0.3 }}
            />
          )

        const localFrame = frame - startFrame
        const settleAt = Math.round(
          (i / Math.max(1, text.replace(/ /g, '').length)) * settleDuration
        )
        const settled = localFrame >= settleAt
        const progress = Math.max(0, localFrame - settleAt)

        let displayChar = char
        if (!settled) {
          const glitchIndex = Math.floor(
            (localFrame * (i + 7)) % GLITCH_CHARS.length
          )
          displayChar =
            localFrame < 0 ? ' ' : (GLITCH_CHARS[glitchIndex] ?? char)
        }

        const opacity = localFrame < 0 ? 0 : 1
        const glitchColor = !settled && localFrame >= 0 ? `${color}99` : color
        const textShadow =
          !settled && localFrame >= 0
            ? `0 0 8px ${color}cc`
            : progress < 5
              ? `0 0 ${interpolate(progress, [0, 5], [12, 0])}px ${color}99`
              : 'none'

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              color: glitchColor,
              textShadow,
              transition: 'none',
            }}
          >
            {displayChar}
          </span>
        )
      })}
    </span>
  )
}

// ── TypewriterText: types letter by letter ─────────────────────────────────────
function TypewriterText({
  text,
  startFrame = 0,
  charDelay = 3,
  color = '#e2e8f0',
  fontSize = 20,
  fontWeight = 400,
  fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  cursorColor = '#00e5ff',
}: {
  text: string
  startFrame?: number
  charDelay?: number
  color?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  cursorColor?: string
}) {
  const frame = useCurrentFrame()
  const localFrame = frame - startFrame
  const charsToShow = Math.floor(Math.max(0, localFrame) / charDelay)

  return (
    <span
      style={{
        fontFamily,
        color,
        fontSize,
        fontWeight,
        lineHeight: 1.6,
      }}
    >
      {text.slice(0, charsToShow)}
      {charsToShow < text.length && localFrame >= 0 && (
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: fontSize,
            background: cursorColor,
            marginLeft: 2,
            opacity: Math.floor(localFrame / 8) % 2 === 0 ? 1 : 0,
            verticalAlign: 'middle',
          }}
        />
      )}
    </span>
  )
}

// ── Scene 1: CINEMATIC TITLE CARD ─────────────────────────────────────────────
function Scene1({
  title,
  tagline,
  category,
}: {
  title: string
  tagline: string
  category: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const c = getCategoryColor(category)

  // Animated glow orb opacity 0 → 0.6
  const glowOpacity = interpolate(frame, [0, 30], [0, 0.6], {
    extrapolateRight: 'clamp',
  })

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // Category badge slides in
  const badgeProg = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 200, damping: 15, mass: 0.8 },
  })
  const badgeOpacity = interpolate(badgeProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const badgeX = interpolate(badgeProg, [0, 1], [-30, 0])

  // Title springs in — huge, 72px
  const titleProg = spring({
    frame: frame - 18,
    fps,
    config: { stiffness: 200, damping: 15, mass: 0.8 },
  })
  const titleY = interpolate(titleProg, [0, 1], [50, 0])
  const titleOpacity = interpolate(titleProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Tagline fades in at frame 20
  const taglineOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Bottom decorative line: 0 → 120px
  const lineWidth = interpolate(frame, [12, 50], [0, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Top-right brand label
  const brandOpacity = interpolate(frame, [55, 72], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #050505 0%, ${c.bg.replace('0.08)', '0.25)')} 50%, #050505 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: bgOpacity,
        padding: 48,
      }}
    >
      {/* Large animated glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.glow.replace('0.3)', `${glowOpacity * 0.6})`)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Scanlines texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)',
          pointerEvents: 'none',
        }}
      />

      {/* Category badge — top-left */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 48,
          opacity: badgeOpacity,
          transform: `translateX(${badgeX}px)`,
        }}
      >
        <div
          style={{
            padding: '6px 16px',
            border: `1px solid ${c.primary}4d`,
            borderRadius: 20,
            background: c.bg,
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 10,
            fontWeight: 700,
            color: c.primary,
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
          }}
        >
          {category}
        </div>
      </div>

      {/* Top-right brand label */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 48,
          opacity: brandOpacity,
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.06em',
        }}
      >
        chiranjib.xyz
      </div>

      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          maxWidth: 1000,
        }}
      >
        {/* HUGE title — 72px, springs in */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: 72,
              fontWeight: 700,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              lineHeight: 1.05,
              display: 'block',
              textShadow: `0 0 80px ${c.glow}`,
            }}
          >
            {title}
          </span>
        </div>

        {/* Tagline — italic, primary color */}
        <div style={{ opacity: taglineOpacity, marginBottom: 32 }}>
          <span
            style={{
              color: c.primary,
              fontSize: 24,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
            }}
          >
            {tagline}
          </span>
        </div>

        {/* Decorative line: animated 0 → 120px, gradient */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, ${c.primary} 0%, transparent 100%)`,
            margin: '0 auto',
            boxShadow: `0 0 12px ${c.glow}`,
          }}
        />
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 2: PAIN POINT ────────────────────────────────────────────────────────
function Scene2({
  problem,
  painTags,
}: {
  problem: string
  painTags: string[]
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  // "THE PROBLEM" label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // Pain icon springs in at frame 30 with bounce
  const iconProg = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 220, damping: 8, mass: 0.8 },
  })
  const iconScale = interpolate(iconProg, [0, 0.5, 1], [0.2, 1.3, 1])
  const iconOpacity = interpolate(iconProg, [0, 0.05], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Pain tags appear staggered
  const tag1Opacity = interpolate(frame, [38, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const tag2Opacity = interpolate(frame, [46, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const tag3Opacity = interpolate(frame, [54, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const tag1X = interpolate(frame, [38, 50], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const tag2X = interpolate(frame, [46, 58], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const tag3X = interpolate(frame, [54, 66], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      {/* Red tint overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(239,68,68,0.04)',
          pointerEvents: 'none',
        }}
      />

      {/* Left red vertical bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          background: 'rgba(239,68,68,0.5)',
        }}
      />

      {/* Corner bracket decoration */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 48,
          width: 40,
          height: 40,
          borderTop: '2px solid rgba(239,68,68,0.4)',
          borderLeft: '2px solid rgba(239,68,68,0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 48,
          width: 40,
          height: 40,
          borderBottom: '2px solid rgba(239,68,68,0.4)',
          borderRight: '2px solid rgba(239,68,68,0.4)',
        }}
      />

      {/* "THE PROBLEM" glitch label */}
      <div style={{ opacity: labelOpacity, marginBottom: 24 }}>
        <GlitchText
          text="THE PROBLEM"
          startFrame={0}
          settleDuration={22}
          color="#ef4444"
          fontSize={11}
          fontWeight={700}
          fontFamily="ui-monospace, Menlo, monospace"
          letterSpacing="0.3em"
        />
      </div>

      {/* Pain icon ⚠️ */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          display: 'inline-block',
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontSize: 48,
            color: '#ef4444',
            textShadow: '0 0 24px rgba(239,68,68,0.7)',
            display: 'block',
          }}
        >
          ⚠
        </span>
      </div>

      {/* Problem typewriter in red-tinted box */}
      <div
        style={{
          padding: '28px 32px',
          border: '1px solid rgba(239,68,68,0.15)',
          borderLeft: '3px solid rgba(239,68,68,0.7)',
          borderRadius: '0 10px 10px 0',
          background: 'rgba(239,68,68,0.05)',
          maxWidth: 780,
          marginBottom: 28,
        }}
      >
        <TypewriterText
          text={problem}
          startFrame={18}
          charDelay={2}
          color="#e2e8f0"
          fontSize={28}
          fontWeight={400}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          cursorColor="#ef4444"
        />
      </div>

      {/* Pain tags — staggered */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
        {painTags.slice(0, 3).map((label, i) => {
          const opacities = [tag1Opacity, tag2Opacity, tag3Opacity]
          const xOffsets = [tag1X, tag2X, tag3X]
          return (
            <div
              key={label}
              style={{
                opacity: opacities[i] ?? 1,
                transform: `translateX(${xOffsets[i] ?? 0}px)`,
                padding: '5px 14px',
                border: '1px solid rgba(239,68,68,0.5)',
                borderRadius: 20,
                background: 'rgba(239,68,68,0.08)',
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 12,
                color: '#f87171',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </div>
          )
        })}
      </div>

      {/* Top-right brand */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 48,
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        chiranjib.xyz
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 3: THE BUILD ─────────────────────────────────────────────────────────
function Scene3({
  solution,
  category,
  buildDays,
}: {
  solution: string
  category: string
  buildDays: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const c = getCategoryColor(category)

  // "THE SOLUTION" label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // Build visualization boxes — staggered slide-ins
  const box1Prog = spring({ frame: frame - 20, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })
  const box2Prog = spring({ frame: frame - 30, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })
  const box3Prog = spring({ frame: frame - 40, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })

  const box1Y = interpolate(box1Prog, [0, 1], [30, 0])
  const box2Y = interpolate(box2Prog, [0, 1], [30, 0])
  const box3Y = interpolate(box3Prog, [0, 1], [30, 0])

  const box1Op = interpolate(box1Prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const box2Op = interpolate(box2Prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const box3Op = interpolate(box3Prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Arrow widths animate after each box
  const arrow1Width = interpolate(frame, [28, 42], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const arrow2Width = interpolate(frame, [38, 52], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // "Built in X days" badge springs in
  const badgeProg = spring({ frame: frame - 54, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })
  const badgeOp = interpolate(badgeProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const badgeScale = interpolate(badgeProg, [0, 0.5, 1], [0.7, 1.1, 1])

  const buildBoxStyle = (opacity: number, y: number) => ({
    opacity,
    transform: `translateY(${y}px)`,
    width: 100,
    height: 44,
    borderRadius: 8,
    background: `linear-gradient(135deg, ${c.bg.replace('0.08)', '0.25)')}, ${c.bg})`,
    border: `1px solid ${c.primary}66`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 11,
    color: c.primary,
    fontWeight: 600,
    letterSpacing: '0.04em',
    boxShadow: `0 0 16px ${c.glow.replace('0.3)', '0.15)')}`,
  })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #050505 0%, ${c.bg.replace('0.08)', '0.12)')} 50%, #050505 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      {/* Glow top-right */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.glow.replace('0.3)', '0.12)')} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* "THE SOLUTION" label */}
      <div style={{ opacity: labelOpacity, marginBottom: 20 }}>
        <GlitchText
          text="THE SOLUTION"
          startFrame={0}
          settleDuration={22}
          color={c.primary}
          fontSize={11}
          fontWeight={700}
          fontFamily="ui-monospace, Menlo, monospace"
          letterSpacing="0.3em"
        />
      </div>

      {/* Solution typewriter */}
      <div
        style={{
          padding: '24px 32px',
          border: `1px solid ${c.primary}33`,
          borderLeft: `3px solid ${c.primary}bb`,
          borderRadius: '0 10px 10px 0',
          background: c.bg,
          maxWidth: 780,
          marginBottom: 36,
        }}
      >
        <TypewriterText
          text={solution}
          startFrame={10}
          charDelay={2}
          color="#e2e8f0"
          fontSize={26}
          fontWeight={400}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          cursorColor={c.primary}
        />
      </div>

      {/* Build visualization: Box → Arrow → Box → Arrow → Box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginBottom: 12,
        }}
      >
        <div style={buildBoxStyle(box1Op, box1Y)}>Your Data</div>

        {/* Arrow 1 */}
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', width: arrow1Width + 20 }}>
          <div
            style={{
              height: 2,
              width: arrow1Width,
              background: `linear-gradient(90deg, ${c.primary}cc 0%, ${c.primary}44 100%)`,
              boxShadow: `0 0 6px ${c.glow}`,
              flexShrink: 0,
            }}
          />
          <span style={{ color: c.primary, fontSize: 16, marginLeft: 2, flexShrink: 0, opacity: arrow1Width > 40 ? 1 : 0 }}>▶</span>
        </div>

        <div style={buildBoxStyle(box2Op, box2Y)}>
          <span style={{ textAlign: 'center', lineHeight: 1.2 }}>
            Chiranjib&apos;s{'\n'}Build
          </span>
        </div>

        {/* Arrow 2 */}
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', width: arrow2Width + 20 }}>
          <div
            style={{
              height: 2,
              width: arrow2Width,
              background: `linear-gradient(90deg, ${c.primary}cc 0%, ${c.primary}44 100%)`,
              boxShadow: `0 0 6px ${c.glow}`,
              flexShrink: 0,
            }}
          />
          <span style={{ color: c.primary, fontSize: 16, marginLeft: 2, flexShrink: 0, opacity: arrow2Width > 40 ? 1 : 0 }}>▶</span>
        </div>

        <div style={buildBoxStyle(box3Op, box3Y)}>Result</div>
      </div>

      {/* "Built in X days" badge — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          right: 64,
          opacity: badgeOp,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div
          style={{
            padding: '9px 22px',
            border: `1px solid ${c.primary}55`,
            borderRadius: 22,
            background: c.bg,
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 12,
            color: c.primary,
            fontWeight: 600,
            letterSpacing: '0.06em',
            boxShadow: `0 0 20px ${c.glow.replace('0.3)', '0.15)')}`,
          }}
        >
          Built in {buildDays}
        </div>
      </div>

      {/* Top-right brand */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 48,
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        chiranjib.xyz
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 4: THE PROOF ─────────────────────────────────────────────────────────
function Scene4({
  resultText,
  metric,
  metricLabel,
  category,
  quote,
  quotePerson,
}: {
  resultText: string
  metric: string
  metricLabel: string
  category: string
  quote: string
  quotePerson: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const c = getCategoryColor(category)

  // Label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' })

  // Glow orb opacity pulses
  const glowOpacity = interpolate(frame, [0, 25, 50, 75], [0, 0.5, 0.3, 0.45], { extrapolateRight: 'clamp' })

  // Metric count: spring from 0 → value
  const metricFloat = parseFloat(metric.replace(/[^0-9.]/g, '')) || 0
  const counterProg = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 80, damping: 20, mass: 0.8 },
  })
  const counterValue = Math.round(interpolate(counterProg, [0, 1], [0, metricFloat]))

  // Metric springs in
  const metricProg = spring({
    frame: frame - 12,
    fps,
    config: { stiffness: 200, damping: 15, mass: 0.8 },
  })
  const metricScale = interpolate(metricProg, [0, 0.5, 1], [0.5, 1.08, 1])
  const metricOpacity = interpolate(metricProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // metricLabel
  const labelFadeOpacity = interpolate(frame, [28, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Progress bar
  const barProg = spring({ frame: frame - 30, fps, config: { stiffness: 100, damping: 16, mass: 0.8 } })
  const barWidth = interpolate(barProg, [0, 1], [0, 100])

  // resultText slides in
  const resultProg = spring({ frame: frame - 48, fps, config: { stiffness: 160, damping: 12, mass: 0.8 } })
  const resultOpacity = interpolate(resultProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const resultY = interpolate(resultProg, [0, 1], [20, 0])

  // Quote springs in at frame 40
  const quoteProg = spring({ frame: frame - 40, fps, config: { stiffness: 160, damping: 14, mass: 0.8 } })
  const quoteOpacity = interpolate(quoteProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const quoteY = interpolate(quoteProg, [0, 1], [16, 0])

  // Stat pills staggered
  const pill1Prog = spring({ frame: frame - 56, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })
  const pill2Prog = spring({ frame: frame - 62, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })
  const pill3Prog = spring({ frame: frame - 68, fps, config: { stiffness: 200, damping: 14, mass: 0.8 } })

  const pillStyle = (prog: number) => ({
    opacity: interpolate(prog, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const }),
    transform: `translateY(${interpolate(prog, [0, 1], [12, 0])}px)`,
    padding: '5px 14px',
    border: `1px solid ${c.primary}44`,
    borderRadius: 20,
    background: c.bg,
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 12,
    color: c.primary,
    fontWeight: 600,
  })

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      {/* Category color glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '15%',
          transform: 'translate(-50%, -50%)',
          width: 480,
          height: 360,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.glow.replace('0.3)', `${glowOpacity * 0.5})`)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* "THE RESULT" glitch label */}
      <div style={{ opacity: labelOpacity, marginBottom: 20 }}>
        <GlitchText
          text="THE RESULT"
          startFrame={0}
          settleDuration={22}
          color={c.primary}
          fontSize={11}
          fontWeight={700}
          fontFamily="ui-monospace, Menlo, monospace"
          letterSpacing="0.3em"
        />
      </div>

      {/* MASSIVE metric — 120px */}
      <div
        style={{
          opacity: metricOpacity,
          transform: `scale(${metricScale})`,
          transformOrigin: 'left center',
          marginBottom: 4,
        }}
      >
        <span
          style={{
            color: c.primary,
            fontSize: 120,
            fontWeight: 700,
            fontFamily: 'ui-monospace, Menlo, monospace',
            lineHeight: 1,
            textShadow: `0 0 60px ${c.glow}`,
          }}
        >
          {counterValue.toLocaleString()}
        </span>
      </div>

      {/* metricLabel */}
      <div style={{ opacity: labelFadeOpacity, marginBottom: 20 }}>
        <span
          style={{
            color: 'rgba(148,163,184,0.8)',
            fontSize: 18,
            fontFamily: 'ui-monospace, Menlo, monospace',
          }}
        >
          {metricLabel}
        </span>
      </div>

      {/* Quote blockquote — springs in at frame 40 */}
      <div
        style={{
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          maxWidth: 680,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            color: c.primary,
            fontSize: 48,
            lineHeight: 0.6,
            display: 'block',
            marginBottom: 4,
            fontFamily: 'Georgia, serif',
          }}
        >
          &ldquo;
        </span>
        <p
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 18,
            fontStyle: 'italic',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            lineHeight: 1.5,
            margin: '0 0 6px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}
        >
          {quote}
        </p>
        <span
          style={{
            color: 'rgba(148,163,184,0.6)',
            fontSize: 13,
            fontFamily: 'ui-monospace, Menlo, monospace',
            letterSpacing: '0.03em',
          }}
        >
          — {quotePerson}
        </span>
      </div>

      {/* Animated progress bar — 6px, primary color, glow shadow */}
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          height: 6,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 6,
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${c.primary} 0%, ${c.secondary} 100%)`,
            borderRadius: 6,
            boxShadow: `0 0 16px ${c.glow}`,
          }}
        />
      </div>

      {/* resultText */}
      <div
        style={{
          opacity: resultOpacity,
          transform: `translateY(${resultY}px)`,
          padding: '16px 24px',
          border: `1px solid ${c.primary}33`,
          borderLeft: `3px solid ${c.primary}cc`,
          borderRadius: '0 10px 10px 0',
          background: c.bg,
          maxWidth: 680,
          marginBottom: 28,
        }}
      >
        <p
          style={{
            color: '#e2e8f0',
            fontSize: 22,
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {resultText}
        </p>
      </div>

      {/* 3 stat pills */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
        <div style={pillStyle(pill1Prog)}>Delivered on time</div>
        <div style={pillStyle(pill2Prog)}>Client satisfaction 5★</div>
        <div style={pillStyle(pill3Prog)}>Still running 2 years later</div>
      </div>

      {/* Top-right brand */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 48,
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        chiranjib.xyz
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 5: CLOSE THE DEAL ────────────────────────────────────────────────────
function Scene5({ category }: { category: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const c = getCategoryColor(category)

  // Glow orb
  const glowOpacity = interpolate(frame, [0, 25, 60, 90], [0, 0.55, 0.3, 0.5], {
    extrapolateRight: 'clamp',
  })

  // "Ready to automate?" springs in
  const questionProg = spring({
    frame: frame - 8,
    fps,
    config: { stiffness: 200, damping: 15, mass: 0.8 },
  })
  const questionOpacity = interpolate(questionProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const questionY = interpolate(questionProg, [0, 1], [24, 0])

  // "chiranjib.xyz" — 80px, bouncy spring
  const ctaProg = spring({
    frame: frame - 25,
    fps,
    config: { stiffness: 250, damping: 5, mass: 0.8 },
  })
  const ctaScale = interpolate(ctaProg, [0, 0.5, 1], [0.5, 1.18, 1])
  const ctaOpacity = interpolate(ctaProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // "@chiranjibai on Telegram" — primary, mono, 20px
  const handleProg = spring({ frame: frame - 46, fps, config: { stiffness: 180, damping: 14, mass: 0.8 } })
  const handleOpacity = interpolate(handleProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const handleY = interpolate(handleProg, [0, 1], [12, 0])

  // "Free consultation · Start in 48hrs"
  const subProg = spring({ frame: frame - 56, fps, config: { stiffness: 180, damping: 14, mass: 0.8 } })
  const subOpacity = interpolate(subProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // 20 decorative dots
  const dotsOpacity = interpolate(frame, [58, 72], [0, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const dotPositions = Array.from({ length: 20 }, (_, i) => ({
    x: ((i * 137.5) % 100),
    y: ((i * 83.7) % 100),
    size: 2 + (i % 3),
    delay: i * 3,
  }))

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #050505 0%, ${c.bg.replace('0.08)', '0.18)')} 60%, #050505 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.glow.replace('0.3)', `${glowOpacity * 0.55})`)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative dots */}
      <div style={{ position: 'absolute', inset: 0, opacity: dotsOpacity, pointerEvents: 'none' }}>
        {dotPositions.map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              background: c.primary,
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', position: 'relative' }}>
        {/* "Ready to automate?" — 36px */}
        <div
          style={{
            opacity: questionOpacity,
            transform: `translateY(${questionY}px)`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: 36,
              fontWeight: 700,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Ready to automate?
          </span>
        </div>

        {/* "chiranjib.xyz" — 80px, bold, bouncy */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            display: 'inline-block',
            marginBottom: 22,
          }}
        >
          <span
            style={{
              color: c.primary,
              fontSize: 80,
              fontWeight: 700,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              lineHeight: 1,
              textShadow: `0 0 80px ${c.glow}, 0 0 30px ${c.glow}`,
              display: 'block',
            }}
          >
            chiranjib.xyz
          </span>
        </div>

        {/* "@chiranjibai on Telegram" — 20px, mono, primary color */}
        <div
          style={{
            opacity: handleOpacity,
            transform: `translateY(${handleY}px)`,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              color: c.primary,
              fontSize: 20,
              fontFamily: 'ui-monospace, Menlo, monospace',
              letterSpacing: '0.04em',
            }}
          >
            @chiranjibai on Telegram
          </span>
        </div>

        {/* "Free consultation · Start in 48hrs" — muted, 14px */}
        <div style={{ opacity: subOpacity }}>
          <span
            style={{
              color: 'rgba(148,163,184,0.7)',
              fontSize: 14,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            Free consultation · Start in 48hrs
          </span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ── Main Composition ───────────────────────────────────────────────────────────
export function ServiceDemoComposition(props: Partial<ServiceDemoProps>) {
  const merged: ServiceDemoProps = {
    ...serviceDemoDefaultProps,
    ...props,
  }

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={78}>
        <Scene1
          title={merged.title}
          tagline={merged.tagline}
          category={merged.category}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({
          config: { mass: 0.8, damping: 14, stiffness: 200 },
          durationInFrames: 15,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={78}>
        <Scene2 problem={merged.problem} painTags={merged.painTags} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({
          config: { mass: 0.8, damping: 14, stiffness: 200 },
          durationInFrames: 15,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={78}>
        <Scene3 solution={merged.solution} category={merged.category} buildDays={merged.buildDays} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({
          config: { mass: 0.8, damping: 14, stiffness: 200 },
          durationInFrames: 15,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={78}>
        <Scene4
          resultText={merged.resultText}
          metric={merged.metric}
          metricLabel={merged.metricLabel}
          category={merged.category}
          quote={merged.quote}
          quotePerson={merged.quotePerson}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-bottom' })}
        timing={springTiming({
          config: { mass: 0.8, damping: 12, stiffness: 180 },
          durationInFrames: 15,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={78}>
        <Scene5 category={merged.category} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  )
}
