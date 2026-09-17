import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] relative overflow-hidden px-4">
      {/* Cinematic background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#c8a84b]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
        {/* Film grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8 flex flex-col items-center gap-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c8a84b] to-[#e8c96b] flex items-center justify-center shadow-lg shadow-[#c8a84b]/30 group-hover:scale-105 transition-transform duration-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Cine<span className="text-[#c8a84b]">Rise</span>
          </span>
        </Link>
        <p className="text-sm text-white/40 tracking-wide">The Film Industry Platform</p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/60 p-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-6 text-xs text-white/20">
        © {new Date().getFullYear()} CineRise. All rights reserved.
      </p>
    </div>
  );
}
