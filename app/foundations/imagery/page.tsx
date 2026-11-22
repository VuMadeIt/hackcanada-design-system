import type { Metadata } from "next";
import { PageHeader, Section, Table, Callout, Grid, InfoCard } from "@/components/site/Doc";
import { Img } from "@/components/site/Images";
import { imageSlots } from "@/lib/images";

export const metadata: Metadata = { title: "Imagery" };

const beavers = imageSlots.filter((i) => i.group === "Mascot").map((i) => i.id);
const shop = imageSlots.filter((i) => i.group === "Store").map((i) => i.id);

export default function Imagery() {
  return (
    <article>
      <PageHeader eyebrow="Foundations" title="Imagery" lead="Three kinds of picture: beaver illustrations for personality, product photos for the store, and game art for the mini-games. Each has its own rules." />

      <Section title="Beavers" intro="The Hack Canada mascot. Use one per view, for empty states, onboarding, wins and the home hero.">
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {beavers.map((b) => (
            <li key={b} className="flex flex-col gap-1">
              <div className="grid h-16 place-items-center rounded-md bg-bg-muted p-2">
                <Img id={b} alt="" className="h-12 w-auto object-contain" />
              </div>
              <span className="font-mono text-mono text-text-muted">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Product photos" intro="Shown whole, never cropped, on a soft tile so photos with white backgrounds don't glare.">
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {shop.map((s) => (
            <li key={s} className="grid aspect-square place-items-center rounded-sm bg-bg-muted p-2">
              <Img id={s} className="max-h-full w-auto rounded-xs object-contain mix-blend-multiply dark:mix-blend-normal" />
            </li>
          ))}
        </ul>
        <Table
          head={["Rule", "Detail"]}
          rows={[
            ["Fit, don't crop", "object-contain inside a square tile. Every product stays recognizable."],
            ["Soft tile, not white", "bg-muted in light, a blue gray in dark. Pure white tiles glare."],
            ["Tap to enlarge", "Clicking a photo opens it full size, capped to the screen height."],
            ["Fallback", "If a photo fails, show a flat tile with a 32 px Heroicon. No card inside the card."],
            ["Alt text", "The product name and size, like “LED strips, 10 ft”."],
          ]}
        />
      </Section>

      <Section title="Game art">
        <Grid cols={2}>
          <div className="grid h-30 place-items-center rounded-md bg-bg-muted">
            <Img id="games.cup" alt="Blue cup from Cup Shuffle" className="h-20 w-auto" />
          </div>
          <Img id="games.timber" alt="Timber Tycoon gameplay" className="aspect-[3/2] w-full rounded-md" />
        </Grid>
        <Grid cols={2} className="pt-2">
          <InfoCard kicker="Source" title="From Figma, recolored">The cup is the exact Figma art, recolored to brand blue. Never redraw an asset that already exists.</InfoCard>
          <InfoCard kicker="License" title="Original only">Game art is original or properly licensed. No characters, logos or music from other games.</InfoCard>
        </Grid>
      </Section>

      <Callout title="Performance" tone="info">Photos are at most 800 px on the long side and under 120 KB. Illustrations are PNG with transparency or SVG.</Callout>
    </article>
  );
}
