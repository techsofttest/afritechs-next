import React from "react";
import Button from "@/components/ui/Button";

interface AddressInfo {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

interface DeliveryAddressFormProps {
  address: AddressInfo;
  setAddress: (address: AddressInfo) => void;
  handleAddressSave: (e: React.FormEvent) => void;
}

export default function DeliveryAddressForm({ address, setAddress, handleAddressSave }: DeliveryAddressFormProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-[#0c2847] mb-5 border-b border-gray-200 pb-2">
        Gérer l&apos;adresse de livraison principale
      </h2>
      <form onSubmit={handleAddressSave} className="flex flex-col gap-4 max-w-xl">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="p-street" className="text-sm font-semibold text-gray-900">
            Adresse complète *
          </label>
          <input
            required
            type="text"
            id="p-street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            placeholder="Rue, Quartier, Secteur..."
            className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-city" className="text-sm font-semibold text-gray-900">
              Ville *
            </label>
            <input
              required
              type="text"
              id="p-city"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-zip" className="text-sm font-semibold text-gray-900">
              Code Postal
            </label>
            <input
              type="text"
              id="p-zip"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-country" className="text-sm font-semibold text-gray-900">
              Pays *
            </label>
            <select
              id="p-country"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
            >
              <option value="Guinée">Guinée</option>
              <option value="Sénégal">Sénégal</option>
              <option value="Mali">Mali</option>
              <option value="Côte d'Ivoire">Côte d&apos;Ivoire</option>
            </select>
          </div>
        </div>
        <div className="mt-2">
          <Button variant="primary" type="submit" className="px-6 py-3.5 text-base font-semibold cursor-pointer">
            Sauvegarder l&apos;adresse
          </Button>
        </div>
      </form>
    </div>
  );
}
