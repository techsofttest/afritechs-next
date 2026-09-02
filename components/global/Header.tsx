"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Button from "../ui/Button";
import ProductsDropdown from "./ProductsDropdown";
import ServicesDropdown from "./ServicesDropdown";
import { fetchProducts, fetchCategories, CategoryItem } from "@/lib/api";

interface HeaderProps {
  forceSolidBg?: boolean;
}

interface HeaderSearchBarProps {
  placeholder: string;
  showTransparent: boolean;
  router: any;
  pathname: string;
}

interface SearchSuggestion {
  type: "product" | "category";
  name: string;
  url: string;
  img?: string;
  tag?: string;
  price?: string;
}

function HeaderSearchBar({ placeholder, showTransparent, router, pathname }: HeaderSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    let isCancelled = false;

    fetchProducts(query).then((apiProducts) => {
      if (isCancelled) return;
      if (apiProducts && apiProducts.length > 0) {
        const matches: SearchSuggestion[] = apiProducts.map(p => ({
          type: "product" as const,
          name: p.title,
          url: `/products/${p.slug || p.id}`,
          img: p.img,
          tag: p.tag,
          price: p.price
        }));
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync Header search input value with URL when on products page
  useEffect(() => {
    if (pathname && pathname.startsWith("/products")) {
      const qSearch = searchParams.get("search") || "";
      setSearchQuery(qSearch);
    }
  }, [searchParams, pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const term = searchQuery.trim();
      router.push(`/products?search=${encodeURIComponent(term)}`);
      setShowSuggestions(false);

      if (typeof window !== "undefined" && window.location.pathname.startsWith("/products")) {
        const event = new CustomEvent("search-query-changed", { detail: term });
        window.dispatchEvent(event);
      }
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      ref={searchRef}
      className={`flex-1 max-w-[360px] bg-white flex items-center rounded-md overflow-visible min-w-[200px] border h-10 transition-all duration-300 relative ${showTransparent ? "border-transparent" : "border-brand"}`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[#0c2847] px-3.5 py-1.5 text-[13px] outline-none h-full placeholder:text-gray-400 placeholder:opacity-100"
      />
      <button
        type="submit"
        className="bg-brand text-[#fff] m-1 rounded-sm h-8 hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1.5 px-2 sm:px-4 text-[16px] font-semibold cursor-pointer shrink-0 tracking-wider"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[110] overflow-hidden max-h-80 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSearchQuery(item.name);
                setShowSuggestions(false);
                router.push(item.url);
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors text-left"
            >
              {item.type === "product" ? (
                <>
                  {item.img ? (
                    <div className="w-9 h-9 relative rounded overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                      <Image src={item.img} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded bg-brand/10 text-brand flex items-center justify-center shrink-0 text-xs font-bold">
                      PROD
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#0c2847] truncate font-semibold leading-tight">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {item.tag && <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase font-medium">{item.tag}</span>}
                      {item.price && <span className="text-[11px] text-brand font-bold">{item.price}</span>}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  <span className="text-[13px] text-[#0c2847] truncate font-medium flex-1">{item.name}</span>
                  <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded font-medium">Catégorie</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default function Header({ forceSolidBg = false }: HeaderProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [placeholder, setPlaceholder] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [user, setUser] = useState<{ firstName: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSuggestions, setMobileSuggestions] = useState<SearchSuggestion[]>([]);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    if (!mobileSearchQuery.trim()) {
      setMobileSuggestions([]);
      return;
    }
    const query = mobileSearchQuery.toLowerCase().trim();
    let isCancelled = false;

    fetchProducts(query).then((apiProducts) => {
      if (isCancelled) return;
      if (apiProducts && apiProducts.length > 0) {
        const matches: SearchSuggestion[] = apiProducts.map(p => ({
          type: "product" as const,
          name: p.title,
          url: `/products/${p.slug || p.id}`,
          img: p.img,
          tag: p.tag,
          price: p.price
        }));
        setMobileSuggestions(matches);
      } else {
        setMobileSuggestions([]);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [mobileSearchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      const term = mobileSearchQuery.trim();
      router.push(`/products?search=${encodeURIComponent(term)}`);
      setIsMobileSearchOpen(false);

      // Dispatch a custom event to notify ProductsPage if it is already mounted
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/products")) {
        const event = new CustomEvent("search-query-changed", { detail: term });
        window.dispatchEvent(event);
      }
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("afri_techs_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) { }
    }

    const updateCartCount = () => {
      const storedCart = localStorage.getItem("afri_techs_cart");
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart) as { quantity: number }[];
          const count = parsed.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(count);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("user-updated", () => {
      const u = localStorage.getItem("afri_techs_user");
      setUser(u ? JSON.parse(u) : null);
    });

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  // Search input placeholders transition list
  const placeholders = [
    "Rechercher tracteurs...",
    "Rechercher panneaux solaires...",
    "Rechercher huiles moteurs...",
    "Rechercher forages hydrauliques...",
    "Rechercher équipements informatiques..."
  ];

  useEffect(() => {
    let currentIdx = 0;
    setPlaceholder(placeholders[0]);

    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % placeholders.length;
      setPlaceholder(placeholders[currentIdx]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Scroll Header fade behavior
  const [scrollActive, setScrollActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollActive(currentScrollY > 15);

      // On mobile (screens smaller than lg breakpoint), always keep the header visible.
      if (window.innerWidth < 1024) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Mega Menu Hover Controls
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("agri");
  const [headerCategories, setHeaderCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    fetchCategories().then((cats) => {
      if (cats) setHeaderCategories(cats);
    });
  }, []);

  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setIsProductsOpen(true);
    setIsServicesOpen(false);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 200);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
    setIsProductsOpen(false);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };



  // Client Action Handling
  const handleLoginClick = () => router.push("/login");
  const handleRegisterClick = () => router.push("/register");

  // Floating Dropdown State Control
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const loginTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLoginEnter = () => {
    if (loginTimeoutRef.current) clearTimeout(loginTimeoutRef.current);
    setLoginDropdownOpen(true);
  };

  const handleLoginLeave = () => {
    loginTimeoutRef.current = setTimeout(() => {
      setLoginDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleLoginOutside = (e: MouseEvent) => {
      if (loginDropdownOpen) {
        const container = document.getElementById("login-dropdown-container");
        if (container && !container.contains(e.target as Node)) {
          setLoginDropdownOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleLoginOutside);
    return () => document.removeEventListener("mousedown", handleLoginOutside);
  }, [loginDropdownOpen]);

  // Transparent check matching home design system requirements
  const showTransparent = isHomePage && !scrollActive && !isHovered && !isProductsOpen && !isServicesOpen && !loginDropdownOpen && !forceSolidBg;

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 font-sans ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${showTransparent ? "bg-transparent py-6" : "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3"
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={showTransparent ? "/logo/logo-white2.png" : "/logo/logo.png"}
              alt="AFRI TECHS Logo"
              width={160}
              height={65}
              className="h-14 w-auto object-contain cursor-pointer transition-all duration-300"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <nav translate="no" className={`hidden lg:flex gap-8 font-medium items-center text-[14px] shrink-0 transition-colors duration-300 ${showTransparent ? "text-white" : "text-[#0c2847]"}  notranslate`}>
            {/* Produits Mega Menu Dropdown */}
            <div
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
              className="group cursor-pointer py-5"
            >
              <a href="/products" className="hover:text-brand flex items-center gap-1 transition-colors"><span translate="no" className="notranslate">Produits ▾</span></a>
              <ProductsDropdown
                isOpen={isProductsOpen}
                isAtTop={showTransparent}
              />
            </div>

            {/* Dropdown for Services & Support */}
            <div
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
              className="relative group cursor-pointer py-5"
            >
              <Link href="/services" className="hover:text-brand flex items-center gap-1 transition-colors"><span translate="no" className="notranslate">Nos Services ▾</span></Link>
              <ServicesDropdown
                isOpen={isServicesOpen}
                isAtTop={showTransparent}
              />
            </div>

            <Link href="/projets" className="hover:text-brand transition-colors"><span translate="no" className="notranslate">Projets</span></Link>
            <a href="/about" className="hover:text-brand transition-colors"><span translate="no" className="notranslate">À Propos</span></a>
            <a href="/contact" className="hover:text-brand transition-colors"><span translate="no" className="notranslate">Contactez-nous</span></a>
          </nav>

          {/* Search bar in the middle with reduced width (desktop only) */}
          <div className="hidden lg:block flex-grow-1 max-w-[360px] min-w-[200px]">
            <Suspense fallback={
              <div className={`flex bg-white items-center rounded-md overflow-hidden border h-10 transition-all duration-300 ${showTransparent ? "border-transparent" : "border-brand"}`}>
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-full bg-transparent text-[#0c2847] px-3.5 py-1.5 text-[13px] outline-none h-full placeholder:text-gray-400 placeholder:opacity-100"
                  disabled
                />
              </div>
            }>
              <HeaderSearchBar placeholder={placeholder} showTransparent={showTransparent} router={router} pathname={pathname} />
            </Suspense>
          </div>

          {/* Right User & Cart Icons */}
          <div className={`flex items-center gap-5 shrink-0 transition-colors duration-300 ${showTransparent ? "text-white" : "text-[#0c2847]"}`}>
            {/* Mobile Search Icon Button (visible only below lg) */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Rechercher"
              className="lg:hidden hover:text-brand transition-all duration-300 bg-transparent border-0 p-1 flex items-center justify-center cursor-pointer"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <a href="/cart" aria-label="Panier" className="hover:text-brand transition-all duration-300 relative">
              <svg className="w-7 h-7 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span translate="no" className="absolute -top-2 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center notranslate">
                {cartCount}
              </span>
            </a>

            {/* Hover Login Dropdown (visible on all screens) */}
            <div id="login-dropdown-container" className="relative group/login py-2" onMouseEnter={handleLoginEnter} onMouseLeave={handleLoginLeave}>
              <button
                onClick={(e) => {
                  if (window.innerWidth < 1024) {
                    e.preventDefault();
                    setLoginDropdownOpen(!loginDropdownOpen);
                  } else {
                    if (user) {
                      router.push("/profile");
                    } else {
                      handleLoginClick();
                    }
                  }
                }}
                aria-label="Espace Client"
                className="flex items-center gap-1.5 hover:text-brand transition-colors duration-300 bg-transparent border-0 cursor-pointer text-inherit"
              >
                <svg className="w-7 h-7 cursor-pointer text-inherit" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" shapeRendering="geometricPrecision">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span translate="no" className="text-[14px] font-medium hidden sm:inline-block notranslate">
                  {user ? `Bonjour, ${user.firstName} ▾` : "Connexion ▾"}
                </span>
              </button>

              {/* Dropdown Popover (hover active on desktop, click active on mobile) */}
              <div className={`absolute right-0 top-full pt-2 transition-all duration-200 z-50 w-52 ${
                loginDropdownOpen
                  ? "opacity-100 visible"
                  : "opacity-0 invisible lg:group-hover/login:opacity-100 lg:group-hover/login:visible"
              }`}>
                {/* Tooltip Arrow */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#0c2847] mx-auto absolute top-0.5 right-6" />

                {/* Popover Card */}
                <div className="bg-white border border-gray-100 rounded-md shadow-xl p-4 mt-1.5 flex flex-col gap-3">
                  {user ? (
                    <>
                      <div className="text-[13px] font-semibold text-[#0c2847] border-b border-gray-100 pb-2">
                        Mon Compte
                      </div>
                      <Link
                        href="/profile"
                        className="w-full text-left text-gray-900 hover:text-brand text-[13px] font-semibold p-2 transition-colors block border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        Mon Profil
                      </Link>
                      <Link
                        href="/profile/address"
                        className="w-full text-left text-gray-900 hover:text-brand text-[13px] font-semibold p-2 transition-colors block border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        Adresse de livraison
                      </Link>
                      <Link
                        href="/profile/quotes"
                        className="w-full text-left text-gray-900 hover:text-brand text-[13px] font-semibold p-2 transition-colors block border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        Mes Devis
                      </Link>
                      <Link
                        href="/profile/password"
                        className="w-full text-left text-gray-900 hover:text-brand text-[13px] font-semibold p-2 transition-colors block border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        Mot de passe
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("afri_techs_user");
                          setUser(null);
                          router.push("/");
                          window.dispatchEvent(new Event("user-updated"));
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold py-2.5 rounded text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Se déconnecter</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="w-full bg-[#0c2847] hover:bg-[#0c2847]/90 text-white text-[13px] font-bold py-2.5 rounded text-center transition-colors block"
                      >
                        Se connecter
                      </button>
                      <div className="text-center pt-1 border-t border-gray-100">
                        <span className="text-[11px] text-gray-500">Nouveau client ? </span>
                        <button onClick={handleRegisterClick} className="text-[11px] text-[#0c2847] hover:underline font-bold">Créer un compte</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Burger Menu Button (visible only below lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menu"
              className="lg:hidden hover:text-brand transition-all duration-300 bg-transparent border-0 p-1 flex items-center justify-center cursor-pointer text-inherit"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Search Modal Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex flex-col justify-start pt-24 px-6">
          {/* Close button */}
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-brand text-2xl font-bold p-2 cursor-pointer transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>

          <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
            {/* <h3 className="text-white text-lg font-semibold tracking-wider text-center mb-2">Rechercher sur Afri-techs</h3> */}

            {/* Search Form */}
            <form onSubmit={handleMobileSearchSubmit} className="w-full bg-white flex items-center rounded-lg border border-brand h-12 relative overflow-visible shadow-xl">
              <input
                type="text"
                autoFocus
                value={mobileSearchQuery}
                onChange={(e) => {
                  setMobileSearchQuery(e.target.value);
                  setShowMobileSuggestions(true);
                }}
                onFocus={() => setShowMobileSuggestions(true)}
                placeholder="Rechercher des produits ou catégories..."
                className="w-full bg-transparent text-[#0c2847] px-4 py-2 text-[15px] outline-none h-full placeholder:text-gray-400 font-medium"
              />
              <button type="submit" className="bg-brand text-white m-1 rounded-md h-10 px-5 font-semibold hover:bg-opacity-90 transition-colors shrink-0">
                Search
              </button>

              {/* Dynamic Suggestions List */}
              {showMobileSuggestions && mobileSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-[210] overflow-hidden max-h-72 overflow-y-auto">
                  {mobileSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setMobileSearchQuery(item.name);
                        setShowMobileSuggestions(false);
                        setIsMobileSearchOpen(false);
                        router.push(item.url);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors text-left"
                    >
                      {item.type === "product" ? (
                        <>
                          {item.img ? (
                            <div className="w-10 h-10 relative rounded overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                              <Image src={item.img} alt={item.name} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded bg-brand/10 text-brand flex items-center justify-center shrink-0 text-xs font-bold">
                              PROD
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] text-[#0c2847] truncate font-semibold leading-tight">{item.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {item.tag && <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase font-medium">{item.tag}</span>}
                              {item.price && <span className="text-[11px] text-brand font-bold">{item.price}</span>}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                          <span className="text-[14px] text-[#0c2847] truncate font-medium flex-1">{item.name}</span>
                          <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded font-medium">Catégorie</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto text-left">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/logo/logo.png"
                    alt="AFRI TECHS Logo"
                    width={140}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-brand text-xl font-bold p-1 cursor-pointer"
                  aria-label="Fermer le menu"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-5 text-[15px] font-semibold text-[#0c2847]">
                {/* Produits Collapsible */}
                <div>
                  <button
                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                    className="w-full flex justify-between items-center hover:text-brand transition-colors cursor-pointer text-left font-semibold text-[#0c2847] bg-transparent border-0 p-0"
                  >
                    <span>Produits</span>
                    <span className="text-[11px]">{isMobileProductsOpen ? "▲" : "▼"}</span>
                  </button>
                  {isMobileProductsOpen && (
                    <div className="mt-2.5 ml-2 flex flex-col gap-2.5 text-[13px] font-semibold text-gray-750">
                      <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 12 12" fill="none"><path d="M2 1v7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Tous les Produits
                      </Link>
                      {headerCategories.map(cat => (
                        <Link key={cat.id} href={`/products?category=${cat.slug || cat.id}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 12 12" fill="none"><path d="M2 1v7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {cat.name || cat.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Services Collapsible */}
                <div>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex justify-between items-center hover:text-brand transition-colors cursor-pointer text-left font-semibold text-[#0c2847] bg-transparent border-0 p-0"
                  >
                    <span>Nos Services</span>
                    <span className="text-[11px]">{isMobileServicesOpen ? "▲" : "▼"}</span>
                  </button>
                  {isMobileServicesOpen && (
                    <div className="mt-2.5 ml-2 flex flex-col gap-2.5 text-[13px] font-semibold text-gray-750">
                      {[
                        { href: "/services", label: "Tous les Services" },
                        { href: "/services/logistique", label: "Transit & Logistique" },
                        { href: "/services/irrigation", label: "Irrigation & Forage" },
                        { href: "/services/solaire", label: "Énergie Solaire" },
                        { href: "/services/it", label: "IT & Solutions Cloud" },
                        { href: "/services/hse", label: "Formations & HSE" },
                      ].map(item => (
                        <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 12 12" fill="none"><path d="M2 1v7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/projets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand transition-colors">Projets</Link>
                <a href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand transition-colors">À Propos</a>
                <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand transition-colors">Contactez-nous</a>
              </div>
            </div>

            {/* Footer Account Actions */}
            <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="text-[13px] font-semibold text-[#0c2847] uppercase tracking-wider">
                    Mon Compte ({user.firstName})
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#0c2847] hover:bg-[#0c2847]/90 text-white text-[13px] font-bold py-2.5 rounded text-center transition-colors block"
                  >
                    Mon Espace Client
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("afri_techs_user");
                      setUser(null);
                      setIsMobileMenuOpen(false);
                      router.push("/");
                      window.dispatchEvent(new Event("user-updated"));
                    }}
                    className="w-full border border-red-650 text-red-650 hover:bg-red-50 text-[13px] font-bold py-2.5 rounded text-center transition-colors cursor-pointer bg-transparent"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLoginClick();
                    }}
                    className="w-full bg-[#0c2847] hover:bg-[#0c2847]/90 text-white text-[13px] font-bold py-2.5 rounded text-center transition-colors block cursor-pointer"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleRegisterClick();
                    }}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-[#0c2847] text-[13px] font-semibold py-2 rounded text-center transition-colors block cursor-pointer bg-transparent"
                  >
                    Créer un compte
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
