'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function NeuralNetwork() {
  const meshRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { mouse } = useThree()
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const opacity = Math.max(0, 1 - scrollY / (vh * 0.6))
      setScrollOpacity(opacity)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { positions, linePositions } = useMemo(() => {
    const nodeCount = 180
    const nodePositions: THREE.Vector3[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        )
      )
    }

    const posArray = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      posArray[i * 3] = nodePositions[i].x
      posArray[i * 3 + 1] = nodePositions[i].y
      posArray[i * 3 + 2] = nodePositions[i].z
    }

    const lineVerts: number[] = []
    const distanceThreshold = 3.5

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j])
        if (dist < distanceThreshold) {
          lineVerts.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          )
        }
      }
    }

    return {
      positions: posArray,
      linePositions: new Float32Array(lineVerts),
    }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const t = clock.getElapsedTime()
    meshRef.current.rotation.y += 0.0003
    meshRef.current.rotation.x += 0.0001

    // Mouse parallax — subtle push toward cursor
    meshRef.current.rotation.y += mouse.x * 0.0005
    meshRef.current.rotation.x += mouse.y * 0.0003

    // Floating breathing motion
    meshRef.current.position.y = Math.sin(t * 0.2) * 0.15

    // Apply scroll opacity to materials
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.85 * scrollOpacity
    }
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.25 * scrollOpacity
    }
  })

  return (
    <group ref={meshRef}>
      {/* Node points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00e5ff"
          size={0.06}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 12], fov: 60 }}
      performance={{ min: 0.5 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true }}
    >
      <NeuralNetwork />
    </Canvas>
  )
}
