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
    ""
  );

  const subtitle = data?.subtitle ? (
    <span className="whitespace-pre-line">{data.subtitle}</span>
  ) : (
    ""
  );

  const imageSrc = data?.image || "/no-image.jpg";

  return (
    <PageBanner
      title={title}
      subtitle={subtitle}
      imageSrc={imageSrc}
      imageAlt="Corporate Afri Techs"
    />
  );
}
