import React from "react";

interface CSRProps {
  data?: {
    title?: string;
    desc?: string;
  };
}

export default function CSR({ data }: CSRProps) {
  const title = data?.title || "";
  const desc = data?.desc || "";

  if (!title && !desc) return null;

  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 bg-gray-50 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto w-full">
        {title && (
          <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-12 relative z-10">
            <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
              {title}
            </h2>
          </div>
        )}

        {desc && (
          <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed font-semibold max-w-4xl mx-auto text-center">
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}
