import React from "react";
import Image from "next/image";
import { ServiceDetailData } from "@/lib/api";

interface ServiceDetailContentProps {
  service: ServiceDetailData;
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-8">
      {/* Main Image Banner */}
      {service.image && (
        <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Description */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#0c2847]">Présentation du Service</h2>
        {service.rawDescription ? (
          <div
            className="text-gray-700 text-base md:text-lg leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: service.rawDescription }}
          />
        ) : (
          <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
            {service.desc}
          </p>
        )}
      </div>

      {/* Features/Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <div className="flex flex-col gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-[#0c2847] mb-2">Nos engagements et garanties :</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-brand text-lg">✔</span>
                <span className="text-gray-800 font-medium text-sm md:text-base leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
