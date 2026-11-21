import Link from "next/link";
import {
  ArrowRightIcon, BookOpenIcon, CommandLineIcon, CubeIcon, EyeIcon, PaintBrushIcon, SparklesIcon, Squares2X2Icon, SwatchIcon,
} from "@heroicons/react/24/outline";
import { buttonClasses } from "@/components/hc/Button";
import { HeroVisual } from "@/components/home/HeroVisual";
import { InView } from "@/components/motion-primitives/in-view";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { registry } from "@/lib/registry";
import { cn } from "@/lib/utils";

const foundations = [
  { href: "/foundations/color", title: "Color", body: "Blue for action, gold for points. Every pair is checked for contrast.", icon: SwatchIcon, preview: "color" },
  { href: "/foundations/typography", title: "Typography", body: "Satoshi on a 9-step scale. Every line height lands on the 8 px grid.", icon: PaintBrushIcon, preview: "type" },
  { href: "/foundations/spacing", title: "Spacing", body: "Multiples of 8, with 4 as the only half step.", icon: Squares2X2Icon, preview: "space" },
  { href: "/foundations/grid", title: "Grid", body: "12, 8 and 4 columns. Press G to see them on any page.", icon: CubeIcon, preview: "grid" },
  { href: "/foundations/motion", title: "Motion", body: "Four durations and three curves. Nothing moves without a reason.", icon: SparklesIcon, preview: "motion" },
  { href: "/foundations/accessibility", title: "Accessibility", body: "WCAG 2.2 AA in both themes, keyboard first.", icon: EyeIcon, preview: "a11y" },
] as const;

const principles = [
  ["Clear before clever", "A hacker glancing up from code should know what to do in one look."],
  ["One thing leads", "Each screen has one primary action and one focal point."],
  ["Earned, not given", "Points and rewards feel like progress. Gold only appears when it means points."],
  ["Same rules everywhere", "One grid, one type scale, one set of states, in light and dark."],
];

