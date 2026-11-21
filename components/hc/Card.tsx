import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  interactive,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { interactive?: boolean; as?: "div" | "article" | "section" | "a" }) {
  return (
    <Tag
      className={cn(
        "flex flex-col gap-2 rounded-md border border-border bg-surface p-3 shadow-card",
        interactive &&
          "cursor-pointer transition-[transform,box-shadow,border-color] duration-200 ease-standard hover:-translate-y-half hover:border-border-strong hover:shadow-float",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Tile({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-sm bg-bg-muted p-2", className)}>{children}</div>;
}
