"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCountdown } from "@/lib/use-countdown";
import { cn } from "@/lib/utils";

type Props = {
  targetIso: string;
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
};

const sizeStyles = {
  sm: {
    digit: "text-2xl md:text-3xl",
    label: "text-[10px]",
    box: "px-3 py-2 min-w-[3.5rem]",
    gap: "gap-2",
  },
  md: {
    digit: "text-4xl md:text-5xl",
    label: "text-xs",
    box: "px-4 py-3 min-w-[5rem]",
    gap: "gap-3",
  },
  lg: {
    digit: "text-5xl md:text-6xl lg:text-7xl",
    label: "text-sm",
    box: "px-5 py-4 min-w-[6rem]",
    gap: "gap-4",
  },
  hero: {
    digit:
      "text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-none",
    label:
      "text-[10px] tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] md:text-sm md:tracking-[0.25em]",
    box: "px-2.5 sm:px-6 md:px-8 py-3 md:py-6 min-w-[4.25rem] sm:min-w-[7rem] md:min-w-[10rem] lg:min-w-[12rem]",
    gap: "gap-1.5 sm:gap-3 md:gap-5",
  },
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown({ targetIso, size = "md", className }: Props) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetIso);
  const prefersReduced = useReducedMotion();
  const s = sizeStyles[size];

  if (isPast) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3 text-white shadow-lg",
          className
        )}
      >
        <span className="text-2xl" aria-hidden="true">
          🎉
        </span>
        <span className="font-display text-lg font-semibold">
          We&apos;re here!
        </span>
      </div>
    );
  }

  const cells: Array<{ label: string; value: number }> = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  const summary = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;

  return (
    <div
      className={cn("flex items-center justify-center", s.gap, className)}
      role="timer"
      aria-label={summary}
      suppressHydrationWarning
    >
      <span className="sr-only" suppressHydrationWarning>
        {summary}
      </span>
      {cells.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center" aria-hidden="true">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl md:rounded-3xl",
              size === "hero"
                ? "glass-dark text-white shadow-2xl shadow-black/40 ring-1 ring-white/10"
                : "glass shadow-lg",
              s.box
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={value}
                initial={
                  prefersReduced ? { opacity: 1, y: 0 } : { y: "60%", opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={
                  prefersReduced ? { opacity: 0 } : { y: "-60%", opacity: 0 }
                }
                transition={{
                  duration: prefersReduced ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "font-display font-bold tabular-nums tracking-tight",
                  s.digit,
                  size === "hero" &&
                    "bg-gradient-to-b from-white via-white to-sunset-200 bg-clip-text text-transparent"
                )}
                suppressHydrationWarning
              >
                {pad(value)}
              </motion.div>
            </AnimatePresence>
            {size === "hero" && (
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent" />
            )}
          </div>
          <span
            className={cn(
              "mt-2 md:mt-3 font-medium uppercase",
              s.label,
              size === "hero"
                ? "text-white/70"
                : "text-stone-600 dark:text-stone-400"
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
