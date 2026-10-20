import type { Metadata } from "next"
import Link from "next/link"

import { campaignQueries, displayTitle } from "@/modules/campaigns"
import { fundraisingQueries } from "@/modules/fundraising"
import { ShopFlow, shopQueries } from "@/modules/shop"
import { routes } from "@/shared/config/routes"
import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Chip } from "@/shared/ui/chip"
import { FlameRule } from "@/shared/ui/flame-rule"
import { SectionHeading } from "@/shared/ui/section-heading"
import { Gift } from "lucide-react"

export const metadata: Metadata = {
  title: "Cửa hàng gây quỹ",
  description: "Hoa và móc khoá kẽm nhung do tình nguyện viên Ngòi làm. Toàn bộ lợi nhuận vào quỹ chương trình đang diễn ra.",
}

// Shop composes three contexts: Campaigns (which campaign is running), Shop (products and rules),
// and Fundraising (the fund the transfer goes to).
export default async function ShopPage() {
  const current = await campaignQueries.current()
  const config = current ? await shopQueries.configFor(current.code) : null

  if (!current || !config) return <NoShop />

  const fund = await fundraisingQueries.fundFor(current.code)
  const title = displayTitle(current)

  return (
    <Section spacing="none" className="py-8 md:py-12" containerClassName="flex flex-col gap-6 md:gap-8">
      <Breadcrumb items={[{ label: title, href: routes.campaign(current.slug) }, { label: "Cửa hàng gây quỹ" }]} />
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <SectionHeading
          as="h1"
          size="lg"
          className="max-w-[700px]"
          title={`Mặt hàng gây quỹ ${title}`}
          description="Hoa và móc khoá kẽm nhung do chính ban tổ chức và tình nguyện viên làm. Toàn bộ lợi nhuận vào quỹ chương trình."
        />
        {config.promotion && (
          <Chip tone="blossom" size="lg" icon={<Gift aria-hidden />} className="self-start">
            {config.promotion.label}
          </Chip>
        )}
      </div>
      <ShopFlow config={config} fund={fund} />
    </Section>
  )
}

function NoShop() {
  return (
    <Section spacing="lg" containerClassName="flex max-w-2xl flex-col gap-6">
      <SectionHeading
        as="h1"
        size="lg"
        eyebrow="Cửa hàng gây quỹ"
        title="Hiện chưa có mặt hàng nào đang bán"
        description="Ngòi mở cửa hàng gây quỹ theo từng chương trình. Bạn theo dõi fanpage để biết lần mở tiếp theo nhé."
      />
      <FlameRule />
      <div>
        <Button asChild>
          <Link href={routes.home}>Về trang chủ</Link>
        </Button>
      </div>
    </Section>
  )
}
