import React from "react";

interface QualitySecurityProps {
  data?: {
    quality_title?: string;
    quality_desc?: string;
    hse_title?: string;
    hse_desc?: string;
  };
}

export default function QualitySecurity({ data }: QualitySecurityProps) {
  const qualityTitle = data?.quality_title || "Politique Qualité";
  const qualityDesc = data?.quality_desc || "Nos produits et équipements respectent scrupuleusement les normes internationales de sécurité et de performance.";
  const hseTitle = data?.hse_title || "Sécurité & Environnement (HSE)";
  const hseDesc = data?.hse_desc || "Engagement absolu pour la sécurité de nos équipes et la préservation environnementale dans toutes nos zones d'intervention.";

  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Qualité & Sécurité
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Quality */}
        <div className="p-6 md:p-10 border border-gray-200 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-xl text-[#0c2847] mb-4 md:mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#0c2847]">{qualityTitle}</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium mb-4">
              {qualityDesc}
            </p>
          </div>
        </div>

        {/* HSE / Security */}
        <div className="p-6 md:p-10 border border-gray-200 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-xl text-[#0c2847] mb-4 md:mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#0c2847]">{hseTitle}</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium mb-4">
              {hseDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
