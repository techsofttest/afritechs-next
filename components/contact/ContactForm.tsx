"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6 text-[#0c2847]">Envoyez-nous un Message</h3>
      
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
          Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nom Complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm text-gray-800 placeholder:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Adresse Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm text-gray-800 placeholder:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="Le motif de votre message"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm text-gray-800 placeholder:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Rédigez votre message ici..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm text-gray-800 placeholder:text-gray-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 bg-[#0c2847] text-white font-semibold rounded-lg hover:bg-[#0c2847]/95 transition-colors disabled:bg-gray-400 cursor-pointer text-center text-sm"
        >
          {status === "submitting" ? "Envoi en cours..." : "Envoyer le Message"}
        </button>
      </form>
    </div>
  );
}
