import { routes } from "@/shared/config/routes"
import type { Metadata } from "next"
import Link from "next/link"
import { FileCheck, Heart, Receipt } from "lucide-react"

import { campaignQueries, displayTitle } from "@/modules/campaigns"
import { DonateFlow, fundraisingQueries } from "@/modules/fundraising"
import { org } from "@/shared/config/site"
import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { FlameRule } from "@/shared/ui/flame-rule"
import { PageHero } from "@/shared/layout/page-hero"
import { SectionHeading } from "@/shared/ui/section-heading"

export const metadata: Metadata = {
  title: "Ủng hộ",
  description: "Ủng hộ chương trình đang diễn ra của Ngòi Tình Nguyện bằng VietQR, rồi gửi xác nhận để ban tổ chức ghi nhận.",
}

// The donation page always serves the campaign that is running now; its fund
// (account, presets, certificate rule) comes from the Fundraising context.
const promises = [
  { icon: Heart, text: "Biến thành những món quà nhỏ gửi đến các em và các cô ở Mái ấm Thiên Phước, quận 12." },
  { icon: FileCheck, text: "Được ghi nhận công khai, kèm giấy chứng nhận online có mộc đỏ khi đủ mức tối thiểu." },
  { icon: Receipt, text: "Được báo cáo thu — chi minh bạch sau khi chương trình tổng kết." },
]

export default async function DonatePage() {
  const current = await campaignQueries.current()
  const fund = current ? await fundraisingQueries.fundFor(current.code) : null

  if (!current || !fund?.open) return <NoOpenFund />

  const title = displayTitle(current)
  const certificate = fund.certificateFrom ? ` Từ ${formatVnd(fund.certificateFrom)}: nhận giấy chứng nhận online.` : ""

  return (
    <>
      <PageHero
        id="donate-title"
        photo="/images/photos2/ttyt26-vol-snacks.jpg"
        eyebrow={`Ủng hộ · ${title}`}
        title="Góp một đóa hoa nhỏ, gửi trọn yêu thương."
        description={`Chuyển khoản qua VietQR, sau đó gửi xác nhận để ban tổ chức ghi nhận khoản ủng hộ của bạn.${certificate}`}
      />
      <Section tone="paper" spacing="none" className="pt-6 pb-16 md:pb-24" containerClassName="flex flex-col gap-10 md:gap-14">
        <Breadcrumb items={[{ label: title, href: routes.campaign(current.slug) }, { label: "Ủng hộ" }]} />
        <DonateFlow
          fund={fund}
          campaignTitle={title}
          campaignHref={routes.campaign(current.slug)}
          heading={<SectionHeading as="h2" size="md" className="max-w-[640px]" title="Chọn số tiền và chuyển khoản" description="Làm theo ba bước: chọn số tiền, quét mã VietQR, rồi gửi xác nhận." />}
        />
        <div className="flex flex-col gap-4 md:gap-5">
          <h2 className="font-head text-[26px] leading-tight font-semibold text-navy md:text-[34px]">Khoản góp của bạn sẽ…</h2>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3.5 rounded-xl bg-navy px-[18px] py-4 text-white md:items-start md:p-6">
                <Icon aria-hidden className="size-7 shrink-0 text-flame-gold" />
                <p className="text-[15px] leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
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
