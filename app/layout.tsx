import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/scrollbar.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OTG Football Academy - Easter Camp 2025",
  description: "Transform your game with our intensive two-week Easter training program. Professional coaching, circuit training, swimming sessions, and strength conditioning for ages 6-18. Limited spots available.",
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
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
