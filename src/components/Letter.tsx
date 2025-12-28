import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface LetterProps {
  onOpen: () => void
}

const Letter = ({ onOpen }: LetterProps) => {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (isOpening || isOpen) return
    
    setIsOpening(true)
    setTimeout(() => {
      setIsOpen(true)
      setIsOpening(false)
      onOpen()
    }, 1200) // Thời gian animation mở thư
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            className="absolute inset-0 cursor-pointer w-screen h-screen"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Phong bì đóng - Full màn hình, chia làm 2 nửa */}
            <div className="absolute inset-0 w-screen h-screen">
              {/* Nửa trái phong bì */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full origin-left"
                animate={isOpening ? {
                  rotateY: [0, -180],
                  x: [0, -50],
                } : {
                  rotateY: 0,
                  x: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Background với gradient đẹp */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-rose-100 border-r-4 border-amber-400 shadow-2xl">
                  {/* Pattern trang trí */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  {/* Đường viền trang trí bên trong */}
                  <div className="absolute inset-8 border-2 border-dashed border-amber-300/60 rounded-lg" />
                  
                  {/* Tem thư - đẹp hơn */}
                  <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-xl border-4 border-red-800 z-10 transform rotate-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                    <span className="text-3xl relative z-10">✉️</span>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold-500 rounded-full border-2 border-white shadow-lg" />
                  </div>
                  
                  {/* Hoa văn góc */}
                  <div className="absolute top-4 left-4 w-16 h-16 opacity-20">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="#d4af37" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Nửa phải phong bì */}
              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full origin-right"
                animate={isOpening ? {
                  rotateY: [0, 180],
                  x: [0, 50],
                } : {
                  rotateY: 0,
                  x: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Background với gradient đẹp */}
                <div className="absolute inset-0 bg-gradient-to-bl from-amber-100 via-amber-50 to-rose-100 border-l-4 border-amber-400 shadow-2xl">
                  {/* Pattern trang trí */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  {/* Đường viền trang trí bên trong */}
                  <div className="absolute inset-8 border-2 border-dashed border-amber-300/60 rounded-lg" />
                  
                  {/* Hoa văn góc */}
                  <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="#d4af37" />
                    </svg>
                  </div>
                  
                  {/* Hoa văn góc dưới */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 opacity-15">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="30" fill="#d4af37" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Đường viền giữa trang trí */}
              {!isOpening && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-amber-400 to-transparent z-20" />
              )}

              {/* Nội dung hiển thị khi mở */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <div className="text-center px-8">
                      <motion.div
                        className="relative mb-6"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.8, 
                          type: 'spring', 
                          stiffness: 200,
                        }}
                      >
                        <div className="absolute inset-0 bg-amber-400 rounded-full blur-2xl opacity-50" />
                        <motion.span
                          className="relative text-7xl md:text-8xl block"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ 
                            delay: 1,
                            duration: 0.6,
                            ease: 'easeInOut',
                            repeat: 1
                          }}
                        >
                          🎓
                        </motion.span>
                      </motion.div>
                      <motion.p
                        className="text-amber-900 font-serif text-2xl md:text-3xl font-bold mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        Đang mở thư...
                      </motion.p>
                      <motion.div
                        className="flex justify-center gap-2 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hướng dẫn click - nằm giữa màn hình */}
              {!isOpening && (
                <motion.div
                  className="absolute text-center z-30"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: ['-50%', '-50%'],
                    y: ['-50%', '-65%', '-50%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    className="relative bg-gradient-to-br from-white via-amber-50 to-rose-50 backdrop-blur-md rounded-3xl px-12 py-10 shadow-2xl border-4 border-amber-400/50"
                    whileHover={{ scale: 1.08, boxShadow: '0 25px 50px rgba(212, 175, 55, 0.4)' }}
                    style={{
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {/* Hiệu ứng ánh sáng phía sau */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 rounded-3xl opacity-20 blur-xl -z-10 animate-pulse" />
                    
                    {/* Icon envelope lớn */}
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      ✉️
                    </motion.div>
                    
                    {/* Text chính */}
                    <motion.p
                      className="text-amber-900 font-serif text-2xl md:text-3xl mb-6 font-bold relative"
                      style={{
                        textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      Nhấn để mở thư
                    </motion.p>
                    
                    {/* Icon tay chỉ */}
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        scale: [1, 1.5, 1],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      👆
                    </motion.div>
                    
                    {/* Dots trang trí */}
                    <div className="flex justify-center gap-2 mt-4">
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                    
                    {/* Đường viền trang trí bên trong */}
                    <div className="absolute inset-4 border-2 border-amber-300/30 rounded-2xl pointer-events-none" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Letter
