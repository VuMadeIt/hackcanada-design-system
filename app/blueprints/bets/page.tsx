import type { Metadata } from "next";
import { PageHeader, Section, Table, List } from "@/components/site/Doc";
import { BetsBlueprint } from "@/components/docs/BlueprintScreens";

export const metadata: Metadata = { title: "Bet Points screen" };

export default function BetsBp() {
  return (
    <article>
      <PageHeader eyebrow="Blueprints" title="Bet Points screen" lead="Markets on the left, your slip and the leaderboard on the right. Both columns start at the same line." />
      <Section title="Blueprint">
        <div className="overflow-x-auto"><BetsBlueprint /></div>
      </Section>
      <Section title="Measurements">
        <Table
          head={["Element", "Value", "Token"]}
          mono={[1, 2]}
          rows={[
            ["Columns", "fluid + 320", "8 + 4 of 12"],
            ["Column gap", "24", "gap-3"],
            ["Market card padding", "24", "p-3"],
            ["YES / NO buttons", "40 high, 8 apart", "h-5 gap-1"],
            ["Odds bar", "8 high, pill", "h-1 rounded-pill"],
            ["Leaderboard row", "56 high", "h-7"],
          ]}
        />
      </Section>
      <Section title="Rules">
        <List items={["The tops of both columns line up.", "NO is a secondary button, never a faded one, so it keeps contrast.", "On phones the slip becomes a bottom sheet that opens when you pick a side."]} />
      </Section>
    </article>
  );
}
