import type { Metadata } from "next";
import { PageHeader, Section, Table } from "@/components/site/Doc";
import { StatesDemo } from "@/components/docs/PatternDemos";

export const metadata: Metadata = { title: "Empty, loading, error" };

export default function States() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Empty, loading, error" lead="Every list has four states. Designers usually draw one. The other three are where people get stuck." />
      <Section title="Switch between them">
        <StatesDemo />
      </Section>
      <Section title="When to use what">
        <Table
          head={["State", "Show", "Timing"]}
          rows={[
            ["Loading", "Skeletons in the shape of the real content", "Only after 300 ms, so fast loads don't flash"],
            ["Empty", "A beaver, one sentence on why it's empty, one action", "Right away"],
            ["Error", "What failed, that nothing was lost, and Try again", "Right away, keep the old content if there was any"],
            ["Ready", "The content", "Fade in over 200 ms"],
          ]}
        />
      </Section>
    </article>
  );
}
