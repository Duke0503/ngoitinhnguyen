import { routes } from "@/shared/config/routes"
import Image from "next/image"

import { donateHref } from "@/shared/config/site"
import { Section } from "@/shared/layout/section"
import { NumberedRow } from "@/shared/ui/numbered-row"
import { SectionHeading } from "@/shared/ui/section-heading"

const ways = [
  { title: "Góp quỹ chương trình", description: "Chuyển khoản qua mã VietQR, nhận mã tra cứu và giấy chứng nhận online.", href: donateHref },
  { title: "Ủng hộ hiện vật", description: "Sách vở, sữa, gạo, bánh kẹo — gửi về đầu mối gần bạn ở TP.HCM, Hà Nội, Gia Lai.", href: routes.campaigns },
  { title: "Mua sản phẩm gây quỹ", description: "Hoa kẽm nhung, móc khoá handmade do chính tình nguyện viên làm.", href: routes.shop },
  { title: "Trở thành tình nguyện viên", description: "Tham gia một chương trình, hoặc ứng tuyển thành viên nhiệm kỳ mới.", href: routes.recruitment },
]

function WaysToHelp() {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="ways-title" containerClassName="grid gap-6 md:grid-cols-[520px_1fr] md:items-center md:gap-20">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md md:order-first md:aspect-auto md:h-[520px] max-md:order-2">
        <Image
          src="/images/photos/ttyt26-island-cleanup-2.jpg"
          alt="Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng"
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-6 md:gap-9 max-md:contents">
        <SectionHeading id="ways-title" eyebrow="Cùng Ngòi viết tiếp" title="Có nhiều cách để bạn đồng hành" className="max-md:order-1" />
        <div className="max-md:order-3">
          {ways.map((w, i) => (
            <NumberedRow key={w.title} index={i + 1} {...w} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export { WaysToHelp }
