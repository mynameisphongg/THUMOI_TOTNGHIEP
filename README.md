# Thư Mời Lễ Tốt Nghiệp - Graduation Invitation

Thư mời lễ tốt nghiệp sang trọng được thiết kế với React, TailwindCSS và Framer Motion.

## ✨ Tính Năng

- 🎴 **Thiết kế sang trọng** - Phong cách luxury với màu đen, vàng ánh kim, trắng
- 📸 **Ảnh cá nhân** - Hiển thị ảnh sinh viên với border vàng kim
- ✨ **Animations mượt mà** - Framer Motion với fade-in, scale, stagger effects
- 🎉 **Confetti effect** - Hiệu ứng confetti khi xác nhận tham dự
- 📅 **Google Calendar** - Button để lưu sự kiện vào Google Calendar
- 📱 **Responsive 100%** - Tối ưu cho mobile, tablet, desktop
- 🌟 **Background đẹp mắt** - Ảnh nền blur với particles vàng ánh kim

## 🚀 Cài Đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📸 Thêm Ảnh Của Bạn

1. Đặt ảnh của bạn vào thư mục `public/`
2. Đổi tên file thành `image.jpg`

**Lưu ý**: Ảnh nên là ảnh chân dung, tỷ lệ khoảng 1:1 (hình vuông) để hiển thị đẹp nhất với border-radius tròn.

## 🎨 Tùy Chỉnh Nội Dung

Chỉnh sửa thông tin trong file `src/hooks/useGraduationData.ts`:

```typescript
export function useGraduationData(): GraduationData {
  return {
    studentName: "Tên của bạn",
    major: "Ngành học - Tên trường",
    date: "Ngày tháng",
    time: "Giờ",
    location: "Địa điểm"
  }
}
```

## 🛠️ Công Nghệ Sử Dụng

- **React 18** - UI Framework
- **React Router** - Routing
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **TypeScript** - Type safety
- **Vite** - Build tool

## 📦 Cấu Trúc Dự Án

```
src/
├── components/
│   ├── Background.tsx       # Background với ảnh blur và particles
│   └── GraduationCard.tsx   # Component thiệp mời chính
├── hooks/
│   └── useGraduationData.ts # Hook quản lý dữ liệu
├── App.tsx                   # Component chính với routing
├── main.tsx                  # Entry point
└── styles.css                # Global styles với TailwindCSS
```

## 🎨 Màu Sắc & Thiết Kế

- **Đen (#1a1a1a)** - Màu nền chính
- **Vàng ánh kim (#d4af37, #ffd700)** - Màu chủ đạo, sang trọng
- **Trắng (#fafafa)** - Màu nền thiệp
- **Font serif** - Playfair Display, Cinzel cho tiêu đề
- **Font sans-serif** - Inter, Poppins cho nội dung

## 🌐 Deploy

### Deploy lên Netlify

1. Build project: `npm run build`
2. Deploy thư mục `dist` lên Netlify

File `netlify.toml` đã được cấu hình sẵn với MIME types và redirect rules.

## 📝 License

MIT
