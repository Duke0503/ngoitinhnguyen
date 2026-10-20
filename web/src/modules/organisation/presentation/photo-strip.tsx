import Image from "next/image"

import { Eyebrow } from "@/shared/ui/eyebrow"

const photos = [
  { src: "/images/photos3/volunteers-gifts.jpg", alt: "Tình nguyện viên chuẩn bị quà" },
  { src: "/images/photos3/night-craft.jpg", alt: "Hai bạn cùng làm thủ công buổi tối" },
  { src: "/images/photos3/banh-chung-pair.jpg", alt: "Hai tình nguyện viên khoe bánh chưng xanh vừa gói" },
  { src: "/images/photos3/elder-gift.jpg", alt: "Trao quà cho ông bà" },
  { src: "/images/photos3/kids-circle-reading.jpg", alt: "Các em ngồi quây tròn đọc thư" },
  { src: "/images/photos3/school-flag-assembly.jpg", alt: "Học sinh chào cờ ở điểm trường" },
  { src: "/images/photos3/xyt-assembly.jpg", alt: "Hội thi Rung chuông vàng ở trường THCS" },
  { src: "/images/photos3/hospital-k-gift.jpg", alt: "Trao quà Tết tại Bệnh viện K" },
]

/** Endless strip of moments. The second copy is hidden from assistive tech; motion stops on hover or reduced-motion. */
function PhotoStrip() {
  return (
    <section aria-labelledby="strip-title" className="overflow-hidden bg-night py-12 text-white md:py-[88px]">
      <div className="mx-auto mb-7 flex max-w-[1200px] flex-col gap-3 px-5 md:mb-10 md:items-center md:px-10 md:text-center">
        <Eyebrow tone="gold">Khoảnh khắc</Eyebrow>
        <h2 id="strip-title" className="font-head text-2xl font-semibold text-balance md:text-[40px]">
          Những gương mặt trên đường đi
        </h2>
      </div>
      <div className="strip-track flex w-max gap-2.5 md:gap-5">
        {[0, 1].map((copy) =>
          photos.map((p) => (
            <div key={`${copy}-${p.src}`} aria-hidden={copy === 1} className="relative h-[150px] w-[210px] shrink-0 overflow-hidden rounded-lg md:h-60 md:w-[340px] md:rounded-[10px]">
              <Image src={p.src} alt={copy === 1 ? "" : p.alt} fill sizes="340px" className="object-cover" />
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export { PhotoStrip }
