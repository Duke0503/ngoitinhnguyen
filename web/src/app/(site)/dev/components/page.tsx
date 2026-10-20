import { routes } from "@/shared/config/routes"
import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Gift, MapPin, Sparkles } from "lucide-react"

import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { CtaBand } from "@/shared/layout/cta-band"
import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { BrandMark } from "@/shared/ui/brand-mark"
import { Button } from "@/shared/ui/button"
import { Callout } from "@/shared/ui/callout"
import { Card, CardKicker } from "@/shared/ui/card"
import { Chip } from "@/shared/ui/chip"
import { CompareTable } from "@/shared/ui/compare-table"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { FlameRule } from "@/shared/ui/flame-rule"
import { LogoTile } from "@/shared/ui/logo-tile"
import { MetaItem, MetaLine } from "@/shared/ui/meta"
import { MeterRow } from "@/shared/ui/meter-row"
import { NumberedRow } from "@/shared/ui/numbered-row"
import { Photo } from "@/shared/ui/photo"
import { ProcessList } from "@/shared/ui/process-list"
import { ProgressBar } from "@/shared/ui/progress-bar"
import { SectionHeading } from "@/shared/ui/section-heading"
import { Stat } from "@/shared/ui/stat"
import { StatusTimeline } from "@/shared/ui/status-timeline"
import { Steps } from "@/shared/ui/steps"
import { TextLink } from "@/shared/ui/text-link"

import { FormDemos } from "./form-demos"

