"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Trophy, ShieldCheck } from "lucide-react";
import { FEATURE_CARDS } from "@/data/landing";

/** Maps feature id → Lucide icon */
const ICONS: Record<string, React.ReactNode> = {
  "feature-crew": <Users className="w-6 h-6 text-[#E8C96B]" />,
  "feature-festivals": <Trophy className="w-6 h-6 text-[#E8C96B]" />,
  "feature-trust": <ShieldCheck className="w-6 h-6 text-[#E8C96B]" />,
};

/**
 * FeatureCards
 * Three core pillars section — Crew Calls, Festivals, Trust Score.
 */
export default function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
          Engineered for High-Stakes Film Production
        </h2>
        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          Three pillar modules designed to eliminate agency markups, unverified credentials, and
          ghosting.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURE_CARDS.map((feat, idx) => (
          <motion.div
            key={feat.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 flex flex-col justify-between group hover:border-[#C8A84B]/40 hover:shadow-[0_10px_30px_-10px_rgba(200,168,75,0.15)] transition-all"
          >
            <div>
              {/* Icon + Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ICONS[feat.id]}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8C96B] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  {feat.badge}
                </span>
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#E8C96B] transition-colors">
                {feat.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{feat.description}</p>
            </div>

            {/* Footer link */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center text-xs font-semibold text-[#E8C96B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
