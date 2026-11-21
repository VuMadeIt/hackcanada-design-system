"use client";

import { cn } from "@/lib/utils";

export function ControlBar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-end gap-3 border-t border-border bg-surface p-2">{children}</div>;
}

export function Choose<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-col gap-half">
      <span className="font-mono text-mono text-text-muted">{label}</span>
      <div className="flex flex-wrap gap-half rounded-sm bg-bg-muted p-half">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            aria-pressed={o === value}
            className={cn("h-4 rounded-xs px-1 font-mono text-mono", o === value ? "bg-surface font-bold text-primary shadow-card" : "text-text-secondary hover:text-text")}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex h-5 cursor-pointer items-center gap-1 font-mono text-mono text-text-secondary">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="size-2 accent-[var(--hc-primary)]" />
      {label}
    </label>
  );
}

export function TextControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-half">
      <span className="font-mono text-mono text-text-muted">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="h-5 w-24 rounded-sm border border-border bg-surface px-1 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}

export function Stage({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={cn("flex min-h-12 flex-wrap items-center justify-center gap-2 rounded-sm bg-bg p-3", className)}>{children}</div>
      {label && <span className="text-center font-mono text-mono text-text-muted">{label}</span>}
    </div>
  );
}
