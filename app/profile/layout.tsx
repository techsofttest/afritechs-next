"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; phone?: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkAndLoadUser = () => {
    const storedUser = localStorage.getItem("afri_techs_user");
    if (!storedUser) {
      router.replace("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || !parsedUser.email) {
        router.replace("/login");
        return;
      }
      setUser(parsedUser);
      setIsLoaded(true);
    } catch (e) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    checkAndLoadUser();

    const handleUserUpdated = () => checkAndLoadUser();
    window.addEventListener("user-updated", handleUserUpdated);
    return () => window.removeEventListener("user-updated", handleUserUpdated);
  }, [router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans text-[#0c2847]">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header forceSolidBg />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-[110px] pb-16">
        {/* Banner Welcome Message */}
        <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0c2847] leading-tight">
              Bonjour, <span translate="no" className="notranslate">{user ? `${user.firstName} ${user.lastName}`.trim() : "Client Afri Techs"}</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Dynamic Profile Sub-Page Content */}
          <div className="w-full lg:flex-1">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
