import type { Metadata } from "next"

import { campaignQueries } from "@/modules/campaigns"
import { organisationQueries } from "@/modules/organisation"
import { GoldenBoard, SponsorContact, SponsorsHero, sponsorshipQueries, TierSection, WhySponsor } from "@/modules/sponsorship"

export const metadata: Metadata = {
  title: "Đồng hành cùng Ngòi",
  description: "Dành cho doanh nghiệp, tổ chức và mạnh thường quân: quyền lợi theo từng gói tài trợ, bảng vàng tri ân và thông tin liên hệ của Ngòi Tình Nguyện.",
}

// Composes four contexts: Sponsorship (tiers, partners), Campaigns (track record), Organisation (reach, contact).
export default async function SponsorsPage() {
  const [pkg, board, impact, profile] = await Promise.all([
    sponsorshipQueries.tierPackage(),
    sponsorshipQueries.goldenBoard(),
    campaignQueries.impact(),
    organisationQueries.profile(),
  ])

  const proof = [
    { value: String(impact.campaigns), label: `chương trình đã tổ chức từ ${profile.volunteerSince}` },
    { value: String(impact.provinces), label: "tỉnh, thành phố có địa bàn hoạt động" },
    { value: profile.followers, label: "người theo dõi fanpage, tương tác cao" },
    { value: "VNV", label: `đơn vị bảo trợ pháp lý — ${profile.membership.organisation}` },
  ]

  return (
    <>
      <SponsorsHero email={profile.contact.email} proof={proof} />
      <WhySponsor />
      <TierSection pkg={pkg} />
      <GoldenBoard partners={board} />
      <SponsorContact contact={profile.contact} />
    </>
  )
}
