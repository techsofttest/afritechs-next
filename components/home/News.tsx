import React from "react";
import Button from "../ui/Button";
import NewsCard from "@/components/ui/NewsCard";
import Link from "next/link";

export interface NewsItem {
  id?: string;
  slug: string;
  title: string;
  shortDesc: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface NewsProps {
  news?: NewsItem[];
}

export default function News({ news = [] }: NewsProps) {
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-16 lg:px-24 bg-white">
      <div className="max-w-[1440px] mx-auto text-center">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 mb-8 md:mb-16 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Actualités et Développements
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-left">
          {news.map((item) => (
            <NewsCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              image={item.image}
              shortDesc={item.shortDesc}
              date={item.date}
              author={item.author}
              category={item.category}
              borderless={true}
            />
          ))}
        </div>

        {/* View More */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <Link href="/news">
            <Button variant="primary" size="md" className="px-8 md:px-10">
              Voir toutes les actualités
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
