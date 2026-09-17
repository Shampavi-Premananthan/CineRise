"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clapperboard, Sparkles } from "lucide-react";
import { METRICS } from "@/data/landing";

/**
 * HeroSection
 * Main hero — headline, subtext, CTA buttons, and metrics bar.
 */
export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 text-center relative">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A84B]/35 bg-[#C8A84B]/10 text-[#E8C96B] text-xs font-mono tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(200,168,75,0.15)]"
      >
        <Sparkles className="w-3.5 h-3.5 animate-spin text-[#C8A84B]" />
        <span>The Next Generation Film Production Network</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6"
      >
        The{" "}
        <span className="text-gold-gradient">Film Industry Platform</span>{" "}
        Built for Visionaries
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
      >
        Connecting visionary{" "}
        <strong className="text-white font-medium">Filmmakers</strong>, verified{" "}
        <strong className="text-white font-medium">Crew Members</strong>, and premier{" "}
        <strong className="text-white font-medium">Studios &amp; Festivals</strong>. Cast
        production roles, protect screenplay IP, and submit to world festivals with cinematic
        distinction.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <Link
          href="/register"
          id="hero-get-started"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-[#0A0A0F] bg-gradient-to-r from-[#F3DE9A] via-[#E8C96B] to-[#C8A84B] hover:brightness-110 shadow-[0_0_25px_rgba(200,168,75,0.3)] transition-all flex items-center justify-center gap-2"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/register"
          id="hero-browse-projects"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-[#C8A84B]/50 hover:text-[#E8C96B] transition-all flex items-center justify-center gap-2"
        >
          <Clapperboard className="w-4 h-4 text-[#E8C96B]" />
          <span>Browse Projects &amp; Gigs</span>
        </Link>
      </motion.div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left mb-24">
        {METRICS.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all hover:border-[#C8A84B]/30"
          >
            <div
              className={`text-3xl font-extrabold mb-1 ${
                item.highlight ? "text-gold-gradient" : "text-white"
              }`}
            >
              {item.metric}
            </div>
            <div className="text-xs uppercase tracking-wider font-mono text-white/40">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
