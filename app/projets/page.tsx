"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import PageBanner from "@/components/global/PageBanner";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectPagination from "@/components/projects/ProjectPagination";
import { fetchProjectsList, ProjectItem } from "@/lib/api";

export default function ProjectsListingPage() {
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 8;

  useEffect(() => {
    fetchProjectsList().then((data) => {
      setAllProjects(data || []);
      const uniqueTags = Array.from(new Set((data || []).map((p) => p.tag).filter(Boolean)));
      setCategories(uniqueTags);
      setLoading(false);
    });
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter((p) => p.tag === activeCategory);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      {/* Global reusable Hero component */}
      <PageBanner
        title={<>Nos Réalisations <br />& Projets</>}
        subtitle={<>Découvrez nos solutions concrètes pour <br />l&apos;essor économique.</>}
        imageSrc="/banner/project-page.png"
        imageAlt="Nos Réalisations"
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-16 pt-8">
        {categories.length > 0 && (
          <ProjectFilters
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        )}

        {loading ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 font-medium">Chargement des projets...</p>
          </div>
        ) : (
          <ProjectsGrid projects={currentProjects} />
        )}

        {totalPages > 1 && (
          <ProjectPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
