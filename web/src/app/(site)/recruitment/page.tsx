import type { Metadata } from "next"

import { DepartmentCards, organisationQueries } from "@/modules/organisation"
import { ApplySection, BenefitsAndProcess, RecruitmentHero, recruitmentQueries, WaysToJoin } from "@/modules/recruitment"

export const metadata: Metadata = {
  title: "Tuyển thành viên",
  description: "Tham gia Ngòi Tình Nguyện: ứng tuyển thành viên nhiệm kỳ hoặc tình nguyện viên cho chương trình theo mùa. Không cần kinh nghiệm.",
}

export default async function RecruitmentPage() {
  const [profile, round] = await Promise.all([organisationQueries.profile(), recruitmentQueries.highlightedRound()])
  const term = profile.currentTerm

  return (
    <>
      <RecruitmentHero round={round} slogan={term.slogan} />
      <WaysToJoin />
      <DepartmentCards departments={term.departments} theme={term.theme} />
      <BenefitsAndProcess />
      {round?.state === "open" && <ApplySection round={round} />}
    </>
  )
}
