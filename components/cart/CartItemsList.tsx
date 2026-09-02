"use client";

import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
  variantName?: string;
  variantSku?: string;
}

interface CartItemsListProps {
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

export default function CartItemsList({
  items,
  updateQuantity,
  removeItem,
}: CartItemsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div
          key={item.id ? `${item.id}-${index}` : index}
          className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-3 sm:p-4 flex gap-3 sm:gap-4 items-center"
        >
          {/* Product Image */}
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-white">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-1 sm:p-2"
            />
          </div>

          {/* Info Details */}
          <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
            
            {/* Title & Category & Price */}
            <div className="min-w-0">
              <span className="text-[10px] font-semibold text-[#0c2847]/80 block uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#0c2847] truncate">
                {item.name}
              </h3>
              {item.variantName && (
                <div className="my-0.5">
                  <span className="inline-block text-[11px] font-semibold text-[#0c2847] bg-[#0c2847]/10 px-2 py-0.5 rounded">
                    Variante: {item.variantName} {item.variantSku ? `(SKU: ${item.variantSku})` : ""}
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                <span translate="no" className="notranslate font-semibold text-[#0c2847]/90">
                  {item.price.toLocaleString("fr-FR")}
                </span>{" "}
                € / unité
              </p>
            </div>

            {/* Quantity Controls, Subtotal and Remove button */}
            <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 pt-1.5 md:pt-0 border-t border-gray-200/50 md:border-none">
              {/* Quantity */}
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-0.5 bg-white shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-7 h-7 rounded flex items-center justify-center text-gray-900 hover:text-[#0c2847] hover:bg-gray-100 font-semibold transition-all text-sm"
                  aria-label="Réduire la quantité"
                >
                  &minus;
                </button>
                <span
                  translate="no"
                  className="w-6 text-center text-xs font-semibold text-[#0c2847] notranslate"
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-7 h-7 rounded flex items-center justify-center text-gray-900 hover:text-[#0c2847] hover:bg-gray-100 font-semibold transition-all text-sm"
                  aria-label="Augmenter la quantité"
                >
                  &#43;
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[70px]">
                <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-0.5">Sous-total</p>
                <p className="text-xs sm:text-sm font-bold text-[#0c2847] leading-none">
                  <span translate="no" className="notranslate">
                    {(item.price * item.quantity).toLocaleString("fr-FR")}
                  </span>{" "}
                  €
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors"
                aria-label="Retirer l'article"
                title="Retirer l'article"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
