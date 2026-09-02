import React from "react";

interface BreadcrumbProps {
  items?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export default function Breadcrumb({ items, children }: BreadcrumbProps) {
  return (
    <div className="w-full bg-[#f8f9fa] border-b border-gray-200 lg:static sticky top-[64px] lg:top-[97px] z-30">
      <div className="w-full max-w-[1440px] mx-auto flex justify-between items-center py-3.5 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2 text-[14px] text-[#0c2847] font-semibold">
          <a href="/" className="hover:text-black transition-colors">Accueil</a>
          {items ? (
            items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#0c2847] font-bold">/</span>
                {item.href ? (
                  <a href={item.href} className="hover:text-black transition-colors">{item.label}</a>
                ) : (
                  <span className="text-[#0c2847] font-bold">{item.label}</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <>
              <span className="text-[#0c2847] font-bold">/</span>
              <span className="text-[#0c2847] font-bold">Nos Produits</span>
            </>
          )}
        </div>
        {/* Slot for additional elements like the mobile filter button */}
        {children}
      </div>
    </div>
  );
}
