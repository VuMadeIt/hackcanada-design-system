import type { Metadata } from "next";
import { PageHeader, Section, Table, List } from "@/components/site/Doc";
import { StoreBlueprint } from "@/components/docs/BlueprintScreens";

export const metadata: Metadata = { title: "Store screen" };

export default function StoreBp() {
  return (
    <article>
      <PageHeader eyebrow="Blueprints" title="Store screen" lead="The full store, built from real components, measured live. Turn on measurements to see every box, gap and padding. Press G for the column grid." />
      <Section title="Blueprint">
        <div className="overflow-x-auto"><StoreBlueprint /></div>
      </Section>
      <Section title="Measurements">
        <Table
          head={["Element", "Value", "Token"]}
          mono={[1, 2]}
          rows={[
            ["Page padding", "32", "p-4"],
            ["Header to filters", "32", "gap-4"],
            ["Grid gutter", "24", "gap-3"],
            ["Card padding", "16", "p-2"],
            ["Card radius / image radius", "16 / 8", "rounded-md / rounded-sm (S4)"],
            ["Image tile", "1 : 1, contain, 16 inset", "aspect-square p-2"],
            ["Redeem button", "40 high", "h-5"],
            ["Search field", "40 high, 240 wide", "h-5 w-30"],
          ]}
        />
      </Section>
      <Section title="Responsive">
        <List items={["3 columns from 1024, 2 from 640, 1 below.", "Filters scroll sideways on phones; search moves under them.", "The points pill stays in the header on every size."]} />
      </Section>
    </article>
  );
}
