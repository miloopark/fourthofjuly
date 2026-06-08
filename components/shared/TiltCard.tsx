"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltCard({ children, className, intensity = 8 }: Props) {
  const prefersReduced = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setHasFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rafRef = useRef<number>(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [intensity, -intensity]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-intensity, intensity]), {
    stiffness: 200,
    damping: 18,
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nextX = e.clientX - rect.left - rect.width / 2;
    const nextY = e.clientY - rect.top - rect.height / 2;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      x.set(nextX);
      y.set(nextY);
    });
  }

  function handleLeave() {
    cancelAnimationFrame(rafRef.current);
    x.set(0);
    y.set(0);
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  if (prefersReduced || !hasFinePointer) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative hover:will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
