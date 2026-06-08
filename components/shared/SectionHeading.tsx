"use client";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: Props) {
  return (
    <RevealOnScroll
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 rounded-full border border-forest-200/60 dark:border-forest-700/40 bg-forest-50/60 dark:bg-forest-950/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-forest-700 dark:text-forest-300",
            align === "center" && "justify-center"
          )}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-sunset-500 animate-pulse"
            aria-hidden="true"
          />
          {eyebrow}
        </div>
      )}
      <h2
        id={id}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-pretty text-stone-700 dark:text-stone-300">
          {subtitle}
        </p>
      )}
    </RevealOnScroll>
  );
}
