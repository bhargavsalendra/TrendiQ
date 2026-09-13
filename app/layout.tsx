import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "TRENDIQ — Fashion Trend Intelligence",
  description:
    "AI-powered fashion trend intelligence and early-warning platform."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
