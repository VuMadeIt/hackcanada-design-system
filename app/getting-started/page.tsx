import type { Metadata } from "next";
import { PageHeader, Section, P, List, Callout, Table, Grid, InfoCard } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";

export const metadata: Metadata = { title: "Getting started" };

export default function GettingStarted() {
  return (
    <article>
      <PageHeader
        eyebrow="Start here"
        title="Getting started"
        lead="How the system is put together, where things live, and the three rules to learn before you build anything."
        meta={[
          { label: "Stack", value: "Next.js 15 · Tailwind 4 · Motion" },
          { label: "Icons", value: "Heroicons 24 outline" },
          { label: "Font", value: "Satoshi" },
        ]}
      />

      <Section title="Who this is for" intro="Anyone who builds a screen for Hack Canada.">
        <Grid cols={3}>
          <InfoCard kicker="Designers" title="Rebuild in Figma">Every component page lists sizes, padding, radius and type, so you can rebuild it without opening the code.</InfoCard>
          <InfoCard kicker="Engineers" title="Copy and ship">Each component has a code sample, a props table and the tokens it uses.</InfoCard>
          <InfoCard kicker="Organizers" title="Write the words">Voice and content explains how to write buttons, errors and announcements.</InfoCard>
        </Grid>
      </Section>

      <Section title="The three rules" intro="If you remember nothing else, remember these.">
        <ol className="grid gap-2 md:grid-cols-3">
          {[
            ["Everything is a multiple of 8", "Spacing, sizes and line heights use 8, 16, 24, 32 and so on. 4 is the only half step, for tight spots inside a component."],
            ["Blue acts, gold rewards", "Primary blue means you can do something. Gold only ever means points. Red is only for errors and destructive actions."],
            ["One thing leads", "Every screen has one primary button and one focal point. If two things shout, neither is heard."],
          ].map(([t, b], i) => (
            <li key={t} className="flex flex-col gap-1 rounded-md border border-border bg-surface p-3">
              <span className="grid size-4 place-items-center rounded-pill bg-primary font-mono text-mono font-bold text-on-primary">{i + 1}</span>
              <p className="pt-1 text-lg font-bold">{t}</p>
              <p className="text-sm text-text-secondary">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Install" intro="The dashboard already has all of this. For a new Hack Canada project, start here.">
        <CodeBlock lang="bash" title="Terminal" code={`npm i motion @heroicons/react clsx tailwind-merge`} />
        <P>Then copy the theme block from Tokens into your global CSS. It replaces Tailwind&apos;s default spacing, so a class like p-3 means 24 px, not 12.</P>
        <CodeBlock
          lang="css"
          title="globals.css"
          code={`@import "tailwindcss";

@theme {
  --spacing-*: initial;   /* turn off the default 4 px scale */
  --spacing-half: 4px;
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  /* ...see Tokens for the full list */
}`}
        />
        <Callout title="Why replace the default scale?">
          Tailwind&apos;s default scale has 2, 6, 10 and 14 px steps. Taking them out means an off-grid value can&apos;t be typed by accident. If a class doesn&apos;t exist, it isn&apos;t on the grid.
        </Callout>
      </Section>

      <Section title="How the scale maps to classes">
        <Table
          head={["Class", "Value", "Typical use"]}
          mono={[0, 1]}
          rows={[
            ["gap-half · p-half", "4", "Icon to badge text, inside chips"],
            ["gap-1 · p-1", "8", "Icon to label, between related items"],
            ["gap-2 · p-2", "16", "Inside small cards, between form fields"],
            ["gap-3 · p-3", "24", "Card padding, grid gutters"],
            ["gap-4 · p-4", "32", "Dialog padding, between groups"],
            ["gap-6", "48", "Between page sections on phones"],
            ["gap-8", "64", "Between page sections on desktop"],
          ]}
        />
      </Section>

      <Section title="Where things live">
        <Table
          head={["Folder", "What's in it"]}
          mono={[0]}
          rows={[
            ["app/globals.css", "Tokens: color, type, spacing, radius, shadow, motion"],
            ["components/hc", "Hack Canada components"],
            ["components/motion-primitives", "Motion Primitives, used for reveals, numbers and sliders"],
            ["lib/registry-*.ts", "The docs for every component on this site"],
          ]}
        />
      </Section>

      <Section title="Before you ship a screen">
        <List
          items={[
            "Every spacing value is on the scale. Run npm run lint:spacing to check.",
            "Text passes 4.5:1, large text and icons 3:1, in both themes.",
            "It works with the keyboard alone, and focus is always visible.",
            "Touch targets are at least 44 × 44 px on phones.",
            "It looks right at 375, 768, 1024 and 1440 px wide.",
            "Motion is turned down when reduced motion is on.",
          ]}
        />
      </Section>
    </article>
  );
}
