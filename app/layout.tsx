import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/scrollbar.css";
import { Preloader } from "@/components/ui/preloader";
import { FlickeringGrid } from '@/components/ui/flickering-grid';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OTG Football Academy - Summer Camp 2025",
  description: "Transform your game with our comprehensive two-week Summer camp program. Football development, multi-sport exposure, life skills workshops, and personal growth training for ages 6-18. Limited spots available.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <div className="min-h-screen bg-gradient-to-br from-nyanza-50/80 to-nyanza-100/80 relative overflow-hidden">
          <FlickeringGrid
            className="absolute inset-0 w-full h-full"
            squareSize={4}
            gridGap={4}
            color="rgba(12, 75, 28, 0.8)"
            maxOpacity={0.4}
            flickerChance={0.2}
          />
          <Preloader />
          <main className="relative flex min-h-screen flex-col py-12 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
