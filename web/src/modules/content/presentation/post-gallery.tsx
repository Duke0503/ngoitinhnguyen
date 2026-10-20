import Image from "next/image"

type PostGalleryProps = { photos: { src: string; alt: string }[] }

/** Extra photos of a post: one wide frame, or a two-column grid with the odd one out spanning both. */
function PostGallery({ photos }: PostGalleryProps) {
  if (photos.length === 0) return null
  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:gap-4" aria-label="Hình ảnh trong bài viết">
      {photos.map((p, i) => (
        <li key={p.src} className={photos.length % 2 === 1 && i === 0 ? "sm:col-span-2" : undefined}>
          <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-navy/5">
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1200px) 600px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export { PostGallery }
