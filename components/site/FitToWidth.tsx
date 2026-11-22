"use client";

import { useLayoutEffect, useRef, useState } from "react";

export function FitToWidth({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ s: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const s = Math.min(1, o.clientWidth / Math.max(1, i.scrollWidth));
      setFit({ s, h: i.offsetHeight * s });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="relative w-full min-w-0" style={fit ? { height: fit.h } : undefined}>
      <div
        ref={inner}
        className={fit ? "absolute top-0 left-1/2 w-max origin-top" : "mx-auto w-max max-w-full"}
        style={fit ? { transform: `translateX(-50%) scale(${fit.s})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
