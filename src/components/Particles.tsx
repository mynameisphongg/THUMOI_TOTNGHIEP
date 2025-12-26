import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'
import { Points as PointsImpl } from '@react-three/drei'

const PARTICLE_COUNT = 600

function ParticleField() {
  const pointsRef = useRef<Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    
    return pos
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.015
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.03
  })

  return (
    <PointsImpl ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <pointsMaterial
        size={0.15}
        color="#ffd700"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </PointsImpl>
  )
}

export default ParticleField
