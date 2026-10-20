import Image from "next/image"

import { cn } from "@/shared/lib/utils"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { ImageRef } from "../domain/campaign"

function Tile({ image, className, sizes }: { image: ImageRef; className?: string; sizes: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-sand", className)}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
    </div>
  )
}

/** First photo large, the next two stacked beside it (stacked below on mobile). */
function CampaignGallery({ images }: { images: ImageRef[] }) {
  const [first, second, third] = images
  if (!first) return null
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <SectionHeading size="sm" eyebrow="Khoảnh khắc" title="Ảnh từ các địa bàn" />
      <div className="grid grid-cols-2 gap-2 md:h-80 md:grid-rows-2 md:gap-3">
        <Tile image={first} sizes="(min-width: 768px) 400px, 100vw" className={cn("h-52 md:h-auto", second ? "col-span-2 md:col-span-1 md:row-span-2" : "col-span-2")} />
        {second && <Tile image={second} sizes="(min-width: 768px) 400px, 50vw" className={cn("h-36 md:h-auto", !third && "md:row-span-2")} />}
        {third && <Tile image={third} sizes="(min-width: 768px) 400px, 50vw" className="h-36 md:h-auto" />}
      </div>
    </div>
  )
}

export { CampaignGallery }
