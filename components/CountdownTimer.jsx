"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-[#D4AF37]/5 rounded-2xl blur-md group-hover:bg-[#D4AF37]/15 transition-all" />
            <div className="relative bg-white backdrop-blur-md border border-[#D4AF37]/15 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center hover:border-[#D4AF37]/35 shadow-sm group-hover:shadow-md transition-all">
              <motion.span
                key={block.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-[#111111] tabular-nums"
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
              <span className="text-[9px] sm:text-[10px] text-[#1F2937]/75 uppercase tracking-widest font-poppins-clean font-semibold mt-0.5">
                {block.label}
              </span>
            </div>
          </motion.div>
          {i < blocks.length - 1 && (
            <span className="text-[#D4AF37] text-xl sm:text-2xl font-serif-luxury font-bold hidden sm:block">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
