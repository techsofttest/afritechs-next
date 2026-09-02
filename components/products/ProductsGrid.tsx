import React from "react";
import Card from "../ui/Card";
import { Product } from "./data";

interface ProductsGridProps {
  filteredProducts: Product[];
  handleResetFilters: () => void;
}

export default function ProductsGrid({
  filteredProducts,
  handleResetFilters
}: ProductsGridProps) {
  return (
    <div>
      <h3 className="text-[18px] font-bold text-[#0c2847] uppercase tracking-wider mb-6">
        Produits Vedettes
      </h3>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <Card
              key={p.id}
              tag={p.tag}
              title={p.title}
              desc={p.desc}
              img={p.img}
              price={p.price}
              buttonText="Faire une demande"
              onCardClick={() => window.location.href = `/products/${(p as any).slug || p.id}`}
              onButtonClick={() => {
                const event = new CustomEvent("open-request-modal", {
                  detail: {
                    id: p.id,
                    title: p.title,
                    img: p.img,
                    price: p.price,
                    priceValue: p.priceValue,
                    categoryName: p.categoryName,
                    variants: p.variants
                  }
                });
                window.dispatchEvent(event);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-sm">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-[16px] font-bold mb-1">Aucun produit trouvé</h3>
          <p className="text-[13px] text-gray-500 mb-4">Essayez de modifier ou de réinitialiser vos filtres.</p>
          <button
            onClick={handleResetFilters}
            className="bg-[#0c2847] text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm hover:opacity-90 transition-all cursor-pointer"
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}
