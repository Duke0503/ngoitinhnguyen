import Link from "next/link"

import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { FlameRule } from "@/shared/ui/flame-rule"
import { SectionHeading } from "@/shared/ui/section-heading"

export default function NotFound() {
  return (
    <Section spacing="lg" containerClassName="flex max-w-2xl flex-col gap-6">
      <SectionHeading as="h1" size="lg" eyebrow="404" title="Trang này chưa được viết nên" description="Có thể đường dẫn đã đổi hoặc trang chưa được đăng. Mời bạn quay lại trang chủ để đi tiếp." />
      <FlameRule />
      <div>
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </Section>
  )
}
