"use client";

import { cn } from "@/lib/utils";

export function ControlBar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-end gap-3 hairline-t bg-bg-muted/60 p-2">{children}</div>;
}

export function Choose<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-col gap-half">
      <span className="text-caption font-medium text-text-muted">{label}</span>
      <div className="flex flex-wrap gap-half rounded-sm bg-bg-muted p-half">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            aria-pressed={o === value}
            className={cn("h-3 rounded-xs px-1 text-caption font-medium capitalize transition-colors duration-200", o === value ? "bg-bg text-text shadow-card" : "text-text-muted hover:text-text")}
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
    <label className="flex h-5 cursor-pointer items-center gap-1 text-caption font-medium text-text-secondary">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="size-2 accent-[var(--hc-primary)]" />
      {label}
    </label>
  );
}

export function TextControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-half">
      <span className="text-caption font-medium text-text-muted">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="h-4 w-24 rounded-sm border border-border bg-bg px-1 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}

export function Stage({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <div className="relative flex flex-col bg-bg">
      <div className={cn("flex min-h-16 flex-wrap items-center justify-center gap-2 p-3 pt-4", className)}>{children}</div>
      {label && <span className="absolute top-1 left-2 text-caption text-text-muted capitalize">{label}</span>}
    </div>
  );
}
