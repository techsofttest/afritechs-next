import React from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import CTA from "@/components/home/CTA";
import AboutHero from "@/components/about/AboutHero";
import CompanyProfile from "@/components/about/CompanyProfile";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import ChairmanMessage from "@/components/about/ChairmanMessage";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import CorporateGovernance from "@/components/about/CorporateGovernance";
import QualitySecurity from "@/components/about/QualitySecurity";
import CSR from "@/components/about/CSR";
import { fetchPageContent } from "@/lib/api";

export const revalidate = 0;

export default async function AboutUsPage() {
  const pageData = await fetchPageContent("about");
  const content = pageData?.content || {};

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#0c2847]">
      <Header forceSolidBg />

      {/* Hero Section */}
      <AboutHero data={content.hero} />

      {/* 1. Company Profile */}
      <CompanyProfile data={content.profile} />

      {/* 2 & 3. Mission & Vision */}
      <MissionVision data={content.mission_vision} />

      {/* 4. Core Values */}
      <CoreValues data={content.values} />

      {/* 5. Chairman's Message */}
      <ChairmanMessage data={content.chairman} />

      {/* 6. Leadership Team */}
      <LeadershipTeam data={content.team} />

      {/* 7. Corporate Governance */}
      <CorporateGovernance data={content.governance} />

      {/* 8 & 9. Quality Policy & HSE Policy */}
      <QualitySecurity data={content.quality_security} />

      {/* 10. CSR (Corporate Social Responsibility) */}
      <CSR data={content.csr} />

      <CTA />

      <Footer />
    </div>
  );
}
