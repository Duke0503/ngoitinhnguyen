import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type CompareColumn = { key: string; title: string; subtitle?: string; highlight?: boolean }
/** `true` → ✓, `false`/`null` → —, string → text. */
type CompareCell = boolean | string | null
type CompareRow = { label: string; values: Record<string, CompareCell> }

type CompareTableProps = {
  caption: string
  rowHeader?: string
  columns: CompareColumn[]
  rows: CompareRow[]
  className?: string
}

/** Feature comparison table (sponsor tiers). Scrolls horizontally on small screens. */
function CompareTable({ caption, rowHeader = "Quyền lợi", columns, rows, className }: CompareTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-line bg-white", className)}>
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-night text-white">
          <tr>
            <th scope="col" className="w-[34%] px-6 py-5 text-xs font-bold tracking-[0.14em] text-white/60 uppercase">
              {rowHeader}
            </th>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn("px-3 py-4 text-center", c.highlight && "bg-flame-gold/12")}>
                <span className={cn("block font-head text-lg font-semibold", c.highlight ? "text-flame-gold" : "text-white")}>{c.title}</span>
                {c.subtitle && <span className="block text-[13px] font-normal text-white/70">{c.subtitle}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-line">
              <th scope="row" className="px-6 py-4 text-sm leading-snug font-normal text-ink">
                {r.label}
              </th>
              {columns.map((c) => {
                const v = r.values[c.key]
                return (
                  <td key={c.key} className={cn("px-2 py-3 text-center text-[13px]", c.highlight && "bg-flame-gold/5")}>
                    {v === true ? (
                      <Check aria-label="Có" className="mx-auto size-[18px] text-cta" />
                    ) : v ? (
                      <span className="font-semibold text-navy">{v}</span>
                    ) : (
                      <span aria-label="Không" className="text-[#b9b2a6]">—</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { CompareTable, type CompareColumn, type CompareRow, type CompareCell }
