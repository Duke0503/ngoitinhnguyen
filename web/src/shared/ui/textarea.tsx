import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { fieldBase } from "@/shared/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "field-sizing-content min-h-24 py-3 leading-relaxed", className)}
      {...props}
    />
  )
}

export { Textarea }
