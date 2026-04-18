import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, MessageCircle } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Security", href: "#security" },
    { label: "Get Started", href: "#get-started" },
  ],
  Developers: [
    { label: "GitHub", href: "https://github.com/Naveen-6087/vaulkyrie" },
    { label: "Documentation", href: "#" },
    { label: "Architecture", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const socials = [
  { icon: Github, href: "https://github.com/Naveen-6087/vaulkyrie", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image src="/assets/logo.png" alt="Vaulkyrie" width={28} height={28} className="object-contain" />
              <span className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] tracking-tight">
                Vaulkyrie
              </span>
            </Link>
            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xs mb-6">
              The self-custodial threshold wallet for Solana. Your keys, your rules, your funds.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#94a3b8] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-[background-color,border-color,color] duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#475569]">
            © {new Date().getFullYear()} Vaulkyrie. All rights reserved.
          </p>
          <p className="text-xs text-[#475569]">
            Built on Solana. Secured by design.
          </p>
        </div>
      </div>
    </footer>
  );
}
