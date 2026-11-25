import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, P, Table, Callout, Grid, InfoCard, List } from "@/components/site/Doc";
import { DurationDemo, EasingDemo, SpringDemo } from "@/components/docs/MotionDemos";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        lead="Motion has a job: show where something came from, what changed, or that you earned something. If it doesn't do one of those, it doesn't move."
        meta={[{ label: "Library", value: "Motion 12 + Motion Primitives" }, { label: "Durations", value: "4" }, { label: "Curves", value: "3" }]}
      />

      <Section title="What motion is for">
        <Grid cols={3}>
          <InfoCard kicker="Feedback" title="I heard you">A press scales to 0.98 in 100 ms. A toggle slides. Something always happens within 100 ms of a click.</InfoCard>
          <InfoCard kicker="Orientation" title="Where did it go?">Dialogs grow from the button that opened them. Sheets slide from the edge they live on. Tabs slide their underline.</InfoCard>
          <InfoCard kicker="Reward" title="You earned it">Points count up, the coin spins, confetti falls. The only place motion is allowed to be big.</InfoCard>
        </Grid>
      </Section>

      <Section title="Durations" intro="Four steps. Small things move fast and big things move slower, because they cover more ground.">
        <DurationDemo />
        <Table
          head={["Token", "Value", "Use"]}
          mono={[0, 1]}
          rows={[
            ["duration-100", "100 ms", "Press, checkbox, switch, color change"],
            ["duration-200", "200 ms", "Hover, tooltip, small entrance, tab underline"],
            ["duration-300", "300 ms", "Dialog, sheet, accordion, toast"],
            ["duration-500", "500 ms", "Page hero, reward reveal"],
            ["(game only)", "600 ms +", "Cup shuffle swaps, tree felling, confetti"],
          ]}
        />
      </Section>

      <Section title="Easing" intro="Real objects don't move at a constant speed. They speed up and slow down.">
        <EasingDemo />
        <P>Exits are faster than entrances: about 70% of the time. People care about what&apos;s arriving, not what&apos;s leaving.</P>
      </Section>

      <Section title="Springs" intro="For things you drag or toggle, springs feel more physical than curves, and they can be interrupted mid-move without a jump.">
        <SpringDemo />
      </Section>

      <Section title="Scroll progress" intro="The thin blue bar at the very top of this page. It's Motion Primitives' Scroll Progress, with their default spring: stiffness 200, damping 50, rest delta 0.001.">
        <Callout title="Why a spring here?" tone="info">Scroll events come in bursts. A spring smooths them out so the bar glides instead of jumping on every wheel tick.</Callout>
      </Section>

      <Section title="Reduced motion" intro="Some people get dizzy or sick from motion. When their system asks for less, we listen.">
        <List
          items={[
            "All CSS animation and transition durations drop to 1 ms.",
            "Motion components check useReducedMotion() and skip movement, keeping only fades.",
            "Nothing that carries meaning is motion-only. A reward still shows a toast with text.",
            "Auto-playing loops, like the component carousel, stop.",
          ]}
        />
        <P>Try it: turn on “Reduce motion” in your OS settings, then reload this page.</P>
      </Section>

      <Section title="Motion Primitives we use">
        <Table
          head={["Primitive", "Where"]}
          mono={[0]}
          rows={[
            ["ScrollProgress", "Top of every docs page"],
            ["AnimatedNumber", "Points balance, stat cards"],
            ["SlidingNumber", "Countdown timers"],
            ["InView", "Section reveals on the home page"],
            ["InfiniteSlider", "Component carousel"],
            ["AnimatedBackground", "Segmented controls, nav hover"],
            ["TextShimmer", "Loading labels"],
            ["Magnetic", "The big Play button in the games hub"],
          ]}
        />
        <P>
          Every one of them is on the <Link href="/micro-interactions" className="font-bold text-primary hover:underline">micro-interactions</Link> page, running live.
        </P>
      </Section>
    </article>
  );
}
