"use client";

import Image from "next/image";
import {
  Bed,
  Calendar,
  Check,
  ChefHat,
  ExternalLink,
  Flame,
  Gamepad2,
  type LucideIcon,
  Droplets,
  Utensils,
  Wifi,
} from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AMENITIES, SLEEPING, TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

const CABIN_PHOTOS = {
  hero: {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern wooden cabin with sunset views",
  },
  small: [
    {
      src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80",
      alt: "Cozy cabin interior",
    },
    {
      src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=600&q=80",
      alt: "Forest cabin amongst trees",
    },
    {
      src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
      alt: "Cabin deck with mountain view",
    },
  ],
};

function amenityIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("wi-fi") || n.includes("wifi")) return Wifi;
  if (n.includes("fire pit") || n.includes("heating")) return Flame;
  if (n.includes("hot tub")) return Droplets;
  if (n.includes("grill")) return ChefHat;
  if (n.includes("game")) return Gamepad2;
  if (n.includes("kitchen")) return Utensils;
  return Check;
}

export function AirbnbSection() {
  return (
    <section
      id="airbnb"
      className="relative py-24 md:py-32"
      aria-labelledby="airbnb-title"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 right-1/3 h-[28rem] w-[28rem] rounded-full bg-forest-600/10 blur-[150px]" />
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-sunset-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="airbnb-title"
          eyebrow="Where We're Staying"
          title="The Cabin"
          subtitle="Luxury Airbnb in the Poconos Mountains — eight beds, hot tub, fire pit, and a view."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          {/* LEFT: photo collage */}
          <RevealOnScroll delay={0.05} y={28}>
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-3 md:gap-4">
              {/* Hero photo */}
              <div className="group relative col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/10">
                <Image
                  src={CABIN_PHOTOS.hero.src}
                  alt={CABIN_PHOTOS.hero.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
                    Featured
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    Poconos, PA
                  </span>
                </div>
              </div>

              {/* Small photos */}
              {CABIN_PHOTOS.small.map((p, i) => (
                <div
                  key={p.src}
                  className={cn(
                    "group relative col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10",
                    "aspect-square"
                  )}
                  style={{ minHeight: "8rem" }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                      Interior
                    </span>
                  )}
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* RIGHT: info card */}
          <RevealOnScroll delay={0.15} y={28}>
            <div className="glass relative h-full overflow-hidden rounded-3xl border border-white/40 p-7 dark:border-white/10 md:p-9">
              {/* Decorative gradient */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sunset-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-forest-500/15 blur-3xl" />

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-stone-200/60 pb-5 dark:border-white/10">
                <Stat value="12" label="guests" />
                <Divider />
                <Stat value="6" label="bedrooms" />
                <Divider />
                <Stat value="8" label="beds" />
              </div>

              {/* Sleeping */}
              <div className="mt-6">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Sleeping arrangements
                </h3>
                <ul className="mt-4 space-y-2">
                  {SLEEPING.map((s) => (
                    <li
                      key={s.room}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5",
                        "bg-white/40 dark:bg-white/[0.03]",
                        "border border-stone-200/40 dark:border-white/5"
                      )}
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-forest-500/15 text-forest-600 dark:text-forest-300">
                        <Bed className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-stone-800 dark:text-stone-100">
                        {s.room}
                      </span>
                      <span className="ml-auto text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {s.config}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div className="mt-7">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Amenities
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {AMENITIES.map((a) => {
                    const Icon = amenityIcon(a);
                    return (
                      <li
                        key={a}
                        className={cn(
                          "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium",
                          "border border-stone-200/60 bg-white/60 text-stone-700",
                          "dark:border-white/10 dark:bg-white/5 dark:text-stone-200",
                          "transition hover:-translate-y-0.5 hover:border-sunset-300/60 hover:text-sunset-700",
                          "dark:hover:border-sunset-500/40 dark:hover:text-sunset-200"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-sunset-500" />
                        <span className="truncate">{a}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Arrive / depart */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ArriveDepartCard
                  label="Arrival"
                  primary="July 3"
                  secondary="3:00 PM"
                  accent="from-forest-500/15 to-forest-500/5 border-forest-500/30 text-forest-700 dark:text-forest-300"
                />
                <ArriveDepartCard
                  label="Departure"
                  primary="July 5"
                  secondary="11:00 AM"
                  accent="from-sunset-500/15 to-sunset-500/5 border-sunset-500/30 text-sunset-700 dark:text-sunset-300"
                />
              </div>

              {/* CTA */}
              <a
                href={TRIP.airbnbUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4",
                  "bg-gradient-sunset text-sm font-semibold text-white",
                  "shadow-xl shadow-sunset-500/30 ring-1 ring-white/20",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-sunset-500/40",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-300 focus-visible:ring-offset-2"
                )}
                aria-label="Open on Airbnb (opens in new tab)"
              >
                <span className="relative z-10">Open on Airbnb</span>
                <ExternalLink className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -z-0 bg-gradient-sunset opacity-0 blur-xl transition group-hover:opacity-60" />
              </a>
              <p className="mt-3 text-center text-[11px] text-stone-500 dark:text-stone-400">
                Opens in a new tab · airbnb.com
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-2xl font-bold tracking-tight md:text-3xl text-stone-900 dark:text-white">
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <span
      className="hidden h-6 w-px bg-stone-300/60 dark:bg-white/10 sm:block"
      aria-hidden
    />
  );
}

function ArriveDepartCard({
  label,
  primary,
  secondary,
  accent,
}: {
  label: string;
  primary: string;
  secondary: string;
  accent: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4",
        accent
      )}
    >
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]">
        <Calendar className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
          {primary}
        </span>
        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
          {secondary}
        </span>
      </div>
    </div>
  );
}
