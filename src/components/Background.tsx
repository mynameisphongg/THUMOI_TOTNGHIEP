import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Background = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; size: number }>>([])
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Giảm particles từ 100 xuống 50 để tối ưu hiệu suất
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 1,
    }))
    setParticles(newParticles)

    // Giảm floating elements từ 15 xuống 8
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      delay: Math.random() * 5,
    }))
    setFloatingElements(elements)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2d1b1b 40%, #1a0f1a 60%, #1a1a1a 80%, #0a0a0a 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2d1b1b 40%, #1a0f1a 60%, #1a1a1a 80%, #0a0a0a 100%)',
            'linear-gradient(225deg, #0a0a0a 0%, #1a1a1a 20%, #2d1b1b 40%, #1a0f1a 60%, #1a1a1a 80%, #0a0a0a 100%)',
            'linear-gradient(315deg, #0a0a0a 0%, #1a1a1a 20%, #2d1b1b 40%, #1a0f1a 60%, #1a1a1a 80%, #0a0a0a 100%)',
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2d1b1b 40%, #1a0f1a 60%, #1a1a1a 80%, #0a0a0a 100%)',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(255, 215, 0, 0.2) 30%, transparent 70%)',
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
          animate={{
            x: [0, Math.sin(element.id) * 100, 0],
            y: [0, Math.cos(element.id) * 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15 + element.id * 2,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)
          `,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.9) 0%, rgba(255, 215, 0, 0.6) 40%, transparent 70%)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(255, 215, 0, 0.4)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.8, 0.5],
            x: [0, Math.sin(index) * 30, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
    </div>
  )
}

export default Background
