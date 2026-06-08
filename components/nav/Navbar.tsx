"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Mountain, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#participants", label: "Crew" },
  { href: "#airbnb", label: "Airbnb" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#activities", label: "Activities" },
  { href: "#costs", label: "Costs" },
  { href: "#packing", label: "Packing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Boolean threshold beats per-frame backdropFilter animation
  // (backdrop-filter is one of the most expensive CSS properties to animate).
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-midnight-900/85 backdrop-blur-lg backdrop-saturate-150 border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <a
            href="#top"
            className="flex items-center gap-2 rounded-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Poconos 2026 home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-sunset shadow-lg ring-1 ring-white/20">
              <Mountain className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-base font-bold tracking-tight">
              Poconos &apos;26
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={false}
          animate={{ x: open ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 240 }}
          className="absolute right-0 top-0 h-full w-72 glass-dark p-6 pt-24"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </>
  );
}
