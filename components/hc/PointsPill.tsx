"use client";

import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { cn } from "@/lib/utils";

export function PointsPill({ value, className, size = "md" }: { value: number; className?: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-pill bg-gold-soft font-bold whitespace-nowrap text-gold-ink tabular",
        size === "md" ? "h-4 pr-2 pl-half text-sm" : "h-3 pr-1 pl-half text-caption",
        className,
      )}
    >
      <span data-spec="coin" className={cn("grid place-items-center rounded-pill bg-gold text-ink", size === "md" ? "size-3 text-caption" : "size-2 text-[10px]")}>
        ★
      </span>
      <AnimatedNumber value={value} springOptions={{ bounce: 0, duration: 800 }} />
      <span className="font-medium">pts</span>
    </span>
  );
}
