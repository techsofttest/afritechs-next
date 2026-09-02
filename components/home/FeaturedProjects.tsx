"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Card from "../ui/Card";

export interface ProjectItem {
  id?: string;
  slug?: string;
  tag: string;
  title: string;
  desc: string;
  location: string;
  img: string;
}

interface FeaturedProjectsProps {
  projects?: ProjectItem[];
}

export default function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
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

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projets" className="w-full py-12 md:py-16 px-4 md:px-16 lg:px-24 bg-white text-[#0c2847]">
      <div className="max-w-[1440px] mx-auto text-center">

        {/* Unified Section Header */}
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            Projets Phares
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Embla Container */}
            <div className="flex -ml-6 select-none">
              {projects.map((project, index) => (
                /* Embla Slide */
                <div
                  key={index}
                  className="flex-[0_0_50%] pl-6 md:flex-[0_0_33.333%] lg:flex-[0_0_25%] flex flex-col text-left bg-transparent shrink-0"
                >
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
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
            aria-label="Projets précédents"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Right Arrow Button */}
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
            aria-label="Projets suivants"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2.5 pt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === index ? "w-18 bg-btn" : "w-1.5 bg-gray-400 hover:bg-gray-600"
                }`}
              aria-label={`Project Slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
