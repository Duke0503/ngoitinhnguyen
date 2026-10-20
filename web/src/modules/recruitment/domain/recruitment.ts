// Recruitment bounded context: recruitment rounds and applications.

export type RoundKind = "member" | "volunteer" | "ctv"

export type RoundState = "upcoming" | "open" | "closed"

/** One thing an applicant can choose: a department (member round) or a field team (volunteer round). */
export type RoundOption = { value: string; label: string }

export type RecruitmentRound = {
  id: string
  kind: RoundKind
  title: string
  state: RoundState
  opensOn?: string
  closesOn?: string
  options: RoundOption[]
  /** Applicants may pick at most this many options. */
  maxOptions: number
  /** Provinces the round accepts applications from; absent = nationwide. */
  eligibleProvinces?: string[]
  /** True while the round is a placeholder, not an announced one. */
  illustrative: boolean
}

export type ProcessStep = { title: string; detail: string }

/** The pipeline every round goes through (BUSINESS.md §9, BR-53/54). */
export const recruitmentProcess: ProcessStep[] = [
  { title: "Nộp đơn", detail: "trực tuyến" },
  { title: "Phỏng vấn", detail: "vòng 2" },
  { title: "Hồi âm", detail: "qua email" },
  { title: "Xác nhận", detail: "và gia nhập" },
]

const stateLabel: Record<RoundState, string> = { upcoming: "Sắp mở", open: "Đang mở đơn", closed: "Đã đóng đơn" }

export function roundStatusLine(r: RecruitmentRound): string {
  return `${stateLabel[r.state]} · ${r.title}${r.illustrative ? " (minh hoạ)" : ""}`
}

/** A round takes applications only while it is open and today is inside its window. */
export function acceptsApplications(r: RecruitmentRound, today: string): boolean {
  if (r.state !== "open") return false
  if (r.opensOn && today < r.opensOn) return false
  if (r.closesOn && today > r.closesOn) return false
  return true
}

export function acceptsProvince(r: RecruitmentRound, province: string): boolean {
  return !r.eligibleProvinces || r.eligibleProvinces.includes(province)
}

export type WayToJoin = {
  title: string
  description: string
  facts: { label: string; value: string }[]
}

// Facts from BUSINESS.md §9 (member round 2026: nearly 100 applicants, 28 members; Xuân 2026: hundreds of
// applications, 35 selected).
export const waysToJoin: WayToJoin[] = [
  {
    title: "Thành viên nhiệm kỳ",
    description: "Làm việc cùng ban tổ chức trong một năm, ở một trong sáu ban.",
    facts: [
      { label: "Thời gian", value: "Một nhiệm kỳ (đến tháng 7 năm sau)" },
      { label: "Địa điểm", value: "Trực tuyến, toàn quốc" },
      { label: "Mở đơn", value: "Khoảng tháng 6 mỗi năm" },
      { label: "Mùa 2 (2026)", value: "Gần 100 đơn · 28 thành viên" },
    ],
  },
  {
    title: "Tình nguyện viên chương trình",
    description: "Tham gia trọn một chương trình theo mùa — Trung thu, Xuân, 20/10 — tại địa bàn.",
    facts: [
      { label: "Thời gian", value: "Vài ngày đến vài tuần" },
      { label: "Địa điểm", value: "Theo đội hình: TP.HCM, Hà Nội, Gia Lai, Hưng Yên…" },
      { label: "Mở đơn", value: "Trước mỗi chương trình" },
      { label: "Xuân 2026", value: "Hàng trăm đơn · 35 tình nguyện viên" },
    ],
  },
]

export type Benefit = { title: string; description: string }

// The certificate threshold differs between posts (80% vs 90%), so no number is promised here (BUSINESS.md §14).
export const benefits: Benefit[] = [
  { title: "Giấy chứng nhận", description: "Khi hoàn thành công việc trong hành trình cùng Ngòi." },
  { title: "Ghi danh trên website", description: "Tên bạn trong bảng vinh danh tình nguyện viên của dự án." },
  { title: "Kỹ năng và bạn đồng hành", description: "Làm việc nhóm, giao tiếp, tổ chức — cùng những người bạn mới." },
  { title: "Những chuyến đi thật", description: "Đến điểm trường, mái ấm, ấp đảo — nơi món quà được trao tận tay." },
]
