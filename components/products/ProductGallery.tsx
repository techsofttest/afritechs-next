import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

interface ProductGalleryProps {
  galleryImages: string[];
  activeImage: string;
  setActiveImage: (imgUrl: string) => void;
  title: string;
}

export default function ProductGallery({
  galleryImages,
  activeImage,
  setActiveImage,
  title
}: ProductGalleryProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize Embla Carousel for thumbnails
  // It will be vertical on desktop (lg) and horizontal on mobile/tablet
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: isMobile ? "x" : "y",
    loop: false,
    align: "start"
  });

  // Re-initialize the carousel when the axis changes
  useEffect(() => { if (emblaApi) emblaApi.reInit() }, [isMobile, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start w-full md:w-full lg:w-[420px] shrink-0">
      {/* Main Display Image - Now appears first in the DOM for better mobile layout */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#fafafa] border border-gray-100 lg:order-2">
        <Image src={activeImage} alt={title} fill priority sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 420px" className="object-cover" />
      </div>

      {/* Thumbnails Carousel Container */}
      <div className="flex lg:flex-col items-center justify-between w-full lg:w-20 lg:h-[324px] shrink-0 lg:order-1">
        {/* Scroll Prev Button (Up for desktop, Left for mobile) */}
        <button
          onClick={scrollPrev}
          className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#0c2847] flex items-center justify-center text-[#0c2847] hover:bg-[#0c2847] hover:text-white transition-all duration-200 cursor-pointer shadow-sm shrink-0 lg:mb-2"
          aria-label="Faire défiler"
        >
          {/* Up Arrow for Desktop */}
          <svg className="w-3.5 h-3.5 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          {/* Left Arrow for Mobile */}
          <svg className="w-3.5 h-3.5 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Embla Viewport */}
        <div className="overflow-hidden flex-1 w-full lg:w-20" ref={emblaRef}>
          {/* Embla Container (flex-row for mobile, flex-col for desktop) */}
          <div className="flex lg:flex-col gap-3 h-full">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-[#fafafa] transition-all cursor-pointer flex-[0_0_80px] lg:flex-none ${activeImage === imgUrl ? "ring-2 ring-[#0c2847] scale-95" : "opacity-80 hover:opacity-100"
                  }`}
              >
                <Image src={imgUrl} alt={`Thumbnail ${idx}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Next Button (Down for desktop, Right for mobile) */}
        <button
          onClick={scrollNext}
          className="w-7 h-7 rounded-full border border-gray-300 hover:border-[#0c2847] flex items-center justify-center text-[#0c2847] hover:bg-[#0c2847] hover:text-white transition-all duration-200 cursor-pointer shadow-sm shrink-0 lg:mt-2"
          aria-label="Faire défiler"
        >
          {/* Down Arrow for Desktop */}
          <svg className="w-3.5 h-3.5 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          {/* Right Arrow for Mobile */}
          <svg className="w-3.5 h-3.5 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
