import type { Metadata } from "next";
import { PageHeader, Section, P, List, Callout } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Design principles" };

const principles = [
  {
    n: "01",
    t: "Clear before clever",
    lead: "Hackers look at the dashboard for a few seconds between prompts. They should know what to do in one look.",
    means: ["Labels say exactly what happens: “Redeem for 60 pts”, not “Continue”.", "Status is written out, not only colored.", "Fun lives in the games and rewards, not in the navigation."],
    test: "Can someone who just looked up from their code tell what this screen is for in 3 seconds?",
  },
  {
    n: "02",
    t: "One thing leads",
    lead: "Every screen has one focal point and one primary action. Everything else supports it.",
    means: ["One primary button per view. Others are secondary or ghost.", "Size, weight and color build a clear order: title, key number, action, details.", "If everything is bold, nothing is."],
    test: "Squint at the screen. Does one thing still stand out?",
  },
  {
    n: "03",
    t: "Earned, not given",
    lead: "Points should feel like progress. Rewards are moments, so they get motion and gold. Nothing else does.",
    means: ["Gold is reserved for points, prizes and wins.", "Earning points gets a toast, a counting number and sometimes confetti.", "Spending points always shows the balance before and after."],
    test: "If gold appeared here, would someone think they earned something?",
  },
  {
    n: "04",
    t: "Same rules everywhere",
    lead: "One grid, one type scale, one set of states. A new screen should look like it was always there.",
    means: ["Every value comes from a token. No one-off numbers.", "Light and dark are designed together, not one after the other.", "New components reuse existing parts before adding new ones."],
    test: "Could this screen be rebuilt from the docs without asking the person who made it?",
  },
  {
    n: "05",
    t: "Built for everyone in the room",
    lead: "Hack Canada brings in first-time hackers, people on old phones and people using screen readers. All of them should be able to use every feature.",
    means: ["WCAG 2.2 AA in both themes.", "Everything works with a keyboard and a screen reader.", "Nothing depends on hover, color or motion alone."],
    test: "Can you finish the task with only a keyboard, with the screen zoomed to 200%?",
  },
  {
    n: "06",
    t: "Quiet until it matters",
    lead: "The dashboard is a tool, not a billboard. Surfaces are calm so the important parts can be loud.",
    means: ["Muted backgrounds, thin borders and soft shadows.", "No decoration that doesn't carry meaning.", "Motion is short and has a job: show where something came from or what changed."],
    test: "If you removed this element, would anyone miss it?",
  },
];

export default function Principles() {
  return (
    <article>
      <PageHeader
        eyebrow="Principles"
        title="Design principles"
        lead="Six ideas that decide every trade-off in the system. When two good options compete, the principle higher on this list wins."
      />
      <Callout title="How to use these" tone="rule">
        In a review, point to a principle by number: “this breaks 02, there are two primary buttons.” It turns taste into a reason.
      </Callout>
      {principles.map((p) => (
        <Section key={p.n} id={`p-${p.n}`} title={p.t} eyebrow={`Principle ${p.n}`}>
          <P className="text-lg text-text">{p.lead}</P>
          <List items={p.means} />
          <p className="text-sm text-text-muted">
            <span className="font-medium text-text">The test:</span> {p.test}
          </p>
        </Section>
      ))}
      <Section title="Where these come from">
        <P>
          They draw on Dieter Rams&apos; ten principles (“as little design as possible”), Apple&apos;s Human Interface Guidelines (clarity, deference, depth),
          Material Design&apos;s use of hierarchy and motion with purpose, and Nielsen&apos;s ten usability heuristics. They are rewritten for one setting: a
          hackathon dashboard used in short bursts by people who are busy building something else.
        </P>
      </Section>
    </article>
  );
}
