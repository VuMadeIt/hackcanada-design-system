"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export function Checkbox({
  label,
  description,
  checked,
  indeterminate,
  onChange,
  disabled,
}: {
  label: string;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const on = checked || indeterminate;
  return (
    <label htmlFor={id} className={cn("flex min-h-5 cursor-pointer items-start gap-1 py-1", disabled && "cursor-not-allowed opacity-40")}>
      <span className="relative mt-half grid size-2 shrink-0 place-items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          aria-checked={indeterminate ? "mixed" : checked}
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-xs border-2 border-border-strong bg-surface transition-colors duration-100 checked:border-primary checked:bg-primary focus-visible:shadow-focus"
          style={indeterminate ? { background: "var(--hc-primary)", borderColor: "var(--hc-primary)" } : undefined}
        />
        {on && (
          <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.1 }} className="pointer-events-none relative text-on-primary">
            {indeterminate ? <MinusIcon className="size-2" /> : <CheckIcon className="size-2" />}
          </motion.span>
        )}
      </span>
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {description && <span className="block text-sm text-text-muted">{description}</span>}
      </span>
    </label>
  );
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const name = useId();
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="pb-1 text-sm font-bold">{label}</legend>
      {options.map((o) => (
        <label
          key={o.value}
          className={cn(
            "flex cursor-pointer items-start gap-2 rounded-sm border p-2 transition-colors duration-200",
            value === o.value ? "border-primary bg-primary-soft" : "border-border bg-surface hover:border-border-strong",
          )}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="mt-half size-2 shrink-0 cursor-pointer appearance-none rounded-pill border-2 border-border-strong bg-surface transition-[border-width,border-color] duration-200 checked:border-[5px] checked:border-primary focus-visible:shadow-focus"
          />
          <span>
            <span className="block text-sm font-bold">{o.label}</span>
            {o.description && <span className="block text-sm text-text-muted">{o.description}</span>}
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export function Switch({
  label,
  checked,
  onChange,
  disabled,
  size = "md",
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const track = size === "md" ? "h-3 w-5" : "h-2 w-4";
  const thumb = size === "md" ? "size-2" : "size-[12px]";
  return (
    <label className={cn("inline-flex min-h-5 cursor-pointer items-center gap-1", disabled && "cursor-not-allowed opacity-40")}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        data-spec="track"
        className={cn(
          "relative flex shrink-0 items-center rounded-pill px-half transition-colors duration-200",
          track,
          checked ? "justify-end bg-primary" : "justify-start bg-border-strong",
        )}
      >
        <motion.span layout transition={{ type: "spring", stiffness: 700, damping: 40 }} className={cn("rounded-pill bg-white shadow-card", thumb)} />
      </button>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
