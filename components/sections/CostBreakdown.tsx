"use client";

import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import {
  Banknote,
  DollarSign,
  Flame,
  Fuel,
  Home,
  Receipt,
  Users,
} from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { COSTS, TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

type CostEntry = (typeof COSTS)[number];

type IconKey = "airbnb" | "groceries" | "gas";

const ICONS: Record<IconKey, typeof Home> = {
  airbnb: Home,
  groceries: Flame,
  gas: Fuel,
};

function resolveIconKey(label: string): IconKey {
  const lower = label.toLowerCase();
  if (lower.includes("airbnb")) return "airbnb";
  if (lower.includes("gas")) return "gas";
  return "groceries";
}

function fmt(value: number) {
  return value.toLocaleString("en-US");
}

type ChartDatum = {
  name: string;
  value: number;
  color: string;
};

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const datum = payload[0]?.payload as ChartDatum | undefined;
  if (!datum) return null;
  return (
    <div className="rounded-2xl border border-white/15 bg-midnight-900/85 px-3 py-2 text-xs text-white shadow-xl backdrop-blur">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: datum.color }}
        />
        <span className="font-medium">{datum.name}</span>
      </div>
      <div className="mt-1 font-display text-base font-bold tabular-nums">
        ${fmt(datum.value)}
      </div>
    </div>
  );
}

type CostCardProps = {
  entry: CostEntry;
  shareOfTotal: number;
  index: number;
};

