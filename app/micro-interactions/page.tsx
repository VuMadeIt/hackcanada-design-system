import type { Metadata } from "next";
import { PageHeader, Section, Table, Callout } from "@/components/site/Doc";
import { MicroGallery } from "@/components/docs/MicroGallery";

export const metadata: Metadata = { title: "Micro-interactions" };

export default function MicroInteractions() {
  return (
    <article>
      <PageHeader
        eyebrow="Motion"
        title="Micro-interactions"
        lead="Every small moment of motion in Hack Canada, running live. Each one lists what triggers it, its timing, and whether it's ours or from Motion Primitives."
        meta={[{ label: "Count", value: "21" }, { label: "Library", value: "Motion 12" }]}
      />
      <Callout title="Every one respects reduced motion" tone="rule">Turn on Reduce motion in your OS settings and reload. Movement drops out and only fades and color changes stay.</Callout>
      <Section title="Gallery" intro="Click, hover and type. Some have a replay button in the corner.">
        <MicroGallery />
      </Section>
      <Section title="Anatomy of a micro-interaction" intro="From Dan Saffer's model. If you can't name all four, it isn't designed yet.">
        <Table
          head={["Part", "Question", "Redeem example"]}
          rows={[
            ["Trigger", "What starts it?", "Clicking Redeem"],
            ["Rules", "What happens?", "Check balance and stock, then take the points"],
            ["Feedback", "How do I know?", "Label slides to “Redeeming”, then a green check"],
            ["Loops and modes", "What happens next time?", "Sold out: the button is disabled and says why"],
          ]}
        />
      </Section>
    </article>
  );
}
