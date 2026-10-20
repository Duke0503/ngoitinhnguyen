import Image from "next/image"

type PageHeroProps = {
  id: string
  photo: string
  eyebrow: string
  title: string
  description?: string
  /** Extra content under the text (actions, status). */
  children?: React.ReactNode
  /** Smaller on pages where the form is the point. */
  size?: "md" | "lg"
}

/** Photo hero with a navy wash and slanted bottom edge: the opening of every inner page. Decorative photo (alt empty). */
function PageHero({ id, photo, eyebrow, title, description, children, size = "md" }: PageHeroProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-night text-white">
      <Image src={photo} alt="" fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
      <div className={`mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-4 px-5 pt-14 pb-24 text-center md:gap-[18px] md:px-10 md:pb-28 ${size === "lg" ? "min-h-[520px] md:min-h-[560px]" : "min-h-[400px] md:min-h-[440px]"}`}>
        <p className="text-xs font-bold tracking-[0.2em] text-flame-gold uppercase md:text-[13px]">{eyebrow}</p>
        <h1 id={id} className="max-w-[900px] font-head text-[34px] leading-[1.08] font-semibold text-balance md:text-[60px]">
          {title}
        </h1>
        {description && <p className="max-w-[680px] text-[15px] leading-relaxed text-white/90 md:text-lg">{description}</p>}
        {children}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-11 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-[74px]" />
    </section>
  )
}

export { PageHero }
