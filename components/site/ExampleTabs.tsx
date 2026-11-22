"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type TabKey = "preview" | "themes" | "code";
const labels: Record<TabKey, string> = { preview: "Preview", themes: "Light & dark", code: "Code" };

export function ExampleTabs({ preview, code, themes, className }: { preview: React.ReactNode; code: React.ReactNode; themes?: React.ReactNode; className?: string }) {
  const [tab, setTab] = useState<TabKey>("preview");
  const keys: TabKey[] = themes ? ["preview", "themes", "code"] : ["preview", "code"];
  const id = useId();
  return (
    <div className={cn("pb-3", className)}>
      <div role="tablist" aria-label="Example" className="flex h-5 items-end gap-3 hairline-b">
        {keys.map((t) => (
          <button
            key={t}
            role="tab"
            id={`${id}-${t}`}
            aria-selected={tab === t}
            aria-controls={`${id}-${t}-panel`}
            onClick={() => setTab(t)}
            className={cn(
              "relative h-full pb-1 text-sm font-medium transition-colors duration-200",
              tab === t ? "text-text" : "text-text-muted hover:text-text",
            )}
          >
            {labels[t]}
            {tab === t && <motion.span layoutId={`${id}-bar`} className="absolute inset-x-0 -bottom-px h-[2px] bg-text" transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }} />}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-${tab}-panel`} aria-labelledby={`${id}-${tab}`} className="pt-2">
        <div hidden={tab !== "preview"}>{preview}</div>
        {themes && <div hidden={tab !== "themes"}>{tab === "themes" && themes}</div>}
        <div hidden={tab !== "code"} className="[&>div]:mb-0">{code}</div>
      </div>
    </div>
  );
}
