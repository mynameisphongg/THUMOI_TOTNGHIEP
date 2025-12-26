# 📸 Hướng Dẫn Thêm Ảnh

## Cách 1: Đặt ảnh vào thư mục public (Khuyến nghị)

1. Đặt ảnh của bạn vào thư mục `public/`
2. Đổi tên file thành `image.jpg` (hoặc `.png`)
3. Ảnh sẽ tự động hiển thị

**Lưu ý**: 
- Ảnh nên là ảnh chân dung (portrait)
- Tỷ lệ khuyến nghị: 2:3 (rộng:cao) để hiển thị đẹp nhất
- Độ phân giải: ít nhất 600x900px

## Cách 2: Sử dụng URL từ internet

Mở file `src/components/Letter.tsx` và tìm dòng:

```typescript
<PhotoFrame position={[-3.2, 4, 0.02]} imageUrl="/image.jpg" />
```

Thay đổi thành URL của bạn:

```typescript
<PhotoFrame position={[-3.2, 4, 0.02]} imageUrl="https://your-image-url.com/photo.jpg" />
```

## Kiểm tra

Sau khi thêm ảnh, chạy `npm run dev` và kiểm tra:
- Ảnh hiển thị trong khung vàng kim bên trái thiệp
- Ảnh có thể bị cắt nếu tỷ lệ không đúng - điều chỉnh kích thước trong PhotoFrame component nếu cần

