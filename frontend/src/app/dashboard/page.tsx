"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ROLE_COLORS: Record<string, string> = {
  FILMMAKER: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  CREW: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  ORGANIZATION: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const ROLE_LABELS: Record<string, string> = {
  FILMMAKER: "Filmmaker",
  CREW: "Crew",
  ORGANIZATION: "Organization",
};

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-10 h-10 border-2 border-[#c8a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const roleColor = ROLE_COLORS[user.role] ?? "bg-white/10 text-white/60 border-white/20";
  const roleLabel = ROLE_LABELS[user.role] ?? user.role;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#c8a84b]/8 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/8 blur-[140px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8a84b] to-[#e8c96b] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <span className="font-bold tracking-tight">
              Cine<span className="text-[#c8a84b]">Rise</span>
            </span>
          </div>
          <button
            id="dashboard-logout"
            onClick={logout}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 mb-8">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8a84b] to-[#e8c96b] flex items-center justify-center text-[#0a0a0f] text-2xl font-bold shadow-lg shadow-[#c8a84b]/20 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {user.name.split(" ")[0]}!
                </h1>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${roleColor}`}>
                  {roleLabel}
                </span>
              </div>
              <p className="text-white/50 text-sm truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Account Status",
              value: user.status,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
              accent: "text-emerald-400",
            },
            {
              label: "Role",
              value: roleLabel,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              ),
              accent: "text-[#c8a84b]",
            },
            {
              label: "Member since",
              value: new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              ),
              accent: "text-blue-400",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 flex items-start gap-4"
            >
              <span className={`mt-0.5 ${card.accent}`}>{card.icon}</span>
              <div>
                <p className="text-xs text-white/40 mb-0.5">{card.label}</p>
                <p className="text-sm font-semibold text-white">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder notice */}
        <div className="mt-8 rounded-xl border border-[#c8a84b]/20 bg-[#c8a84b]/5 px-5 py-4 flex items-start gap-3">
          <svg className="shrink-0 text-[#c8a84b] mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-[#c8a84b]/80">
            <span className="font-semibold text-[#c8a84b]">M2 complete.</span> Auth flow is working — JWT stored, session restored, protected route active. Dashboard content coming in M3.
          </p>
        </div>
      </main>
    </div>
  );
}
