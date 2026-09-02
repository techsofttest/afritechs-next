import React from "react";
import SidebarFilters from "./SidebarFilters";
import { Category } from "./data";

interface FilterSidebarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  priceRange: number;
  setPriceRange: (val: number) => void;
  categoriesList: Category[];
  handleResetFilters: () => void;
  isMobileFiltersOpen: boolean;
  setIsMobileFiltersOpen: (val: boolean) => void;
  isHeaderVisible: boolean;
}

export default function FilterSidebar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categoriesList,
  handleResetFilters,
  isMobileFiltersOpen,
  setIsMobileFiltersOpen,
  isHeaderVisible
}: FilterSidebarProps) {
  return (
    <>
      {/* Desktop Left Sidebar Filters Wrapper */}
      <aside className={`hidden lg:block lg:col-span-1 border-r border-gray-200 rounded-sm px-6 pr-3.5 self-start sticky overflow-y-auto custom-scrollbar transition-all duration-300 ${isHeaderVisible ? "top-[120px] h-[calc(100vh-140px)]" : "top-6 h-[calc(100vh-48px)]"}`}>
        <SidebarFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categoriesList={categoriesList}
          handleResetFilters={handleResetFilters}
        />
      </aside>

      {/* Mobile Slide-Out Filter Sidebar Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          {/* Drawer Body */}
          <div className="relative ml-0 mr-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-bold text-[#0c2847]">Filtres</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>
            <SidebarFilters
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              categoriesList={categoriesList}
              handleResetFilters={handleResetFilters}
            />
          </div>
        </div>
      )}
    </>
  );
}
