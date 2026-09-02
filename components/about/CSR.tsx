import React from "react";
import Image from "next/image";

export default function CSR() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            Responsabilité Sociétale des Entreprises
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#0c2847]">Investir dans le développement des communautés locales</h3>
            <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-semibold">
              Depuis nos débuts en Guinée, nous redistribuons les fruits de notre croissance en investissant dans la formation technique des jeunes ruraux et l&apos;accès à l&apos;eau potable.
            </p>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
              À travers l&apos;Académie Agronome Afri Techs et l&apos;installation de forages solaires gratuits dans des villages distants, nous favorisons l&apos;autonomisation socio-économique et améliorons la qualité de vie au quotidien.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative aspect-video rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
              alt="CSR local support"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
