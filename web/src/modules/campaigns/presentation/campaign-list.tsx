"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { cn } from "@/shared/lib/utils"
import { NativeSelect } from "@/shared/ui/native-select"

import { displayTitle, seriesLabel, type Campaign, type CampaignSeries } from "../domain/campaign"
import { filterCampaigns, filterOptions, pageCount, pageWindow, PER_PAGE } from "../domain/campaign-filter"
import { formatMonthYear } from "@/shared/lib/format"

const chipBase = "inline-flex h-10 shrink-0 items-center rounded-[4px] border px-4 text-sm font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-navy/25"

/**
 * Library of every campaign: one row of filters, equal photo cards, numbered pages. Filtering is local while the
 * seed has five campaigns; with the API it becomes query params (`series`, `year`, `province`, `q`, `page`).
 */
function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  const options = filterOptions(campaigns)
  const [series, setSeries] = useState<CampaignSeries | "">("")
  const [year, setYear] = useState("")
  const [province, setProvince] = useState("")
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)

  const filtered = filterCampaigns(campaigns, { series: series || undefined, year: year || undefined, province: province || undefined, q })
  const last = pageCount(filtered.length)
  const current = Math.min(page, last)
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const reset = () => {
    setSeries("")
    setYear("")
    setProvince("")
    setQ("")
    setPage(1)
  }
  const change = <T,>(set: (v: T) => void) => (v: T) => {
    set(v)
    setPage(1)
  }

  return (
    <Section spacing="none" tone="paper" className="pt-6 pb-16 md:pb-24" aria-label="Danh sách chương trình" containerClassName="flex flex-col items-center gap-8 md:gap-10">
      <div className="-mx-5 flex w-[calc(100%+40px)] snap-x scroll-px-5 items-center gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:w-full md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Lọc chương trình">
        {([["", "Tất cả"], ...options.series.map((s) => [s, seriesLabel(s)])] as [CampaignSeries | "", string][]).map(([key, label]) => (
          <button key={label} type="button" aria-pressed={series === key} onClick={() => change(setSeries)(key)} className={cn(chipBase, "snap-start", series === key ? "border-flame-orange bg-flame-orange text-night" : "border-field bg-white text-navy hover:border-navy/50")}>
            {label}
          </button>
        ))}
        <NativeSelect aria-label="Năm" value={year} onChange={(e) => change(setYear)(e.target.value)} className="h-10 w-auto shrink-0 rounded-[4px] bg-white text-sm font-semibold text-navy">
          <option value="">Năm</option>
          {options.years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </NativeSelect>
        <NativeSelect aria-label="Địa bàn" value={province} onChange={(e) => change(setProvince)(e.target.value)} className="h-10 w-auto shrink-0 rounded-[4px] bg-white text-sm font-semibold text-navy">
          <option value="">Địa bàn</option>
          {options.provinces.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </NativeSelect>
        <label className="relative shrink-0">
          <span className="sr-only">Tìm chương trình</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-ink" />
          <input type="search" value={q} onChange={(e) => change(setQ)(e.target.value)} placeholder="Tìm…" className="h-10 w-32 rounded-[4px] border border-field bg-white pr-3 pl-9 text-sm outline-none focus-visible:ring-3 focus-visible:ring-navy/25 md:w-44" />
        </label>
      </div>

      {visible.length === 0 ? (
        <div role="status" className="flex w-full max-w-[520px] flex-col items-center gap-3 rounded-md border border-line bg-white p-10 text-center">
          <p className="font-head text-[22px] font-semibold text-navy">Không tìm thấy chương trình nào</p>
          <p className="text-[15px] text-muted-ink">Thử bỏ bớt bộ lọc hoặc tìm bằng từ khoá khác.</p>
          <button type="button" onClick={reset} className="h-11 rounded-full border-[1.5px] border-navy px-5 text-sm font-semibold text-navy hover:bg-navy/5">
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
          {visible.map((c, i) => (
            <li key={c.slug}>
              <Link href={routes.campaign(c.slug)} className="group/campaign flex h-full flex-col items-center gap-3.5 rounded-md bg-white p-3.5 text-center shadow-[0_8px_22px_-8px_rgba(11,18,51,0.2)] transition-shadow hover:shadow-[0_14px_30px_-8px_rgba(11,18,51,0.3)] md:p-5">
                <div className="relative h-[180px] w-full overflow-hidden md:h-[200px]">
                  <Image src={c.cover.src} alt={c.cover.alt} fill priority={i < 3} sizes="(min-width: 1200px) 340px, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover/campaign:scale-[1.04] motion-reduce:transition-none" />
                </div>
                <p className="text-xs font-bold tracking-[0.1em] text-orange-ink uppercase">
                  {seriesLabel(c.series)} · {formatMonthYear(c.onSiteDates[0] ?? c.startsOn)}
                </p>
                <h3 className="font-head text-[21px] leading-tight font-semibold text-navy md:text-[22px]">{displayTitle(c)}</h3>
                <p className="flex-1 text-[15px] leading-normal text-muted-ink">{c.highlight}</p>
                <span className="text-[15px] font-bold text-cta">Xem thêm &gt;&gt;&gt;</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {last > 1 && (
        <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-1.5">
          <PageButton disabled={current === 1} onClick={() => setPage(current - 1)} label="Trang trước">
            ‹
          </PageButton>
          {pageWindow(current, last).map((n, i) =>
            n === 0 ? (
              <span key={`gap-${i}`} aria-hidden className="px-1 text-muted-ink">
                …
              </span>
            ) : (
              <PageButton key={n} active={n === current} onClick={() => setPage(n)} label={`Trang ${n}`}>
                {n}
              </PageButton>
            )
          )}
          <PageButton disabled={current === last} onClick={() => setPage(current + 1)} label="Trang sau">
            ›
          </PageButton>
        </nav>
      )}
      <p role="status" className="-mt-4 text-[13px] text-muted-ink">
        Hiển thị {filtered.length === 0 ? 0 : (current - 1) * PER_PAGE + 1}–{(current - 1) * PER_PAGE + visible.length} / {filtered.length} chương trình
      </p>
    </Section>
  )
}

function PageButton({ children, active, disabled, onClick, label }: { children: React.ReactNode; active?: boolean; disabled?: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" aria-label={label} aria-current={active ? "page" : undefined} disabled={disabled} onClick={onClick} className={cn("h-10 min-w-10 rounded-[3px] border px-3 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-navy/25 disabled:opacity-40", active ? "border-flame-orange bg-flame-orange text-night" : "border-field bg-white text-navy hover:border-navy/50")}>
      {children}
    </button>
  )
}

export { CampaignList }
