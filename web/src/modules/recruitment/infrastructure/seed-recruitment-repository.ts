import type { RecruitmentRepository } from "../application/recruitment-queries"
import type { RecruitmentRound } from "../domain/recruitment"

// The next real round is not announced yet; this placeholder is labelled “minh hoạ”.
const rounds: RecruitmentRound[] = [
  {
    id: "xuan-tinh-nguyen-2027-volunteer",
    kind: "volunteer",
    title: "Tuyển tình nguyện viên Xuân Tình Nguyện 2027",
    state: "upcoming",
    options: [],
    maxOptions: 2,
    illustrative: true,
  },
]

// Demo-only: with RECRUITMENT_DEMO_ROUND=1 an extra *open* member round is served so the application
// form can be built and tested end to end. It is never part of a normal build.
if (process.env.RECRUITMENT_DEMO_ROUND === "1") {
  rounds.unshift({
    id: "demo-member-round",
    kind: "member",
    title: "Thành viên nhiệm kỳ (mẫu)",
    state: "open",
    maxOptions: 2,
    options: [
      { value: "truyen-thong", label: "Truyền thông" },
      { value: "su-kien", label: "Sự kiện" },
      { value: "thiet-ke", label: "Thiết kế" },
      { value: "nhan-su", label: "Nhân sự" },
      { value: "tai-chinh-doi-ngoai", label: "Tài chính — Đối ngoại" },
      { value: "quan-ly-ke-hoach", label: "Quản lý kế hoạch" },
    ],
    illustrative: true,
  })
}

export const seedRecruitmentRepository: RecruitmentRepository = {
  async rounds() {
    return rounds
  },
}
