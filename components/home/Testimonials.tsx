"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export interface TestimonialItem {
  id?: string;
  name: string;
  text: string;
  image?: string;
  initials?: string;
  role?: string;
  location?: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start"
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-16 lg:px-24 bg-gray-50 text-center text-[#0c2847] relative">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            Témoignages Clients
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Embla Container */}
            <div className="flex -ml-6 select-none">
              {testimonials.map((t, index) => (
                /* Embla Slide */
                <div
                  key={index}
                  className="flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] flex flex-col text-left bg-transparent shrink-0"
                >
                  <div className="flex flex-col bg-white rounded-lg p-6 md:p-8 border border-gray-300 h-full min-h-[250px]">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      {t.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 border border-gray-200">
                          <Image
                            src={t.image}
                            alt={t.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] shrink-0 bg-[#0c2847] text-[#F0F4E3] font-sans">
                          {t.initials || t.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="text-[17px] font-bold text-[#0c2847]">{t.name}</h3>
                        {(t.role || t.location) && (
                          <p className="text-[13px] text-gray-700">
                            {t.role}{t.role && t.location ? " — " : ""}{t.location && <span className="font-semibold text-gray-900">{t.location}</span>}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-brand fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-sm md:text-base text-gray-900 leading-relaxed italic font-medium flex-1">
                      " {t.text} "
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
            aria-label="Témoignages précédents"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Right Arrow Button */}
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
            aria-label="Témoignages suivants"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonials Carousel Indicators */}
        <div className="flex justify-center items-center gap-2.5 pt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === index ? "w-18 bg-btn" : "w-1.5 bg-gray-400 hover:bg-gray-600"
                }`}
              aria-label={`Testimonial Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
