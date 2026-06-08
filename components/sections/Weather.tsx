"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  type LucideProps,
} from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

type OpenMeteoResponse = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    /** API returns either `weather_code` (v1+) or legacy `weathercode` depending on version */
    weather_code?: number[];
    weathercode?: number[];
    precipitation_probability_max: number[];
  };
};

type ForecastDay = {
  date: string; // ISO yyyy-mm-dd
  dayName: string;
  highF: number;
  lowF: number;
  precipPct: number;
  code: number;
};

type WmoVibe = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | "foggy";

type WmoMeta = {
  label: string;
  Icon: ComponentType<LucideProps>;
  vibe: WmoVibe;
  gradient: string;
  iconColor: string;
};

function wmoMeta(code: number): WmoMeta {
  if (code === 0) {
    return {
      label: "Clear & Sunny",
      Icon: Sun,
      vibe: "sunny",
      gradient: "from-sunset-400/40 via-gold-400/20 to-transparent",
      iconColor: "text-gold-400 drop-shadow-[0_0_24px_rgba(251,191,36,0.45)]",
    };
  }
  if (code === 1) {
    return {
      label: "Mostly Sunny",
      Icon: Sun,
      vibe: "sunny",
      gradient: "from-sunset-400/35 via-gold-400/15 to-transparent",
      iconColor: "text-gold-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    };
  }
  if (code === 2) {
    return {
      label: "Partly Cloudy",
      Icon: CloudSun,
      vibe: "cloudy",
      gradient: "from-lake-400/30 via-sunset-400/15 to-transparent",
      iconColor: "text-lake-300",
    };
  }
  if (code === 3) {
    return {
      label: "Overcast",
      Icon: Cloud,
      vibe: "cloudy",
      gradient: "from-stone-400/25 via-stone-500/10 to-transparent",
      iconColor: "text-stone-300",
    };
  }
  if (code === 45 || code === 48) {
    return {
      label: "Foggy",
      Icon: CloudFog,
      vibe: "foggy",
      gradient: "from-stone-400/25 via-lake-400/10 to-transparent",
      iconColor: "text-stone-300",
    };
  }
  if (code >= 51 && code <= 57) {
    return {
      label: "Drizzle",
      Icon: CloudDrizzle,
      vibe: "rainy",
      gradient: "from-lake-500/35 via-lake-400/15 to-transparent",
      iconColor: "text-lake-300",
    };
  }
  if (code >= 61 && code <= 67) {
    return {
      label: "Rain",
      Icon: CloudRain,
      vibe: "rainy",
      gradient: "from-lake-500/40 via-lake-400/20 to-transparent",
      iconColor: "text-lake-300",
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      label: "Snow",
      Icon: CloudSnow,
      vibe: "snowy",
      gradient: "from-lake-300/35 via-stone-300/15 to-transparent",
      iconColor: "text-lake-200",
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      label: "Showers",
      Icon: CloudRain,
      vibe: "rainy",
      gradient: "from-lake-500/40 via-lake-400/20 to-transparent",
      iconColor: "text-lake-300",
    };
  }
  if (code >= 95 && code <= 99) {
    return {
      label: "Thunderstorm",
      Icon: CloudLightning,
      vibe: "stormy",
      gradient: "from-campfire-500/40 via-sunset-500/15 to-transparent",
      iconColor: "text-campfire-400",
    };
  }
  return {
    label: "Cloudy",
    Icon: Cloud,
    vibe: "cloudy",
    gradient: "from-stone-400/25 via-stone-500/10 to-transparent",
    iconColor: "text-stone-300",
  };
}

const TRIP_DAYS: { iso: string; dayName: string; displayDate: string }[] = [
  { iso: "2026-07-03", dayName: "Friday", displayDate: "Jul 3" },
  { iso: "2026-07-04", dayName: "Saturday", displayDate: "Jul 4" },
  { iso: "2026-07-05", dayName: "Sunday", displayDate: "Jul 5" },
];

type Status = "idle" | "loading" | "ready" | "too-early" | "error";

function daysUntilTrip(): number {
  const target = new Date(TRIP.startDate).getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

type CardShellProps = {
  dayName: string;
  displayDate: string;
  children: React.ReactNode;
  gradient?: string;
  className?: string;
};

function CardShell({
  dayName,
  displayDate,
  children,
  gradient,
  className,
}: CardShellProps) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl p-6 md:p-7 transition-all duration-500",
        "glass border border-white/40 dark:border-white/10",
        "shadow-lg hover:-translate-y-0.5 hover:shadow-2xl",
        className
      )}
    >
      {gradient && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b opacity-90",
            gradient
          )}
        />
      )}
      <div className="relative flex h-full flex-col">
        <header className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            {dayName}
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
            {displayDate}
          </span>
        </header>
        {children}
      </div>
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-white/[0.05] blur-3xl transition-all duration-700 group-hover:scale-125" />
    </article>
  );
}

