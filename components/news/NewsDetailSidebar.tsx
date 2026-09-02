import React from "react";
import Button from "../ui/Button";

interface NewsDetailSidebarProps {
  benefits?: string[];
}

export default function NewsDetailSidebar({ benefits = [] }: NewsDetailSidebarProps) {
  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-8 sticky top-[100px]">
      {/* Key Benefits Card */}
      {benefits.length > 0 && (
        <div className="bg-[#0c2847] text-white rounded-2xl p-6 md:p-8 shadow-md">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-6 pb-3 border-b border-white/10">
            Avantages Clés
          </h3>
          <ul className="flex flex-col gap-4 text-sm md:text-base text-gray-200">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="text-brand font-bold shrink-0">✦</span>
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-brand/10 border border-brand/20 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-4">
        <h4 className="text-lg font-bold text-[#0c2847]">
          Besoin d&apos;un accompagnement technique ?
        </h4>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          Nos équipes d&apos;experts vous accompagnent dans la mise en œuvre de vos projets d&apos;équipements et d&apos;infrastructures en Afrique de l&apos;Ouest.
        </p>
        <a href="/contact" className="w-full">
          <Button variant="primary" className="w-full justify-center text-sm font-bold">
            Contactez un expert
          </Button>
        </a>
      </div>
    </div>
  );
}
