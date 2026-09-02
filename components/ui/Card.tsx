"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface CardProps {
  tag: string;
  title: string;
  desc: string;
  img: string;
  href?: string;
  price?: string;
  location?: string;
  variant?: "standard" | "overlay";
  buttonText?: string;
  onButtonClick?: () => void;
  onCardClick?: () => void;
  priority?: boolean;
  className?: string;
}

export default function Card({
  tag,
  title,
  desc,
  img,
  href,
  price,
  location,
  variant = "standard",
  buttonText = "Make an Enquiry",
  onButtonClick,
  onCardClick,
  priority = false,
  className = ""
}: CardProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (onCardClick) {
      onCardClick();
    } else if (href) {
      router.push(href);
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    } else if (href) {
      router.push(href);
    }
  };

  if (variant === "overlay") {
    return (
      <div
        onClick={handleCardClick}
        className={`relative aspect-[3/4] h-auto w-full border border-gray-300 rounded-lg overflow-hidden group cursor-pointer flex flex-col justify-end text-white ${className}`}
      >
        {/* Image Background with Zoom */}
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 z-0"
          priority={priority}
        />

        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

        {/* Tag Overlay */}
        <span translate="no" className="absolute top-3 left-3 bg-[#F0F4E3] text-[#0c2847] text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] font-bold z-20 notranslate">
          {tag}
        </span>

        {/* Text Details Overlay with Lift Transition */}
        <div className="p-4 md:p-6 relative z-20 transition-transform duration-300 ease-out transform translate-y-12 group-hover:translate-y-0">
          {location && (
            <span className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
          )}
          <h3 className="text-[17px] md:text-lg font-semibold text-white mb-2 leading-snug font-sans">
            {title}
          </h3>

          {/* Secondary button that fades in as the content lifts */}
          <div className="mt-3 md:mt-4 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <Button
              variant="white"
              size="sm"
              className="w-auto px-4 py-2 text-[13px] md:px-5 md:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAction();
              }}
            >
              {buttonText === "Make an Enquiry" ? "Lire plus →" : buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Standard variant
  return (
    <div
      onClick={handleCardClick}
      className={`flex flex-col text-left bg-transparent w-full group relative overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
    >
      {/* Image Container that shrinks on hover */}
      <div className="relative h-[210px] group-hover:h-[170px] w-full rounded-lg overflow-hidden bg-gray-100 shrink-0 transition-all duration-300">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-350"
          priority={priority}
        />
        {/* Tag Overlay */}
        <span translate="no" className="absolute top-3 left-3 bg-[#F0F4E3] text-[#0c2847] text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] font-bold z-10 notranslate">
          {tag}
        </span>
      </div>

      {/* Details Container */}
      <div className="pt-3 flex flex-col flex-1 w-full min-h-0">
        <div className="flex flex-col w-full">
          <h4 className="text-[16px] md:text-[17px] font-semibold mb-1 leading-snug line-clamp-1 font-sans text-[#0c2847]">{title}</h4>
          <p className="text-[12px] md:text-[13px] text-[#5a5a5a] mb-1 line-clamp-2 leading-relaxed">{desc}</p>
        </div>

        <div className="w-full flex flex-col mt-1.5">
          {price &&
            <div className="text-[18px] md:text-[20px] font-bold text-[#0c2847] mb-1">
              {price.includes("/") ? (
                <>
                  {price.split("/")[0].trim()}{" "}
                  <span className="text-[12px] text-gray-500 font-normal">/ {price.split("/").slice(1).join("/").trim()}</span>
                </>
              ) : (
                price
              )}
            </div>
          }

          {/* Button slides/fades in */}
          <div className="w-full h-0 opacity-0 group-hover:h-9 group-hover:opacity-100 transition-all duration-300 overflow-hidden mt-1">
            <Button
              variant="primary"
              size="sm"
              className="w-full py-2 text-[12px] font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                handleAction();
              }}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
