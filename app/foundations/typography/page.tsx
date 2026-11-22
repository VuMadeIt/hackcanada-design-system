import type { Metadata } from "next";
import { PageHeader, Section, Table, Callout, DoDont, Grid, InfoCard, List } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Typography" };

const scale = [
  ["Display", "text-5xl font-bold tracking-tight", "56 / 64", "700", "−2%", "Home hero, one per site"],
  ["Heading 1", "text-3xl font-bold tracking-tight", "32 / 40", "700", "−1%", "Page titles"],
  ["Heading 2", "text-2xl font-bold tracking-tight", "24 / 32", "700", "−1%", "Section titles"],
  ["Heading 3", "text-xl font-semibold", "20 / 28", "600", "0", "Card titles, dialog titles"],
  ["Body large", "text-lg", "18 / 28", "400", "0", "Lead paragraphs"],
  ["Body", "text-base", "16 / 24", "400", "0", "Everything else"],
  ["Body small", "text-sm", "14 / 20", "400", "0", "Supporting text, tables"],
  ["Caption", "text-caption font-medium", "12 / 16", "500", "0", "Meta, badges, timestamps"],
  ["Overline", "text-mono font-bold uppercase tracking-[0.08em]", "11 / 16", "700", "+8%", "Eyebrows above titles"],
  ["Mono", "font-mono text-mono", "11 / 16", "400", "0", "Specs, code, measurements"],
] as const;

export default function Typography() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        lead="One family, ten styles, and every line height on the 4 px grid. Type does most of the work of showing what matters on a screen."
        meta={[{ label: "Family", value: "Satoshi Variable" }, { label: "Code", value: "JetBrains Mono" }, { label: "Styles", value: "10" }]}
      />

      <Section title="Satoshi" intro="A geometric sans with a friendly, slightly rounded feel. It's the face in the Hack Canada Figma file, and it holds up from 11 px captions to 56 px headlines.">
        <div className="blueprint flex flex-col gap-2 rounded-md border border-border p-4">
          <p className="text-6xl font-black tracking-tight">Aa Bb Cc 0123</p>
          <p className="text-2xl break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {[300, 400, 500, 600, 700, 900].map((w) => (
              <span key={w} className="flex flex-col">
                <span className="text-3xl" style={{ fontWeight: w }}>Ag</span>
                <span className="font-mono text-mono text-text-muted">{w}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section title="The scale" intro="Sizes step up by about 1.25. Line heights are fixed numbers, not ratios, so they always land on the grid.">
        <div className="overflow-hidden rounded-md border border-border bg-surface">
          {scale.map(([name, cls, size, weight, track, use]) => (
            <div key={name} className="grid items-baseline gap-2 border-b border-border px-3 py-2 last:border-b-0 md:grid-cols-[160px_1fr_200px]">
              <div className="flex flex-col">
                <span className="font-bold">{name}</span>
                <span className="font-mono text-mono text-text-muted">{size} · {weight} · {track}</span>
              </div>
              <p className={`${cls} min-w-0 break-words`}>{name === "Mono" ? "w 112 · h 40 · p 24" : "Find your people"}</p>
              <span className="text-sm text-text-muted">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Line height on the grid" intro="Each line box is a multiple of 4, and most are a multiple of 8. Stack them and the baselines fall on the same rhythm as the spacing.">
        <div
          className="rounded-md border border-border bg-surface p-3"
        >
          <p className="baseline-rule pb-1 text-3xl font-bold tracking-tight" style={{ "--rule-step": "40px", "--rule-at": "31px" } as React.CSSProperties}>Meet a sponsor</p>
          <p className="baseline-rule max-w-content text-base text-text-secondary" style={{ "--rule-step": "24px", "--rule-at": "17px" } as React.CSSProperties}>
            Visit any sponsor booth and get your QR scanned. Points land in your account right away. Each line here is 24 px, three rows of the 8 px grid, so
            paragraphs and the space between them always line up.
          </p>
        </div>
        <p className="pt-1 font-mono text-mono text-text-muted">Red lines mark each baseline. The title line is 40 px, body lines are 24 px.</p>
      </Section>

      <Section title="Rules">
        <List
          items={[
            "T1: Satoshi for everything. JetBrains Mono only for code, IDs and specs.",
            "T2: Line heights are multiples of 4, and most are multiples of 8.",
            "T3: Body is 16 px on every screen. Inputs are 16 px too, so iOS doesn't zoom on focus.",
            "T4: Numbers that change, like points, timers and prices, use tabular figures so they don't jitter.",
            "T5: Reading text is at most 640 px wide, about 65 to 75 characters.",
            "T6: At most three sizes and two weights on one card.",
            "T7: Titles use sentence case. Overlines are the only all-caps text.",
          ]}
        />
      </Section>

      <Section title="Do and don't">
        <DoDont
          doText="A clear jump between title and body, sentence case, solid color."
          dontText="Title and body almost the same size, all caps, gradient fill."
          doExample={
            <div>
              <p className="text-xl font-semibold">Meet a sponsor</p>
              <p className="text-sm text-text-secondary">Get scanned at any booth.</p>
            </div>
          }
          dontExample={
            <div>
              <p className="bg-gradient-to-r from-primary to-success bg-clip-text text-base font-medium text-transparent uppercase">Meet A Sponsor</p>
              <p className="text-base text-text-muted">Get scanned at any booth.</p>
            </div>
          }
        />
      </Section>

      <Section title="Numbers">
        <Grid cols={2}>
          <InfoCard kicker="Tabular" title="1,240 → 1,300">
            <span className="font-mono text-mono">.tabular</span> sets <span className="font-mono text-mono">font-variant-numeric: tabular-nums</span> so every digit is the same width and counting numbers don&apos;t wobble.
          </InfoCard>
          <InfoCard kicker="Format" title="Thousands get a comma">Write 1,240 pts, not 1240. Times use 24 hour on schedules (14:30) and words in copy (2:30 pm).</InfoCard>
        </Grid>
      </Section>
    </article>
  );
}
