"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "../ui/Button";

export interface HeroSlideProps {
  id?: number | string;
  title: string;
  desc: string;
  img: string;
}

interface HeroProps {
  slides?: HeroSlideProps[];
}

export default function Hero({ slides: propSlides }: HeroProps) {
  const slides = propSlides && propSlides.length > 0 ? propSlides : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const safeSlideIndex = currentSlide < slides.length ? currentSlide : 0;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <section className="w-full relative overflow-hidden h-[65vh] md:h-[80vh] min-h-[420px] md:min-h-[500px]">
        {/* Full-width background image carousel */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="w-full h-full flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${safeSlideIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="relative w-full h-full shrink-0">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority={index === safeSlideIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(10,15,25,0.92) 0%, rgba(10,15,25,0.76) 20%, rgba(10,15,25,0.22) 70%, transparent 100%)",
          }}
        />

        {/* Text content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-start text-left pt-20 pb-20 md:pt-28 md:pb-32 pl-6 pr-6 md:pl-16 md:pr-12 lg:pl-24 lg:pr-16 max-w-2xl transition-all duration-500">
          <h1 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] leading-[1.15] mb-3 text-white font-semibold flex items-center drop-shadow-lg">
            {slides[safeSlideIndex].title}
          </h1>
          <p className="text-[14px] sm:text-[17px] md:text-[20px] text-white/85 mb-6 max-w-md drop-shadow">
            {slides[safeSlideIndex].desc}
          </p>
          <div className="flex gap-4">
            <Button variant="white" size="md" className="!text-[#0c2847] hover:!text-[#0c2847]">
              Découvrir
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="border-white text-white hover:bg-white hover:text-[#0c2847]"
            >
              Consulter
            </Button>
          </div>
        </div>
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute z-20 w-10 h-10 bg-[#1f2937]/80 hover:bg-[#374151] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm left-6 bottom-6 top-auto translate-y-0 md:left-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto"
          aria-label="Slide précédent"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute z-20 w-10 h-10 bg-[#1f2937]/80 hover:bg-[#374151] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm left-[72px] bottom-6 top-auto translate-y-0 md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto"
          aria-label="Slide suivant"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 right-6 md:right-16 z-20 flex justify-center items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${safeSlideIndex === index ? "w-18 bg-white" : "w-1.5 bg-white/40 hover:bg-white/80"
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
