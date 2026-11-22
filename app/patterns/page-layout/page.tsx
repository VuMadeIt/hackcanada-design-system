import type { Metadata } from "next";
import { PageHeader, Section, Table, List, Grid, InfoCard } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Page layout" };

function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-1 rounded-pill bg-border-strong/60 ${className}`} />;
}

function Part({ n, name, className = "", children }: { n: number; name: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`relative rounded-sm border border-border bg-bg p-2 pt-4 ${className}`}>
      <span className="absolute top-1 left-2 text-caption text-text-muted">
        {n} · {name}
      </span>
      {children}
    </div>
  );
}

export default function PageLayout() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Page layout" lead="Every dashboard page uses the same four-part structure, so hackers always know where to look." />
      <Section title="The structure">
        <div className="mb-3 flex flex-col gap-2 rounded-md border border-border bg-bg-muted/60 p-3">
          <Part n={1} name="Header" className="flex items-end justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="block h-2 w-20 rounded-pill bg-text/80" />
              <Bar className="w-32" />
            </div>
            <span className="block h-4 w-12 rounded-sm bg-primary" />
          </Part>
          <Part n={2} name="Summary" className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1 rounded-sm border border-border p-1">
                <Bar className="w-6" />
                <span className="block h-2 w-10 rounded-pill bg-text/70" />
              </div>
            ))}
          </Part>
          <div className="grid grid-cols-12 gap-2">
            <Part n={3} name="Main" className="col-span-12 flex flex-col gap-1 md:col-span-8">
              {[32, 24, 28, 20].map((w, i) => (
                <div key={i} className="flex items-center gap-2 border-b border-border py-1 last:border-0">
                  <span className="size-3 rounded-xs bg-primary-soft" />
                  <Bar className={w === 32 ? "w-32" : w === 24 ? "w-24" : w === 28 ? "w-28" : "w-20"} />
                </div>
              ))}
            </Part>
            <Part n={4} name="Aside" className="col-span-12 flex flex-col gap-1 md:col-span-4">
              <Bar className="w-full" />
              <Bar className="w-16" />
              <span className="mt-1 block h-4 w-full rounded-sm bg-gold/70" />
            </Part>
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
