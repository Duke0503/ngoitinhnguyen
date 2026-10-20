import type { Metadata } from "next"

import { organisationQueries } from "@/modules/organisation"
import { CommonBenefits, GoldenBoard, SponsorContact, SponsorsHero, sponsorshipQueries, TierSection, WhySponsor } from "@/modules/sponsorship"

export const metadata: Metadata = {
  title: "Đồng hành cùng Ngòi",
  description: "Dành cho doanh nghiệp, tổ chức và mạnh thường quân: quyền lợi theo từng gói tài trợ, bảng vàng tri ân và thông tin liên hệ của Ngòi Tình Nguyện.",
}

// Composes Sponsorship (tiers, partners) with Organisation (contact).
export default async function SponsorsPage() {
  const [pkg, board, profile] = await Promise.all([sponsorshipQueries.tierPackage(), sponsorshipQueries.goldenBoard(), organisationQueries.profile()])

  return (
    <>
      <SponsorsHero email={profile.contact.email} />
      <WhySponsor />
      <TierSection pkg={pkg} />
      <CommonBenefits pkg={pkg} />
      <GoldenBoard partners={board} />
      <SponsorContact contact={profile.contact} />
    </>
  )
}
