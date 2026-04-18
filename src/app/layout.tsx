import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  metadataBase: new URL("https://vaulkyrie-landing.vercel.app"),
  openGraph: {
    title: "Vaulkyrie — Threshold Wallet for Solana",
    description:
      "Self-custodial Solana wallet with threshold signing and quantum-safe admin authority.",
    type: "website",
    siteName: "Vaulkyrie",
    images: [{ url: "/assets/qvault.jpeg", width: 1200, height: 630, alt: "Vaulkyrie — The safest Solana wallet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulkyrie — Threshold Wallet for Solana",
    description: "Self-custodial Solana wallet with threshold signing and quantum-safe admin authority.",
    images: ["/assets/qvault.jpeg"],
  },
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise">{children}</body>
    </html>
  );
}
