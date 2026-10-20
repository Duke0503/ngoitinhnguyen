import type { PeopleRepository } from "../application/people-queries"
import type { LeadershipMember } from "../domain/people"

// Source: post aYU9uPYl (announced 10.06.2026). Public listing needs each person's consent (BUSINESS.md BR-06):
// these are the people the organisation itself named publicly.
const board: Record<string, LeadershipMember[]> = {
  "2026 — 2027": [
    { name: "Trương Thị Mỹ Tuyết", role: "Trưởng ban tổ chức" },
    { name: "Đỗ Thị Thảo Nhi", role: "Phó trưởng ban tổ chức" },
    { name: "Nguyễn Thúy Hằng", role: "Phó ban · Quản lý kế hoạch dự án" },
    { name: "Lê Thị Trà Mi", role: "Phó ban · Nhân sự" },
    { name: "Nguyễn Thị Quỳnh Anh", role: "Phó ban · Sự kiện" },
    { name: "Hà Quỳnh Anh", role: "Phó ban · Thiết kế" },
  ],
}

export const seedPeopleRepository: PeopleRepository = {
  async leadership(termLabel) {
    return board[termLabel] ?? []
  },
}
