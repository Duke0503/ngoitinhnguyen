import { routes } from "@/shared/config/routes"
import type { Metadata } from "next"
import Link from "next/link"

import { campaignQueries, displayTitle } from "@/modules/campaigns"
import { DonateFlow, fundraisingQueries } from "@/modules/fundraising"
import { org } from "@/shared/config/site"
import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { FlameRule } from "@/shared/ui/flame-rule"
import { SectionHeading } from "@/shared/ui/section-heading"

export const metadata: Metadata = {
  title: "Ủng hộ",
  description: "Ủng hộ chương trình đang diễn ra của Ngòi Tình Nguyện bằng VietQR, rồi gửi xác nhận để ban tổ chức ghi nhận.",
}

// The donation page always serves the campaign that is running now; its fund
// (account, presets, certificate rule) comes from the Fundraising context.
export default async function DonatePage() {
  const current = await campaignQueries.current()
  const fund = current ? await fundraisingQueries.fundFor(current.code) : null

  if (!current || !fund?.open) return <NoOpenFund />

  const title = displayTitle(current)
  const certificate = fund.certificateFrom ? ` Từ ${formatVnd(fund.certificateFrom)}: nhận giấy chứng nhận online.` : ""

  return (
    <Section spacing="none" className="py-8 md:py-12" containerClassName="flex flex-col gap-5 md:gap-6">
      <Breadcrumb items={[{ label: title, href: routes.campaign(current.slug) }, { label: "Ủng hộ" }]} />
      <DonateFlow
        fund={fund}
        campaignTitle={title}
        campaignHref={routes.campaign(current.slug)}
        heading={
          <SectionHeading
            as="h1"
            size="lg"
            className="max-w-[640px]"
            title={`Chung tay cùng ${title}`}
            description={`Chuyển khoản qua VietQR, sau đó gửi xác nhận để ban tổ chức ghi nhận khoản ủng hộ của bạn.${certificate}`}
          />
        }
      />
    </Section>
  )
}

function NoOpenFund() {
  return (
    <Section spacing="lg" containerClassName="flex max-w-2xl flex-col gap-6">
      <SectionHeading
        as="h1"
        size="lg"
        eyebrow="Ủng hộ"
        title="Hiện chưa có quỹ nào đang mở"
        description="Ngòi mở quỹ cho từng chương trình theo mùa. Bạn theo dõi fanpage để biết chương trình tiếp theo nhé — cảm ơn tấm lòng của bạn."
      />
      <FlameRule />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={org.fanpage.href} target="_blank" rel="noreferrer">
            Theo dõi fanpage
          </a>
        </Button>
      </div>
    </Section>
  )
}
