"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Vaulkyrie one wallet or three?",
    answer: "It is one wallet suite with three ways to hold: Shared, Veil, and Stronghold.",
  },
  {
    question: "Will Solana apps recognize it?",
    answer: "Yes. Vaulkyrie is built to feel familiar when you connect it to everyday Solana apps.",
  },
  {
    question: "Why use more than one device?",
    answer: "Because one lost device should not mean one lost wallet. Shared control keeps the hold spread out.",
  },
  {
    question: "What is the Stronghold vault for?",
    answer: "It is the deeper hold for funds that should stay put, with WOTS+ admin authority reserved for recovery, rekey, and other high-risk control flows.",
  },
] as const;

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-bg-abyss py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="technical-label mb-4 inline-block text-neon">FAQ</span>
          <h2 className="brand-display text-4xl font-black lg:text-6xl">
            Common
            <br />
            questions.
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left focus-visible:ring-2 focus-visible:ring-neon/70"
                  >
                    <span className="text-lg font-black tracking-normal">{item.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-neon transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden text-text-secondary">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
