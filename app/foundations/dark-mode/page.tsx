import type { Metadata } from "next";
import { PageHeader, Section, P, Table, Callout, Grid, InfoCard, List } from "@/components/site/Doc";
import { palette } from "@/lib/tokens";
import { contrast } from "@/lib/contrast";

export const metadata: Metadata = { title: "Dark mode" };

const pairs = ["bg", "surface", "surface-raised", "primary", "gold", "text", "text-muted", "border"] as const;

export default function DarkMode() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Dark mode"
        lead="Light is the default. Dark is designed alongside it, not flipped from it: the same hierarchy and the same contrast, with less glare at 3 am."
        meta={[{ label: "Default", value: "Light" }, { label: "Stored", value: "localStorage hc-theme" }]}
      />

      <Section title="Side by side">
        <div className="grid overflow-hidden rounded-md border border-border md:grid-cols-2">
          {(["light", "dark"] as const).map((t) => {
            const p = palette[t];
            return (
              <div key={t} className="flex flex-col gap-2 p-3" style={{ background: p.bg, color: p.text }}>
                <span className="font-mono text-mono" style={{ color: p["text-muted"] }}>{t}</span>
                <div className="flex flex-col gap-1 rounded-md p-3" style={{ background: p.surface, border: `1px solid ${p.border}` }}>
                  <p className="text-xl font-semibold">Meet a sponsor</p>
                  <p className="text-sm" style={{ color: p["text-secondary"] }}>Get scanned at any booth for points.</p>
                  <div className="flex items-center gap-1 pt-1">
                    <span className="flex h-5 items-center rounded-sm px-2 text-sm font-bold" style={{ background: p.primary, color: p["on-primary"] }}>Start</span>
                    <span className="flex h-3 items-center rounded-pill px-1 text-caption font-bold" style={{ background: p["gold-soft"], color: p["gold-ink"] }}>+40 pts</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="How the values change">
        <Table
          head={["Token", "Light", "Dark", "Dark on bg"]}
          mono={[0, 1, 2, 3]}
          rows={pairs.map((k) => [k, palette.light[k], palette.dark[k], `${contrast(palette.dark[k], palette.dark.bg).toFixed(2)} : 1`])}
        />
      </Section>

      <Section title="Rules">
        <Grid cols={2}>
          <InfoCard kicker="D1" title="Not pure black">The page is #0b1520, a deep navy. Pure black makes surfaces look like holes, and smears on OLED screens when you scroll.</InfoCard>
          <InfoCard kicker="D2" title="Not pure white">Text is #eef3f8. Large white areas, like photo tiles and the NO button, use a soft blue gray instead.</InfoCard>
          <InfoCard kicker="D3" title="Lighter means higher">bg → surface → raised gets lighter as it gets closer. Shadows help a bit, but lightness does most of the work.</InfoCard>
          <InfoCard kicker="D4" title="Brand gets lighter">Primary goes from #1a6dbd to #4a9eef, and the text on it flips to dark navy so it still passes.</InfoCard>
          <InfoCard kicker="D5" title="Native controls follow">color-scheme is set, so dropdowns, scrollbars and date pickers are dark too. The old dashboard had white dropdowns in dark mode.</InfoCard>
          <InfoCard kicker="D6" title="No flash on load">A small inline script sets the theme before the page paints, so there&apos;s no white flash.</InfoCard>
        </Grid>
      </Section>

      <Section title="How it works">
        <List
          items={[
            "Tokens are CSS variables. Dark values live under [data-theme=\"dark\"].",
            "Tailwind's dark: variant is tied to the same attribute, so components rarely need it.",
            "The choice is saved as hc-theme. Light is used unless someone picks dark.",
          ]}
        />
        <Callout title="Test both, every time" tone="rule">A screen isn&apos;t done until it&apos;s been checked in both themes. Most dark-mode bugs are a hard-coded white or black.</Callout>
        <P>Use the sun and moon button in the top bar to switch this site.</P>
      </Section>
    </article>
  );
}
