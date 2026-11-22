import { HeaderArt } from "./HeaderArt";
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  meta?: { label: string; value: React.ReactNode }[];
}) {
  return (
    <header className="pb-6">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-mono text-text-muted uppercase">{eyebrow}</p>
          <h1 className="pt-1 text-4xl font-bold tracking-[-0.02em] text-balance md:text-5xl">{title}</h1>
          <p className="max-w-prose pt-2 text-lg text-pretty text-text-secondary">{lead}</p>
        </div>
        <HeaderArt />
      </div>
      {meta && (
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-half bg-surface px-2 py-1 last:odd:col-span-2 sm:last:odd:col-span-1">
              <dt className="font-mono text-mono text-text-muted uppercase">{m.label}</dt>
              <dd className="text-sm font-bold">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

export function Section({
  title,
  id,
  intro,
  children,
  className,
}: {
  title: string;
  id?: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const anchor = id ?? slugify(title);
  return (
    <section className={cn("mt-8 border-t border-border pt-3 first-of-type:mt-0", className)} aria-labelledby={anchor}>
      <h2
        id={anchor}
        data-toc={title}
        className={cn(
          "group flex items-baseline gap-2 text-2xl font-bold tracking-tight",
          !/^\d/.test(title) &&
            "[counter-increment:sec] before:w-4 before:shrink-0 before:font-mono before:text-mono before:font-normal before:text-text-muted before:content-[counter(sec,decimal-leading-zero)]",
        )}
      >
        {title}
        <a href={`#${anchor}`} className="text-text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-label={`Link to ${title}`}>
          #
        </a>
      </h2>
      {intro && <p className="max-w-prose pt-1 text-base text-text-secondary">{intro}</p>}
      <div className="pt-3">{children}</div>
    </section>
  );
}

export function H3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("pt-4 pb-1 text-xl font-bold", className)}>{children}</h3>;
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("max-w-prose pb-2 text-base text-text-secondary", className)}>{children}</p>;
}

export function List({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={cn("flex max-w-prose flex-col gap-1 pb-2", className)}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-1 text-base text-text-secondary">
          <span aria-hidden className="flex h-3 shrink-0 items-center"><span className="size-half rounded-pill bg-primary" /></span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const calloutStyles = {
  info: { icon: InformationCircleIcon, box: "bg-primary-soft", ink: "text-primary" },
  rule: { icon: CheckCircleIcon, box: "bg-gold-soft", ink: "text-gold-ink" },
  warn: { icon: ExclamationTriangleIcon, box: "bg-danger-soft", ink: "text-danger" },
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: keyof typeof calloutStyles;
  title: string;
  children: React.ReactNode;
}) {
  const s = calloutStyles[tone];
  const Icon = s.icon;
  return (
    <div className={cn("my-3 flex max-w-content gap-2 rounded-md p-3", s.box)}>
      <Icon className={cn("size-3 shrink-0", s.ink)} />
      <div>
        <p className={cn("font-bold", s.ink)}>{title}</p>
        <div className="pt-half text-base text-text-secondary">{children}</div>
      </div>
    </div>
  );
}

export function DoDont({
  doExample,
  dontExample,
  doText,
  dontText,
}: {
  doExample: React.ReactNode;
  dontExample: React.ReactNode;
  doText: React.ReactNode;
  dontText: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 pb-3 md:grid-cols-2">
      {[
        { ok: true, ex: doExample, text: doText },
        { ok: false, ex: dontExample, text: dontText },
      ].map(({ ok, ex, text }) => (
        <figure key={String(ok)} className="overflow-hidden rounded-md border border-border bg-surface">
          <div className="grid min-h-30 place-items-center bg-bg-muted p-3">{ex}</div>
          <figcaption className={cn("border-t-4 p-2", ok ? "border-success" : "border-danger")}>
            <span className={cn("flex items-center gap-1 text-sm font-bold", ok ? "text-success" : "text-danger")}>
              {ok ? <CheckCircleIcon className="size-2" /> : <XCircleIcon className="size-2" />}
              {ok ? "Do" : "Don't"}
            </span>
            <p className="pt-half text-sm text-text-secondary">{text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Preview({
  children,
  className,
  label,
  plain,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  plain?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      {label && (
        <div className="flex h-5 items-center border-b border-border bg-surface px-2 font-mono text-mono text-text-muted">
          {label}
        </div>
      )}
      <div className={cn(plain ? "bg-bg" : "blueprint", "flex flex-wrap items-center justify-center gap-2 p-4 md:p-6", className)}>
        {children}
      </div>
    </div>
  );
}

export function Table({
  head,
  rows,
  mono = [],
}: {
  head: string[];
  rows: React.ReactNode[][];
  mono?: number[];
}) {
  return (
    <div className="mb-3 overflow-x-auto rounded-md border border-border bg-surface">
      <table className="w-full min-w-60 border-collapse text-left text-sm">
        <thead>
          <tr className="bg-bg-muted">
            {head.map((h) => (
              <th key={h} scope="col" className="h-5 px-2 font-mono text-mono font-normal text-text-muted uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border align-top">
              {r.map((c, j) => (
                <td key={j} className={cn("px-2 py-1", mono.includes(j) && "font-mono text-caption whitespace-nowrap")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-xs bg-bg-muted px-half font-mono text-[0.875em] text-text">{children}</code>;
}

export function Grid({ children, cols = 3, className }: { children: React.ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  const c = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 xl:grid-cols-3", 4: "grid-cols-2 md:grid-cols-4" }[cols];
  return <div className={cn("grid gap-3 pb-3", c, className)}>{children}</div>;
}

export function InfoCard({
  title,
  children,
  kicker,
  className,
}: {
  title: string;
  children: React.ReactNode;
  kicker?: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t-2 border-text pt-2", className)}>
      {kicker && <p className="font-mono text-mono text-text-muted uppercase">{kicker}</p>}
      <p className="pt-half text-lg font-bold">{title}</p>
      <div className="pt-1 text-sm text-text-secondary">{children}</div>
    </div>
  );
}
