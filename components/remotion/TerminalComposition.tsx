'use client'
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Sequence,
} from 'remotion'

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Return the first N characters of `text` based on frame progress */
function typeText(frame: number, startFrame: number, endFrame: number, text: string): string {
  const n = Math.floor(
    interpolate(frame, [startFrame, endFrame], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )
  return text.slice(0, n)
}

/** Blinking cursor character */
function Cursor({ frame }: { frame: number }) {
  const visible = Math.floor(frame / 15) % 2 === 0
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.55em',
        height: '1.1em',
        background: '#00e5ff',
        opacity: visible ? 0.9 : 0,
        verticalAlign: 'text-bottom',
        marginLeft: 2,
        borderRadius: 1,
      }}
    />
  )
}

// ── Per-line styles ───────────────────────────────────────────────────────────

const C_CMD = '#00e5ff'     // commands
const C_COMMENT = '#64748b' // comments / prompts
const C_SUCCESS = '#4ade80' // success lines
const C_WARN = '#f59e0b'    // rocket line accent

// ── Scene 1: init command ─────────────────────────────────────────────────────

const SCENE1_START = 0
const SCENE1_END = 60
const CMD1 = '$ n8n workflow init "whatsapp-lead-bot"'

function Scene1() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const opacity = spring({ frame, fps, config: { stiffness: 200, damping: 30 } })
  const typed = typeText(frame, SCENE1_START, SCENE1_END - 5, CMD1)
  const isTyping = typed.length < CMD1.length

  return (
    <div style={{ opacity, display: 'flex', alignItems: 'center', gap: 0 }}>
      <span style={{ color: C_CMD, fontFamily: 'monospace', fontSize: 18, whiteSpace: 'pre' }}>
        {typed}
      </span>
      {isTyping && <Cursor frame={frame} />}
    </div>
  )
}

// ── Scene 2: Node 1 ───────────────────────────────────────────────────────────

const SCENE2_START = 0
const SCENE2_END = 70
const LINE2 = '[✓] WhatsApp Trigger node added'
const COMMENT2 = '    # Listening on +91-XXXXXXXXXX via Meta Business API'

function Scene2() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const lineOp = spring({ frame, fps, config: { stiffness: 180, damping: 28 } })
  const typed = typeText(frame, SCENE2_START, SCENE2_END - 8, LINE2)
  const commentTyped = typeText(frame, 30, SCENE2_END, COMMENT2)
  const commentOp = interpolate(frame, [28, 35], [0, 1], { extrapolateRight: 'clamp' })
  const isTyping = typed.length < LINE2.length

  return (
    <div style={{ opacity: lineOp, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: C_SUCCESS, fontFamily: 'monospace', fontSize: 17, whiteSpace: 'pre' }}>
          {typed}
        </span>
        {isTyping && <Cursor frame={frame} />}
      </div>
      <div style={{ opacity: commentOp }}>
        <span style={{ color: C_COMMENT, fontFamily: 'monospace', fontSize: 14, whiteSpace: 'pre' }}>
          {commentTyped}
        </span>
      </div>
    </div>
  )
}

// ── Scene 3: Node 2 ───────────────────────────────────────────────────────────

const SCENE3_START = 0
const SCENE3_END = 70
const LINE3 = '[✓] OpenAI GPT-4 node connected'
const COMMENT3 = '    # Model: gpt-4o  |  temp: 0.3  |  tokens: 1024'

function Scene3() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const lineOp = spring({ frame, fps, config: { stiffness: 180, damping: 28 } })
  const typed = typeText(frame, SCENE3_START, SCENE3_END - 8, LINE3)
  const commentTyped = typeText(frame, 28, SCENE3_END, COMMENT3)
  const commentOp = interpolate(frame, [26, 33], [0, 1], { extrapolateRight: 'clamp' })
  const isTyping = typed.length < LINE3.length

  return (
    <div style={{ opacity: lineOp, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: C_SUCCESS, fontFamily: 'monospace', fontSize: 17, whiteSpace: 'pre' }}>
          {typed}
        </span>
        {isTyping && <Cursor frame={frame} />}
      </div>
      <div style={{ opacity: commentOp }}>
        <span style={{ color: C_COMMENT, fontFamily: 'monospace', fontSize: 14, whiteSpace: 'pre' }}>
          {commentTyped}
        </span>
      </div>
    </div>
  )
}

// ── Scene 4: Node 3 ───────────────────────────────────────────────────────────

const SCENE4_START = 0
const SCENE4_END = 80
const LINE4 = '[✓] CRM (HubSpot) node linked'
const COMMENT4 = '    # Contact sync  |  Pipeline: "Inbound Leads"  |  Auto-assign ON'

