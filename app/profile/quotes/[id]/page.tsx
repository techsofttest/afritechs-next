"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { QuoteRequest } from "@/components/profile/QuoteHistory";

function QuoteDetailPageContent() {
  const params = useParams();
  const id = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; phone?: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load User
    const storedUser = localStorage.getItem("afri_techs_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) { }
    }

    // Load Quotes
    const storedQuotes = localStorage.getItem("afri_techs_quotes");
    if (storedQuotes) {
      try {
        const allQuotes = JSON.parse(storedQuotes) as QuoteRequest[];
        const found = allQuotes.find((q) => q.id === id);
        if (found) {
          setQuote(found);
        }
      } catch (e) { }
    }
    setIsLoaded(true);
  }, [id]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12 font-sans text-[#0c2847]">
        Chargement...
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="w-full text-center py-12">
        <h2 className="text-2xl font-bold text-[#0c2847] mb-4">Devis introuvable</h2>
        <p className="text-gray-600 mb-6">La demande de devis demandée n&apos;existe pas ou a été supprimée.</p>
        <Link href="/profile/quotes" className="inline-block bg-[#0c2847] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
          Retour à mes devis
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title Header */}
      <div className="mb-8 flex flex-col gap-1 text-left">
        <div className="text-[12px] font-semibold text-[#0c2847] mb-1">
          Détails de la demande
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0c2847] leading-tight">
            Devis <span translate="no" className="notranslate font-bold">{quote.id}</span>
          </h1>
        </div>
        <p className="text-gray-900 text-sm mt-1">
          Demande soumise le {quote.date} pour <span translate="no" className="notranslate font-semibold">{quote.items.length}</span> article(s).
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Column 1 — Quote Items List */}
        <div className="w-full lg:w-2/3 flex flex-col order-2 lg:order-1">
          {/* Quote Items List */}
          <div className="flex flex-col gap-4">
            {quote.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-3 sm:p-4 flex gap-3 sm:gap-4 items-center"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-white">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1 sm:p-2"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-medium">Aucune image</span>
                  )}
                </div>

                {/* Info details */}
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                  <div className="min-w-0 text-left">
                    <span className="text-[10px] font-semibold text-[#0c2847]/80 block uppercase tracking-wider">
                      Afri-techs Catalogue
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0c2847] truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      <span translate="no" className="notranslate font-semibold text-[#0c2847]/95">
                        {item.price.toLocaleString("fr-FR")}
                      </span>{" "}
                      € / unité
                    </p>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-1.5 md:pt-0 border-t border-gray-200/50 md:border-none shrink-0">
                    <div className="text-left md:text-right shrink-0">
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-0.5">Quantité</p>
                      <p className="text-xs sm:text-sm font-bold text-[#0c2847] leading-none">{item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0 min-w-[70px]">
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-0.5">Sous-total</p>
                      <p className="text-xs sm:text-sm font-bold text-[#0c2847] leading-none">
                        <span translate="no" className="notranslate">
                          {(item.price * item.quantity).toLocaleString("fr-FR")}
                        </span>{" "}
                        €
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 — Sticky Order Details & Summary Card (matching CartSummary design) */}
        <div className="w-full lg:w-1/3 order-1 lg:order-2">
          <div className="w-full bg-white rounded-xl border border-gray-200 p-6 sticky top-[110px] flex flex-col gap-6 text-left">

            {/* Client Header */}
            <div>
              <h3 className="text-[14px] font-semibold text-[#0c2847] mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-[#0c2847]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informations du Client
              </h3>
              <div className="flex flex-col gap-2.5 text-[13px] text-gray-950">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nom Complet :</span>
                  <span className="font-semibold text-[#0c2847]">
                    {user ? `${user.firstName} ${user.lastName}` : "Client Afri-techs"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Adresse email :</span>
                  <span className="font-semibold text-[#0c2847]">{user?.email || "Non renseignée"}</span>
                </div>
                {user?.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Téléphone :</span>
                    <span className="font-semibold text-[#0c2847]">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Details */}
            <div>
              <h3 className="text-[14px] font-semibold text-[#0c2847] mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-[#0c2847]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Adresse de Livraison
              </h3>
              <p className="text-[13px] text-gray-950 leading-relaxed font-semibold">
                {quote.address}
              </p>
            </div>

            {/* Financial Summary */}
            <div className="pt-2 border-t border-gray-150">
              <div className="flex justify-between items-center text-base font-semibold text-[#0c2847]">
                <span>Total Estimé :</span>
                <span className="text-[24px]">
                  <span translate="no" className="notranslate">
                    {quote.total.toLocaleString("fr-FR")}
                  </span>{" "}
                  €
                </span>
              </div>
            </div>

            {/* Back Button matching "Continuer mes achats" style */}
            <Link
              href="/profile/quotes"
              className="block text-center text-xs font-semibold text-[#0c2847] hover:underline mt-2 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour à mes devis
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function QuoteDetailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12 font-sans text-[#0c2847]">Chargement...</div>}>
      <QuoteDetailPageContent />
    </Suspense>
  );
}
