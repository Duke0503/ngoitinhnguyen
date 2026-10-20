"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"

type TabsVariant = "underline" | "pill" | "responsive"

/**
 * Brand tabs built directly on Radix (so styling doesn't fight shadcn's tabs).
 * `underline` = desktop branch tabs, `pill` = chip tabs, `responsive` = pills
 * on mobile and underline tabs from `md` (one set of triggers, no duplicate ids).
 */
const VariantContext = React.createContext<TabsVariant>("underline")

function BrandTabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />
}

const listClass: Record<TabsVariant, string> = {
  underline: "flex gap-7 border-b border-line",
  pill: "flex flex-wrap gap-2",
  responsive: "flex flex-wrap gap-2 md:flex-nowrap md:gap-7 md:border-b md:border-line",
}

const triggerClass: Record<TabsVariant, string> = {
  underline:
    "-mb-px border-b-2 border-transparent pb-3 text-[15px] font-medium text-muted-ink hover:text-navy data-[state=active]:border-cta data-[state=active]:font-bold data-[state=active]:text-navy",
  pill: "inline-flex h-10 items-center rounded-full bg-navy/8 px-4 text-[13px] font-semibold text-navy data-[state=active]:bg-navy data-[state=active]:text-white",
  responsive: [
    "inline-flex h-10 items-center rounded-full bg-navy/8 px-4 text-[13px] font-semibold text-navy data-[state=active]:bg-navy data-[state=active]:text-white",
    "md:-mb-px md:h-auto md:rounded-none md:border-b-2 md:border-transparent md:bg-transparent md:px-0 md:pb-3 md:text-[15px] md:font-medium md:text-muted-ink md:hover:text-navy",
    "md:data-[state=active]:border-cta md:data-[state=active]:bg-transparent md:data-[state=active]:font-bold md:data-[state=active]:text-navy",
  ].join(" "),
}

function BrandTabsList({
  variant = "underline",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: TabsVariant }) {
  return (
    <VariantContext.Provider value={variant}>
      <TabsPrimitive.List className={cn(listClass[variant], className)} {...props} />
    </VariantContext.Provider>
  )
}

function BrandTabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(VariantContext)
  return (
    <TabsPrimitive.Trigger
      className={cn("outline-none focus-visible:ring-3 focus-visible:ring-navy/20", triggerClass[variant], className)}
      {...props}
    />
  )
}

function BrandTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("pt-5 outline-none md:pt-6", className)} {...props} />
}

export { BrandTabs, BrandTabsList, BrandTabsTrigger, BrandTabsContent }
