import React from "react";
import Image from "next/image";
import { ProjectDetailData } from "@/lib/api";

interface ProjectDetailContentProps {
  project: ProjectDetailData;
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Primary Project Image Banner */}
      {project.img && (
        <div className="relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Project Description */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#0c2847]">Présentation du Projet</h2>
        {project.rawDescription ? (
          <div
            className="text-gray-700 text-base leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: project.rawDescription }}
          />
        ) : (
          <p className="text-gray-700 text-base leading-relaxed">{project.desc}</p>
        )}
      </div>
    </div>
  );
}
