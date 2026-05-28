"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/data";
import LitumunLogo from "@/components/LitumunLogo";

const NAV_SECTIONS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Committees", href: "/#committees" },
  { name: "Secretariat", href: "/#secretariat" },
  { name: "Sponsorship", href: "/#sponsorship" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLinkClick = (e, href) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#110906]/85 backdrop-blur-md border-b border-[#b8975a]/15 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-transparent border border-[#b8975a]/25 flex items-center justify-center p-1 shadow-sm group-hover:border-[#b8975a]/50 transition-all duration-300">
                  <LitumunLogo className="w-full h-full" />
                </div>
                <div className="absolute -inset-1 rounded-full bg-[#b8975a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-serif-luxury font-bold tracking-widest text-[#fbf9f4] group-hover:text-[#b8975a] transition-colors">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#b8975a] font-poppins-clean font-semibold -mt-1">
                  {SITE_CONFIG.edition}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_SECTIONS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative px-3.5 py-2 text-xs font-poppins-clean font-semibold uppercase tracking-wider text-[#fbf9f4] hover:text-[#b8975a] transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Underline hover effect */}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-[#b8975a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
              
              <Link
                href="/register"
                className="ml-4 px-5 py-2.5 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-black/10 hover:shadow-[#b8975a]/20 hover:scale-[1.02] active:scale-[0.98] border border-[#b8975a]/20 hover:border-[#b8975a]"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5.5 h-0.5 bg-[#fbf9f4] rounded-full origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5.5 h-0.5 bg-[#fbf9f4] rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5.5 h-0.5 bg-[#fbf9f4] rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-20 md:hidden"
          >
            <div className="absolute inset-0 bg-[#110906]/98 backdrop-blur-lg" />
            <div className="relative flex flex-col items-center justify-center h-full gap-5 px-6">
              {NAV_SECTIONS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleLinkClick(e, link.href);
                    }}
                    className="block text-xl font-serif-luxury font-bold py-2 text-[#fbf9f4] hover:text-[#b8975a] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_SECTIONS.length * 0.05 }}
              >
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 inline-block px-10 py-3.5 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black rounded-lg text-sm font-poppins-clean font-bold uppercase tracking-wider transition-colors duration-300 shadow-md border border-[#b8975a]/20"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
