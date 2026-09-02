import React from "react";
import { ProductVariant } from "@/lib/api";

interface AttributeItem {
  label: string;
  value: string;
}

interface ProductDetailsInfoProps {
  tag: string;
  title: string;
  categoryName: string;
  tier1Price?: number;
  tier2Price?: number;
  tier3Price?: number;
  quantity: number;
  setQuantity: (val: number) => void;
  keyAttributes?: AttributeItem[];
  variants?: ProductVariant[];
  selectedVariant?: ProductVariant | null;
  onSelectVariant?: (variant: ProductVariant) => void;
  variantSelectionError?: boolean;
}

export default function ProductDetailsInfo({
  tag,
  title,
  categoryName,
  tier1Price,
  tier2Price,
  tier3Price,
  quantity,
  setQuantity,
  keyAttributes,
  variants = [],
  selectedVariant,
  onSelectVariant,
  variantSelectionError
}: ProductDetailsInfoProps) {
  const defaultAttributes = [
    { label: "État", value: "Neuf d'usine" },
    { label: "Garantie", value: "24 Mois" },
    { label: "Normes", value: "CE / ISO 9001" }
  ];

  const attributes = keyAttributes || defaultAttributes;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="bg-[#0c2847]/10 text-[#0c2847] text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
          {tag}
        </span>
        <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-[#0c2847] mt-4 leading-tight">
          {title}
        </h1>
        <p className="text-[13px] text-[#0c2847] font-semibold mt-2">
          Secteur d'activité : {categoryName}
        </p>
      </div>

      {/* Variants Selection Section */}
      {variants && variants.length > 0 && (
        <div id="variants-selection-section" className={`p-4 rounded-xl border transition-all ${
          variantSelectionError ? "border-red-500 bg-red-50/50 shadow-sm animate-pulse" : "border-gray-200 bg-[#f8f9fa]"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[12px] font-bold text-[#0c2847] uppercase tracking-wider font-sans">
              Variantes disponibles <span className="text-red-500">*</span>
            </h4>
            {selectedVariant && (
              <span className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded">
                Sélectionnée : {selectedVariant.name}
              </span>
            )}
          </div>

          {variantSelectionError && (
            <p className="text-xs text-red-600 font-semibold mb-2 flex items-center gap-1">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Veuillez sélectionner une variante avant d'ajouter au panier.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              const displayPrice = v.formattedPrice || (v.sale_price ? `${v.sale_price.toLocaleString("fr-FR")} €` : `${v.price.toLocaleString("fr-FR")} €`);

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelectVariant && onSelectVariant(v)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "border-[#0c2847] bg-[#0c2847] text-white shadow-md scale-[1.01]"
                      : "border-gray-300 bg-white text-[#0c2847] hover:border-[#0c2847]/50 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-sm leading-snug">{v.name}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10 w-full text-xs">
                    {v.sku && (
                      <span className={isSelected ? "text-gray-300 font-mono" : "text-gray-500 font-mono"}>
                        SKU: {v.sku}
                      </span>
                    )}
                    <span className={`font-bold ${isSelected ? "text-white" : "text-[#0c2847]"}`}>
                      {displayPrice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Counter */}
      <div className="flex items-center gap-5 py-1">
        <span className="text-[14px] font-bold text-[#0c2847]">Quantité :</span>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#0c2847] text-[#0c2847] hover:bg-[#0c2847] hover:border-[#0c2847] hover:text-white transition-all text-[16px] cursor-pointer"
          >
            -
          </button>
          <span translate="no" className="text-[15px] font-bold text-[#0c2847] min-w-[28px] text-center notranslate">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#0c2847] text-[#0c2847] hover:bg-[#0c2847] hover:border-[#0c2847] hover:text-white transition-all text-[16px] cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Dynamic Key Quick Attributes */}
      <div>
        <h4 className="text-[12px] font-bold text-[#0c2847] uppercase tracking-wider mb-2 font-sans">
          Caractéristiques Clés
        </h4>
        <div className="border border-[#0c2847]/40 rounded-lg p-3.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {attributes.map((attr, idx) => (
            <div
              key={idx}
              className={`pr-2 ${idx < attributes.length - 1 && (idx + 1) % 3 !== 0
                ? "border-r border-[#0c2847]/20"
                : ""
                }`}
            >
              <span className="block text-[14px] text-[#0c2847] font-normal mb-0.5">{attr.label}</span>
              <span className="block text-[16px] font-bold text-[#0c2847] leading-tight">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
