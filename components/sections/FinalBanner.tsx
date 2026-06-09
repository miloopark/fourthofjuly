"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, ExternalLink, Infinity as InfinityIcon, Sparkles, Users } from "lucide-react";
import { Countdown } from "@/components/shared/Countdown";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

type HeadlineLine = {
  text: string;
  accent?: boolean;
};

const HEADLINE: HeadlineLine[] = [
  { text: "One Weekend." },
  { text: "Ten Friends.", accent: true },
  { text: "Countless Memories." },
];

const STATS: Array<{ value: string; label: string; icon: React.ReactNode }> = [
  {
    value: "10",
    label: "Friends",
    icon: <Users className="h-3.5 w-3.5" />,
  },
  {
    value: "3",
    label: "Days",
    icon: <Sparkles className="h-3.5 w-3.5" />,
  },
  {
    value: "∞",
    label: "Memories",
    icon: <InfinityIcon className="h-3.5 w-3.5" />,
  },
];

export function FinalBanner() {
  return (
    <section
      id="final"
      className="relative overflow-hidden bg-midnight-900 py-32 text-white md:py-40"
      aria-labelledby="final-title"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80"
          alt="Mountain range at sunset"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
      </div>

      {/* Layered gradients */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-midnight-900/70 via-midnight-900/50 to-midnight-900" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_bottom,_rgba(249,115,22,0.35)_0%,_rgba(249,115,22,0.1)_30%,_transparent_60%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,15,28,0.4)_70%)]" />

      {/* Floating glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-sunset-500/25 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-campfire-500/20 blur-[180px]" />

      {/* Noise */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-25 mix-blend-overlay" />

      <RevealOnScroll y={36}>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
          {/* Eyebrow tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-sunset-400/30 bg-sunset-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-sunset-200 backdrop-blur md:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sunset-400 animate-pulse" />
            <span>The end of the page, the beginning of the story</span>
          </motion.div>

          {/* Headline */}
          <h2
            id="final-title"
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-8xl"
          >
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.85,
                  delay: 0.18 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "block",
                  line.accent ? "text-gradient-sunset" : "text-white/95"
                )}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 md:mt-16"
          >
            <Countdown targetIso={TRIP.startDate} size="md" />
          </motion.div>

          {/* Stats row */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4"
            aria-label="Trip in numbers"
          >
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur",
                  "transition-colors hover:border-sunset-400/40 hover:bg-white/10"
                )}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sunset-200">
                  {stat.icon}
                </span>
                <span className="font-display text-base font-bold tracking-tight text-white md:text-lg">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65 md:text-xs">
                  {stat.label}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="#top"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Back to top
            </a>
            <a
              href={TRIP.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sunset px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-sunset-500/30 ring-1 ring-white/20 transition hover:scale-[1.02]"
            >
              Open Airbnb
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="absolute inset-0 -z-10 rounded-full bg-gradient-sunset opacity-0 blur-xl transition group-hover:opacity-60" />
            </a>
          </motion.div>

          {/* Closing micro-tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-10 max-w-md text-pretty text-xs text-white/55 md:text-sm"
          >
            See you in the Poconos.
          </motion.p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