type ForecastCardProps = {
  forecast: ForecastDay;
  dayName: string;
  displayDate: string;
};

function ForecastCard({
  forecast,
  dayName,
  displayDate,
}: ForecastCardProps) {
  const meta = wmoMeta(forecast.code);
  const Icon = meta.Icon;

  return (
    <CardShell
      dayName={dayName}
      displayDate={displayDate}
      gradient={meta.gradient}
    >
      {/* Icon */}
      <div className="mt-4 flex items-center justify-center">
        <Icon className={cn("h-20 w-20 md:h-24 md:w-24", meta.iconColor)} strokeWidth={1.5} />
      </div>

      {/* Temps */}
      <div className="mt-4 flex items-baseline justify-center gap-3">
        <span className="font-display text-5xl md:text-6xl font-bold tabular-nums tracking-tight text-stone-900 dark:text-white">
          {Math.round(forecast.highF)}
          <span className="text-2xl text-stone-400">°</span>
        </span>
        <span className="text-lg font-medium tabular-nums text-stone-500 dark:text-stone-400">
          / {Math.round(forecast.lowF)}°
        </span>
      </div>

      {/* Label */}
      <p className="mt-2 text-center text-sm font-medium text-stone-700 dark:text-stone-200">
        {meta.label}
      </p>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-white/40 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.03] px-2.5 py-2 text-xs">
          <Droplets className="h-3.5 w-3.5 text-lake-400" />
          <span className="text-stone-500 dark:text-stone-400">Precip</span>
          <span className="ml-auto font-semibold tabular-nums text-stone-800 dark:text-white">
            {forecast.precipPct}%
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/40 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.03] px-2.5 py-2 text-xs">
          <Thermometer className="h-3.5 w-3.5 text-sunset-400" />
          <span className="text-stone-500 dark:text-stone-400">Feels</span>
          <span className="ml-auto font-semibold tabular-nums text-stone-800 dark:text-white">
            {Math.round(forecast.highF)}°
          </span>
        </div>
      </div>
    </CardShell>
  );
}

type PlaceholderCardProps = {
  dayName: string;
  displayDate: string;
  message: string;
};

function PlaceholderCard({
  dayName,
  displayDate,
  message,
}: PlaceholderCardProps) {
  return (
    <CardShell
      dayName={dayName}
      displayDate={displayDate}
      gradient="from-lake-400/15 via-sunset-400/10 to-transparent"
      className="opacity-95"
    >
      <div className="mt-4 flex items-center justify-center">
        <div className="relative">
          <Sun
            className="h-20 w-20 text-gold-400/70 drop-shadow-[0_0_24px_rgba(251,191,36,0.35)]"
            strokeWidth={1.5}
          />
          <Cloud
            className="absolute -bottom-2 -right-3 h-12 w-12 text-stone-300/80 dark:text-stone-400/80"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-center gap-3">
        <span className="font-display text-5xl font-bold tabular-nums tracking-tight text-stone-400 dark:text-stone-500">
          --
          <span className="text-2xl text-stone-300 dark:text-stone-600">°</span>
        </span>
      </div>

      <p className="mt-2 text-center text-sm font-medium text-stone-500 dark:text-stone-400">
        Forecast pending
      </p>

      <p className="mt-4 rounded-xl border border-white/40 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.03] px-3 py-2 text-center text-xs text-stone-600 dark:text-stone-400">
        {message}
      </p>
    </CardShell>
  );
}

function SkeletonCard({
  dayName,
  displayDate,
}: {
  dayName: string;
  displayDate: string;
}) {
  return (
    <CardShell dayName={dayName} displayDate={displayDate}>
      <div className="mt-4 flex items-center justify-center">
        <div className="h-20 w-20 animate-pulse rounded-full bg-stone-200/70 dark:bg-white/[0.06]" />
      </div>
      <div className="mt-4 flex justify-center">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-stone-200/70 dark:bg-white/[0.06]" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-9 animate-pulse rounded-xl bg-stone-200/70 dark:bg-white/[0.06]" />
        <div className="h-9 animate-pulse rounded-xl bg-stone-200/70 dark:bg-white/[0.06]" />
      </div>
    </CardShell>
  );
}

