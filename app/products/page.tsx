"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Breadcrumb from "@/components/products/Breadcrumb";
import FilterSidebar from "@/components/products/FilterSidebar";
import CategoriesGrid from "@/components/products/CategoriesGrid";
import ProductsGrid from "@/components/products/ProductsGrid";
import { Category, Product } from "@/components/products/data";
import { fetchProducts, fetchCategories } from "@/lib/api";

function ProductsPageContent() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<number>(20000);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [categoriesList, setCategoriesList] = useState<Category[]>([
    { id: "all", name: "Toutes les Catégories", img: "/sectors/export_import.png" }
  ]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const searchParams = useSearchParams();

  // Load real categories from API dynamically
  useEffect(() => {
    fetchCategories().then((cats) => {
      if (cats && cats.length > 0) {
        const formattedCats: Category[] = [
          { id: "all", name: "Toutes les Catégories", img: "/sectors/export_import.png" },
          ...cats.map((c) => ({
            id: c.slug || c.id,
            slug: c.slug,
            name: c.name || c.title,
            img: c.img || c.image || "/sectors/export_import.png"
          }))
        ];
        setCategoriesList(formattedCats);
      }
    });
  }, []);

  // Sync state with URL search parameters
  useEffect(() => {
    const qSearch = searchParams.get("search") || "";
    const qCategory = searchParams.get("category") || "all";
    setSearch(qSearch);

    if (qSearch) {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(qCategory);
    }
  }, [searchParams]);

  // Load real products from API dynamically whenever search or selectedCategory changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const categoryParam = selectedCategory !== "all" ? selectedCategory : undefined;
    fetchProducts(search, categoryParam).then((apiProducts) => {
      if (isCancelled) return;
      if (apiProducts) {
        const formattedProducts: Product[] = apiProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          tag: p.tag || "Produit",
          category: p.category || "all",
          categoryName: p.categoryName || "Tous les produits",
          title: p.title,
          desc: p.desc || "",
          img: p.img || "/sectors/export_import.png",
          price: p.price || "Sur Devis",
          priceValue: p.priceValue || 0,
          inStock: p.inStock ?? true,
          variants: p.variants || []
        }));
        setProductsList(formattedProducts);
      } else {
        setProductsList([]);
      }
      setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [search, selectedCategory]);

  // Listen to real-time custom search event triggers from the Header search bar
  useEffect(() => {
    const handleSearchQueryChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSearch(customEvent.detail);
      setSelectedCategory("all");
    };
    const handleSearchCategoryChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSearch("");
      setSelectedCategory(customEvent.detail);
    };

    window.addEventListener("search-query-changed", handleSearchQueryChanged);
    window.addEventListener("search-category-changed", handleSearchCategoryChanged);
    return () => {
      window.removeEventListener("search-query-changed", handleSearchQueryChanged);
      window.removeEventListener("search-category-changed", handleSearchCategoryChanged);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else {
        if (currentScrollY < lastScrollY) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(false);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredProducts = useMemo(() => {
    return productsList
      .filter((p) => {
        // Additional client-side search text match (if typed in sidebar filter input)
        const matchesSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.toLowerCase().includes(search.toLowerCase());

        // Category match
        const matchesCategory = selectedCategory === "all" || p.category === selectedCategory || p.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

        // Price range match
        const matchesPrice = p.priceValue <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.priceValue - b.priceValue;
        if (sortBy === "price-desc") return b.priceValue - a.priceValue;
        if (sortBy === "name-asc") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [productsList, search, selectedCategory, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setPriceRange(20000);
    setSortBy("default");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0c2847]">
      <Header forceSolidBg={true} />

      <main className="flex-1 w-full pt-[64px] lg:pt-[97px]">
        <Breadcrumb>
          {/* Mobile Filters Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 border border-gray-300 px-4 py-2 text-[13px] font-semibold rounded-sm hover:bg-gray-50 cursor-pointer bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filtres
            </button>
          </div>
        </Breadcrumb>

        {/* Desktop Layout Container */}
        <section className="w-full max-w-[1440px] mx-auto pl-6 pr-6 md:pl-16 md:pr-16 lg:pl-0 lg:pr-24 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Left Sidebar Filter */}
            <FilterSidebar
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              categoriesList={categoriesList}
              handleResetFilters={handleResetFilters}
              isMobileFiltersOpen={isMobileFiltersOpen}
              setIsMobileFiltersOpen={setIsMobileFiltersOpen}
              isHeaderVisible={isHeaderVisible}
            />

            {/* Right Products & Categories Area */}
            <div className="lg:col-span-3">
              {/* Categories listed on top, hidden during search results */}
              {!search && (
                <CategoriesGrid
                  categoriesList={categoriesList}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}

              {/* Top controls / header for products list */}
              <div className="flex flex-row justify-between items-center gap-4 border-b border-gray-200 pb-5 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-medium text-gray-500">
                    {isLoading
                      ? "Chargement des produits..."
                      : `${filteredProducts.length} produit${filteredProducts.length > 1 ? "s" : ""} trouvé${filteredProducts.length > 1 ? "s" : ""}`}
                  </span>
                </div>

                {/* Sorting */}
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-gray-500 whitespace-nowrap">Trier par :</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-sm px-2.5 py-1.5 text-[13px] text-[#0c2847] outline-none cursor-pointer focus:border-[#0c2847]"
                  >
                    <option value="default">Pertinence</option>
                    <option value="price-asc">Prix : croissant</option>
                    <option value="price-desc">Prix : décroissant</option>
                    <option value="name-asc">Nom : A-Z</option>
                  </select>
                </div>
              </div>

              {/* Products List */}
              {isLoading ? (
                <div className="py-16 text-center text-[#0c2847] font-semibold text-base">
                  Chargement des produits...
                </div>
              ) : (
                <ProductsGrid
                  filteredProducts={filteredProducts}
                  handleResetFilters={handleResetFilters}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsPageContent />
    </Suspense>
  );
}
