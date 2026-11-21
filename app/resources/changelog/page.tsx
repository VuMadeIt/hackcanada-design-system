import type { Metadata } from "next";
import { PageHeader, Section, List } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Changelog" };

export default function Changelog() {
  return (
    <article>
      <PageHeader eyebrow="Resources" title="Changelog" lead="What changed in the system, newest first." />
      <Section title="1.0 · November 2026">
        <List
          items={[
            "First release: principles, 11 foundations, 35 components, 5 patterns, 3 blueprints.",
            "Spacing scale replaced with the rule of 8, with 4 as the only half step.",
            "New tokens: primary-ink for blue text on blue tints, border-input for 3 : 1 control borders.",
            "Success darkened to #157043 to pass AA on its soft background.",
            "Primary darkened from #1c74c9 to #1a6dbd so blue eyebrows and links pass AA on the page background and on blue tints. Spec red darkened to #d1373d so labels on it pass.",
            "Live redlines on every component page, measured from the real DOM.",
            "21 micro-interactions, all respecting reduced motion.",
          ]}
        />
      </Section>
      <Section title="0.9 · Dashboard redesign">
        <List items={["Red replaced with blue and gold.", "Dark mode added. Light is the default.", "Heroicons replace the old mixed icon set.", "Gradient and green titles removed."]} />
      </Section>
    </article>
  );
}
