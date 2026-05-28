"use client";

import React from "react";

export default function LitumunLogo({ className = "w-12 h-12", color = "#b8975a" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Wreath - Left Branch */}
      <path
        d="M 54,102 C 34,100 18,84 18,60 C 18,44 26,30 38,22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left Branch Leaves */}
      <path d="M 50,98 C 45,95 40,88 44,82" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 40,90 C 33,85 30,76 36,72" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 31,78 C 24,71 22,62 30,59" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 26,63 C 19,55 20,45 28,44" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 26,47 C 22,37 26,29 33,31" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 33,33 C 31,23 38,17 44,22" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Outer Wreath - Right Branch */}
      <path
        d="M 66,102 C 86,100 102,84 102,60 C 102,44 94,30 82,22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Right Branch Leaves */}
      <path d="M 70,98 C 75,95 80,88 76,82" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 80,90 C 87,85 90,76 84,72" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 89,78 C 96,71 98,62 90,59" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 94,63 C 101,55 100,45 92,44" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 94,47 C 98,37 94,29 87,31" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 87,33 C 89,23 82,17 76,22" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Ribbon at base of wreath */}
      <path
        d="M 52,101 C 55,99 65,99 68,101 C 72,103 76,106 78,110 M 68,101 C 67,105 64,108 61,110 M 52,101 C 53,105 56,108 59,110 M 52,101 C 48,103 44,106 42,110"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center Building Silhouette (LIT Clock Tower Facade) */}
      {/* Ground steps */}
      <path d="M 38,82 L 82,82" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 42,79 L 78,79" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Pillars and arches base */}
      <path d="M 44,79 L 44,60 L 76,60 L 76,79 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 50,79 L 50,64 M 56,79 L 56,64 M 64,79 L 64,64 M 70,79 L 70,64" stroke={color} strokeWidth="1.5" />
      
      {/* Pediment / Roof of base */}
      <path d="M 42,60 L 78,60 L 76,56 L 44,56 Z" fill={color} opacity="0.15" />
      <path d="M 42,60 L 78,60 L 76,56 L 44,56 Z" stroke={color} strokeWidth="1.5" />

      {/* Middle tower block */}
      <rect x="51.5" y="37" width="17" height="19" stroke={color} strokeWidth="2" fill="none" />
      
      {/* Clock Face dial */}
      <circle cx="60" cy="45" r="4" stroke={color} strokeWidth="1.2" />
      <path d="M 60,45 L 60,42.5 M 60,45 L 62,45" stroke={color} strokeWidth="1" strokeLinecap="round" />

      {/* Tower Top Dome */}
      <path d="M 51.5,37 Q 60,25 68.5,37 Z" stroke={color} strokeWidth="2" fill="none" />
      
      {/* Flagpole on Dome */}
      <path d="M 60,28 L 60,18" stroke={color} strokeWidth="1.5" />
      <path d="M 60,18 L 66,21 L 60,24" stroke={color} strokeWidth="1" fill={color} />
    </svg>
  );
}
