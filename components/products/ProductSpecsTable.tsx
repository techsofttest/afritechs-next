import React from "react";

interface SpecItem {
  label: string;
  value: string;
}

interface ProductSpecsTableProps {
  desc: string;
  techSpecs: SpecItem[];
}

export default function ProductSpecsTable({
  desc,
  techSpecs
}: ProductSpecsTableProps) {
  return (
    <>
      {/* Description */}
      <div className="px-4 md:px-8 lg:px-0">
        <h2 className="text-[24px] font-bold text-[#0c2847] uppercase tracking-wider mb-5 pb-2 border-b border-gray-100 font-sans">
          Description
        </h2>
        <p className="text-[16px] text-[#0c2847] leading-relaxed font-semibold">
          {desc} Cet équipement de pointe sélectionné par AFRI TECHS SARLU répond aux exigences de fiabilité les plus strictes. Conçu pour maximiser votre rendement opérationnel, il associe robustesse structurelle et coûts de maintenance réduits, pour un amortissement rapide de vos investissements.
        </p>
      </div>

      {/* Technical Specifications */}
      <div className="px-4 md:px-8 lg:px-0">
        <h2 className="text-[24px] font-bold text-[#0c2847] uppercase tracking-wider mb-6 pb-2 border-b border-gray-100 font-sans">
          Spécifications Techniques
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white text-[15px] font-sans">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {techSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[40%_60%] border-b border-gray-200 md:[&:nth-child(odd)]:border-r"
              >
                <div className="p-4 text-[#0c2847] bg-[#f8f9fa] border-r border-gray-200 font-semibold">
                  {spec.label}
                </div>
                <div className="p-4 text-[#0c2847] font-bold">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
