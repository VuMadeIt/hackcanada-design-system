import type { Metadata } from "next";
import { PageHeader, Section, P, Table, Callout, Grid, InfoCard } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Radius and elevation" };

const radii: [string, number, string][] = [
  ["xs", 4, "Checkboxes, tags, code chips"],
  ["sm", 8, "Buttons, inputs, small tiles"],
  ["md", 16, "Cards, alerts, menus"],
  ["lg", 24, "Dialogs, sheets, hero panels"],
  ["xl", 32, "Marketing panels"],
  ["pill", 999, "Badges, points, avatars, switches"],
];

export default function RadiusElevation() {
  return (
    <article>
      <PageHeader eyebrow="Foundations" title="Radius and elevation" lead="Six radii and three levels of height. Both say the same thing: how big a thing is and how close it is to you." />

      <Section title="Radius">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {radii.map(([n, px, use]) => (
            <div key={n} className="flex flex-col gap-1">
              <div className="blueprint grid h-16 place-items-center rounded-md border border-border">
                <div className="size-10 border-2 border-primary bg-primary-soft" style={{ borderRadius: px }} />
              </div>
              <p className="font-bold">radius-{n} <span className="font-mono text-mono text-text-muted">{px === 999 ? "999" : px}</span></p>
              <p className="text-sm text-text-secondary">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Nested radius" intro="Inner radius = outer radius − padding. If you skip this, corners look pinched or bloated.">
        <Grid cols={2}>
          <figure className="flex flex-col gap-1">
            <div className="blueprint grid h-30 place-items-center rounded-md border border-border">
              <div className="rounded-md bg-surface p-1 shadow-float">
                <div className="grid h-12 w-24 place-items-center rounded-sm bg-primary-soft font-mono text-mono text-primary-ink">8</div>
              </div>
            </div>
            <figcaption className="text-sm"><b className="text-success">Right.</b> 16 outer, 8 padding, 8 inner.</figcaption>
          </figure>
          <figure className="flex flex-col gap-1">
            <div className="blueprint grid h-30 place-items-center rounded-md border border-border">
              <div className="rounded-md bg-surface p-1 shadow-float">
                <div className="grid h-12 w-24 place-items-center rounded-md bg-danger-soft font-mono text-mono text-danger">16</div>
              </div>
            </div>
            <figcaption className="text-sm"><b className="text-danger">Wrong.</b> 16 outer, 8 padding, 16 inner. The gap at the corners looks thicker.</figcaption>
          </figure>
        </Grid>
      </Section>

      <Section title="Elevation" intro="Three levels. In light mode, height is a soft shadow. In dark mode shadows barely show, so higher surfaces are also lighter.">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["0 · Flat", "border border-border bg-surface", "Cards that sit in the page. Border only."],
            ["1 · Card", "bg-surface shadow-card border border-border", "Cards you can click, sticky bars."],
            ["2 · Float", "bg-surface-raised shadow-float", "Dialogs, menus, toasts, tooltips."],
          ].map(([t, cls, use]) => (
            <div key={t} className="flex flex-col gap-2 rounded-md bg-bg-muted p-3">
              <div className={`grid h-16 place-items-center rounded-md ${cls}`}><span className="font-bold">{t}</span></div>
              <p className="text-sm text-text-secondary">{use}</p>
            </div>
          ))}
        </div>
        <Table
          head={["Token", "Light", "Dark"]}
          mono={[0, 1, 2]}
          rows={[
            ["shadow-card", "0 1 2 / 4% + 0 2 8 / 5%", "0 1 2 / 30% black"],
            ["shadow-float", "0 4 16 / 6% + 0 16 32 / 8%", "0 8 32 / 45% black + lighter surface"],
            ["shadow-focus", "2 px bg ring + 2 px primary ring", "same"],
          ]}
        />
        <Callout title="Shadows are tinted" tone="info">Light-mode shadows use the ink color (#102b3d) at low opacity, not black. Black shadows look dirty on a blue-gray page.</Callout>
      </Section>

      <Section title="Rules">
        <Grid cols={3}>
          <InfoCard kicker="S4" title="Inner = outer − padding">Always. It&apos;s the most common corner mistake.</InfoCard>
          <InfoCard kicker="E1" title="Height means on top">Only lift what is actually on top of something else. Never use shadow for decoration.</InfoCard>
          <InfoCard kicker="E2" title="One card, one level">No card inside a card. If you need grouping inside a card, use a muted tile or a divider.</InfoCard>
        </Grid>
        <P>From the Figma file: 10, 14, 18, 22 and 30 px radii were snapped to 8, 16, 16, 24 and 32.</P>
      </Section>
    </article>
  );
}
