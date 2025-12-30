# Hướng Dẫn Deploy Lên Netlify

## Bước 1: Build Project

```bash
npm run build
```

## Bước 2: Deploy Lên Netlify

### Cách 1: Deploy qua Netlify Dashboard

1. Đăng nhập vào [Netlify](https://app.netlify.com)
2. Chọn "Add new site" → "Import an existing project"
3. Kết nối với Git repository của bạn (GitHub/GitLab/Bitbucket)
4. Cấu hình build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### Cách 2: Deploy qua Netlify CLI

```bash
# Cài đặt Netlify CLI (nếu chưa có)
npm install -g netlify-cli

# Đăng nhập
netlify login

# Deploy
netlify deploy --prod
```

### Cách 3: Drag & Drop

1. Chạy `npm run build` để tạo thư mục `dist`
2. Vào [Netlify Drop](https://app.netlify.com/drop)
3. Kéo thả thư mục `dist` vào đó

## ⚠️ QUAN TRỌNG: Cấu Hình Biến Môi Trường

**BẮT BUỘC** phải cấu hình biến môi trường trên Netlify để form xác nhận hoạt động:

### Cách Cấu Hình:

1. **Vào Netlify Dashboard**:
   - Đăng nhập vào [Netlify](https://app.netlify.com)
   - Chọn site của bạn

2. **Vào phần Environment Variables**:
   - Vào **Site settings** → **Environment variables**
   - Hoặc **Build & deploy** → **Environment**

3. **Thêm biến môi trường**:
   - Click **Add variable**
   - **Key**: `VITE_GOOGLE_SCRIPT_URL`
   - **Value**: URL Google Apps Script của bạn (ví dụ: `https://script.google.com/macros/s/AKfycby.../exec`)
   - Click **Save**

4. **Redeploy site**:
   - Sau khi thêm biến môi trường, cần **trigger một deploy mới**
   - Vào **Deploys** → Click **Trigger deploy** → **Deploy site**
   - Hoặc push một commit mới lên Git

### ⚠️ Lưu Ý:

- **KHÔNG** commit file `.env` lên Git (đã có trong `.gitignore`)
- Biến môi trường phải được set trong Netlify Dashboard
- Sau khi set biến môi trường, **phải redeploy** để áp dụng
- Vite sẽ embed biến môi trường vào code khi build

## Lưu Ý Quan Trọng Khác

✅ Đã có file `netlify.toml` để cấu hình MIME types
✅ Đã có file `public/_headers` để set headers cho static files
✅ Build output sẽ được tạo trong thư mục `dist`

## Kiểm Tra Sau Khi Deploy

Sau khi deploy, kiểm tra:

1. **Website có load được không**
2. **Console có lỗi MIME type không**
3. **Các file JS/CSS có load đúng không**
4. **Test form xác nhận**:
   - Mở website trên Netlify
   - Click "Xác nhận tham dự"
   - Điền thông tin và submit
   - Kiểm tra Google Sheets xem dữ liệu có được lưu không
   - Mở Console (F12) để xem log

### Kiểm Tra Biến Môi Trường:

Mở Console trong browser và kiểm tra:
- Nếu thấy `✅ Environment URL found` → Biến môi trường đã được load đúng
- Nếu thấy `⚠️ Đang sử dụng FALLBACK URL` → Biến môi trường chưa được set trên Netlify

Nếu vẫn còn lỗi, kiểm tra lại:
1. Build command: `npm run build`
2. Publish directory: `dist`
3. File `netlify.toml` có trong root project
4. File `public/_headers` có trong thư mục `public`
5. **Biến môi trường `VITE_GOOGLE_SCRIPT_URL` đã được set trong Netlify Dashboard**
6. **Đã redeploy sau khi set biến môi trường**







