import { MapPin, Users } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { Card } from "@/shared/ui/card"
import { SectionHeading } from "@/shared/ui/section-heading"

import { waysToJoin } from "../domain/recruitment"

const icons = [Users, MapPin]

function WaysToJoin() {
  return (
    <Section spacing="lg" aria-labelledby="ways-join-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <SectionHeading id="ways-join-title" eyebrow="Hai cách đồng hành" title="Chọn hành trình phù hợp với bạn" className="max-w-[720px]" />
      <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
        {waysToJoin.map((w, i) => {
          const Icon = icons[i] ?? Users
          return (
            <li key={w.title}>
              <Card padding="none" className="flex h-full flex-col gap-4 p-5 md:gap-[18px] md:p-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-flame-orange/10">
                    <Icon className="size-5 text-flame-orange" />
                  </span>
                  <h3 className="font-head text-xl font-semibold text-navy md:text-[26px]">{w.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-muted-ink md:text-base">{w.description}</p>
                <dl className="flex flex-col">
                  {w.facts.map((f) => (
                    <div key={f.label} className="flex flex-col gap-0.5 border-t border-line py-3 md:flex-row md:gap-4">
                      <dt className="text-sm text-muted-ink md:w-[120px] md:shrink-0">{f.label}</dt>
                      <dd className="text-sm font-semibold text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export { WaysToJoin }
