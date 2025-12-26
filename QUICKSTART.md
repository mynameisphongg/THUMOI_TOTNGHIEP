# 🚀 Hướng Dẫn Nhanh

## Bước 1: Cài Đặt

```bash
npm install
```

## Bước 2: Cập Nhật Thông Tin

Mở `src/hooks/useGraduationData.ts` và thay đổi:

```typescript
studentName: "Tên của bạn"
major: "Ngành học"
date: "Ngày tháng"
time: "Giờ"
location: "Địa điểm"
```

## Bước 3: Chạy Project

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

## 🎯 Tính Năng

- ✅ Thiệp 3D nổi với hiệu ứng float
- ✅ Parallax khi di chuyển chuột
- ✅ Ánh sáng quét quanh thiệp
- ✅ Particles background
- ✅ Postprocessing effects (Bloom, Depth of Field)
- ✅ Điều khiển nhạc nền

## 📱 Kiểm Tra

- Di chuyển chuột để thấy parallax effect
- Click nút 🔊 ở góc dưới bên phải để bật/tắt nhạc
- Thiệp sẽ tự động float nhẹ

## 🐛 Xử Lý Lỗi

### Lỗi: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Font không hiển thị
Text component sẽ tự động fallback về font mặc định. Không cần lo lắng!

### Performance thấp
- Giảm `PARTICLE_COUNT` trong `Particles.tsx`
- Tắt `DepthOfField` trong `App.tsx`
- Giảm `dpr` xuống `1` trong `App.tsx`

## 📚 Tài Liệu Thêm

Xem `CUSTOMIZE.md` để tùy chỉnh chi tiết hơn.

