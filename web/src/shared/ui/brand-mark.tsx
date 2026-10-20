import Image from "next/image"
import Link from "next/link"

import { cn } from "@/shared/lib/utils"

type BrandMarkProps = {
  tone?: "light" | "dark"
  /** `responsive` = sm on mobile, md from the `md` breakpoint. */
  size?: "sm" | "md" | "responsive"
  href?: string | null
  className?: string
}

const sizes = {
  sm: { gap: "gap-2.5", logo: "h-9", name: "text-[17px]", sub: "text-[9px]" },
  md: { gap: "gap-3", logo: "h-12", name: "text-[21px]", sub: "text-[10px]" },
  responsive: {
    gap: "gap-2.5 md:gap-3",
    logo: "h-9 md:h-12",
    name: "text-[17px] md:text-[21px]",
    sub: "text-[9px] md:text-[10px]",
  },
}

/**
 * Official flame-quill logo (12.08.2024) with a typeset wordmark.
 * The wordmark is live text, not part of the image.
 */
function BrandMark({ tone = "light", size = "md", href = "/", className }: BrandMarkProps) {
  const content = (
    <span className={cn("inline-flex items-center", sizes[size].gap, className)}>
      <Image
        src="/images/logo/quill-flame.png"
        alt=""
        width={258}
        height={422}
        className={cn("w-auto shrink-0", sizes[size].logo)}
      />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-head leading-tight font-semibold",
            sizes[size].name,
            tone === "light" ? "text-navy" : "text-white"
          )}
        >
          Ngòi Tình Nguyện
        </span>
        <span
          className={cn(
            "font-semibold tracking-[0.24em] uppercase",
            sizes[size].sub,
            tone === "light" ? "text-flame-orange" : "text-flame-gold"
          )}
        >
          Viết Cho Em
        </span>
      </span>
    </span>
  )

  if (!href) return content
  return (
    <Link href={href} aria-label="Ngòi Tình Nguyện – Viết Cho Em, trang chủ" className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
      {content}
    </Link>
  )
}

export { BrandMark }
