import React from "react";

interface ValueItem {
  icon?: string;
  title: string;
  desc: string;
}

interface CoreValuesProps {
  data?: {
    section_title?: string;
    items?: ValueItem[];
  };
}

const defaultValues: ValueItem[] = [
  {
    icon: "dependability",
    title: "Dependability",
    desc: "Un engagement constant de fiabilité envers nos partenaires agricoles et automobiles."
  },
  {
    icon: "satisfaction",
    title: "Customer Satisfaction",
    desc: "Placer le client au centre de notre processus logistique et technique."
  },
  {
    icon: "uniqueness",
    title: "Uniqueness",
    desc: "Des offres sur-mesure et adaptées aux réalités géographiques de l'Afrique de l'Ouest."
  },
  {
    icon: "cost",
    title: "Cost Effectiveness",
    desc: "Optimiser les coûts pour garantir un rapport qualité-prix sans précédent."
  }
];

function renderIcon(iconKey?: string) {
  switch (iconKey) {
    case "satisfaction":
      return (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case "uniqueness":
      return (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "cost":
      return (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "dependability":
    default:
      return (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
  }
}

export default function CoreValues({ data }: CoreValuesProps) {
  const sectionTitle = data?.section_title || "Nos Valeurs Fondamentales";
  const items = data?.items && data.items.length > 0 ? data.items : defaultValues;

  return (
    <section className="py-16 md:py-36 px-4 md:px-16 lg:px-24 bg-gray-50 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            {sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start text-left">
              <div className="text-[#0c2847] mb-4 md:mb-5">
                {renderIcon(item.icon)}
              </div>
              <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#0c2847]">{item.title}</h4>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
