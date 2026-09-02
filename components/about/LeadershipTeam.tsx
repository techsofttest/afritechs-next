import React from "react";
import Image from "next/image";

export default function LeadershipTeam() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Équipe Dirigeante
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 mb-3 md:mb-4">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
              alt="Mr. Arun"
              fill
              className="object-cover"
            />
          </div>
          <h4 className="text-base md:text-lg font-semibold">Mr. Arun</h4>
          <span className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">Fondateur & Président</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 mb-3 md:mb-4">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
              alt="Aissatou Diallo"
              fill
              className="object-cover"
            />
          </div>
          <h4 className="text-base md:text-lg font-semibold">Aissatou Diallo</h4>
          <span className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">Directrice Opérationnelle - Guinée</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 mb-3 md:mb-4">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
              alt="Rajesh Kumar"
              fill
              className="object-cover"
            />
          </div>
          <h4 className="text-base md:text-lg font-semibold">Rajesh Kumar</h4>
          <span className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">Responsable Logistique & UAE</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 mb-3 md:mb-4">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
              alt="Mariama Sylla"
              fill
              className="object-cover"
            />
          </div>
          <h4 className="text-base md:text-lg font-semibold">Mariama Sylla</h4>
          <span className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">Directrice Administrative & Financière</span>
        </div>
      </div>
    </section>
  );
}
