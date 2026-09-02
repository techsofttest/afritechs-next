"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/global/Header";
import Button from "@/components/ui/Button";
import { submitOrder } from "@/lib/api";

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

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Guinée",
    deliveryMethod: "standard",
    notes: ""
  });

  useEffect(() => {
    // Pre-populate user details if logged in
    const storedUser = localStorage.getItem("afri_techs_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setFormData((prev) => ({
          ...prev,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || ""
        }));
      } catch (e) { }
    }

    // Pre-populate saved delivery address if exists  
    const storedAddress = localStorage.getItem("afri_techs_address");
    if (storedAddress) {
      try {
        const addr = JSON.parse(storedAddress);
        setFormData((prev) => ({
          ...prev,
          address: addr.street || addr.address || "",
          city: addr.city || "",
          zipCode: addr.zipCode || addr.zip || "",
          country: addr.country || "Guinée"
        }));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on input
    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
    if (generalError) setGeneralError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est obligatoire.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est obligatoire.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Veuillez entrer une adresse e-mail valide.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est obligatoire.";
    } else if (!/^[0-9\-\+\s\(\)]{6,30}$/.test(formData.phone.trim())) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide (min. 6 chiffres).";
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse complète est obligatoire.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est obligatoire.";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Le pays est obligatoire.";
    }

    if (items.length === 0) {
      setGeneralError("Votre panier est vide. Veuillez ajouter des articles avant de passer la commande.");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Validate frontend
    if (!validateForm()) {
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    let quoteOrderNumber = "";

    // Call backend API to save order & send admin email notification
    try {
      const res = await submitOrder({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zipCode,
        country: formData.country,
        notes: formData.notes,
        items: items.map((item) => ({
          product_id: item.id,
          name: item.name + (item.variantName ? ` (${item.variantName})` : ""),
          qty: item.quantity,
          price: item.price,
          sku: item.variantSku || "",
          variant_id: item.variantId || undefined,
        })),
      });

      if (res.status === "error") {
        if (res.errors) {
          const apiErrors: Record<string, string> = {};
          if (res.errors.first_name) apiErrors.firstName = res.errors.first_name[0];
          if (res.errors.last_name) apiErrors.lastName = res.errors.last_name[0];
          if (res.errors.email) apiErrors.email = res.errors.email[0];
          if (res.errors.phone) apiErrors.phone = res.errors.phone[0];
          if (res.errors.address) apiErrors.address = res.errors.address[0];
          if (res.errors.city) apiErrors.city = res.errors.city[0];
          if (res.errors.country) apiErrors.country = res.errors.country[0];
          setErrors(apiErrors);
        }
        setGeneralError(res.message || "Une erreur est survenue lors de l'envoi du devis.");
        setIsSubmitting(false);
        return;
      }

      if (res.order?.order_number) {
        quoteOrderNumber = res.order.order_number;
      }
    } catch (err: any) {
      console.error("Backend order submission error:", err);
      setGeneralError("Une erreur réseau s'est produite. Veuillez réessayer.");
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
    }

    // Save / update address in profile storage
    localStorage.setItem("afri_techs_address", JSON.stringify({
      street: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country
    }));

    // Register quote to history
    const storedQuotes = localStorage.getItem("afri_techs_quotes");
    let currentQuotes = [];
    if (storedQuotes) {
      try {
        currentQuotes = JSON.parse(storedQuotes);
      } catch (err) { }
    }

    const sequentialId = quoteOrderNumber || ("AFRI-Q-" + String(currentQuotes.length + 1).padStart(5, "0"));
    const newQuote = {
      id: sequentialId,
      date: new Date().toLocaleDateString("fr-FR"),
      userEmail: formData.email,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      total: total,
      deliveryMethod: formData.deliveryMethod,
      address: `${formData.address}, ${formData.city}, ${formData.country}`
    };

    currentQuotes.unshift(newQuote);
    localStorage.setItem("afri_techs_quotes", JSON.stringify(currentQuotes));

    // Show success modal
    setIsSuccessModalOpen(true);

    // Clear cart storage
    localStorage.removeItem("afri_techs_cart");
    window.dispatchEvent(new Event("cart-updated"));
  };


  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] pb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Column 1 — Details & Contact Form */}
          <form onSubmit={handleSubmit} noValidate className="w-full lg:w-2/3 flex flex-col">
            {/* Header Title */}
            <div className="mb-8">
              <div className="text-[12px] font-semibold text-[#0c2847] mb-2 uppercase tracking-wider">
                Sécurisé
              </div>
              <h1 className="text-3xl font-semibold text-[#0c2847] leading-tight">
                Finaliser la commande
              </h1>
              <p className="text-gray-900 text-sm mt-1">
                Veuillez remplir vos informations de contact et d&apos;expédition.
              </p>
            </div>

            {/* General Error Alert */}
            {generalError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{generalError}</span>
              </div>
            )}

            {/* Form Panels */}
            <div className="flex flex-col gap-6">
              {/* Contact Information */}
              <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0c2847] mb-4 border-b border-gray-200 pb-2">
                  1. Informations de contact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-xs font-semibold text-gray-900">
                      Prénom *
                    </label>
                    <input
                      required
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                    />
                    {errors.firstName && <span className="text-xs text-red-600 font-medium">{errors.firstName}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-xs font-semibold text-gray-900">
                      Nom *
                    </label>
                    <input
                      required
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                    />
                    {errors.lastName && <span className="text-xs text-red-600 font-medium">{errors.lastName}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-900">
                      Adresse e-mail *
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                    />
                    {errors.email && <span className="text-xs text-red-600 font-medium">{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-gray-900">
                      Téléphone *
                    </label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+224 ..."
                      className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                    />
                    {errors.phone && <span className="text-xs text-red-600 font-medium">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0c2847] mb-4 border-b border-gray-200 pb-2">
                  2. Détails de livraison
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="text-xs font-semibold text-gray-900">
                      Adresse complète *
                    </label>
                    <input
                      required
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Rue, Quartier, Secteur..."
                      className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                    />
                    {errors.address && <span className="text-xs text-red-600 font-medium">{errors.address}</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="city" className="text-xs font-semibold text-gray-900">
                        Ville *
                      </label>
                      <input
                        required
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                      />
                      {errors.city && <span className="text-xs text-red-600 font-medium">{errors.city}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="zipCode" className="text-xs font-semibold text-gray-900">
                        Code Postal
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="border border-gray-400 bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="country" className="text-xs font-semibold text-gray-900">
                        Pays *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`border bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none font-medium ${errors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-[#0c2847]'}`}
                      >
                        <option value="Guinée">Guinée</option>
                        <option value="Sénégal">Sénégal</option>
                        <option value="Mali">Mali</option>
                        <option value="Côte d'Ivoire">Côte d&apos;Ivoire</option>
                      </select>
                      {errors.country && <span className="text-xs text-red-600 font-medium">{errors.country}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions & Notes */}
              <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0c2847] mb-4 border-b border-gray-200 pb-2">
                  3. Instructions & Notes
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="notes" className="text-xs font-semibold text-gray-900">
                      Instructions de livraison / Remarques pour le devis
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Précisez vos besoins particuliers, conditions de livraison souhaitées ou questions..."
                      className="border border-gray-400 bg-white rounded-md p-2.5 text-sm text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Column 2 — Order Summary card (sticky) */}
          <div translate="no" className="notranslate w-full lg:w-1/3 bg-[#f8f9fa] rounded-xl border border-gray-200 p-6 sticky top-[110px] flex flex-col gap-5">
            <h3 className="text-[14px] font-semibold text-[#0c2847] pb-2 border-b border-gray-200 flex items-center gap-2">
              <svg className="w-4.5 h-4.5 text-[#0c2847]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Articles de la demande
            </h3>

            {/* List of checkout items */}
            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 bg-white border border-gray-200 rounded p-0.5 shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#0c2847] truncate">{item.name}</h4>
                    {item.variantName && (
                      <p className="text-[10px] text-gray-500 font-semibold truncate">
                        {item.variantName}
                      </p>
                    )}
                    <p className="text-[11px] text-gray-900 mt-0.5 font-medium">Qté: {item.quantity}</p>
                  </div>
                  <span translate="no" className="text-xs font-semibold text-[#0c2847] notranslate shrink-0">
                    {(item.price * item.quantity).toLocaleString("fr-FR")} €
                  </span>
                </div>
              ))}
            </div>

            {/* Totals panel */}
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-3 text-[13px]">
              <div className="flex justify-between items-center text-gray-900">
                <span>Sous-total articles :</span>
                <span className="font-semibold text-[#0c2847]">
                  <span translate="no" className="notranslate">{subtotal.toLocaleString("fr-FR")}</span> €
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3.5 flex justify-between items-center text-base font-semibold text-[#0c2847]">
                <span>Total de la demande :</span>
                <span className="text-[24px]">
                  <span translate="no" className="notranslate">{total.toLocaleString("fr-FR")}</span> €
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 text-base font-semibold text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Traitement en cours..." : "Demander un devis"}
            </Button>
          </div>
        </div>
      </main>

      {/* SUCCESS CONFIRMATION MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-8 text-center border border-gray-100 flex flex-col items-center gap-5">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200 text-green-600 text-3xl font-bold">
              ✓
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0c2847] mb-2">
                Commande Reçue !
              </h3>
              <p className="text-gray-900 text-sm leading-relaxed">
                Merci, <strong className="font-semibold">{formData.firstName}</strong>. Votre demande de devis a été enregistrée avec succès. Un <strong> e-mail </strong>de confirmation contenant les détails de votre commande a été envoyé à <strong className="font-semibold">{formData.email}</strong>.
              </p>
            </div>

            <Link href="/" className="w-full">
              <Button variant="primary" className="w-full py-3.5 font-semibold cursor-pointer">
                Retourner à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

