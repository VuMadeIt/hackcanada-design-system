import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { buttonClasses } from "@/components/hc/Button";
import { Specimens } from "@/components/home/Specimens";
import { Img } from "@/components/site/Images";
import { registry } from "@/lib/registry";
import { cn } from "@/lib/utils";

const foundations = [
  { title: "Color", href: "/foundations/color", body: "Blue acts. Gold rewards." },
  { title: "Typography", href: "/foundations/typography", body: "Satoshi, ten styles." },
  { title: "Spacing", href: "/foundations/spacing", body: "Every value on the rule of 8." },
  { title: "Motion", href: "/foundations/motion", body: "Four durations, one curve." },
];

function Swatches() {
  return (
    <div className="flex">
      {["bg-primary", "bg-gold", "bg-ink", "bg-success", "bg-danger"].map((c) => (
        <span key={c} className={cn("-ml-1 size-6 rounded-pill border-2 border-bg first:ml-0", c)} />
      ))}
    </div>
  );
}

const art: Record<string, React.ReactNode> = {
  Color: <Swatches />,
  Typography: <span className="text-6xl font-bold tracking-tight">Aa</span>,
  Spacing: (
    <div className="flex items-end gap-1">
      {[1, 2, 3, 4, 6, 8].map((n) => (
        <span key={n} className="w-2 rounded-xs bg-primary/80" style={{ height: n * 8 }} />
      ))}
    </div>
  ),
  Motion: (
    <svg viewBox="0 0 96 64" className="h-8 w-12 text-primary" aria-hidden>
      <path d="M4 60 C 40 60, 40 4, 92 4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="4" cy="60" r="4" fill="currentColor" />
      <circle cx="92" cy="4" r="4" fill="currentColor" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="mx-auto flex max-w-page flex-col gap-16 lg:pt-4">
      <section className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-prose">
          <Link href="/resources/images" className="inline-flex h-4 items-center gap-1 rounded-pill border border-border pr-1 pl-2 text-caption font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text">
            New: swap every image at once
            <ArrowRightIcon className="size-2" />
          </Link>
          <h1 className="pt-3 text-4xl font-bold tracking-tight text-balance md:text-5xl">The design system behind the Hack Canada dashboard.</h1>
          <p className="pt-2 text-lg text-pretty text-text-muted">
            {registry.length} components, tokens and motion, measured from the live code and built on an 8 point grid.
          </p>
          <div className="flex flex-wrap gap-1 pt-4">
            <Link href="/getting-started" className={buttonClasses("primary", "lg")}>
              Get started
            </Link>
            <Link href="/components" className={buttonClasses("secondary", "lg")}>
              Browse components
            </Link>
          </div>
        </div>
        <Img id="mascot.laptop" alt="" className="hidden w-48 shrink-0 lg:block" />
      </section>

      <section aria-labelledby="components">
        <div className="flex items-baseline justify-between pb-3">
          <h2 id="components" className="text-xl font-bold tracking-tight">Components</h2>
          <Link href="/components" className="flex items-center gap-half text-sm font-medium text-text-muted transition-colors hover:text-text">
            All {registry.length} <ArrowRightIcon className="size-2" />
          </Link>
        </div>
        <Specimens />
      </section>

      <section aria-labelledby="foundations">
        <h2 id="foundations" className="pb-3 text-xl font-bold tracking-tight">Foundations</h2>
        <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {foundations.map((f) => (
            <Link key={f.href} href={f.href} className="group flex flex-col gap-1 rounded-md">
              <div className="blueprint grid h-24 place-items-center rounded-md border border-border text-text transition-colors duration-200 group-hover:border-border-strong">{art[f.title]}</div>
              <span className="text-sm font-medium group-hover:text-primary">{f.title}</span>
              <span className="text-sm text-text-muted">{f.body}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="art" className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col justify-end gap-1 md:pr-4">
          <h2 id="art" className="text-xl font-bold tracking-tight">Real art, everywhere</h2>
          <p className="text-sm text-text-muted">The beavers, shop photos and game art come from the Hack Canada Figma file. Swap all of them from one page.</p>
          <Link href="/resources/images" className="flex items-center gap-half pt-1 text-sm font-medium text-primary">
            Open the image library <ArrowRightIcon className="size-2" />
          </Link>
        </div>
        <Img id="games.timber" className="aspect-[4/3] w-full rounded-md border border-border object-cover" />
        <div className="grid grid-cols-2 gap-3">
          {["mascot.money", "teams.join", "shop.pico", "games.cup"].map((id) => (
            <div key={id} className="grid aspect-square place-items-center rounded-md border border-border bg-bg-muted p-2">
              <Img id={id} className="max-h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-sm text-text-muted">
        <span>Hack Canada design system · 2027 season</span>
        <span>
          Press <kbd className="font-mono text-mono">G</kbd> for the grid, <kbd className="font-mono text-mono">⌘K</kbd> to search
        </span>
      </footer>
    </div>
  );
}
