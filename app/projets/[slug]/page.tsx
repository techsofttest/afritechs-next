import React from "react";
import Link from "next/link";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { fetchProjectDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";
import ProjectDetailSidebar from "@/components/projects/ProjectDetailSidebar";
import ProjectGallery from "@/components/projects/ProjectGallery";
import SimilarProjects from "@/components/projects/SimilarProjects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Fetch project details strictly from API
  const project = await fetchProjectDetail(slug);

  if (!project) {
    notFound();
  }

  const similarProjects = project.related || [];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      {/* Hero Banner Section */}
      <section className="bg-[#0c2847] text-white pt-[140px] pb-16 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div
          className="absolute bg-gradient-to-br from-brand/20 to-transparent opacity-30 pointer-events-none z-0"
          style={{
            top: "-10%",
            right: "10%",
            width: "450px",
            height: "450px",
            clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start">
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white mb-4 transition-colors"
          >
            ← Retour à toutes les réalisations
          </Link>
          {project.tag && (
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-brand text-[#0c2847] px-3 py-1 rounded-[2px] inline-block">
                {project.tag}
              </span>
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-3 leading-tight">
            {project.title}
          </h1>
          {project.location && (
            <p className="text-gray-300 text-base md:text-lg font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-2/3 flex flex-col gap-10">
            <ProjectDetailContent project={project} />
            <ProjectGallery title={project.title} gallery={project.galleryImages} />
          </div>
          <ProjectDetailSidebar />
        </div>

        {similarProjects.length > 0 && (
          <SimilarProjects displayedSimilar={similarProjects} />
        )}
      </main>

      <Footer />
    </div>
  );
}
