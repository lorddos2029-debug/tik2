import { useRef, useState } from "react";

interface PillowGalleryProps {
  images: string[];
  productName: string;
}

export function PillowGallery({ images, productName }: PillowGalleryProps) {
  const [activeImage, setActiveImage] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const updateActiveImage = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setActiveImage(Math.min(images.length, Math.round(scroller.scrollLeft / scroller.clientWidth) + 1));
  };

  return (
    <div className="relative bg-white">
      <div
        ref={scrollerRef}
        onScroll={updateActiveImage}
        className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${productName} — imagem ${index + 1}`}
            width={800}
            height={800}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="block h-full w-full shrink-0 snap-start object-cover"
          />
        ))}
      </div>
      <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-1 text-[11px] font-semibold text-white">
        {activeImage}/{images.length}
      </span>
    </div>
  );
}