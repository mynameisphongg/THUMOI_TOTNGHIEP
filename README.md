# Thư Mời Lễ Tốt Nghiệp 3D - Thiệp Cưới Style

Thư mời lễ tốt nghiệp 3D được thiết kế theo phong cách thiệp cưới sang trọng với hiệu ứng mở thư và hiển thị ảnh.

## ✨ Tính Năng

- 🎴 **Hiệu ứng mở thư 3D** - Animation mở thư tự động
- 📸 **Hiển thị ảnh** - Ảnh cá nhân được đóng khung vàng kim
- 🎨 **Thiết kế thiệp cưới** - Phong cách sang trọng, màu vàng kim, hồng pastel
- ✨ **Background gradient** - Nền màu pastel nhẹ nhàng
- 🌟 **Particles vàng kim** - Hạt sáng trang trí
- 🎭 **Postprocessing effects**: Bloom effect

## 🚀 Cài Đặt

```bash
npm install
```

## 🎯 Chạy Dự Án

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📸 Thêm Ảnh Của Bạn

1. Đặt ảnh của bạn vào thư mục `public/`
2. Đổi tên file thành `image.jpg` (hoặc cập nhật đường dẫn trong `src/components/Letter.tsx`)

**Lưu ý**: Ảnh nên là ảnh chân dung, tỷ lệ khoảng 2:3 (rộng:cao) để hiển thị đẹp nhất.

## 🎨 Tùy Chỉnh Nội Dung

Chỉnh sửa thông tin trong file `src/hooks/useGraduationData.ts`:

```typescript
export function useGraduationData(): GraduationData {
  return {
    studentName: "Tên của bạn",
    major: "Ngành học",
    date: "Ngày tháng",
    time: "Giờ",
    location: "Địa điểm"
  }
}
```

## 🎵 Thêm Nhạc Nền

1. Đặt file nhạc vào thư mục `public/audio/`
2. Cập nhật đường dẫn trong `src/components/AudioControl.tsx`:

```typescript
audioRef.current.src = '/audio/background-music.mp3'
```

## 🛠️ Công Nghệ Sử Dụng

- **React 18** - UI Framework
- **Three.js** - 3D Graphics Library
- **@react-three/fiber** - React renderer cho Three.js
- **@react-three/drei** - Helpers và utilities
- **@react-three/postprocessing** - Post-processing effects
- **Vite** - Build tool

## 📝 Cấu Trúc Dự Án

```
src/
├── components/
│   ├── Letter.tsx            # Component thiệp 3D chính với ảnh
│   ├── Particles.tsx         # Hệ thống particles
│   └── AudioControl.tsx      # Điều khiển nhạc
├── hooks/
│   └── useGraduationData.ts  # Hook quản lý dữ liệu
├── App.tsx                    # Component chính
├── main.tsx                   # Entry point
└── styles.css                 # Styling
public/
└── image.jpg                  # Ảnh của bạn (cần thêm vào)
```

## 🎨 Màu Sắc & Thiết Kế

- **Vàng kim (#d4af37)** - Màu chủ đạo, sang trọng
- **Hồng pastel (#ffeef5, #fff8f0)** - Background nhẹ nhàng
- **Trắng kem (#fffaf0)** - Màu nền thiệp
- **Hồng nhạt (#ffb6c1)** - Trang trí

## 🔧 Tối Ưu Hiệu Suất

- Sử dụng `useFrame` với GPU-accelerated animations
- Particles giảm xuống 300 để tối ưu
- Frustum culling cho particles
- DPR scaling tự động

## 📱 Responsive

Thiết kế responsive, hoạt động tốt trên mọi thiết bị từ desktop đến mobile.

## 🎓 License

MIT
