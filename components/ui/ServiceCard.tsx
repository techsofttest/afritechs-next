import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  slug: string;
  title: string;
  image: string;
  shortDesc: string;
}

export default function ServiceCard({
  slug,
  title,
  image,
  shortDesc
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="flex flex-col text-left bg-transparent w-full group relative overflow-hidden transition-all duration-300 cursor-pointer"
    >
      {/* Image with zoom on hover */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover pointer-events-none"
        />
      </div>

      {/* Text content */}
      <div className="pt-3 flex flex-col flex-1 items-start w-full">
        <h4 className="text-[20px] font-bold mb-1 leading-snug line-clamp-2 font-sans text-[#0c2847] group-hover:text-brand transition-colors">
          {title}
        </h4>
        <p className="text-[15px] text-[#3a3a3a] mb-2 line-clamp-2 min-h-[46px]">
          {shortDesc}
        </p>

        {/* Always-visible tertiary "En savoir plus" button */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0c2847] group-hover:text-brand transition-colors underline-offset-2 group-hover:underline">
            En savoir plus
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
