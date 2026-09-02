"use client";

import React, { useRef } from "react";

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ProjectFilters({
  categories,
  activeCategory,
  onSelectCategory
}: ProjectFiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center gap-3 mb-8 max-w-5xl mx-auto w-full relative group">
      {/* Left Navigation Arrow */}
      <button
        onClick={handleScrollLeft}
        className="hidden md:flex w-10 h-10 bg-white hover:bg-gray-100 text-[#0c2847] border border-gray-200 items-center justify-center rounded-full transition-all shrink-0 cursor-pointer shadow-sm hover:scale-105"
        aria-label="Faire défiler à gauche"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto gap-3 flex-nowrap py-2 select-none scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
          div::-webkit-scrollbar {
            display: none;
          }
        `}} />
        <button
          onClick={() => onSelectCategory("all")}
          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-sm text-xs md:text-sm font-semibold border transition-all cursor-pointer shrink-0 ${activeCategory === "all"
              ? "bg-[#0c2847] border-[#0c2847] text-white"
              : "border-gray-200 text-gray-600 hover:border-[#0c2847] hover:text-[#0c2847]"
            }`}
        >
          Tous les Projets
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-sm text-xs md:text-sm font-semibold border transition-all cursor-pointer shrink-0 ${activeCategory === category
                ? "bg-[#0c2847] border-[#0c2847] text-white"
                : "border-gray-200 text-gray-600 hover:border-[#0c2847] hover:text-[#0c2847]"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleScrollRight}
        className="hidden md:flex w-10 h-10 bg-white hover:bg-gray-100 text-[#0c2847] border border-gray-200 items-center justify-center rounded-full transition-all shrink-0 cursor-pointer shadow-sm hover:scale-105"
        aria-label="Faire défiler à droite"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
