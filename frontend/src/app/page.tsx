import type { Metadata } from "next";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureCards from "@/components/landing/FeatureCards";
import ActiveProductions from "@/components/landing/ActiveProductions";
import RoleCTA from "@/components/landing/RoleCTA";

export const metadata: Metadata = {
  title: "CineRise — The Film Industry Platform",
  description:
    "Connect with filmmakers, find crew roles, and discover film festivals on CineRise — the next generation film production network.",
};

/**
 * Landing Page  /
 * Composed from individual section components.
 * Data lives in src/data/landing.ts
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-white overflow-hidden pb-24 selection:bg-[#C8A84B]/30 selection:text-[#E8C96B]">
      {/* ── Ambient background ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-gradient-to-b from-[#C8A84B]/12 via-[#C8A84B]/4 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ── Film sprocket decorations (xl screens only) ── */}
      <div className="absolute top-24 left-4 hidden xl:flex flex-col gap-2.5 opacity-20 pointer-events-none select-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="w-4 h-6 rounded-sm border border-[#C8A84B] bg-[#C8A84B]/20" />
        ))}
      </div>
      <div className="absolute top-24 right-4 hidden xl:flex flex-col gap-2.5 opacity-20 pointer-events-none select-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="w-4 h-6 rounded-sm border border-[#C8A84B] bg-[#C8A84B]/20" />
        ))}
      </div>

      {/* ── Sections ── */}
      <LandingNavbar />
      <HeroSection />
      <FeatureCards />
      <ActiveProductions />
      <RoleCTA />
    </div>
  );
}
