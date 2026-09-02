"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { ProjectItem } from "@/lib/api";

interface SimilarProjectsProps {
  displayedSimilar: ProjectItem[];
  title?: string;
}

export default function SimilarProjects({ displayedSimilar, title = "Projets Similaires" }: SimilarProjectsProps) {
  if (!displayedSimilar || displayedSimilar.length === 0) return null;

  return (
    <div className="mt-24 pt-12 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0c2847] uppercase tracking-wider mb-8 text-center md:text-left">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {displayedSimilar.map((similar) => (
          <div key={similar.slug || similar.id} className="w-full">
            <Card
              variant="overlay"
              tag={similar.tag}
              title={similar.title}
              desc={similar.desc}
              img={similar.img}
              location={similar.location}
              buttonText="Lire plus →"
              href={`/projets/${similar.slug || similar.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
