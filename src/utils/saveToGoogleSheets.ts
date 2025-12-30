/**
 * Utility function to save form data to Google Sheets
 * Uses Google Apps Script Web App endpoint
 */

export interface FormData {
  name: string
  phone: string
  guests: number
  message: string
  timestamp?: string
}

// KHÔNG hardcode URL ở đây để tránh lộ thông tin khi push lên Git
// URL phải được cấu hình qua biến môi trường VITE_GOOGLE_SCRIPT_URL

/**
 * Saves form data to Google Sheets via Google Apps Script Web App
 * @param data - Form data to save
 * @param scriptUrl - Google Apps Script Web App URL (optional, uses env var if not provided)
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export async function saveToGoogleSheets(
  data: FormData,
  scriptUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get script URL from:
    // 1. Provided parameter (highest priority)
    // 2. Environment variable VITE_GOOGLE_SCRIPT_URL
    // KHÔNG có fallback để tránh lộ URL trong code
    const envUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL
    let url = scriptUrl || envUrl

    // Debug logging
    console.log('Checking Google Script URL configuration...')
    console.log('import.meta.env keys:', Object.keys(import.meta.env))
    console.log('VITE_GOOGLE_SCRIPT_URL value:', envUrl || 'undefined')
    
    if (envUrl) {
      console.log('✅ Environment URL found:', envUrl.substring(0, 50) + '...')
    } else {
      console.warn('⚠️ VITE_GOOGLE_SCRIPT_URL not found in environment variables')
      console.warn('💡 Hãy đảm bảo:')
      console.warn('   1. File .env tồn tại trong thư mục gốc của project')
      console.warn('   2. File .env có dòng: VITE_GOOGLE_SCRIPT_URL=https://...')
      console.warn('   3. Dev server đã được RESTART sau khi tạo/sửa file .env')
      console.warn('   4. Không có khoảng trắng thừa trong file .env')
    }

    // Trim whitespace from URL if it exists
    if (url) {
      url = url.trim()
    }

    // Validate URL format
    if (!url) {
      console.error('Google Script URL not configured')
      return {
        success: false,
        error: 'Google Script URL chưa được cấu hình. Vui lòng xem file GOOGLE_SHEETS_SETUP.md để thiết lập.',
      }
    }

    // Validate URL format
    try {
      new URL(url)
    } catch (urlError) {
      console.error('Invalid URL format:', url)
      return {
        success: false,
        error: 'URL Google Script không hợp lệ. Vui lòng kiểm tra lại file .env',
      }
    }

    // Add timestamp
    const dataWithTimestamp = {
      ...data,
      timestamp: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    // Log the data being sent (without sensitive info)
    console.log('Sending data to Google Sheets:', {
      name: dataWithTimestamp.name,
      phone: dataWithTimestamp.phone.substring(0, 3) + '***',
      guests: dataWithTimestamp.guests,
      hasMessage: !!dataWithTimestamp.message,
      timestamp: dataWithTimestamp.timestamp,
    })

    // Send data to Google Apps Script
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithTimestamp),
      })

      // Note: With no-cors mode, we can't read the response
      // But the data should still be saved
      // We'll assume success if no error is thrown
      console.log('Request sent successfully (no-cors mode - cannot verify response)')
      return { success: true }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      throw fetchError
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi lưu dữ liệu'
    
    // Provide more helpful error messages
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      return {
        success: false,
        error: 'Không thể kết nối đến Google Script. Vui lòng kiểm tra kết nối internet và URL trong file .env',
      }
    }
    
    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Alternative method using GET request (simpler but less secure)
 * Use this if POST with no-cors doesn't work
 */
export async function saveToGoogleSheetsGET(
  data: FormData,
  scriptUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const url = scriptUrl || import.meta.env.VITE_GOOGLE_SCRIPT_URL

    if (!url) {
      return {
        success: false,
        error: 'Google Script URL chưa được cấu hình',
      }
    }

    const dataWithTimestamp = {
      ...data,
      timestamp: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    // Build query string
    const params = new URLSearchParams({
      name: dataWithTimestamp.name,
      phone: dataWithTimestamp.phone,
      guests: dataWithTimestamp.guests.toString(),
      message: dataWithTimestamp.message || '',
      timestamp: dataWithTimestamp.timestamp || '',
    })

    // Use image tag to make request (bypasses CORS)
    await new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Failed to save'))
      img.src = `${url}?${params.toString()}`
    })

    return { success: true }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi lưu dữ liệu',
    }
  }
}

