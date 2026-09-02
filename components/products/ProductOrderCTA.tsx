import React from "react";
import Button from "../ui/Button";
import { ProductVariant } from "@/lib/api";

interface ProductOrderCTAProps {
  currentPrice: number;
  subtotal: number;
  quantity: number;
  selectedVariant?: ProductVariant | null;
  hasVariants?: boolean;
  onAddToCartAttempt?: () => boolean;
  product: {
    id: string;
    title: string;
    img: string;
    price: string;
    priceValue: number;
    categoryName: string;
  };
}

export default function ProductOrderCTA({
  currentPrice,
  subtotal,
  quantity,
  selectedVariant,
  hasVariants,
  onAddToCartAttempt,
  product
}: ProductOrderCTAProps) {
  const handleRequestQuote = () => {
    if (onAddToCartAttempt && !onAddToCartAttempt()) {
      return;
    }

    const event = new CustomEvent("open-request-modal", {
      detail: {
        id: product.id,
        title: product.title,
        img: product.img,
        price: currentPrice > 0 ? `${currentPrice.toLocaleString("fr-FR")} €` : product.price,
        priceValue: currentPrice || product.priceValue,
        categoryName: product.categoryName,
        quantity: quantity,
        variantId: selectedVariant?.id,
        variantName: selectedVariant?.name,
        variantSku: selectedVariant?.sku,
        skipModal: true
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="p-5 rounded-lg bg-[#f8f9fa] flex flex-col gap-5 border border-gray-100 w-full lg:max-w-[380px] lg:ml-auto">
      <div>
        <h3 className="text-[14px] font-bold text-[#0c2847] uppercase tracking-wider mb-3 pb-1.5 border-b border-gray-200 font-sans">
          Aperçu de la Commande
        </h3>

        <div className="flex justify-between items-center text-[13px] text-[#0c2847] font-semibold mb-2">
          <span>Quantité sélectionnée :</span>
          <span className="text-[#0c2847] font-bold">
            <span translate="no" className="notranslate">{quantity}</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-[13px] text-[#0c2847] font-semibold mb-2">
          <span>Prix unitaire :</span>
          <span className="text-[#0c2847] font-bold">
            <span translate="no" className="notranslate">{currentPrice.toLocaleString("fr-FR")}</span> €
          </span>
        </div>

        <div className="flex justify-between items-center text-[13px] text-[#0c2847] font-semibold mb-3">
          <span>Livraison :</span>
          <span className="text-[#0c2847] font-bold">Sur devis</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-[14px] font-bold text-[#0c2847]">Total partiel :</span>
          <span className="text-[24px] font-bold text-[#0c2847]">
            <span translate="no" className="notranslate">{subtotal.toLocaleString("fr-FR")}</span> €
          </span>
        </div>
      </div>

      {/* Assurance details with dark blue checks */}
      <div className="text-[16px] text-[#0c2847] flex flex-col gap-2 font-semibold">
        <p className="flex items-center gap-2">
          <span className="text-[#0c2847] font-bold text-[13px]">✓</span> Paiements sécurisés
        </p>
        <p className="flex items-center gap-2">
          <span className="text-[#0c2847] font-bold text-[13px]">✓</span> Accompagnement logistique
        </p>
      </div>

      {/* Action Buttons with high engagement animations */}
      <div className="flex flex-col gap-2.5 mt-8">
        {/* Pulsing, attention grabbing Primary CTA */}
        <Button
          variant="primary"
          onClick={handleRequestQuote}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 text-[16px] font-bold group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Faire une demande de devis</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          {/* Subtle light sheen animation */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        </Button>

        {/* Secondary Chat CTA */}
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 text-[16px] font-bold group transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <span>Chatter maintenant</span>
          <svg
            className="w-4.5 h-4.5 transform group-hover:-translate-y-0.5 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
