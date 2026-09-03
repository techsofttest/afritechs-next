import React from "react";
import Image from "next/image";

interface CompanyProfileProps {
  data?: {
    section_title?: string;
    heading?: string;
    p1?: string;
    p2?: string;
    image?: string;
  };
}

export default function CompanyProfile({ data }: CompanyProfileProps) {
  const sectionTitle = data?.section_title || "";
  const heading = data?.heading || "";
  const p1 = data?.p1 || "";
  const p2 = data?.p2 || "";
  const imageSrc = data?.image || "/no-image.jpg";

  if (!data || (!sectionTitle && !heading && !p1 && !p2 && !data.image)) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      {sectionTitle && (
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            {sectionTitle}
          </h2>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-center">
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          {heading && <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#0c2847]">{heading}</h3>}
          {p1 && (
            <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-medium">
              {p1}
            </p>
          )}
          {p2 && (
            <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-medium">
              {p2}
            </p>
          )}
        </div>
        <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
          <Image
            src={imageSrc}
            alt="Afri-techs Office"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
