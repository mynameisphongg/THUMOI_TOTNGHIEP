import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useMemo } from 'react'
import { saveToGoogleSheets } from '../utils/saveToGoogleSheets'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { name: string; phone: string; guests: number; message: string }) => void
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm }: ConfirmationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 1,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const phoneRegex = useMemo(() => /^[0-9]{10,11}$/, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate required fields
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ và tên')
      return
    }
    
    if (!formData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại')
      return
    }

    // Validate phone number format (10-11 digits)
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Save to Google Sheets
      const result = await saveToGoogleSheets({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        guests: formData.guests,
        message: formData.message.trim(),
      })

      if (!result.success) {
        setError(result.error || 'Không thể lưu dữ liệu. Vui lòng thử lại.')
        setIsSubmitting(false)
        return
      }

      // Success - show success message
      setIsSubmitting(false)
      setIsSuccess(true)
      onConfirm(formData)
      
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setFormData({ name: '', phone: '', guests: 1, message: '' })
        setError(null)
      }, 2500)
    } catch (err) {
      console.error('Error in handleSubmit:', err)
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
      setIsSubmitting(false)
    }
  }, [formData, phoneRegex, onConfirm, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 rounded-[2.5rem] max-w-4xl w-full shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)',
                background: 'linear-gradient(135deg, #fff1f2 0%, #fef3c7 25%, #fff1f2 50%, #fef3c7 75%, #fff1f2 100%)',
              }}
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-amber-300 to-rose-300" />
              
              <div className="relative p-8 md:p-12">
                {!isSuccess ? (
                  <motion.button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/50 transition-all z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-2xl">×</span>
                  </motion.button>
                ) : null}

                {isSuccess ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <motion.div
                      className="relative inline-block mb-6"
                      animate={{ 
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <div className="absolute inset-0 bg-rose-400 rounded-full blur-2xl opacity-50" />
                      <div className="relative text-7xl">✅</div>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-900 mb-3">
                      Xác nhận thành công!
                    </h3>
                    <p className="text-rose-700 leading-relaxed text-base md:text-lg font-sans">
                      Chúng tôi rất vui được đón tiếp bạn<br />
                      tại buổi lễ tốt nghiệp.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg">
                            <span className="text-2xl">🎓</span>
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-rose-900">
                              Xác nhận tham dự Buổi Lễ Tốt Nghiệp Của Ngọc Phong Nhé!
                            </h2>
                            <p className="text-rose-700 text-sm mt-1 font-sans">Vui lòng điền thông tin của bạn vào đây</p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                              {error}
                            </div>
                          )}
                          
                          <div>
                            <label className="block text-sm font-semibold text-rose-800 mb-2 font-sans">
                              Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => {
                                const value = e.target.value
                                setFormData(prev => ({ ...prev, name: value }))
                                if (error) setError(null)
                              }}
                              className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all text-gray-900 placeholder-gray-400 bg-white/90 text-base font-sans"
                              placeholder="Nhập họ và tên"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-rose-800 mb-2">
                              Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => {
                                const value = e.target.value
                                setFormData(prev => ({ ...prev, phone: value }))
                                if (error) setError(null)
                              }}
                              className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all text-gray-900 placeholder-gray-400 bg-white/90 text-base font-sans"
                              placeholder="0912345678"
                              pattern="[0-9]{10,11}"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-rose-800 mb-2">
                              Bạn Đi Cùng Bao Nhiêu Người?
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={formData.guests}
                              onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                              className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all text-gray-900 bg-white/80 backdrop-blur-sm text-base"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex-1 border-l-0 md:border-l-2 border-rose-200 pl-0 md:pl-8">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="h-full flex flex-col"
                      >
                        <div className="mb-5">
                          <label className="block text-sm font-bold text-rose-800 mb-2">
                            Lời Chúc Mừng Gửi Đến Ngọc Phong<span className="text-rose-500 text-xs font-normal"></span>
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            rows={6}
                            className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all resize-none text-gray-900 placeholder-gray-400 bg-white/90 text-base font-sans"
                            placeholder="Gửi lời chúc mừng đến Ngọc Phong..."
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-end gap-4 mt-auto">
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all text-base relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <motion.span
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  />
                                  Đang gửi...
                                </>
                              ) : (
                                <>
                                  Xác nhận tham dự
                                  <span className="text-lg">✨</span>
                                </>
                              )}
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.3 }}
                            />
                          </motion.button>

                          <motion.button
                            type="button"
                            onClick={onClose}
                            className="w-full px-6 py-3 border-2 border-rose-300 text-rose-700 rounded-xl font-bold hover:bg-white/50 transition-all text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Hủy
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConfirmationModal
