import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Group, Raycaster, Vector2 } from 'three'
import { Text, Box } from '@react-three/drei'
import { GraduationData } from '../hooks/useGraduationData'
import * as THREE from 'three'
import PhotoFrame from './PhotoFrame'

interface LetterProps {
  data: GraduationData
}

function Flower({ position, rotation, scale, index }: { position: [number, number, number], rotation: [number, number, number], scale: number, index: number }) {
  const flowerRef = useRef<Group>(null)
  const startY = position[1]

  useFrame((state) => {
    if (!flowerRef.current) return
    const time = state.clock.getElapsedTime()
    flowerRef.current.position.y = startY - (time * (0.2 + index * 0.05)) % 15
    flowerRef.current.rotation.z = Math.sin(time + index) * 0.3
    flowerRef.current.rotation.x = Math.sin(time * 0.5 + index) * 0.2
  })

  return (
    <group ref={flowerRef} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <Box args={[0.18, 0.18, 0.01]}>
          <meshStandardMaterial color="#ff69b4" />
        </Box>
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <Box args={[0.18, 0.18, 0.01]}>
          <meshStandardMaterial color="#ff69b4" />
        </Box>
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <Box args={[0.06, 0.06, 0.01]}>
          <meshStandardMaterial color="#ffd700" />
        </Box>
      </mesh>
    </group>
  )
}

function Leaf({ position, rotation, scale, index }: { position: [number, number, number], rotation: [number, number, number], scale: number, index: number }) {
  const leafRef = useRef<Group>(null)
  const startY = position[1]

  useFrame((state) => {
    if (!leafRef.current) return
    const time = state.clock.getElapsedTime()
    leafRef.current.position.y = startY - (time * (0.15 + index * 0.03)) % 15
    leafRef.current.rotation.z = Math.sin(time * 0.7 + index) * 0.5
    leafRef.current.position.x = position[0] + Math.sin(time * 0.3 + index) * 0.3
  })

  return (
    <group ref={leafRef} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <Box args={[0.25, 0.12, 0.01]}>
          <meshStandardMaterial color="#90ee90" />
        </Box>
      </mesh>
    </group>
  )
}

