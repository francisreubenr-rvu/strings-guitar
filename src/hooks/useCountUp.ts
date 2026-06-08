"use client";

import { useEffect, useRef } from "react";

export function useCountUp() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseFloat(el.dataset.count || "0");
            if (Number.isNaN(target)) return;

            const duration = 850;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;

              if (Number.isInteger(target)) {
                el.textContent = Math.round(current).toString();
              } else {
                el.textContent = current.toFixed(2);
              }

              if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
              } else {
                el.textContent = target.toString();
              }
            };

            rafRef.current = requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observerRef.current = observer;

    const elements = document.querySelectorAll<HTMLElement>("[data-count]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return null;
}
