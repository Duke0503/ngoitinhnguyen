import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { SectionHeading } from "@/shared/ui/section-heading"

const groups = [
  { title: "Học sinh vùng sâu, vùng xa", place: "Ia Băng, Đak Đoa — Gia Lai", photo: { src: "/images/photos3/gialai-students-group.jpg", alt: "Học sinh vùng xa ở Gia Lai chụp ảnh nhóm" }, tall: true },
  { title: "Ông bà neo đơn", place: "Mái ấm Vị Hoàng, TP.HCM", photo: { src: "/images/photos3/elders-lanterns.jpg", alt: "Ông bà cùng tình nguyện viên vẽ lồng đèn" }, tall: false },
  { title: "Bệnh nhân Bệnh viện K", place: "Xuân Yêu Thương · Hà Nội", photo: { src: "/images/photos3/hospital-k-gift.jpg", alt: "Tình nguyện viên trao quà Tết tại Bệnh viện K" }, tall: true },
  { title: "Môi trường ấp đảo", place: "Thiềng Liềng, TP.HCM", photo: { src: "/images/photos3/island-cleanup.jpg", alt: "Dọn rác ven sông ở ấp đảo Thiềng Liềng" }, tall: false },
]

/** Four photo cards, alternate ones dropped lower so the row has a rhythm instead of a flat grid. */
function WhoWeHelp() {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="help-title" containerClassName="flex flex-col items-center gap-8 md:gap-12">
      <SectionHeading
        id="help-title"
        eyebrow="Chúng mình đồng hành cùng"
        title="Không chỉ các em nhỏ"
        description="Mỗi chương trình tìm đến những nơi còn thiếu: điểm trường vùng xa, mái ấm, bệnh viện và cả những con phố về đêm."
        className="max-w-[760px] items-center text-center"
      />
      <ul className="grid w-full grid-cols-2 items-start gap-3 md:grid-cols-4 md:gap-6">
        {groups.map((g, i) => (
          <li key={g.title} className={`reveal ${i % 2 ? "md:pt-[60px]" : ""}`} style={{ "--i": i } as React.CSSProperties}>
            <div className={`relative overflow-hidden rounded-xl bg-night md:rounded-[14px] ${g.tall ? "h-[230px] md:h-[400px]" : "h-[230px] md:h-[340px]"}`}>
              <Image src={g.photo.src} alt={g.photo.alt} fill sizes="(min-width: 768px) 276px, 50vw" className="object-cover" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-night/90" />
              <div className="absolute inset-x-3 bottom-3 flex flex-col gap-0.5 text-white md:inset-x-5 md:bottom-5">
                <h3 className="font-head text-[17px] leading-tight font-semibold md:text-[21px]">{g.title}</h3>
                <p className="text-xs text-white/85 md:text-sm">{g.place}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export { WhoWeHelp }
