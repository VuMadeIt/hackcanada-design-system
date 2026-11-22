import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/site/Doc";
import { DohertyDemo, FittsDemo, GoalGradientDemo, HickDemo, MillerDemo, VonRestorffDemo } from "@/components/docs/LawDemos";

export const metadata: Metadata = { title: "UX laws" };

type Law = { t: string; rule: string; here: string; demo?: React.ReactNode; source: string };

const laws: Law[] = [
  { t: "Fitts's law", rule: "The time to hit a target depends on its size and distance. Big, close targets are faster.", here: "Buttons are at least 40 high, touch targets at least 44. Primary actions sit where the thumb already is: the bottom of a phone sheet, the right of a dialog.", demo: <FittsDemo />, source: "Paul Fitts, 1954" },
  { t: "Hick's law", rule: "The more choices there are, the longer it takes to pick one.", here: "The store groups prizes before listing them. Bet Points shows Open, Closed and Mine instead of every filter at once.", demo: <HickDemo />, source: "Hick and Hyman, 1952" },
  { t: "Doherty threshold", rule: "People stay in flow when the system answers in under 400 ms.", here: "Every click gets feedback within 100 ms, even if the server takes longer: a pressed state, a spinner, an optimistic update.", demo: <DohertyDemo />, source: "Doherty and Thadani, IBM, 1982" },
  { t: "Goal-gradient effect", rule: "People speed up as they get closer to a goal.", here: "Challenge progress and points toward a prize are always shown as a bar with “N more to go”.", demo: <GoalGradientDemo />, source: "Clark Hull, 1932" },
  { t: "Miller's law", rule: "People hold about 7 (plus or minus 2) things in working memory. Chunking helps.", here: "Codes and long numbers are split into groups. Navigation has at most 9 items per group.", demo: <MillerDemo />, source: "George Miller, 1956" },
  { t: "Von Restorff effect", rule: "The item that looks different is the one people remember.", here: "Gold marks the one thing that's special: the top prize, the winner, your rank. Use it once per view.", demo: <VonRestorffDemo />, source: "Hedwig von Restorff, 1933" },
  { t: "Jakob's law", rule: "People spend most of their time on other sites, so they expect yours to work the same way.", here: "The sidebar, search with Ctrl K, tabs and dialogs all behave like the tools hackers already use every day.", source: "Jakob Nielsen" },
  { t: "Aesthetic-usability effect", rule: "People think good-looking products are easier to use, and forgive small problems in them.", here: "Polish isn't extra. Alignment, spacing and consistent states are part of how usable the dashboard feels.", source: "Kurosu and Kashimura, 1995" },
  { t: "Peak-end rule", rule: "People judge an experience by its best moment and its end.", here: "The peaks are earning points and winning a game, so they get motion and sound. The end of a flow is always a clear success screen.", source: "Daniel Kahneman" },
  { t: "Zeigarnik effect", rule: "People remember unfinished tasks better than finished ones.", here: "In-progress challenges stay at the top of the list with an “In progress” badge until they're done.", source: "Bluma Zeigarnik, 1927" },
  { t: "Serial position effect", rule: "People remember the first and last items in a list best.", here: "The most used pages sit at the top and bottom of the sidebar: Home first, your profile last.", source: "Hermann Ebbinghaus" },
  { t: "Tesler's law", rule: "Every system has some complexity that can't be removed, only moved.", here: "Odds, payouts and stock math happen on the server. The hacker sees one number: what they'd win.", source: "Larry Tesler" },
  { t: "Postel's law", rule: "Be liberal in what you accept and conservative in what you send.", here: "Forms accept emails with spaces and capitals and clean them up. Phone numbers take any format.", source: "Jon Postel" },
  { t: "Occam's razor", rule: "Of two designs that both work, pick the simpler one.", here: "Before adding a new component, check if an existing one with a new variant can do the job.", source: "William of Ockham" },
  { t: "Pareto principle", rule: "Roughly 80% of the effects come from 20% of the causes.", here: "Home, challenges and the store get the most polish, because that's where hackers spend most of their time.", source: "Vilfredo Pareto" },
  { t: "Law of Prägnanz", rule: "People read complex shapes in the simplest way they can.", here: "Cards are plain rectangles with one radius. Icons are simple outlines at one stroke width.", source: "Gestalt psychology" },
];

export default function UxLaws() {
  return (
    <article>
      <PageHeader
        eyebrow="Principles"
        title="UX laws"
        lead="Sixteen findings from psychology and HCI research, and what each one means for the Hack Canada dashboard. Some have demos you can try."
        meta={[{ label: "Further reading", value: "Laws of UX by Jon Yablonski" }]}
      />
      <Callout title="Laws, not rules" tone="info">
        These describe how people behave. The rules on the other pages are how we act on them.
      </Callout>
      {laws
        .filter((l) => l.demo)
        .map((l) => (
          <Section key={l.t} title={l.t} intro={l.rule}>
            {l.demo}
            <p className="pt-2 text-sm text-text-secondary">{l.here}</p>
            <p className="pt-1 text-caption text-text-muted">{l.source}</p>
          </Section>
        ))}
      <Section title="More laws" intro="No demo needed. Here is what each one changes.">
        <dl className="divide-y divide-border border-y border-border">
          {laws
            .filter((l) => !l.demo)
            .map((l) => (
              <div key={l.t} className="grid gap-1 py-3 md:grid-cols-[192px_1fr] md:gap-3">
                <dt>
                  <p className="text-sm font-bold">{l.t}</p>
                  <p className="text-caption text-text-muted">{l.source}</p>
                </dt>
                <dd className="text-sm">
                  <p className="text-text">{l.rule}</p>
                  <p className="pt-half text-text-muted">{l.here}</p>
                </dd>
              </div>
            ))}
        </dl>
      </Section>
    </article>
  );
}
