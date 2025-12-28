import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ParticleSparklesProps {
  x: number
  y: number
  onComplete: () => void
}

const ParticleSparkles = ({ x, y, onComplete }: ParticleSparklesProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number
    angle: number
    distance: number
    delay: number
  }>>([])

  useEffect(() => {
    const count = 12
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (360 / count) * i,
      distance: 30 + Math.random() * 40,
      delay: Math.random() * 0.2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {particles.map((particle) => {
        const radian = (particle.angle * Math.PI) / 180
        const finalX = Math.cos(radian) * particle.distance
        const finalY = Math.sin(radian) * particle.distance

        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffd700 0%, #d4af37 50%, transparent 100%)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)',
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: finalX,
              y: finalY,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => {
              if (particle.id === particles.length - 1) {
                onComplete()
              }
            }}
          />
        )
      })}
    </div>
  )
}

export default ParticleSparkles

