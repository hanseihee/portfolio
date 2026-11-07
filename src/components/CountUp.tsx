"use client";

import { useEffect, useRef } from "react";

// Renders the final value on the server; with motion enabled it counts up
// once the number scrolls into view.
export default function CountUp({
  value,
  duration = 1600,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    const text = element?.firstChild;
    if (!element || !text || document.documentElement.dataset.motion !== "full")
      return;
    let frame = 0;
    text.nodeValue = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          text.nodeValue = String(
            Math.round((1 - Math.pow(1 - progress, 4)) * value),
          );
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      text.nodeValue = String(value);
    };
  }, [value, duration]);
  return (
    <span ref={ref} className="count-up">
      {value}
    </span>
  );
}
