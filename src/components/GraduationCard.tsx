import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text, Box } from '@react-three/drei'
import { GraduationData } from '../hooks/useGraduationData'

interface GraduationCardProps {
  data: GraduationData
}

export default function GraduationCard({ data }: GraduationCardProps) {
  const cardRef = useRef<Mesh>(null)
  const lightRef = useRef<Mesh>(null)
  const { viewport, mouse } = useThree()
  
  const floatOffset = useRef(0)
  const lightPosition = useRef(0)

  useFrame((state) => {
    if (!cardRef.current || !lightRef.current) return

    const time = state.clock.getElapsedTime()
    
    floatOffset.current = Math.sin(time * 0.5) * 0.1
    
    cardRef.current.position.y = floatOffset.current
    
    const parallaxX = (mouse.x * viewport.width) * 0.1
    const parallaxY = (mouse.y * viewport.height) * 0.1
    
    cardRef.current.rotation.x = parallaxY * 0.1
    cardRef.current.rotation.y = parallaxX * 0.1
    
    lightPosition.current = (time * 0.3) % (Math.PI * 2)
    const lightX = Math.cos(lightPosition.current) * 3
    const lightZ = Math.sin(lightPosition.current) * 3
    
    lightRef.current.position.set(lightX, 2, lightZ)
  })

  const cardSize: [number, number, number] = [6, 8, 0.1]

  return (
    <group>
      <mesh ref={cardRef} position={[0, 0, 0]}>
        <Box args={cardSize}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.3}
            roughness={0.2}
            emissive="#0a0a1a"
            emissiveIntensity={0.2}
          />
        </Box>
        
        <group position={[0, 2.5, 0.06]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.6}
            color="#ffd700"
            anchorX="center"
            anchorY="middle"
          >
            GRADUATION CEREMONY
          </Text>
        </group>

        <group position={[0, 1.2, 0.06]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {data.studentName}
          </Text>
        </group>

        <group position={[0, 0.3, 0.06]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.25}
            color="#b0b0b0"
            anchorX="center"
            anchorY="middle"
          >
            {data.major}
          </Text>
        </group>

        <group position={[0, -0.8, 0.06]}>
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.2}
            color="#4a90e2"
            anchorX="center"
            anchorY="middle"
          >
            {data.date}
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.2}
            color="#4a90e2"
            anchorX="center"
            anchorY="middle"
          >
            {data.time}
          </Text>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.2}
            color="#4a90e2"
            anchorX="center"
            anchorY="middle"
          >
            {data.location}
          </Text>
        </group>
      </mesh>

      <mesh ref={lightRef}>
        <pointLight
          intensity={2}
          distance={10}
          color="#ffd700"
          decay={2}
        />
      </mesh>

      <mesh position={[0, 0, -0.05]}>
        <Box args={[6.2, 8.2, 0.05]}>
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.1}
          />
        </Box>
      </mesh>
    </group>
  )
}

