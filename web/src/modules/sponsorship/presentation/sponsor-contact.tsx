import { Globe, Mail, Phone, type LucideIcon } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { SectionHeading } from "@/shared/ui/section-heading"

type ContactDetails = {
  email: string
  phone: string
  phoneHolder: string
  fanpage: { label: string; href: string }
}

function Row({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-4 border-t border-white/12 py-4 first:border-t-0 md:py-[18px]">
      <Icon aria-hidden className="size-5 shrink-0 text-flame-gold" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-xs text-white/65">{label}</span>
        <span className="text-[15px] font-semibold break-words text-white md:text-base">{children}</span>
      </div>
    </li>
  )
}

const linkClass = "underline-offset-4 outline-none hover:underline focus-visible:underline"

function SponsorContact({ contact }: { contact: ContactDetails }) {
  return (
    <Section id="contact" tone="night" spacing="lg" aria-labelledby="contact-title" containerClassName="grid gap-8 md:grid-cols-[1fr_460px] md:items-center md:gap-[72px]">
      <SectionHeading
        id="contact-title"
        tone="dark"
        eyebrow="Liên hệ tài trợ"
        title="Cùng Ngòi viết chương trình tiếp theo"
        description="Gửi email cho ban tổ chức để nhận hồ sơ chương trình và trao đổi gói phù hợp với đơn vị bạn."
      />
      <ul className="rounded-xl border border-white/12 bg-white/5 px-5 md:px-7">
        <Row icon={Mail} label="Email">
          <a className={linkClass} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </Row>
        <Row icon={Phone} label={contact.phoneHolder}>
          <a className={linkClass} href={`tel:${contact.phone.replace(/\s/g, "")}`}>
            {contact.phone}
          </a>
        </Row>
        <Row icon={Globe} label="Fanpage">
          <a className={linkClass} href={contact.fanpage.href} target="_blank" rel="noreferrer">
            {contact.fanpage.label}
          </a>
        </Row>
      </ul>
    </Section>
  )
}

export { SponsorContact }
