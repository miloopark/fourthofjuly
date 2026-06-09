"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar, ExternalLink, MapPin, Users } from "lucide-react";
import { useRef } from "react";
import { Countdown } from "@/components/shared/Countdown";
import { TRIP } from "@/lib/trip-data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax: mountain drifts up, content fades, countdown gently scales
  const mountainY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-midnight-900"
    >
      {/* Hero backdrop — custom group illustration */}
      <motion.div style={{ y: mountainY }} className="absolute inset-0 -z-20">
        <Image
          src="/homepage.png"
          alt="The crew illustrated into a mountain lake scene"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Atmospheric gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight-900/40 via-midnight-900/60 to-midnight-900" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,15,28,0.5)_70%)]" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-20 mix-blend-overlay" />

      {/* Floating glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-sunset-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-96 w-96 rounded-full bg-forest-500/30 blur-[140px]" />

      {/* Main content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-28 pb-24 text-center text-white md:pt-32 md:pb-28"
      >
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sunset-400 animate-pulse" />
          The Countdown Is On
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl"
        >
          <span className="block text-white/95">Poconos Mountains</span>
          <span className="mt-1 block text-gradient-sunset">
            July 3–5, 2026
          </span>
        </motion.h1>

        {/* The massive countdown — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="my-10 md:my-14 w-full"
        >
          <Countdown targetIso={TRIP.startDate} size="hero" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl text-base text-pretty text-white/80 md:text-lg"
        >
          {TRIP.tagline}
        </motion.p>

        {/* Quick info row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
        >
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" /> Jul 3 – Jul 5
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden="true" /> 12 Friends
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Poconos, PA
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#itinerary"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sunset px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-sunset-500/30 ring-1 ring-white/20 transition hover:scale-[1.02] hover:shadow-sunset-500/40"
          >
            View Itinerary
            <span className="absolute inset-0 -z-10 rounded-full bg-gradient-sunset opacity-0 blur-xl transition group-hover:opacity-60" />
          </a>
          <a
            href="#costs"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Trip Costs
          </a>
          <a
            href={TRIP.airbnbUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Airbnb <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#overview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/50 transition hover:text-white"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
