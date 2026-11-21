import { cn } from "@/lib/utils";

export type BadgeTone = "neutral" | "primary" | "gold" | "success" | "warning" | "danger";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-bg-muted text-text-secondary",
  primary: "bg-primary-soft text-primary-ink",
  gold: "bg-gold-soft text-gold-ink",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

export function Badge({
  tone = "neutral",
  dot,
  children,
  className,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex h-3 items-center gap-half rounded-pill px-1 text-caption font-bold whitespace-nowrap", tones[tone], className)}>
      {dot && <span className="size-1 rounded-pill bg-current" />}
      {children}
    </span>
  );
}
