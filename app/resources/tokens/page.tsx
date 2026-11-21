import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PageHeader, Section, Table } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";
import { palette } from "@/lib/tokens";

export const metadata: Metadata = { title: "Tokens" };

export default function Tokens() {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const theme = css.slice(css.indexOf("@theme {"), css.indexOf("}", css.indexOf("@theme {")) + 1);
  return (
    <article>
      <PageHeader eyebrow="Resources" title="Tokens" lead="Every token in one place, read straight from the stylesheet when the site builds, so this page can't drift." />
      <Section title="Color">
        <Table head={["Token", "Light", "Dark"]} mono={[0, 1, 2]} rows={Object.keys(palette.light).map((k) => [`--hc-${k}`, palette.light[k as keyof typeof palette.light], palette.dark[k as keyof typeof palette.dark]])} />
      </Section>
      <Section title="Theme block" intro="Copy this into a new project's globals.css.">
        <CodeBlock lang="css" title="app/globals.css · @theme" code={theme} />
      </Section>
    </article>
  );
}
