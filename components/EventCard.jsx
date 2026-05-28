"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function EventCard({ event, index }) {
  const [modalOpen, setModalOpen] = useState(false);

  const difficultyColors = {
    Beginner: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
    Intermediate: "bg-amber-950/40 text-amber-400 border border-amber-500/20",
    Advanced: "bg-rose-950/40 text-rose-400 border border-rose-500/20",
    "All Levels": "bg-blue-950/40 text-blue-400 border border-blue-500/20",
  };

  const themeContent = {
    "unga-disec": { icon: "🕊️", bg: "from-blue-500/10 to-cyan-500/5" },
    "unga-legal": { icon: "⚖️", bg: "from-indigo-500/10 to-purple-500/5" },
    "lok-sabha": { icon: "🇮🇳", bg: "from-orange-500/10 to-green-500/5" },
    "cabinet-mission-1946": { icon: "📜", bg: "from-amber-600/10 to-stone-500/5" },
    "mahabharat": { icon: "🏹", bg: "from-red-500/10 to-amber-500/5" },
    "ipl-auction": { icon: "🏏", bg: "from-yellow-500/10 to-blue-500/5" },
    "press": { icon: "📸", bg: "from-zinc-500/10 to-stone-600/5" },
  };

  const currentTheme = themeContent[event.id] || { icon: "🌍", bg: "from-amber-500/10 to-yellow-500/5" };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -6 }}
        onClick={() => setModalOpen(true)}
        className="group relative cursor-pointer"
      >
        {/* Glow */}
        <div className="absolute -inset-px rounded-2xl bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

        <div className="relative h-full bg-[#1c0e07]/85 backdrop-blur-md border border-[#b8975a]/20 rounded-2xl overflow-hidden hover:border-[#b8975a]/45 shadow-lg hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Top banner / icon */}
            <div className={`relative h-40 bg-gradient-to-br ${currentTheme.bg} overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0e07] via-transparent to-transparent z-10" />
              <div className="text-5xl opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-105 transition-transform duration-500">
                {currentTheme.icon}
              </div>
              {/* Category badge */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <span className="px-3 py-1 bg-[#1c0e07]/90 backdrop-blur-sm border border-[#b8975a]/20 rounded-full text-[10px] font-poppins-clean font-bold text-[#d5be8f] uppercase tracking-widest">
                  {event.category === "mun" ? "MUN" : event.category}
                </span>
              </div>
              {/* Difficulty badge */}
              <div className="absolute top-3.5 right-3.5 z-20">
                <span className={`px-3 py-1 rounded-full text-[10px] font-poppins-clean font-bold uppercase tracking-wider ${difficultyColors[event.difficulty]}`}>
                  {event.difficulty}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-serif-luxury font-bold text-[#fbf9f4] mb-1 group-hover:text-[#b8975a] transition-colors duration-300 leading-tight">
                {event.name}
              </h3>
              <p className="text-[#d5be8f] text-[10px] font-poppins-clean font-bold uppercase tracking-widest mb-3">
                {event.shortName}
              </p>
              <p className="text-[#fbf9f4]/80 text-sm leading-relaxed mb-4 font-poppins-clean font-light line-clamp-3">
                {event.description}
              </p>

              {event.agenda && (
                <div className="bg-[#b8975a]/5 border border-[#b8975a]/20 rounded-xl p-3.5">
                  <p className="text-[10px] text-[#b8975a] font-poppins-clean font-bold uppercase tracking-widest mb-1">Agenda</p>
                  <p className="text-[#fbf9f4]/95 text-xs font-poppins-clean font-medium leading-relaxed line-clamp-2">{event.agenda}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing + Action */}
          <div className="p-6 pt-0 border-t border-[#b8975a]/10 flex items-center justify-between mt-auto">
            <div>
              <span className="text-xl font-serif-luxury font-bold text-[#fbf9f4]">
                {event.fee > 0 ? formatCurrency(event.fee) : "Free"}
              </span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Link
                href={`/register?event=${event.id}`}
                className="px-5 py-2 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-wider transition-all duration-300 shadow-sm border border-[#b8975a]/20 inline-block text-center"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#111111]/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#110906] border border-[#b8975a]/30 rounded-2xl shadow-xl overflow-hidden z-10 flex flex-col"
            >
              {/* Top cover */}
              <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${currentTheme.bg} border-b border-[#b8975a]/20 flex flex-col justify-end min-h-40 sm:min-h-48`}>
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-sm hover:scale-105 transition-all border border-[#b8975a]/20"
                  >
                    ✕
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#110906] to-transparent" />
                
                <span className="relative z-10 px-3 py-1 bg-[#1c0e07]/90 border border-[#b8975a]/25 rounded-full text-[9px] font-poppins-clean font-bold text-[#b8975a] uppercase tracking-widest w-fit mb-3">
                  {event.category} Category
                </span>
                <h2 className="relative z-10 text-xl sm:text-2xl font-serif-luxury font-bold text-[#fbf9f4] leading-tight">
                  {event.name}
                </h2>
              </div>

              {/* Scrollable details */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[50vh] space-y-6">
                <div>
                  <h4 className="text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#b8975a] mb-2">Description</h4>
                  <p className="text-[#fbf9f4]/85 text-sm font-poppins-clean font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {event.agenda && (
                  <div className="bg-[#b8975a]/5 border border-[#b8975a]/15 rounded-xl p-4">
                    <h4 className="text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#b8975a] mb-1.5">Official Agenda</h4>
                    <p className="text-[#fbf9f4] text-sm font-poppins-clean font-semibold leading-relaxed">
                      &ldquo;{event.agenda}&rdquo;
                    </p>
                  </div>
                )}

                {event.highlights && event.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#b8975a] mb-3">Key Focus Areas</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#fbf9f4]/80 font-poppins-clean font-medium">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#b8975a] mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional criteria details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-center">
                  <div className="bg-[#1c0e07]/50 border border-[#b8975a]/10 rounded-xl p-3">
                    <span className="block text-[10px] uppercase tracking-widest text-[#fbf9f4]/50 font-semibold mb-1">Fee</span>
                    <span className="block font-serif-luxury font-bold text-sm text-[#fbf9f4]">{event.fee > 0 ? formatCurrency(event.fee) : "Free"}</span>
                  </div>
                  <div className="bg-[#1c0e07]/50 border border-[#b8975a]/10 rounded-xl p-3">
                    <span className="block text-[10px] uppercase tracking-widest text-[#fbf9f4]/50 font-semibold mb-1">Capacity</span>
                    <span className="block font-serif-luxury font-bold text-sm text-[#fbf9f4]">{event.capacity} Delegates</span>
                  </div>
                  <div className="bg-[#1c0e07]/50 border border-[#b8975a]/10 rounded-xl p-3">
                    <span className="block text-[10px] uppercase tracking-widest text-[#fbf9f4]/50 font-semibold mb-1">Difficulty</span>
                    <span className="block font-serif-luxury font-bold text-sm text-[#fbf9f4]">{event.difficulty}</span>
                  </div>
                  <div className="bg-[#1c0e07]/50 border border-[#b8975a]/10 rounded-xl p-3">
                    <span className="block text-[10px] uppercase tracking-widest text-[#fbf9f4]/50 font-semibold mb-1">Executive Board</span>
                    <span className="block font-serif-luxury font-bold text-sm text-[#fbf9f4] line-clamp-1">{event.chairperson || "TBA"}</span>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="p-6 border-t border-[#b8975a]/10 flex items-center justify-between bg-black/30">
                <span className="text-xs text-[#fbf9f4]/45 font-poppins-clean font-semibold uppercase tracking-wider">
                  Registration Closes Soon
                </span>
                <Link
                  href={`/register?event=${event.id}`}
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 shadow-sm border border-[#b8975a]/20"
                >
                  Confirm Registration
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
