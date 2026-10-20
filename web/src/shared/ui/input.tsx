import * as React from "react"

import { cn } from "@/shared/lib/utils"

const fieldBase =
  "w-full min-w-0 rounded-lg border border-field bg-white px-3.5 text-[15px] text-ink transition-colors outline-none placeholder:text-[#9a9daa] hover:border-[#c9bba5] focus-visible:border-navy focus-visible:ring-3 focus-visible:ring-navy/12 disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-60 aria-invalid:border-cta aria-invalid:ring-3 aria-invalid:ring-cta/12"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />
}

export { Input, fieldBase }
