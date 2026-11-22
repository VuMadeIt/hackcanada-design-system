"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { GiftIcon } from "@heroicons/react/24/outline";
import { PointsPill } from "@/components/hc/PointsPill";
import { Badge } from "@/components/hc/Badge";
import { Button } from "@/components/hc/Button";
import { Img } from "@/components/site/Images";

const rise = (d: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: [0, 0, 0, 1] as const },
});

function Dim({ label, className }: { label: string; className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute flex items-center gap-half ${className}`}>
      <span className="h-1 w-px bg-spec" />
      <span className="h-px flex-1 bg-spec" />
      <span className="font-mono text-mono text-spec-ink">{label}</span>
      <span className="h-px flex-1 bg-spec" />
      <span className="h-1 w-px bg-spec" />
    </span>
  );
}

export function HeroVisual() {
  const art = useRef<HTMLDivElement>(null);
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const el = art.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(Math.round(el.getBoundingClientRect().width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="blueprint relative aspect-[5/4] w-full overflow-hidden rounded-lg border border-border">
      <span className="absolute top-2 left-2 font-mono text-mono text-text-muted">Sheet 01 · 8 px minor · 64 px major</span>
      <span className="absolute top-2 right-2 font-mono text-mono text-text-muted">Scale 1:1</span>

      <motion.div ref={art} {...rise(0)} className="absolute inset-x-8 top-10 bottom-10">
        <Img id="mascot.laptop" alt="" className="size-full object-contain" />
      </motion.div>
      <Dim label={w ? `w ${w}` : "w"} className="inset-x-8 top-7" />

      <motion.div {...rise(0.2)} className="absolute top-12 right-3 flex flex-col items-end gap-1">
        <PointsPill value={1240} />
        <Badge tone="success" dot>Challenge done</Badge>
      </motion.div>

      <motion.div {...rise(0.35)} className="absolute bottom-3 left-3 flex flex-col items-start gap-1">
        <span className="relative">
          <Button leading={<GiftIcon />}>Redeem</Button>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-spec-soft" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-spec-soft" />
        </span>
        <span className="rounded-xs bg-surface px-half font-mono text-mono text-spec-ink">h 40 · pad 16 · gap 8 · r 8</span>
      </motion.div>
    </div>
  );
}
