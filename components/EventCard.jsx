"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function EventCard({ event, index }) {
  const difficultyColors = {
    Beginner: "from-green-500 to-emerald-500",
    Intermediate: "from-yellow-500 to-orange-500",
    Advanced: "from-red-500 to-rose-500",
    "All Levels": "from-blue-500 to-cyan-500",
  };

  const themeContent = {
    "unga-disec": { icon: "🕊️", bg: "from-blue-600/40 to-cyan-900/60" },
    "unga-legal": { icon: "⚖️", bg: "from-indigo-600/40 to-purple-900/60" },
    "lok-sabha": { icon: "🇮🇳", bg: "from-orange-600/40 to-green-900/60" },
    "cabinet-mission-1946": { icon: "📜", bg: "from-stone-600/40 to-yellow-900/60" },
    "mahabharat": { icon: "🏹", bg: "from-amber-700/40 to-red-900/60" },
    "ipl-auction": { icon: "🏏", bg: "from-yellow-500/40 to-blue-900/60" },
    "press": { icon: "📸", bg: "from-zinc-500/40 to-zinc-900/60" },
  };

  const currentTheme = themeContent[event.id] || { icon: "🌍", bg: "from-violet-900/50 to-blue-900/50" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative h-full bg-gray-900/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-500">
        {/* Image */}
        <div className={`relative h-48 bg-gradient-to-br ${currentTheme.bg} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 transition-transform duration-700">
            {currentTheme.icon}
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-gray-300 uppercase tracking-wider">
              {event.category === "mun" ? "MUN" : event.category}
            </span>
          </div>
          {/* Difficulty badge */}
          <div className="absolute top-3 right-3 z-20">
            <span className={`px-3 py-1 bg-gradient-to-r ${difficultyColors[event.difficulty]} rounded-full text-xs font-bold text-white`}>
              {event.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
            {event.name}
          </h3>
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {event.shortName}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>

          {event.agenda && (
            <div className="bg-violet-500/5 border border-violet-500/10 rounded-lg p-3 mb-4">
              <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">Agenda</p>
              <p className="text-gray-300 text-xs leading-relaxed">{event.agenda}</p>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {event.capacity} seats
            </span>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-center justify-between">
            <div>
              {event.fee > 0 ? (
                <span className="text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  {formatCurrency(event.fee)}
                </span>
              ) : (
                <span className="text-2xl font-black text-emerald-400">Free</span>
              )}
            </div>
            <Link
              href={`/register?event=${event.id}`}
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg text-sm font-semibold text-white hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
