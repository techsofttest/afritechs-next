"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Mon Profil", href: "/profile" },
    { label: "Informations personnelles", href: "/profile/personal" },
    { label: "Adresse de livraison", href: "/profile/address" },
    { label: "Demandes de devis", href: "/profile/quotes" },
    { label: "Changer le mot de passe", href: "/profile/password" },
  ];

  return (
    <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-1.5 sm:gap-2 border-b lg:border-b-0 lg:border-r border-gray-200 pb-3 lg:pb-0 lg:pr-6 shrink-0 lg:sticky lg:top-[130px] overflow-x-auto lg:overflow-x-visible no-scrollbar">
      {navItems.map((item) => {
        const isActive =
          item.href === "/profile"
            ? pathname === "/profile"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex-none lg:flex-none text-left px-4 lg:pl-6 lg:pr-4 py-3 rounded-lg lg:rounded-r-xl lg:rounded-l-none text-sm lg:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? "bg-[#f4f6f8] text-[#0c2847]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 right-0 bottom-0 h-[3px] lg:h-auto lg:top-2.5 lg:bottom-2.5 lg:w-[4px] lg:right-auto bg-[#0c2847] lg:rounded-r-full rounded-t-full" />
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={() => {
          localStorage.removeItem("afri_techs_user");
          window.dispatchEvent(new Event("user-updated"));
          window.location.href = "/";
        }}
        className="flex-none text-left px-4 lg:pl-6 lg:pr-4 py-3 rounded-lg lg:rounded-r-xl lg:rounded-l-none text-sm lg:text-base font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-2 lg:mt-4 lg:border-t lg:border-gray-100 lg:pt-4 whitespace-nowrap"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Se déconnecter</span>
      </button>
    </div>
  );
}