export default function Letter({ data }: LetterProps) {
  const letterGroupRef = useRef<Group>(null)
  const leftCoverRef = useRef<Mesh>(null)
  const rightCoverRef = useRef<Mesh>(null)
  const contentRef = useRef<Group>(null)
  const sparklesRef = useRef<Group>(null)
  const { camera, gl } = useThree()
  
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const openProgress = useRef(0)
  const sparkleIntensity = useRef(0)
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())

  const handlePointerDown = (event: any) => {
    if (isOpening || isOpen) return
    
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    
    raycaster.current.setFromCamera(mouse.current, camera)
    
    const covers = [leftCoverRef.current, rightCoverRef.current].filter(Boolean) as Mesh[]
    const intersects = raycaster.current.intersectObjects(covers)
    
    if (intersects.length > 0) {
      setIsOpening(true)
      setTimeout(() => {
        setIsOpen(true)
        setIsOpening(false)
      }, 2000)
    }
  }

  useEffect(() => {
    if (isOpening || isOpen) {
      gl.domElement.style.cursor = 'default'
      return
    }
    
    gl.domElement.style.cursor = 'pointer'
    const handleClick = (e: MouseEvent) => handlePointerDown(e)
    gl.domElement.addEventListener('click', handleClick)
    return () => {
      gl.domElement.removeEventListener('click', handleClick)
      gl.domElement.style.cursor = 'default'
    }
  }, [gl, camera, isOpening, isOpen])

  useFrame((state) => {
    if (!letterGroupRef.current || !leftCoverRef.current || !rightCoverRef.current) return

    // Float animation cho thiệp
    const time = state.clock.getElapsedTime()
    if (letterGroupRef.current) {
      letterGroupRef.current.position.y = Math.sin(time * 0.6) * 0.15
      letterGroupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02
    }

    if (isOpening) {
      sparkleIntensity.current = Math.sin(state.clock.getElapsedTime() * 8) * 0.5 + 0.5
    } else {
      sparkleIntensity.current *= 0.9
    }

    const targetProgress = isOpen ? 1 : 0
    openProgress.current += (targetProgress - openProgress.current) * 0.08

    const angle = openProgress.current * Math.PI * 0.75
    const distance = openProgress.current * 6

    if (leftCoverRef.current) {
      leftCoverRef.current.rotation.y = -angle
      leftCoverRef.current.position.x = -distance
      leftCoverRef.current.position.z = -Math.sin(angle) * 0.5
    }

    if (rightCoverRef.current) {
      rightCoverRef.current.rotation.y = angle
      rightCoverRef.current.position.x = distance
      rightCoverRef.current.position.z = -Math.sin(angle) * 0.5
    }

    if (contentRef.current) {
      const opacity = openProgress.current > 0.4 ? (openProgress.current - 0.4) / 0.6 : 0
      contentRef.current.visible = openProgress.current > 0.4
      
      const updateOpacity = (object: THREE.Object3D) => {
        if ('material' in object && object.material) {
          const material = (object.material as THREE.Material)
          if ('opacity' in material && 'transparent' in material) {
            const mat = material as THREE.MeshStandardMaterial
            mat.opacity = opacity
            mat.transparent = true
          }
        }
        object.children.forEach(child => updateOpacity(child))
      }
      
      updateOpacity(contentRef.current)
      contentRef.current.position.z = openProgress.current * 0.15
    }

    if (sparklesRef.current && isOpening) {
      sparklesRef.current.visible = true
      const children = sparklesRef.current.children as Mesh[]
      children.forEach((child, i) => {
        const time = state.clock.getElapsedTime()
        const angle = (i / children.length) * Math.PI * 2 + time * 2
        child.position.x = Math.cos(angle) * 4
        child.position.y = Math.sin(angle) * 4
        child.position.z = Math.sin(time + i) * 0.5
        const material = child.material as THREE.MeshStandardMaterial
        if (material) {
          material.emissiveIntensity = sparkleIntensity.current * 2
        }
      })
    } else if (sparklesRef.current) {
      sparklesRef.current.visible = false
    }
  })

  const letterWidth = 20
  const letterHeight = 14
  const letterDepth = 0.05

  return (
    <group ref={letterGroupRef} position={[0, 0, 0]}>
      <mesh ref={leftCoverRef} position={[0, 0, letterDepth]} rotation={[0, 0, 0]}>
        <Box args={[letterWidth / 2 + 0.1, letterHeight, letterDepth]}>
          <meshStandardMaterial
            color="#e91e63"
            metalness={0.5}
            roughness={0.15}
            emissive="#ff69b4"
            emissiveIntensity={0.15}
          />
        </Box>
        {!isOpen && !isOpening && (
          <group position={[-1.5, 0, 0.03]}>
            <Text
              position={[0, 1, 0]}
              fontSize={0.6}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              🎓
            </Text>
            <Text
              position={[0, -1.5, 0]}
              fontSize={0.25}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              Click để mở
            </Text>
          </group>
        )}
      </mesh>

      <mesh ref={rightCoverRef} position={[0, 0, letterDepth]} rotation={[0, 0, 0]}>
        <Box args={[letterWidth / 2 + 0.1, letterHeight, letterDepth]}>
          <meshStandardMaterial
            color="#e91e63"
            metalness={0.5}
            roughness={0.15}
            emissive="#ff69b4"
            emissiveIntensity={0.15}
          />
        </Box>
      </mesh>

      <group ref={contentRef} position={[0, 0, 0.01]} visible={false}>
        <mesh>
          <Box args={[letterWidth - 0.2, letterHeight - 0.2, 0.02]}>
            <meshStandardMaterial
              color="#ffffff"
              metalness={0}
              roughness={0.9}
              emissive="#ffffff"
              emissiveIntensity={0.3}
              transparent={true}
              opacity={0}
            />
          </Box>
        </mesh>

        <mesh position={[-4, 0, 0.02]}>
          <Box args={[4, 13, 0.01]}>
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.8}
              emissive="#ffffff"
              emissiveIntensity={0.2}
              transparent={true}
              opacity={0}
            />
          </Box>
        </mesh>

        <group position={[-4, 0, 0.03]}>
          <PhotoFrame position={[0, 0, 0]} imageUrl="/image.jpg" />
        </group>

        <group position={[3, 2.5, 0.02]}>
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.35}
            color="#c2185b"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
          >
            TRÂN TRỌNG KÍNH MỜI
          </Text>
          <Text
            position={[0, 0.35, 0]}
            fontSize={0.28}
            color="#c2185b"
            anchorX="center"
            anchorY="middle"
          >
            Bạn và gia đình
          </Text>
          <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
            <Box args={[6, 0.05, 0.01]}>
              <meshStandardMaterial
                color="#8b4513"
                metalness={0.4}
                roughness={0.4}
                transparent={true}
                opacity={0}
              />
            </Box>
          </mesh>
        </group>

        <group position={[3, 1.3, 0.02]}>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.28}
            color="#c2185b"
            anchorX="center"
            anchorY="middle"
          >
            Tới dự lễ tốt nghiệp
          </Text>
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.22}
            color="#c2185b"
            anchorX="center"
            anchorY="middle"
          >
            của
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.52}
            color="#880e4f"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {data.studentName}
          </Text>
          <mesh position={[0, -1, 0]} rotation={[0, 0, 0]}>
            <Box args={[6, 0.05, 0.01]}>
              <meshStandardMaterial
                color="#8b4513"
                metalness={0.4}
                roughness={0.4}
                transparent={true}
                opacity={0}
              />
            </Box>
          </mesh>
        </group>

        <group position={[3, -0.6, 0.02]}>
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.26}
            color="#c2185b"
            anchorX="center"
            anchorY="middle"
          >
            LỄ TỐT NGHIỆP ĐƯỢC CỬ HÀNH TẠI
          </Text>
          <Text
            position={[0, 0.15, 0]}
            fontSize={0.32}
            color="#880e4f"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {data.major.split(' - ')[1] || data.major.split(' - ')[0]}
          </Text>
          <Text
            position={[0, -0.25, 0]}
            fontSize={0.26}
            color="#4a148c"
            anchorX="center"
            anchorY="middle"
            maxWidth={6.5}
          >
            {data.location}
          </Text>
        </group>

        <group position={[3, -2.2, 0.02]}>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="#880e4f"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            VÀO LÚC {data.time}
          </Text>
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.3}
            color="#880e4f"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            maxWidth={7}
          >
            {data.date.split(',')[0].toUpperCase()} {data.date.split(',')[1]}
          </Text>
        </group>

        <group position={[3, -3.8, 0.02]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.24}
            color="#880e4f"
            anchorX="center"
            anchorY="middle"
            fontStyle="italic"
            maxWidth={9.5}
          >
            Sự hiện diện của bạn là niềm vinh dự cho gia đình chúng tôi
          </Text>
        </group>

        {Array.from({ length: 20 }).map((_, i) => (
          <Flower
            key={`flower-${i}`}
            position={[
              (Math.random() - 0.5) * 12,
              8 + Math.random() * 5,
              0.015
            ]}
            rotation={[0, 0, Math.random() * Math.PI * 2]}
            scale={0.6 + Math.random() * 0.4}
            index={i}
          />
        ))}

        {Array.from({ length: 15 }).map((_, i) => (
          <Leaf
            key={`leaf-${i}`}
            position={[
              (Math.random() - 0.5) * 12,
              8 + Math.random() * 5,
              0.015
            ]}
            rotation={[0, 0, Math.random() * Math.PI * 2]}
            scale={0.5 + Math.random() * 0.3}
            index={i + 20}
          />
        ))}
      </group>

      <group ref={sparklesRef} visible={false}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[0, 0, 1]}>
            <Box args={[0.12, 0.12, 0.12]}>
              <meshStandardMaterial
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0}
                metalness={0.9}
                roughness={0.1}
              />
            </Box>
          </mesh>
        ))}
      </group>
    </group>
  )
}
