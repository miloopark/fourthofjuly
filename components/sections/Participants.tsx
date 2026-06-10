"use client";

import Image from "next/image";
import { UserPlus } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import { PARTICIPANTS, TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

// forest-500, sunset-500, lake-500, gold-400, campfire-500 (sans #)
const AVATAR_BG = "10b981,f97316,06b6d4,fbbf24,dc2626";

function avatarUrl(name: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    name
  )}&backgroundColor=${AVATAR_BG}`;
}

export function Participants() {
  const remaining = Math.max(0, TRIP.groupSize - PARTICIPANTS.length);

  return (
    <section
      id="participants"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="participants-title"
    >
      {/* Background: subtle gradient + blur orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest-500/[0.04] to-transparent" />
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-sunset-500/15 blur-[140px]" />
        <div className="absolute -right-24 bottom-12 h-[28rem] w-[28rem] rounded-full bg-lake-500/15 blur-[160px]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-forest-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="participants-title"
          eyebrow="The Crew"
          title="Twelve friends, one weekend"
          subtitle={
            remaining > 0
              ? `Meet the people making this trip what it is. (${remaining} more ${remaining === 1 ? "spot" : "spots"} filling in soon.)`
              : "Meet the people making this trip what it is."
          }
        />

        {/* Perspective parent for TiltCards */}
        <div
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6"
          style={{ perspective: "1200px" }}
        >
          {PARTICIPANTS.map((p, i) => (
            <RevealOnScroll
              key={p.name}
              delay={i * 0.05}
              y={20}
              className="h-full"
            >
              <TiltCard className="h-full" intensity={6}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col items-center overflow-hidden rounded-3xl p-5 md:p-6",
                    "glass border border-white/40 dark:border-white/10",
                    "shadow-md transition-all duration-500",
                    "hover:border-sunset-300/60 hover:shadow-xl hover:shadow-sunset-500/10",
                    "dark:hover:border-sunset-500/40 dark:hover:shadow-sunset-500/20"
                  )}
                >
                  {/* Soft inner glow */}
                  <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-sunset-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Avatar w/ emoji badge */}
                  <div className="relative">
                    <div
                      className={cn(
                        "relative aspect-square w-full overflow-hidden rounded-2xl",
                        "ring-1 ring-white/40 dark:ring-white/10",
                        "bg-gradient-to-br from-forest-100 via-sunset-100 to-lake-100",
                        "dark:from-forest-900/40 dark:via-sunset-900/30 dark:to-lake-900/40",
                        "transition-transform duration-500 group-hover:scale-[1.03]"
                      )}
                    >
                      <Image
                        src={avatarUrl(p.name)}
                        alt={`${p.name} avatar`}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Emoji decoration top-right */}
                    <span
                      className={cn(
                        "absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full text-lg",
                        "bg-white shadow-lg ring-2 ring-white",
                        "dark:bg-midnight-800 dark:ring-midnight-800",
                        "transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                      )}
                      aria-hidden
                    >
                      {p.emoji}
                    </span>
                  </div>

                  {/* Name + role */}
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight md:text-xl text-stone-900 dark:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] text-stone-500 dark:text-stone-400">
                    {p.role}
                  </p>
                </article>
              </TiltCard>
            </RevealOnScroll>
          ))}

          {remaining > 0 && (
            <RevealOnScroll
              delay={PARTICIPANTS.length * 0.05}
              y={20}
              className="h-full"
            >
              <article
                className={cn(
                  "group relative flex h-full flex-col items-center justify-center rounded-3xl p-5 md:p-6",
                  "border-2 border-dashed border-stone-300/70 dark:border-white/15",
                  "bg-stone-50/40 dark:bg-white/[0.02]",
                  "opacity-70 transition-all duration-500",
                  "hover:opacity-100 hover:border-sunset-400/60 dark:hover:border-sunset-500/40"
                )}
                aria-label={`${remaining} more ${remaining === 1 ? "spot" : "spots"} to be filled`}
              >
                <div className="relative aspect-square w-full">
                  <div
                    className={cn(
                      "flex h-full w-full flex-col items-center justify-center rounded-2xl",
                      "border border-dashed border-stone-300/70 dark:border-white/10",
                      "text-stone-500 dark:text-stone-500"
                    )}
                  >
                    <UserPlus className="h-7 w-7" aria-hidden="true" />
                    <span className="mt-2 font-display text-3xl font-bold">
                      +{remaining}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight md:text-xl text-stone-600 dark:text-stone-400">
                  +{remaining} more
                </h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] text-stone-500 dark:text-stone-500">
                  {remaining === 1 ? "Spot" : "Spots"} filling in
                </p>
              </article>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}
