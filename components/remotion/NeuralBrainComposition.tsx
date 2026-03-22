/**
 * NeuralBrainComposition — Remotion + @remotion/three composition
 * 3D neural network with pulsing nodes, edges, and orbiting camera.
 * NO useState / useEffect — pure frame-driven animation.
 */
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Seeded pseudo-random number generator ─────────────────────────────────────
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// ── Node positions — deterministic, seeded (module-level, computed once) ──────
const NODE_COUNT = 20
const EDGE_PAIRS: [number, number][] = []

const NODE_POSITIONS: THREE.Vector3[] = Array.from({ length: NODE_COUNT }, (_, i) => {
  const rx = (seededRandom(i * 3 + 0) - 0.5) * 8
  const ry = (seededRandom(i * 3 + 1) - 0.5) * 5
  const rz = (seededRandom(i * 3 + 2) - 0.5) * 6
  return new THREE.Vector3(rx, ry, rz)
})

// Build ~40 edges: each node connects to its 3 nearest neighbours
;(function buildEdges() {
  for (let i = 0; i < NODE_COUNT; i++) {
    const distances: { j: number; d: number }[] = []
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue
      distances.push({ j, d: NODE_POSITIONS[i].distanceTo(NODE_POSITIONS[j]) })
    }
    distances.sort((a, b) => a.d - b.d)
    const kNearest = distances.slice(0, 3)
    for (const { j } of kNearest) {
      const exists = EDGE_PAIRS.some(([a, b]) => (a === i && b === j) || (a === j && b === i))
      if (!exists) EDGE_PAIRS.push([i, j])
    }
  }
})()

// Pre-build edge buffer geometry (module-level, reuse across renders)
const EDGE_POSITIONS: number[] = []
for (const [a, b] of EDGE_PAIRS) {
  const pa = NODE_POSITIONS[a]
  const pb = NODE_POSITIONS[b]
  EDGE_POSITIONS.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z)
}
const EDGE_GEOM = new THREE.BufferGeometry()
EDGE_GEOM.setAttribute('position', new THREE.Float32BufferAttribute(EDGE_POSITIONS, 3))

// ── Camera controller — reads frame data and updates camera each render ───────
function CameraController({ camX, camY, camZ }: { camX: number; camY: number; camZ: number }) {
  const { camera } = useThree()
  camera.position.set(camX, camY, camZ)
  camera.lookAt(0, 0, 0)
  return null
}

// ── Edge geometry (LineSegments) ─────────────────────────────────────────────
function NeuralEdges({ opacity }: { opacity: number }) {
  return (
    <lineSegments geometry={EDGE_GEOM}>
      <lineBasicMaterial
        color="#00e5ff"
        transparent
        opacity={opacity * 0.2}
        depthWrite={false}
      />
    </lineSegments>
  )
}

// ── Single pulsing node sphere ────────────────────────────────────────────────
function NeuralNode({
  position,
  index,
  frame,
  fps,
  globalOpacity,
}: {
  position: THREE.Vector3
  index: number
  frame: number
  fps: number
  globalOpacity: number
}) {
  // Pulse: scale oscillates between 0.7 and 1.3
  const pulse = Math.sin((frame / fps) * Math.PI * 2 * 0.6 + index * 0.9) * 0.3 + 1.0
  // Emissive intensity flicker
  const emissiveIntensity =
    Math.sin((frame / fps) * Math.PI * 2 * 0.4 + index * 1.3) * 0.4 + 0.9

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      scale={[pulse, pulse, pulse]}
    >
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={emissiveIntensity * globalOpacity}
        roughness={0.1}
        metalness={0.3}
        transparent
        opacity={globalOpacity * 0.92}
      />
    </mesh>
  )
}

// ── Glow halo (larger transparent sphere behind each node) ───────────────────
function NodeGlow({
  position,
  index,
  frame,
  fps,
  globalOpacity,
}: {
  position: THREE.Vector3
  index: number
  frame: number
  fps: number
  globalOpacity: number
}) {
  const pulse = Math.sin((frame / fps) * Math.PI * 2 * 0.6 + index * 0.9) * 0.3 + 1.0
  const glowScale = pulse * 2.4

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      scale={[glowScale, glowScale, glowScale]}
    >
      <sphereGeometry args={[0.14, 12, 12]} />
      <meshBasicMaterial
        color="#00e5ff"
        transparent
        opacity={0.04 * globalOpacity}
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// ── Scene (R3F component rendered inside ThreeCanvas) ────────────────────────
function NeuralScene() {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Fade in over first 20 frames, fade out over last 20 frames
  const globalOpacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Camera orbit: full 360° over the 300 frames (10 seconds)
  const orbitAngle = (frame / durationInFrames) * Math.PI * 2
  const camRadius = 14
  const camX = Math.cos(orbitAngle) * camRadius
  const camZ = Math.sin(orbitAngle) * camRadius
  const camY = Math.sin(orbitAngle * 0.4) * 2.5 // gentle vertical drift

  return (
    <>
      {/* Orbiting camera */}
      <CameraController camX={camX} camY={camY} camZ={camZ} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00e5ff" />
      <pointLight position={[-5, -5, -3]} intensity={0.5} color="#004a5c" />

      {/* Edges */}
      <NeuralEdges opacity={globalOpacity} />

      {/* Nodes */}
      {NODE_POSITIONS.map((pos, i) => (
        <NeuralNode
          key={i}
          position={pos}
          index={i}
          frame={frame}
          fps={fps}
          globalOpacity={globalOpacity}
        />
      ))}

      {/* Glow halos */}
      {NODE_POSITIONS.map((pos, i) => (
        <NodeGlow
          key={`glow-${i}`}
          position={pos}
          index={i}
          frame={frame}
          fps={fps}
          globalOpacity={globalOpacity}
        />
      ))}
    </>
  )
}

// ── Root Remotion Composition ─────────────────────────────────────────────────
export function NeuralBrainComposition() {
  const { width, height } = useVideoConfig()

  return (
    <ThreeCanvas
      width={width}
      height={height}
      style={{ background: '#050505' }}
    >
      <NeuralScene />
    </ThreeCanvas>
  )
}
