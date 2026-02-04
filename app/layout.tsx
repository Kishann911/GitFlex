import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Noise } from "@/components/ui/Noise";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GITFLEX | Visual Authority",
  description: "Your GitHub profile, reimagined as a statement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${inter.variable} antialiased bg-black text-white selection:bg-lime-400 selection:text-black`}
      >
        <Noise />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
