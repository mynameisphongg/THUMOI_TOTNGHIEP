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
    const envUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL
    const url = scriptUrl || envUrl

    // Debug log (only log if URL exists, don't expose it)
    if (envUrl) {
      console.log('Environment URL configured')
    }

    if (!url) {
      console.error('Google Script URL not configured')
      return {
        success: false,
        error: 'Google Script URL chưa được cấu hình. Vui lòng xem file GOOGLE_SHEETS_SETUP.md để thiết lập.',
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

    // Send data to Google Apps Script
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
    return { success: true }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi lưu dữ liệu',
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

