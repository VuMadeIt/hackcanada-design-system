import type { Metadata } from "next";
import { PageHeader, Section, Table } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";

export const metadata: Metadata = { title: "Use with Claude" };

const prompt = `Use the Hack Canada design system from github.com/VuMadeIt/hackcanada-design-system.
Read AGENTS.md first. Build a hacker dashboard screen that shows
the points balance, today's challenges and the store.
Light theme, rule of 8 spacing, one primary button.`;

export default function UseWithClaude() {
  return (
    <article>
      <PageHeader
        eyebrow="Resources"
        title="Use with Claude"
        lead="The system is written so Claude can read it straight from the repo: tokens, components, rules and real images, all in code."
      />
      <Section title="What Claude reads">
        <Table
          head={["File", "Gives Claude"]}
          mono={[0]}
          rows={[
            ["AGENTS.md", "The rules in one page: spacing, color roles, type, contrast, motion"],
            ["CLAUDE.md", "Points Claude Code at AGENTS.md"],
            ["app/globals.css", "Every token, light and dark"],
            ["components/hc/*", "The components themselves"],
            ["lib/registry-*.ts", "Usage, anatomy, specs, do and don't, accessibility, props"],
            ["lib/images.ts", "Mascot, brand, team, game and store art"],
          ]}
        />
      </Section>
      <Section title="Set it up in Claude">
        <Table
          head={["Step", "Do this"]}
          mono={[0]}
          rows={[
            ["1", "In Claude, open Design systems and create a new one."],
            ["2", "Connect GitHub and pick this repo, so Claude reads tokens and components from code."],
            ["3", "Add the Satoshi font and the logo from public/ if Claude asks for brand assets."],
            ["4", "Review the draft: check colors, type and a few components against this site."],
            ["5", "Publish it to your organization once it matches."],
          ]}
        />
      </Section>
      <Section title="Example prompt">
        <CodeBlock code={prompt} title="Prompt" />
      </Section>
    </article>
  );
}
