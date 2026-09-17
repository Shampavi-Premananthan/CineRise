import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SAMPLE_PROJECTS } from "@/data/landing";

/**
 * ActiveProductions
 * "Now Hiring Crew" section — grid of sample project cards.
 */
export default function ActiveProductions() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#C8A84B] mb-1">
            Now Hiring Crew
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Active Productions</h2>
        </div>
        <Link
          href="/register"
          id="productions-view-all"
          className="text-xs font-semibold text-[#E8C96B] hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden group hover:border-[#C8A84B]/40 transition-all cursor-pointer"
          >
            {/* Poster */}
            <div className="relative h-48 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proj.posterUrl}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-black/40" />
              {/* Status badge */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {proj.status}
                </span>
              </div>
              {/* Genre badge */}
              <div className="absolute top-3 right-3 text-xs font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                {proj.genre}
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#E8C96B] transition-colors">
                {proj.title}
              </h3>
              <p className="text-white/50 text-xs line-clamp-2 leading-relaxed mb-4">
                {proj.logline}
              </p>
              {/* Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proj.directorAvatar}
                    alt={proj.directorName}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{proj.directorName}</span>
                </div>
                <div className="text-[#E8C96B] font-medium">{proj.rolesOpen} Roles Open</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
