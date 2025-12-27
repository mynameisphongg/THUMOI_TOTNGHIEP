import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number; icon: string }>>([])

  useEffect(() => {
    const icons = ['🎓', '✨', '🌟', '⭐', '💫', '🎉', '🏆']
    // Giảm từ 20 xuống 12 để tối ưu hiệu suất
    const newElements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 30 + 20,
      icon: icons[Math.floor(Math.random() * icons.length)],
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            willChange: 'transform',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(element.id) * 30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + element.id * 0.5,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements







