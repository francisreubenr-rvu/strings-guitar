"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
            if (delay > 0) {
              setTimeout(() => el.classList.add("in"), delay);
            } else {
              el.classList.add("in");
            }
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observerRef.current = observer;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
