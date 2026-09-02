import React from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import PageBanner from "@/components/global/PageBanner";
import ServiceCard from "@/components/ui/ServiceCard";
import { fetchServicesList } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const servicesData = await fetchServicesList();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      {/* Global reusable Hero component */}
      <PageBanner
        title={<>Nos Services & <br />Solutions</>}
        subtitle={<>Découvrez nos expertises sectorielles <br />pour la croissance en Afrique.</>}
        imageSrc="/banner/service-page.png"
        imageAlt="Nos Services"
      />

      {/* Services Grid Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        {servicesData && servicesData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.slug || service.id}
                slug={service.slug || service.id}
                title={service.title}
                image={service.image || "/sectors/machinisme_agricole.png"}
                shortDesc={service.subtitle || service.desc}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">Aucun service disponible pour le moment.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
