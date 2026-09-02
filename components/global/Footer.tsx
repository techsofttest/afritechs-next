"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchServicesList, fetchProjectsList, fetchCategories, ServiceItem, ProjectItem, CategoryItem } from "@/lib/api";

export default function Footer() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let isCancelled = false;

    Promise.all([
      fetchServicesList(),
      fetchProjectsList(),
      fetchCategories()
    ]).then(([servicesData, projectsData, categoriesData]) => {
      if (isCancelled) return;
      if (servicesData) setServices(servicesData);
      if (projectsData) setProjects(projectsData);
      if (categoriesData) setCategories(categoriesData);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <footer translate="no" className="w-full bg-[#0c2847] text-white pt-20 pb-16 px-6 md:px-16 lg:px-24 relative overflow-hidden notranslate">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 sm:gap-x-8 gap-y-12 relative z-10">
        {/* Company Info */}
        <div className="flex flex-col items-start gap-6 col-span-2 md:col-span-1 lg:col-span-1">
          <Image
            src="/logo/logo-white2.png"
            alt="AFRI TECHS Logo"
            width={320}
            height={120}
            className="object-contain h-[110px] w-auto"
          />
          <p className="text-[13px] text-gray-100 leading-relaxed max-w-sm">
            AFRI TECHS SARLU propose des solutions durables et innovantes pour propulser l'Afrique dans l'agriculture, l'énergie verte et l'industrie.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.linkedin.com/company/afri-techs-sarlu" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-[#0c2847] transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/afritechs" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-[#0c2847] transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Dynamic Services */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-brand">Services</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-100">
            {services.map((item) => (
              <li key={item.slug || item.id} className="transform hover:translate-x-1.5 transition-transform duration-300">
                <Link href={`/services/${item.slug || item.id}`} className="hover:text-brand transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Projects */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-brand">Projects</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-100">
            {projects.map((item) => (
              <li key={item.slug || item.id} className="transform hover:translate-x-1.5 transition-transform duration-300">
                <Link href={`/projets/${item.slug || item.id}`} className="hover:text-brand transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Categories */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-brand">Categories</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-100">
            {categories.map((item) => (
              <li key={item.slug || item.id} className="transform hover:translate-x-1.5 transition-transform duration-300">
                <Link href={`/products?category=${encodeURIComponent(item.slug || item.id)}`} className="hover:text-brand transition-colors">
                  {item.name || item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-brand">Navigation</h3>
          <ul className="flex flex-col gap-3 text-[13px] text-gray-100">
            <li className="transform hover:translate-x-1.5 transition-transform duration-300">
              <Link href="/about" className="hover:text-brand transition-colors">À Propos de Nous</Link>
            </li>
            <li className="transform hover:translate-x-1.5 transition-transform duration-300">
              <Link href="/services" className="hover:text-brand transition-colors">Nos Services</Link>
            </li>
            <li className="transform hover:translate-x-1.5 transition-transform duration-300">
              <Link href="/projets" className="hover:text-brand transition-colors">Nos Projets</Link>
            </li>
            <li className="transform hover:translate-x-1.5 transition-transform duration-300">
              <Link href="/news" className="hover:text-brand transition-colors">Actualités</Link>
            </li>
            <li className="transform hover:translate-x-1.5 transition-transform duration-300">
              <Link href="/contact" className="hover:text-brand transition-colors">Contactez-nous</Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="flex flex-col gap-4 col-span-2 md:col-span-1 lg:col-span-1">
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-brand">Contact</h3>
          <ul className="flex flex-col gap-4 text-[13px] text-gray-100">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Flat No: 101, Sangare Apartments C. Ratoma, Conakry, Republic Of Guinea</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+224660252121" className="hover:text-brand transition-colors">+224 660 252 121</a>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:arunnath@afri-techs.com" className="hover:text-brand transition-colors">arunnath@afri-techs.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Absolutely Positioned Gradient Brand Name */}
      <div className="absolute inset-x-0 bottom-[10%] flex justify-center z-0 pointer-events-none">
        <h2 className="text-[12vw] lg:text-[16rem] font-black uppercase bg-gradient-to-b from-brand/16 via-brand/8 to-transparent bg-clip-text text-transparent select-none whitespace-nowrap">
          AFRI TECHS
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} AFRI TECHS SARLU. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-brand transition-colors">Mentions Légales</Link>
          <Link href="/confidentialite" className="hover:text-brand transition-colors">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}

