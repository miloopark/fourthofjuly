"use client";

import { Camera, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

type Tile = {
  gradient: string;
  aspect: string;
  badge?: boolean;
};

const GALLERY_TILES: Tile[] = [
  {
    gradient: "from-forest-500 via-forest-600 to-forest-800",
    aspect: "aspect-[4/5]",
  },
  {
    gradient: "from-sunset-400 via-sunset-500 to-campfire-600",
    aspect: "aspect-square",
    badge: true,
  },
  {
    gradient: "from-lake-400 via-lake-500 to-lake-700",
    aspect: "aspect-[5/4]",
  },
  {
    gradient: "from-gold-400 via-sunset-500 to-campfire-500",
    aspect: "aspect-[3/4]",
  },
  {
    gradient: "from-campfire-500 via-campfire-600 to-midnight-800",
    aspect: "aspect-square",
  },
  {
    gradient: "from-forest-400 via-lake-500 to-lake-700",
    aspect: "aspect-[4/5]",
    badge: true,
  },
  {
    gradient: "from-sunset-500 via-gold-500 to-gold-600",
    aspect: "aspect-[5/4]",
  },
  {
    gradient: "from-lake-500 via-forest-500 to-forest-700",
    aspect: "aspect-[3/4]",
  },
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="gallery-title"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-sunset-500/10 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-forest-500/10 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-lake-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="gallery-title"
          eyebrow="Memories Pending"
          title="The gallery awaits"
          subtitle="Add photos here after the trip. (Or before, if you can't wait.)"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {GALLERY_TILES.map((tile, i) => (
            <RevealOnScroll
              key={tile.gradient}
              delay={0.04 + i * 0.05}
              y={20}
              className={cn(
                // Make a couple of tiles span 2 rows for masonry feel on lg+
                i === 0 && "lg:row-span-2",
                i === 5 && "md:row-span-2"
              )}
            >
              <figure
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl",
                  "glass border border-white/40 dark:border-white/10",
                  "shadow-md transition-all duration-500",
                  "hover:scale-[1.02] hover:shadow-2xl"
                )}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    tile.aspect,
                    "bg-gradient-to-br",
                    tile.gradient
                  )}
                >
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                  {/* Hover shift */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 transition-all duration-500 group-hover:from-white/5 group-hover:to-white/15" />

                  {/* Centered icon + label */}
                  <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/85">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/25 transition-transform duration-500 group-hover:scale-110">
                      <Camera className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] drop-shadow-sm">
                      Photo {i + 1}
                    </span>
                  </figcaption>

                  {/* Coming soon badge */}
                  {tile.badge && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-stone-700 shadow-sm backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sunset-500" />
                      Coming Soon
                    </span>
                  )}
                </div>
              </figure>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.45} y={20} className="mt-10 md:mt-14">
          <div className="mx-auto max-w-2xl">
            <div
              className={cn(
                "group relative overflow-hidden rounded-3xl p-6 md:p-8",
                "glass border border-dashed border-stone-300/70 dark:border-white/15",
                "text-center transition-all duration-500",
                "hover:border-sunset-300/70 hover:shadow-xl dark:hover:border-sunset-500/40"
              )}
            >
              <div className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-sunset-400/15 via-transparent to-transparent" />

              <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-sunset text-white shadow-md shadow-sunset-500/30">
                <Sparkles className="h-5 w-5" />
              </span>

              <h3 className="font-display text-xl font-bold tracking-tight text-stone-900 dark:text-white md:text-2xl">
                Upload photos
              </h3>
              <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-300">
                Coming after the trip
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
