"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, ChevronRightIcon as Sep } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export function Progress({ value, max = 100, label, tone = "primary" }: { value: number; max?: number; label?: string; tone?: "primary" | "gold" | "success" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const bar = { primary: "bg-primary", gold: "bg-gold", success: "bg-success" }[tone];
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between pb-1 text-sm">
          <span className="font-medium">{label}</span>
          <span className="text-text-muted tabular">{value} / {max}</span>
        </div>
      )}
      <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label} className="h-1 w-full overflow-hidden rounded-pill bg-bg-muted">
        <motion.div className={cn("h-full rounded-pill", bar)} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }} />
      </div>
    </div>
  );
}

export type Step = { title: string; body?: string; state: "done" | "current" | "todo" };

/** Vertical timeline. Connector lines stop at the edge of each circle, never inside it. */
export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-2">
          <div className="flex flex-col items-center">
            <span
              data-spec={i === 0 ? "node" : undefined}
              className={cn(
                "grid size-3 shrink-0 place-items-center rounded-pill border-2 text-caption font-bold",
                s.state === "done" && "border-primary bg-primary text-on-primary",
                s.state === "current" && "border-primary bg-surface text-primary",
                s.state === "todo" && "border-border-strong bg-surface text-text-muted",
              )}
            >
              {s.state === "done" ? <CheckIcon className="size-2" /> : i + 1}
            </span>
            {i < steps.length - 1 && (
              <span className={cn("my-half w-[2px] flex-1 rounded-pill", s.state === "done" ? "bg-primary" : "bg-border")} />
            )}
          </div>
          <div className={cn("pb-3", i === steps.length - 1 && "pb-0")}>
            <p className={cn("text-sm leading-[24px] font-bold", s.state === "todo" && "text-text-muted")}>{s.title}</p>
            {s.body && <p className="text-sm text-text-muted">{s.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Horizontal stepper, used on team setup. */
export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-1 flex-col items-center gap-1 last:flex-none">
          <div className="flex w-full items-center">
            <span
              className={cn(
                "grid size-3 shrink-0 place-items-center rounded-pill border-2 text-caption font-bold",
                s.state === "done" && "border-primary bg-primary text-on-primary",
                s.state === "current" && "border-primary bg-surface text-primary",
                s.state === "todo" && "border-border-strong bg-surface text-text-muted",
              )}
            >
              {s.state === "done" ? <CheckIcon className="size-2" /> : i + 1}
            </span>
            {i < steps.length - 1 && <span className={cn("mx-half h-[2px] flex-1 rounded-pill", s.state === "done" ? "bg-primary" : "bg-border")} />}
          </div>
          <span className={cn("self-start text-caption font-bold", s.state === "todo" && "text-text-muted")}>{s.title}</span>
        </li>
      ))}
    </ol>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block animate-pulse rounded-sm bg-bg-muted", className)} />;
}

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-half text-sm">
        {items.map((it, i) => (
          <li key={it} className="flex items-center gap-half">
            {i > 0 && <Sep className="size-2 text-text-muted" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-bold">{it}</span>
            ) : (
              <a href="#" onClick={(e) => e.preventDefault()} className="rounded-xs text-text-muted hover:text-primary">{it}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1);
  return (
    <nav aria-label="Pagination" className="flex items-center gap-half">
      <button onClick={() => onChange(page - 1)} disabled={page === 1} className="grid size-5 place-items-center rounded-sm text-text-secondary hover:bg-bg-muted disabled:opacity-40" aria-label="Previous page">
        <ChevronLeftIcon className="size-2" />
      </button>
      {nums.map((n, i) => (
        <span key={n} className="flex items-center gap-half">
          {i > 0 && nums[i - 1] !== n - 1 && <span className="px-half text-text-muted">…</span>}
          <button
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn("grid size-5 place-items-center rounded-sm text-sm font-bold tabular", n === page ? "bg-primary text-on-primary" : "text-text-secondary hover:bg-bg-muted")}
          >
            {n}
          </button>
        </span>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === pages} className="grid size-5 place-items-center rounded-sm text-text-secondary hover:bg-bg-muted disabled:opacity-40" aria-label="Next page">
        <ChevronRightIcon className="size-2" />
      </button>
    </nav>
  );
}

export function EmptyState({ image, title, body, action }: { image?: string; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="flex max-w-40 flex-col items-center gap-2 text-center">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" data-spec="illustration" className="h-12 w-auto object-contain" />
      )}
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p className="pt-half text-sm text-text-muted">{body}</p>
      </div>
      {action}
    </div>
  );
}

export function NavItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-5 w-full items-center gap-1 rounded-sm px-1 text-sm transition-colors duration-200",
        active ? "bg-primary-soft font-bold text-primary" : "text-text-secondary hover:bg-bg-muted hover:text-text",
      )}
    >
      <span data-spec="icon" className="grid size-3 place-items-center [&>svg]:size-3">{icon}</span>
      {label}
      {badge && <span className="ml-auto rounded-pill bg-gold-soft px-1 text-caption font-bold text-gold-ink">{badge}</span>}
    </a>
  );
}

export function StatCard({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex min-w-30 flex-col gap-1 rounded-md border border-border bg-surface p-3 shadow-card">
      <div className="flex items-center gap-1 text-sm text-text-muted">
        {icon && <span className="grid size-4 place-items-center rounded-sm bg-primary-soft text-primary [&>svg]:size-2">{icon}</span>}
        {label}
      </div>
      <p className="text-3xl font-bold tabular">{value}</p>
      {delta && <p className="text-sm font-medium text-success">{delta}</p>}
    </div>
  );
}

export function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, target - (now ?? target));
  const parts = [
    ["hrs", Math.floor(left / 3.6e6)],
    ["min", Math.floor((left % 3.6e6) / 6e4)],
    ["sec", Math.floor((left % 6e4) / 1000)],
  ] as const;
  return (
    <div className="flex gap-1" role="timer" aria-label="Time left">
      {parts.map(([u, v]) => (
        <div key={u} className="flex w-8 flex-col items-center rounded-sm bg-ink py-1 text-white">
          <span className="text-2xl font-bold tabular">{now === null ? "--" : String(v).padStart(2, "0")}</span>
          <span className="text-caption text-white/70">{u}</span>
        </div>
      ))}
    </div>
  );
}
