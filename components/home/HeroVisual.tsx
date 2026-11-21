"use client";

import { motion } from "motion/react";
import { PointsPill } from "@/components/hc/PointsPill";
import { Badge } from "@/components/hc/Badge";
import { Button } from "@/components/hc/Button";
import { Timeline } from "@/components/hc/Display";
import { GiftIcon } from "@heroicons/react/24/outline";

const float = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: [0, 0, 0, 1] as const },
});

function Redline({ className, label }: { className: string; label: string }) {
  return (
    <span className={`pointer-events-none absolute flex items-center ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-spec" />
      <span className="rounded-xs bg-spec px-half font-mono text-mono text-white">{label}</span>
      <span className="h-px flex-1 bg-spec" />
    </span>
  );
}

export function HeroVisual() {
  return (
    <div className="blueprint relative h-60 overflow-hidden rounded-lg border border-border md:h-full md:min-h-60">
      <span className="absolute top-2 left-2 font-mono text-mono text-text-muted">8 px grid · 64 px major</span>

      <motion.div {...float(0.1)} className="absolute top-12 left-4 flex w-36 flex-col gap-2 rounded-md border border-border bg-surface p-3 shadow-float">
        <div className="flex items-center gap-1">
          <span className="rounded-pill bg-gold-soft px-1 text-caption leading-[24px] font-bold text-gold-ink">Sponsor</span>
          <span className="ml-auto rounded-pill bg-gold-soft px-1 text-caption leading-[24px] font-bold text-gold-ink">+25 pts</span>
        </div>
        <p className="text-lg font-bold">Meet a sponsor</p>
        <Timeline
          steps={[
            { title: "Started", state: "done" },
            { title: "Get scanned", state: "current" },
          ]}
        />
      </motion.div>
      <Redline className="top-9 left-4 w-36" label="288" />

      <motion.div {...float(0.25)} className="absolute top-4 right-4 flex flex-col items-end gap-1">
        <PointsPill value={1240} />
        <Badge tone="success" dot>Completed</Badge>
      </motion.div>

      <motion.div {...float(0.4)} className="absolute right-4 bottom-6 flex flex-col items-end gap-1">
        <span className="relative">
          <Button leading={<GiftIcon />}>Redeem</Button>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-spec-soft" aria-hidden />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-spec-soft" aria-hidden />
        </span>
        <span className="font-mono text-mono text-spec">h 40 · pad 16 · gap 8 · r 8</span>
      </motion.div>
    </div>
  );
}
