import type { Metadata } from "next";
import { PageHeader, Section, P, Table, Callout } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Figma audit" };

function Bars({ data, on }: { data: [number, number][]; on: (v: number) => boolean }) {
  const max = Math.max(...data.map((d) => d[1]));
  return (
    <div className="flex h-30 items-end gap-1 rounded-md border border-border bg-surface p-2">
      {data.map(([v, n]) => (
        <div key={v} className="flex flex-1 flex-col items-center gap-half">
          <span className="font-mono text-mono text-text-muted tabular">{n}</span>
          <span className={`w-full rounded-xs ${on(v) ? "bg-primary" : "bg-spec"}`} style={{ height: `${(n / max) * 160}px` }} />
          <span className="font-mono text-mono font-bold">{v}</span>
        </div>
      ))}
    </div>
  );
}

const ok = (v: number) => v === 4 || v % 8 === 0;

export default function FigmaAudit() {
  return (
    <article>
      <PageHeader
        eyebrow="Blueprints"
        title="Figma audit"
        lead="What the Hack Canada Figma file actually used, pulled from the Figma API, and how each value was brought onto the grid."
        meta={[{ label: "File", value: "hacker dashboard !!" }, { label: "Pages", value: "mockups · References · archives" }, { label: "Frames", value: "1440 and 375 wide" }]}
      />
      <Callout title="Blue is on the grid, red is off" tone="rule">Bars are counts of each value across all frames in the file.</Callout>
      <Section title="Gaps">
        <Bars on={ok} data={[[8, 433], [10, 302], [12, 401], [16, 141], [20, 108], [24, 20], [40, 24], [68, 40]]} />
        <P>About 55% of gaps were off the grid. 10 and 12 were used almost as much as 8, for the same job.</P>
      </Section>
      <Section title="Padding">
        <Bars on={ok} data={[[8, 340], [11, 649], [12, 349], [14, 754], [16, 1035], [20, 294], [24, 224], [32, 74], [64, 26]]} />
      </Section>
      <Section title="Radius">
        <Table
          head={["Figma", "Becomes", "Token"]}
          mono={[0, 1, 2]}
          rows={[["4", "4", "xs"], ["8, 10", "8", "sm"], ["12", "8 or 16", "sm / md by size"], ["14, 16, 18", "16", "md"], ["22, 24", "24", "lg"], ["30", "32", "xl"], ["999", "999", "pill"]]}
        />
        <P>12 was the most used radius (456 times). It was split: small things like buttons and inputs got 8, cards got 16.</P>
      </Section>
      <Section title="Type">
        <Table
          head={["Figma style", "Before", "After"]}
          mono={[1, 2]}
          rows={[["Header 1", "56 / 75.6", "56 / 64"], ["Header 2", "32 / 43.2 · 500", "32 / 40 · 700"], ["Large Body", "22 / 29.7", "20 / 28"], ["Body", "18 / 24.3", "18 / 28"], ["Secondary", "14 / 18.9", "14 / 20"]]}
        />
      </Section>
      <Section title="Frames reviewed">
        <P>Betting Home, Betting Leaderboard, earn points, points shop, Mini Game (play, won, lost), HI-FI Points Store, Checkout, Mini-Games Hub, Beaver and Reflex, and Colors Styles.</P>
      </Section>
    </article>
  );
}