function CostCard({ entry, shareOfTotal, index }: CostCardProps) {
  const Icon = ICONS[resolveIconKey(entry.label)];
  return (
    <RevealOnScroll y={24} delay={index * 0.08}>
      <article
        className={cn(
          "group relative overflow-hidden rounded-3xl p-6 transition-all duration-500",
          "glass border border-white/40 dark:border-white/10",
          "shadow-lg hover:-translate-y-0.5 hover:shadow-2xl"
        )}
      >
        <div className="flex items-start gap-5">
          {/* Icon disc */}
          <div
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ring-1 ring-white/30"
            style={{
              backgroundColor: entry.color,
              boxShadow: `0 12px 32px -12px ${entry.color}`,
            }}
            aria-hidden
          >
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="truncate font-display text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                {entry.label}
              </h3>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 tabular-nums">
                {Math.round(shareOfTotal * 100)}%
              </span>
            </div>

            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-display text-3xl md:text-4xl font-bold tabular-nums tracking-tight text-stone-900 dark:text-white">
                ${fmt(entry.total)}
              </span>
              <span className="text-sm text-stone-500 dark:text-stone-400 tabular-nums">
                ~${fmt(entry.perPerson)} / person
              </span>
            </div>
          </div>
        </div>

        {/* Share bar */}
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-stone-200/70 dark:bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.round(shareOfTotal * 100)}%`,
              background: `linear-gradient(90deg, ${entry.color}, ${entry.color}aa)`,
              boxShadow: `0 0 18px -4px ${entry.color}`,
            }}
          />
        </div>

        <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-white/[0.05] blur-3xl transition-all duration-700 group-hover:scale-125" />
      </article>
    </RevealOnScroll>
  );
}

export function CostBreakdown() {
  const total = useMemo(
    () => COSTS.reduce((acc, c) => acc + c.total, 0),
    []
  );
  const perPerson = useMemo(
    () => COSTS.reduce((acc, c) => acc + c.perPerson, 0),
    []
  );
  const chartData: ChartDatum[] = useMemo(
    () =>
      COSTS.map((c) => ({
        name: c.label,
        value: c.total,
        color: c.color,
      })),
    []
  );

  return (
    <section
      id="costs"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="costs-title"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest-500/[0.05] to-midnight-900/40" />
        <div className="absolute -top-32 left-1/4 h-[24rem] w-[24rem] rounded-full bg-forest-500/15 blur-[140px]" />
        <div className="absolute bottom-12 -right-24 h-96 w-96 rounded-full bg-sunset-500/15 blur-[150px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="costs-title"
          eyebrow="The Damage"
          title="~$199 per person, all in"
          subtitle="Split twelve ways. Venmo Milo before Friday."
        />

        {/* Top split: cards (left) + pie (right) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Cost cards */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {COSTS.map((entry, i) => (
              <CostCard
                key={entry.label}
                entry={entry}
                shareOfTotal={entry.total / total}
                index={i}
              />
            ))}
          </div>

          {/* Pie chart card */}
          <RevealOnScroll y={28} delay={0.1} className="lg:col-span-5">
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-3xl p-6 md:p-8",
                "glass border border-white/40 dark:border-white/10",
                "shadow-lg"
              )}
            >
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                    Where it goes
                  </h3>
                  <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                    Total split across {COSTS.length} categories
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-forest-500/15 text-forest-600 dark:text-forest-300">
                  <Receipt className="h-5 w-5" />
                </div>
              </header>

              {/* Pie */}
              <figure
                className="relative mt-4 h-[320px] w-full"
                aria-label="Cost breakdown donut chart"
              >
                <figcaption className="sr-only">
                  Trip cost breakdown:{" "}
                  {chartData
                    .map((s) => `${s.name} $${fmt(s.value)}`)
                    .join(", ")}
                  . Total: ${fmt(total)} split across {TRIP.groupSize} friends.
                </figcaption>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={78}
                      outerRadius={120}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {chartData.map((slice) => (
                        <Cell key={slice.name} fill={slice.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} cursor={false} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center label */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                    Trip Total
                  </span>
                  <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-stone-900 dark:text-white">
                    ${fmt(total)}
                  </span>
                  <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                    <Users className="h-3 w-3" aria-hidden="true" /> {TRIP.groupSize} friends
                  </span>
                </div>
              </figure>

              {/* Legend */}
              <ul className="mt-6 flex flex-col gap-2" role="list">
                {chartData.map((slice) => (
                  <li
                    key={slice.name}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex items-center gap-2.5 text-stone-700 dark:text-stone-300">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full ring-2 ring-white/40 dark:ring-white/10"
                        style={{ backgroundColor: slice.color }}
                        aria-hidden
                      />
                      <span className="truncate">{slice.name}</span>
                    </span>
                    <span className="shrink-0 font-medium tabular-nums text-stone-600 dark:text-stone-300">
                      ${fmt(slice.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>
        </div>

        {/* Hero per-person card */}
        <RevealOnScroll y={32} delay={0.2} className="mt-6 md:mt-8">
          <article
            className={cn(
              "relative overflow-hidden rounded-3xl p-8 md:p-12",
              "border border-white/15 bg-gradient-to-br from-midnight-800 via-midnight-900 to-midnight-800",
              "shadow-2xl shadow-sunset-500/10"
            )}
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-32 -left-12 h-72 w-72 rounded-full bg-sunset-500/30 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-12 h-80 w-80 rounded-full bg-forest-500/30 blur-[130px]" />
            <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />

            <div className="relative flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                  <Banknote className="h-3 w-3" />
                  Per-Person Total
                </div>

                <h3 className="mt-5 font-display text-7xl font-bold leading-none tracking-tight md:text-8xl lg:text-[8rem]">
                  <span className="text-gradient-sunset tabular-nums">
                    ${fmt(perPerson)}
                  </span>
                </h3>

                <p className="mt-4 max-w-md text-pretty text-sm md:text-base text-white/70">
                  Split equally between {TRIP.groupSize} friends. Includes
                  Airbnb, food, drinks, firewood and gas. Venmo{" "}
                  <span className="font-medium text-white">@milo</span> by
                  Friday morning.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 md:items-end">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white">
                  <DollarSign className="h-5 w-5 text-sunset-300" />
                  <span className="font-display text-2xl font-bold tabular-nums">
                    ${fmt(total)}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Total
                  </span>
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                  Pay before Friday
                </div>
              </div>
            </div>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  );
}
