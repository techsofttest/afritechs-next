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

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#0c2847]">
      <Header forceSolidBg />

      {/* Hero Section */}
      <AboutHero />

      {/* 1. Company Profile */}
      <CompanyProfile />

      {/* 2 & 3. Mission & Vision */}
      <MissionVision />

      {/* 4. Core Values */}
      <CoreValues />

      {/* 5. Chairman's Message */}
      <ChairmanMessage />

      {/* 6. Leadership Team */}
      <LeadershipTeam />

      {/* 7. Corporate Governance */}
      <CorporateGovernance />

      {/* 8 & 9. Quality Policy & HSE Policy */}
      <QualitySecurity />

      {/* 10. CSR (Corporate Social Responsibility) */}
      <CSR />

      <CTA />

      <Footer />
    </div>
  );
}

