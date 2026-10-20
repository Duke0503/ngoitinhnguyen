import type { Metadata } from "next"

import { campaignQueries, ImpactBand, ResultsTable } from "@/modules/campaigns"
import { fundraisingQueries, Transparency } from "@/modules/fundraising"
import { organisationQueries } from "@/modules/organisation"
import { routes } from "@/shared/config/routes"
import Link from "next/link"

import { donateHref } from "@/shared/config/site"
import { PageHero } from "@/shared/layout/page-hero"
import { Button } from "@/shared/ui/button"

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
      <PageHero
        id="impact-page-title"
        photo="/images/photos3/volunteers-steps.jpg"
        eyebrow="Tác động & minh bạch"
        title="Con số thật, báo cáo công khai."
        description="Mỗi con số được cộng từ kết quả đã ghi nhận của từng chương trình, không nhập tay. Báo cáo tài chính công khai sau khi chương trình tổng kết."
      />
      <ImpactBand impact={impact} termMembers={{ count: term.memberCount, label: `thành viên nhiệm kỳ ${term.label}` }} showAsk={false} />
      <ResultsTable campaigns={[...campaigns].reverse()} reportedCodes={[]} />
      {report && <Transparency report={report} archiveLink={false} />}
      <div className="bg-sand">
        <section aria-labelledby="impact-next-title" className="w-full bg-dusk-gradient px-5 py-[calc(var(--slant)+48px)] text-center text-white [--slant:clamp(28px,4.5vw,72px)] [clip-path:polygon(0_var(--slant),100%_0,100%_100%,0_100%)] md:px-10 md:py-[calc(var(--slant)+88px)]">
          <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 md:gap-8">
            <h2 id="impact-next-title" className="font-head text-[30px] leading-[1.1] font-semibold text-balance md:text-5xl">
              Cùng Ngòi viết tiếp những con số mới.
            </h2>
            <Button asChild size="lg">
              <Link href={donateHref}>Ủng hộ chương trình</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
