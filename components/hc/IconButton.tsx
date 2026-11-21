"use client";

import { cn } from "@/lib/utils";

const sizes = { sm: "size-4 [&>svg]:size-2", md: "size-5 [&>svg]:size-3", lg: "size-6 [&>svg]:size-3" };
const variants = {
  ghost: "text-text-secondary hover:bg-bg-muted hover:text-text",
  outline: "border border-border-strong bg-surface text-text hover:border-primary hover:text-primary",
  solid: "bg-primary text-on-primary hover:bg-primary-hover",
};

export function IconButton({
  label,
  size = "md",
  variant = "ghost",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-sm transition-[background-color,color,transform] duration-200 active:scale-95 disabled:opacity-40",
        "after:absolute after:-inset-half after:content-['']",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
