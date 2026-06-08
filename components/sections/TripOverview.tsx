"use client";

import { Calendar, MapPin, Sparkles, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HIGHLIGHTS, TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

type StatCard = {
  label: string;
  value: string;
  sub: string;
  Icon: typeof Calendar;
  accent: string;
  ring: string;
  glow: string;
  iconBg: string;
};

const STATS: StatCard[] = [
  {
    label: "Dates",
    value: "Jul 3 – 5",
    sub: "Friday → Sunday, 2026",
    Icon: Calendar,
    accent: "from-forest-400/30 via-forest-500/10 to-transparent",
    ring: "border-forest-300/40 dark:border-forest-500/30",
    glow: "shadow-forest-500/20",
    iconBg: "bg-forest-500/15 text-forest-600 dark:text-forest-300",
  },
  {
    label: "Group Size",
    value: "12",
    sub: "Friends, one cabin",
    Icon: Users,
    accent: "from-sunset-400/30 via-sunset-500/10 to-transparent",
    ring: "border-sunset-300/40 dark:border-sunset-500/30",
    glow: "shadow-sunset-500/20",
    iconBg: "bg-sunset-500/15 text-sunset-600 dark:text-sunset-300",
  },
  {
    label: "Location",
    value: "Poconos, PA",
    sub: "~2 hours from NYC",
    Icon: MapPin,
    accent: "from-lake-400/30 via-lake-500/10 to-transparent",
    ring: "border-lake-300/40 dark:border-lake-500/30",
    glow: "shadow-lake-500/20",
    iconBg: "bg-lake-500/15 text-lake-600 dark:text-lake-300",
  },
  {
    label: "Vibe",
    value: "Mountain Reset",
    sub: "Lake · Fire · Rager",
    Icon: Sparkles,
    accent: "from-gold-400/30 via-gold-500/10 to-transparent",
    ring: "border-gold-400/40 dark:border-gold-500/30",
    glow: "shadow-gold-500/20",
    iconBg: "bg-gold-500/15 text-gold-600 dark:text-gold-400",
  },
];

export function TripOverview() {
  return (
    <section
      id="overview"
      className="relative py-24 md:py-32"
      aria-labelledby="overview-title"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-forest-500/10 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-sunset-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="overview-title"
          eyebrow="The Trip"
          title="One weekend, one cabin, twelve friends"
          subtitle="A long weekend in the Poconos built around lake days, campfires, and a Saturday night nobody will forget. Here's the shape of it."
        />

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={0.05 + i * 0.08} y={28}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl p-6 md:p-7 transition-all duration-500",
                  "glass border",
                  stat.ring,
                  "hover:-translate-y-1 hover:shadow-2xl",
                  stat.glow
                )}
              >
                {/* Soft accent wash */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100",
                    stat.accent
                  )}
                />
                {/* Top icon + label */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                      stat.iconBg
                    )}
                  >
                    <stat.Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    {stat.label}
                  </span>
                </div>

                {/* Value */}
                <div className="mt-7 font-display text-3xl font-bold tracking-tight md:text-4xl text-stone-900 dark:text-white">
                  {stat.value}
                </div>
                <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-300">
                  {stat.sub}
                </p>

                {/* Decorative corner accent */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all duration-700 group-hover:scale-125" />
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* Highlight pills */}
        <RevealOnScroll delay={0.3} y={20} className="mt-12 md:mt-16">
          <h3 className="sr-only" id="overview-highlights">
            Trip highlights
          </h3>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">
            What we&apos;re here for
          </p>
          <ul
            className="flex flex-wrap gap-2.5 md:gap-3"
            aria-labelledby="overview-highlights"
          >
            {HIGHLIGHTS.map((h, i) => (
              <RevealOnScroll
                key={h.label}
                delay={0.35 + i * 0.04}
                y={12}
                className="inline-flex"
              >
                <li
                  className={cn(
                    "group inline-flex cursor-default items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
                    "border border-stone-200/60 bg-white/60 text-stone-700 shadow-sm",
                    "dark:border-white/10 dark:bg-white/5 dark:text-stone-200",
                    "backdrop-blur transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-sunset-300/70 hover:bg-sunset-50 hover:text-sunset-700 hover:shadow-md",
                    "dark:hover:border-sunset-500/40 dark:hover:bg-sunset-500/10 dark:hover:text-sunset-200"
                  )}
                >
                  <span
                    className="text-base transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  >
                    {h.icon}
                  </span>
                  <span>{h.label}</span>
                </li>
              </RevealOnScroll>
            ))}
          </ul>

          {/* Tagline */}
          <p className="mt-8 max-w-2xl text-pretty text-sm text-stone-500 dark:text-stone-400">
            {TRIP.tagline}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
