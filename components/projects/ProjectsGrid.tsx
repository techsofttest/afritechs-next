"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { ProjectItem } from "@/lib/api";

interface ProjectsGridProps {
  projects: ProjectItem[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 font-medium">Aucun projet disponible.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {projects.map((project) => (
        <div key={project.slug || project.id} className="w-full">
          <Card
            variant="overlay"
            tag={project.tag}
            title={project.title}
            desc={project.desc}
            img={project.img}
            location={project.location}
            buttonText="Lire plus →"
            href={`/projets/${project.slug || project.id}`}
          />
        </div>
      ))}
    </div>
  );
}
