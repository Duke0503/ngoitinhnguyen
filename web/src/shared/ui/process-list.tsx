import { cn } from "@/shared/lib/utils"

type ProcessItem = { title: string; description?: string }

/** Numbered vertical process (recruitment steps). The first step is highlighted. */
function ProcessList({ items, highlight = 0, className }: { items: ProcessItem[]; highlight?: number; className?: string }) {
  return (
    <ol className={cn("flex flex-col gap-5 md:gap-6", className)}>
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4 md:gap-5">
          <span
            className={cn(
              "grid size-[30px] shrink-0 place-items-center rounded-full text-[13px] font-bold md:size-9 md:text-sm",
              i === highlight ? "bg-cta text-white" : "border border-field bg-white text-navy"
            )}
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-1 pt-0.5">
            <p className="font-head text-[17px] font-semibold text-navy md:text-[19px]">{item.title}</p>
            {item.description && <p className="text-sm leading-normal text-muted-ink md:text-[15px]">{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { ProcessList, type ProcessItem }
