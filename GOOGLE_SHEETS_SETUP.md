# 📊 Hướng Dẫn Thiết Lập Google Sheets

Hướng dẫn này sẽ giúp bạn thiết lập Google Apps Script để lưu dữ liệu từ form xác nhận vào Google Sheets.

## 🎯 Bước 1: Tạo Google Apps Script

1. **Mở Google Sheets** của bạn:
   - Truy cập: https://docs.google.com/

2. **Tạo Script mới**:
   - Vào menu `Extensions` → `Apps Script`
   - Xóa code mặc định và dán code tương ứng

3. **Lưu project**:
   - Nhấn `Ctrl+S` hoặc `Cmd+S`
   - Đặt tên project (ví dụ: "Save to Sheets")

## 🚀 Bước 2: Deploy Web App

1. **Deploy script**:
   - Nhấn nút `Deploy` → `New deployment`
   - Chọn icon ⚙️ (gear) → `Web app`

2. **Cấu hình deployment**:
   - **Description**: "Save form data to sheets" (hoặc tên khác)
   - **Execute as**: `Me` (tài khoản của bạn)
   - **Who has access**: `Anyone` (quan trọng!)
   - Nhấn `Deploy`

3. **Xác nhận quyền truy cập** (Quan trọng!):
   - Sau khi nhấn `Deploy`, Google sẽ hiển thị màn hình xác nhận quyền
   - Bạn sẽ thấy cảnh báo **"This app hasn't been verified by Google"** - ĐÂY LÀ BÌNH THƯỜNG cho dự án cá nhân
   - **Cách xử lý**:
     - Nhấn nút **"Advanced"** (Nâng cao) ở góc dưới bên trái
     - Sau đó nhấn **"Go to Save To Sheets (unsafe)"** hoặc **"Continue to Save To Sheets"**
     - Điều này an toàn vì bạn là người tạo script và chỉ truy cập Google Sheets của chính bạn
   - Nhấn **"Allow"** để cấp quyền

4. **Copy Web App URL**:
   - Sau khi xác nhận quyền, bạn sẽ nhận được một URL
   - Copy URL này
   - **Lưu ý**: URL này sẽ thay đổi mỗi khi bạn tạo deployment mới

## ⚙️ Bước 3: Cấu Hình Trong Project

1. **Tạo file `.env`** trong thư mục gốc của project:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. **Hoặc cập nhật trực tiếp trong code** (không khuyến nghị cho production):
   - Mở file `src/utils/saveToGoogleSheets.ts`
   - Thay đổi giá trị mặc định trong hàm `saveToGoogleSheets`

## ✅ Bước 4: Kiểm Tra

1. **Chạy project**:
   ```bash
   npm run dev
   ```

2. **Test form**:
   - Điền đầy đủ thông tin trong form xác nhận
   - Submit form
   - Kiểm tra Google Sheets để xem dữ liệu đã được lưu chưa

## 🔒 Lưu Ý Bảo Mật

- **Không chia sẻ** Web App URL công khai
- **Giới hạn quyền truy cập** nếu có thể
- **Kiểm tra dữ liệu** thường xuyên để phát hiện spam
- **Cân nhắc thêm validation** trong Google Apps Script để chặn dữ liệu không hợp lệ

## ⚠️ Xử Lý Cảnh Báo "App Not Verified"

Khi deploy Google Apps Script, bạn sẽ thấy cảnh báo:
- **"This app hasn't been verified by Google"** - Đây KHÔNG PHẢI lỗi
- **Lý do**: Google yêu cầu verify cho các app công khai, nhưng với dự án cá nhân thì không cần
- **Cách xử lý**:
  1. Nhấn **"Advanced"** (Nâng cao)
  2. Nhấn **"Go to [Your App Name] (unsafe)"**
  3. Nhấn **"Allow"** để cấp quyền
- **An toàn không?**: Có, vì bạn là người tạo script và chỉ truy cập Google Sheets của chính bạn

## 🐛 Xử Lý Lỗi

### Lỗi "Script URL not configured"
- Kiểm tra file `.env` đã có `VITE_GOOGLE_SCRIPT_URL` chưa
- Đảm bảo URL đúng format

### Dữ liệu không được lưu
- Kiểm tra quyền truy cập của Web App (phải là "Anyone")
- Kiểm tra console trong browser để xem lỗi chi tiết
- Kiểm tra Google Apps Script execution log
- Đảm bảo đã xác nhận quyền truy cập khi deploy

### CORS Error
- Code đã sử dụng `no-cors` mode để tránh lỗi này
- Nếu vẫn gặp lỗi, thử dùng method `saveToGoogleSheetsGET` thay vì `saveToGoogleSheets`

### Lỗi "Access denied" hoặc "Permission denied"
- Kiểm tra lại quyền truy cập Web App (phải là "Anyone")
- Thử tạo deployment mới và xác nhận quyền lại

## 📝 Cấu Trúc Dữ Liệu

Dữ liệu được lưu với các cột sau:
1. **Họ và tên** - Tên người xác nhận
2. **Số điện thoại** - SĐT của người xác nhận
3. **Số lượng khách** - Số người sẽ tham dự
4. **Lời nhắn** - Lời chúc (nếu có)
5. **Thời gian** - Thời điểm xác nhận (format Việt Nam)

