import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { buttonClasses } from "@/components/hc/Button";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ContentsIndex } from "@/components/home/ContentsIndex";
import { Specimens } from "@/components/home/Specimens";
import { Img } from "@/components/site/Images";
import { registry } from "@/lib/registry";
import { slotById } from "@/lib/images";
import { cn } from "@/lib/utils";

const principles = [
  ["Clear before clever", "A hacker glancing up from their code should know what to do in one look. If a screen needs explaining, it isn't done."],
  ["One thing leads", "Every screen has one primary action and one focal point. Everything else steps back."],
  ["Gold means points", "Blue is for doing things. Gold only shows up when points are involved, so it always means something."],
  ["Same rules everywhere", "One grid, one type scale, one set of states, checked in light and dark before anything ships."],
];

const gallery: { id: string; className: string; fit?: "cover" | "contain"; tone?: string; blend?: boolean }[] = [
  { id: "games.timber", className: "md:col-span-4 md:row-span-2", fit: "cover" },
  { id: "teams.join", className: "md:col-span-2", tone: "bg-primary-soft" },
  { id: "games.cup", className: "md:col-span-2", tone: "bg-bg-muted" },
  { id: "shop.tamagotchi", className: "md:col-span-2", tone: "bg-bg-muted dark:bg-[#b4c2d1]", blend: true },
  { id: "mascot.money", className: "md:col-span-2", tone: "bg-gold-soft" },
  { id: "shop.candy", className: "md:col-span-2", tone: "bg-bg-muted dark:bg-[#b4c2d1]", blend: true },
  { id: "shop.pico", className: "md:col-span-2", tone: "bg-bg-muted dark:bg-[#b4c2d1]", blend: true },
  { id: "shop.led", className: "md:col-span-2", tone: "bg-bg-muted dark:bg-[#b4c2d1]", blend: true },
  { id: "shop.charger", className: "md:col-span-2", tone: "bg-bg-muted dark:bg-[#b4c2d1]", blend: true },
];

function Heading({ n, title, aside }: { n: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2 pb-4">
      <h2 className="flex items-baseline gap-2 text-3xl font-bold tracking-tight md:text-4xl">
        <span className="font-mono text-mono font-normal text-text-muted">{n}</span>
        {title}
      </h2>
      {aside}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-1 border-b border-text pb-1 font-mono text-mono text-text-muted uppercase">
          <span>Hack Canada · Design system</span>
          <span>Revision 1.0 · 2027 season</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h1 className="text-5xl font-bold tracking-[-0.03em] text-balance xl:text-6xl">
              The rules behind the hacker dashboard.
            </h1>
            <p className="max-w-prose pt-3 text-lg text-pretty text-text-secondary">
              Color, type, an 8 point grid, motion, and {registry.length} components, each measured from the live code. Written down so the next
              screen anyone builds looks like it was always there.
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
          <div className="lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
        <dl className="grid grid-cols-2 overflow-hidden rounded-sm border border-border bg-surface md:grid-cols-5">
          {[
            ["Components", String(registry.length)],
            ["Base unit", "8 px"],
            ["Half step", "4 px"],
            ["Themes", "Light, dark"],
            ["Contrast", "WCAG 2.2 AA"],
          ].map(([l, v], i) => (
            <div key={l} className={cn("flex flex-col gap-half border-border px-2 py-2", i > 0 && "md:border-l", i % 2 === 1 && "border-l", i > 1 && "border-t md:border-t-0")}>
              <dt className="font-mono text-mono text-text-muted uppercase">{l}</dt>
              <dd className="text-2xl font-bold tabular">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="contents">
        <h2 id="contents" className="sr-only">Contents</h2>
        <p className="pb-2 font-mono text-mono text-text-muted uppercase">Contents</p>
        <ContentsIndex />
      </section>

      <section aria-labelledby="specimens">
        <Heading
          n="A"
          title="Specimens"
          aside={
            <Link href="/components" className={buttonClasses("ghost", "md")}>
              All {registry.length} components <ArrowRightIcon className="size-2" />
            </Link>
          }
        />
        <p className="max-w-prose pb-4 text-text-secondary">
          These are the real components, not pictures of them. Click, toggle and type. The label under each one is its measured size.
        </p>
        <Specimens />
      </section>

      <section aria-labelledby="wild">
        <Heading
          n="B"
          title="In the wild"
          aside={
            <Link href="/resources/images" className={buttonClasses("ghost", "md")}>
              Replace these images <ArrowRightIcon className="size-2" />
            </Link>
          }
        />
        <div className="grid auto-rows-[192px] grid-cols-2 gap-2 md:grid-cols-8">
          {gallery.map((g, i) => (
            <figure key={g.id} className={cn("group relative overflow-hidden rounded-md border border-border", g.tone ?? "bg-surface", g.className, i === 0 && "col-span-2 row-span-2")}>
              <Img
                id={g.id}
                className={cn(
                  "size-full transition-transform duration-500 ease-standard group-hover:scale-[1.03]",
                  g.fit === "cover" ? "object-cover" : "object-contain p-3",
                  g.blend && "mix-blend-multiply",
                )}
              />
              <figcaption className="absolute bottom-1 left-1 rounded-xs bg-surface px-1 font-mono text-mono text-text-secondary">
                Fig. {String(i + 1).padStart(2, "0")} · {slotById[g.id].label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="believe">
        <Heading
          n="C"
          title="What we believe"
          aside={
            <Link href="/principles" className={buttonClasses("ghost", "md")}>
              All principles <ArrowRightIcon className="size-2" />
            </Link>
          }
        />
        <ol className="grid border-t border-text md:grid-cols-2">
          {principles.map(([t, b], i) => (
            <li key={t} className={cn("flex gap-3 border-b border-border py-4", i % 2 === 0 ? "md:pr-4" : "md:border-l md:pl-4")}>
              <span className="font-mono text-mono text-text-muted tabular">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-2xl font-bold tracking-tight">{t}</p>
                <p className="max-w-prose pt-1 text-text-secondary">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="grid gap-4 border-t border-text pt-4 text-sm text-text-secondary md:grid-cols-3">
        <div className="flex items-start gap-2">
          <Img id="brand.logo" alt="" className="size-6 shrink-0" />
          <p>
            <span className="font-bold text-text">Hack Canada design system.</span> Built for the hacker dashboard, the store, Bet Points and the mini
            games.
          </p>
        </div>
        <p>Set in Satoshi and JetBrains Mono. Every space, size and line height lands on a 4 or 8 px step.</p>
        <ul className="flex flex-col gap-half">
          {[
            ["Ctrl K", "Search"],
            ["/", "Search"],
            ["G", "Column grid"],
          ].map(([k, l]) => (
            <li key={k} className="flex items-center gap-1">
              <kbd className="min-w-4 rounded-xs border border-border bg-surface px-half text-center font-mono text-mono">{k}</kbd>
              {l}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
