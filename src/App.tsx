import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Background from './components/Background'
import GraduationCard from './components/GraduationCard'
import FloatingElements from './components/FloatingElements'
import Letter from './components/Letter'
import ShareButtons from './components/ShareButtons'
import { useGraduationData } from './hooks/useGraduationData'

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative py-20">
      <Background />
      <FloatingElements />
      <div className="relative z-10 w-full">
        <GraduationCard />
      </div>
    </section>
  )
}

function LandingPage() {
  const data = useGraduationData()
  const [isLetterOpened, setIsLetterOpened] = useState(false)

  const handleLetterOpen = () => {
    setIsLetterOpened(true)
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isLetterOpened ? (
          <Letter key="letter" onOpen={handleLetterOpen} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShareButtons />
            <HeroSection />
      
      <motion.section
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-900/10 to-black" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #ffed4e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Chúng Tôi Mong Đợi Sự Hiện Diện Của Bạn
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎓', title: 'Lễ Tốt Nghiệp', desc: 'Chúc mừng sinh viên tốt nghiệp' },
              { icon: '🌟', title: 'Thành Tựu', desc: 'Ghi nhận những nỗ lực và cống hiến' },
              { icon: '🎉', title: 'Kỷ Niệm', desc: 'Chia sẻ khoảnh khắc đáng nhớ' },
            ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 text-center relative overflow-hidden group"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                borderColor: 'rgba(212, 175, 55, 0.6)',
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3), 0 0 30px rgba(255, 215, 0, 0.2)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/10 group-hover:to-gold-500/5 transition-all duration-300" />
              <div className="relative">
                <motion.div 
                  className="text-5xl mb-4"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.footer
        className="relative py-12 px-4 border-t border-gold-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-gray-400 mb-4">
            Với sự trân trọng và biết ơn sâu sắc
          </p>
          <p className="text-lg font-serif text-gold-500">
            {data.studentName}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            & Family
          </p>
        </div>
      </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function App() {
  return <LandingPage />
}

export default App
