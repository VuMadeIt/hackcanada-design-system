"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ExampleTabs({ preview, code, className }: { preview: React.ReactNode; code: React.ReactNode; className?: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const id = useId();
  return (
    <div className={cn("pb-3", className)}>
      <div role="tablist" aria-label="Example" className="flex h-5 items-end gap-3 border-b border-border">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            id={`${id}-${t}`}
            aria-selected={tab === t}
            aria-controls={`${id}-${t}-panel`}
            onClick={() => setTab(t)}
            className={cn(
              "relative h-full pb-1 text-sm font-medium capitalize transition-colors duration-200",
              tab === t ? "text-text" : "text-text-muted hover:text-text",
            )}
          >
            {t}
            {tab === t && <motion.span layoutId={`${id}-bar`} className="absolute inset-x-0 -bottom-px h-[2px] bg-text" transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }} />}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-${tab}-panel`} aria-labelledby={`${id}-${tab}`} className="pt-2">
        <div hidden={tab !== "preview"}>{preview}</div>
        <div hidden={tab !== "code"} className="[&>div]:mb-0">{code}</div>
      </div>
    </div>
  );
}
