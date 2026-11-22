"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlassIcon, ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";
import { nav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const all = nav.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));
    const term = q.trim().toLowerCase();
    return term ? all.filter((i) => `${i.title} ${i.group}`.toLowerCase().includes(term)) : all;
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const go = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 px-2 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-60 overflow-hidden rounded-md hairline bg-surface shadow-float"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            <div className="flex h-7 items-center gap-1 border-b border-border px-2">
              <MagnifyingGlassIcon className="size-3 text-text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => Math.min(i + 1, results.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => Math.max(i - 1, 0));
                  }
                  if (e.key === "Enter" && results[index]) go(results[index].href);
                }}
                placeholder="Search pages, components, rules"
                className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-text-muted"
                aria-label="Search"
              />
              <kbd className="rounded-xs hairline px-half font-mono text-mono text-text-muted">Esc</kbd>
            </div>
            <ul className="max-h-48 overflow-y-auto p-1" role="listbox">
              {results.length === 0 && <li className="p-2 text-sm text-text-muted">Nothing matches “{q}”.</li>}
              {results.map((r, i) => (
                <li key={r.href} role="option" aria-selected={i === index}>
                  <button
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => go(r.href)}
                    className={cn(
                      "flex h-5 w-full items-center gap-2 rounded-sm px-2 text-left text-sm",
                      i === index ? "bg-primary-soft text-primary-ink" : "text-text-secondary",
                    )}
                  >
                    <span className="font-medium">{r.title}</span>
                    <span className="text-caption text-text-muted">{r.group}</span>
                    {i === index && <ArrowTurnDownLeftIcon className="ml-auto size-2" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
