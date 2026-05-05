import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
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
  title: "Vaulkyrie - Shared when needed. Private when it matters.",
  description:
    "Threshold security for everyday use, with a post-quantum control path for recovery and high-risk wallet authority.",
  keywords: [
    "Solana",
    "wallet",
    "shared wallet",
    "private wallet",
    "browser wallet",
    "vault wallet",
    "self custody",
  ],
  metadataBase: new URL("https://vaulkyrie-landing.vercel.app"),
  openGraph: {
    title: "Vaulkyrie - Shared when needed. Private when it matters.",
    description:
      "Threshold security for everyday use, with a post-quantum control path for recovery and high-risk wallet authority.",
    type: "website",
    siteName: "Vaulkyrie",
    images: [{ url: "/assets/qvault.jpeg", width: 1200, height: 630, alt: "Vaulkyrie wallet architecture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulkyrie - Shared when needed. Private when it matters.",
    description: "Threshold security for everyday use, with a post-quantum control path for recovery and high-risk wallet authority.",
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
