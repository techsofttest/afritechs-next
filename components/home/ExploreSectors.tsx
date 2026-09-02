"use client";

import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

const emblaOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
};

export interface SectorItem {
  id?: number | string;
  title: string;
  slug?: string;
  img: string;
}

interface ExploreSectorsProps {
  sectors?: SectorItem[];
}

export default function ExploreSectors({ sectors = [] }: ExploreSectorsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!sectors || sectors.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gray-100 py-12 md:py-16 px-4 md:px-16 lg:px-24 text-center text-[#0c2847] relative overflow-hidden">
      {/* Slanted brand green background shapes matching hero with depth */}
      <div
        className="absolute bg-gradient-to-br from-brand/60 to-transparent opacity-35 pointer-events-none z-0 hidden md:block"
        style={{
          top: '-20%',
          left: '5%',
          width: '400px',
          height: '450px',
          clipPath: 'polygon(19% 0%, 50% 0%, 31% 100%, 0% 100%)',
          filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.10))'
        }}
      />
      <div
        className="absolute bg-gradient-to-tl from-brand/60 to-transparent opacity-35 pointer-events-none z-0 hidden md:block"
        style={{
          bottom: '-25%',
          right: '5%',
          width: '450px',
          height: '450px',
          clipPath: 'polygon(19% 0%, 50% 0%, 31% 100%, 0% 100%)',
          filter: 'drop-shadow(-10px -10px 15px rgba(0, 0, 0, 0.10))'
        }}
      />

      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Explorez nos Secteurs
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Embla Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla Container */}
          <div className="flex -ml-2 select-none">
            {sectors.map((sector, index) => (
              /* Embla Slide */
              <div
                key={index}
                className="flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.66%] pl-2 flex flex-col items-center gap-3 group cursor-pointer shrink-0"
              >
                <div className="w-[120px] h-[120px] lg:w-[145px] lg:h-[145px] bg-white rounded-lg overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Image src={sector.img} alt={sector.title} fill sizes="(max-width: 1024px) 120px, 145px" className="object-cover group-hover:scale-105 transition-transform duration-300" priority={index < 5} />
                </div>
                <span className="text-[12px] lg:text-[13px] max-w-[120px] lg:max-w-[145px] leading-tight font-medium text-center">{sector.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
          aria-label="Secteurs précédents"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Right Arrow Button */}
        <button
          onClick={scrollNext}
          className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
          aria-label="Secteurs suivants"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
