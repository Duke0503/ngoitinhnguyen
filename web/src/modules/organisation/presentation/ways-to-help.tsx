import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { donateHref } from "@/shared/config/site"
import { SlantBand } from "@/shared/layout/slant-band"
import { Button } from "@/shared/ui/button"
import { SectionHeading } from "@/shared/ui/section-heading"

const mainWays = [
  {
    title: "Góp quỹ chương trình",
    description: "Chuyển khoản qua mã VietQR, nhận mã tra cứu và giấy chứng nhận online.",
    action: "Ủng hộ ngay",
    href: donateHref,
    photo: { src: "/images/photos/ttyt26-lantern-gift.jpg", alt: "Tình nguyện viên trao lồng đèn cho các em nhỏ" },
  },
  {
    title: "Cùng Ngòi đi tình nguyện",
    description: "Tham gia một chương trình, hoặc ứng tuyển thành viên nhiệm kỳ mới.",
    action: "Trở thành tình nguyện viên",
    href: routes.recruitment,
    photo: { src: "/images/photos/ttyt26-island-cleanup-2.jpg", alt: "Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng" },
  },
]

const otherWays = [
  { title: "Ủng hộ hiện vật", description: "Sách vở, sữa, gạo, bánh kẹo — gửi về đầu mối gần bạn.", href: routes.campaigns },
  { title: "Mua sản phẩm gây quỹ", description: "Hoa kẽm nhung, móc khoá handmade do tình nguyện viên làm.", href: routes.shop },
]

/** “Có nhiều cách để bạn đồng hành”: two photo cards on the brand-gradient slant, two lighter ways underneath. */
function WaysToHelp() {
  return (
    <SlantBand aria-labelledby="ways-title" containerClassName="flex flex-col items-center gap-10 md:gap-12">
      <SectionHeading id="ways-title" tone="dark" eyebrow="Cùng Ngòi viết tiếp" title="Có nhiều cách để bạn đồng hành" className="max-w-[720px] items-center text-center" />
      <ul className="grid w-full gap-5 md:grid-cols-2 md:gap-8">
        {mainWays.map((w, i) => (
          <li key={w.title} className="reveal flex flex-col overflow-hidden rounded-lg bg-white text-ink shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]" style={{ "--i": i } as React.CSSProperties}>
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={w.photo.src} alt={w.photo.alt} fill sizes="(min-width: 1200px) 584px, (min-width: 768px) 50vw, 100vw" className="parallax object-cover" />
            </div>
            <div className="flex flex-1 flex-col items-start gap-4 p-6 md:p-8">
              <h3 className="font-head text-2xl font-semibold text-navy md:text-[28px]">{w.title}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-muted-ink md:text-base">{w.description}</p>
              <Button asChild size="md">
                <Link href={w.href}>
                  {w.action}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <ul className="grid w-full gap-3 md:grid-cols-2 md:gap-8">
        {otherWays.map((w) => (
          <li key={w.title}>
            <Link href={w.href} className="group/way flex items-center justify-between gap-4 rounded-lg border border-white/20 bg-white/8 px-5 py-4 transition-colors hover:bg-white/15 md:px-7 md:py-5">
              <span className="flex flex-col gap-0.5">
                <span className="font-head text-lg font-semibold">{w.title}</span>
                <span className="text-sm text-white/75">{w.description}</span>
              </span>
              <ArrowRight aria-hidden className="size-5 shrink-0 text-flame-gold transition-transform group-hover/way:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </li>
        ))}
      </ul>
    </SlantBand>
  )
}

export { WaysToHelp }
