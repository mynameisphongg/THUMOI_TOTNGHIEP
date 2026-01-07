import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PhotoBubble {
  id: number
  src: string
  x: number
  y: number
  size: number
  delay: number
  rotation: number
}

interface FloatingPhotoBubblesProps {
  photos: string[]
  centerX?: number // Vị trí X của ảnh avatar (phần trăm)
  centerY?: number // Vị trí Y của ảnh avatar (phần trăm)
}

const FloatingPhotoBubbles = ({ photos, centerX = 20, centerY = 50 }: FloatingPhotoBubblesProps) => {
  const [bubbles, setBubbles] = useState<PhotoBubble[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set())
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Kiểm tra kích thước màn hình
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Detect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleReduced = () => setPrefersReducedMotion(mq.matches)
    handleReduced()
    if (mq.addEventListener) mq.addEventListener('change', handleReduced)
    else mq.addListener(handleReduced)

    return () => {
      window.removeEventListener('resize', checkMobile)
      if (mq.removeEventListener) mq.removeEventListener('change', handleReduced)
      else mq.removeListener(handleReduced)
    }
  }, [])


  useEffect(() => {
    if (photos.length === 0) return

    // Điều chỉnh vị trí center dựa trên mobile/desktop
    const adjustedCenterX = centerX // Sử dụng centerX được truyền vào
    const adjustedCenterY = centerY

    // Trên mobile chỉ dùng tối đa 2 ảnh để giảm tải
    const photoSources = isMobile ? photos.slice(0, 2) : photos

    const newBubbles: PhotoBubble[] = photoSources.map((photo, index) => {
      // Đặt ảnh ở các vị trí cố định để giảm tính toán động
      const positions = [
        { x: 5, y: 8 },    // Góc trên trái
        { x: 85, y: 10 },  // Góc trên phải
        { x: 8, y: 52 },   // Góc dưới trái
        { x: 82, y: 50 },  // Góc dưới phải
      ]
      
      const pos = positions[index] || {
        x: adjustedCenterX + (index % 2 === 0 ? -55 : 55),
        y: adjustedCenterY + (index < 2 ? -30 : 30),
      }

      return {
        id: index,
        src: photo,
        x: pos.x,
        y: pos.y,
        size: isMobile ? 44 + (index % 2) * 6 : 60 + (index % 2) * 8, // Kích thước nhẹ hơn
        delay: index * 0.35, // Tăng delay để chia hiệu ứng
        rotation: (index * 70) + Math.random() * 20 - 10,
      }
    })

    setBubbles(newBubbles)
  }, [photos, centerX, centerY, isMobile])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
          }}
          initial={{ opacity: 0, scale: 0, rotate: bubble.rotation }}
          animate={{
            opacity: [0.7, 1, 1, 0.9],
            scale: [0.9, 1.05, 1, 1.02],
            rotate: [bubble.rotation, bubble.rotation + 10, bubble.rotation - 10, bubble.rotation],
            // Di chuyển nhẹ xung quanh vị trí cố định
            y: [0, -8, 5, -5, 0],
            x: [0, Math.sin(bubble.id * 0.5) * 8, -Math.sin(bubble.id * 0.5) * 5, 0],
          }}
          transition={{
            duration: 6 + bubble.id * 0.3,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Bong bóng với hiệu ứng glow */}
          <div className="relative w-full h-full">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, rgba(255, 215, 0, 0.3) 50%, transparent 70%)',
                transform: 'scale(1.5)',
              }}
            />
            
            {/* Ảnh bo tròn - hover để zoom */}
            <motion.img
              src={bubble.src}
              alt={`Photo ${bubble.id + 1}`}
              loading="lazy"
              decoding="async"
              width={bubble.size}
              height={bubble.size}
              className={`relative w-full h-full rounded-full object-cover border-[3px] border-gold-400/90 shadow-2xl ${!loadedIds.has(bubble.id) ? 'bg-gray-100 animate-pulse' : ''}`}
              style={{
                boxShadow: `
                  0 0 25px rgba(212, 175, 55, 0.9),
                  0 0 50px rgba(255, 215, 0, 0.5),
                  inset 0 0 25px rgba(255, 255, 255, 0.15)
                `,
              }}
              whileHover={{
                scale: prefersReducedMotion ? 1 : 1.25,
                zIndex: 50,
              }}
              animate={prefersReducedMotion ? undefined : {
                opacity: [0.85, 1, 1, 0.95],
                scale: [0.95, 1.02, 1, 1.01],
                rotate: [bubble.rotation, bubble.rotation + 8, bubble.rotation - 6, bubble.rotation],
              }}
              transition={{ duration: 6 + bubble.id * 0.3, repeat: Infinity, delay: bubble.delay, ease: 'easeInOut' }}
              onLoad={() => setLoadedIds((prev) => new Set(prev).add(bubble.id))}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-gold-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: bubble.delay,
              }}
              style={{
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingPhotoBubbles

