import React from "react";
import Link from "next/link";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { fetchServiceDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import ServiceDetailContent from "@/components/services/ServiceDetailContent";
import ServiceDetailSidebar from "@/components/services/ServiceDetailSidebar";
import ServiceRelatedProjects from "@/components/services/ServiceRelatedProjects";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Fetch service details strictly from API
  const service = await fetchServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = service.projects || [];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      {/* Hero Header Section */}
      <section className="bg-[#0c2847] text-white pt-[140px] pb-16 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        {/* Slanted green background shape */}
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

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white mb-6 transition-colors"
          >
            ← Retour à tous les services
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-3 leading-tight">
            {service.title}
          </h1>
          {service.subtitle && (
            <p className="text-gray-300 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
              {service.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <ServiceDetailContent service={service} />
          <ServiceDetailSidebar benefits={service.benefits} />
        </div>

        {/* Similar flat grid design layout for related projects */}
        {relatedProjects.length > 0 && (
          <ServiceRelatedProjects relatedProjects={relatedProjects} />
        )}
      </main>

      <Footer />
    </div>
  );
}
