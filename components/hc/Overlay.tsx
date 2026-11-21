"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export function Accordion({ items, defaultOpen }: { items: { q: string; a: React.ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const id = useId();
  return (
    <div className="w-full divide-y divide-border rounded-md border border-border bg-surface">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex min-h-7 w-full items-center gap-2 px-3 text-left text-base font-bold hover:text-primary"
              >
                {it.q}
                <ChevronDownIcon className={cn("ml-auto size-2 shrink-0 transition-transform duration-300 ease-standard", on && "rotate-180")} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 text-base text-text-secondary">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-end bg-ink/50 sm:place-items-center sm:p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={ref}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="w-full max-w-60 rounded-t-lg bg-surface p-3 shadow-float outline-none sm:rounded-lg sm:p-4"
          >
            <div className="flex items-start gap-2">
              <div>
                <h2 className="text-xl font-bold">{title}</h2>
                {description && <p className="pt-half text-sm text-text-secondary">{description}</p>}
              </div>
              <button onClick={onClose} aria-label="Close" className="ml-auto grid size-5 shrink-0 place-items-center rounded-sm text-text-muted hover:bg-bg-muted">
                <XMarkIcon className="size-3" />
              </button>
            </div>
            {children && <div className="pt-3">{children}</div>}
            {footer && <div className="flex flex-col-reverse gap-1 pt-4 sm:flex-row sm:justify-end">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Tooltip({ label, children, side = "top" }: { label: string; children: React.ReactNode; side?: "top" | "bottom" }) {
  const [on, setOn] = useState(false);
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => (timer.current = setTimeout(() => setOn(true), 400))}
      onMouseLeave={() => {
        clearTimeout(timer.current);
        setOn(false);
      }}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      aria-describedby={on ? id : undefined}
    >
      {children}
      <AnimatePresence>
        {on && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-sm bg-ink px-1 py-half text-caption font-medium whitespace-nowrap text-white shadow-float",
              side === "top" ? "bottom-full mb-1" : "top-full mt-1",
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

const alertTones = {
  info: { icon: InformationCircleIcon, cls: "bg-primary-soft text-primary" },
  success: { icon: CheckCircleIcon, cls: "bg-success-soft text-success" },
  warning: { icon: ExclamationTriangleIcon, cls: "bg-warning-soft text-warning" },
  danger: { icon: XCircleIcon, cls: "bg-danger-soft text-danger" },
};

export function Alert({
  tone = "info",
  title,
  children,
  action,
  onDismiss,
}: {
  tone?: keyof typeof alertTones;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
}) {
  const t = alertTones[tone];
  const Icon = t.icon;
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex w-full gap-2 rounded-md p-2", t.cls)}>
      <Icon className="mt-half size-2 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{title}</p>
        {children && <div className="pt-half text-sm text-text-secondary">{children}</div>}
        {action && <div className="pt-1">{action}</div>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss" className="grid size-3 shrink-0 place-items-center rounded-xs hover:bg-surface/60">
          <XMarkIcon className="size-2" />
        </button>
      )}
    </div>
  );
}

export type ToastItem = { id: number; title: string; tone: "success" | "info" | "danger"; body?: string };

export function ToastStack({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed right-2 bottom-2 z-[90] flex w-40 max-w-[calc(100vw-32px)] flex-col gap-1">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = alertTones[t.tone].icon;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="pointer-events-auto flex items-start gap-1 rounded-md border border-border bg-surface-raised p-2 shadow-float"
            >
              <Icon className={cn("mt-half size-2 shrink-0", t.tone === "success" ? "text-success" : t.tone === "danger" ? "text-danger" : "text-primary")} />
              <div className="flex-1">
                <p className="text-sm font-bold">{t.title}</p>
                {t.body && <p className="text-sm text-text-muted">{t.body}</p>}
              </div>
              <button onClick={() => onDismiss(t.id)} aria-label="Dismiss" className="grid size-3 place-items-center rounded-xs text-text-muted hover:bg-bg-muted">
                <XMarkIcon className="size-2" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const push = (t: Omit<ToastItem, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000);
  };
  return { toasts, push, dismiss: (id: number) => setToasts((s) => s.filter((x) => x.id !== id)) };
}
