import type { Metadata } from "next";
import { PageHeader, Section, Table, Callout, DoDont, Grid, InfoCard } from "@/components/site/Doc";
import { contrast, grade } from "@/lib/contrast";
import { palette, type ColorToken } from "@/lib/tokens";
import { Button } from "@/components/hc/Button";
import { Badge } from "@/components/hc/Badge";

export const metadata: Metadata = { title: "Color" };

type Sw = { token: ColorToken; name: string; use: string; on?: ColorToken };

const groups: { title: string; intro: string; items: Sw[] }[] = [
  {
    title: "Brand",
    intro: "Blue and gold are this year's colors. Blue is for doing things. Gold is for points and nothing else.",
    items: [
      { token: "primary", name: "Primary", use: "Primary buttons, links, focus, current page", on: "on-primary" },
      { token: "primary-hover", name: "Primary hover", use: "Hover and pressed state of primary", on: "on-primary" },
      { token: "primary-soft", name: "Primary soft", use: "Selected rows, active nav, info", on: "primary-ink" },
      { token: "primary-ink", name: "Primary ink", use: "Blue text on blue tints" },
      { token: "gold", name: "Gold", use: "Points coin, prize highlights", on: "ink" },
      { token: "gold-soft", name: "Gold soft", use: "Points chips, reward banners", on: "gold-ink" },
      { token: "gold-ink", name: "Gold ink", use: "Gold text on gold tints" },
      { token: "ink", name: "Ink", use: "Dark brand panels, sold-out badges" },
    ],
  },
  {
    title: "Surfaces",
    intro: "Three levels: the page, the card on it, and anything that floats above. Lighter means closer in light mode. In dark mode, lighter means higher.",
    items: [
      { token: "bg", name: "Background", use: "Page canvas" },
      { token: "bg-muted", name: "Muted", use: "Tiles, image wells, inactive tracks" },
      { token: "surface", name: "Surface", use: "Cards, inputs, sidebar" },
      { token: "surface-raised", name: "Raised", use: "Dialogs, menus, toasts" },
      { token: "border", name: "Border", use: "Card edges, dividers" },
      { token: "border-strong", name: "Border strong", use: "Hover borders, decorative rules" },
      { token: "border-input", name: "Border input", use: "Inputs, checkboxes, switch track (3 : 1)" },
    ],
  },
  {
    title: "Text",
    intro: "Three levels. Never put more than three on one card.",
    items: [
      { token: "text", name: "Text", use: "Titles, body, values" },
      { token: "text-secondary", name: "Secondary", use: "Descriptions, supporting copy" },
      { token: "text-muted", name: "Muted", use: "Captions, meta, placeholders" },
    ],
  },
  {
    title: "Status",
    intro: "Each status has a strong color for text and icons, and a soft one for backgrounds. Always pair with a word or icon.",
    items: [
      { token: "success", name: "Success", use: "Completed, won, saved" },
      { token: "success-soft", name: "Success soft", use: "Success badge and alert", on: "success" },
      { token: "warning", name: "Warning", use: "Low stock, closing soon" },
      { token: "warning-soft", name: "Warning soft", use: "Warning badge and alert", on: "warning" },
      { token: "danger", name: "Danger", use: "Errors, destructive actions" },
      { token: "danger-soft", name: "Danger soft", use: "Error badge and alert", on: "danger" },
    ],
  },
];

function Chip({ fg, bg }: { fg: string; bg: string }) {
  const r = contrast(fg, bg);
  const g = grade(r);
  return (
    <span className="font-mono text-mono">
      <span className="tabular">{r.toFixed(1)}</span>{" "}
      <span className={g === "Fail" ? "text-danger" : g === "AA large" ? "text-warning" : "text-success"}>{g}</span>
    </span>
  );
}

