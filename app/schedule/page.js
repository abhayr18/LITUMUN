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
    <div className="pt-24 bg-transparent pb-20">
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,151,90,0.05),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Schedule"
            title="Event Schedule"
            description="Two days packed with committee sessions, diplomatic caucuses, cultural Networking, and closing ceremonies."
          />

          {/* Day Tabs */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-12">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`relative px-6 py-3 rounded-xl text-xs font-poppins-clean font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeDay === day.key
                    ? "text-black font-bold shadow-md"
                    : "text-[#fbf9f4]/70 hover:text-[#b8975a] bg-[#1c0e07]/40 border border-[#b8975a]/15 hover:border-[#b8975a]/30"
                }`}
              >
                {activeDay === day.key && (
                  <motion.div
                    layoutId="activeDay"
                    className="absolute inset-0 bg-[#b8975a] rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 block text-center">
                  <span className="block">{day.label}</span>
                  <span className={`block text-[9px] font-semibold mt-0.5 ${activeDay === day.key ? "text-black/85 font-bold" : "text-[#fbf9f4]/50"}`}>{day.date}</span>
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
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#fbf9f4] mb-10 text-center">
                {currentSchedule.title}
              </h3>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#b8975a]/60 via-[#b8975a]/20 to-transparent" />

                <div className="space-y-6">
                  {currentSchedule.events.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="relative flex gap-4 sm:gap-6 group"
                    >
                      {/* Dot */}
                      <div className="relative z-10 shrink-0">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#1c0e07] border-2 border-[#b8975a]/30 flex items-center justify-center group-hover:border-[#b8975a] group-hover:bg-[#b8975a]/10 transition-all">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#b8975a] group-hover:scale-125 transition-transform" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 luxury-card rounded-xl p-4 sm:p-5 group-hover:border-[#b8975a]/45 group-hover:shadow-lg transition-all duration-300 -mt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                          <span className="text-[#b8975a] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">{event.time}</span>
                          <span className="text-[10px] font-poppins-clean font-bold text-[#b8975a] uppercase tracking-wider bg-[#b8975a]/10 border border-[#b8975a]/20 rounded-full px-3 py-1 w-fit">{event.location}</span>
                        </div>
                        <h4 className="text-[#fbf9f4] font-serif-luxury font-bold text-base sm:text-lg mb-1 leading-tight">{event.title}</h4>
                        <p className="text-[#fbf9f4]/80 text-sm font-poppins-clean font-light leading-relaxed">{event.description}</p>
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
