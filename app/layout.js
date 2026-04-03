import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "LITUMUN 2026 — Where Diplomacy Meets Innovation",
    template: "%s | LITUMUN 2026",
  },
  description: "Laxminarayan Institute of Technology's premier Model United Nations conference. Join 500+ delegates across 15+ committees for three days of diplomacy, debate, and leadership in Nagpur.",
  keywords: ["LITUMUN", "Model United Nations", "MUN", "LIT Nagpur", "conference", "diplomacy", "college fest"],
  authors: [{ name: "LITUMUN Team", url: "https://litumun.in" }],
  openGraph: {
    title: "LITUMUN 2026 — Where Diplomacy Meets Innovation",
    description: "Central India's most prestigious Model United Nations conference. April 25-27, 2026 at LIT Nagpur.",
    type: "website",
    locale: "en_IN",
    siteName: "LITUMUN 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "LITUMUN 2026",
    description: "Where Diplomacy Meets Innovation — LIT Nagpur",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white min-h-screen`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
