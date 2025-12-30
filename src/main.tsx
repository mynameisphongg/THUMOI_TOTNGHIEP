import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

// Check environment variables on startup
if (import.meta.env.DEV) {
  const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL
  if (googleScriptUrl) {
    console.log('✅ Google Script URL đã được cấu hình')
    console.log('URL:', googleScriptUrl.substring(0, 50) + '...')
  } else {
    console.warn('⚠️ Google Script URL chưa được cấu hình')
    console.warn('📋 Hướng dẫn:')
    console.warn('   1. Kiểm tra file .env trong thư mục gốc có dòng:')
    console.warn('      VITE_GOOGLE_SCRIPT_URL=https://script.google.com/...')
    console.warn('   2. QUAN TRỌNG: Restart dev server sau khi tạo/sửa file .env')
    console.warn('      - Nhấn Ctrl+C để dừng server')
    console.warn('      - Chạy lại: npm run dev')
    console.warn('   3. Vite chỉ load biến môi trường khi khởi động server')
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

