"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden text-white text-center">
      <div
        className="absolute inset-0 bg-scroll md:bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/banner/cta-banner2.png')` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div 
        ref={contentRef}
        className={`relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-20 z-20 flex flex-col items-center gap-6 transition-all duration-[1500ms] ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-tight max-w-5xl">
          Prêt à propulser vos projets <br /> avec nos technologies ?
        </h2>
        <Button variant="white" size="lg" className="self-center font-bold">
          Contactez-nous
        </Button>
      </div>
    </section>
  );
}
