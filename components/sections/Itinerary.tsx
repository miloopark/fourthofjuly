"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ITINERARY, type ItineraryBlock } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

const TAB_DOT_COLORS = ["bg-forest-500", "bg-sunset-500", "bg-lake-500"];

function isRager(block: ItineraryBlock) {
  return (
    block.title.toLowerCase().includes("rager") ||
    block.icon === "🎉"
  );
}

export function Itinerary() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const total = ITINERARY.length;
    let next = activeIdx;
    if (e.key === "ArrowRight") next = (activeIdx + 1) % total;
    else if (e.key === "ArrowLeft") next = (activeIdx - 1 + total) % total;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else return;
    e.preventDefault();
    setActiveIdx(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="itinerary"
      className="relative py-24 md:py-32"
      aria-labelledby="itinerary-title"
    >
      {/* Background flourish */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-forest-500/10 blur-[140px]" />
        <div className="absolute -bottom-32 right-1/4 h-[28rem] w-[28rem] rounded-full bg-sunset-500/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="itinerary-title"
          eyebrow="The Plan"
          title="Friday to Sunday"
          subtitle="A loose framework. The weekend will have a mind of its own."
        />

        {/* Tabs */}
        <RevealOnScroll delay={0.05} y={20}>
          <div
            role="tablist"
            aria-label="Itinerary days"
            onKeyDown={onTabKey}
            className={cn(
              "scrollbar-hide -mx-4 flex gap-1 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0",
              "md:gap-2"
            )}
          >
            {ITINERARY.map((d, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={d.day}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`itinerary-panel-${i}`}
                  id={`itinerary-tab-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "group relative flex-shrink-0 rounded-2xl px-5 py-3 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-400/60",
                    isActive
                      ? "text-stone-900 dark:text-white"
                      : "text-stone-600 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition-all",
                        TAB_DOT_COLORS[i] ?? "bg-stone-500",
                        isActive ? "scale-110" : "opacity-60"
                      )}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="font-display text-lg font-bold tracking-tight md:text-xl">
                        {d.day}
                      </div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-stone-600 dark:text-stone-400">
                        {d.date} · {d.theme}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <motion.span
                      layoutId="itinerary-tab-underline"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-sunset"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200/60 to-transparent dark:via-white/10" />
        </RevealOnScroll>

        {/* All panels rendered, non-active hidden, so aria-controls stays valid */}
        {ITINERARY.map((d, i) => {
          const isActive = i === activeIdx;
          const accent = TAB_DOT_COLORS[i] ?? "bg-stone-500";
          return (
            <div
              key={d.day}
              role="tabpanel"
              id={`itinerary-panel-${i}`}
              aria-labelledby={`itinerary-tab-${i}`}
              hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className="mt-10 md:mt-14"
            >
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={d.day}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    {/* The connecting vertical line */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-[0.84rem] top-2 bottom-2 w-px bg-gradient-to-b from-forest-400 via-sunset-400 to-campfire-500 opacity-50",
                        "md:left-[8rem]"
                      )}
                    />

                    <ol className="space-y-6 md:space-y-8">
                      {d.blocks.map((block, j) => (
                        <TimelineRow
                          key={`${d.day}-${block.title}`}
                          block={block}
                          index={j}
                          accent={accent}
                        />
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TimelineRow({
  block,
  index,
  accent,
}: {
  block: ItineraryBlock;
  index: number;
  accent: string;
}) {
  const rager = isRager(block);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.06 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-[1.75rem_1fr] gap-3 md:grid-cols-[7rem_2rem_1fr] md:gap-0"
    >
      {/* Desktop time pill — right-aligned in its own column, never overlaps the dot */}
      <div className="hidden md:order-1 md:flex md:items-start md:justify-end md:pr-4 md:pt-1">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
            "border border-stone-200/60 bg-white/70 text-stone-800",
            "dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
          )}
        >
          {block.time}
        </span>
      </div>

      {/* Dot gutter — centered in its column on both mobile and desktop */}
      <div className="flex justify-center pt-2 md:order-2 md:pt-3">
        <span
          className={cn(
            "h-3 w-3 rounded-full ring-4 ring-white shadow-md dark:ring-midnight-900",
            accent
          )}
          aria-hidden="true"
        />
      </div>

      {/* Card column (with mobile-only time pill inside) */}
      <div className="md:order-3 md:pl-2">
        <span
          className={cn(
            "inline-block md:hidden mb-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
            "border border-stone-200/60 bg-white/70 text-stone-800",
            "dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
          )}
        >
          {block.time}
        </span>

      {/* Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl p-6 md:p-7 transition-all duration-300",
          rager
            ? "bg-gradient-sunset text-white shadow-2xl shadow-sunset-500/40 ring-1 ring-white/20 md:p-9"
            : "glass border border-white/40 dark:border-white/10 hover:-translate-y-0.5 hover:shadow-xl"
        )}
      >
        {rager && (
          <>
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-campfire-500/40 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay"
              aria-hidden="true"
            />
          </>
        )}

        <div className="relative flex items-start gap-4">
          <span
            className={cn(
              "flex flex-shrink-0 items-center justify-center rounded-2xl text-3xl md:text-4xl",
              rager
                ? "h-14 w-14 bg-white/20 ring-1 ring-white/30 backdrop-blur md:h-16 md:w-16"
                : "h-12 w-12 bg-forest-500/10 md:h-14 md:w-14"
            )}
            aria-hidden="true"
          >
            {block.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h3
              className={cn(
                "font-display font-bold tracking-tight text-balance",
                rager
                  ? "text-2xl md:text-4xl"
                  : "text-xl md:text-2xl text-stone-900 dark:text-white"
              )}
            >
              {block.title}
            </h3>
            <ul
              className={cn(
                "mt-3 space-y-1.5 text-sm md:mt-4 md:text-[15px]",
                rager
                  ? "text-white/90"
                  : "text-stone-700 dark:text-stone-300"
              )}
            >
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-2 h-1 w-1 flex-shrink-0 rounded-full",
                      rager ? "bg-white/70" : "bg-sunset-500"
                    )}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </motion.li>
  );
}
