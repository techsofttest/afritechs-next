"use client";

import React, { useState, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import useEmblaCarousel from "embla-carousel-react";

interface RelatedProjectItem {
  id?: string;
  slug?: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
  location: string;
}

interface ServiceRelatedProjectsProps {
  relatedProjects: RelatedProjectItem[];
}

export default function ServiceRelatedProjects({ relatedProjects }: ServiceRelatedProjectsProps) {
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

  if (relatedProjects.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-gray-200 w-full text-center">
      <div className="max-w-[1440px] mx-auto text-center mb-12">
        <h2 className="text-[28px] lg:text-[34px] font-bold text-[#0c2847] uppercase tracking-wider relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-brand">
          Projets Réalisés
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto relative px-4 md:px-8">
        {/* Embla Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla Container */}
          <div className="flex -ml-6 select-none">
            {relatedProjects.map((project, idx) => (
              /* Embla Slide */
              <div
                key={idx}
                className="flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] flex flex-col text-left bg-transparent shrink-0"
              >
                <div className="w-full">
                  <Card
                    variant="overlay"
                    tag={project.tag}
                    title={project.title}
                    desc={project.desc}
                    img={project.img}
                    location={project.location}
                    buttonText="Lire plus →"
                    href={`/projets/${project.slug || project.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {relatedProjects.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
              aria-label="Projets précédents"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
              aria-label="Projets suivants"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Carousel Indicators */}
      {relatedProjects.length > 1 && (
        <div className="flex justify-center items-center gap-2.5 pt-8">
          {relatedProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === index ? "w-18 bg-btn" : "w-1.5 bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Project Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
