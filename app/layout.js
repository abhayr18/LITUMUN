import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "LITUMUN 2026 — Where Every Voice Shapes Tomorrow's World",
    template: "%s | LITUMUN 2026",
  },
  description: "Laxminarayan Innovation Technological University's premier Model United Nations conference. Two days of diplomacy, debate, and leadership in Nagpur.",
  keywords: ["LITUMUN", "Model United Nations", "MUN", "LIT Nagpur", "conference", "diplomacy", "college fest", "LITU"],
  authors: [{ name: "LITUMUN Team", url: "https://litumun.in" }],
  openGraph: {
    title: "LITUMUN 2026 — Where Every Voice Shapes Tomorrow's World",
    description: "Central India's most prestigious Model United Nations conference. August 16-17, 2026 at LITU, Nagpur.",
    type: "website",
    locale: "en_IN",
    siteName: "LITUMUN 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "LITUMUN 2026",
    description: "Where Every Voice Shapes Tomorrow's World — LITU, Nagpur",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-sans antialiased min-h-screen`}>
        <Navbar />
        <main className="min-h-screen bg-transparent">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