function Preview({ kind }: { kind: (typeof foundations)[number]["preview"] }) {
  if (kind === "color")
    return (
      <div className="flex h-full">
        {["bg-primary", "bg-primary-soft", "bg-gold", "bg-gold-soft", "bg-ink", "bg-bg-muted"].map((c) => (
          <span key={c} className={cn("flex-1", c)} />
        ))}
      </div>
    );
  if (kind === "type")
    return (
      <div className="flex h-full items-end gap-2 px-3 pb-2">
        <span className="text-5xl leading-none font-bold">Aa</span>
        <span className="pb-1 font-mono text-mono text-text-muted">56/64 · 32/40 · 16/24</span>
      </div>
    );
  if (kind === "space")
    return (
      <div className="flex h-full items-end gap-1 px-3 pb-2">
        {[1, 2, 3, 4, 6, 8].map((n) => (
          <span key={n} className="flex flex-col items-center gap-half">
            <span className="w-2 rounded-xs bg-primary" style={{ height: n * 8 }} />
            <span className="font-mono text-mono text-text-muted">{n * 8}</span>
          </span>
        ))}
      </div>
    );
  if (kind === "grid")
    return (
      <div className="grid h-full grid-cols-12 gap-1 px-3 py-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="rounded-xs bg-primary-soft" />
        ))}
      </div>
    );
  if (kind === "motion")
    return (
      <svg viewBox="0 0 160 64" className="h-full w-full px-3 py-2" aria-hidden>
        <path d="M0 60 C 32 60, 32 4, 160 4" className="fill-none stroke-primary" strokeWidth="2" />
        <path d="M0 60 L160 4" className="fill-none stroke-border-strong" strokeDasharray="4 4" />
      </svg>
    );
  return (
    <div className="flex h-full items-center gap-2 px-3">
      <span className="grid size-6 place-items-center rounded-sm bg-primary text-sm font-bold text-on-primary">Aa</span>
      <span className="font-mono text-sm font-bold">5.4 : 1</span>
      <span className="rounded-xs bg-success-soft px-half font-mono text-mono text-success">AA</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="grid gap-4 pt-2 md:grid-cols-[1fr_1fr] md:items-stretch">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-mono text-primary uppercase">Hack Canada Design System · v1.0</p>
          <h1 className="pt-2 text-4xl font-bold tracking-tight md:text-5xl">The rules behind the hacker dashboard.</h1>
          <p className="max-w-prose pt-3 text-lg text-text-secondary">
            Everything we use to build Hack Canada: principles, color, type, an 8 point grid, motion, and {registry.length} components with live redlines,
            states and code. Built so anyone can make a new screen that looks like it was always there.
          </p>
          <div className="flex flex-wrap gap-1 pt-4">
            <Link href="/getting-started" className={buttonClasses("primary", "lg")}>
              Get started <ArrowRightIcon className="size-2" />
            </Link>
            <Link href="/components" className={buttonClasses("secondary", "lg")}>
              Browse components
            </Link>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section aria-label="At a glance" className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
        {[
          [String(registry.length), "components, each with specs"],
          ["8 px", "base unit, 4 px half step"],
          ["2", "themes, tested separately"],
          ["AA", "WCAG 2.2 contrast, everywhere"],
        ].map(([n, l]) => (
          <div key={l} className="flex flex-col gap-half bg-surface p-3">
            <span className="text-3xl font-bold tabular">{n}</span>
            <span className="text-sm text-text-muted">{l}</span>
          </div>
        ))}
      </section>

      <section aria-labelledby="principles">
        <div className="flex items-end justify-between gap-2 pb-3">
          <div>
            <p className="font-mono text-mono text-text-muted uppercase">01 · Principles</p>
            <h2 id="principles" className="pt-1 text-3xl font-bold">What we believe</h2>
          </div>
          <Link href="/principles" className="flex items-center gap-half text-sm font-bold text-primary hover:underline">
            All principles <ArrowRightIcon className="size-2" />
          </Link>
        </div>
        <ol className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {principles.map(([t, b], i) => (
            <InView
              key={t}
              as="li"
              once
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0, 0, 0, 1] }}
            >
              <div className="flex h-full flex-col gap-1 rounded-md border border-border bg-surface p-3">
                <span className="font-mono text-mono text-primary">0{i + 1}</span>
                <p className="text-lg font-bold">{t}</p>
                <p className="text-sm text-text-secondary">{b}</p>
              </div>
            </InView>
          ))}
        </ol>
      </section>

      <section aria-labelledby="foundations">
        <p className="font-mono text-mono text-text-muted uppercase">02 · Foundations</p>
        <h2 id="foundations" className="pt-1 pb-3 text-3xl font-bold">The building blocks</h2>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {foundations.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-[border-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-half hover:border-primary hover:shadow-float"
            >
              <div className="h-12 border-b border-border bg-bg">
                <Preview kind={f.preview} />
              </div>
              <div className="flex flex-col gap-half p-3">
                <span className="flex items-center gap-1 text-lg font-bold">
                  <f.icon className="size-3 text-primary" /> {f.title}
                  <ArrowRightIcon className="ml-auto size-2 text-text-muted transition-transform duration-200 group-hover:translate-x-half group-hover:text-primary" />
                </span>
                <span className="text-sm text-text-secondary">{f.body}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="components" className="overflow-hidden rounded-lg bg-ink py-6 text-white dark:border dark:border-border dark:bg-surface">
        <div className="flex flex-wrap items-end justify-between gap-2 px-4 pb-4">
          <div>
            <p className="font-mono text-mono text-white/60 uppercase">03 · Components</p>
            <h2 id="components" className="pt-1 text-3xl font-bold">{registry.length} components, one language</h2>
            <p className="max-w-prose pt-1 text-white/70">From the button to the bet slip, each one is measured, documented in every state and ready to copy.</p>
          </div>
          <Link href="/components" className={buttonClasses("gold", "md")}>
            See them all
          </Link>
        </div>
        <InfiniteSlider gap={8} speed={32} speedOnHover={8}>
          {registry.map((c) => (
            <Link key={c.slug} href={`/components/${c.slug}`} className="flex h-5 items-center rounded-pill border border-white/15 px-2 text-sm font-bold whitespace-nowrap text-white/80 hover:border-gold hover:text-gold">
              {c.name}
            </Link>
          ))}
        </InfiniteSlider>
      </section>

      <section aria-labelledby="use" className="grid gap-2 md:grid-cols-3">
        <h2 id="use" className="sr-only">How to use this site</h2>
        {[
          { icon: CommandLineIcon, t: "Search anything", b: "Press Ctrl K or / to jump to any page, token or component." },
          { icon: Squares2X2Icon, t: "Check the grid", b: "Press G to lay the column grid over any page." },
          { icon: BookOpenIcon, t: "Read the redlines", b: "Every spec view is measured from the live component, so the numbers can't drift." },
        ].map(({ icon: Icon, t, b }) => (
          <div key={t} className="flex gap-2 rounded-md border border-border bg-surface p-3">
            <span className="grid size-5 shrink-0 place-items-center rounded-sm bg-primary-soft text-primary-ink">
              <Icon className="size-3" />
            </span>
            <div>
              <p className="font-bold">{t}</p>
              <p className="pt-half text-sm text-text-secondary">{b}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
