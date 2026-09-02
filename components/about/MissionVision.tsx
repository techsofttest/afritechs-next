import React from "react";

export default function MissionVision() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Mission & Vision
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Mission */}
        <div className="bg-[#0c2847] text-white p-6 md:p-12 rounded-2xl border border-[#0c2847] flex flex-col justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-300 mb-3 inline-block">
              Notre Mission
            </span>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Quality & Cost Effective Service</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              Our mission is to provide Quality & Cost Effective End-to-End Service, thereby achieving our target of Customer Satisfaction to a greater extent.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-gray-50 border border-gray-200 p-6 md:p-12 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#0c2847] mb-3 inline-block">
              Notre Vision
            </span>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#0c2847]">Globally Recognized Brand</h3>
            <p className="text-gray-800 text-sm md:text-base leading-relaxed font-semibold">
              To achieve year-on-year growth by being a globally recognized brand and the partner of choice for providing complete Agricultural and Automotive solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
