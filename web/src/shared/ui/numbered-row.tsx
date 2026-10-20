import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type NumberedRowProps = {
  index: number
  title: string
  description?: string
  href: string
  className?: string
}

/** “01  Góp quỹ chương trình  ↗” editorial list row. Rows are separated by top rules. */
function NumberedRow({ index, title, description, href, className }: NumberedRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/row flex items-start gap-3.5 border-t border-line py-[18px] last:border-b md:gap-7 md:py-6",
        className
      )}
    >
      <span className="w-[26px] shrink-0 font-head text-[17px] text-flame-orange md:w-[34px] md:text-xl">
        {String(index).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1 md:gap-1.5">
        <span className="font-head text-[19px] font-semibold text-navy transition-colors group-hover/row:text-cta md:text-[23px]">
          {title}
        </span>
        {description && <span className="text-sm leading-normal text-muted-ink md:text-[15px]">{description}</span>}
      </span>
      <ArrowUpRight
        aria-hidden
        className="mt-1 size-5 shrink-0 text-navy transition-transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 md:size-[22px]"
      />
    </Link>
  )
}

export { NumberedRow }
