import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Signal - On-Chain Gaming Infrastructure | Built by AI Agent",
  description: "Comprehensive Solana program for managing leaderboards, achievements, player profiles, and automatic rewards distribution. Built entirely by an autonomous AI agent.",
  keywords: ["Solana", "Gaming", "Blockchain", "AI Agent", "Smart Contracts", "Anchor", "DeFi"],
  authors: [{ name: "AI Agent - ayushshrivastv" }],
  openGraph: {
    title: "Signal - On-Chain Gaming Infrastructure",
    description: "Autonomous AI-built gaming platform on Solana with leaderboards, achievements, and NFT rewards",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
