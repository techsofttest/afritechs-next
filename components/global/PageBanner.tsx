import React from "react";
import Image from "next/image";

interface PageBannerProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export default function PageBanner({ title, subtitle, imageSrc, imageAlt }: PageBannerProps) {
  return (
    <section className="relative bg-[#0c2847] text-[#0c2847] pt-[140px] pb-16 md:pt-[180px] md:pb-24 px-6 md:px-16 lg:px-24 overflow-hidden min-h-[25vh] md:min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Gradient Overlay for mobile */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#F9F3EE] to-transparent md:hidden" />

      <div className="max-w-7xl mx-auto relative z-20 text-left w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-sm md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
