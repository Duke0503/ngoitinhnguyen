"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { donateHref, org, siteNav } from "@/shared/config/site"
import { cn } from "@/shared/lib/utils"
import { BrandMark } from "@/shared/ui/brand-mark"
import { Button } from "@/shared/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-navy outline-none hover:bg-navy/5 focus-visible:ring-3 focus-visible:ring-ring/30 lg:hidden"
          aria-label="Mở menu"
        >
          <Menu aria-hidden className="size-[26px]" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[86%] gap-0 border-line bg-paper p-0 sm:max-w-sm">
        <div className="border-b border-line px-5 py-4">
          <SheetTitle asChild>
            <div>
              <BrandMark size="sm" href={null} />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">Điều hướng trang</SheetDescription>
        </div>
        <nav aria-label="Điều hướng chính" className="flex-1 px-5 py-4">
          <ul className="flex flex-col">
            {siteNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn("block py-4 font-head text-xl font-semibold text-navy", active && "text-cta")}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 border-t border-line px-5 py-5">
          <Button asChild fullWidth>
            <Link href={donateHref} onClick={() => setOpen(false)}>
              Ủng hộ chương trình
            </Link>
          </Button>
          <p className="text-center text-xs text-muted-ink">{org.email}</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
