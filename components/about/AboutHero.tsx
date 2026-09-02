import React from "react";
import PageBanner from "@/components/global/PageBanner";

export default function AboutHero() {
  return (
    <PageBanner
      title={<>À Propos de Nous <br /> About Afri-techs</>}
      subtitle={<>Découvrez nos valeurs, notre équipe dirigeante <br /> et nos engagements.</>}
      imageSrc="/banner/about-page.png"
      imageAlt="Corporate Afri Techs"
    />
  );
}
