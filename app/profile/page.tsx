"use client";

import { useState, useEffect } from "react";
import QuoteHistory, { QuoteRequest } from "@/components/profile/QuoteHistory";

export default function ProfileMainDashboardPage() {
  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([]);
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
        const userQuotes = currentUserEmail
          ? allQuotes.filter((q) => !q.userEmail || q.userEmail === currentUserEmail)
          : allQuotes;
        setRecentQuotes(userQuotes.slice(0, 5));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <QuoteHistory
      quotes={recentQuotes}
      title="Dernières demandes de devis (5 récents)"
      showAllLink={true}
    />
  );
}
