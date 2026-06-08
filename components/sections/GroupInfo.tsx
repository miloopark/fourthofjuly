"use client";

import { Pencil, StickyNote, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GROUP_ROLES } from "@/lib/trip-data";
import { useLocalStorage } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

type RoleKey = (typeof GROUP_ROLES)[number]["key"];

const ROLE_ACCENTS: Record<
  RoleKey,
  {
    border: string;
    focus: string;
    glow: string;
    chip: string;
    wash: string;
  }
> = {
  cars: {
    border: "border-forest-300/50 dark:border-forest-500/30",
    focus:
      "focus-within:border-forest-400 focus-within:shadow-forest-500/20 dark:focus-within:border-forest-400/70",
    glow: "shadow-forest-500/10",
    chip: "bg-forest-500/15 text-forest-600 dark:text-forest-300",
    wash: "from-forest-400/20 via-transparent to-transparent",
  },
  groceries: {
    border: "border-sunset-300/50 dark:border-sunset-500/30",
    focus:
      "focus-within:border-sunset-400 focus-within:shadow-sunset-500/20 dark:focus-within:border-sunset-400/70",
    glow: "shadow-sunset-500/10",
    chip: "bg-sunset-500/15 text-sunset-600 dark:text-sunset-300",
    wash: "from-sunset-400/20 via-transparent to-transparent",
  },
  grill: {
    border: "border-campfire-400/50 dark:border-campfire-500/30",
    focus:
      "focus-within:border-campfire-400 focus-within:shadow-campfire-500/20 dark:focus-within:border-campfire-400/70",
    glow: "shadow-campfire-500/10",
    chip: "bg-campfire-500/15 text-campfire-500 dark:text-campfire-400",
    wash: "from-campfire-400/20 via-transparent to-transparent",
  },
  drinks: {
    border: "border-gold-400/50 dark:border-gold-500/30",
    focus:
      "focus-within:border-gold-400 focus-within:shadow-gold-500/20 dark:focus-within:border-gold-400/70",
    glow: "shadow-gold-500/10",
    chip: "bg-gold-500/15 text-gold-600 dark:text-gold-400",
    wash: "from-gold-400/20 via-transparent to-transparent",
  },
  cleanup: {
    border: "border-lake-300/50 dark:border-lake-500/30",
    focus:
      "focus-within:border-lake-400 focus-within:shadow-lake-500/20 dark:focus-within:border-lake-400/70",
    glow: "shadow-lake-500/10",
    chip: "bg-lake-500/15 text-lake-600 dark:text-lake-300",
    wash: "from-lake-400/20 via-transparent to-transparent",
  },
};

type RoleCardProps = {
  roleKey: RoleKey;
  label: string;
  icon: string;
  placeholder: string;
};

function RoleCard({ roleKey, label, icon, placeholder }: RoleCardProps) {
  const { value, setValue, hydrated } = useLocalStorage<string>(
    `poconos-group-${roleKey}`,
    ""
  );
  const accent = ROLE_ACCENTS[roleKey];
  const displayValue = hydrated ? value : "";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl p-6",
        "glass border transition-all duration-500",
        accent.border,
        accent.focus,
        accent.glow,
        "hover:-translate-y-0.5 hover:shadow-xl"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b opacity-60 transition-opacity duration-500 group-hover:opacity-100",
          accent.wash
        )}
      />

      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-2xl text-2xl",
              accent.chip
            )}
            aria-hidden
          >
            {icon}
          </span>
          <h3 className="font-display text-lg font-bold tracking-tight text-stone-900 dark:text-white md:text-xl">
            {label}
          </h3>
        </div>
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/60 text-stone-400 ring-1 ring-stone-200/70 dark:bg-white/5 dark:text-stone-500 dark:ring-white/10"
          aria-hidden
          title="Editable"
        >
          <Pencil className="h-3.5 w-3.5" />
        </span>
      </header>

      <label className="sr-only" htmlFor={`role-${roleKey}`}>
        {label} notes
      </label>
      <textarea
        id={`role-${roleKey}`}
        value={displayValue}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={cn(
          "w-full flex-1 resize-y rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm leading-relaxed text-stone-700 outline-none transition",
          "max-h-72 placeholder:text-stone-400",
          "focus:border-stone-200 focus:bg-white",
          "dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-white/10 dark:focus:bg-white/10"
        )}
      />

      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
        Saved locally
      </p>
    </article>
  );
}

const ROLE_PLACEHOLDERS: Record<RoleKey, string> = {
  cars: "Milo's car: Milo, Thanh, Freya\nBrian's car: Brian, Sally, Sav\n…",
  groceries:
    "Freya — breakfast supplies\nGavin — burger fixings\nSophia — snacks…",
  grill: "Gavin lead. Burgers, dogs, corn. Sauce committee TBD.",
  drinks: "Sophia heading drinks. Beer, wine, mixers, ice run Saturday AM.",
  cleanup:
    "Sunday morning sweep. Trash to curb. Dishes split between two crews.",
};

export function GroupInfo() {
  const { value: notes, setValue: setNotes, hydrated } = useLocalStorage<string>(
    "poconos-group-notes",
    ""
  );

  return (
    <section
      id="group"
      className="relative py-24 md:py-32"
      aria-labelledby="group-title"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-forest-500/10 blur-[140px]" />
        <div className="absolute bottom-12 right-1/4 h-80 w-80 rounded-full bg-sunset-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="group-title"
          eyebrow="Who's On What"
          title="Roles & responsibilities"
          subtitle="Edit your assignments. Saved locally on your device."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GROUP_ROLES.map((role, i) => (
            <RevealOnScroll
              key={role.key}
              delay={0.05 + i * 0.06}
              y={24}
              className="h-full"
            >
              <RoleCard
                roleKey={role.key}
                label={role.label}
                icon={role.icon}
                placeholder={ROLE_PLACEHOLDERS[role.key]}
              />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4} y={20} className="mt-8 md:mt-10">
          <article
            className={cn(
              "group relative overflow-hidden rounded-3xl p-6 md:p-8",
              "glass border border-stone-200/60 dark:border-white/10",
              "focus-within:border-sunset-300 focus-within:shadow-xl focus-within:shadow-sunset-500/10",
              "dark:focus-within:border-sunset-500/40 dark:focus-within:shadow-sunset-500/10"
            )}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-sunset-400/15 via-transparent to-transparent" />

            <header className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-sunset text-white shadow-md shadow-sunset-500/30">
                  <StickyNote className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-stone-900 dark:text-white md:text-2xl">
                    Shared Notes
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                    Shared notes for the whole group
                  </p>
                </div>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500 ring-1 ring-stone-200/60 sm:inline-flex dark:bg-white/5 dark:text-stone-400 dark:ring-white/10">
                <Users className="h-3 w-3" /> Group
              </span>
            </header>

            <label className="sr-only" htmlFor="group-shared-notes">
              Shared notes
            </label>
            <textarea
              id="group-shared-notes"
              value={hydrated ? notes : ""}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything the whole group needs to know — pickup times, allergies, gear we're missing, who's bringing the speaker, etc."
              rows={6}
              className={cn(
                "w-full resize-y rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm leading-relaxed text-stone-700 outline-none transition",
                "min-h-[10rem] max-h-[24rem] placeholder:text-stone-400",
                "focus:border-stone-200 focus:bg-white",
                "dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-white/10 dark:focus:bg-white/10"
              )}
            />

            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
              Saved locally on your device
            </p>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  );
}
