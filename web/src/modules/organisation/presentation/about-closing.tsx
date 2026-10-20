import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { donateHref } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"

/** Closing ask on the dusk gradient; the white backing lets the slanted top edge meet the section above. */
function AboutClosing() {
  return (
    <div className="bg-white">
      <section aria-labelledby="closing-title" className="w-full bg-dusk-gradient px-5 py-[calc(var(--slant)+56px)] text-center text-white [--slant:clamp(28px,4.5vw,72px)] [clip-path:polygon(0_var(--slant),100%_0,100%_100%,0_100%)] md:px-10 md:py-[calc(var(--slant)+96px)]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 md:gap-8">
          <h2 id="closing-title" className="font-head text-[32px] leading-[1.12] font-semibold text-balance md:text-[56px]">
            Viết tiếp hành trình cùng Ngòi.
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="max-sm:w-full">
              <Link href={donateHref}>Ủng hộ chương trình</Link>
            </Button>
            <Button asChild size="lg" variant="outline-light" className="max-sm:w-full">
              <Link href={routes.recruitment}>Trở thành tình nguyện viên</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export { AboutClosing }
