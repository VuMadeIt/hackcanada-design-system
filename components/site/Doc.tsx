import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { FitToWidth } from "./FitToWidth";

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
      <p className="text-sm font-medium text-primary">{eyebrow.split(" · ")[0]}</p>
      <h1 className="pt-1 text-3xl font-bold tracking-tight text-balance">{title}</h1>
      <p className="max-w-prose pt-1 text-base text-pretty text-text-muted">{lead}</p>
      {meta && meta.length > 0 && (
        <dl className="flex flex-wrap gap-x-3 gap-y-1 pt-2 text-sm">
          {meta.map((m) => (
            <div key={m.label} className="flex items-center gap-1">
              <dt className="text-text-muted">{m.label}</dt>
              <dd className="font-medium text-text">{m.value}</dd>
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
    <section className={cn("pt-6 first-of-type:pt-0", className)} aria-labelledby={anchor}>
      <h2 id={anchor} data-toc={title} className="group flex scroll-mt-12 items-center gap-1 text-xl font-bold tracking-tight">
        {title}
        <a href={`#${anchor}`} className="text-text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-label={`Link to ${title}`}>
          #
        </a>
      </h2>
      {intro && <p className="max-w-prose pt-1 text-base text-text-muted">{intro}</p>}
      <div className="pt-3">{children}</div>
    </section>
  );
}

export function H3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("pt-3 pb-1 text-base font-bold", className)}>{children}</h3>;
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("max-w-prose pb-2 text-base text-text-secondary", className)}>{children}</p>;
}

export function List({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={cn("flex max-w-prose flex-col gap-1 pb-2", className)}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 text-base text-text-secondary">
          <span aria-hidden className="flex h-3 shrink-0 items-center">
            <span className="h-px w-1 bg-text-muted" />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const calloutStyles = {
  info: { icon: InformationCircleIcon, ink: "text-primary" },
  rule: { icon: LightBulbIcon, ink: "text-gold-ink" },
  warn: { icon: ExclamationTriangleIcon, ink: "text-danger" },
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
    <div className="my-3 flex max-w-content gap-2 rounded-md hairline p-2">
      <Icon className={cn("mt-half size-2 shrink-0", s.ink)} />
      <div className="text-sm">
        <p className="font-bold text-text">{title}</p>
        <div className="pt-half text-text-secondary">{children}</div>
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
    <div className="grid grid-cols-1 gap-x-3 gap-y-3 pb-3 md:grid-flow-col md:grid-cols-2 md:grid-rows-[1fr_auto] md:gap-y-0">
      {[
        { ok: true, ex: doExample, text: doText },
        { ok: false, ex: dontExample, text: dontText },
      ].map(({ ok, ex, text }) => (
        <figure key={String(ok)} className="row-span-2 grid min-w-0 grid-rows-subgrid">
          <div className="blueprint grid min-h-24 grid-cols-1 place-items-center rounded-md hairline p-3">
            <FitToWidth>{ex}</FitToWidth>
          </div>
          <figcaption className="flex gap-1 pt-2 text-sm">
            <span className={cn("grid size-2 shrink-0 translate-y-half place-items-center rounded-pill text-white", ok ? "bg-success" : "bg-danger")}>
              {ok ? <CheckIcon className="size-[12px]" /> : <XMarkIcon className="size-[12px]" />}
            </span>
            <span className="text-text-secondary">
              <span className="font-bold text-text">{ok ? "Do. " : "Don't. "}</span>
              {text}
            </span>
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
    <figure className="pb-3">
      <div className={cn(plain ? "bg-bg" : "blueprint", "flex flex-wrap items-center justify-center gap-2 rounded-md hairline p-4 md:p-6", className)}>
        {children}
      </div>
      {label && <figcaption className="pt-1 text-sm text-text-muted">{label}</figcaption>}
    </figure>
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
    <div className="mt-3 mb-3 overflow-x-auto rounded-md hairline first:mt-0">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-bg-muted">
            {head.map((h) => (
              <th key={h} scope="col" className="h-5 px-2 font-medium text-text">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hairline-t align-top">
              {r.map((c, j) => (
                <td key={j} className={cn("px-2 py-1 text-text-secondary", mono.includes(j) && "font-mono text-caption [overflow-wrap:anywhere] text-text sm:whitespace-nowrap")}>
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
  return <div className={cn("grid gap-x-4 gap-y-3 pb-3", c, className)}>{children}</div>;
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
    <div className={cn("flex flex-col gap-half", className)}>
      {kicker && <p className="text-caption font-medium text-text-muted">{kicker}</p>}
      <p className="text-base font-bold">{title}</p>
      <div className="text-sm text-text-muted">{children}</div>
    </div>
  );
}
