import type { Metadata } from "next";
import { PageHeader, Section, Table, List, Grid, InfoCard } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Page layout" };

function Block({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`flex items-start rounded-sm border border-dashed border-spec bg-spec-soft p-1 font-mono text-mono text-spec-ink ${className}`}>{label}</div>;
}

export default function PageLayout() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Page layout" lead="Every dashboard page uses the same four-part structure, so hackers always know where to look." />
      <Section title="The structure">
        <div className="blueprint flex flex-col gap-3 rounded-md border border-border p-4">
          <Block label="1 · Page header · title 32/40 + one line of help + primary action on the right · 48 below" className="h-10" />
          <Block label="2 · Summary row · stat cards or a status banner · 32 below" className="h-12" />
          <div className="grid grid-cols-12 gap-3">
            <Block label="3 · Main · 8 columns" className="col-span-12 h-30 md:col-span-8" />
            <Block label="4 · Aside · 4 columns" className="col-span-12 h-30 md:col-span-4" />
          </div>
        </div>
        <Table
          head={["Part", "Rule"]}
          rows={[
            ["Page header", "One H1. One primary action at most, top right on desktop, full-width below the title on phones."],
            ["Summary", "What changed since last time: points, rank, what's next. At most 4 stat cards."],
            ["Main", "The list or the task. Filters sit right above it, never in a sidebar."],
            ["Aside", "Supporting info like the bet slip or your team. Becomes a bottom sheet on phones."],
          ]}
        />
      </Section>
      <Section title="Vertical rhythm">
        <Table head={["Between", "Desktop", "Phone"]} mono={[1, 2]} rows={[["Top bar and title", "40", "24"], ["Title and summary", "48", "32"], ["Sections", "64", "48"], ["Cards in a grid", "24", "16"], ["Page bottom", "128", "96"]]} />
      </Section>
      <Section title="Rules">
        <Grid cols={2}>
          <InfoCard kicker="Scan path" title="F pattern">People read the top line, then down the left edge. Put the title and key number top left, the action top right.</InfoCard>
          <InfoCard kicker="Density" title="Breathing room">When a page feels crowded, add space between groups before you shrink anything.</InfoCard>
        </Grid>
        <List items={["Never a card inside a card.", "Never two primary buttons on one page.", "Sticky only for the top bar and the bet slip."]} />
      </Section>
    </article>
  );
}
