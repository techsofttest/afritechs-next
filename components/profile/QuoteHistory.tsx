import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface QuoteItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface QuoteRequest {
  id: string;
  date: string;
  items: QuoteItem[];
  total: number;
  deliveryMethod: string;
  address: string;
  userEmail?: string;
}

interface QuoteHistoryProps {
  quotes: QuoteRequest[];
  title?: string;
  showAllLink?: boolean;
}

export default function QuoteHistory({ quotes, title = "Historique des demandes de devis", showAllLink = false }: QuoteHistoryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-xl font-semibold text-[#0c2847]">
          {title}
        </h2>
        {showAllLink && quotes.length > 0 && (
          <Link href="/profile/quotes" className="text-sm font-semibold text-[#0c2847] hover:underline">
            Voir toutes les demandes →
          </Link>
        )}
      </div>

      {quotes.length === 0 ? (
        <p className="text-gray-900 text-base text-center py-6">Aucune demande de devis soumise pour le moment.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {quotes.map((q) => {
            const displayItems = q.items.slice(0, 4);
            const remainingCount = q.items.length - 4;

            return (
              <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3.5">
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-100 flex-wrap gap-2">
                  <div>
                    <span translate="no" className="notranslate text-sm font-semibold text-[#0c2847] bg-gray-100 px-2 py-0.5 rounded">
                      {q.id}
                    </span>
                    <span translate="no" className="notranslate text-xs text-gray-900 ml-2.5">{q.date}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Articles inclus :</span>
                  <div className="flex flex-wrap gap-4 pt-1 items-center">
                    {displayItems.map((i, idx) => (
                      <div key={idx} className="relative w-12 h-12 bg-white border border-gray-200 rounded-lg shrink-0 flex items-center justify-center" title={i.name}>
                        {i.image ? (
                          <div className="relative w-full h-full overflow-hidden rounded-lg">
                            <Image src={i.image} alt={i.name} fill className="object-contain" />
                          </div>
                        ) : (
                          <div className="text-[9px] text-gray-400 text-center select-none font-medium">No Image</div>
                        )}
                        <span className="absolute -top-1.5 -right-1.5 bg-[#d91212] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold border border-white shadow-sm">
                          {i.quantity}
                        </span>
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-[13px] font-bold text-gray-600 shrink-0" title={`${remainingCount} autres produits`}>
                        +{remainingCount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 flex-wrap gap-4 text-sm">
                  <span className="text-gray-900 text-sm">
                    Livré à : <strong translate="no" className="notranslate font-semibold">{q.address}</strong>
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="text-base font-semibold text-[#0c2847]">
                      Total : <strong translate="no" className="notranslate text-xl font-bold">{q.total.toLocaleString("fr-FR")} €</strong>
                    </span>
                    <Link
                      href={`/profile/quotes/${q.id}`}
                      className="bg-[#0c2847] hover:bg-[#0c2847]/90 text-white font-semibold text-xs px-4 py-2 rounded transition-colors"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
