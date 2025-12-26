import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGraduationData } from '../hooks/useGraduationData'
import ConfirmationModal from './ConfirmationModal'

const containerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ 
    id: number
    x: number
    delay: number
    color: string
    xOffset1: number
    xOffset2: number
    duration: number
  }>>([])

  useEffect(() => {
    const colors = ['#d4af37', '#ffd700', '#ffed4e', '#fff59d', '#ffc107']
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      xOffset1: Math.random() * 100 - 50,
      xOffset2: Math.random() * 100 - 50,
      duration: 3 + Math.random() * 2,
    }))
    setConfettiPieces(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            boxShadow: `0 0 8px ${piece.color}`,
          }}
          initial={{ y: -10, opacity: 0, rotate: 0, x: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1000,
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: [0, piece.xOffset1, piece.xOffset2],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

const DecorativeDivider = () => (
  <div className="flex items-center justify-center gap-2 my-6">
    <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-16" />
    <div className="w-2 h-2 bg-gold-500 rounded-full" />
    <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent flex-1 max-w-xs" />
    <div className="w-2 h-2 bg-gold-500 rounded-full" />
    <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-16" />
  </div>
)

const GraduationCard = () => {
  const data = useGraduationData()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirm = () => {
    setIsModalOpen(true)
  }

  const handleModalConfirm = (formData: { name: string; phone: string; guests: number; message: string }) => {
    console.log('Confirmation data:', formData)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
      <motion.div
        className="relative z-10 max-w-5xl mx-auto p-4 sm:p-8 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative bg-gradient-to-br from-white via-white to-gray-50 rounded-[2rem] p-8 sm:p-12 md:p-16 shadow-2xl"
          style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(212, 175, 55, 0.2), inset 0 0 100px rgba(255, 255, 255, 0.1)',
          }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          variants={itemVariants}
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-gold-500/20 pointer-events-none" />
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-5xl shadow-xl"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🎓
            </motion.div>
          </div>

          <div className="pt-12">
            <motion.div
              className="text-center mb-10"
              variants={itemVariants}
            >
              <motion.div
                className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-gold-100 to-gold-50 rounded-full border border-gold-200"
                variants={itemVariants}
              >
                <p className="text-xs sm:text-sm font-sans font-semibold text-gold-700 tracking-widest uppercase">
                  Thư Mời
                </p>
              </motion.div>
              
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #d4af37 50%, #1a1a1a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                variants={itemVariants}
              >
                LỄ TỐT NGHIỆP
              </motion.h1>
              
              <DecorativeDivider />
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-10">
              <motion.div
                className="flex-shrink-0 relative"
                variants={itemVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full blur-xl opacity-50 animate-pulse" />
                <motion.img
                  src="/image.jpg"
                  alt={data.studentName}
                  className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-gold-500 shadow-2xl"
                  style={{
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.2)',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
              
              <motion.div className="text-center md:text-left flex-1" variants={itemVariants}>
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl font-sans mb-3 text-gray-600"
                  variants={itemVariants}
                >
                  Trân trọng kính mời
                </motion.p>
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #ffed4e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  variants={itemVariants}
                >
                  {data.studentName}
                </motion.h2>
                <motion.p 
                  className="text-base sm:text-lg md:text-xl font-sans text-gray-700 font-medium"
                  variants={itemVariants}
                >
                  {data.major}
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              className="space-y-6 text-gray-800 mb-10"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-gradient-to-br from-gold-50 to-white p-6 rounded-2xl border border-gold-100 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  variants={itemVariants}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-3">📅</div>
                    <p className="font-sans text-xs text-gray-500 uppercase tracking-wider mb-2">Ngày</p>
                    <p className="font-serif text-lg font-bold text-gray-800">{data.date.split(',')[0]}</p>
                    <p className="font-serif text-base text-gray-700">{data.date.split(',')[1]}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-gold-50 to-white p-6 rounded-2xl border border-gold-100 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  variants={itemVariants}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-3">🕐</div>
                    <p className="font-sans text-xs text-gray-500 uppercase tracking-wider mb-2">Thời gian</p>
                    <p className="font-serif text-2xl font-bold text-gray-800">{data.time}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-gold-50 to-white p-6 rounded-2xl border border-gold-100 shadow-lg md:col-span-1"
                  whileHover={{ scale: 1.02, y: -2 }}
                  variants={itemVariants}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-3">📍</div>
                    <p className="font-sans text-xs text-gray-500 uppercase tracking-wider mb-2">Địa điểm</p>
                    <p className="font-serif text-base font-bold text-gray-800">{data.location}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <DecorativeDivider />

            <motion.div
              className="text-center mb-10"
              variants={itemVariants}
            >
              <p className="font-serif italic text-lg sm:text-xl text-gray-700 leading-relaxed">
                "Sự hiện diện của bạn là niềm vinh dự<br className="hidden sm:block" />
                cho gia đình chúng tôi"
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                className="relative px-8 py-4 bg-gradient-to-r from-luxury-black via-gray-900 to-luxury-black rounded-full font-sans font-semibold text-base shadow-xl overflow-hidden group"
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
              >
                <span className="relative z-10 text-white">Xác nhận tham dự</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-500 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-luxury-black text-luxury-black rounded-full font-sans font-semibold text-base bg-white hover:bg-luxury-black hover:text-white transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const startDate = new Date('2026-01-09T09:00:00')
                  const endDate = new Date('2026-01-09T11:00:00')
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lễ Tốt Nghiệp - ${encodeURIComponent(data.studentName)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}&details=${encodeURIComponent(data.major)}&location=${encodeURIComponent(data.location)}`
                  window.open(googleCalendarUrl, '_blank')
                }}
              >
                📅 Lưu vào Google Calendar
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default GraduationCard
