import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { donateHref } from "@/shared/config/site"
import { SlantBand } from "@/shared/layout/slant-band"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { SnapRow } from "@/shared/ui/snap-row"

const ways = [
  {
    title: "Góp quỹ chương trình",
    description: "Chuyển khoản qua mã VietQR, nhận mã tra cứu và giấy chứng nhận online.",
    action: "Ủng hộ ngay",
    href: donateHref,
    tone: "primary" as const,
    photo: { src: "/images/photos2/ttyt26-vol-snacks.jpg", alt: "Tình nguyện viên trao quà cho các em nhỏ" },
  },
  {
    title: "Cùng Ngòi đi tình nguyện",
    description: "Tham gia một chương trình, hoặc ứng tuyển thành viên nhiệm kỳ mới.",
    action: "Trở thành tình nguyện viên",
    href: routes.recruitment,
    tone: "primary" as const,
    photo: { src: "/images/photos2/ttyt26-island-cleanup-b.jpg", alt: "Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng" },
  },
  {
    title: "Ủng hộ hiện vật",
    description: "Sách vở, sữa, gạo, bánh kẹo — gửi về đầu mối gần bạn ở TP.HCM, Hà Nội hoặc Gia Lai.",
    action: "Xem danh sách cần gửi",
    href: routes.campaigns,
    tone: "navy" as const,
    photo: { src: "/images/photos2/ttyt26-boy-rice.jpg", alt: "Em nhỏ ôm bao gạo được trao tặng" },
  },
  {
    title: "Mua sản phẩm gây quỹ",
    description: "Hoa kẽm nhung, móc khoá handmade do chính tình nguyện viên làm. Mỗi món là một phần quà cho các em.",
    action: "Vào cửa hàng",
    href: routes.shop,
    tone: "navy" as const,
    photo: { src: "/images/products/moc-khoa-hoa.jpg", alt: "Móc khoá hoa handmade" },
  },
]

/** “Muốn đi cùng Ngòi một chặng?”: four photo cards on the brand-gradient slant. Donate/volunteer use the CTA red; the rest navy. */
function WaysToHelp() {
  return (
    <SlantBand aria-labelledby="ways-title" containerClassName="flex flex-col items-center gap-10 md:gap-12">
      <div className="flex flex-col gap-3 max-md:self-start md:items-center md:text-center">
        <Eyebrow tone="gold">Cùng Ngòi viết tiếp</Eyebrow>
        <h2 id="ways-title" className="font-head text-[32px] leading-[1.15] font-semibold text-balance text-white md:text-[44px]">
          Muốn đi cùng Ngòi một chặng?
        </h2>
      </div>
      <div className="w-full">
        <SnapRow aria-label="Các cách đồng hành" gridClassName="md:grid md:grid-cols-2 md:gap-8" dotClassName="bg-white/35" activeDotClassName="bg-flame-gold">
          {ways.map((w) => (
            <div key={w.title} className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
              <div className="relative h-[180px] overflow-hidden md:h-[210px]">
                <Image src={w.photo.src} alt={w.photo.alt} fill sizes="(min-width: 1200px) 584px, (min-width: 768px) 50vw, 300px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col items-start gap-3 p-[22px] md:gap-3.5 md:p-8">
                <h3 className="font-head text-2xl font-semibold text-navy md:text-[28px]">{w.title}</h3>
                <p className="flex-1 text-[15px] leading-relaxed text-muted-ink md:text-base">{w.description}</p>
                <Button asChild size="md" className={w.tone === "navy" ? "bg-navy hover:bg-night" : undefined}>
                  <Link href={w.href}>
                    {w.action}
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </SnapRow>
      </div>
    </SlantBand>
  )
}

export { WaysToHelp }
