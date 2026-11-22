import type { Metadata } from "next";
import { HomeIcon as HomeOutline, TrophyIcon, BellIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";
import { PageHeader, Section, P, Table, Callout, DoDont, Grid, InfoCard } from "@/components/site/Doc";
import { IconGallery } from "@/components/docs/IconGallery";
import { Button } from "@/components/hc/Button";

export const metadata: Metadata = { title: "Iconography" };

export default function Iconography() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        lead="Heroicons, by the makers of Tailwind. It's the set Meta's Astryx design system ships with: simple outlines, one stroke width, drawn on a 24 px grid."
        meta={[{ label: "Library", value: "@heroicons/react 2" }, { label: "License", value: "MIT" }, { label: "Stroke", value: "1.5 px" }]}
      />

      <Section title="Sizes" intro="Three sizes, all on the grid. The icon sits in a box of the same size, so it lines up with text and other icons.">
        <div className="blueprint grid gap-4 rounded-md hairline p-4 sm:grid-cols-3">
          {[
            [16, "size-2", "20 solid set. Inline with 14 px text, inputs."],
            [24, "size-3", "24 outline set. Default: nav, buttons, cards."],
            [32, "size-4", "24 outline, scaled. Empty states, feature cards."],
          ].map(([px, cls, use]) => (
            <div key={px as number} className="flex flex-col items-start gap-1">
              <span className="flex h-4 items-end"><span className="outline outline-1 outline-dashed outline-spec"><TrophyIcon className={cls as string} /></span></span>
              <span className="font-mono text-mono font-bold">{px}</span>
              <span className="max-w-30 text-sm text-text-secondary">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Outline and solid" intro="Outline is the default. Solid means selected, so the current page in the nav switches to the solid version.">
        <div className="flex gap-2">
          <span className="flex h-5 items-center gap-1 rounded-sm px-2 text-text-secondary"><HomeOutline className="size-3" />Home</span>
          <span className="flex h-5 items-center gap-1 rounded-sm bg-primary-soft px-2 font-bold text-primary-ink"><HomeSolid className="size-3" />Home</span>
        </div>
      </Section>

      <Section title="The set" intro="The 48 icons we use most. Click one to copy its name.">
        <IconGallery />
      </Section>

      <Section title="Rules">
        <Table
          head={["Rule", "Why"]}
          rows={[
            ["Pair icons with a label, except for universal ones (close, search, menu)", "An icon alone is a guessing game. Hidden labels go in aria-label."],
            ["Icons take the text color, never their own", "They should support the label, not compete with it."],
            ["Icon to label gap is 8 (4 in badges)", "Same as the rest of the spacing rules."],
            ["Icon-only buttons are still 40 × 40 (48 on phones)", "The icon is 24, the hit area isn't."],
            ["Decorative icons get aria-hidden", "Screen readers would otherwise read “image”."],
            ["One icon set only", "Mixing sets mixes stroke widths and corner styles. It's the fastest way to look unfinished."],
          ]}
        />
      </Section>

      <Section title="Do and don't">
        <DoDont
          doText="One set, one stroke, the label next to it."
          dontText="Filled and outline mixed, a colored icon on a colored tile on a card."
          doExample={<Button variant="secondary" leading={<BellIcon />}>Notify me</Button>}
          dontExample={
            <span className="flex items-center gap-1 rounded-md hairline p-1">
              <span className="grid size-6 place-items-center rounded-sm bg-success-soft"><BellIcon className="size-3 text-success" /></span>
              <span className="grid size-6 place-items-center rounded-sm bg-gold-soft text-xl">🔔</span>
            </span>
          }
        />
        <Callout title="No emoji as icons" tone="warn">Emoji render differently on every platform, and some show as empty boxes. The old dashboard had this bug on the applications page.</Callout>
      </Section>

      <Section title="Brand illustration">
        <Grid cols={2}>
          <InfoCard kicker="Beavers" title="For moments, not navigation">The beaver illustrations are for empty states, onboarding and big wins. Never as an icon inside a button.</InfoCard>
          <InfoCard kicker="Size" title="Same height in a set">When beavers sit side by side, they&apos;re trimmed to their edges and shown at the same height.</InfoCard>
        </Grid>
        <P>See Imagery for the full illustration and photo rules.</P>
      </Section>
    </article>
  );
}
