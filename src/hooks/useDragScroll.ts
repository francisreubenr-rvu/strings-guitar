"use client";

import { useEffect, useRef, useState } from "react";

interface DragState {
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
  moved: boolean;
}

export function useDragScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
        moved: false,
      };
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
      el.classList.add("dragging");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 4) {
        dragState.current.moved = true;
      }
      el.scrollLeft = dragState.current.scrollLeft - dx;
      el.scrollTop = dragState.current.scrollTop - dy;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragState.current) return;
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("dragging");
      setIsDragging(false);
      dragState.current = null;
    };

    const onClick = (e: MouseEvent) => {
      if (dragState.current?.moved) {
        const target = e.target as HTMLElement;
        if (target.closest("a")) {
          e.preventDefault();
        }
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    el.addEventListener("click", onClick, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return { ref, isDragging } as const;
}
