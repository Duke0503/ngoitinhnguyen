import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Bell, ExternalLink, Users } from "lucide-react"

import { postQueries, NewsList } from "@/modules/content"
import { organisationQueries } from "@/modules/organisation"
import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { SnapRow } from "@/shared/ui/snap-row"

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Những câu chuyện từ các địa bàn, thông báo tuyển thành viên và tri ân đối tác của Ngòi Tình Nguyện – Viết Cho Em.",
  alternates: { canonical: routes.news },
}

export default async function NewsPage() {
  const [{ posts, topics }, featured, profile] = await Promise.all([postQueries.list(), postQueries.featured(1), organisationQueries.profile()])
  const emailHref = `mailto:${profile.contact.email}?subject=${encodeURIComponent("Đăng ký nhận tin từ Ngòi Tình Nguyện")}`
  const asks = [
    { icon: ExternalLink, title: "Theo dõi fanpage", action: "Xem ngay", href: profile.contact.fanpage.href, external: true, photo: "/images/photos2/ttyt26-vol-snacks.jpg", alt: "Tình nguyện viên trao quà cho các em nhỏ" },
    { icon: Bell, title: "Nhận tin qua email", action: "Đăng ký", href: emailHref, external: true, photo: "/images/photos3/night-craft.jpg", alt: "Hai bạn tình nguyện viên làm thủ công buổi tối" },
    { icon: Users, title: "Cùng đi chuyến sau", action: "Ứng tuyển", href: routes.recruitment, external: false, photo: "/images/photos2/ttyt26-island-cleanup-b.jpg", alt: "Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng" },
  ]
  const cover = "/images/photos3/volunteers-steps.jpg"

  return (
    <>
      <section aria-labelledby="news-title" className="relative isolate overflow-hidden bg-night text-white">
        <Image src={cover} alt="" fill preload sizes="100vw" className="hero-settle -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
        <div className="mx-auto flex min-h-[360px] w-full max-w-[1100px] flex-col items-center justify-center gap-4 px-5 pt-14 pb-20 text-center md:min-h-[440px] md:gap-4 md:px-10 md:pb-28">
          <p className="text-xs font-bold tracking-[0.2em] text-flame-gold uppercase md:text-[13px]">Tin tức</p>
          <h1 id="news-title" className="font-head text-[38px] leading-[1.08] font-semibold text-balance md:text-[64px]">
            Chuyện từ các địa bàn.
          </h1>
          <p className="max-w-[680px] text-[15px] leading-relaxed text-white/90 md:text-[19px]">Nhật ký các chuyến đi, thông báo từ ban tổ chức và lời tri ân gửi đến những người đã cùng Ngòi viết tiếp.</p>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-11 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-[74px]" />
      </section>

      <NewsList posts={posts} topics={topics} leadSlug={featured[0]?.slug} />

      <Section tone="paper" spacing="lg" className="bg-sand" aria-labelledby="news-asks-title" containerClassName="flex flex-col items-center gap-8 md:gap-10">
        <h2 id="news-asks-title" className="font-head text-[28px] leading-tight font-semibold text-balance text-cta md:text-[42px]">
          Không muốn lỡ chuyến đi nào của Ngòi?
        </h2>
        <div className="w-full">
          <SnapRow aria-label="Cách theo dõi Ngòi" gridClassName="md:grid md:grid-cols-3 md:gap-7">
            {asks.map((a) => (
              <div key={a.title} className="flex h-[280px] flex-col overflow-hidden rounded-md bg-white md:h-[330px]">
                <div className="relative h-[130px] md:h-[170px]">
                  <Image src={a.photo} alt={a.alt} fill sizes="(min-width: 768px) 384px, 300px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col items-center justify-between gap-3 px-4 pt-5 pb-5 text-center">
                  <h3 className="font-head text-[19px] leading-tight font-semibold text-navy md:text-[22px]">{a.title}</h3>
                  <Button asChild size="md" variant="gold">
                    {a.external ? (
                      <a href={a.href} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                        <a.icon aria-hidden />
                        {a.action}
                      </a>
                    ) : (
                      <Link href={a.href}>
                        <a.icon aria-hidden />
                        {a.action}
                      </Link>
                    )}
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
