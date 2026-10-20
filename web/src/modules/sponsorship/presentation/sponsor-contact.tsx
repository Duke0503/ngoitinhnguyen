import { Mail } from "lucide-react"

import { Button } from "@/shared/ui/button"


const requestHref = (email: string) => `mailto:${email}?subject=${encodeURIComponent("Xin hồ sơ tài trợ chương trình Ngòi Tình Nguyện")}`

/** Contact band on the dusk gradient. No form yet: the button opens an email to the organisers. */
function SponsorContact({ contact }: { contact: { email: string } }) {
  return (
    <div className="bg-white" id="contact">
      <section aria-labelledby="contact-title" className="w-full bg-dusk-gradient px-5 py-[calc(var(--slant)+48px)] text-white [--slant:clamp(28px,4.5vw,72px)] [clip-path:polygon(0_var(--slant),100%_0,100%_100%,0_100%)] md:px-10 md:py-[calc(var(--slant)+88px)] xl:px-0">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-6 md:grid-cols-[1fr_580px] md:gap-24">
          <div className="flex flex-col gap-3.5 md:gap-4">
            <h2 id="contact-title" className="font-head text-[30px] leading-[1.12] font-semibold md:text-[46px]">
              Trao đổi cùng ban tổ chức
            </h2>
            <p className="max-w-[30ch] text-[17px] leading-relaxed text-white/90 md:text-xl">Gửi một email ngắn, Ngòi sẽ gửi hồ sơ tài trợ và hẹn trao đổi trực tiếp với đơn vị của bạn.</p>
          </div>
          <div className="flex flex-col gap-3.5 rounded-[14px] bg-white p-6 text-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] md:p-9">
            <p className="text-[15px] leading-relaxed">Chưa có form tự động: nút bên dưới mở email gửi tới ban truyền thông của Ngòi.</p>
            <Button asChild size="lg" className="w-full">
              <a href={requestHref(contact.email)}>
                <Mail aria-hidden />
                Gửi email xin hồ sơ tài trợ
              </a>
            </Button>
            <p className="text-[13px] text-muted-ink">{contact.email}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export { SponsorContact }
