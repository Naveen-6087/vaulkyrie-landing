import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { VAULKYRIE_LINKS } from "@/lib/links";
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

const anurati = localFont({
  src: "./fonts/Anurati-Regular.otf",
  variable: "--font-anurati",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaulkyrie - Solana wallet suite",
  description:
    "A Solana wallet suite for threshold control, post-quantum recovery paths, private transfer workflows, and developer tooling.",
  keywords: [
    "Solana",
    "wallet",
    "shared wallet",
    "private wallet",
    "browser wallet",
    "vault wallet",
    "self custody",
  ],
  metadataBase: new URL(VAULKYRIE_LINKS.website),
  openGraph: {
    title: "Vaulkyrie - Solana wallet suite",
    description:
      "A Solana wallet suite for threshold control, post-quantum recovery paths, private transfer workflows, and developer tooling.",
    type: "website",
    siteName: "Vaulkyrie",
    images: [{ url: "/assets/qvault.jpeg", width: 1200, height: 630, alt: "Vaulkyrie wallet architecture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulkyrie - Solana wallet suite",
    description: "A Solana wallet suite for threshold control, post-quantum recovery paths, private transfer workflows, and developer tooling.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${anurati.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
