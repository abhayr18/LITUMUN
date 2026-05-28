"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { Component as ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { SITE_CONFIG, HIGHLIGHTS, EVENTS, SPONSORS, ABOUT_CONTENT, GALLERY_IMAGES } from "@/lib/data";

const CircularGallery = dynamic(() => import("@/components/ui/circular-gallery"), { ssr: false });


// Pre-computed gold particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = Array.from({ length: 25 }, (_, i) => ({
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 7) % 100),
  duration: 4 + (i % 4),
  delay: (i * 0.23) % 4,
}));

function HeroParticles() {
  return (
    <div className="particles-bg">
      {PARTICLE_POSITIONS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#b8975a]/30 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Elegant SVG world map pattern
function WorldMapBackground() {
  return (
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 500"
        className="w-full max-w-5xl h-auto"
        fill="none"
        stroke="#b8975a"
        strokeWidth="1"
      >
        {/* Simple elegant geographic lines */}
        <path d="M150,150 Q180,120 220,130 T300,180 T400,200 T450,150 T500,100 T580,130 T650,170 T750,140 T850,150 T950,120" />
        <path d="M100,250 Q150,220 200,260 T350,240 T550,260 T750,230 T880,270 T950,230" />
        <path d="M220,380 Q320,320 420,360 T600,320 T780,350 T900,310" />
        <path d="M400,80 L400,420 M600,80 L600,420 M200,100 L200,400 M800,100 L800,400" strokeDasharray="5,5" strokeWidth="0.5" />
        {/* Coordinates nodes */}
        <circle cx="200" cy="150" r="4" fill="#b8975a" className="map-pulse" />
        <circle cx="350" cy="240" r="3.5" fill="#b8975a" />
        <circle cx="500" cy="100" r="5" fill="#b8975a" className="map-pulse" />
        <circle cx="650" cy="170" r="4" fill="#b8975a" />
        <circle cx="800" cy="280" r="4.5" fill="#b8975a" className="map-pulse" />
        <circle cx="280" cy="350" r="3" fill="#b8975a" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [activeGalleryImg, setActiveGalleryImg] = useState(null);
  const [galleryMode, setGalleryMode] = useState("reel"); // 'reel' | 'grid' | 'webgl3d'
  const [gridExpanded, setGridExpanded] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [submittingContact, setSubmittingContact] = useState(false);

  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmittingContact(true);
    setTimeout(() => {
      setSubmittingContact(false);
      setContactSuccess(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setContactSuccess(false), 5000);
    }, 1200);
  };

  const EXPERIENCE_ITEMS = [
    { title: "Rigorous Debate", desc: "Engage in structured rhetoric, challenging opposing viewpoints on pressing global matters.", icon: "🎙️" },
    { title: "Global Diplomacy", desc: "Represent sovereign states and draft resolutions to forge path-breaking international consensus.", icon: "🌍" },
    { title: "Empowered Leadership", desc: "Steer committee sessions, manage coalitions, and direct international policy frameworks.", icon: "👑" },
    { title: "Elite Networking", desc: "Build connections with peers, delegates, and mentors from prestigious institutions nationwide.", icon: "🤝" },
    { title: "International Exposure", desc: "Master the protocols and mechanisms of the United Nations in a highly realistic simulation.", icon: "✈️" }
  ];

  // Helper for team initials avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-24">
        <WorldMapBackground />
        <HeroParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          {/* Logo Banner */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center mb-8"
          >
            <div className="relative border border-[#b8975a]/20 bg-[#1c0e07]/45 p-1 rounded-2xl max-w-lg w-full mx-auto shadow-xl">
              <img
                src="/logo.jpg"
                alt="LITUMUN 2026 Banner Logo"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#b8975a]/10 to-[#d5be8f]/10 opacity-30 blur-sm pointer-events-none" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4.5 py-2 bg-[#b8975a]/10 border border-[#b8975a]/25 rounded-full text-[#b8975a] text-xs font-poppins-clean font-bold uppercase tracking-widest mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#b8975a] animate-pulse" />
            August 16–17, 2026 • Nagpur
          </motion.div>

          {/* Title with spring reveals */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-luxury font-bold text-[#fbf9f4] tracking-tight mb-6"
          >
            <motion.span
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 80 }}
              className="inline-block"
            >
              LITU
            </motion.span>
            <motion.span
              initial={{ y: 35, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.38, type: "spring", stiffness: 80 }}
              className="inline-block text-[#b8975a] ml-1"
            >
              MUN
            </motion.span>{" "}
            <motion.span
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 80 }}
              className="inline-block text-2xl sm:text-3xl md:text-4xl font-poppins-clean font-bold tracking-widest text-[#fbf9f4]/60 ml-2"
            >
              2026
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-2xl md:text-3xl text-[#fbf9f4]/90 font-serif-luxury font-light italic mb-2 tracking-wide"
          >
            &ldquo;{SITE_CONFIG.tagline}&rdquo;
          </motion.p>

          {/* Secondary Words */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xs sm:text-sm font-poppins-clean font-bold uppercase text-[#b8975a] tracking-widest mb-12"
          >
            {SITE_CONFIG.subTagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4.5 mb-16"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto px-9 py-4 bg-[#b8975a] hover:bg-[#d5be8f] text-black font-poppins-clean font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 shadow-md border border-[#b8975a]/35 hover:scale-105 active:scale-95"
            >
              Register Now
            </Link>
            <button
              onClick={() => setSponsorModalOpen(true)}
              className="w-full sm:w-auto px-9 py-4 bg-transparent hover:bg-white/5 text-[#fbf9f4] font-poppins-clean font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 shadow-sm border border-[#b8975a]/30 hover:scale-105 active:scale-95"
            >
              Become a Sponsor
            </button>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-[#fbf9f4]/50 text-xs font-poppins-clean font-bold uppercase tracking-widest mb-5">Assembly Commences In</p>
            <CountdownTimer targetDate={SITE_CONFIG.eventDate} />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5.5 h-9.5 border border-[#b8975a]/40 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-[#b8975a] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Storytelling Layout */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#d5be8f]">The Conference</span>
              <h2 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#fbf9f4] leading-tight">
                Diplomatic Leadership for a Globalized World
              </h2>
              <p className="text-[#fbf9f4]/80 text-base leading-relaxed font-poppins-clean font-light">
                {ABOUT_CONTENT.about}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="font-serif-luxury font-bold text-lg text-[#fbf9f4] mb-2">Our Vision</h4>
                  <p className="text-sm text-[#fbf9f4]/75 font-poppins-clean font-light leading-relaxed">{ABOUT_CONTENT.vision}</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif-luxury font-bold text-lg text-[#fbf9f4] mb-2">Our Mission</h4>
                  <p className="text-sm text-[#fbf9f4]/75 font-poppins-clean font-light leading-relaxed">{ABOUT_CONTENT.mission}</p>
                </div>
              </div>
            </motion.div>

            {/* Creative Card Grid / Experience Visuals */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative luxury-card rounded-3xl p-8 sm:p-12 shadow-lg"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#b8975a]/10 rounded-bl-3xl border-b border-l border-[#b8975a]/20 flex items-center justify-center font-serif-luxury font-bold text-[#d5be8f]">
                LITU
              </div>
              <h3 className="text-2xl font-serif-luxury font-bold text-[#fbf9f4] mb-4">LITU-MUN Statistics</h3>
              <p className="text-sm text-[#fbf9f4]/70 font-poppins-clean font-light mb-10">
                Empowering delegacy across educational institutions in Central India. Discover the sheer volume of our flagship global conference.
              </p>
              <AnimatedCounter items={HIGHLIGHTS} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. EVENT EXPERIENCE SECTION */}
      <section className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Summit Pillars"
            title="The Event Experience"
            description="Explore the five cornerstone attributes that make LITUMUN a prestigious digital and real-world forum."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {EXPERIENCE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="luxury-card rounded-2xl p-6 hover:border-[#b8975a]/45 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#b8975a]/10 border border-[#b8975a]/20 flex items-center justify-center text-2xl mb-6 group-hover:bg-[#b8975a]/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-serif-luxury font-bold text-base text-[#fbf9f4] mb-2">{item.title}</h3>
                <p className="text-xs text-[#fbf9f4]/70 font-poppins-clean font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMMITTEES SECTION */}
      <section id="committees" className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Councils"
            title="MUN Committees"
            description="Delve into the official agendas of our 7 flagship committees and select the seat where your speech can shape history."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black font-poppins-clean font-bold uppercase tracking-wider text-xs rounded-lg transition-all duration-300 shadow-sm border border-[#b8975a]/30"
            >
              View Detailed Agendas
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECRETARIAT / TEAM SECTION */}
      <section id="secretariat" className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Executive Board"
            title="The Secretariat"
            description="Introduce the cabinet officers leading the organizational, research, and diplomatic frameworks of LITUMUN 2026."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ABOUT_CONTENT.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="luxury-card rounded-2xl p-5 text-center hover:border-[#b8975a]/45 shadow-lg hover:shadow-lg transition-all duration-300 group"
              >
                {/* Circular Profile Image with Gold Borders */}
                <div className="relative w-20 h-20 rounded-full border border-[#b8975a]/30 p-1 mx-auto mb-4 group-hover:border-[#b8975a] transition-colors duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#b8975a]/10 to-[#d5be8f]/5 flex items-center justify-center font-serif-luxury font-bold text-lg text-[#d5be8f] shadow-inner select-none">
                    {getInitials(member.name)}
                  </div>
                </div>
                <h4 className="text-[#fbf9f4] font-serif-luxury font-bold text-sm mb-1 line-clamp-1">{member.name}</h4>
                <p className="text-[#d5be8f] text-[10px] font-poppins-clean font-bold uppercase tracking-widest">{member.role}</p>
                <p className="text-[#fbf9f4]/60 text-[10px] font-poppins-clean font-semibold mt-1">Ph: {member.phone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPONSORSHIP SECTION */}
      <section id="sponsorship" className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Partner With Us"
            title="Recognized Partners"
            description="Align your brand with the future diplomatic and corporate leaders of tomorrow."
          />

          {/* Sponsor logo carousel */}
          <div className="border-t border-b border-[#D4AF37]/15 py-10 overflow-hidden relative mt-10">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#110906] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#110906] to-transparent z-10 pointer-events-none" />
            
            <p className="text-center text-[10px] font-poppins-clean font-bold uppercase tracking-widest text-[#D4AF37] mb-8">Current Partners & Affiliates</p>
            
            <div className="flex gap-10 whitespace-nowrap overflow-hidden">
              <motion.div
                className="flex gap-12 text-sm text-[#fbf9f4]/85 font-serif-luxury font-bold"
                animate={{ x: [0, -600] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                {SPONSORS.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 border border-[#D4AF37]/10 bg-[#1c0e07]/60 rounded-xl px-5 py-3 shadow-inner">
                    <span className="text-lg">🏛️</span>
                    <div className="flex flex-col">
                      <span className="text-xs tracking-wide">{s.name}</span>
                      <span className="text-[9px] text-[#D4AF37] font-poppins-clean uppercase font-bold tracking-widest">{s.tier} Sponsor</span>
                    </div>
                  </div>
                ))}
                {/* Duplicate for infinite loop */}
                {SPONSORS.map((s, idx) => (
                  <div key={`dup-${idx}`} className="flex items-center gap-2 border border-[#D4AF37]/10 bg-[#1c0e07]/60 rounded-xl px-5 py-3 shadow-inner">
                    <span className="text-lg">🏛️</span>
                    <div className="flex flex-col">
                      <span className="text-xs tracking-wide">{s.name}</span>
                      <span className="text-[9px] text-[#D4AF37] font-poppins-clean uppercase font-bold tracking-widest">{s.tier} Sponsor</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h4 className="text-base font-serif-luxury font-bold text-[#fbf9f4] mb-4">Interested in custom branding packages?</h4>
            <button
              onClick={() => setSponsorModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent hover:bg-white/5 text-[#fbf9f4] font-poppins-clean font-bold uppercase tracking-wider text-xs rounded-lg transition-colors duration-300 border border-[#b8975a]/45"
            >
              Partner With LITUMUN 2026
            </button>
          </div>
        </div>
      </section>

      {/* 8. GALLERY SECTION */}
      <section id="gallery" className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Visual Archives"
            title="LITU-MUN Highlights"
            description="Glance through visual registers of our historic committees, debate chambers, and delegate conventions."
          />

          {/* Mode Switcher Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-[#1c0e07]/60 backdrop-blur-md rounded-xl border border-[#b8975a]/25 shadow-inner">
              <button
                onClick={() => setGalleryMode("reel")}
                className={`px-5 py-2.5 rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  galleryMode === "reel"
                    ? "bg-[#b8975a] text-black shadow-md shadow-[#b8975a]/20 font-extrabold"
                    : "text-[#fbf9f4]/70 hover:text-[#fbf9f4] hover:bg-white/5"
                }`}
              >
                🎥 Scrolling Reel
              </button>
              <button
                onClick={() => setGalleryMode("webgl3d")}
                className={`px-5 py-2.5 rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  galleryMode === "webgl3d"
                    ? "bg-[#b8975a] text-black shadow-md shadow-[#b8975a]/20 font-extrabold"
                    : "text-[#fbf9f4]/70 hover:text-[#fbf9f4] hover:bg-white/5"
                }`}
              >
                🌀 3D WebGL Gallery
              </button>
              <button
                onClick={() => setGalleryMode("grid")}
                className={`px-5 py-2.5 rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  galleryMode === "grid"
                    ? "bg-[#b8975a] text-black shadow-md shadow-[#b8975a]/20 font-extrabold"
                    : "text-[#fbf9f4]/70 hover:text-[#fbf9f4] hover:bg-white/5"
                }`}
              >
                📊 Photo Grid
              </button>
            </div>
          </div>

          {/* Gallery View Contents */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {galleryMode === "reel" && (
                <motion.div
                  key="reel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageAutoSlider images={GALLERY_IMAGES} onImageClick={setActiveGalleryImg} />
                </motion.div>
              )}

              {galleryMode === "webgl3d" && (
                <motion.div
                  key="webgl3d"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden rounded-2xl border border-[#b8975a]/20 bg-[#1c0e07]/45 shadow-2xl flex flex-col justify-between p-4">
                    <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/85 to-transparent z-10 text-center pointer-events-none">
                      <p className="text-[10px] font-poppins-clean font-bold uppercase tracking-widest text-[#d5be8f] mb-1">Interactive 3D Carousel</p>
                      <h4 className="text-xs text-[#fbf9f4]/60 font-poppins-clean font-medium">Click and drag sideways or scroll to spin the 3D gallery cylinder</h4>
                    </div>
                    <div className="w-full h-full">
                      <CircularGallery
                        items={GALLERY_IMAGES.map((img) => ({ image: img.url, text: img.title }))}
                        bend={3}
                        textColor="#d5be8f"
                        borderRadius={0.05}
                        scrollEase={0.03}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {galleryMode === "grid" && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {GALLERY_IMAGES.slice(0, gridExpanded ? GALLERY_IMAGES.length : 8).map((img, index) => (
                      <motion.div
                        key={img.url}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => setActiveGalleryImg(img)}
                        className="relative aspect-square overflow-hidden rounded-2xl border border-[#b8975a]/15 bg-[#1c0e07]/60 shadow-lg cursor-pointer group transition-all duration-300 hover:border-[#b8975a]/45"
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080403]/90 via-[#080403]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <span className="text-[9px] font-poppins-clean font-bold uppercase tracking-widest text-[#d5be8f]">Gallery View</span>
                          <h4 className="text-xs font-serif-luxury font-bold text-[#fbf9f4] mt-0.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 leading-snug">
                            {img.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setGridExpanded(!gridExpanded)}
                      className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-[#fbf9f4] font-poppins-clean font-bold uppercase tracking-wider text-xs rounded-lg transition-all duration-300 border border-[#b8975a]/45 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {gridExpanded ? "Show Fewer Photos" : `View All Photos (${GALLERY_IMAGES.length})`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="relative py-24 sm:py-32 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Enquiries"
            title="Connect With LITUMUN"
            description="Have questions regarding committee agendas, delegation guidelines, or registrations? Write to us."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card rounded-3xl p-8 sm:p-12 shadow-lg"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-[#1c0e07]/60 border border-[#b8975a]/15 focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 rounded-lg text-sm text-[#fbf9f4] placeholder-gray-500 focus:outline-none transition-all font-poppins-clean"
                  />
                </div>
                <div>
                  <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@university.com"
                    className="w-full px-4 py-3 bg-[#1c0e07]/60 border border-[#b8975a]/15 focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 rounded-lg text-sm text-[#fbf9f4] placeholder-gray-500 focus:outline-none transition-all font-poppins-clean"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Reason for inquiry"
                  className="w-full px-4 py-3 bg-[#1c0e07]/60 border border-[#b8975a]/15 focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 rounded-lg text-sm text-[#fbf9f4] placeholder-gray-500 focus:outline-none transition-all font-poppins-clean"
                />
              </div>

              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-[#1c0e07]/60 border border-[#b8975a]/15 focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 rounded-lg text-sm text-[#fbf9f4] placeholder-gray-500 focus:outline-none transition-all font-poppins-clean"
                />
              </div>

              {contactSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-4 text-emerald-400 text-xs font-poppins-clean font-medium"
                >
                  ✓ Your message has been sent successfully. The Secretariat will write back to you shortly.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={submittingContact}
                className="w-full py-4 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black font-poppins-clean font-bold uppercase tracking-widest text-xs rounded-lg transition-colors duration-300 shadow-sm border border-[#b8975a]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submittingContact ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeGalleryImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveGalleryImg(null)}
              className="absolute inset-0 bg-[#080403]/95 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] bg-[#080403] border border-[#b8975a]/30 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveGalleryImg(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white border border-[#b8975a]/20 flex items-center justify-center hover:scale-105 transition-all font-bold"
              >
                ✕
              </button>
              <img
                src={activeGalleryImg.url}
                alt={activeGalleryImg.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6 bg-[#1c0e07]/90 border-t border-[#b8975a]/15">
                <span className="text-[10px] font-poppins-clean font-bold uppercase tracking-widest text-[#b8975a]">Visual Archives</span>
                <h3 className="font-serif-luxury font-bold text-lg text-[#fbf9f4] mt-0.5">{activeGalleryImg.title}</h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SPONSORSHIP ENQUIRY MODAL */}
      <AnimatePresence>
        {sponsorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSponsorModalOpen(false)}
              className="absolute inset-0 bg-[#080403]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#110906] border border-[#b8975a]/30 rounded-2xl shadow-xl p-8 z-10"
            >
              <button
                onClick={() => setSponsorModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1c0e07] hover:bg-white/5 text-[#fbf9f4] flex items-center justify-center transition-colors border border-[#b8975a]/15"
              >
                ✕
              </button>
              <span className="text-[10px] font-poppins-clean font-bold uppercase tracking-widest text-[#b8975a]">Partnership</span>
              <h3 className="font-serif-luxury font-bold text-2xl text-[#fbf9f4] mb-3">Partner with LITUMUN 2026</h3>
              <p className="text-sm text-[#fbf9f4]/75 font-poppins-clean font-light leading-relaxed mb-6">
                To coordinate a custom sponsorship tier, request visual specs, or receive the formal invoice details, please contact our Sponsorship Desk directly:
              </p>
              
              <div className="bg-[#1c0e07]/50 border border-[#b8975a]/15 rounded-xl p-5 space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#b8975a] text-lg mt-0.5">📞</span>
                  <div>
                    <h5 className="text-xs uppercase font-poppins-clean font-bold text-[#fbf9f4]">Sponsorship Desk</h5>
                    <p className="text-sm text-[#fbf9f4]/80 font-poppins-clean font-medium">{SITE_CONFIG.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#b8975a] text-lg mt-0.5">✉️</span>
                  <div>
                    <h5 className="text-xs uppercase font-poppins-clean font-bold text-[#fbf9f4]">Direct Email</h5>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-[#b8975a] hover:underline font-poppins-clean font-medium">{SITE_CONFIG.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#b8975a] text-lg mt-0.5">🏛️</span>
                  <div>
                    <h5 className="text-xs uppercase font-poppins-clean font-bold text-[#fbf9f4]">Mailing Address</h5>
                    <p className="text-xs text-[#fbf9f4]/80 leading-relaxed font-poppins-clean font-medium">{SITE_CONFIG.venue}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSponsorModalOpen(false)}
                  className="px-6 py-2.5 bg-[#b8975a] hover:bg-[#d5be8f] text-black rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-widest transition-colors duration-300 border border-black/5 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
