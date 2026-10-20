import type { Metadata } from "next"

import { campaignQueries, ImpactBand, ResultsTable } from "@/modules/campaigns"
import { fundraisingQueries, Transparency } from "@/modules/fundraising"
import { organisationQueries } from "@/modules/organisation"
import { routes } from "@/shared/config/routes"
import { PageHeader } from "@/shared/layout/page-header"

export const metadata: Metadata = {
  title: "Tác động & minh bạch",
  description: "Những gì Ngòi đã cùng cộng đồng làm được qua từng chương trình, và báo cáo tài chính công khai sau mỗi mùa.",
  alternates: { canonical: routes.impact },
}

export default async function ImpactPage() {
  const [impact, campaigns, report, profile] = await Promise.all([
    campaignQueries.impact(),
    campaignQueries.all(),
    fundraisingQueries.featuredReport(),
    organisationQueries.profile(),
  ])
  const term = profile.currentTerm

  return (
    <>
      <PageHeader
        id="impact-page-title"
        eyebrow="Tác động & minh bạch"
        title="Con số thật, báo cáo công khai"
        description="Mỗi con số được cộng từ kết quả đã ghi nhận của từng chương trình, không nhập tay. Báo cáo tài chính được công khai sau khi chương trình tổng kết."
        crumbs={[{ label: "Trang chủ", href: routes.home }, { label: "Tác động" }]}
      />
      <ImpactBand impact={impact} termMembers={{ count: term.memberCount, label: `thành viên nhiệm kỳ ${term.label}` }} />
      <ResultsTable campaigns={[...campaigns].reverse()} reportedCodes={[]} />
      {report && <Transparency report={report} archiveLink={false} />}
    </>
  )
}
