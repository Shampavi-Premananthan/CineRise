import Link from "next/link";

/**
 * LandingNavbar
 * Top navigation bar for the public landing page.
 */
export default function LandingNavbar() {
  return (
    <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8A84B] to-[#E8C96B] flex items-center justify-center shadow-lg shadow-[#C8A84B]/30">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0A0A0F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Cine<span className="text-[#C8A84B]">Rise</span>
        </span>
      </div>

      {/* Auth Links */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          id="nav-signin"
          className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          id="nav-get-started"
          className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#C8A84B] to-[#E8C96B] text-[#0A0A0F] hover:brightness-110 transition-all shadow-lg shadow-[#C8A84B]/25"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
