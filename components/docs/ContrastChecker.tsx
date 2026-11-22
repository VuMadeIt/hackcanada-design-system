"use client";

import { useState } from "react";
import { contrast, grade } from "@/lib/contrast";
import { palette, type ColorToken } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const names = Object.keys(palette.light) as ColorToken[];

export function ContrastChecker() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fg, setFg] = useState<ColorToken>("text-muted");
  const [bg, setBg] = useState<ColorToken>("bg-muted");
  const p = palette[theme];
  const ratio = contrast(p[fg], p[bg]);
  const g = grade(ratio);
  const sel = "h-5 rounded-sm border border-border bg-surface px-1 font-mono text-mono";
  return (
    <div className="overflow-hidden rounded-md hairline">
      <div className="grid md:grid-cols-[1fr_240px]">
        <div className="flex min-h-30 flex-col justify-center gap-1 p-4" style={{ background: p[bg], color: p[fg] }}>
          <p className="text-3xl font-bold">Redeem for 60 pts</p>
          <p className="text-base">Body text at 16 px needs 4.5 : 1. Large text and icons need 3 : 1.</p>
        </div>
        <div className="flex flex-col gap-2 hairline-t bg-surface p-3 md:border-t-0 md:border-l">
          <div>
            <p className="font-mono text-mono text-text-muted">Ratio</p>
            <p className="text-4xl font-bold tabular">{ratio.toFixed(2)}<span className="text-xl text-text-muted"> : 1</span></p>
          </div>
          <span className={cn("self-start rounded-xs px-1 font-mono text-mono font-bold", g === "Fail" ? "bg-danger-soft text-danger" : g === "AA large" ? "bg-warning-soft text-warning" : "bg-success-soft text-success")}>{g}</span>
          <label className="flex flex-col gap-half"><span className="font-mono text-mono text-text-muted">Text</span>
            <select className={sel} value={fg} onChange={(e) => setFg(e.target.value as ColorToken)}>{names.map((n) => <option key={n}>{n}</option>)}</select>
          </label>
          <label className="flex flex-col gap-half"><span className="font-mono text-mono text-text-muted">Background</span>
            <select className={sel} value={bg} onChange={(e) => setBg(e.target.value as ColorToken)}>{names.map((n) => <option key={n}>{n}</option>)}</select>
          </label>
          <div className="flex gap-half rounded-sm bg-bg-muted p-half">
            {(["light", "dark"] as const).map((t) => (
              <button key={t} onClick={() => setTheme(t)} aria-pressed={theme === t} className={cn("h-4 flex-1 rounded-xs font-mono text-mono", theme === t ? "bg-surface font-bold shadow-card" : "text-text-muted")}>{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
