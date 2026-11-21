import type { Metadata } from "next";
import { PageHeader, Section, Table, Grid, InfoCard, List } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Voice and content" };

export default function Voice() {
  return (
    <article>
      <PageHeader eyebrow="Foundations" title="Voice and content" lead="We sound like a friendly organizer at the help desk: clear, quick and a little bit fun. Never like a bank, never like a meme account." />

      <Section title="Voice">
        <Grid cols={3}>
          <InfoCard kicker="Clear" title="Say the thing">“Your team is full.” Not “Unable to complete the requested operation.”</InfoCard>
          <InfoCard kicker="Quick" title="Hackers are busy">Short sentences. The most important word first. One idea per line.</InfoCard>
          <InfoCard kicker="Warm" title="A little fun">Celebrate wins. Beaver jokes are fine on empty states, never on errors.</InfoCard>
        </Grid>
      </Section>

      <Section title="Words we use">
        <Table
          head={["Say", "Not", "Why"]}
          rows={[
            ["Points, pts", "Coins, credits, XP", "One name for one thing"],
            ["Redeem", "Buy, purchase, checkout", "You earned it, you aren't paying"],
            ["Bet", "Wager, stake, gamble", "Plain and friendly"],
            ["Hacker", "User, participant", "It's who they are here"],
            ["Organizer", "Admin, staff", "How the team calls itself"],
            ["Sign in", "Log in, login", "One phrase everywhere"],
            ["Team", "Group, squad", "Matches the rules"],
          ]}
        />
      </Section>

      <Section title="Buttons">
        <List
          items={[
            "Start with a verb: Redeem, Start challenge, Join team.",
            "Say the cost when there is one: “Redeem for 60 pts”.",
            "Two or three words. Sentence case. No full stop.",
            "Destructive buttons say what's lost: “Leave team”, not “Confirm”.",
          ]}
        />
      </Section>

      <Section title="Errors" intro="What happened, then what to do next. Never blame the person.">
        <Table
          head={["Bad", "Good"]}
          rows={[
            ["Error 409", "Someone just redeemed the last one. Pick another prize?"],
            ["Invalid input", "Enter an email like you@school.ca"],
            ["Insufficient balance", "You need 20 more points. Try a challenge to earn them."],
            ["Request failed", "That didn't save. Check your connection and try again."],
          ]}
        />
      </Section>

      <Section title="Mechanics">
        <List
          items={[
            "Sentence case for everything except the Hack Canada name.",
            "Numbers as digits: 3 plays left, not three.",
            "1,240 pts with a comma. Times as 2:30 pm in copy, 14:30 on the schedule.",
            "No emoji in the interface. They render differently everywhere.",
          ]}
        />
      </Section>
    </article>
  );
}
