'use client'
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import * as THREE from 'three'

// ── Client location data ───────────────────────────────────────────────────────
interface CityPin {
  name: string
  lat: number
  lng: number
}

const CLIENT_CITIES: CityPin[] = [
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Delhi', lat: 28.6139, lng: 77.209 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  { name: 'Berlin', lat: 52.52, lng: 13.405 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Riyadh', lat: 24.7136, lng: 46.6753 },
]

// Convert lat/lng (degrees) to 3D cartesian on unit sphere
function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (lat * Math.PI) / 180
  const theta = (lng * Math.PI) / 180
  const x = radius * Math.cos(phi) * Math.sin(theta)
  const y = radius * Math.sin(phi)
  const z = radius * Math.cos(phi) * Math.cos(theta)
  return [x, y, z]
}

// ── Scene (inside ThreeCanvas) ─────────────────────────────────────────────────
// NOTE: No useState/useEffect per Remotion rules.
// Rotation is driven directly from frame number, passed as props.
function GlobeScene({ frame, fps }: { frame: number; fps: number }) {
  const rotationY = (frame / fps) * 0.3

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -2, -3]} intensity={0.3} color="#00e5ff" />

      {/* Globe group — rotation applied declaratively via prop */}
      <group rotation={[0, rotationY, 0]}>
        {/* Solid sphere — dark navy */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#0a1628" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Wireframe overlay — cyan at 15% opacity */}
        <mesh>
          <sphereGeometry args={[1.002, 32, 32]} />
          <meshBasicMaterial
            color="#00e5ff"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Ambient glow rim */}
        <mesh>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Client pins — inside the group so they rotate with the globe */}
        {CLIENT_CITIES.map((city, index) => {
          const delay = index * 15
          const popProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 220 },
          })

          const pinScale = interpolate(popProgress, [0, 1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })

          // Pulse animation
          const pulse = 1 + Math.sin((frame / fps) * 2 + index) * 0.18 * pinScale

          const [px, py, pz] = latLngToXYZ(city.lat, city.lng, 1.0)
          const finalScale = pinScale * pulse * 0.035

          return (
            <mesh key={city.name} position={[px, py, pz]} scale={[finalScale, finalScale, finalScale]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={2.5}
                roughness={0}
                metalness={0}
              />
            </mesh>
          )
        })}
      </group>
    </>
  )
}

// ── Main Remotion Composition ──────────────────────────────────────────────────
export function GlobeComposition() {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  // Fade in the whole scene
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: '#050505' }}>
      {/* 3D Globe */}
      <div style={{ opacity: fadeIn, width: '100%', height: '100%' }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 3], fov: 45 }}
        >
          <GlobeScene frame={frame} fps={fps} />
        </ThreeCanvas>
      </div>

      {/* Label overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: interpolate(frame, [30, 50], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            borderRadius: 999,
            padding: '6px 18px',
            color: '#00e5ff',
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          50+ Clients · 12 Countries
        </div>
      </div>
    </AbsoluteFill>
  )
}
