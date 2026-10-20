import { Section } from "@/shared/layout/section"
import { Photo } from "@/shared/ui/photo"
import { SectionHeading } from "@/shared/ui/section-heading"

const reasons = [
  {
    title: "Trao tận tay",
    description: "Tình nguyện viên trực tiếp mang quà đến điểm trường, mái ấm, ấp đảo — có hình ảnh và bài tổng kết.",
    photo: { src: "/images/photos/ttyt26-lantern-gift.jpg", alt: "Tình nguyện viên trao lồng đèn cho các em nhỏ ở ấp đảo Thiềng Liềng" },
  },
  {
    title: "Minh bạch từng đồng",
    description: "Danh sách ủng hộ và báo cáo thu — chi được công khai trên website sau mỗi chương trình.",
    photo: { src: "/images/photos/xyt26-school-forum.jpg", alt: "Diễn đàn “Nghe em nói – Nói em nghe” tại trường THPT Nguyễn Thị Minh Khai" },
  },
  {
    title: "Cộng đồng người trẻ",
    description: "Học sinh, sinh viên trên cả nước — lan toả thông điệp của đơn vị đến thế hệ trẻ.",
    photo: { src: "/images/photos/xyt26-banh-chung-team.jpg", alt: "Các tình nguyện viên trẻ gói bánh chưng trong chương trình Xuân Yêu Thương" },
  },
]

function WhySponsor() {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="why-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <SectionHeading id="why-title" eyebrow="Vì sao chọn Ngòi" title="Nhỏ, nhưng làm đến nơi đến chốn" className="max-w-[760px]" />
      <ul className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6">
        {reasons.map((r) => (
          <li key={r.title} className="flex gap-4 md:flex-col md:gap-3.5">
            <Photo src={r.photo.src} alt={r.photo.alt} ratio={null} frameClassName="h-20 w-28 shrink-0 md:h-[220px] md:w-full" sizes="(min-width: 768px) 400px, 112px" />
            <div className="flex flex-col gap-1.5 md:gap-2">
              <h3 className="font-head text-[19px] leading-snug font-semibold text-navy md:text-[22px]">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted-ink md:text-[15px] md:leading-[1.6]">{r.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export { WhySponsor }
