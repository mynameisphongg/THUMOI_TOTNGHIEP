import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Background from './components/Background'
import GraduationCard from './components/GraduationCard'
import FloatingElements from './components/FloatingElements'
import Letter from './components/Letter'

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
            <HeroSection />
            
            {/* Section Timeline Hành Trình */}
            <motion.section
              className="relative py-24 px-4 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black via-gold-950/30 to-black" />
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
              </div>
              
              <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                  className="text-center mb-16"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="inline-block mb-6"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
git                    <span className="text-7xl"></span>
                  </motion.div>
                  <h2
                    className="text-4xl md:text-5xl font-serif font-bold mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #ffed4e 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Hành Trình 4 Năm Đại Học
                  </h2>
                  <p className="text-gray-400 text-lg font-sans">
                    Một chặng đường đầy kỷ niệm, trưởng thành và tình bạn
                  </p>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6" />
                </motion.div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500 transform md:-translate-x-1/2" />
                  
                  <div className="space-y-10 md:space-y-12">
                    {[
                      {
                        year: 'Những Ngày Đầu',
                        title: 'Bỡ Ngỡ Và Lo Lắng',
                        description: 'Từ những ngày đầu bước chân vào giảng đường với bao bỡ ngỡ và lo lắng, mọi thứ đều mới mẻ – từ môi trường học tập, cách học, cho đến những con người xa lạ xung quanh.',
                        icon: '🌱',
                        side: 'left',
                      },
                      {
                        year: 'Tình Bạn Đại Học',
                        title: 'Cùng Nhau Đồng Hành',
                        description: 'Rồi những người bạn đại học xuất hiện, cùng nhau học tập, cùng nhau chia sẻ áp lực, động viên nhau qua từng môn học, từng đồ án và những kỳ thi đầy cam go. Có những lúc vừa sợ, vừa mệt, vừa hoang mang, nhưng ai cũng cố gắng hết mình, cùng nhau phấn đấu để đạt được kết quả tốt nhất.',
                        icon: '👥',
                        side: 'right',
                      },
                      {
                        year: 'Trưởng Thành',
                        title: 'Đi Trọn Vẹn 4 Năm',
                        description: 'Trong suốt quãng thời gian ấy, không tránh khỏi những mâu thuẫn nhỏ, những hiểu lầm không đáng có. Nhưng sau tất cả, chúng mình vẫn cùng nhau đi trọn vẹn 4 năm đại học – trưởng thành hơn, mạnh mẽ hơn và hiểu nhau hơn.',
                        icon: '🌳',
                        side: 'left',
                      },
                      {
                        year: 'Hôm Nay',
                        title: 'Nhìn Lại Chặng Đường',
                        description: 'Ngày hôm nay, khi nhìn lại chặng đường đã qua, chỉ mong rằng mỗi người trong chúng ta đều tìm được một công việc ổn định, một con đường phù hợp để tiếp tục theo đuổi ước mơ của riêng mình.',
                        icon: '🏆',
                        side: 'right',
                        highlight: true,
                      },
                      {
                        year: 'Tương Lai',
                        title: 'Tình Bạn Bền Lâu',
                        description: 'Và mong rằng sau này, dù mỗi người một hướng, chúng ta vẫn còn những buổi hẹn cà phê, những lần gặp gỡ, những câu chuyện cũ được nhắc lại – để không ai bị lãng quên, để tình bạn đại học vẫn luôn ở đó, giản dị và bền lâu.',
                        icon: '☕',
                        side: 'left',
                      },
                      {
                        year: 'Lời Cảm Ơn',
                        title: 'Trân Trọng Và Biết Ơn',
                        description: 'Xin gửi lời cảm ơn chân thành đến gia đình, bạn bè, thầy cô và tất cả những người đã luôn bên cạnh, động viên và giúp đỡ – để có được Ngọc Phong của ngày hôm nay.',
                        icon: '🙏',
                        side: 'right',
                      },
                    ].map((milestone, index) => (
                      <motion.div
                        key={index}
                        className={`relative flex items-center ${
                          milestone.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                        initial={{ opacity: 0, x: milestone.side === 'left' ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10 ${
                          milestone.highlight ? 'w-6 h-6' : 'w-4 h-4'
                        }`}>
                          <motion.div
                            className={`w-full h-full rounded-full ${
                              milestone.highlight
                                ? 'bg-gold-400 border-4 border-gold-600 shadow-lg shadow-gold-500/50'
                                : 'bg-gold-500 border-2 border-gold-300'
                            }`}
                            animate={milestone.highlight ? {
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                '0 0 0 0 rgba(212, 175, 55, 0.7)',
                                '0 0 0 10px rgba(212, 175, 55, 0)',
                                '0 0 0 0 rgba(212, 175, 55, 0)',
                              ],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: milestone.highlight ? Infinity : 0,
                              repeatDelay: 1,
                            }}
                          />
                        </div>

                        {/* Content card */}
                        <motion.div
                          className={`flex-1 ml-16 md:ml-0 ${
                            milestone.side === 'left' ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'
                          } md:w-5/12`}
                          whileHover={{ scale: 1.05, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`bg-gradient-to-br ${
                            milestone.highlight
                              ? 'from-gold-900/60 via-gold-800/50 to-black/70 border-gold-400 shadow-2xl shadow-gold-500/30'
                              : 'from-gold-900/40 via-gold-800/30 to-black/60 border-gold-500/30'
                          } backdrop-blur-sm rounded-2xl p-6 md:p-8 border relative overflow-hidden group`}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${
                              milestone.highlight
                                ? 'from-gold-500/20 to-transparent'
                                : 'from-gold-500/10 to-transparent'
                            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            <div className="relative">
                              <div className={`flex items-center gap-3 mb-3 ${
                                milestone.side === 'left' ? 'md:justify-end' : ''
                              }`}>
                                <span className="text-3xl">{milestone.icon}</span>
                                <span className={`text-sm font-sans font-semibold text-gold-400 ${
                                  milestone.highlight ? 'text-gold-300' : ''
                                }`}>
                                  {milestone.year}
                                </span>
                              </div>
                              <h3 className={`text-xl md:text-2xl font-serif font-bold mb-3 ${
                                milestone.highlight ? 'text-gold-300' : 'text-gold-400'
                              }`}>
                                {milestone.title}
                              </h3>
                              <p className="text-gray-300 leading-relaxed text-sm md:text-base font-sans">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
      
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
              { icon: '🎓', title: 'Lễ Tốt Nghiệp', desc: 'Chúc mừng bạn trong ngày tốt nghiệp quan trọng' },
              { icon: '🌟', title: 'Thành Tựu', desc: 'Ghi nhận những nỗ lực và thành tích của bạn' },
              { icon: '🎉', title: 'Kỷ Niệm', desc: 'Cùng nhau tạo nên những kỷ niệm đáng nhớ' },
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
            Nguyễn Ngọc Phong
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
