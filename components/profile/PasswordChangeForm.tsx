"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

export default function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentPassword) {
      setFeedback({ type: "error", message: "Veuillez entrer votre mot de passe actuel." });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: "error", message: "Le nouveau mot de passe doit contenir au moins 6 caractères." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: "error", message: "Les nouveaux mots de passe ne correspondent pas." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({ type: "success", message: "Votre mot de passe a été mis à jour avec succès !" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 600);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-[#0c2847] mb-5 border-b border-gray-200 pb-2">
        Changer le mot de passe
      </h2>

      {feedback && (
        <div className={`mb-6 p-4 rounded-lg border text-sm font-semibold ${feedback.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className="text-sm font-semibold text-gray-900">
            Mot de passe actuel *
          </label>
          <input
            required
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-sm font-semibold text-gray-900">
            Nouveau mot de passe *
          </label>
          <input
            required
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
            Confirmer le nouveau mot de passe *
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
          />
        </div>

        <div className="mt-2">
          <Button variant="primary" type="submit" disabled={isSubmitting} className="px-6 py-3.5 text-base font-semibold cursor-pointer disabled:opacity-50">
            {isSubmitting ? "Mise à jour..." : "Mettre à jour le mot de passe"}
          </Button>
        </div>
      </form>
    </div>
  );
}
