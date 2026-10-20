import Link from "next/link"
import { cacheLife } from "next/cache"

import { footerColumns, org } from "@/shared/config/site"
import { Container } from "@/shared/layout/section"
import { BrandMark } from "@/shared/ui/brand-mark"

// Cached so the footer stays prerenderable under Cache Components.
async function CopyrightYear() {
  "use cache"
  cacheLife("days")
  return <>{new Date().getFullYear()}</>
}

// py-3 makes the tap target 44px tall without changing the visual rhythm much.
const linkClass = "inline-flex items-center py-3 text-sm text-white/85 transition-colors hover:text-flame-gold md:py-1.5"
const headClass = "text-xs font-semibold tracking-[0.16em] text-flame-gold uppercase"

function SiteFooter() {
  return (
    <footer className="bg-navy px-5 pt-12 pb-8 text-white md:px-10 md:pt-20 md:pb-10 xl:px-0">
      <Container className="flex flex-col gap-10 md:gap-14">
        <div className="grid gap-10 md:grid-cols-[360px_1fr_1fr_auto] md:gap-16">
          <div className="flex flex-col gap-5">
            <BrandMark tone="dark" />
            <p className="text-sm leading-relaxed text-white/70">{org.about}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:contents">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3.5">
                <p className={headClass}>{col.title}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <p className={headClass}>Liên hệ</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${org.email}`} className={linkClass}>
                  {org.email}
                </a>
              </li>
              <li>
                <a href={org.fanpage.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {org.fanpage.label}
                </a>
              </li>
              <li className="text-sm text-white/85">{org.parentPage.label}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50 md:text-[13px]">© <CopyrightYear /> {org.name}</p>
          <p className="font-head text-sm text-white/60 italic">{org.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
