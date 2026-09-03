import React from "react";
import PageBanner from "@/components/global/PageBanner";

interface AboutHeroProps {
  data?: {
    title?: string;
    subtitle?: string;
    image?: string;
  };
}

export default function AboutHero({ data }: AboutHeroProps) {
  const title = data?.title ? (
    <span className="whitespace-pre-line">{data.title}</span>
  ) : (
    <>À Propos de Nous <br /> About Afri-techs</>
  );

  const subtitle = data?.subtitle ? (
    <span className="whitespace-pre-line">{data.subtitle}</span>
  ) : (
    <>Découvrez nos valeurs, notre équipe dirigeante <br /> et nos engagements.</>
  );

  const imageSrc = data?.image || "/banner/about-page.png";

  return (
    <PageBanner
      title={title}
      subtitle={subtitle}
      imageSrc={imageSrc}
      imageAlt="Corporate Afri Techs"
    />
  );
}
