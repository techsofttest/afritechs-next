"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchMegaMenu, fetchProducts, MegaMenuCategoryItem, ProductItem } from "@/lib/api";

interface ProductsDropdownProps {
  isOpen: boolean;
  isAtTop: boolean;
}

export default function ProductsDropdown({
  isOpen,
  isAtTop
}: ProductsDropdownProps) {
  const [categories, setCategories] = useState<MegaMenuCategoryItem[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>("");
  const [categoryProducts, setCategoryProducts] = useState<Record<string, ProductItem[]>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch mega menu categories from API
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      setLoading(true);
      fetchMegaMenu().then((data) => {
        if (data && data.length > 0) {
          setCategories(data);
          setActiveCategorySlug(data[0].slug || data[0].id);

          // Populate initial products returned directly from API for each category
          const initialMap: Record<string, ProductItem[]> = {};
          data.forEach((cat) => {
            const slugKey = cat.slug || cat.id;
            initialMap[slugKey] = (cat.products || []).map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              desc: p.desc,
              tag: cat.title,
              img: p.img || "",
            }));
          });
          setCategoryProducts(initialMap);
        }
        setLoading(false);
      });
    }
  }, [isOpen, categories.length]);

  // When active category changes, fetch products filtered on backend API if not cached
  const handleCategoryHover = (slug: string) => {
    setActiveCategorySlug(slug);
    if (!categoryProducts[slug]) {
      fetchProducts(undefined, slug).then((apiProducts) => {
        setCategoryProducts((prev) => ({
          ...prev,
          [slug]: apiProducts.slice(0, 4),
        }));
      });
    }
  };

  const headingColor = isAtTop ? "text-white" : "text-[#0c2847]";
  const dividerColor = isAtTop ? "border-[#333333]/50" : "border-gray-200";

  const getCategoryClass = (slug: string) => {
    const isActive = activeCategorySlug === slug;
    if (isActive) {
      return isAtTop
        ? "text-white font-bold border-l-2 border-white bg-white/10"
        : "text-[#0c2847] font-bold border-l-2 border-[#0c2847] bg-[#0c2847]/10";
    }
    return isAtTop
      ? "text-white/80 hover:text-white hover:bg-white/5 font-semibold"
      : "text-[#0c2847]/80 hover:text-[#0c2847] hover:bg-gray-100 font-semibold";
  };

  const activeProducts = categoryProducts[activeCategorySlug] || [];

  return (
    <div className={`absolute left-6 right-6 md:left-16 md:right-16 lg:left-24 lg:right-24 top-full pt-3 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className={`border rounded-sm shadow-xl grid grid-cols-12 overflow-hidden text-left p-8 gap-8 min-h-[380px] transition-colors duration-300 ${isAtTop ? "bg-[#0c2847] border-[#333333]" : "bg-white border-gray-200"}`}>
        {/* Categories on left (4 cols) */}
        <div className={`col-span-4 border-r pr-6 flex flex-col gap-2 transition-colors duration-300 ${dividerColor}`}>
          <h4 className={`text-[12px] font-bold ${headingColor} uppercase tracking-widest mb-2 pl-3`}>
            Catégories
          </h4>
          {categories.length > 0 ? (
            <ul className="flex flex-col gap-1 text-[13px]">
              {categories.map((cat) => {
                const catSlug = cat.slug || cat.id;
                return (
                  <li
                    key={cat.id}
                    onMouseEnter={() => handleCategoryHover(catSlug)}
                    className={`px-3 py-2.5 rounded-sm transition-all duration-200 cursor-pointer ${getCategoryClass(catSlug)}`}
                  >
                    <span>{cat.title}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="pl-3 py-4 text-xs text-gray-400">
              {loading ? "Chargement des catégories..." : "Aucune catégorie"}
            </div>
          )}
        </div>

        {/* Products on right (8 cols) */}
        <div className="col-span-8 pl-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h4 className={`text-[12px] font-bold ${headingColor} uppercase tracking-widest`}>
              Produits Phares
            </h4>
            <Link href="/products" className={`text-[12px] font-bold ${headingColor} hover:underline flex items-center gap-1`}>
              Voir tous les produits &rarr;
            </Link>
          </div>

          {activeProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 text-[14px]">
              {activeProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug || product.id}`}
                  className={`block group/item p-3 rounded-sm transition-all duration-200 border border-transparent ${
                    isAtTop ? "hover:bg-white/5 hover:border-[#333333]" : "hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <span
                    className={`block font-bold transition-colors mb-1 ${
                      isAtTop
                        ? "text-white group-hover/item:text-white"
                        : "text-[#0c2847] group-hover/item:text-[#0c2847]"
                    }`}
                  >
                    {product.title}
                  </span>
                  <span className={`block text-[12px] leading-normal font-semibold line-clamp-2 ${isAtTop ? "text-white/90" : "text-[#0c2847]/90"}`}>
                    {product.desc}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-gray-400">
              {loading ? "Chargement des produits..." : "Aucun produit pour cette catégorie"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
