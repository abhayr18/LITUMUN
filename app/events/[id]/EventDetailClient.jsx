"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function EventDetailClient({ event }) {
  const difficultyColors = {
    Beginner: "from-green-500 to-emerald-500",
    Intermediate: "from-yellow-500 to-orange-500",
    Advanced: "from-red-500 to-rose-500",
    "All Levels": "from-blue-500 to-cyan-500",
  };

  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back to Events
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 uppercase tracking-wider">
                {event.category}
              </span>
              <span className={`px-3 py-1 bg-gradient-to-r ${difficultyColors[event.difficulty]} rounded-full text-xs font-bold text-white`}>
                {event.difficulty}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
              {event.name}
            </h1>
            <p className="text-violet-400 font-semibold text-lg uppercase tracking-wider mb-6">
              {event.shortName}
            </p>
          </motion.div>

          {/* Hero image area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-64 sm:h-80 bg-gradient-to-br from-violet-900/30 to-blue-900/30 rounded-2xl overflow-hidden border border-white/5 mb-10"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-20">🏛️</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-3">About This Committee</h2>
              <p className="text-gray-400 leading-relaxed">{event.description}</p>
            </div>

            {event.agenda && (
              <div className="bg-violet-500/5 border border-violet-500/10 rounded-2xl p-6">
                <h3 className="text-sm text-violet-400 font-semibold uppercase tracking-wider mb-2">Agenda</h3>
                <p className="text-white font-medium leading-relaxed">{event.agenda}</p>
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Capacity", value: `${event.capacity} seats` },
                { label: "Difficulty", value: event.difficulty },
                { label: "Category", value: event.category.toUpperCase() },
                { label: "Fee", value: event.fee > 0 ? formatCurrency(event.fee) : "Free" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {event.chairperson && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Chairperson</h3>
                <p className="text-gray-400">{event.chairperson}</p>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href={`/register?event=${event.id}`}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl text-base font-bold text-white text-center shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all"
              >
                Register for {event.shortName} — {event.fee > 0 ? formatCurrency(event.fee) : "Free"}
              </Link>
              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-base font-medium text-white text-center hover:bg-white/10 transition-all"
              >
                View All Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
