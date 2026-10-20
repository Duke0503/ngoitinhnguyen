"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"

import { donateHref, siteNav } from "@/shared/config/site"
import { MobileNav } from "@/shared/layout/mobile-nav"
import { Container } from "@/shared/layout/section"
import { cn } from "@/shared/lib/utils"
import { BrandMark } from "@/shared/ui/brand-mark"
import { Button } from "@/shared/ui/button"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-paper/85 md:px-10 xl:px-0">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[88px]">
        <BrandMark size="responsive" />

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {siteNav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-sm text-[15px] font-medium text-navy transition-colors outline-none hover:text-cta focus-visible:ring-3 focus-visible:ring-ring/30",
                      active && "font-bold text-cta"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="h-11 md:px-5 md:text-[15px]">
            <Link href={donateHref}>
              Ủng hộ
              <Heart aria-hidden className="hidden size-4 md:block" />
            </Link>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </Container>
    </header>
  )
}

export { SiteHeader }
