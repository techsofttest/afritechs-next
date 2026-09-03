import React from "react";
import Image from "next/image";

interface ChairmanMessageProps {
  data?: {
    section_title?: string;
    heading?: string;
    quote?: string;
    name?: string;
    role?: string;
    photo?: string;
  };
}

export default function ChairmanMessage({ data }: ChairmanMessageProps) {
  const sectionTitle = data?.section_title || "Chairman's Message";
  const heading = data?.heading || "Guider Afri-techs vers l'avenir";
  const quote = data?.quote || "Depuis la fondation d'Afri-techs en 2015, notre ambition a toujours été de construire un pont d'excellence industrielle entre la Guinée, les Émirats Arabes Unis et les marchés mondiaux. En apportant des solutions complètes de mécanisation agricole et d'automobile aux communautés locales, nous permettons aux entreprises de prospérer et de réaliser une croissance durable.";
  const name = data?.name || "Mr. Arun";
  const role = data?.role || "Fondateur & Président, Afri-techs";
  const photo = data?.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80";

  return (
    <section className="relative bg-[#0c2847] text-white py-12 md:py-20 px-4 md:px-16 lg:px-24 overflow-hidden w-full border-b border-gray-800">
      <div
        className="absolute bg-gradient-to-br from-brand/20 to-transparent opacity-80 pointer-events-none z-0"
        style={{
          top: "-10%",
          left: "10%",
          width: "500px",
          height: "500px",
          clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-white uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            {sectionTitle}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full lg:w-1/3 relative aspect-square max-w-[280px] sm:max-w-[320px] rounded-full overflow-hidden border-2 border-brand/40">
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col items-start text-left">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">{heading}</h3>
            <p className="text-gray-200 text-sm md:text-base lg:text-lg italic leading-relaxed mb-4 md:mb-6 font-medium">
              &ldquo;{quote}&rdquo;
            </p>
            <span className="font-semibold text-white text-base md:text-lg">{name}</span>
            <span className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider">{role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
