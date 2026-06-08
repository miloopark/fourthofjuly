"use client";

import dynamic from "next/dynamic";
import {
  AlertTriangle,
  ExternalLink,
  Gauge,
  MapPin,
  Navigation,
  Timer,
} from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TRIP } from "@/lib/trip-data";
import { cn } from "@/lib/utils";

type DirectionStep = {
  text: string;
  detail: string;
};

const DIRECTIONS: DirectionStep[] = [
  {
    text: "Head north on Roemerville Rd",
    detail: "Out of the cabin driveway",
  },
  {
    text: "Right onto PA-507 N",
    detail: "Continue for ~8 mi past the lake views",
  },
  {
    text: "Left onto Pickerel Point Rd",
    detail: "Follow signs for Promised Land State Park",
  },
  {
    text: "Arrive at Promised Land Beach lot",
    detail: "Park, grab floaties, head to the sand",
  },
];

const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&origin=${TRIP.airbnbCoords.lat},${TRIP.airbnbCoords.lng}&destination=${TRIP.promisedLandCoords.lat},${TRIP.promisedLandCoords.lng}`;

// Skeleton while the Leaflet bundle loads
function MapSkeleton() {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 bg-midnight-800/60 shadow-2xl">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-midnight-700/40 via-midnight-800/40 to-midnight-900/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/60">
          <MapPin className="h-4 w-4 animate-bounce" />
          Loading map…
        </div>
      </div>
    </div>
  );
}

// Dynamically import Leaflet so it never hits SSR. Bundling react-leaflet,
// leaflet, and the leaflet CSS inside the loader keeps them out of the SSR chunk.
const LeafletMap = dynamic(
  async () => {
    await import("leaflet/dist/leaflet.css");
    const RL = await import("react-leaflet");
    const L = await import("leaflet");

    const cabinIcon = L.divIcon({
      html: `<span class="map-pin map-pin--cabin" aria-hidden="true">🏡</span>`,
      className: "map-pin-wrap",
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    });

    const lakeIcon = L.divIcon({
      html: `<span class="map-pin map-pin--lake" aria-hidden="true">🌊</span>`,
      className: "map-pin-wrap",
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    });

    const center = {
      lat: (TRIP.airbnbCoords.lat + TRIP.promisedLandCoords.lat) / 2,
      lng: (TRIP.airbnbCoords.lng + TRIP.promisedLandCoords.lng) / 2,
    };

    function InnerMap() {
      return (
        <>
          <style>{`
            .map-pin-wrap { background: transparent !important; border: none !important; }
            .map-pin {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 44px;
              height: 44px;
              border-radius: 9999px;
              font-size: 22px;
              line-height: 1;
              box-shadow: 0 8px 24px -6px rgba(0,0,0,0.45), 0 0 0 3px rgba(255,255,255,0.7) inset;
              transition: transform 0.2s ease;
            }
            .map-pin--cabin { background: linear-gradient(135deg, #f97316, #fbbf24); }
            .map-pin--lake { background: linear-gradient(135deg, #06b6d4, #10b981); }
            .map-pin:hover { transform: scale(1.08); }
            .leaflet-popup-content-wrapper {
              border-radius: 14px;
              padding: 4px 6px;
              font-family: var(--font-geist), ui-sans-serif, system-ui;
            }
            .leaflet-popup-content { margin: 10px 12px; font-size: 13px; }
          `}</style>
          <RL.MapContainer
            center={[center.lat, center.lng]}
            zoom={11}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <RL.TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RL.Marker
              position={[TRIP.airbnbCoords.lat, TRIP.airbnbCoords.lng]}
              icon={cabinIcon}
              alt="Our cabin — check-in 3pm Friday"
            >
              <RL.Popup>
                <strong>Our Cabin</strong>
                <br />
                Check-in 3pm Friday
              </RL.Popup>
            </RL.Marker>
            <RL.Marker
              position={[
                TRIP.promisedLandCoords.lat,
                TRIP.promisedLandCoords.lng,
              ]}
              icon={lakeIcon}
              alt="Promised Land State Park — 24 minutes from the cabin"
            >
              <RL.Popup>
                <strong>Promised Land State Park</strong>
                <br />
                24-min drive
              </RL.Popup>
            </RL.Marker>
          </RL.MapContainer>
        </>
      );
    }

    return { default: InnerMap };
  },
  { ssr: false, loading: () => <MapSkeleton /> }
);

export function Map() {
  return (
    <section
      id="map"
      className="relative py-24 md:py-32"
      aria-labelledby="map-title"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[24rem] w-[24rem] rounded-full bg-lake-500/15 blur-[140px]" />
        <div className="absolute bottom-12 -right-32 h-96 w-96 rounded-full bg-forest-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="map-title"
          eyebrow="Where We're Going"
          title="Cabin → Lake → Repeat"
          subtitle="24-minute drive from the Airbnb to Promised Land State Park."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Map */}
          <RevealOnScroll y={24} className="lg:col-span-7">
            <div className="relative h-[480px] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl">
              <LeafletMap />

              {/* Floating coords pill */}
              <div className="pointer-events-none absolute left-4 top-4 z-[1000] inline-flex items-center gap-2 rounded-full border border-white/15 bg-midnight-900/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-sunset-400 animate-pulse" />
                Poconos, PA
              </div>
            </div>
          </RevealOnScroll>

          {/* Directions card */}
          <RevealOnScroll y={24} delay={0.1} className="lg:col-span-5">
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-3xl p-6 md:p-8",
                "glass border border-white/40 dark:border-white/10",
                "shadow-lg"
              )}
            >
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                    Cabin <span className="text-sunset-500">→</span> Lake
                  </h3>
                  <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                    Most-scenic route, light Friday morning traffic.
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lake-500/15 text-lake-600 dark:text-lake-300">
                  <Navigation className="h-5 w-5" />
                </div>
              </header>

              {/* Distance / time strip */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    <Gauge className="h-3 w-3" /> Distance
                  </div>
                  <div className="mt-1 font-display text-xl font-bold tabular-nums text-stone-900 dark:text-white">
                    ~14 mi
                  </div>
                </div>
                <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    <Timer className="h-3 w-3" /> Drive time
                  </div>
                  <div className="mt-1 font-display text-xl font-bold tabular-nums text-stone-900 dark:text-white">
                    ~24 min
                  </div>
                </div>
              </div>

              {/* Steps */}
              <ol className="mt-6 flex flex-col gap-3" role="list">
                {DIRECTIONS.map((step, i) => (
                  <li
                    key={step.text}
                    className="flex gap-3 rounded-2xl border border-white/30 dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.02] p-3"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-500/15 text-xs font-semibold text-forest-700 dark:text-forest-300 tabular-nums">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-medium text-stone-800 dark:text-stone-100">
                        <Navigation className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                        {step.text}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* CTA */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "mt-6 group relative inline-flex w-full items-center justify-center gap-2 rounded-full",
                  "bg-gradient-sunset px-5 py-3 text-sm font-semibold text-white",
                  "shadow-lg shadow-sunset-500/30 ring-1 ring-white/20",
                  "transition-all duration-200 hover:scale-[1.01] hover:shadow-sunset-500/40",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                )}
              >
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="absolute inset-0 -z-10 rounded-full bg-gradient-sunset opacity-0 blur-xl transition group-hover:opacity-60" />
              </a>

              {/* Lifeguard warning */}
              <div
                className={cn(
                  "mt-5 flex items-start gap-3 rounded-2xl border p-3",
                  "border-gold-500/30 bg-gold-500/10 text-gold-700",
                  "dark:border-gold-500/30 dark:bg-gold-500/10 dark:text-gold-300"
                )}
                role="note"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-xs leading-relaxed">
                  <span className="font-semibold">
                    No lifeguards on duty at Promised Land.
                  </span>{" "}
                  Buddy system only — bring floaties and keep eyes on each
                  other.
                </p>
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
