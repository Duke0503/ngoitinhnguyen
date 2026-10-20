import * as React from "react"

import { cn } from "@/shared/lib/utils"

type Fact = { label: string; value: React.ReactNode }

/** Key/value rows separated by rules (“Quyết định · A1006/2026/QĐ-VNV”). */
function FactList({ facts, className }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={cn("flex flex-col", className)}>
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col gap-1 border-t border-line py-3.5 md:flex-row md:gap-6">
          <dt className="text-sm text-muted-ink md:w-[180px] md:shrink-0">{f.label}</dt>
          <dd className="text-[15px] font-semibold text-navy">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { FactList, type Fact }
