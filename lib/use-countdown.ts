"use client";
import { useEffect, useMemo, useState } from "react";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  totalMs: number;
};

function compute(target: number): CountdownParts {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, totalMs: 0 };
  }
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, isPast: false, totalMs: diff };
}

export function useCountdown(targetIso: string): CountdownParts {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [parts, setParts] = useState<CountdownParts>(() => compute(target));

  useEffect(() => {
    setParts(compute(target));
    const id = setInterval(() => setParts(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return parts;
}
