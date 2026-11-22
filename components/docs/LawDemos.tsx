"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/hc/Button";
import { Progress } from "@/components/hc/Display";
import { cn } from "@/lib/utils";

export function FittsDemo() {
  const [times, setTimes] = useState<{ small?: number; big?: number }>({});
  const start = useRef(0);
  const [armed, setArmed] = useState<"small" | "big" | null>(null);
  const go = (k: "small" | "big") => {
    setArmed(k);
    start.current = performance.now();
  };
  const hit = (k: "small" | "big") => {
    if (armed !== k) return;
    setTimes((t) => ({ ...t, [k]: Math.round(performance.now() - start.current) }));
    setArmed(null);
  };
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {(["small", "big"] as const).map((k) => (
        <div key={k} className="flex h-30 flex-col rounded-md border border-border bg-surface p-2">
          <div className="flex items-center justify-between">
            <Button size="sm" variant="secondary" onClick={() => go(k)}>{armed === k ? "Go!" : "Start"}</Button>
            <span className="font-mono text-mono text-text-muted">{times[k] ? `${times[k]} ms` : k === "small" ? "16 × 16 target" : "48 × 48 target"}</span>
          </div>
          <div className="flex flex-1 items-end justify-end">
            <button
              aria-label={`${k} target`}
              onClick={() => hit(k)}
              className={cn("rounded-sm transition-colors", k === "small" ? "size-2" : "size-6", armed === k ? "bg-primary" : "bg-border-strong")}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HickDemo() {
  const [many, setMany] = useState(false);
  const opts = many
    ? ["Sour Patch Kids", "LED Strips", "Screwdrivers", "Tamagotchi", "Pico", "Charger", "Stickers", "T-shirt", "Hoodie", "Mug", "Socks", "Tote"]
    : ["Snacks", "Hardware", "Merch"];
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold">{many ? "12 choices at once" : "3 groups first"}</span>
        <Button size="sm" variant="ghost" className="ml-auto" onClick={() => setMany((m) => !m)}>Switch</Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {opts.map((o) => (
          <motion.span layout key={o} className="flex h-4 items-center rounded-pill border border-border px-2 text-sm">{o}</motion.span>
        ))}
      </div>
    </div>
  );
}

export function DohertyDemo() {
  const [state, setState] = useState<"idle" | "slow" | "fast">("idle");
  const [done, setDone] = useState("");
  const run = (ms: number, k: "slow" | "fast") => {
    setState(k);
    setDone("");
    setTimeout(() => {
      setState("idle");
      setDone(k === "fast" ? "Saved in 300 ms, with feedback the moment you clicked" : "Saved after 2 seconds of nothing");
    }, ms);
  };
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <div className="flex flex-wrap gap-1">
        <Button variant="secondary" onClick={() => run(2000, "slow")} disabled={state !== "idle"}>Slow, no feedback</Button>
        <Button onClick={() => run(300, "fast")} loading={state === "fast"} disabled={state !== "idle"}>Fast, with feedback</Button>
      </div>
      <p className="h-3 text-sm text-text-muted">{done}</p>
    </div>
  );
}

export function GoalGradientDemo() {
  const [v, setV] = useState(5);
  return (
    <div className="flex flex-col gap-2 rounded-md hairline bg-surface p-3">
      <Progress label="Challenges done" value={v} max={8} tone="gold" />
      <p className="text-sm text-text-muted">{v >= 8 ? "All done. Confetti time." : `${8 - v} more for the bonus prize`}</p>
      <Button size="sm" className="self-start" onClick={() => setV((x) => Math.min(8, x + 1))}>Complete one</Button>
    </div>
  );
}

export function MillerDemo() {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <div className="rounded-md hairline bg-surface p-3">
        <p className="font-mono text-mono text-text-muted">Raw</p>
        <p className="pt-1 font-mono text-xl font-bold tracking-wide">HC7Q2K9MX4</p>
      </div>
      <div className="rounded-md hairline bg-surface p-3">
        <p className="font-mono text-mono text-text-muted">Chunked</p>
        <p className="pt-1 font-mono text-xl font-bold tracking-wide">HC7 · Q2K · 9MX4</p>
      </div>
    </div>
  );
}

export function VonRestorffDemo() {
  return (
    <div className="flex flex-wrap gap-1 rounded-md hairline bg-surface p-3">
      {["Sour Patch Kids", "LED Strips", "Charger", "Screwdrivers"].map((n, i) => (
        <span key={n} className={cn("flex h-5 items-center rounded-sm px-2 text-sm font-bold", i === 2 ? "bg-gold text-ink" : "bg-bg-muted text-text-secondary")}>
          {n}
          {i === 2 && <span className="pl-1 text-caption">Top prize</span>}
        </span>
      ))}
    </div>
  );
}
