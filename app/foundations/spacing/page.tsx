import type { Metadata } from "next";
import { PageHeader, Section, P, Table, Callout, Grid, InfoCard, List } from "@/components/site/Doc";
import { InsideOutside, SnapDemo } from "@/components/docs/SpacingDemos";

export const metadata: Metadata = { title: "Spacing: rule of 8" };

const scale: [string, number, string][] = [
  ["half", 4, "Icon to badge text, chip padding, focus ring offset"],
  ["1", 8, "Icon to label, inside a field, tight lists"],
  ["2", 16, "Small card padding, between fields on phones, phone page margin"],
  ["3", 24, "Card padding, grid gutter, between fields"],
  ["4", 32, "Dialog padding, desktop page padding, between groups"],
  ["5", 40, "Large card padding"],
  ["6", 48, "Section gap on phones"],
  ["8", 64, "Section gap on desktop"],
  ["10", 80, "Hero padding"],
  ["12", 96, "Large hero"],
  ["16", 128, "Page top on marketing pages"],
];

export default function Spacing() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing: rule of 8"
        lead="Every gap, padding, margin, size and line height is a multiple of 8. The one exception is 4, the half step, for tight spots inside a component."
        meta={[{ label: "Base", value: "8 px" }, { label: "Half step", value: "4 px" }, { label: "Borders", value: "1 px (not spacing)" }]}
      />

      <Callout title="The rule" tone="rule">
        If a number isn&apos;t 4 or a multiple of 8, it&apos;s wrong. No 10, 12, 14, 18 or 20. The default Tailwind scale is turned off, so those classes don&apos;t exist here.
      </Callout>

      <Section title="Why 8" intro="It isn't magic. It's a number that makes a lot of other things easy.">
        <Grid cols={3}>
          <InfoCard kicker="Screens" title="Scales cleanly">Common screen densities are 1×, 1.5×, 2× and 3×. 8 × 1.5 = 12, so nothing lands on half a pixel.</InfoCard>
          <InfoCard kicker="Decisions" title="Fewer choices">With 8, 16 and 24, there&apos;s no arguing over 14 vs 15. Teams move faster when the answer is already decided.</InfoCard>
          <InfoCard kicker="Industry" title="Everyone uses it">Material Design, Apple&apos;s HIG, IBM Carbon, Atlassian and Shopify Polaris are all built on 8 with a 4 sub-step.</InfoCard>
        </Grid>
      </Section>

      <Section title="The scale" intro="Bars are drawn at real size.">
        <div className="overflow-hidden rounded-md hairline bg-surface">
          {scale.map(([t, px, use]) => (
            <div key={t} className="grid items-center gap-2 hairline-b px-3 py-1 last:border-b-0 md:grid-cols-[96px_64px_1fr_280px]">
              <span className="font-mono text-mono font-bold">spacing-{t}</span>
              <span className="font-mono text-mono text-text-muted">{px} px</span>
              <span className="h-2 rounded-xs bg-primary" style={{ width: px }} />
              <span className="text-sm text-text-secondary">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Try it" intro="Drag to any number. It snaps to the nearest step, and the card shows the real padding.">
        <SnapDemo />
      </Section>

      <Section title="Inside is smaller than between" intro="This is proximity from Gestalt, turned into numbers. Items in a group sit closer than the groups do.">
        <InsideOutside />
        <Table
          head={["Level", "Gap", "Example"]}
          mono={[1]}
          rows={[
            ["Inside a control", "4 to 8", "Icon to label in a button"],
            ["Inside a group", "8 to 16", "Label, input and helper text"],
            ["Between groups", "24 to 32", "One field to the next"],
            ["Between sections", "48 to 64", "One section of a page to the next"],
          ]}
        />
      </Section>

      <Section title="When 4 is allowed" intro="Only inside a component, where 8 is too loose.">
        <Grid cols={2}>
          <InfoCard kicker="Allowed" title="Tight internals">
            <List className="pb-0" items={["Icon to text in a badge", "Badge and chip padding", "Between avatar stack items", "Focus ring offset", "Label to input on dense tables"]} />
          </InfoCard>
          <InfoCard kicker="Not allowed" title="Layout">
            <List className="pb-0" items={["Between cards", "Page or card padding", "Between sections", "Grid gutters"]} />
          </InfoCard>
        </Grid>
      </Section>

      <Section title="Sizes are on the grid too">
        <Table
          head={["Thing", "Sizes"]}
          mono={[1]}
          rows={[
            ["Controls (button, input, select)", "32 · 40 · 48 · 56"],
            ["Icons", "16 · 24 · 32"],
            ["Avatars", "24 · 32 · 40 · 48 · 64"],
            ["Touch targets", "≥ 44 (we use 48)"],
            ["Sidebar", "256"],
            ["Reading width", "640"],
            ["Page max width", "1200 content, 1440 shell"],
          ]}
        />
        <P>Borders are 1 px and sit inside the box, so a 40 px button is 40 px with or without one.</P>
      </Section>

      <Section title="Fixing the Figma file" intro="The Figma file had thousands of off-grid values. Here are the most common, and what they became.">
        <Table
          head={["Figma value", "How often", "Becomes", "Why"]}
          mono={[0, 1, 2]}
          rows={[
            ["10", "302 gaps", "8", "Tight spacing, rounded down"],
            ["11", "649 paddings", "8 or 16", "Chips get 8, cards get 16"],
            ["12", "401 gaps", "8 or 16", "Inside a group 8, between items 16"],
            ["14", "754 paddings", "16", "Nearest step"],
            ["18", "—", "16", "Nearest step"],
            ["20", "108 gaps", "16 or 24", "Inside a card 16, between cards 24"],
            ["22", "—", "24", "Nearest step"],
            ["28", "—", "32", "Nearest step"],
            ["68", "40 gaps", "64", "Section spacing"],
          ]}
        />
        <P>The full audit, with radii and type, is in Blueprints › Figma audit.</P>
      </Section>
    </article>
  );
}
