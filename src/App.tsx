import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Background from './components/Background'
import GraduationCard from './components/GraduationCard'
import FloatingElements from './components/FloatingElements'
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

  return (
    <div className="relative">
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
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(212, 175, 55, 0.5)' }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
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
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
