"use client";

import { motion } from "framer-motion";
import {
  Backpack,
  CheckSquare,
  RefreshCw,
  Sparkles,
  Square,
} from "lucide-react";
import { useId } from "react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLocalStorage } from "@/lib/use-local-storage";
import { PACKING } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

type CheckMap = Record<string, boolean>;

const ALL_ITEMS = [...PACKING.essentials, ...PACKING.optional];

type ListCardProps = {
  title: string;
  subtitle: string;
  items: readonly string[];
  checks: CheckMap;
  onToggle: (label: string) => void;
  Icon: typeof Backpack;
  accentClasses: {
    border: string;
    glow: string;
    iconBg: string;
    barFrom: string;
    barTo: string;
    pillBg: string;
    pillText: string;
  };
};

const ESSENTIALS_ACCENT = {
  border: "border-forest-300/40 dark:border-forest-500/30",
  glow: "hover:shadow-forest-500/20",
  iconBg: "bg-forest-500/15 text-forest-600 dark:text-forest-300",
  barFrom: "from-forest-500",
  barTo: "to-lake-500",
  pillBg: "bg-forest-500/10",
  pillText: "text-forest-700 dark:text-forest-300",
};

const OPTIONAL_ACCENT = {
  border: "border-sunset-300/40 dark:border-sunset-500/30",
  glow: "hover:shadow-sunset-500/20",
  iconBg: "bg-sunset-500/15 text-sunset-600 dark:text-sunset-300",
  barFrom: "from-sunset-500",
  barTo: "to-gold-400",
  pillBg: "bg-sunset-500/10",
  pillText: "text-sunset-700 dark:text-sunset-300",
};

function ListCard({
  title,
  subtitle,
  items,
  checks,
  onToggle,
  Icon,
  accentClasses,
}: ListCardProps) {
  const headingId = useId();
  const checkedCount = items.reduce(
    (acc, item) => acc + (checks[item] ? 1 : 0),
    0
  );
  const total = items.length;
  const pct = total === 0 ? 0 : Math.round((checkedCount / total) * 100);

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-500",
        "glass border",
        accentClasses.border,
        "shadow-lg hover:-translate-y-0.5 hover:shadow-2xl",
        accentClasses.glow
      )}
    >
      {/* Card header */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
              accentClasses.iconBg
            )}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3
              id={headingId}
              className="font-display text-2xl font-bold tracking-tight text-stone-900 dark:text-white"
            >
              {title}
            </h3>
            <p className="mt-0.5 text-sm text-stone-700 dark:text-stone-400">
              {subtitle}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
            accentClasses.pillBg,
            accentClasses.pillText
          )}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${checkedCount} of ${total} ${title.toLowerCase()} packed`}
        >
          {checkedCount}/{total}
        </span>
      </header>

      {/* Card progress bar */}
      <div className="mt-5">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-stone-200/70 dark:bg-white/[0.06]">
          <motion.div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
              accentClasses.barFrom,
              accentClasses.barTo
            )}
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Checklist — native checkboxes for full a11y */}
      <ul
        className="mt-5 flex flex-col gap-1.5"
        role="group"
        aria-labelledby={headingId}
      >
        {items.map((item) => {
          const isChecked = !!checks[item];
          return (
            <li key={item}>
              <label
                className={cn(
                  "group/row flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200",
                  "hover:bg-stone-100/80 dark:hover:bg-white/[0.04]",
                  "focus-within:ring-2 focus-within:ring-sunset-400/70"
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(item)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all duration-200",
                    isChecked
                      ? "text-forest-500"
                      : "text-stone-500 dark:text-stone-500 group-hover/row:text-stone-700 dark:group-hover/row:text-stone-300"
                  )}
                  aria-hidden="true"
                >
                  {isChecked ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm md:text-base transition-all duration-200",
                    isChecked
                      ? "text-stone-500 line-through decoration-stone-500/70 dark:text-stone-500"
                      : "text-stone-800 dark:text-stone-100"
                  )}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Subtle corner glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl transition-all duration-700 group-hover:scale-125" />
    </article>
  );
}

export function PackingList() {
  const { value, setValue, hydrated, reset } = useLocalStorage<CheckMap>(
    "poconos-packing",
    {}
  );

  const checks: CheckMap = hydrated ? value : {};

  const toggle = (label: string) => {
    setValue((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const totalCount = ALL_ITEMS.length;
  const totalChecked = ALL_ITEMS.reduce(
    (acc, item) => acc + (checks[item] ? 1 : 0),
    0
  );
  const overallPct =
    totalCount === 0 ? 0 : Math.round((totalChecked / totalCount) * 100);

  return (
    <section
      id="packing"
      className="relative py-24 md:py-32"
      aria-labelledby="packing-title"
    >
      {/* Background flourish */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 right-1/4 h-[24rem] w-[24rem] rounded-full bg-forest-500/10 blur-[140px]" />
        <div className="absolute bottom-12 -left-24 h-80 w-80 rounded-full bg-sunset-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="packing-title"
          eyebrow="Pack Smart"
          title="Don't forget the s'mores"
          subtitle="Tap to check off as you pack. Saved locally on your device."
        />

        {/* Overall progress */}
        <RevealOnScroll y={20} className="mb-8 md:mb-10">
          <div
            className={cn(
              "flex flex-col gap-3 rounded-3xl p-5 md:flex-row md:items-center md:justify-between md:p-6",
              "glass border border-white/40 dark:border-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-sunset text-white shadow-md shadow-sunset-500/30"
                aria-hidden="true"
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                  Overall Progress
                </p>
                <p
                  className="text-xs text-stone-600 dark:text-stone-400"
                  role="status"
                  aria-live="polite"
                >
                  {totalChecked} of {totalCount} items packed &middot;{" "}
                  <span className="tabular-nums">{overallPct}%</span>
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 md:max-w-md">
              <div
                role="progressbar"
                aria-valuenow={overallPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Overall packing progress"
                className="relative h-2 w-full overflow-hidden rounded-full bg-stone-200/70 dark:bg-white/[0.06]"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-sunset shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                  initial={false}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="shrink-0 font-display text-2xl font-bold tabular-nums tracking-tight text-stone-900 dark:text-white">
                {overallPct}%
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <RevealOnScroll y={28} delay={0.05}>
            <ListCard
              title="Essentials"
              subtitle="The non-negotiables"
              items={PACKING.essentials}
              checks={checks}
              onToggle={toggle}
              Icon={Backpack}
              accentClasses={ESSENTIALS_ACCENT}
            />
          </RevealOnScroll>

          <RevealOnScroll y={28} delay={0.12}>
            <ListCard
              title="Optional"
              subtitle="Nice-to-haves & vibes-boosters"
              items={PACKING.optional}
              checks={checks}
              onToggle={toggle}
              Icon={Sparkles}
              accentClasses={OPTIONAL_ACCENT}
            />
          </RevealOnScroll>
        </div>

        {/* Reset action */}
        <RevealOnScroll y={16} delay={0.2} className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={reset}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]",
              "border border-stone-200/60 bg-white/60 text-stone-700 shadow-sm backdrop-blur transition-all duration-200",
              "hover:-translate-y-0.5 hover:border-campfire-300/70 hover:bg-campfire-50 hover:text-campfire-700",
              "dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:border-campfire-500/40 dark:hover:bg-campfire-500/10 dark:hover:text-campfire-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-campfire-400/70"
            )}
            aria-label="Reset all packing checkboxes"
          >
            <RefreshCw
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180"
              aria-hidden="true"
            />
            Reset all
          </button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
