import React from "react";
import Image from "next/image";
import { NewsDetailData } from "@/lib/api";

interface NewsDetailContentProps {
  news: NewsDetailData;
}

export default function NewsDetailContent({ news }: NewsDetailContentProps) {
  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-8">
      {/* Main Image Banner */}
      {news.image && (
        <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 font-medium border-b border-gray-100 pb-4">
        <span>Publié le {news.date}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <span>Par <strong className="text-[#0c2847]">{news.author}</strong></span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#0c2847]">Développement de l&apos;Article</h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {news.longDesc}
        </p>
      </div>

      {/* Topics / Features */}
      {news.features && news.features.length > 0 && (
        <div className="flex flex-col gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-[#0c2847] mb-2">Sujets et points clés abordés :</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-brand text-lg">✔</span>
                <span className="text-gray-800 font-medium text-sm md:text-base leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
