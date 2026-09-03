import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

interface LeadershipTeamProps {
  data?: {
    section_title?: string;
    members?: TeamMember[];
  };
}

export default function LeadershipTeam({ data }: LeadershipTeamProps) {
  const sectionTitle = data?.section_title || "";
  const members = data?.members || [];

  if (members.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      {sectionTitle && (
        <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
            {sectionTitle}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {members.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 mb-3 md:mb-4 bg-gray-100">
              <Image
                src={member.photo || "/no-image.jpg"}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-base md:text-lg font-semibold">{member.name}</h4>
            <span className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">{member.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
