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
    { label: "API Reference", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
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
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/logo.png"
                alt="Vaulkyrie"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="text-lg font-semibold tracking-tight">
                Vaulkyrie
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs mb-6">
              Self-custodial threshold wallet for Solana with private policy
              enforcement and quantum-safe admin authority.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted hover:text-foreground hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dim">
            © {new Date().getFullYear()} Vaulkyrie. All rights reserved.
          </p>
          <p className="text-xs text-dim">
            Built on Solana. Secured by cryptography.
          </p>
        </div>
      </div>
    </footer>
  );
}
