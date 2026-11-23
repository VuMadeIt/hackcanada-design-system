import type { Metadata } from "next";
import { PageHeader, Section, Table, List, Grid, InfoCard } from "@/components/site/Doc";
import { PageLayoutDemo } from "@/components/docs/PatternDemos";

export const metadata: Metadata = { title: "Page layout" };

export default function PageLayout() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Page layout" lead="Every dashboard page uses the same four-part structure, so hackers always know where to look." />
      <Section title="The structure" intro="A real Store page, split into its four parts. Narrow your window to see the phone layout.">
        <PageLayoutDemo />
        <Table
          head={["", "Part", "Rule"]}
          mono={[0]}
          rows={[
            ["1", "Page header", "One H1. One primary action at most, top right on desktop, full-width below the title on phones."],
            ["2", "Summary", "What changed since last time: points, rank, what's next. At most 4 stat cards."],
            ["3", "Main", "The list or the task. Filters sit right above it, never in a sidebar."],
            ["4", "Aside", "Supporting info like the bet slip or your team. Becomes a bottom sheet on phones."],
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
