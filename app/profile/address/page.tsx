"use client";

import { useState, useEffect } from "react";
import DeliveryAddressForm from "@/components/profile/DeliveryAddressForm";

export default function AddressPage() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "Guinée"
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("afri_techs_address");
    if (storedAddress) {
      try {
        setAddress(JSON.parse(storedAddress));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const handleAddressSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("afri_techs_address", JSON.stringify(address));
    setFeedback({ type: "success", message: "Adresse de livraison enregistrée avec succès !" });
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
      <DeliveryAddressForm
        address={address}
        setAddress={setAddress}
        handleAddressSave={handleAddressSave}
      />
    </div>
  );
}
