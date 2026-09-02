"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchServicesList, ServiceItem } from "@/lib/api";

interface ServicesDropdownProps {
  isOpen: boolean;
  isAtTop: boolean;
}

export default function ServicesDropdown({
  isOpen,
  isAtTop
}: ServicesDropdownProps) {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    if (isOpen && services.length === 0) {
      fetchServicesList().then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        }
      });
    }
  }, [isOpen, services.length]);

  return (
    <div className={`absolute left-0 top-full pt-3 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className={`w-96 border rounded-sm shadow-xl overflow-hidden text-left transition-colors duration-300 ${isAtTop ? "bg-[#0c2847] border-[#333333]" : "bg-white border-gray-200"}`}>
        {services.length > 0 ? (
          services.map((item, idx) => (
            <Link
              key={item.slug || item.id}
              href={`/services/${item.slug || item.id}`}
              className={`flex items-center gap-3 px-4 py-2.5 hover:bg-brand hover:text-[#0c2847] transition-colors ${
                idx < services.length - 1 ? (isAtTop ? "border-b border-[#222222]/50" : "border-b border-gray-100") : ""
              } ${isAtTop ? "text-white" : "text-gray-700"}`}
            >
              {item.image && (
                <div className="relative w-7 h-7 rounded-sm overflow-hidden shrink-0 bg-gray-850">
                  <Image src={item.image} alt={item.title} fill sizes="28px" className="object-cover" />
                </div>
              )}
              <span className="text-[13px] font-medium leading-tight">{item.title}</span>
            </Link>
          ))
        ) : (
          <Link
            href="/services"
            className={`flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider ${isAtTop ? "text-white" : "text-[#0c2847]"}`}
          >
            <span>Voir tous les services</span>
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
