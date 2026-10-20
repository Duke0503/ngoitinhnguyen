import { Mail } from "lucide-react"

import { Button } from "@/shared/ui/button"

const subject = encodeURIComponent("Đăng ký nhận tin từ Ngòi Tình Nguyện")
const body = encodeURIComponent("Chào Ngòi, mình muốn nhận tin về các chương trình và thông báo tuyển thành viên.\n\nHọ và tên:\nEmail:")

/**
 * “Cùng Ngòi viết tiếp”: sign-up band. There is no mailing list yet, so the button opens an email to the
 * organisers (the same way the sponsor package is requested); the band says so instead of faking a form.
 */
function NewsletterBand({ email }: { email: string }) {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative w-full bg-[linear-gradient(180deg,#1f2a5c_0%,#7a2a3a_62%,#f46a22_100%)] px-5 py-[calc(var(--slant)+48px)] text-white [--slant:clamp(28px,4.5vw,72px)] [clip-path:polygon(0_var(--slant),100%_0,100%_100%,0_100%)] md:px-10 md:py-[calc(var(--slant)+88px)] xl:px-0"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 md:grid-cols-[1fr_580px] md:gap-24">
        <div className="flex flex-col gap-4 md:gap-5">
          <h2 id="newsletter-title" className="font-head text-[34px] leading-[1.1] font-semibold md:text-[48px]">
            Cùng Ngòi viết tiếp
          </h2>
          <p className="max-w-[28ch] text-lg leading-relaxed text-white/90 md:text-xl">
            Nhận tin mới về các chương trình, thông báo tuyển thành viên và những chuyến đi của Ngòi.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[14px] bg-white p-7 text-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] md:p-9">
          <p className="text-[15px] leading-relaxed">
            Ngòi chưa có danh sách gửi tin tự động. Gửi cho chúng mình một email ngắn, ban truyền thông sẽ thêm bạn vào danh sách và chỉ dùng email để gửi tin; bạn có thể xin rút tên bất cứ lúc nào.
          </p>
          <Button asChild size="lg" className="w-full">
            <a href={`mailto:${email}?subject=${subject}&body=${body}`}>
              <Mail aria-hidden />
              Gửi email đăng ký
            </a>
          </Button>
          <p className="text-[13px] text-muted-ink">{email}</p>
        </div>
      </div>
    </section>
  )
}

export { NewsletterBand }
