"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { cn } from "@/lib/utils";

type Box = { x: number; y: number; w: number; h: number };
type Mark = Box & { name: string };
type Measure = {
  box: Box;
  pad: { t: number; r: number; b: number; l: number };
  radius: number;
  gap: { box: Box; value: number; dir: "x" | "y" } | null;
  marks: Mark[];
  font: string | null;
};

const r = (n: number) => Math.round(n);

function Tag({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cn("absolute z-10 rounded-xs bg-spec px-half font-mono text-mono whitespace-nowrap text-white shadow-card", className)} style={style}>
      {children}
    </span>
  );
}

function onGrid(v: number) {
  return v % 4 === 0;
}

function Readout({ label, value, grid, hug }: { label: string; value: string; grid?: boolean; hug?: boolean }) {
  return (
    <div className="flex min-w-12 flex-col gap-half">
      <dt className="font-mono text-mono text-text-muted uppercase">{label}</dt>
      <dd className="flex items-center gap-half font-mono text-sm font-bold text-text tabular">
        {value}
        {hug ? (
          <span className="rounded-xs bg-bg-muted px-half text-mono font-medium text-text-muted">hug</span>
        ) : grid === undefined ? null : grid ? (
          <CheckIcon className="size-2 text-success" aria-label="on the grid" />
        ) : (
          <ExclamationTriangleIcon className="size-2 text-warning" aria-label="off the grid" />
        )}
      </dd>
    </div>
  );
}

/**
 * Figma-style redlines drawn on the live child: size, padding, gap, radius and any
 * element marked data-spec="name". Small components are zoomed 2x so the lines are
 * readable; every number is divided back to real CSS pixels.
 */
