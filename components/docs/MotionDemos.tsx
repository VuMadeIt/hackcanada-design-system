"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const curves = [
  { name: "standard", v: [0.2, 0, 0, 1] as const, use: "Things that move on screen" },
  { name: "enter", v: [0, 0, 0, 1] as const, use: "Things arriving" },
  { name: "exit", v: [0.3, 0, 1, 1] as const, use: "Things leaving" },
];
const durations = [
  [100, "micro", "Press, toggle, check"],
  [200, "short", "Hover, small entrances, tooltips"],
  [300, "medium", "Dialogs, sheets, panels"],
  [500, "long", "Page hero, celebrations"],
] as const;

function Curve({ v }: { v: readonly [number, number, number, number] }) {
  const [a, b, c, d] = v;
  return (
    <svg viewBox="0 0 64 64" className="size-8 overflow-visible">
      <rect width="64" height="64" fill="none" stroke="var(--hc-border)" />
      <path d={`M0 64 C ${a * 64} ${64 - b * 64}, ${c * 64} ${64 - d * 64}, 64 0`} fill="none" stroke="var(--hc-primary)" strokeWidth="2" />
      <line x1="0" y1="64" x2={a * 64} y2={64 - b * 64} stroke="var(--hc-spec)" strokeDasharray="2 2" />
      <line x1="64" y1="0" x2={c * 64} y2={64 - d * 64} stroke="var(--hc-spec)" strokeDasharray="2 2" />
    </svg>
  );
}

export function EasingDemo() {
  const [run, setRun] = useState(0);
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <button onClick={() => setRun((r) => r + 1)} className="flex h-4 items-center gap-1 self-start rounded-sm border border-border px-2 text-sm font-bold hover:border-border-strong">
        <ArrowPathIcon className="size-2" /> Replay
      </button>
      {curves.map((c) => (
        <div key={c.name} className="grid grid-cols-[64px_1fr] items-center gap-2 md:grid-cols-[64px_160px_1fr]">
          <Curve v={c.v} />
          <div className="hidden flex-col md:flex">
            <span className="font-bold">ease-{c.name}</span>
            <span className="font-mono text-mono text-text-muted">{c.v.join(", ")}</span>
            <span className="text-sm text-text-secondary">{c.use}</span>
          </div>
          <div className="relative h-4 rounded-pill bg-bg-muted">
            <motion.span
              key={run}
              className="absolute top-0 left-0 size-4 rounded-pill bg-primary"
              initial={{ left: "0%" }}
              animate={{ left: "calc(100% - 32px)" }}
              transition={{ duration: reduce ? 0 : 0.8, ease: c.v as unknown as [number, number, number, number] }}
            />
          </div>
        </div>
      ))}
      <p className="font-mono text-mono text-text-muted">Slowed to 800 ms so you can see the shape.</p>
    </div>
  );
}

export function DurationDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <button onClick={() => setOpen((o) => !o)} className="h-4 self-start rounded-sm bg-primary px-2 text-sm font-bold text-on-primary">{open ? "Reset" : "Play all"}</button>
      {durations.map(([ms, name, use]) => (
        <div key={ms} className="grid grid-cols-[112px_1fr] items-center gap-2">
          <div className="flex flex-col">
            <span className="font-mono text-mono font-bold">{ms} ms · {name}</span>
            <span className="text-caption text-text-muted">{use}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-pill bg-bg-muted">
            <motion.div className="h-full origin-left rounded-pill bg-primary" initial={false} animate={{ scaleX: open ? 1 : 0 }} transition={{ duration: ms / 1000, ease: [0.2, 0, 0, 1] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpringDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <button onClick={() => setOn((o) => !o)} className="h-4 self-start rounded-sm border border-border px-2 text-sm font-bold">Toggle</button>
      {[
        ["Switch thumb", 700, 40],
        ["Layout highlight", 400, 32],
        ["Scroll progress", 200, 50],
      ].map(([n, s, d]) => (
        <div key={n as string} className="grid grid-cols-[160px_1fr] items-center gap-2">
          <span className="font-mono text-mono">{n} · {s}/{d}</span>
          <div className="relative h-4 rounded-pill bg-bg-muted">
            <motion.span className="absolute top-0 size-4 rounded-pill bg-gold" animate={{ left: on ? "calc(100% - 32px)" : "0%" }} transition={{ type: "spring", stiffness: s as number, damping: d as number }} />
          </div>
        </div>
      ))}
    </div>
  );
}
