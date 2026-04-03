"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { SCHEDULE } from "@/lib/data";

const days = [
  { key: "day1", label: "Day 1", date: SCHEDULE.day1.date },
  { key: "day2", label: "Day 2", date: SCHEDULE.day2.date },
];

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("day1");
  const currentSchedule = SCHEDULE[activeDay];

  return (
    <div className="pt-20">
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Schedule"
            title="Event Schedule"
            description="Two days packed with committee sessions, debates, cultural interactions, and closing ceremony."
          />

          {/* Day Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`relative px-5 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeDay === day.key
                    ? "text-white"
                    : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                {activeDay === day.key && (
                  <motion.div
                    layoutId="activeDay"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <span className="block font-bold">{day.label}</span>
                  <span className="block text-xs opacity-70">{day.date}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Day Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center">
                {currentSchedule.title}
              </h3>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/50 to-transparent" />

                <div className="space-y-6">
                  {currentSchedule.events.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative flex gap-4 sm:gap-6 group"
                    >
                      {/* Dot */}
                      <div className="relative z-10 shrink-0">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-900 border-2 border-violet-500/30 flex items-center justify-center group-hover:border-violet-400 group-hover:bg-violet-500/10 transition-all">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-violet-400 group-hover:scale-125 transition-transform" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-900/60 border border-white/5 rounded-xl p-4 sm:p-5 group-hover:border-violet-500/20 transition-colors -mt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <span className="text-violet-400 font-mono font-bold text-sm">{event.time}</span>
                          <span className="text-xs text-gray-500 bg-white/5 rounded-full px-3 py-1 w-fit">{event.location}</span>
                        </div>
                        <h4 className="text-white font-bold text-base sm:text-lg mb-1">{event.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
