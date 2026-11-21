import type { Metadata } from "next";
import { PageHeader, Section, P, Table, Callout, Grid, InfoCard, List } from "@/components/site/Doc";
import { Button } from "@/components/hc/Button";

export const metadata: Metadata = { title: "Accessibility" };

export default function Accessibility() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Accessibility"
        lead="WCAG 2.2 AA in both themes, on every component. About 1 in 4 adults has a disability. At a 1,000-person hackathon, that's a lot of people."
        meta={[{ label: "Target", value: "WCAG 2.2 AA" }, { label: "Touch", value: "≥ 44 × 44" }, { label: "Focus", value: "2 + 2 px ring" }]}
      />

      <Section title="Perceivable">
        <Table
          head={["Rule", "Standard", "How we meet it"]}
          rows={[
            ["Text contrast 4.5 : 1, large 3 : 1", "1.4.3", "Every pair is computed on the Contrast page"],
            ["Icons and borders 3 : 1", "1.4.11", "border-input token for controls"],
            ["Not color alone", "1.4.1", "Status always has a word or icon"],
            ["Text resizes to 200%", "1.4.4", "rem-based type, no fixed heights on text boxes"],
            ["Reflow at 320 px", "1.4.10", "Every page works at 320 px with no sideways scroll"],
            ["Alt text", "1.1.1", "Products get names; decorative images get alt=\"\""],
          ]}
        />
      </Section>

      <Section title="Operable">
        <Grid cols={2}>
          <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-3">
            <p className="font-bold">Focus ring</p>
            <p className="text-sm text-text-secondary">Tab to these. 2 px of background, then 2 px of primary, so it shows on any surface.</p>
            <div className="flex gap-1"><Button>Primary</Button><Button variant="secondary">Secondary</Button></div>
          </div>
          <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-3">
            <p className="font-bold">Touch target</p>
            <p className="text-sm text-text-secondary">A 24 px icon gets a 48 px hit area on phones.</p>
            <span className="relative grid size-6 place-items-center rounded-sm outline outline-1 outline-dashed outline-spec">
              <span className="size-3 rounded-xs bg-primary" />
              <span className="absolute -bottom-3 font-mono text-mono text-spec">48</span>
            </span>
          </div>
        </Grid>
        <List
          items={[
            "Everything works with a keyboard. Tab moves, Enter and Space act, Escape closes, arrows move inside groups.",
            "Focus is never trapped, except inside an open dialog, and it goes back to the trigger when the dialog closes.",
            "A skip link is the first thing on every page.",
            "Nothing needs hover. Tooltips also open on focus.",
            "Timers like bet closing times show the end time, not only a countdown.",
            "Nothing flashes more than 3 times a second.",
          ]}
        />
      </Section>

      <Section title="Understandable">
        <List
          items={[
            "Labels sit above inputs and stay visible. Placeholders are examples, never labels.",
            "Errors say what went wrong and how to fix it, next to the field, linked with aria-describedby.",
            "Buttons say what they do: “Redeem for 60 pts”, not “OK”.",
            "Spending points always asks once, and shows the balance after.",
          ]}
        />
      </Section>

      <Section title="Robust">
        <Table
          head={["Pattern", "Markup"]}
          mono={[1]}
          rows={[
            ["Switch", "button role=switch aria-checked"],
            ["Tabs", "role=tablist / tab / tabpanel, aria-selected"],
            ["Segmented control", "role=radiogroup, aria-checked"],
            ["Dialog", "role=dialog aria-modal aria-labelledby"],
            ["Toast", "aria-live=polite region"],
            ["Progress", "role=progressbar aria-valuenow/min/max"],
            ["Countdown", "role=timer"],
            ["Current page", "aria-current=page"],
          ]}
        />
      </Section>

      <Section title="How we test">
        <Grid cols={3}>
          <InfoCard kicker="Keyboard" title="Unplug the mouse">Finish every main task with Tab, Enter, Space, Escape and arrows.</InfoCard>
          <InfoCard kicker="Screen reader" title="VoiceOver and NVDA">Check that every control says its name, role and state.</InfoCard>
          <InfoCard kicker="Zoom" title="200% and 320 px">Nothing overlaps, nothing is cut off, nothing scrolls sideways.</InfoCard>
        </Grid>
        <Callout title="Reduced motion is accessibility" tone="rule">See Motion. Animation is turned down for anyone who asks for less.</Callout>
        <P>Automated checks (axe) catch about a third of problems. The rest needs a person.</P>
      </Section>
    </article>
  );
}
