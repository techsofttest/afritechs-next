"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { ProductVariant } from "@/lib/api";

interface ProductData {
  id: string;
  title: string;
  img: string;
  price: string;
  priceValue?: number;
  categoryName?: string;
  variants?: ProductVariant[];
  variantId?: string;
  variantName?: string;
  variantSku?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
  variantName?: string;
  variantSku?: string;
}

export default function GlobalRequestBag() {
  const [activeProduct, setActiveProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedModalVariant, setSelectedModalVariant] = useState<ProductVariant | null>(null);
  const [modalVariantError, setModalVariantError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items initially and on storage updates
  const loadCart = () => {
    const stored = localStorage.getItem("afri_techs_cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  };

  const performAdd = (
    product: ProductData,
    qty: number,
    chosenVariant?: ProductVariant | null
  ) => {
    const vId = chosenVariant?.id || product.variantId;
    const vName = chosenVariant?.name || product.variantName;
    const vSku = chosenVariant?.sku || product.variantSku;

    let numPrice = 0;
    if (chosenVariant) {
      numPrice = chosenVariant.sale_price ?? chosenVariant.price;
    } else if (product.priceValue) {
      numPrice = product.priceValue;
    } else if (product.price) {
      numPrice = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 0;
    }

    const uniqueItemId = vId ? `${product.id}_${vId}` : product.id;

    const newItem: CartItem = {
      id: uniqueItemId,
      productId: product.id,
      name: product.title,
      category: product.categoryName || "Produits",
      price: numPrice,
      quantity: qty,
      image: product.img,
      variantId: vId,
      variantName: vName,
      variantSku: vSku,
    };

    const stored = localStorage.getItem("afri_techs_cart");
    let currentItems: CartItem[] = [];
    if (stored) {
      try {
        currentItems = JSON.parse(stored);
      } catch (e) {}
    }

    const existingIndex = currentItems.findIndex((item) => item.id === newItem.id);
    if (existingIndex > -1) {
      currentItems[existingIndex].quantity += qty;
    } else {
      currentItems.push(newItem);
    }

    localStorage.setItem("afri_techs_cart", JSON.stringify(currentItems));
    setCartItems(currentItems);
    window.dispatchEvent(new Event("cart-updated"));
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    loadCart();

    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<ProductData & { quantity?: number; skipModal?: boolean }>;
      if (customEvent.detail) {
        const prod = customEvent.detail;
        const variants = prod.variants || [];
        const qty = prod.quantity || 1;

        // If skipModal is explicitly set or there are 0 or 1 variants, directly add to cart!
        if (prod.skipModal || variants.length <= 1) {
          const singleVariant = variants.length === 1 ? variants[0] : null;
          performAdd(prod, qty, singleVariant);
        } else {
          // Multiple variants (>1) present -> open Quick Add Modal
          setActiveProduct(prod);
          setQuantity(qty);
          setSelectedModalVariant(null);
          setModalVariantError(false);
        }
      }
    };

    const handleOpenDrawerOnly = () => {
      loadCart();
      setIsDrawerOpen(true);
    };

    window.addEventListener("open-request-modal", handleOpenModal);
    window.addEventListener("open-request-drawer", handleOpenDrawerOnly);
    window.addEventListener("cart-updated", loadCart);

    return () => {
      window.removeEventListener("open-request-modal", handleOpenModal);
      window.removeEventListener("open-request-drawer", handleOpenDrawerOnly);
      window.removeEventListener("cart-updated", loadCart);
    };
  }, []);

  const handleAddToBag = () => {
    if (!activeProduct) return;
    const variants = activeProduct.variants || [];

    if (variants.length > 1 && !selectedModalVariant) {
      setModalVariantError(true);
      return;
    }

    performAdd(activeProduct, quantity, selectedModalVariant);
    setActiveProduct(null);
    setSelectedModalVariant(null);
    setModalVariantError(false);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("afri_techs_cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    localStorage.setItem("afri_techs_cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* 1. QUANTITY SELECTION MODAL */}
      {activeProduct && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative border border-gray-100 flex flex-col gap-5 text-left">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <div>
              <span className="text-[11px] font-semibold text-[#0c2847] uppercase tracking-wider block mb-1">
                {activeProduct.categoryName || "Sélection"}
              </span>
              <h3 className="text-lg font-semibold text-[#0c2847] leading-snug">
                {activeProduct.title}
              </h3>
            </div>

            {/* Product Image and Details Row */}
            <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="relative w-16 h-16 shrink-0 bg-white border border-gray-200 rounded-md overflow-hidden p-1">
                <Image
                  src={activeProduct.img}
                  alt={activeProduct.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-[#0c2847] font-semibold text-sm">
                  {selectedModalVariant
                    ? (selectedModalVariant.formattedPrice || `${(selectedModalVariant.sale_price ?? selectedModalVariant.price).toLocaleString("fr-FR")} €`)
                    : activeProduct.price}
                </p>
                <p className="text-xs text-gray-900 mt-0.5">
                  {activeProduct.variants && activeProduct.variants.length > 1
                    ? "Veuillez choisir une variante."
                    : "Choisissez la quantité souhaitée ci-dessous."}
                </p>
              </div>
            </div>

            {/* Variant Selector in Quick Add Modal */}
            {activeProduct.variants && activeProduct.variants.length > 1 && (
              <div className={`p-3 rounded-lg border flex flex-col gap-2 ${
                modalVariantError ? "border-red-500 bg-red-50/50" : "border-gray-200 bg-gray-50/50"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#0c2847] uppercase tracking-wider">
                    Variante <span className="text-red-500">*</span>
                  </span>
                  {selectedModalVariant && (
                    <span className="text-[11px] text-green-700 font-semibold bg-green-100 px-1.5 py-0.5 rounded">
                      {selectedModalVariant.name}
                    </span>
                  )}
                </div>

                {modalVariantError && (
                  <p className="text-xs text-red-600 font-semibold">
                    Veuillez sélectionner une variante.
                  </p>
                )}

                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {activeProduct.variants.map((v) => {
                    const isSelected = selectedModalVariant?.id === v.id;
                    const priceStr = v.formattedPrice || (v.sale_price ? `${v.sale_price.toLocaleString("fr-FR")} €` : `${v.price.toLocaleString("fr-FR")} €`);

                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedModalVariant(v);
                          setModalVariantError(false);
                        }}
                        className={`w-full p-2.5 rounded-md border text-left text-xs flex justify-between items-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#0c2847] bg-[#0c2847] text-white font-semibold"
                            : "border-gray-200 bg-white text-[#0c2847] hover:border-[#0c2847]/40"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{v.name}</span>
                          {v.sku && (
                            <span className={isSelected ? "text-gray-300 text-[10px] font-mono" : "text-gray-400 text-[10px] font-mono"}>
                              SKU: {v.sku}
                            </span>
                          )}
                        </div>
                        <span className="font-bold shrink-0 ml-2">{priceStr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between border-y border-gray-100 py-3">
              <span className="text-sm font-semibold text-gray-900">Quantité :</span>
              <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-1 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-gray-900 hover:text-[#0c2847] hover:bg-gray-100 font-semibold transition-all text-lg cursor-pointer"
                >
                  &minus;
                </button>
                <span translate="no" className="w-8 text-center text-[14px] font-semibold text-[#0c2847] notranslate">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-gray-900 hover:text-[#0c2847] hover:bg-gray-100 font-semibold transition-all text-lg cursor-pointer"
                >
                  &#43;
                </button>
              </div>
            </div>

            {/* Add button */}
            <Button
              variant="primary"
              onClick={handleAddToBag}
              className="w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ajouter au panier de demande
            </Button>
          </div>
        </div>
      )}

      {/* 2. LEFT SIDE DRAWER */}
      <div
        translate="no"
        className={`fixed inset-y-0 left-0 max-w-[350px] w-full bg-white z-[999] shadow-2xl border-r border-gray-200 flex flex-col transition-transform duration-300 notranslate ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0c2847]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 translate="no" className="text-base font-semibold text-[#0c2847] notranslate">
              Panier de Demande
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-900 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-150 transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p translate="no" className="text-gray-900 text-sm font-medium notranslate">Votre panier est vide.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`drawer-${item.id}`}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
              >
                {/* Item Thumbnail */}
                <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-md overflow-hidden p-0.5 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 translate="no" className="text-sm font-semibold text-[#0c2847] truncate notranslate">
                    {item.name}
                  </h4>

                  {item.variantName && (
                    <span className="inline-block text-[11px] text-[#0c2847] bg-[#0c2847]/10 font-semibold px-1.5 py-0.5 rounded mt-0.5 max-w-full truncate">
                      {item.variantName} {item.variantSku ? `(${item.variantSku})` : ""}
                    </span>
                  )}

                  <p className="text-xs text-gray-900 mt-0.5 font-semibold">
                    <span translate="no" className="notranslate">
                      {item.price.toLocaleString("fr-FR")}
                    </span>{" "}
                    € / u
                  </p>
                  <p className="text-xs text-[#0c2847] font-semibold mt-0.5">
                    Total: <span translate="no" className="notranslate">{(item.price * item.quantity).toLocaleString("fr-FR")}</span> €
                  </p>
                </div>

                {/* Quantity adjustments */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 border border-gray-300 rounded p-1 bg-white">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-gray-900 hover:bg-gray-150 text-sm cursor-pointer font-bold"
                    >
                      &minus;
                    </button>
                    <span translate="no" className="w-6 text-center text-sm font-semibold text-[#0c2847] notranslate">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-gray-900 hover:bg-gray-150 text-sm cursor-pointer font-bold"
                    >
                      &#43;
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-gray-200 bg-gray-50 flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm font-semibold text-[#0c2847]">
            <span>Total :</span>
            <span translate="no" className="text-base font-bold notranslate">
              {subtotal.toLocaleString("fr-FR")} €
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link href="/cart" className="w-full" onClick={() => setIsDrawerOpen(false)}>
              <Button
                variant="primary"
                className="w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                Demander un devis
              </Button>
            </Link>
            <Link href="/cart" className="w-full" onClick={() => setIsDrawerOpen(false)}>
              <Button
                variant="secondary"
                className="w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                Aller au panier
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer Overlay backdrop */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black/45 z-[990] backdrop-blur-xs"
        />
      )}
    </>
  );
}
