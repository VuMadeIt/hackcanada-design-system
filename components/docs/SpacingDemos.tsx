"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const steps = [4, 8, 16, 24, 32, 40, 48, 64];

export function SnapDemo() {
  const [raw, setRaw] = useState(13);
  const snapped = steps.reduce((a, b) => (Math.abs(b - raw) < Math.abs(a - raw) ? b : a));
  return (
    <div className="grid gap-3 rounded-md hairline bg-surface p-3 md:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-2">
        <label htmlFor="snap" className="font-bold">Drag to any value</label>
        <input id="snap" type="range" min={2} max={64} value={raw} onChange={(e) => setRaw(+e.target.value)} className="accent-[var(--hc-primary)]" />
        <div className="flex gap-3 font-mono text-mono">
          <span>
            You typed <b className={cn(raw % 4 ? "text-danger" : "text-success")}>{raw}</b>
          </span>
          <span>
            Snaps to <b className="text-primary">{snapped}</b>
          </span>
        </div>
        <div className="flex flex-wrap gap-half">
          {steps.map((s) => (
            <span key={s} className={cn("rounded-xs px-1 font-mono text-mono", s === snapped ? "bg-primary text-on-primary" : "bg-bg-muted text-text-muted")}>{s}</span>
          ))}
        </div>
      </div>
      <div className="blueprint flex items-center justify-center rounded-sm p-2">
        <motion.div layout transition={{ type: "spring", stiffness: 400, damping: 32 }} style={{ padding: snapped }} className="rounded-md border border-dashed border-spec bg-spec-soft">
          <div className="rounded-sm bg-surface px-2 py-1 text-sm font-bold shadow-card">Card content</div>
        </motion.div>
      </div>
    </div>
  );
}

export function InsideOutside() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <button onClick={() => setOn((v) => !v)} className="self-start rounded-sm hairline px-2 py-1 text-sm font-bold hover:outline-border-strong">
        {on ? "Show equal spacing" : "Show inside < between"}
      </button>
      <div className={cn("flex flex-col transition-[gap] duration-300", on ? "gap-4" : "gap-2")}>
        {["Name", "Email"].map((f) => (
          <div key={f} className={cn("flex flex-col transition-[gap] duration-300", on ? "gap-1" : "gap-2")}>
            <span className="text-sm font-bold">{f}</span>
            <span className="h-6 rounded-sm border border-border-input" />
            <span className="text-caption text-text-muted">Helper text for {f.toLowerCase()}</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-mono text-text-muted">{on ? "8 inside each field, 32 between fields. Groups read instantly." : "16 everywhere. Which label goes with which box?"}</p>
    </div>
  );
}
