import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface PersonalDetailsFormProps {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  handleUserSave: (e: React.FormEvent) => void;
}

export default function PersonalDetailsForm({ user, setUser, handleUserSave }: PersonalDetailsFormProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-[#0c2847] mb-5 border-b border-gray-200 pb-2">
        Modifier les informations personnelles
      </h2>
      {user ? (
        <form onSubmit={handleUserSave} className="flex flex-col gap-4 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="p-firstName" className="text-sm font-semibold text-gray-900">
                Prénom *
              </label>
              <input
                required
                type="text"
                id="p-firstName"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="p-lastName" className="text-sm font-semibold text-gray-900">
                Nom *
              </label>
              <input
                required
                type="text"
                id="p-lastName"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-email" className="text-sm font-semibold text-gray-900">
              Adresse e-mail (Non modifiable)
            </label>
            <input
              disabled
              readOnly
              type="email"
              id="p-email"
              value={user.email}
              className="border border-gray-300 bg-gray-100 rounded-md p-2.5 text-base text-gray-500 font-medium cursor-not-allowed select-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-phone" className="text-sm font-semibold text-gray-900">
              Téléphone
            </label>
            <input
              type="tel"
              id="p-phone"
              value={user.phone || ""}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              placeholder="+224 ..."
              className="border border-gray-400 bg-white rounded-md p-2.5 text-base text-[#0c2847] focus:outline-none focus:border-[#0c2847] font-medium"
            />
          </div>
          <div className="mt-2">
            <Button variant="primary" type="submit" className="px-6 py-3.5 text-base font-semibold cursor-pointer">
              Sauvegarder les modifications
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-900 text-base mb-4">Vous devez être connecté pour gérer votre compte.</p>
          <Link href="/login">
            <Button variant="primary" className="px-7 py-3 text-base font-semibold cursor-pointer">
              Se connecter
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
