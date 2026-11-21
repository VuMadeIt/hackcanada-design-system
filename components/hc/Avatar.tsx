import { cn } from "@/lib/utils";

const sizes = { xs: "size-3 text-[10px]", sm: "size-4 text-caption", md: "size-5 text-sm", lg: "size-8 text-xl", xl: "size-12 text-3xl" };
const palette = ["bg-primary-soft text-primary", "bg-gold-soft text-gold-ink", "bg-success-soft text-success", "bg-warning-soft text-warning"];

export function Avatar({
  name,
  src,
  size = "md",
  status,
  className,
}: {
  name: string;
  src?: string;
  size?: keyof typeof sizes;
  status?: "online" | "away";
  className?: string;
}) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const tone = palette[name.length % palette.length];
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center rounded-pill font-bold", sizes[size], !src && tone, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="size-full rounded-pill object-cover" />
      ) : (
        <span aria-label={name}>{initials}</span>
      )}
      {status && (
        <span
          className={cn(
            "absolute right-0 bottom-0 size-1 rounded-pill ring-2 ring-surface",
            status === "online" ? "bg-success" : "bg-gold",
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}

export function AvatarGroup({ names, max = 4, size = "sm" }: { names: string[]; max?: number; size?: keyof typeof sizes }) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return (
    <span className="flex -space-x-1">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} className="ring-2 ring-surface" />
      ))}
      {rest > 0 && (
        <span className={cn("inline-grid place-items-center rounded-pill bg-bg-muted font-bold text-text-muted ring-2 ring-surface", sizes[size])}>
          +{rest}
        </span>
      )}
    </span>
  );
}