function Scene4() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const lineOp = spring({ frame, fps, config: { stiffness: 180, damping: 28 } })
  const typed = typeText(frame, SCENE4_START, SCENE4_END - 10, LINE4)
  const commentTyped = typeText(frame, 30, SCENE4_END, COMMENT4)
  const commentOp = interpolate(frame, [28, 36], [0, 1], { extrapolateRight: 'clamp' })
  const isTyping = typed.length < LINE4.length

  return (
    <div style={{ opacity: lineOp, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: C_SUCCESS, fontFamily: 'monospace', fontSize: 17, whiteSpace: 'pre' }}>
          {typed}
        </span>
        {isTyping && <Cursor frame={frame} />}
      </div>
      <div style={{ opacity: commentOp }}>
        <span style={{ color: C_COMMENT, fontFamily: 'monospace', fontSize: 14, whiteSpace: 'pre' }}>
          {commentTyped}
        </span>
      </div>
    </div>
  )
}

// ── Scene 5: Activation flash ─────────────────────────────────────────────────

const SCENE5_START = 0
const SCENE5_END = 80
const LINE5 = '🚀 Workflow activated! 847 leads/month automated.'

function Scene5() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Green glow flash
  const flashOp = interpolate(frame, [0, 8, 20, 80], [0, 1, 0.6, 0.8], {
    extrapolateRight: 'clamp',
  })
  const scale = spring({ frame, fps, config: { stiffness: 220, damping: 18 }, durationInFrames: 20 })
  const typed = typeText(frame, SCENE5_START, SCENE5_END - 5, LINE5)
  const isTyping = typed.length < LINE5.length

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      {/* Glow backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(74,222,128,0.18) 0%, transparent 65%)',
          opacity: flashOp,
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <span
          style={{
            color: C_SUCCESS,
            fontFamily: 'monospace',
            fontSize: 20,
            fontWeight: 700,
            whiteSpace: 'pre',
            textShadow: `0 0 20px rgba(74,222,128,${flashOp * 0.8})`,
          }}
        >
          {typed}
        </span>
        {isTyping && <Cursor frame={frame} />}
      </div>

      {/* Stats row */}
      {frame > 40 && (
        <div
          style={{
            display: 'flex',
            gap: 24,
            opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {[
            { label: 'Nodes', value: '3' },
            { label: 'Triggers', value: 'WhatsApp' },
            { label: 'Leads/mo', value: '847' },
            { label: 'Status', value: 'LIVE' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                fontFamily: 'monospace',
              }}
            >
              <span style={{ color: C_COMMENT, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {label}
              </span>
              <span
                style={{
                  color: label === 'Status' ? C_WARN : C_SUCCESS,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Composition ──────────────────────────────────────────────────────────

export function TerminalComposition() {
  const frame = useCurrentFrame()

  // Subtle scanline opacity for CRT feel
  const scanlineOp = 0.03

  return (
    <AbsoluteFill
      style={{
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      {/* Outer terminal window */}
      <div
        style={{
          width: '100%',
          maxWidth: 860,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.10)',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.04)',
          position: 'relative',
        }}
      >
        {/* ── Title bar ── */}
        <div
          style={{
            background: '#1a1a1a',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Traffic-light dots */}
          {['#ef4444', '#f59e0b', '#4ade80'].map((color, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: color,
                opacity: 0.85,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: 8,
              color: '#475569',
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.04em',
            }}
          >
            n8n-workflow-builder — bash
          </span>
        </div>

        {/* ── Terminal body ── */}
        <div
          style={{
            background: '#0d0d0d',
            padding: '28px 32px',
            minHeight: 380,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Scanlines overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              opacity: scanlineOp,
              pointerEvents: 'none',
            }}
          />

          {/* Ambient cyan glow top-left */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              left: -40,
              width: 300,
              height: 200,
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Scene 1 — always visible once frame > 0 */}
          <Sequence from={SCENE1_START} durationInFrames={390}>
            <Scene1 />
          </Sequence>

          {/* Scene 2 */}
          <Sequence from={60} durationInFrames={330}>
            <Scene2 />
          </Sequence>

          {/* Scene 3 */}
          <Sequence from={130} durationInFrames={260}>
            <Scene3 />
          </Sequence>

          {/* Scene 4 */}
          <Sequence from={200} durationInFrames={190}>
            <Scene4 />
          </Sequence>

          {/* Scene 5 */}
          <Sequence from={280} durationInFrames={110}>
            <Scene5 />
          </Sequence>

          {/* Idle cursor when nothing is being typed and all done */}
          {frame < 5 && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: C_COMMENT, fontFamily: 'monospace', fontSize: 16 }}>$ </span>
              <Cursor frame={frame} />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  )
}
