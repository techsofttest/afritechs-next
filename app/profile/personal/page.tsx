"use client";

import { useState, useEffect } from "react";
import PersonalDetailsForm from "@/components/profile/PersonalDetailsForm";

export default function PersonalDetailsPage() {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; phone?: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("afri_techs_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const handleUserSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    localStorage.setItem("afri_techs_user", JSON.stringify(user));
    window.dispatchEvent(new Event("user-updated"));
    setFeedback({ type: "success", message: "Profil mis à jour avec succès !" });
    setTimeout(() => setFeedback(null), 3000);
  };

  if (!isLoaded) return null;

  return (
    <div>
      {feedback && (
        <div className={`mb-6 p-4 rounded-lg border text-base font-semibold ${feedback.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
          {feedback.message}
        </div>
      )}
      <PersonalDetailsForm
        user={user}
        setUser={setUser}
        handleUserSave={handleUserSave}
      />
    </div>
  );
}
