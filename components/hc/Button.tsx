import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-border-strong bg-surface text-text hover:border-primary hover:text-primary",
  ghost: "text-text-secondary hover:bg-bg-muted hover:text-text",
  gold: "bg-gold text-ink hover:brightness-95",
  danger: "bg-danger text-white hover:brightness-110 dark:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-4 gap-1 rounded-sm px-2 text-sm",
  md: "h-5 gap-1 rounded-sm px-2 text-sm",
  lg: "h-6 gap-1 rounded-sm px-3 text-base",
  xl: "h-7 gap-1 rounded-md px-4 text-lg",
};

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
  cn(
    "inline-flex shrink-0 items-center justify-center font-bold whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,transform,filter] duration-200 ease-standard",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
  );

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, leading, trailing, className, children, disabled, ...props },
  ref,
) {
  const icon = size === "xl" || size === "lg" ? "size-3" : "size-2";
  return (
    <button
      ref={ref}
      className={cn(buttonClasses(variant, size), loading && "cursor-progress", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span data-spec="spinner" className={cn(icon, "animate-spin rounded-pill border-2 border-current border-r-transparent")} />
      ) : (
        leading && <span data-spec="icon" className={cn(icon, "grid place-items-center [&>svg]:size-full")}>{leading}</span>
      )}
      <span>{children}</span>
      {trailing && !loading && <span className={cn(icon, "grid place-items-center [&>svg]:size-full")}>{trailing}</span>}
    </button>
  );
});
