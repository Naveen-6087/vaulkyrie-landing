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
  title: "Vaulkyrie — Threshold Wallet for Solana",
  description:
    "The self-custodial Solana wallet with threshold signing, private policy enforcement, and quantum-safe admin authority. No single point of failure.",
  keywords: [
    "Solana",
    "wallet",
    "threshold",
    "MPC",
    "FROST",
    "quantum-safe",
    "self-custodial",
  ],
  openGraph: {
    title: "Vaulkyrie — Threshold Wallet for Solana",
    description:
      "Self-custodial Solana wallet with threshold signing and quantum-safe admin authority.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise">{children}</body>
    </html>
  );
}
