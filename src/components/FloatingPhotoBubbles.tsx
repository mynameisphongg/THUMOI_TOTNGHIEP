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
  containerRef?: React.RefObject<HTMLDivElement>
  centerX?: number // Vị trí X của ảnh avatar (phần trăm)
  centerY?: number // Vị trí Y của ảnh avatar (phần trăm)
}

const FloatingPhotoBubbles = ({ photos, containerRef, centerX = 20, centerY = 50 }: FloatingPhotoBubblesProps) => {
  const [bubbles, setBubbles] = useState<PhotoBubble[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Kiểm tra kích thước màn hình
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])


  useEffect(() => {
    if (photos.length === 0) return

    // Điều chỉnh vị trí center dựa trên mobile/desktop
    const adjustedCenterX = centerX // Sử dụng centerX được truyền vào
    const adjustedCenterY = centerY

    const newBubbles: PhotoBubble[] = photos.map((photo, index) => {
      // Đặt 4 ảnh ở 4 góc rõ ràng, rời rạc nhau với khoảng cách lớn
      // Sử dụng vị trí cố định ở các góc xa nhất để đảm bảo không dính nhau
      const positions = [
        { x: 5, y: 8 },    // Góc trên trái - xa nhất có thể
        { x: 85, y: 10 },  // Góc trên phải - giảm X để không bị cắt
        { x: 8, y: 52 },   // Góc dưới trái - xa nhất có thể
        { x: 82, y: 50 },  // Góc dưới phải - giảm X để không bị cắt
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
        size: isMobile ? 50 + (index % 2) * 8 : 65 + (index % 2) * 10, // Giảm kích thước một chút
        delay: index * 0.3, // Tăng delay để tạo hiệu ứng rời rạc hơn
        rotation: (index * 90) + Math.random() * 30 - 15, // Tăng random rotation
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
              className="relative w-full h-full rounded-full object-cover border-[3px] border-gold-400/90 shadow-2xl"
              style={{
                boxShadow: `
                  0 0 25px rgba(212, 175, 55, 0.9),
                  0 0 50px rgba(255, 215, 0, 0.5),
                  inset 0 0 25px rgba(255, 255, 255, 0.15)
                `,
              }}
              whileHover={{
                scale: 1.4,
                zIndex: 50,
                boxShadow: `
                  0 0 45px rgba(212, 175, 55, 1),
                  0 0 90px rgba(255, 215, 0, 0.9),
                  inset 0 0 45px rgba(255, 255, 255, 0.35)
                `,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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

