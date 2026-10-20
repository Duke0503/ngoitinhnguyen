import Image, { type ImageProps } from "next/image"
import { MapPin } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type PhotoProps = Omit<ImageProps, "fill" | "width" | "height"> & {
  /** CSS aspect ratio, e.g. "4/3". Pass `null` when `frameClassName` sets an explicit height. */
  ratio?: string | null
  caption?: React.ReactNode
  rounded?: "sm" | "md" | "none"
  fit?: "cover" | "contain"
  frameClassName?: string
}

/**
 * Responsive photo frame (next/image `fill`). Source photos are small
 * (≤ 590px, from the fanpage crawl), so always pass realistic `sizes`.
 */
function Photo({
  ratio = "4/3",
  caption,
  rounded = "sm",
  fit = "cover",
  className,
  frameClassName,
  sizes = "(min-width: 768px) 50vw, 100vw",
  alt,
  ...props
}: PhotoProps) {
  const frame = (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-sand",
        rounded === "sm" && "rounded-md",
        rounded === "md" && "rounded-lg",
        frameClassName
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        fill
        alt={alt}
        sizes={sizes}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
        {...props}
      />
    </div>
  )

  if (!caption) return frame
  return (
    <figure className="flex flex-col gap-2.5">
      {frame}
      <figcaption className="flex items-center gap-2 text-[13px] text-muted-ink">
        <MapPin aria-hidden className="size-3.5 shrink-0 text-flame-orange" />
        {caption}
      </figcaption>
    </figure>
  )
}

export { Photo }