export function Spec({
  children,
  label,
  className,
  zoom,
  hugWidth = true,
  width,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
  zoom?: number;
  hugWidth?: boolean;
  width?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<Measure | null>(null);
  const [on, setOn] = useState(true);
  const [z, setZ] = useState(zoom ?? 1);

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
    if (zoom === undefined) {
      const natural = box.w / z;
      const want = natural <= 160 && o.width > natural * 2 + 160 ? 2 : 1;
      if (want !== z) {
        setZ(want);
        return;
      }
    }
    const pad = { t: parseFloat(cs.paddingTop), r: parseFloat(cs.paddingRight), b: parseFloat(cs.paddingBottom), l: parseFloat(cs.paddingLeft) };
    let gap: Measure["gap"] = null;
    const kids = Array.from(target.children).filter((k) => getComputedStyle(k).display !== "none" && !k.hasAttribute("data-spec-skip"));
    const g = parseFloat(cs.columnGap) || parseFloat(cs.rowGap) || 0;
    if (g > 0 && kids.length > 1 && (cs.display.includes("flex") || cs.display.includes("grid"))) {
      const a = rel(kids[0]);
      const b = rel(kids[1]);
      if (b.x >= a.x + a.w - 0.5) {
        gap = { dir: "x", value: r((b.x - (a.x + a.w)) / z), box: { x: a.x + a.w, y: Math.min(a.y, b.y), w: b.x - (a.x + a.w), h: Math.max(a.h, b.h) } };
      } else if (b.y >= a.y + a.h - 0.5) {
        gap = { dir: "y", value: r((b.y - (a.y + a.h)) / z), box: { x: Math.min(a.x, b.x), y: a.y + a.h, w: Math.max(a.w, b.w), h: b.y - (a.y + a.h) } };
      }
    }
    const marks = Array.from(target.querySelectorAll<HTMLElement>("[data-spec]")).map((el) => ({ ...rel(el), name: el.dataset.spec ?? "" }));
    const textEl = Array.from(target.querySelectorAll<HTMLElement>("*")).find((el) => Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim())) ?? target;
    const ts = getComputedStyle(textEl);
    const font = textEl ? `${parseFloat(ts.fontSize)}/${parseFloat(ts.lineHeight) || "normal"} · ${ts.fontWeight}` : null;
    setM({ box, pad, radius: parseFloat(cs.borderTopLeftRadius) || 0, gap, marks, font });
  }, [z, zoom]);

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
  const P = m ? { t: m.pad.t * z, r: m.pad.r * z, b: m.pad.b * z, l: m.pad.l * z } : null;
  const realW = b ? r(b.w / z) : 0;
  const realH = b ? r(b.h / z) : 0;

  return (
    <figure className="overflow-hidden rounded-md border border-border">
      <div className="flex h-5 items-center gap-2 border-b border-border bg-surface px-2">
        <span className="font-mono text-mono text-text-muted">{label ?? "Spec"}</span>
        {z !== 1 && <span className="rounded-xs bg-spec-soft px-half font-mono text-mono text-spec">{z}× zoom</span>}
        <label className="ml-auto flex cursor-pointer items-center gap-1 text-caption text-text-muted">
          <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} className="accent-[var(--hc-spec)]" />
          Measurements
        </label>
      </div>
      <div ref={wrap} className={cn("blueprint relative flex min-h-36 items-center justify-center-safe overflow-x-auto px-12 py-12", className)}>
        <div ref={holder} className="relative shrink-0 [&>*]:max-w-none" style={{ width, ...(z !== 1 ? { transform: `scale(${z})`, margin: `${((z - 1) * realH) / 2}px ${((z - 1) * realW) / 2}px` } : {}) }}>
          {children}
        </div>
        {on && m && b && P && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute border-x border-spec" style={{ left: b.x, top: b.y - 24, width: b.w, height: 8 }}>
              <div className="absolute inset-x-0 top-1/2 border-t border-spec" />
            </div>
            <Tag style={{ left: b.x + b.w / 2, top: b.y - 48, transform: "translateX(-50%)" }}>{realW}</Tag>
            <div className="absolute border-y border-spec" style={{ left: b.x - 24, top: b.y, width: 8, height: b.h }}>
              <div className="absolute inset-y-0 left-1/2 border-l border-spec" />
            </div>
            <Tag style={{ left: b.x - 32, top: b.y + b.h / 2, transform: "translate(-100%, -50%)" }}>{realH}</Tag>
            {m.radius > 0 && (
              <>
                <div className="absolute border-t border-r border-dashed border-spec" style={{ left: b.x + b.w - Math.min(m.radius * z, b.h / 2), top: b.y, width: Math.min(m.radius * z, b.h / 2), height: Math.min(m.radius * z, b.h / 2), borderTopRightRadius: m.radius * z }} />
                <Tag style={{ left: b.x + b.w + 8, top: b.y - 24 }}>R {m.radius >= 999 ? "pill" : r(m.radius)}</Tag>
              </>
            )}
            {P.t > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x, top: b.y, width: b.w, height: P.t }} />}
            {P.b > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x, top: b.y + b.h - P.b, width: b.w, height: P.b }} />}
            {P.l > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x, top: b.y + P.t, width: P.l, height: b.h - P.t - P.b }} />}
            {P.r > 0 && <div className="absolute bg-spec-soft" style={{ left: b.x + b.w - P.r, top: b.y + P.t, width: P.r, height: b.h - P.t - P.b }} />}
            {P.l >= 16 && <span className="absolute font-mono text-mono text-spec" style={{ left: b.x + P.l / 2, top: b.y + b.h / 2, transform: "translate(-50%,-50%)" }}>{r(m.pad.l)}</span>}
            {P.r >= 16 && <span className="absolute font-mono text-mono text-spec" style={{ left: b.x + b.w - P.r / 2, top: b.y + b.h / 2, transform: "translate(-50%,-50%)" }}>{r(m.pad.r)}</span>}
            {m.gap && m.gap.value > 0 && (
              <div className="absolute bg-[repeating-linear-gradient(45deg,var(--hc-spec)_0_1px,transparent_1px_4px)] opacity-70" style={{ left: m.gap.box.x, top: m.gap.box.y, width: m.gap.box.w, height: m.gap.box.h }} />
            )}
            {m.marks.map((k, i) => (
              <div key={i} className="absolute border border-dashed border-spec" style={{ left: k.x, top: k.y, width: k.w, height: k.h }} />
            ))}
          </div>
        )}
      </div>
      {m && (
        <dl className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border bg-surface px-3 py-2">
          <Readout label="Width" value={`${realW}`} grid={onGrid(realW)} hug={hugWidth && !onGrid(realW)} />
          <Readout label="Height" value={`${realH}`} grid={onGrid(realH)} />
          <Readout label="Padding" value={m.pad.t === m.pad.b && m.pad.l === m.pad.r ? (m.pad.t === m.pad.l ? `${r(m.pad.t)}` : `${r(m.pad.t)} ${r(m.pad.l)}`) : `${r(m.pad.t)} ${r(m.pad.r)} ${r(m.pad.b)} ${r(m.pad.l)}`} grid={[m.pad.t, m.pad.r, m.pad.b, m.pad.l].every(onGrid)} />
          {m.gap && <Readout label="Gap" value={`${m.gap.value}`} grid={onGrid(m.gap.value)} />}
          <Readout label="Radius" value={m.radius >= 999 ? "pill" : `${r(m.radius)}`} grid={m.radius >= 999 || onGrid(r(m.radius))} />
          {m.font && <Readout label="Type" value={m.font} />}
          {m.marks.map((k, i) => (
            <Readout key={`${k.name}-${i}`} label={k.name} value={`${r(k.w / z)}×${r(k.h / z)}`} grid={onGrid(r(k.w / z)) && onGrid(r(k.h / z))} />
          ))}
        </dl>
      )}
    </figure>
  );
}
