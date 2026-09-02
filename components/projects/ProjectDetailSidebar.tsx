import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ProjectDetailSidebarProps {
  results?: string[];
}

export default function ProjectDetailSidebar({ results = [] }: ProjectDetailSidebarProps) {
  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-[130px]">
      {/* Key Results Card */}
      {results && results.length > 0 && (
        <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0c2847] uppercase tracking-wider border-b border-gray-200 pb-3">
            Résultats & Impacts
          </h3>
          <ul className="flex flex-col gap-4">
            {results.map((result, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="text-brand text-lg shrink-0">✔</span>
                <span className="text-gray-700 text-sm md:text-base leading-relaxed font-semibold">
                  {result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Call to Action Card */}
      <div className="bg-[#0c2847] text-white rounded-2xl p-8 flex flex-col gap-5 text-center shadow-md relative overflow-hidden">
        <div
          className="absolute bg-gradient-to-br from-brand/20 to-transparent opacity-30 pointer-events-none z-0"
          style={{
            bottom: "-20%",
            left: "-20%",
            width: "200px",
            height: "200px",
            clipPath: "circle(50% at 50% 50%)",
          }}
        />
        <h3 className="text-xl font-bold relative z-10">Intéressé par cette réalisation ?</h3>
        <p className="text-gray-300 text-sm leading-relaxed relative z-10">
          Contactez nos ingénieurs conseils pour concevoir une solution adaptée à vos besoins industriels ou agricoles.
        </p>
        <div className="flex flex-col gap-3 mt-2 relative z-10">
          <Link href="/products">
            <Button variant="secondary" className="w-full justify-center text-white font-bold text-sm border-white/50 hover:bg-white hover:text-[#0c2847]">
              Voir notre Catalogue
            </Button>
          </Link>
          <Link href="/contact">
            <button
              className="w-full justify-center font-bold text-sm transition-all duration-300 inline-flex items-center rounded-sm px-8 py-3 border bg-[#93AB3D]/80 text-[#fff] border-[#93AB3D] hover:opacity-90"
            >
              Faire une demande de devis
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
