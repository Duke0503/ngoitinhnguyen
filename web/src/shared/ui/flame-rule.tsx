import { cn } from "@/shared/lib/utils"

/** The thin logo-gradient underline used under hero headings. Decorative. */
function FlameRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-1 w-22 rounded-full bg-flame md:w-30", className)} />
}

export { FlameRule }
