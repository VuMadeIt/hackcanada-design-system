"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  full,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
  full?: boolean;
}) {
  const id = useId();
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex h-5 gap-half rounded-sm bg-bg-muted p-half dark:bg-bg dark:ring-1 dark:ring-border dark:ring-inset", full && "flex w-full")}>
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={cn("relative flex-1 rounded-xs px-2 text-sm font-bold transition-colors duration-200", on ? "text-text" : "text-text-muted hover:text-text")}
          >
            {on && (
              <motion.span layoutId={`seg-${id}`} className="absolute inset-0 rounded-xs bg-surface shadow-card dark:bg-surface-raised dark:ring-1 dark:ring-border-strong" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
            )}
            <span className="relative">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const id = useId();
  return (
    <div role="tablist" aria-label={label} className="flex gap-3 hairline-b">
      {tabs.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={cn("relative flex h-6 items-center gap-1 text-sm font-bold transition-colors duration-200", on ? "text-primary" : "text-text-muted hover:text-text")}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={cn("rounded-pill px-1 text-caption tabular", on ? "bg-primary-soft" : "bg-bg-muted")}>{t.count}</span>
            )}
            {on && <motion.span layoutId={`tab-${id}`} className="absolute inset-x-0 -bottom-px h-half rounded-pill bg-primary" />}
          </button>
        );
      })}
    </div>
  );
}
