"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { ABOUT_CONTENT, HIGHLIGHTS } from "@/lib/data";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function AboutPage() {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="pt-24 pb-20 bg-transparent">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,151,90,0.05),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative border border-[#b8975a]/20 bg-[#1c0e07]/45 p-1.5 rounded-2xl max-w-md w-full shadow-lg"
            >
              <img 
                src="/logo.jpg" 
                alt="LITUMUN 2026 Logo" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>
          </div>
          <SectionHeading
            badge="About Us"
            title="About LITUMUN"
            description={ABOUT_CONTENT.about}
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-[#b8975a]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative luxury-card rounded-2xl p-8 h-full hover:border-[#b8975a]/45 shadow-lg hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#b8975a]/10 border border-[#b8975a]/15 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h3 className="text-2xl font-serif-luxury font-bold text-[#fbf9f4] mb-4">Our Vision</h3>
                <p className="text-[#fbf9f4]/80 leading-relaxed font-poppins-clean font-light">{ABOUT_CONTENT.vision}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-[#b8975a]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative luxury-card rounded-2xl p-8 h-full hover:border-[#b8975a]/45 shadow-lg hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#b8975a]/10 border border-[#b8975a]/15 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-serif-luxury font-bold text-[#fbf9f4] mb-4">Our Mission</h3>
                <p className="text-[#fbf9f4]/80 leading-relaxed font-poppins-clean font-light">{ABOUT_CONTENT.mission}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-24 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCounter items={HIGHLIGHTS} />
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Values"
            title="What We Stand For"
            description="Our core values drive everything we do at LITUMUN."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_CONTENT.values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-[#b8975a]/5 to-[#b8975a]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative luxury-card rounded-2xl p-6 h-full text-center hover:border-[#b8975a]/45 shadow-lg hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#b8975a]/10 border border-[#b8975a]/15 flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl">
                      {["🤝", "⭐", "🌍", "👑"][i]}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif-luxury font-bold text-[#fbf9f4] mb-2">{value.title}</h4>
                  <p className="text-[#fbf9f4]/75 text-xs sm:text-sm leading-relaxed font-poppins-clean font-light">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About LIT */}
      <section className="py-16 sm:py-24 bg-[#1c0e07]/40 border border-[#b8975a]/15 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative luxury-card rounded-3xl p-8 sm:p-12 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#b8975a] to-[#d5be8f] flex items-center justify-center font-serif-luxury font-bold text-black shadow-sm">
                  L
                </div>
                <h3 className="text-2xl font-serif-luxury font-bold text-[#fbf9f4]">About LIT University</h3>
              </div>
              <p className="text-[#fbf9f4]/80 leading-relaxed text-base font-poppins-clean font-light">{ABOUT_CONTENT.aboutLIT}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Leadership"
            title="The Secretariat"
            description="Meet the team driving LITUMUN 2026."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="luxury-card rounded-2xl p-6 text-center hover:border-[#b8975a]/45 shadow-lg hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-full border border-[#b8975a]/30 p-1 mx-auto mb-4 group-hover:border-[#b8975a] transition-colors duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#b8975a]/10 to-[#d5be8f]/5 flex items-center justify-center font-serif-luxury font-bold text-lg text-[#b8975a] shadow-inner select-none">
                    {getInitials(member.name)}
                  </div>
                </div>
                <h4 className="text-[#fbf9f4] font-serif-luxury font-bold text-base mb-1">{member.name}</h4>
                <p className="text-[#b8975a] text-xs font-poppins-clean font-bold uppercase tracking-widest">{member.role}</p>
                <p className="text-[#fbf9f4]/50 text-xs font-poppins-clean font-semibold mt-1">Ph: {member.phone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
