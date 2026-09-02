import React from "react";

export default function Advantages() {
  const advantages = [
    {
      title: "Tarification Équitable",
      desc: "Nous nous engageons à vous offrir nos solutions aux meilleurs tarifs du marché, garantissant une valeur optimale sans frais cachés.",
      icon: (
        <svg className="w-14 h-14 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    },
    {
      title: "Transparence Totale",
      desc: "Chaque étape de nos interventions est partagée en temps réel. Nous croyons qu'une confiance durable repose sur une clarté absolue.",
      icon: (
        <svg className="w-14 h-14 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Respect des Délais",
      desc: "La ponctualité guide nos opérations. Nous mobilisons toutes nos ressources logistiques pour livrer vos projets en temps voulu.",
      icon: (
        <svg className="w-14 h-14 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    {
      title: "Accompagnement Clé en Main",
      desc: "De l'analyse de faisabilité à la maintenance finale sur site, nous prenons en charge la gestion complète de vos projets.",
      icon: (
        <svg className="w-14 h-14 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-1.26A3 3 0 0014 7.26V6a2 2 0 10-4 0v1.26A3 3 0 007.26 10H6a2 2 0 100 4h1.26A3 3 0 0010 16.74V18a2 2 0 104 0v-1.26A3 3 0 0016.74 14H18a2 2 0 100-4z" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-16 lg:px-24 bg-gray-50 text-center">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 mb-8 md:mb-16 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Nos Avantages
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
          {advantages.map((adv, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs mx-auto">
              <div className="mb-3 md:mb-5 transition-transform duration-300 hover:scale-110 flex items-center justify-center w-10 h-10 md:w-14 md:h-14">
                {React.cloneElement(adv.icon, { className: "w-full h-full text-brand" })}
              </div>
              <h3 className="text-[13px] md:text-[18px] font-bold text-[#0c2847] tracking-wider mb-2 md:mb-3 uppercase leading-tight md:leading-snug">{adv.title}</h3>
              <p className="text-[11px] md:text-sm text-[#333333] leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
