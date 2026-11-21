import type { Metadata } from "next";
import { PageHeader, Section, List } from "@/components/site/Doc";
import { ChallengeCard } from "@/components/hc/Domain";
import { Timeline } from "@/components/hc/Display";

export const metadata: Metadata = { title: "Challenge flow" };

export default function ChallengeFlow() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Challenge flow" lead="How a hacker finds a challenge, starts it, gets checked and gets paid." />
      <Section title="The three states" intro="The same card, as it moves through the flow.">
        <div className="grid gap-3 md:grid-cols-3">
          <ChallengeCard title="Meet a sponsor" category="Sponsor" points={40} difficulty="Medium" status="not_started" qr />
          <ChallengeCard title="Meet a sponsor" category="Sponsor" points={40} difficulty="Medium" status="in_progress" qr />
          <ChallengeCard title="Meet a sponsor" category="Sponsor" points={40} difficulty="Medium" status="completed" qr />
        </div>
      </Section>
      <Section title="Steps">
        <div className="max-w-prose rounded-md border border-border bg-surface p-3">
          <Timeline
            steps={[
              { title: "Start the challenge", body: "Press Start. The card moves to In progress and your QR code unlocks.", state: "done" },
              { title: "Do the thing", body: "Visit the booth, ship the feature, make the friend.", state: "done" },
              { title: "Get checked", body: "A volunteer scans your QR. Challenges without a QR are checked by an organizer.", state: "current" },
              { title: "Get paid", body: "Points land right away with a toast and a count-up.", state: "todo" },
            ]}
          />
        </div>
      </Section>
      <Section title="Rules">
        <List
          items={[
            "In-progress challenges stay at the top of the list (Zeigarnik effect).",
            "Points are always shown on the card before starting.",
            "Difficulty sets the points: easy 25, medium 40, hard 60.",
            "The timeline line stops at the edge of each circle and never runs through it.",
          ]}
        />
      </Section>
    </article>
  );
}
