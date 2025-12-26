import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import Letter from './components/Letter'
import Particles from './components/Particles'
import AudioControl from './components/AudioControl'
import { useGraduationData } from './hooks/useGraduationData'

function Scene() {
  const data = useGraduationData()

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#fff0f5" />
      <pointLight position={[0, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -5, 5]} intensity={0.8} color="#ffe4e1" />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#ffffff" />
      <pointLight position={[8, 3, 5]} intensity={0.4} color="#ffd700" />
      
      <Particles />
      <Letter data={data} />
      
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.7} luminanceSmoothing={0.95} />
      </EffectComposer>
    </>
  )
}

function App() {
  return (
    <div className="app-container">
      <Canvas
        camera={{ position: [0, 0, 17], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <AudioControl />
    </div>
  )
}

export default App
