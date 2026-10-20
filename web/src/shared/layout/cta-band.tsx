import * as React from "react"

import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { FlameRule } from "@/shared/ui/flame-rule"

type CtaBandProps = {
  eyebrow?: string
  title: React.ReactNode
  /** Usually a primary + an outline `Button`; they stack full-width on mobile. */
  actions: React.ReactNode
}

/** Closing call-to-action band placed right before the footer (trust → action). */
function CtaBand({ eyebrow, title, actions }: CtaBandProps) {
  return (
    <Section tone="paper" spacing="lg" rule="top" containerClassName="flex flex-col gap-5 md:flex-row md:items-center md:gap-12">
      <div className="flex flex-1 flex-col gap-3.5">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="max-w-[24ch] font-head text-[26px] leading-[1.2] font-semibold text-balance text-navy md:text-[38px]">
          {title}
        </h2>
        <FlameRule />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center [&>*]:max-md:w-full">{actions}</div>
    </Section>
  )
}

export { CtaBand }
