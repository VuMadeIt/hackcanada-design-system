"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Box = { x: number; y: number; w: number; h: number };
type Mark = Box & { name: string };
type Measure = {
  box: Box;
  pad: { t: number; r: number; b: number; l: number };
  radius: number;
  gap: { box: Box; value: number; dir: "x" | "y" } | null;
  marks: Mark[];
};

const r = (n: number) => Math.round(n * 10) / 10;

function Tag({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={cn(
        "absolute z-10 rounded-xs bg-spec px-half font-mono text-mono whitespace-nowrap text-white shadow-card",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/**
 * Draws Figma-style redlines on its child: width, height, padding on each side,
 * the gap between children, corner radius, and any element marked with
 * data-spec="name". Values come from the live DOM, so they are always true.
 */
export function Spec({
  children,
  label,
  className,
  showPadding = true,
  showGap = true,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
  showPadding?: boolean;
  showGap?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<Measure | null>(null);
  const [on, setOn] = useState(true);

  const measure = useCallback(() => {
    const w = wrap.current;
    const target = holder.current?.firstElementChild as HTMLElement | null;
    if (!w || !target) return;
    const o = w.getBoundingClientRect();
    const rel = (el: Element): Box => {
      const b = el.getBoundingClientRect();
      return { x: b.left - o.left, y: b.top - o.top, w: b.width, h: b.height };
    };
    const cs = getComputedStyle(target);
    const box = rel(target);
    const pad = {
      t: parseFloat(cs.paddingTop),
      r: parseFloat(cs.paddingRight),
      b: parseFloat(cs.paddingBottom),
      l: parseFloat(cs.paddingLeft),
    };
    let gap: Measure["gap"] = null;
    const kids = Array.from(target.children).filter((k) => getComputedStyle(k).display !== "none" && !k.hasAttribute("data-spec-skip"));
    const g = parseFloat(cs.columnGap) || parseFloat(cs.rowGap) || 0;
    if (g > 0 && kids.length > 1 && (cs.display.includes("flex") || cs.display.includes("grid"))) {
      const a = rel(kids[0]);
      const b = rel(kids[1]);
      if (b.x >= a.x + a.w - 0.5) {
        gap = { dir: "x", value: r(b.x - (a.x + a.w)), box: { x: a.x + a.w, y: Math.min(a.y, b.y), w: b.x - (a.x + a.w), h: Math.max(a.h, b.h) } };
      } else if (b.y >= a.y + a.h - 0.5) {
        gap = { dir: "y", value: r(b.y - (a.y + a.h)), box: { x: Math.min(a.x, b.x), y: a.y + a.h, w: Math.max(a.w, b.w), h: b.y - (a.y + a.h) } };
      }
    }
    const marks = Array.from(target.querySelectorAll<HTMLElement>("[data-spec]")).map((el) => ({
      ...rel(el),
      name: el.dataset.spec ?? "",
    }));
    setM({ box, pad, radius: parseFloat(cs.borderTopLeftRadius) || 0, gap, marks });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    const target = holder.current?.firstElementChild;
    if (target) ro.observe(target);
    const mo = new MutationObserver(measure);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [measure]);

  const b = m?.box;
  return (
    <figure className="overflow-hidden rounded-md border border-border">
      <div className="flex h-5 items-center gap-2 border-b border-border bg-surface px-2">
        <span className="font-mono text-mono text-text-muted">{label ?? "Spec"}</span>
        <label className="ml-auto flex cursor-pointer items-center gap-1 text-caption text-text-muted">
          <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} className="accent-[var(--hc-spec)]" />
          Measurements
        </label>
      </div>
      <div ref={wrap} className={cn("blueprint relative flex items-center justify-center px-12 py-12", className)}>
        <div ref={holder} className="relative">
          {children}
        </div>
        {on && m && b && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* width */}
            <div className="absolute border-x border-spec" style={{ left: b.x, top: b.y - 24, width: b.w, height: 8 }}>
              <div className="absolute inset-x-0 top-1/2 border-t border-spec" />
            </div>
            <Tag style={{ left: b.x + b.w / 2, top: b.y - 40, transform: "translateX(-50%)" }}>W {r(b.w)}</Tag>
            {/* height */}
            <div className="absolute border-y border-spec" style={{ left: b.x - 24, top: b.y, width: 8, height: b.h }}>
              <div className="absolute inset-y-0 left-1/2 border-l border-spec" />
            </div>
            <Tag style={{ left: b.x - 32, top: b.y + b.h / 2, transform: "translate(-100%, -50%)" }}>H {r(b.h)}</Tag>
            {/* radius */}
            {m.radius > 0 && (
              <Tag style={{ left: b.x + b.w + 8, top: b.y - 8 }}>R {m.radius >= 999 ? "pill" : r(m.radius)}</Tag>
            )}
            {/* padding */}
            {showPadding && (
              <>
                {m.pad.t > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x, top: b.y, width: b.w, height: m.pad.t }} />}
                {m.pad.b > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x, top: b.y + b.h - m.pad.b, width: b.w, height: m.pad.b }} />}
                {m.pad.l > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x, top: b.y, width: m.pad.l, height: b.h }} />}
                {m.pad.r > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x + b.w - m.pad.r, top: b.y, width: m.pad.r, height: b.h }} />}
                {m.pad.l > 0 && (
                  <Tag style={{ left: b.x + m.pad.l / 2, top: b.y + b.h + 8, transform: "translateX(-50%)" }}>{r(m.pad.l)}</Tag>
                )}
                {m.pad.r > 0 && m.pad.r !== m.pad.l && (
                  <Tag style={{ left: b.x + b.w - m.pad.r / 2, top: b.y + b.h + 8, transform: "translateX(-50%)" }}>{r(m.pad.r)}</Tag>
                )}
                {m.pad.t > 0 && (
                  <Tag style={{ left: b.x + b.w + 8, top: b.y + m.pad.t / 2 + 8, transform: "translateY(-50%)" }}>
                    pad {r(m.pad.t)}
                    {m.pad.b !== m.pad.t ? ` / ${r(m.pad.b)}` : ""}
                  </Tag>
                )}
              </>
            )}
            {/* gap */}
            {showGap && m.gap && m.gap.value > 0 && (
              <>
                <div
                  className="absolute bg-[repeating-linear-gradient(45deg,var(--hc-spec)_0_1px,transparent_1px_4px)] opacity-60"
                  style={{ left: m.gap.box.x, top: m.gap.box.y, width: m.gap.box.w, height: m.gap.box.h }}
                />
                <Tag
                  style={{
                    left: m.gap.box.x + m.gap.box.w / 2,
                    top: m.gap.dir === "x" ? b.y + b.h + 32 : m.gap.box.y + m.gap.box.h / 2,
                    transform: m.gap.dir === "x" ? "translateX(-50%)" : "translate(-50%, -50%)",
                  }}
                >
                  gap {m.gap.value}
                </Tag>
              </>
            )}
            {/* marks */}
            {m.marks.map((k, i) => (
              <div key={i}>
                <div className="absolute border border-dashed border-spec" style={{ left: k.x, top: k.y, width: k.w, height: k.h }} />
                <Tag
                  className="bg-ink"
                  style={{ left: k.x + k.w / 2, top: k.y + k.h + (i % 2 ? 48 : 64), transform: "translateX(-50%)" }}
                >
                  {k.name} {r(k.w)}×{r(k.h)}
                </Tag>
              </div>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
