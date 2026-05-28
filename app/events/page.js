"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { EVENTS, CATEGORIES } from "@/lib/data";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredEvents = activeCategory === "all"
    ? EVENTS
    : EVENTS.filter((e) => e.category === activeCategory);

  return (
    <div className="pt-24 bg-transparent pb-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,151,90,0.05),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Events & Councils"
            title="Explore Our Committees"
            description="From intense international MUN committee sessions to historic assemblies and press corps, find your forum at LITUMUN 2026."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-poppins-clean font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "text-black font-bold"
                    : "text-[#fbf9f4]/70 hover:text-[#b8975a] bg-[#1c0e07]/40 border border-[#b8975a]/15 hover:border-[#b8975a]/30"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-[#b8975a] rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#fbf9f4]/60 text-lg font-poppins-clean font-light">No committees listed under this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
