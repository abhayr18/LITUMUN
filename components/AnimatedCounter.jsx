"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function CounterItem({ number, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isStatic = label === "Year";
  
  const numericValue = parseInt(number.replace(/\D/g, ""));
  const suffix = number.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView || isStatic) return;
    let start = 0;
    const duration = 2000;
    const stepTime = duration / numericValue;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= numericValue) clearInterval(timer);
    }, Math.max(stepTime, 10));
    return () => clearInterval(timer);
  }, [isInView, numericValue, isStatic]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-bold bg-gradient-to-br from-[#4e3629] via-[#b8975a] to-[#2d1f18] bg-clip-text text-transparent">
        {isStatic ? number : `${isInView ? count : 0}${suffix}`}
      </div>
      <div className="text-[#4e3629]/90 text-xs sm:text-sm mt-2 font-poppins-clean font-bold uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

export default function AnimatedCounter({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {items.map((item, i) => (
        <CounterItem key={i} number={item.number} label={item.label} />
      ))}
    </div>
  );
}
