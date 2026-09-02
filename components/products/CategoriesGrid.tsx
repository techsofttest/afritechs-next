import React from "react";
import Image from "next/image";
import { Category } from "./data";

interface CategoriesGridProps {
  categoriesList: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

export default function CategoriesGrid({
  categoriesList,
  selectedCategory,
  setSelectedCategory
}: CategoriesGridProps) {
  // If a specific category is selected, show only that category, otherwise show all categories.
  const displayList = categoriesList.filter(c => c.id !== "all");

  const visibleCategories = selectedCategory === "all"
    ? displayList
    : displayList.filter(c => c.id === selectedCategory);

  const isSingleSelected = selectedCategory !== "all" && visibleCategories.length > 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h2 className="text-[18px] font-bold text-[#0c2847] uppercase tracking-wider">
          {isSingleSelected ? "Catégorie Sélectionnée" : "Nos Catégories"}
        </h2>
        <div className="flex justify-end">
          {isSingleSelected && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-[13px] font-semibold text-[#0c2847] hover:underline flex text-right items-center gap-1 cursor-pointer"
            >
              ← Afficher toutes les catégories
            </button>
          )}
        </div>
      </div>

      {isSingleSelected ? (
        /* Minimal small layout for chosen category */
        <div className="relative flex items-center gap-3 max-w-[240px] mt-1 pr-8">
          <div className="relative w-10 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src={visibleCategories[0].img}
              alt={visibleCategories[0].name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold text-[#0c2847] truncate font-sans">{visibleCategories[0].name}</h3>
          </div>
          <button
            onClick={() => setSelectedCategory("all")}
            className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full text-[9px] font-bold cursor-pointer transition-colors"
            title="Désélectionner"
          >
            ✕
          </button>
        </div>
      ) : (
        /* Full grid layout when showing all categories */
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-4">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="group flex flex-col items-center p-3 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-sm overflow-hidden mb-2 bg-gray-100">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[12px] font-bold text-center text-[#0c2847] group-hover:text-brand transition-colors duration-300 leading-tight">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
