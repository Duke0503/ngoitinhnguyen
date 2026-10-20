import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { fieldBase } from "@/shared/ui/input"

/**
 * Native <select> styled like our inputs. Preferred for short lists
 * (34 tỉnh/thành) because it uses the phone's own picker on mobile.
 */
function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select data-slot="native-select" className={cn(fieldBase, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-[18px] -translate-y-1/2 text-muted-ink" />
    </div>
  )
}

export { NativeSelect }
