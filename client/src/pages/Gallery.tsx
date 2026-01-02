import GalleryGrid from "@/components/GalleryGrid";
import { photos } from "@/data/content";

export default function Gallery() {
  const galleryImages = photos.map((photo) => ({
    id: photo.id,
    src: photo.url,
    alt: photo.alt,
    caption: photo.caption,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">生活相簿</h1>
        <p className="text-muted-foreground mt-2">用鏡頭捕捉美好的每一刻</p>
      </div>

      <GalleryGrid images={galleryImages} />
    </div>
  );
}