const PLACEHOLDER_MESSAGE =
  "Forecast available closer to the trip date. Check back in late June 2026.";

export function Weather() {
  const [status, setStatus] = useState<Status>("idle");
  const [forecast, setForecast] = useState<Record<string, ForecastDay>>({});

  useEffect(() => {
    const days = daysUntilTrip();
    if (days > 14) {
      setStatus("too-early");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TRIP.airbnbCoords.lat}&longitude=${TRIP.airbnbCoords.lng}&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&temperature_unit=fahrenheit&timezone=America/New_York&forecast_days=14`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const len = Number(res.headers.get("content-length") ?? 0);
        if (len > 50_000) throw new Error("Forecast response too large");
        return res.json() as Promise<OpenMeteoResponse>;
      })
      .then((data) => {
        if (
          !data?.daily?.time ||
          !Array.isArray(data.daily.time) ||
          data.daily.time.length === 0 ||
          data.daily.time.length > 30
        ) {
          throw new Error("Unexpected forecast response shape");
        }
        const codes =
          data.daily.weather_code ?? data.daily.weathercode ?? [];
        const map: Record<string, ForecastDay> = Object.create(null);
        data.daily.time.forEach((iso, i) => {
          const d = new Date(iso + "T12:00:00");
          map[iso] = {
            date: iso,
            dayName: d.toLocaleDateString("en-US", { weekday: "long" }),
            highF: data.daily.temperature_2m_max[i],
            lowF: data.daily.temperature_2m_min[i],
            code: codes[i] ?? 0,
            precipPct: data.daily.precipitation_probability_max[i] ?? 0,
          };
        });
        setForecast(map);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
    <section
      id="weather"
      className="relative py-24 md:py-32"
      aria-labelledby="weather-title"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 right-1/4 h-[24rem] w-[24rem] rounded-full bg-sunset-500/15 blur-[140px]" />
        <div className="absolute bottom-12 -left-24 h-80 w-80 rounded-full bg-lake-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="weather-title"
          eyebrow="What to Expect"
          title="Weekend Forecast"
          subtitle="Live forecast from Open-Meteo for the Poconos region."
        />

        {/* Status pill */}
        <RevealOnScroll y={16} className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] px-3 py-1 backdrop-blur">
              <Wind className="h-3 w-3" />
              {status === "too-early" && "Too far out — placeholder shown"}
              {status === "loading" && "Fetching live forecast…"}
              {status === "ready" && "Live data from Open-Meteo"}
              {status === "error" && "Couldn't reach Open-Meteo"}
              {status === "idle" && "Preparing forecast…"}
            </span>
          </div>
        </RevealOnScroll>

        {/* Cards — single reveal observer per card, no double-wrap */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TRIP_DAYS.map((day, i) => {
            const data = forecast[day.iso];
            const delay = 0.05 + i * 0.06;

            if (status === "loading") {
              return (
                <RevealOnScroll
                  key={day.iso}
                  delay={delay}
                  y={20}
                  className="h-full"
                >
                  <SkeletonCard
                    dayName={day.dayName}
                    displayDate={day.displayDate}
                  />
                </RevealOnScroll>
              );
            }

            if (status === "ready" && data) {
              return (
                <RevealOnScroll
                  key={day.iso}
                  delay={delay}
                  y={20}
                  className="h-full"
                >
                  <ForecastCard
                    forecast={data}
                    dayName={day.dayName}
                    displayDate={day.displayDate}
                  />
                </RevealOnScroll>
              );
            }

            const msg =
              status === "error"
                ? "Couldn't load forecast. Check back later."
                : PLACEHOLDER_MESSAGE;

            return (
              <RevealOnScroll
                key={day.iso}
                delay={delay}
                y={20}
                className="h-full"
              >
                <PlaceholderCard
                  dayName={day.dayName}
                  displayDate={day.displayDate}
                  message={msg}
                />
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-6 text-xs text-stone-500 dark:text-stone-500">
          Forecast data &copy;{" "}
          <a
            href="https://open-meteo.com"
            className="underline decoration-stone-400/40 underline-offset-2 hover:text-sunset-400"
            target="_blank"
            rel="noreferrer"
          >
            Open-Meteo
          </a>
          . Updates each visit.
        </p>
      </div>
    </section>
  );
}
