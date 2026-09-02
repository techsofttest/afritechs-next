import React from "react";

export default function CorporateGovernance() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 bg-gray-50 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto w-full text-center">
        <div className="max-w-[1440px] mx-auto mb-8 md:mb-16 relative z-10 text-center">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            Gouvernance d&apos;Entreprise
          </h2>
        </div>

        <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed mb-6 font-semibold max-w-4xl mx-auto">
          Chez Afri-techs, nous croyons qu&apos;une saine gouvernance est le socle de notre développement à long terme. Nos processus de décision s&apos;alignent sur des standards éthiques rigoureux en Guinée et aux Émirats Arabes Unis afin de protéger les intérêts de nos clients, de nos employés et de nos communautés.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8 md:mt-18">
          <div className="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-[#0c2847]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-center">
              <h5 className="text-base md:text-lg font-semibold text-[#0c2847] mb-2">Conformité Légale</h5>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">Respect strict des cadres légaux douaniers, commerciaux et fiscaux dans nos territoires d&apos;activité.</p>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-[#0c2847]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-center">
              <h5 className="text-base md:text-lg font-semibold text-[#0c2847] mb-2">Gestion des Risques</h5>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">Identification proactive des fluctuations de marchés logistiques pour sécuriser l&apos;approvisionnement.</p>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-[#0c2847]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="text-center">
              <h5 className="text-base md:text-lg font-semibold text-[#0c2847] mb-2">Transparence Client</h5>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">Un suivi clair des facturations, devisages et calendriers de livraison sans frais cachés.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
