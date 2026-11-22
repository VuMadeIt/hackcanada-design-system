import type { Metadata } from "next";
import { PageHeader, Section, P, List, Table, Callout, Grid, InfoCard } from "@/components/site/Doc";
import { ContrastChecker } from "@/components/docs/ContrastChecker";
import { contrast, grade } from "@/lib/contrast";
import { palette, type ColorToken } from "@/lib/tokens";

export const metadata: Metadata = { title: "Contrast and hierarchy" };

const pairs: [ColorToken, ColorToken, string][] = [
  ["text", "bg", "Body text on the page"],
  ["text", "surface", "Body text on a card"],
  ["text-secondary", "surface", "Secondary text"],
  ["text-muted", "surface", "Muted text, captions"],
  ["text-muted", "bg-muted", "Muted text on a tile"],
  ["on-primary", "primary", "Primary button label"],
  ["primary", "surface", "Links, active nav"],
  ["primary-ink", "primary-soft", "Active nav item, primary badges"],
  ["gold-ink", "gold-soft", "Points chip"],
  ["success", "success-soft", "Success badge"],
  ["warning", "warning-soft", "Warning badge"],
  ["danger", "danger-soft", "Error badge"],
  ["danger", "surface", "Error message"],
  ["border-input", "surface", "Input, checkbox and switch borders (3 : 1)"],
  ["border-strong", "surface", "Decorative dividers (no minimum)"],
];

function Cell({ r }: { r: number }) {
  const g = grade(r);
  return (
    <span className="flex items-center gap-1">
      <span className="tabular">{r.toFixed(2)}</span>
      <span className={g === "Fail" ? "text-danger" : g === "AA large" ? "text-warning" : "text-success"}>{g}</span>
    </span>
  );
}

export default function Contrast() {
  return (
    <article>
      <PageHeader
        eyebrow="Principles"
        title="Contrast and hierarchy"
        lead="Contrast is how people find their way around a screen. It's how readable the text is, and also how clear the order of importance is. Both are measured, not guessed."
        meta={[{ label: "Standard", value: "WCAG 2.2 AA" }, { label: "Checked", value: "Light and dark" }]}
      />

      <Section title="The numbers" intro="WCAG measures contrast as a ratio from 1 : 1 (same color) to 21 : 1 (black on white).">
        <Table
          head={["What", "Minimum", "Why"]}
          rows={[
            ["Body text under 24 px (19 px bold)", "4.5 : 1", "WCAG 1.4.3, AA"],
            ["Large text, 24 px and up or 19 px bold", "3 : 1", "WCAG 1.4.3, AA"],
            ["Icons, input borders, focus rings", "3 : 1", "WCAG 1.4.11, non-text contrast"],
            ["Long reading text (our target)", "7 : 1", "WCAG 1.4.6, AAA"],
            ["Disabled controls", "No minimum", "But the reason should still be readable nearby"],
          ]}
        />
      </Section>

      <Section title="Try it" intro="Pick any two tokens and see the ratio in either theme. Start with the pair that looks risky.">
        <ContrastChecker />
      </Section>

      <Section title="Every pair we use" intro="Calculated from the real token values every time this page is built. If a token changes and a pair fails, it shows here first.">
        <Table
          head={["Pair", "Used for", "Light", "Dark"]}
          mono={[0]}
          rows={pairs.map(([f, b, use]) => [
            `${f} on ${b}`,
            use,
            <Cell key="l" r={contrast(palette.light[f], palette.light[b])} />,
            <Cell key="d" r={contrast(palette.dark[f], palette.dark[b])} />,
          ])}
        />
        <Callout title="What we changed to pass" tone="warn">
          The old light red error text was 3.1 : 1 on its pink background and failed. Danger is now #b42318, which passes AA on both white and its soft background.
          Muted text was darkened from #66768a to #5c6b7e so it passes on tiles too. Blue text on blue tints uses primary-ink, because brand blue drops to 4.2 : 1 there. Input borders got their own darker token to reach 3 : 1.
        </Callout>
      </Section>

      <Section title="Hierarchy is contrast too" intro="Readable isn't enough. The most important thing should also have the most contrast.">
        <Grid cols={3}>
          <InfoCard kicker="Size" title="Bigger reads first">A 32 px title against 16 px body is a 2× jump. Smaller steps, like 18 against 16, don&apos;t read as a different level.</InfoCard>
          <InfoCard kicker="Weight" title="Bold sparingly">Use 700 for titles and key numbers, 500 for labels, 400 for body. If everything is bold, nothing stands out.</InfoCard>
          <InfoCard kicker="Color" title="Three text levels">Text for content, secondary for support, muted for meta. Never more than three on one card.</InfoCard>
        </Grid>
        <List
          items={[
            "Squint test: blur your eyes. The primary action and the title should still stand out.",
            "Grayscale test: turn color off. If the order of importance disappears, it was relying on color alone.",
            "Titles are always solid text colors. Gradient and green titles failed this test in the old dashboard.",
          ]}
        />
      </Section>

      <Section title="Glare in dark mode">
        <P>
          High contrast isn&apos;t always better. Pure white on near-black is 19 : 1 and causes halation: letters seem to blur and glow, especially for people with
          astigmatism. Dark mode text is #eef3f8 on #0b1520 (about 17 : 1), and large white areas like photo tiles use a soft blue gray instead of white.
        </P>
      </Section>
    </article>
  );
}