export const metadata: Metadata = {
  title: "Thư viện thành phần",
  robots: { index: false, follow: false },
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 border-t border-line pt-8">
      <p className="font-mono text-xs tracking-wider text-muted-ink uppercase">{title}</p>
      {children}
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <>
      <Section spacing="md" containerClassName="flex flex-col gap-12">
        <SectionHeading
          as="h1"
          size="lg"
          eyebrow="Design system"
          title="Thư viện thành phần dùng chung"
          description="Mỗi thành phần ở đây tương ứng với design/ngoi-website.pen. Nội dung là dữ liệu thật hoặc được ghi rõ là minh hoạ."
        />

        <Block title="Brand mark">
          <div className="flex flex-wrap items-center gap-10">
            <BrandMark href={null} />
            <BrandMark href={null} size="sm" />
            <div className="rounded-xl bg-navy p-5">
              <BrandMark href={null} tone="dark" />
            </div>
          </div>
        </Block>

        <Block title="Typography · Eyebrow · FlameRule">
          <Eyebrow marker="dash" tone="muted">
            Dự án thiện nguyện từ năm 2024 · Trực thuộc Cộng đồng Tình nguyện Việt Nam
          </Eyebrow>
          <h2 className="max-w-3xl font-head text-[38px] leading-[1.1] font-semibold text-navy md:text-hero">
            Vì nụ cười của các em trên con đường tìm con chữ.
          </h2>
          <FlameRule />
          <p className="max-w-2xl text-lede">
            Ngòi bắt đầu từ những cây bút học trò ở Gia Lai năm 2020. Hôm nay, chúng mình mang sách vở, học bổng, quà Trung thu và
            Tết đến các em nhỏ.
          </p>
          <div className="flex flex-wrap gap-8">
            <Eyebrow>Hành trình của Ngòi</Eyebrow>
            <Eyebrow tone="cta" marker="dot">
              Chương trình đang diễn ra
            </Eyebrow>
          </div>
        </Block>

        <Block title="SectionHeading sizes">
          <SectionHeading eyebrow="Cùng Ngòi viết tiếp" title="Có nhiều cách để bạn đồng hành" />
          <SectionHeading
            size="md"
            eyebrow="Đơn ứng tuyển"
            title="Một lá đơn, ngay trên website"
            description="Không còn nhiều đường link rời rạc. Bạn nộp đơn, nhận email xác nhận và theo dõi kết quả tại một nơi."
          />
        </Block>

        <Block title="Buttons & links">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Ủng hộ chương trình</Button>
            <Button variant="outline">Trở thành tình nguyện viên</Button>
            <Button variant="subtle" size="sm">
              Báo cáo
            </Button>
            <Button size="lg">Góp 25.000đ</Button>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <TextLink href={routes.campaigns}>Xem tất cả chương trình</TextLink>
            <TextLink href={routes.sponsors} tone="cta">
              Trở thành nhà đồng hành
            </TextLink>
            <TextLink href={routes.campaigns} icon="none" underline size="sm">
              Nhận giấy chứng nhận có mộc đỏ
            </TextLink>
          </div>
        </Block>

        <Block title="Chips">
          <div className="flex flex-wrap gap-3">
            <Chip tone="blossom">Chào mừng Ngày Phụ nữ Việt Nam 20/10</Chip>
            <Chip tone="success">Đã công khai</Chip>
            <Chip tone="warning" icon={<Gift aria-hidden />}>
              Mua combo 3 món — giảm 5.000đ/đơn
            </Chip>
            <Chip tone="navy">TP. Hồ Chí Minh</Chip>
            <Chip>Gia đình chính sách</Chip>
            <Chip tone="outline">Nhân sự</Chip>
          </div>
        </Block>

        <Block title="Meta · Callout">
          <div className="flex flex-wrap gap-7">
            <MetaItem icon={Calendar}>18 & 20.10.2026</MetaItem>
            <MetaItem icon={MapPin}>Mái ấm Thiên Phước, An Phú Đông, TP.HCM</MetaItem>
            <MetaLine tag="Đèn Trăng 2" date="21.09.2026" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Callout tone="info">
              Cập nhật 09/2026: điểm Chùa Linh Ứng (Hà Nội) được chuyển sang Chùa Thiên Hương, phường Thượng Hồng, Hưng Yên.
            </Callout>
            <Callout tone="success">Địa chỉ nằm trong khu vực tình nguyện viên giao tận tay.</Callout>
            <Callout tone="blossom">Từ 25.000đ: nhận giấy chứng nhận online có mộc đỏ của ban tổ chức.</Callout>
            <Callout tone="navy">Thông tin của bạn chỉ ban nhân sự xem được và được xoá sau khi kết thúc đợt tuyển.</Callout>
          </div>
        </Block>

        <Block title="Photo">
          <div className="grid gap-5 md:grid-cols-3">
            <Photo src="/images/photos/ttyt26-lantern-gift.jpg" alt="Tình nguyện viên trao lồng đèn cho các em ở Thiềng Liềng" ratio="4/5" caption="Trung Thu Yêu Thương 2026 · Ấp đảo Thiềng Liềng" />
            <Photo src="/images/photos/ttyt25-gialai-children.jpg" alt="Các em nhỏ ở Ia Băng, Gia Lai" ratio="4/3" />
            <Photo src="/images/photos/ttyt25-hanoi-street.jpg" alt="Trao quà Trung thu trên phố Hà Nội" ratio="4/3" />
          </div>
        </Block>

        <Block title="Card · Progress · MeterRow">
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="flex flex-col gap-4">
              <CardKicker>Hoa Tháng 10 · số liệu minh hoạ</CardKicker>
              <p className="flex items-baseline gap-1.5">
                <span className="font-head text-[28px] font-semibold text-navy">{formatVnd(3120000)}</span>
                <span className="text-[15px] text-muted-ink">/ {formatVnd(3875000)}</span>
              </p>
              <ProgressBar value={3120000} max={3875000} label="Tiến độ gây quỹ Hoa Tháng 10" />
              <p className="text-xs text-muted-ink">86 lượt ủng hộ</p>
            </Card>
            <Card className="flex flex-col gap-4">
              <CardKicker>Báo cáo tài chính · minh hoạ</CardKicker>
              <MeterRow label="Chuyển khoản cá nhân" value={formatVnd(7200000)} ratio={1} />
              <MeterRow label="Nhà tài trợ" value={formatVnd(4000000)} ratio={4 / 7.2} />
              <MeterRow label="Quà & lồng đèn" value={formatVnd(8400000)} ratio={1} tone="orange" />
            </Card>
          </div>
        </Block>

        <Block title="Steps · Process · Status timeline">
          <Steps steps={["Chọn số tiền", "Chuyển khoản", "Xác nhận"]} current={1} />
          <div className="grid gap-10 md:grid-cols-2">
            <ProcessList
              items={[
                { title: "Nộp đơn", description: "Điền đơn ngay trên website, chọn ban hoặc đội hình. Nhận email xác nhận." },
                { title: "Phỏng vấn", description: "Với các đợt tuyển lớn, ban nhân sự hẹn lịch phỏng vấn trực tuyến." },
                { title: "Hồi âm", description: "Kết quả gửi qua email." },
                { title: "Xác nhận", description: "Bấm xác nhận trong email để chính thức gia nhập nhà Ngòi." },
              ]}
            />
            <div>
              <NumberedRow index={1} title="Góp quỹ chương trình" description="Chuyển khoản qua mã VietQR, nhận mã tra cứu và giấy chứng nhận online." href={routes.donate} />
              <NumberedRow index={2} title="Ủng hộ hiện vật" description="Sách vở, sữa, gạo, bánh kẹo — gửi về đầu mối gần bạn." href={routes.campaigns} />
            </div>
          </div>
          <StatusTimeline
            current={3}
            steps={[
              { label: "Đã đặt", detail: "15.10 · 21:04" },
              { label: "Đã thanh toán", detail: "15.10 · 21:30" },
              { label: "Đang chuẩn bị", detail: "16.10" },
              { label: "Đang giao", detail: "17.10 · TNV Tú Quyên" },
              { label: "Đã giao" },
            ]}
          />
        </Block>

        <Block title="Breadcrumb · Compare table">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Chương trình", href: routes.campaigns }, { label: "Đèn Trăng 2" }]} />
          <CompareTable
            caption="Quyền lợi theo gói tài trợ Hoa Tháng 10"
            columns={[
              { key: "kc", title: "Kim cương", subtitle: "15.000.000đ", highlight: true },
              { key: "v", title: "Vàng", subtitle: "10.000.000đ" },
              { key: "b", title: "Bạc", subtitle: "8.000.000đ" },
              { key: "d", title: "Đồng", subtitle: "4.000.000đ" },
              { key: "dh", title: "Đồng hành", subtitle: "2.000.000đ" },
            ]}
            rows={[
              { label: "Tên đơn vị trong bảng vàng của dự án", values: { kc: true, v: true, b: true, d: true, dh: true } },
              { label: "Logo trên tất cả ấn phẩm truyền thông", values: { kc: "Bằng logo dự án", v: "Bằng logo dự án", b: "Bằng logo dự án", d: "½ logo dự án", dh: "½ logo dự án" } },
              { label: "Logo trên các phần quà được trao tặng", values: { kc: true, v: null, b: null, d: null, dh: null } },
            ]}
          />
        </Block>

        <Block title="LogoTile (v2 partner strip)">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-6 md:gap-5">
            <LogoTile logoSrc="/images/partners/vnv.jpg" name="Cộng đồng Tình nguyện Việt Nam" role="Bảo trợ pháp lý" />
            <LogoTile logoSrc="/images/partners/hp-event-wear.jpg" name="Đồng phục H&P" role="Nhà tài trợ Đồng" />
            <LogoTile logoSrc="/images/partners/vong.jpg" name="Nhóm Thiện nguyện Vọng" role="Nhà tài trợ Gấu bông" />
            <LogoTile logoSrc="/images/partners/vang-studio.jpg" name="Vàng Studio" role="Nhà tài trợ" />
            <LogoTile name="MXH Duyên dáng Việt Nam" role="Bảo trợ truyền thông" />
            <LogoTile name="Cơm nắm Mei Mei" role="Độc giả tử tế 2024" />
          </div>
        </Block>

        <Block title="Form controls (interactive)">
          <FormDemos />
        </Block>
      </Section>

      <Section tone="night" spacing="md" containerClassName="flex flex-col gap-12">
        <SectionHeading tone="dark" eyebrow="Dấu ấn 2024 — 2026" title="Trên nền đêm (night)" />
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-5">
          <Stat size="lg" tone="dark" value="500+" label="phần quà đã trao tận tay" />
          <Stat size="lg" tone="dark" divider="left" value="100+" label="lồng đèn Trung thu cho ấp đảo" />
          <Stat size="lg" tone="dark" divider="left" value="35" label="suất học bổng" />
          <Stat size="lg" tone="dark" divider="left" value="4" label="tỉnh, thành phố" />
          <Stat size="lg" tone="dark" divider="left" value="28" label="thành viên nhiệm kỳ 2026 — 2027" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="gold">Nhận thông báo khi mở đơn</Button>
          <Button variant="outline-light">Liên hệ ban tổ chức</Button>
          <Chip tone="success-dark">Đã hoàn thành</Chip>
          <Chip tone="translucent" icon={<Calendar aria-hidden />}>
            21.08 — 26.09.2026
          </Chip>
          <Chip tone="outline-dark" icon={<Sparkles aria-hidden className="text-flame-gold" />}>
            Truyền thông
          </Chip>
          <TextLink href={routes.recruitment} tone="light">
            Tuyển thành viên
          </TextLink>
        </div>
        <Breadcrumb tone="dark" items={[{ label: "Trang chủ", href: "/" }, { label: "Chương trình", href: routes.campaigns }, { label: "Đèn Trăng 2" }]} />
        <div className="grid gap-6 md:grid-cols-4">
          <Stat tone="dark" divider="top" value="4" label="địa bàn" />
          <Stat tone="dark" divider="top" value="160+" label="suất quà" />
          <Stat tone="light" size="sm" value="2020" label="(light, sm)" className="rounded-lg bg-paper p-3" />
        </div>
      </Section>

      <CtaBand
        eyebrow="Viết tiếp cùng Ngòi"
        title="Mỗi đóng góp nhỏ đều viết tiếp một câu chuyện cho các em."
        actions={
          <>
            <Button asChild size="lg">
              <Link href={routes.donate}>Ủng hộ chương trình</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={routes.recruitment}>Trở thành tình nguyện viên</Link>
            </Button>
          </>
        }
      />
    </>
  )
}
