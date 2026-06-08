"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQ as FAQ_ITEMS } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32"
      aria-labelledby="faq-title"
    >
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-forest-500/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sunset-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="faq-title"
          align="center"
          eyebrow="Asked & Answered"
          title="Frequently asked"
          subtitle="Click any question to reveal the answer."
        />

        <div className="mx-auto max-w-3xl">
          <ul className="flex flex-col gap-3 md:gap-4">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIdx === i;
              const buttonId = `faq-btn-${i}`;
              const panelId = `faq-panel-${i}`;

              return (
                <RevealOnScroll key={item.q} delay={0.04 + i * 0.04} y={16}>
                  <li>
                    <div
                      className={cn(
                        "group relative overflow-hidden rounded-3xl transition-all duration-300",
                        "glass border border-stone-200/60 dark:border-white/10",
                        "hover:border-sunset-300/70 hover:shadow-lg hover:shadow-sunset-500/5",
                        "dark:hover:border-sunset-500/40 dark:hover:shadow-sunset-500/10",
                        isOpen &&
                          "border-sunset-300/70 shadow-lg shadow-sunset-500/5 dark:border-sunset-500/40 dark:shadow-sunset-500/10"
                      )}
                    >
                      <h3 className="m-0">
                        <button
                          id={buttonId}
                          type="button"
                          onClick={() => setOpenIdx(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className={cn(
                            "flex min-h-[3.5rem] w-full items-center justify-between gap-4 p-6 text-left md:p-7",
                            "outline-none transition-colors",
                            "focus-visible:ring-2 focus-visible:ring-sunset-400/60"
                          )}
                        >
                          <span
                            className={cn(
                              "font-display text-base font-semibold tracking-tight text-stone-900 transition-colors md:text-lg",
                              "dark:text-white",
                              isOpen && "text-sunset-700 dark:text-sunset-200"
                            )}
                          >
                            {item.q}
                          </span>
                          <span
                            className={cn(
                              "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300",
                              "bg-white/80 text-stone-600 ring-1 ring-stone-200/70",
                              "group-hover:text-sunset-600 group-hover:ring-sunset-300/70",
                              "dark:bg-white/5 dark:text-stone-300 dark:ring-white/10",
                              "dark:group-hover:text-sunset-300 dark:group-hover:ring-sunset-500/40",
                              isOpen &&
                                "bg-gradient-sunset text-white ring-transparent shadow-md shadow-sunset-500/30 dark:ring-transparent"
                            )}
                            aria-hidden="true"
                          >
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="flex"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.span>
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.32,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 md:px-7 md:pb-7">
                              <div className="mb-4 h-px bg-gradient-to-r from-transparent via-stone-300/60 to-transparent dark:via-white/10" />
                              <p className="text-pretty text-sm leading-relaxed text-stone-600 md:text-base dark:text-stone-300">
                                {item.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                </RevealOnScroll>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
