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

## Lưu Ý Quan Trọng

✅ Đã có file `netlify.toml` để cấu hình MIME types
✅ Đã có file `public/_headers` để set headers cho static files
✅ Build output sẽ được tạo trong thư mục `dist`

## Kiểm Tra Sau Khi Deploy

Sau khi deploy, kiểm tra:
- Website có load được không
- Console có lỗi MIME type không
- Các file JS/CSS có load đúng không

Nếu vẫn còn lỗi, kiểm tra lại:
1. Build command: `npm run build`
2. Publish directory: `dist`
3. File `netlify.toml` có trong root project
4. File `public/_headers` có trong thư mục `public`

