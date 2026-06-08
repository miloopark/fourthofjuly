"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import { ACTIVITIES } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

export function Activities() {
  return (
    <section
      id="activities"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="activities-title"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sunset-500/[0.04] to-transparent" />
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-forest-500/15 blur-[150px]" />
        <div className="absolute -right-32 bottom-32 h-[28rem] w-[28rem] rounded-full bg-sunset-500/15 blur-[160px]" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lake-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="activities-title"
          eyebrow="What We're Doing"
          title="10 ways we're spending the weekend"
          subtitle="From sunrise hikes to sunset grilling to 2 a.m. dancing."
        />

        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-6"
          style={{ perspective: "1200px" }}
        >
          {ACTIVITIES.map((activity, i) => (
            <RevealOnScroll
              key={activity.title}
              delay={i * 0.04}
              y={20}
              className="h-full"
            >
              <TiltCard className="h-full" intensity={5}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl",
                    "aspect-[4/5]",
                    "shadow-lg ring-1 ring-white/10",
                    "transition-all duration-500",
                    "hover:scale-[1.03] hover:shadow-2xl"
                  )}
                >
                  {/* Image */}
                  <Image
                    src={activity.img}
                    alt={`${activity.title} — ${activity.desc}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                  />

                  {/* Colored gradient overlay from data accent */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-85",
                      activity.accent
                    )}
                  />

                  {/* Bottom dark overlay for text legibility */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                  {/* Subtle inner ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

                  {/* Number badge */}
                  <div className="absolute left-3 top-3 z-10">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center rounded-full bg-white/15 px-2.5 py-0.5",
                        "text-[10px] font-semibold tracking-[0.15em] text-white backdrop-blur",
                        "ring-1 ring-white/20"
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
                    <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md md:text-2xl">
                      {activity.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-xs leading-snug text-white/80 md:text-sm",
                        "transition-all duration-500",
                        "line-clamp-2"
                      )}
                    >
                      {activity.desc}
                    </p>
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
