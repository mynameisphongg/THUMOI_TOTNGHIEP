export interface GraduationData {
  studentName: string
  major: string
  date: string
  time: string
  location: string
}

export function useGraduationData(): GraduationData {
  return {
    studentName: "Nguyễn Ngọc Phong",
    major: "Công Nghệ Thông Tin - Đại học HUTECH",
    date: "Thứ Sáu, ngày 09 tháng 01 năm 2026",
    time: "09:00",
    location: "Sân trường HUTECH (Thu Duc Campus)"
  }
}

