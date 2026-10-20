import type { Metadata } from "next"

import { postQueries, NewsList } from "@/modules/content"
import { routes } from "@/shared/config/routes"
import { PageHeader } from "@/shared/layout/page-header"

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Những câu chuyện từ các địa bàn, thông báo tuyển thành viên và tri ân đối tác của Ngòi Tình Nguyện – Viết Cho Em.",
  alternates: { canonical: routes.news },
}

export default async function NewsPage() {
  const { posts, topics } = await postQueries.list()
  return (
    <>
      <PageHeader
        id="news-title"
        eyebrow="Tin tức"
        title="Chuyện từ các địa bàn"
        description="Nhật ký các chuyến đi, thông báo từ ban tổ chức và lời tri ân gửi đến những người đã cùng Ngòi viết tiếp hành trình."
        crumbs={[{ label: "Trang chủ", href: routes.home }, { label: "Tin tức" }]}
      />
      <NewsList posts={posts} topics={topics} />
    </>
  )
}
