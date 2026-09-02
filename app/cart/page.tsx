"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/global/Header";
import Button from "@/components/ui/Button";
import CartItemsList from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [user, setUser] = useState<{ firstName: string } | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("afri_techs_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) { }
    }

    const storedCart = localStorage.getItem("afri_techs_cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        setItems([]);
      }
    } else {
      setItems([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("afri_techs_cart", JSON.stringify(items));
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, [items, isLoaded]);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = Number(item.quantity) + delta;
          return { ...item, quantity: Math.max(1, nextQty) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] pb-16">
        {items.length === 0 ? (
          <div className="flex flex-col">
            {/* Title Header */}
            <div className="mb-8">
              <div className="text-[12px] font-semibold text-[#0c2847] mb-2">
                Panier d&apos;achat
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0c2847] leading-tight">
                {user ? `Votre panier, ${user.firstName}` : "Votre panier"}
              </h1>
              <p className="text-gray-900 text-sm mt-1">Votre panier est actuellement vide.</p>
            </div>

            {/* Empty Box */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-[#0c2847] mb-2">Aucun produit dans le panier</h3>
              <p className="text-gray-900 text-sm mb-6">Explorez nos solutions multisectorielles et ajoutez des équipements.</p>
              <Link href="/products">
                <Button variant="primary" className="px-6 py-3 font-semibold">
                  Retourner aux produits
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Column 1 — Title Header + Cart Items List */}
            <div className="w-full lg:w-2/3 flex flex-col">
              {/* Title Header inside Column 1 */}
              <div className="mb-8">
                <div className="text-[12px] font-semibold text-[#0c2847] mb-2">
                  Panier d&apos;achat
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#0c2847] leading-tight">
                  {user ? `Votre panier, ${user.firstName}` : "Votre panier"}
                </h1>
                <p className="text-gray-900 text-sm mt-1">
                  Vous avez <span translate="no" className="notranslate font-semibold">{items.length}</span> article(s) prêt(s) pour la demande.
                </p>
              </div>

              {/* Items List */}
              <div translate="no" className="notranslate">
                <CartItemsList
                  items={items}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              </div>
            </div>

            {/* Column 2 — Sticky Order Summary card */}
            <div translate="no" className="notranslate w-full lg:w-1/3">
              <CartSummary
                items={items}
                subtotal={subtotal}
                total={total}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
