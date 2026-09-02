import React from "react";

export default function QualitySecurity() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Politique Qualité & Sécurité
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Quality Policy */}
        <div className="flex flex-col items-start border border-gray-200 p-6 md:p-12 rounded-2xl">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#0c2847]">L&apos;Excellence Technique Sans Compromis</h3>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 font-medium">
            Afri-techs s&apos;engage à livrer exclusivement des équipements de haute performance dotés des certifications constructeurs internationales (ISO, CE).
          </p>
          <ul className="flex flex-col gap-2 md:gap-2.5 text-gray-700 text-xs sm:text-sm font-semibold">
            <li className="flex gap-2 items-center">✓ Contrôles rigoureux avant expédition maritime.</li>
            <li className="flex gap-2 items-center">✓ Fourniture exclusive de pièces détachées certifiées d&apos;origine.</li>
            <li className="flex gap-2 items-center">✓ Service après-vente et maintenance préventive sur site.</li>
          </ul>
        </div>

        {/* HSE Policy */}
        <div className="flex flex-col items-start border border-gray-200 p-6 md:p-12 rounded-2xl">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#0c2847]">Protéger nos Hommes et notre Écosystème</h3>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 font-medium">
            La sécurité routière et la prévention des accidents lors du maniement des engins lourds et du stockage de lubrifiants sont nos priorités absolues.
          </p>
          <ul className="flex flex-col gap-2 md:gap-2.5 text-gray-700 text-xs sm:text-sm font-semibold">
            <li className="flex gap-2 items-center">⚠ Zéro accident sur nos chantiers d&apos;irrigation et de forage.</li>
            <li className="flex gap-2 items-center">⚠ Port obligatoire des équipements de protection individuelle (EPI).</li>
            <li className="flex gap-2 items-center">⚠ Pratiques de recyclage strictes pour les huiles usagées de lubrifiants.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
