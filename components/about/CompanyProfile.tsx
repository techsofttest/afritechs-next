import React from "react";
import Image from "next/image";

interface CompanyProfileProps {
  data?: {
    section_title?: string;
    heading?: string;
    p1?: string;
    p2?: string;
    image?: string;
  };
}

export default function CompanyProfile({ data }: CompanyProfileProps) {
  const sectionTitle = data?.section_title || "Profil de l'Entreprise";
  const heading = data?.heading || "Bienvenue chez Afri-techs";
  const p1 = data?.p1 || "Nous fournissons de nombreux services dans les secteurs automobile et agricole. Nos activités sont concentrées en République de Guinée et aux Émirats Arabes Unis. Nous nous engageons à vous offrir le meilleur de nos services, avec un accent particulier sur la fiabilité, le service client et l'originalité.";
  const p2 = data?.p2 || "Fondée en 2015 par M. Arun, Afri-techs a parcouru un long chemin depuis ses débuts en République de Guinée. Nous servons désormais des clients dans toute la République de Guinée. Nous espérons que vous apprécierez nos produits autant que nous aimons vous les proposer. Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter.";
  const imageSrc = data?.image || "/about/v-r.png";

  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          {sectionTitle}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-center">
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#0c2847]">{heading}</h3>
          <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-medium">
            {p1}
          </p>
          <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-medium">
            {p2}
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
          <Image
            src={imageSrc}
            alt="Afri-techs Office"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
