import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Heritage Pulse — Preserving India's Cultural Legacy",
  description:
    "Discover, explore, and help preserve India's magnificent cultural heritage. Join our community of heritage enthusiasts dedicated to protecting monuments, traditions, and stories for future generations.",
  keywords: [
    "Indian heritage",
    "cultural preservation",
    "monuments",
    "UNESCO",
    "history",
    "traditions",
    "archaeology",
  ],
  openGraph: {
    title: "Heritage Pulse — Preserving India's Cultural Legacy",
    description:
      "Discover, explore, and help preserve India's magnificent cultural heritage.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
