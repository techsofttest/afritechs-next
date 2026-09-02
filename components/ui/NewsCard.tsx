import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  slug: string;
  title: string;
  image: string;
  shortDesc: string;
  date: string;
  author: string;
  category: string;
  borderless?: boolean;
}

export default function NewsCard({
  slug,
  title,
  image,
  shortDesc,
  date,
  author,
  category,
  borderless = false
}: NewsCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className={`flex flex-col text-left bg-transparent w-full group relative overflow-hidden transition-all duration-300 cursor-pointer ${borderless ? "" : "border border-gray-100 rounded-2xl p-4 hover:border-gray-200"
        }`}
    >
      {/* Image with zoom on hover */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#0c2847] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
          {category}
        </span>
      </div>

      {/* Text content */}
      <div className="pt-4 flex flex-col flex-1 items-start w-full">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-[10px] md:text-xs text-gray-500 mb-2 font-medium">
          <span>{date}</span>
          <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-300 shrink-0 hidden md:inline" />
          <span className="line-clamp-1 hidden md:inline">Par {author}</span>
        </div>

        <h4 className="text-[15px] md:text-[20px] font-bold mb-1.5 md:mb-2 leading-snug line-clamp-2 font-sans text-[#0c2847]">
          {title}
        </h4>
        <p className="text-[12px] md:text-[14px] text-gray-600 mb-3 md:mb-4 line-clamp-2 min-h-[32px] md:min-h-[40px]">
          {shortDesc}
        </p>

        {/* Read More link */}
        <div className="mt-auto">
          <span className="inline-flex items-center text-[#0c2847] gap-1.5 text-[12px] md:text-[14px] font-semibold transition-colors underline-offset-2 group-hover:underline">
            Lire l&apos;article
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// Alias for backwards compatibility
export const BlogCard = NewsCard;
