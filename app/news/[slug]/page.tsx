import React from "react";
import Link from "next/link";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { fetchNewsDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import NewsDetailContent from "@/components/news/NewsDetailContent";
import NewsDetailSidebar from "@/components/news/NewsDetailSidebar";
import NewsCard from "@/components/ui/NewsCard";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Fetch news details strictly from backend API
  const news = await fetchNewsDetail(slug);

  if (!news) {
    notFound();
  }

  const otherNews = news.related || [];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      {/* Hero Header Section */}
      <section className="bg-[#0c2847] text-white pt-[140px] pb-12 md:pb-16 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden">
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
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-white mb-4 transition-colors"
          >
            ← Retour à toutes les actualités
          </Link>
          <div className="mb-4">
            <span className="bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {news.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-3 leading-tight">
            {news.title}
          </h1>
          {news.subtitle && (
            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
              {news.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <NewsDetailContent news={news} />
          <NewsDetailSidebar benefits={news.benefits} />
        </div>

        {/* Similar Articles section at the bottom */}
        {otherNews.length > 0 && (
          <div className="mt-12 md:mt-20 pt-10 md:pt-12 border-t border-gray-100">
            <h3 className="text-xl md:text-2xl font-bold text-[#0c2847] mb-6 md:mb-8 uppercase tracking-wider">
              Articles Recommandés
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
              {otherNews.map((item) => (
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
