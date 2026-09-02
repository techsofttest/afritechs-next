import React from "react";

interface InnerPageHeroProps {
  title: string;
  subtitle: string;
}

export default function InnerPageHero({ title, subtitle }: InnerPageHeroProps) {
  return (
    <section className="bg-[#0c2847] text-white pt-[140px] pb-16 px-6 md:px-16 lg:px-24 text-center relative overflow-hidden">
      {/* Slanted green background shape to match brand */}
      <div
        className="absolute bg-gradient-to-br from-brand/20 to-transparent opacity-40 pointer-events-none z-0"
        style={{
          top: "-10%",
          left: "10%",
          width: "500px",
          height: "500px",
          clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-4">
          {title}
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
