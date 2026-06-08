"use client";

import { ExternalLink, Info, ShoppingCart } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import { SHOPPING } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

function amazonSearchUrl(query: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
}

export function AmazonShopping() {
  return (
    <section
      id="shopping"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="shopping-title"
    >
      {/* Warm background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sunset-500/[0.05] to-transparent" />
        <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-sunset-500/15 blur-[160px]" />
        <div className="absolute -right-24 bottom-12 h-[24rem] w-[24rem] rounded-full bg-gold-500/15 blur-[160px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-campfire-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="shopping-title"
          eyebrow="Lake Day Loot"
          title="Stuff worth buying"
          subtitle="Curated picks for floaties, water games, and lake gear."
        />

        {/* Friendly disclaimer */}
        <RevealOnScroll delay={0.05} y={16} className="mb-8 md:mb-10">
          <div
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full border border-sunset-300/60 bg-sunset-50/80 px-4 py-2 text-xs font-medium text-sunset-700 shadow-sm backdrop-blur",
              "dark:border-sunset-500/30 dark:bg-sunset-500/10 dark:text-sunset-200"
            )}
            role="note"
          >
            <Info className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
            <span>
              Only purchase items marked{" "}
              <span className="font-semibold">Free Returns</span> within 30 days.
            </span>
          </div>
        </RevealOnScroll>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          style={{ perspective: "1200px" }}
        >
          {SHOPPING.map((item, i) => (
            <RevealOnScroll
              key={item.name}
              delay={0.05 + i * 0.06}
              y={24}
              className="h-full"
            >
              <TiltCard className="h-full" intensity={5}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl",
                    "glass border border-white/40 dark:border-white/10",
                    "shadow-md transition-all duration-500",
                    "hover:-translate-y-1 hover:shadow-2xl hover:shadow-sunset-500/15"
                  )}
                >
                  {/* Gradient image area */}
                  <div
                    className={cn(
                      "relative aspect-square w-full overflow-hidden",
                      "bg-gradient-to-br",
                      item.color
                    )}
                  >
                    <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />
                    {/* Brightening overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/10" />
                    {/* Sheen */}
                    <div className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-full -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    {/* Centered emoji */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-7xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-110 md:text-8xl"
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 bg-white/80 p-5 backdrop-blur dark:bg-midnight-800/80">
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                        {item.desc}
                      </p>
                    </div>

                    <a
                      href={amazonSearchUrl(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition",
                        "bg-stone-900 text-white hover:bg-stone-700",
                        "dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200",
                        "shadow-sm hover:shadow-md"
                      )}
                      aria-label={`Search Amazon for ${item.name}`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>Search on Amazon</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  </div>
                </article>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
