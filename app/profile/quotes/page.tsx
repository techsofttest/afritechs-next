"use client";

import { useState, useEffect } from "react";
import QuoteHistory, { QuoteRequest } from "@/components/profile/QuoteHistory";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let currentUserEmail = "";
    const storedUser = localStorage.getItem("afri_techs_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        currentUserEmail = parsedUser.email || "";
      } catch (e) {}
    }

    const storedQuotes = localStorage.getItem("afri_techs_quotes");
    if (storedQuotes) {
      try {
        const allQuotes = JSON.parse(storedQuotes) as QuoteRequest[];
        if (currentUserEmail) {
          setQuotes(allQuotes.filter((q) => !q.userEmail || q.userEmail === currentUserEmail));
        } else {
          setQuotes(allQuotes);
        }
      } catch (e) {}
    } else {
      const mockQuotes: QuoteRequest[] = [
        {
          id: "AFRI-Q-00001",
          date: "10/08/2026",
          items: [
            { name: "Euro 50 Plus Powerhouse", quantity: 1, price: 9800, image: "/products/machines/EURO-50-Plus-Powerhouse-1.jpg" }
          ],
          total: 10050,
          deliveryMethod: "standard",
          address: "Commune de Kaloum, Conakry, Guinée",
          userEmail: currentUserEmail
        }
      ];
      setQuotes(mockQuotes);
      localStorage.setItem("afri_techs_quotes", JSON.stringify(mockQuotes));
    }

    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return <QuoteHistory quotes={quotes} />;
}