function Swatch({ s }: { s: Sw }) {
  return (
    <li className="overflow-hidden rounded-md border border-border bg-surface">
      <div className="grid h-12 grid-cols-2">
        {(["light", "dark"] as const).map((t) => (
          <div key={t} className="flex items-end justify-between p-1" style={{ background: palette[t][s.token] }}>
            <span className="font-mono text-mono font-bold" style={{ color: palette[t][s.on ?? (t === "light" ? "text" : "text")] }}>
              {s.on ? "Aa" : ""}
            </span>
            <span className="font-mono text-mono" style={{ color: contrast(palette[t][s.token], "#ffffff") >= contrast(palette[t][s.token], "#0f2233") ? "#ffffff" : "#0f2233" }}>{t}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-half p-2">
        <p className="font-bold">{s.name}</p>
        <p className="font-mono text-mono text-text-muted">--hc-{s.token}</p>
        <p className="text-sm text-text-secondary">{s.use}</p>
        <dl className="grid grid-cols-2 gap-x-1 pt-1 font-mono text-mono">
          <dt className="text-text-muted">Light</dt>
          <dt className="text-text-muted">Dark</dt>
          <dd>{palette.light[s.token]}</dd>
          <dd>{palette.dark[s.token]}</dd>
          {s.on && (
            <>
              <dd><Chip fg={palette.light[s.on]} bg={palette.light[s.token]} /></dd>
              <dd><Chip fg={palette.dark[s.on]} bg={palette.dark[s.token]} /></dd>
            </>
          )}
        </dl>
      </div>
    </li>
  );
}

export default function Color() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Color"
        lead="A small palette with strict jobs. Every color has a light and a dark value, a name that says what it's for, and a contrast check against what sits on it."
        meta={[{ label: "Tokens", value: String(Object.keys(palette.light).length) }, { label: "Format", value: "CSS variables" }]}
      />

      <Section title="The 60 · 30 · 10 split" intro="Most of a screen is neutral, some is surface and text, and only a little is brand color. That's what makes the blue mean something.">
        <div className="flex h-8 overflow-hidden rounded-md border border-border">
          <div className="flex w-[60%] items-end bg-bg p-1 font-mono text-mono text-text-muted">60% background</div>
          <div className="flex w-[30%] items-end bg-surface p-1 font-mono text-mono text-text-muted">30% surface + text</div>
          <div className="flex w-[7%] items-end bg-primary p-1 font-mono text-mono text-on-primary">7%</div>
          <div className="flex w-[3%] bg-gold" />
        </div>
        <p className="pt-1 font-mono text-mono text-text-muted">Blue about 7%, gold about 3%. If a screen is mostly blue, nothing on it stands out.</p>
      </Section>

      {groups.map((g) => (
        <Section key={g.title} title={g.title} intro={g.intro}>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {g.items.map((s) => <Swatch key={s.token} s={s} />)}
          </ul>
        </Section>
      ))}

      <Section title="Color jobs" intro="Each color has one job. Using it for anything else teaches people the wrong thing.">
        <Table
          head={["Color", "Means", "Never use it for"]}
          rows={[
            ["Blue", "You can act here, or you are here", "Decoration, large backgrounds, headings"],
            ["Gold", "Points, prizes, winning", "Warnings, buttons that don't involve points"],
            ["Green", "Done, saved, won", "Titles, brand moments, “go” buttons"],
            ["Amber", "Heads up: low stock, closing soon", "Points (that's gold)"],
            ["Red", "Error, or this can't be undone", "Emphasis, sales, notifications"],
          ]}
        />
      </Section>

      <Section title="In use">
        <DoDont
          doText="Blue for the one action, gold for the points, words next to every status."
          dontText="Gold buttons, red for emphasis, a green title, status shown by color alone."
          doExample={
            <div className="flex flex-col items-start gap-2">
              <Badge tone="success">Completed</Badge>
              <Button>Redeem for 60 pts</Button>
            </div>
          }
          dontExample={
            <div className="flex flex-col items-start gap-2">
              <span className="size-2 rounded-pill bg-success" />
              <span className="rounded-sm bg-gold px-3 py-1 font-bold text-white">Continue</span>
            </div>
          }
        />
      </Section>

      <Section title="Dark mode isn't inverted">
        <Grid cols={3}>
          <InfoCard kicker="Brand" title="Lighter, less saturated">#1a6dbd becomes #4a9eef. The same blue would be too dark to read on navy.</InfoCard>
          <InfoCard kicker="Surfaces" title="Elevation by lightness">Shadows barely show on dark. Raised surfaces are lighter instead: #0a1520, #101d2a, #152536.</InfoCard>
          <InfoCard kicker="Text" title="Never pure white">#eef3f8 at about 17 : 1. Pure white glows on dark backgrounds.</InfoCard>
        </Grid>
        <Callout title="Contrast on every swatch" tone="rule">
          The numbers under each swatch are worked out from the token values when this page builds. See Contrast and hierarchy for every pair in use.
        </Callout>
      </Section>
    </article>
  );
}
