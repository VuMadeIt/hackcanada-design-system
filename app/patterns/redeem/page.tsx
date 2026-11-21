import type { Metadata } from "next";
import { PageHeader, Section, List, Table } from "@/components/site/Doc";
import { RedeemFlow } from "@/components/docs/PatternDemos";

export const metadata: Metadata = { title: "Redeeming a prize" };

export default function Redeem() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Redeeming a prize" lead="The most important flow in the store. Points are hard to earn, so spending them should feel safe and clear." />
      <Section title="The flow" intro="Choose, confirm, pick up. Try it.">
        <RedeemFlow />
      </Section>
      <Section title="Rules">
        <List
          items={[
            "Always show the balance before and after.",
            "The confirm button repeats the cost: “Redeem for 60 pts”.",
            "If you can't afford it, the button is disabled and says how many points you still need.",
            "Stock and balance are checked on the server at the moment of redeeming, with the balance locked.",
            "The pickup code is chunked in threes so it's easy to read out.",
          ]}
        />
      </Section>
      <Section title="Edge cases">
        <Table
          head={["Case", "What the hacker sees"]}
          rows={[
            ["Last one goes while confirming", "“Someone just took the last one.” Points are not taken."],
            ["Double click", "The button goes into its loading state on the first click. Only one redeem happens."],
            ["Offline", "“That didn't go through. Your points are safe.” with Try again."],
          ]}
        />
      </Section>
    </article>
  );
}
