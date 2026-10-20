import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Bell, Heart, Users } from "lucide-react"

import { campaignQueries, CampaignList, isActive, LiveCampaignCard } from "@/modules/campaigns"
import { FundProgress, fundraisingQueries } from "@/modules/fundraising"
import { organisationQueries } from "@/modules/organisation"
import { routes } from "@/shared/config/routes"
import { donateHref } from "@/shared/config/site"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { SnapRow } from "@/shared/ui/snap-row"

export const metadata: Metadata = {
  title: "Chương trình",
  description: "Các chương trình tình nguyện của Ngòi Tình Nguyện – Viết Cho Em: Trang sách nhỏ, Trung thu yêu thương, Xuân yêu thương và Hoa Tháng 10.",
  alternates: { canonical: routes.campaigns },
}

const asks = [
  { icon: Heart, title: "Góp quỹ cho một chương trình", action: "Ủng hộ ngay", href: donateHref, photo: "/images/photos2/ttyt26-vol-snacks.jpg", alt: "Tình nguyện viên trao quà cho các em nhỏ" },
  { icon: Users, title: "Trở thành tình nguyện viên", action: "Ứng tuyển", href: routes.recruitment, photo: "/images/photos2/ttyt26-island-cleanup-b.jpg", alt: "Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng" },
  { icon: Bell, title: "Nhận tin chương trình mới", action: "Đăng ký", href: routes.recruitment, photo: "/images/photos3/night-craft.jpg", alt: "Hai bạn tình nguyện viên làm thủ công buổi tối" },
]

export default async function CampaignsPage() {
  const [campaigns, profile] = await Promise.all([campaignQueries.all(), organisationQueries.profile()])
  const live = campaigns.filter(isActive)
  const progress = await Promise.all(live.map((c) => fundraisingQueries.progressFor(c.code)))

  return (
    <>
      <section aria-labelledby="campaigns-title" className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/photos3/volunteers-steps.jpg" alt="" fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_30%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
        <div className="mx-auto flex min-h-[420px] w-full max-w-[1100px] flex-col items-center justify-center gap-4 px-5 pt-16 pb-24 text-center md:min-h-[560px] md:gap-5 md:px-10 md:pb-32">
          <p className="text-xs font-bold tracking-[0.2em] text-flame-gold uppercase md:text-[13px]">Chương trình</p>
          <h1 id="campaigns-title" className="font-head text-[38px] leading-[1.08] font-semibold text-balance md:text-[68px]">
            Mỗi mùa một trang viết mới.
          </h1>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-white/90 md:text-[19px]">
            {campaigns.length} chương trình từ {profile.volunteerSince} đến nay, mỗi chương trình có địa bàn, ngày giờ và kết quả riêng.
          </p>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-11 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-20" />
      </section>

      {live.map((c, i) => {
        const p = progress[i]
        return <LiveCampaignCard key={c.slug} campaign={c} fundraising={p && <FundProgress progress={p} campaignTitle={c.title} />} />
      })}

      <CampaignList campaigns={campaigns} />

      <Section tone="paper" spacing="lg" className="bg-sand" aria-labelledby="asks-title" containerClassName="flex flex-col items-center gap-8 md:gap-10">
        <h2 id="asks-title" className="font-head text-[28px] leading-tight font-semibold text-balance text-cta md:text-[42px]">
          Cùng Ngòi viết tiếp những trang mới.
        </h2>
        <div className="w-full">
          <SnapRow aria-label="Cách đồng hành" gridClassName="md:grid md:grid-cols-3 md:gap-7">
            {asks.map((a) => (
              <div key={a.title} className="flex h-[280px] flex-col overflow-hidden rounded-md bg-white md:h-[330px]">
                <div className="relative h-[130px] md:h-[170px]">
                  <Image src={a.photo} alt={a.alt} fill sizes="(min-width: 768px) 384px, 300px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col items-center justify-between gap-3 px-4 pt-5 pb-5 text-center">
                  <h3 className="font-head text-[19px] leading-tight font-semibold text-navy md:text-[22px]">{a.title}</h3>
                  <Button asChild size="md" variant="gold">
                    <Link href={a.href}>
                      <a.icon aria-hidden />
                      {a.action}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </SnapRow>
        </div>
      </Section>
    </>
  )
}
