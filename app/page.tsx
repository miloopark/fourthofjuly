import dynamic from "next/dynamic";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TripOverview } from "@/components/sections/TripOverview";
import { Participants } from "@/components/sections/Participants";
import { AirbnbSection } from "@/components/sections/AirbnbSection";
import { Itinerary } from "@/components/sections/Itinerary";
import { Activities } from "@/components/sections/Activities";
import { Map } from "@/components/sections/Map";
import { Weather } from "@/components/sections/Weather";
import { PackingList } from "@/components/sections/PackingList";
import { GroupInfo } from "@/components/sections/GroupInfo";
import { FAQ } from "@/components/sections/FAQ";

// Below-the-fold + heavy dep chunks loaded on demand.
// CostBreakdown pulls in Recharts (~100 KB gzip); the others are large but light-render.
const CostBreakdown = dynamic(
  () => import("@/components/sections/CostBreakdown").then((m) => m.CostBreakdown),
  { ssr: false }
);
const AmazonShopping = dynamic(
  () => import("@/components/sections/AmazonShopping").then((m) => m.AmazonShopping),
  { ssr: false }
);
const Gallery = dynamic(
  () => import("@/components/sections/Gallery").then((m) => m.Gallery),
  { ssr: false }
);
const FinalBanner = dynamic(
  () => import("@/components/sections/FinalBanner").then((m) => m.FinalBanner),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-stone-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sunset-500"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" className="relative overflow-x-clip">
        <Hero />
        <TripOverview />
        <Participants />
        <AirbnbSection />
        <Itinerary />
        <Activities />
        <Map />
        <Weather />
        <CostBreakdown />
        <PackingList />
        <AmazonShopping />
        <GroupInfo />
        <FAQ />
        <Gallery />
        <FinalBanner />
      </main>
    </>
  );
}
