import React from "react";
import Image from "next/image";

export default function CompanyProfile() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 w-full border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
          Profil de l&apos;Entreprise
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-center">
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#0c2847]">Bienvenue chez Afri-techs</h3>
          <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-medium">
            Nous fournissons de nombreux services dans les secteurs automobile et agricole. Nos activités sont concentrées en République de Guinée et aux Émirats Arabes Unis. Nous nous engageons à vous offrir le meilleur de nos services, avec un accent particulier sur la fiabilité, le service client et l&apos;originalité.
          </p>
          <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-4 leading-relaxed font-medium">
            Fondée en 2015 par M. Arun, Afri-techs a parcouru un long chemin depuis ses débuts en République de Guinée. Nous servons désormais des clients dans toute la République de Guinée. Nous espérons que vous apprécierez nos produits autant que nous aimons vous les proposer. Si vous avez des questions ou des commentaires, n&apos;hésitez pas à nous contacter.
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
          <Image
            src="/about/v-r.png"
            alt="Afri-techs Office"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
