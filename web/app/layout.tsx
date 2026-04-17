import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { CommandPaletteProvider } from "@/components/command-palette-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Observatoire · Prospective Atlas",
    template: "%s · Observatoire Prospective Atlas",
  },
  description:
    "Cartographie vivante des métiers, compétences et qualifications des branches professionnelles accompagnées par OPCO Atlas. Études, données, fiches métiers, tendances prospectives.",
  keywords: [
    "observatoire",
    "métiers",
    "compétences",
    "qualifications",
    "OPCO Atlas",
    "branches professionnelles",
    "prospective",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CommandPaletteProvider>
          <SkipLink />
          <Nav />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </CommandPaletteProvider>
        {/* Vercel Web Analytics — RGPD compliant, no cookies, free on Hobby (2500 events/month) */}
        <Analytics />
        {/* Vercel Speed Insights — Core Web Vitals en temps réel, free on Hobby */}
        <SpeedInsights />
      </body>
    </html>
  );
}
