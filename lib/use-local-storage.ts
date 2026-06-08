"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const initialRef = useRef(initial);
  const [value, setValue] = useState<T>(initialRef.current);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (parsed !== null && parsed !== undefined) {
          setValue(parsed as T);
        }
      }
    } catch (err) {
      console.warn(`[useLocalStorage] failed to read "${key}":`, err);
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.warn(`[useLocalStorage] failed to write "${key}":`, err);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initialRef.current), []);

  return { value, setValue, hydrated, reset };
}
