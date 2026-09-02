"use client";

import { useEffect, useRef, useState } from "react";

interface BannerProps {
  id?: string;
  bgImage: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  buttonText: string;
  buttonLink?: string;
  overlayClass?: string;
}

export default function Banner({
  id,
  bgImage,
  title,
  desc,
  buttonText,
  buttonLink = "#",
  overlayClass = "bg-gradient-to-r from-black/80 via-black/45 to-transparent"
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to switch off parallax
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-into-view reveal animation
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

  // Parallax scroll effect — desktop only
  useEffect(() => {
    const handleScroll = () => {
      // Skip parallax on mobile to avoid image clipping
      if (window.innerWidth < 768) {
        setTranslateY(0);
        return;
      }
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const elementHeight = rect.height;
      const middleOfElement = rect.top + elementHeight / 2;
      const middleOfViewport = viewportHeight / 2;

      const diff = middleOfElement - middleOfViewport;
      const offset = diff * -0.15;
      setTranslateY(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id={id} className="w-full max-w-[1440px] mx-auto px-4 md:px-16 lg:px-24 py-8">
      <div ref={containerRef} className="w-full relative h-[40vh] min-h-[240px] md:h-[60vh] md:min-h-[380px] flex items-center overflow-hidden text-white rounded-xl">
        {isMobile ? (
          /* Mobile: simple full-cover, no parallax, no clipping */
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        ) : (
          /* Desktop: parallax extended container */
          <div
            className="absolute inset-x-0 -top-[20%] h-[140%] bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              backgroundImage: `url(${bgImage})`,
              transform: `translate3d(0, ${translateY}px, 0)`
            }}
          />
        )}

        {/* Dark overlay for text readability */}
        <div className={`absolute inset-0 z-10 ${overlayClass}`} />

        <div
          ref={contentRef}
          className={`relative w-full px-6 md:px-16 lg:px-20 py-8 md:py-12 z-20 transition-all duration-[1500ms] ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="max-w-full md:max-w-[65%] lg:max-w-[50%] flex flex-col justify-center">
            <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold leading-tight mb-4">
              {title}
            </h2>
            <p className="text-sm md:text-base mb-6 leading-relaxed text-gray-200">
              {desc}
            </p>
            <a
              href={buttonLink}
              className="bg-white text-[#0c2847] text-sm md:text-base py-2.5 px-6 md:py-3 md:px-8 self-start hover:bg-brand hover:text-white transition-colors font-medium rounded-sm inline-block"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
