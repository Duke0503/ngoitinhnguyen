import * as React from "react"

import { Breadcrumb, type Crumb } from "@/shared/layout/breadcrumb"
import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { FlameRule } from "@/shared/ui/flame-rule"

type PageHeaderProps = {
  id: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  crumbs?: Crumb[]
  /** Right-hand slot (a key figure, an action). */
  aside?: React.ReactNode
}

/** Opening band of a list page: breadcrumb, eyebrow, H1, flame rule, one-line description. */
function PageHeader({ id, eyebrow, title, description, crumbs, aside }: PageHeaderProps) {
  return (
    <Section spacing="none" className="pt-7 pb-8 md:pt-12 md:pb-14" aria-labelledby={id} containerClassName="flex flex-col gap-6 md:gap-9">
      {crumbs && <Breadcrumb items={crumbs} />}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="flex max-w-[720px] flex-col gap-4 md:gap-5">
          <Eyebrow tone="orange" marker="dash" className="tracking-[0.14em] md:tracking-[0.18em]">
            {eyebrow}
          </Eyebrow>
          <h1 id={id} className="font-head text-[32px] leading-[1.12] font-semibold text-balance text-navy md:text-[48px] md:leading-[1.1]">
            {title}
          </h1>
          <FlameRule />
          {description && <p className="text-base leading-relaxed text-muted-ink md:text-lg">{description}</p>}
        </div>
        {aside}
      </div>
    </Section>
  )
}

export { PageHeader }
