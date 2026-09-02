import React from "react";
import { Category } from "./data";

interface SidebarFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  priceRange: number;
  setPriceRange: (val: number) => void;
  categoriesList: Category[];
  handleResetFilters: () => void;
}

export default function SidebarFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categoriesList,
  handleResetFilters
}: SidebarFiltersProps) {
  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Search Input */}
      <div>
        <h4 className="text-[14px] font-bold text-[#0c2847] uppercase tracking-wider mb-2">Recherche</h4>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full bg-white border border-gray-400 rounded-sm px-3.5 py-2 text-[14px] text-[#0c2847] font-medium outline-none focus:border-[#0c2847]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0c2847] hover:text-black font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categories list in filter sidebar */}
      <div>
        <h4 className="text-[14px] font-bold text-[#0c2847] uppercase tracking-wider mb-2.5">Filtrer par Catégorie</h4>
        <div className="flex flex-col gap-1">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 text-[13px] rounded-sm transition-all ${selectedCategory === cat.id
                ? "bg-[#0c2847] text-white font-bold"
                : "text-[#0c2847] font-medium hover:bg-gray-150"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[14px] font-bold text-[#0c2847] uppercase tracking-wider">Prix Maximum</h4>
          <span className="text-[14px] font-semibold text-[#15803d]">{priceRange.toLocaleString("fr-FR")} €</span>
        </div>
        <div className="relative flex items-center py-2">
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#0c2847] outline-none"
            style={{
              background: `linear-gradient(to right, #0c2847 0%, #0c2847 ${(priceRange / 20000) * 100}%, #d1d5db ${(priceRange / 20000) * 100}%, #d1d5db 100%)`
            }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#0c2847] font-bold mt-1">
          <span>0 €</span>
          <span>20 000 €</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        className="w-full mt-4 bg-gray-250 hover:bg-gray-300 text-[#0c2847] py-2 rounded-sm text-[13px] font-bold transition-all cursor-pointer border border-[#0c2847]"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
