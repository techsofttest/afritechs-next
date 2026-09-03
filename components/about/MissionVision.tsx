import React from "react";

interface MissionVisionProps {
  data?: {
    section_title?: string;
    mission_tag?: string;
    mission_title?: string;
    mission_desc?: string;
    vision_tag?: string;
    vision_title?: string;
    vision_desc?: string;
  };
}

export default function MissionVision({ data }: MissionVisionProps) {
  const sectionTitle = data?.section_title || "";
  const missionTag = data?.mission_tag || "";
  const missionTitle = data?.mission_title || "";
  const missionDesc = data?.mission_desc || "";
  const visionTag = data?.vision_tag || "";
  const visionTitle = data?.vision_title || "";
  const visionDesc = data?.vision_desc || "";

  if (!data || (!sectionTitle && !missionTitle && !visionTitle && !missionDesc && !visionDesc)) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      {sectionTitle && (
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            {sectionTitle}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Mission */}
        {(missionTitle || missionDesc) && (
          <div className="bg-[#0c2847] text-white p-6 md:p-12 rounded-2xl border border-[#0c2847] flex flex-col justify-between">
            <div>
              {missionTag && (
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-300 mb-3 inline-block">
                  {missionTag}
                </span>
              )}
              {missionTitle && <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{missionTitle}</h3>}
              {missionDesc && (
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                  {missionDesc}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Vision */}
        {(visionTitle || visionDesc) && (
          <div className="bg-gray-50 border border-gray-200 p-6 md:p-12 rounded-2xl flex flex-col justify-between">
            <div>
              {visionTag && (
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#0c2847] mb-3 inline-block">
                  {visionTag}
                </span>
              )}
              {visionTitle && <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#0c2847]">{visionTitle}</h3>}
              {visionDesc && (
                <p className="text-gray-800 text-sm md:text-base leading-relaxed font-semibold">
                  {visionDesc}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
