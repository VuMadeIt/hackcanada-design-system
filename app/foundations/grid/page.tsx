import type { Metadata } from "next";
import { PageHeader, Section, P, Table, Callout, Grid, InfoCard, List } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Grid and layout" };

const bps = [
  { name: "Phone", w: 375, cols: 4, gutter: 16, margin: 16, note: "375 to 639" },
  { name: "Tablet", w: 768, cols: 8, gutter: 24, margin: 24, note: "640 to 1023" },
  { name: "Desktop", w: 1440, cols: 12, gutter: 24, margin: 32, note: "1024 and up, plus a 256 sidebar" },
];

function Frame({ b }: { b: (typeof bps)[number] }) {
  return (
    <figure className="flex flex-col gap-1">
      <div className="relative h-20 overflow-hidden rounded-md hairline bg-surface">
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${b.cols}, 1fr)`, columnGap: `${(b.gutter / b.w) * 100}%`, padding: `0 ${(b.margin / b.w) * 100}%` }}>
          {Array.from({ length: b.cols }).map((_, i) => <span key={i} className="bg-primary/10" />)}
        </div>
        <div className="absolute inset-x-0 top-0 flex h-3 items-center justify-center border-b border-border bg-surface/80 font-mono text-mono text-text-muted">{b.w}</div>
      </div>
      <figcaption className="flex flex-col">
        <span className="font-bold">{b.name}</span>
        <span className="text-sm text-text-muted">{b.cols} columns</span>
        <span className="text-sm text-text-muted">{b.gutter} px gutter</span>
        <span className="text-sm text-text-muted">{b.margin} px margin</span>
      </figcaption>
    </figure>
  );
}

export default function GridPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Grid and layout"
        lead="12 columns on desktop, 8 on tablet, 4 on phones. Gutters and margins come from the spacing scale, so the grid and the spacing never fight."
        meta={[{ label: "Shortcut", value: "G toggles the grid on any page" }]}
      />
      <Callout title="Press G" tone="rule">Turn on the column overlay right now and check this page against its own grid.</Callout>

      <Section title="Breakpoints">
        <div className="grid items-start gap-3 md:grid-cols-[1fr_2fr_3fr]">
          {bps.map((b) => <Frame key={b.name} b={b} />)}
        </div>
        <Table
          head={["Name", "Width", "Columns", "Gutter", "Margin", "Tailwind"]}
          mono={[1, 2, 3, 4, 5]}
          rows={[
            ["Phone", "< 640", "4", "16", "16", "(base)"],
            ["Large phone", "640", "4", "16", "16", "sm:"],
            ["Tablet", "768", "8", "24", "24", "md:"],
            ["Laptop", "1024", "12", "24", "32", "lg: (sidebar appears)"],
            ["Desktop", "1280", "12", "24", "32", "xl:"],
            ["Wide", "1440", "12", "24", "40", "2xl: (content stops growing)"],
          ]}
        />
      </Section>

      <Section title="The dashboard shell" intro="The frame every page sits in.">
        <div className="blueprint overflow-hidden rounded-md hairline">
          <div className="grid h-40 grid-cols-[64px_1fr] md:grid-cols-[128px_1fr]">
            <div className="flex flex-col gap-1 border-r border-border bg-surface p-1">
              <span className="text-caption text-text-muted">256</span>
              {Array.from({ length: 6 }).map((_, i) => <span key={i} className={`h-2 rounded-xs ${i === 1 ? "bg-primary-soft" : "bg-bg-muted"}`} />)}
            </div>
            <div className="flex flex-col">
              <div className="flex h-4 items-center justify-between border-b border-border bg-surface px-2 text-caption text-text-muted"><span>Top bar 56</span><span>Search · theme</span></div>
              <div className="flex flex-1 gap-2 p-2">
                <div className="flex flex-1 flex-col gap-1 rounded-sm border border-dashed border-border-strong p-1 text-caption text-text-muted">
                  <span>Content · max 1200 · padding 32</span>
                  <div className="grid flex-1 grid-cols-3 gap-1">{[0, 1, 2].map((i) => <span key={i} className="rounded-xs bg-surface shadow-card" />)}</div>
                </div>
                <div className="hidden w-16 flex-col gap-half rounded-sm border border-dashed border-border-strong p-1 text-caption text-text-muted xl:flex">On this page 192</div>
              </div>
            </div>
          </div>
        </div>
        <List items={["Sidebar is 256 wide from 1024 up. Below that it becomes a sheet from the left.", "Top bar is 56 high, sticky, with a 1 px bottom border.", "Content is padded 32 (16 on phones) and stops at 1200.", "Reading text stops at 640, even inside a wider column."]} />
      </Section>

      <Section title="Common spans" intro="Desktop column counts for the layouts we use most.">
        <div className="flex flex-col gap-1 rounded-md hairline bg-surface p-2">
          {[[12], [6, 6], [4, 4, 4], [3, 3, 3, 3], [8, 4], [9, 3]].map((row, i) => (
            <div key={i} className="grid grid-cols-12 gap-1">
              {row.map((s, j) => (
                <span key={j} className="flex h-4 items-center justify-center rounded-xs bg-primary-soft font-mono text-mono text-primary-ink" style={{ gridColumn: `span ${s}` }}>{s}</span>
              ))}
            </div>
          ))}
        </div>
        <Table
          head={["Layout", "Desktop", "Tablet", "Phone"]}
          mono={[1, 2, 3]}
          rows={[
            ["Stat cards", "3 + 3 + 3 + 3", "4 + 4", "4"],
            ["Store grid", "4 + 4 + 4", "4 + 4", "4"],
            ["Bets + slip", "8 + 4", "8", "4 (slip becomes a sheet)"],
            ["Form", "6, centered", "6", "4"],
            ["Article", "8 (640 max)", "8", "4"],
          ]}
        />
      </Section>

      <Section title="Rules">
        <Grid cols={2}>
          <InfoCard kicker="L1 · L2" title="Columns flex, gutters don't">Columns grow with the screen. Gutters and margins stay fixed at each breakpoint.</InfoCard>
          <InfoCard kicker="L3" title="Measure, not width">Long text stops at 640 even when the column is wider. Lines over 80 characters are hard to follow.</InfoCard>
          <InfoCard kicker="L4" title="Content first, then breakpoints">Add a breakpoint where the layout breaks, not where a device happens to be.</InfoCard>
          <InfoCard kicker="L5" title="Align to something">Every edge lines up with a column, a gutter or another element. Nothing floats.</InfoCard>
        </Grid>
        <P>Container queries are used inside components (like the store card) so they lay out by their own width, not the screen&apos;s.</P>
      </Section>
    </article>
  );
}
