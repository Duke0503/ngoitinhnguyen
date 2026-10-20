import type { Metadata } from "next"

import { campaignQueries, CampaignList } from "@/modules/campaigns"
import { routes } from "@/shared/config/routes"
import { PageHeader } from "@/shared/layout/page-header"

export const metadata: Metadata = {
  title: "Chương trình",
  description: "Các chương trình tình nguyện của Ngòi Tình Nguyện – Viết Cho Em: Trang sách nhỏ, Trung thu yêu thương, Xuân yêu thương và Hoa Tháng 10.",
  alternates: { canonical: routes.campaigns },
}

export default async function CampaignsPage() {
  const campaigns = (await campaignQueries.all()).reverse()
  return (
    <>
      <PageHeader
        id="campaigns-title"
        eyebrow="Chương trình"
        title="Mỗi mùa một trang viết mới"
        description="Từ những trang sách nhỏ năm 2024 đến các mùa Trung thu, Tết và 20/10 — mỗi chương trình có địa bàn, kết quả và báo cáo riêng."
        crumbs={[{ label: "Trang chủ", href: routes.home }, { label: "Chương trình" }]}
      />
      <CampaignList campaigns={campaigns} />
    </>
  )
}
