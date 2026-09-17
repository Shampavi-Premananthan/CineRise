"use client";

import { useState } from "react";
import Link from "next/link";
import { Film, ArrowRight } from "lucide-react";
import { ROLES, RoleId } from "@/data/landing";

/**
 * RoleCTA
 * Bottom call-to-action section with role selector and final register button.
 */
export default function RoleCTA() {
  const [selectedRole, setSelectedRole] = useState<RoleId>("filmmaker");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-[#C8A84B]/30 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl p-8 sm:p-14 relative overflow-hidden shadow-[0_0_40px_rgba(200,168,75,0.12)]">
        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your Stature in the CineRise Ecosystem
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
            Whether you are an independent director seeking a world-class DP, a steadicam
            technician booking union productions, or a festival managing global screeners —
            CineRise elevates your work.
          </p>

          {/* Role Toggle Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {ROLES.map((role) => (
              <button
                key={role.id}
                id={`cta-role-${role.id}`}
                onClick={() => setSelectedRole(role.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedRole === role.id
                    ? "bg-gradient-to-r from-[#F3DE9A] to-[#C8A84B] text-[#0A0A0F] shadow-[0_0_20px_rgba(200,168,75,0.3)]"
                    : "bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border border-white/[0.1]"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Final CTA */}
          <Link
            href="/register"
            id="cta-final-register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#0A0A0F] bg-gradient-to-r from-[#F3DE9A] to-[#C8A84B] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(200,168,75,0.25)]"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Decorative Film Icon */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
          <Film className="w-80 h-80 text-[#C8A84B]" />
        </div>
      </div>
    </section>
  );
}
