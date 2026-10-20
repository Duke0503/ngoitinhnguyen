import Image from "next/image"

import { cn } from "@/shared/lib/utils"

type LogoTileProps = {
  name: string
  /** Small caption under the name, e.g. “Nhà tài trợ Đồng”. */
  role?: string
  /** Extra muted line, e.g. the campaigns supported. */
  note?: string
  /** Logo image; when missing the tile shows the name as a serif wordmark. */
  logoSrc?: string
  size?: "sm" | "md"
  className?: string
}

/**
 * Partner / sponsor tile: logo (or wordmark fallback) + name + role.
 * The name is not repeated when it is already shown as the wordmark.
 */
function LogoTile({ name, role, note, logoSrc, size = "md", className }: LogoTileProps) {
  return (
    <figure className={cn("flex flex-col", size === "md" ? "gap-2.5" : "gap-1.5", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-[10px] border border-line",
          size === "md" ? "h-20 p-3" : "h-16 p-2",
          logoSrc ? "bg-white" : "bg-paper"
        )}
      >
        {logoSrc ? (
          <Image src={logoSrc} alt={`Logo ${name}`} fill sizes="200px" quality={90} className={cn("object-contain", size === "md" ? "p-3" : "p-2")} />
        ) : (
          <span className={cn("text-center font-head font-semibold text-navy", size === "md" ? "text-[15px]" : "text-[13px]")}>
            {name}
          </span>
        )}
      </div>
      <figcaption className="flex flex-col gap-0.5">
        {logoSrc && <span className={cn("font-semibold text-ink", size === "md" ? "text-[13px]" : "text-xs")}>{name}</span>}
        {role && <span className="text-xs text-muted-ink">{role}</span>}
        {note && <span className="text-xs text-muted-ink/80">{note}</span>}
      </figcaption>
    </figure>
  )
}

export { LogoTile }
