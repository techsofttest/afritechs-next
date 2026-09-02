import React from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import InnerPageHero from "@/components/global/InnerPageHero";
import NewsCard from "@/components/ui/NewsCard";
import { fetchNewsList } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const newsList = await fetchNewsList();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      {/* Global reusable Hero component */}
      <InnerPageHero
        title="Actualités & Articles"
        subtitle="Suivez nos analyses, conseils et actualités sur la transformation technologique, énergétique et agricole en Afrique de l'Ouest."
      />

      {/* News Grid Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        {newsList && newsList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {newsList.map((item) => (
              <NewsCard
                key={item.slug || item.id}
                slug={item.slug || item.id}
                title={item.title}
                image={item.image}
                shortDesc={item.shortDesc}
                date={item.date}
                author={item.author}
                category={item.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">Aucune actualité disponible pour le moment.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
