# Hướng Dẫn Tùy Chỉnh Thư Mời

## 📝 Cập Nhật Thông Tin Cá Nhân

Mở file `src/hooks/useGraduationData.ts` và chỉnh sửa:

```typescript
export function useGraduationData(): GraduationData {
  return {
    studentName: "Tên của bạn",        // Tên sinh viên
    major: "Ngành học",                 // Ngành học
    date: "15 tháng 6, 2024",          // Ngày tổ chức
    time: "14:00",                      // Giờ bắt đầu
    location: "Hội Trường Lớn - Trường Đại Học"  // Địa điểm
  }
}
```

## 🎨 Tùy Chỉnh Màu Sắc

### Màu Thiệp
Mở `src/components/GraduationCard.tsx` và tìm:

```typescript
<meshStandardMaterial
  color="#1a1a2e"           // Màu chính của thiệp
  metalness={0.3}
  roughness={0.2}
  emissive="#0a0a1a"        // Màu phát sáng
  emissiveIntensity={0.2}
/>
```

### Màu Text
Tìm các component `<Text>` và thay đổi prop `color`:

```typescript
<Text color="#ffd700">  // Màu vàng cho tiêu đề
<Text color="#ffffff">  // Màu trắng cho tên
<Text color="#4a90e2">  // Màu xanh cho thông tin
```

### Màu Particles
Mở `src/components/Particles.tsx`:

```typescript
<pointsMaterial
  color="#4a90e2"        // Màu của particles
  opacity={0.6}          // Độ trong suốt
/>
```

## 🎵 Thêm Nhạc Nền

1. Đặt file nhạc vào thư mục `public/audio/` (tạo thư mục nếu chưa có)
2. Mở `src/components/AudioControl.tsx`
3. Thêm dòng sau vào `useEffect`:

```typescript
audioRef.current.src = '/audio/ten-file-nhac.mp3'
```

## 🎭 Điều Chỉnh Hiệu Ứng

### Tốc Độ Float
Trong `src/components/GraduationCard.tsx`, tìm:

```typescript
floatOffset.current = Math.sin(time * 0.5) * 0.1
//                                    ^^^^  Tốc độ (số càng lớn càng nhanh)
//                                         ^^^^  Độ cao float
```

### Tốc Độ Parallax
Tìm:

```typescript
cardRef.current.rotation.x = parallaxY * 0.1
cardRef.current.rotation.y = parallaxX * 0.1
//                                    ^^^^  Độ nhạy parallax
```

### Tốc Độ Ánh Sáng Quét
Tìm:

```typescript
lightPosition.current = (time * 0.3) % (Math.PI * 2)
//                              ^^^^  Tốc độ quét
```

## 📐 Điều Chỉnh Kích Thước Thiệp

Trong `src/components/GraduationCard.tsx`:

```typescript
const cardSize: [number, number, number] = [6, 8, 0.1]
//                                          ^  ^  ^
//                                          |  |  |
//                                          |  |  Độ dày
//                                          |  Chiều cao
//                                          Chiều rộng
```

## 🌌 Điều Chỉnh Particles

Trong `src/components/Particles.tsx`:

```typescript
const PARTICLE_COUNT = 1000  // Số lượng particles (càng nhiều càng nặng)

// Kích thước particles
<pointsMaterial size={0.05} />  // Tăng/giảm kích thước
```

## ✨ Điều Chỉnh Postprocessing

Trong `src/App.tsx`:

```typescript
<Bloom 
  intensity={0.5}              // Độ sáng bloom
  luminanceThreshold={0.9}     // Ngưỡng sáng
  luminanceSmoothing={0.9}     // Độ mịn
/>

<DepthOfField 
  focusDistance={0.1}         // Khoảng cách focus
  focalLength={0.02}          // Độ dài tiêu cự
  bokehScale={2}              // Độ mờ background
/>
```

## 🎯 Tùy Chỉnh Camera

Trong `src/App.tsx`:

```typescript
<Canvas
  camera={{ 
    position: [0, 0, 8],      // Vị trí camera [x, y, z]
    fov: 50                    // Góc nhìn (field of view)
  }}
/>
```

## 💡 Mẹo Tối Ưu

- Giảm `PARTICLE_COUNT` nếu máy yếu
- Tắt `DepthOfField` nếu muốn tăng FPS
- Giảm `dpr={[1, 2]}` xuống `dpr={1}` cho mobile

