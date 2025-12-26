import React, { Suspense, useRef, useMemo } from 'react'
import { Text, Box, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function PhotoImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl)
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  
  useFrame(() => {
    if (meshRef.current) {
      timeRef.current += 0.02
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      const shimmer = Math.sin(timeRef.current) * 0.15 + 0.25
      material.emissiveIntensity = shimmer
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0.02]}>
      <Box args={[3.5, 4.8, 0.02]}>
        <meshStandardMaterial 
          map={texture}
          transparent={false}
          emissive="#ffffff"
          emissiveIntensity={0.25}
          metalness={0.3}
          roughness={0.2}
        />
      </Box>
    </mesh>
  )
}

function PhotoPlaceholder() {
  return (
    <>
      <mesh position={[0, 0, 0.02]}>
        <Box args={[3.5, 4.8, 0.02]}>
          <meshStandardMaterial 
            color="#f5f5f5"
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </Box>
      </mesh>
      <group position={[0, 0, 0.03]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.15}
          color="#bdbdbd"
          anchorX="center"
          anchorY="middle"
        >
          📸 Photo
        </Text>
      </group>
    </>
  )
}

function Sparkle({ index }: { index: number }) {
  const sparkleRef = useRef<THREE.Mesh>(null)
  const position = useMemo(() => {
    const angle = (index / 15) * Math.PI * 2
    const radius = 2.2 + Math.random() * 0.3
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.04
    ] as [number, number, number]
  }, [index])

  useFrame((state) => {
    if (sparkleRef.current) {
      const time = state.clock.elapsedTime
      sparkleRef.current.rotation.z = time * 2 + index
      const scale = Math.sin(time * 3 + index) * 0.5 + 1.2
      sparkleRef.current.scale.set(scale, scale, scale)
      
      const material = sparkleRef.current.material as THREE.MeshStandardMaterial
      const opacity = Math.sin(time * 4 + index) * 0.5 + 0.5
      material.opacity = opacity * 0.9
    }
  })

  return (
    <mesh ref={sparkleRef} position={position}>
      <Box args={[0.08, 0.08, 0.08]}>
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
        />
      </Box>
    </mesh>
  )
}

function GlowRing({ radius, color, intensity }: { radius: number, color: string, intensity: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.elapsedTime
      const scale = 1 + Math.sin(time * 1.5) * 0.05
      ringRef.current.scale.set(scale, scale, 1)
      
      const material = ringRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = intensity + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, 0.01]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        metalness={0.8}
        roughness={0.2}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class PhotoErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    console.log('Photo loading. Please add image.jpg to public folder.')
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function PhotoFrame({ position, imageUrl }: { position: [number, number, number], imageUrl: string }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Float animation nhẹ
      const time = state.clock.elapsedTime
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Glow halo xung quanh ảnh */}
      <GlowRing radius={2.5} color="#ffd700" intensity={0.4} />
      <GlowRing radius={2.3} color="#ff69b4" intensity={0.3} />
      
      {/* Sparkles xung quanh */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Sparkle key={i} index={i} />
      ))}
      
      {/* Ảnh chính với hiệu ứng shimmer */}
      <PhotoErrorBoundary fallback={<PhotoPlaceholder />}>
        <Suspense fallback={<PhotoPlaceholder />}>
          <PhotoImage imageUrl={imageUrl} />
        </Suspense>
      </PhotoErrorBoundary>
      
      {/* Glow shadow phía sau */}
      <mesh position={[0, -0.1, 0]}>
        <Box args={[3.8, 5.2, 0.01]}>
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.2}
            transparent={true}
            opacity={0.3}
          />
        </Box>
      </mesh>
    </group>
  )
}
