import Link from "next/link";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@astryxdesign/core/Badge";
import { registry } from "@/lib/registry";
import { Section, Table, List } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";
import { ExampleTabs } from "@/components/site/ExampleTabs";
import { DemoPlayground, DemoVariants, DemoStates, DemoSpec, DemoDoDont, DemoThumb } from "@/components/docs/demos";

export function generateStaticParams() {
  return registry.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = registry.find((c) => c.slug === slug);
  return { title: doc?.name ?? "Component", description: doc?.summary };
}

const hcDir = join(process.cwd(), "components/hc");

function source(name: string) {
  const symbol = name.replace(/(^|\s)(\w)/g, (_, __, c: string) => c.toUpperCase()).replace(/\s/g, "");
  for (const f of readdirSync(hcDir)) {
    const src = readFileSync(join(hcDir, f), "utf8");
    if (new RegExp(`export (function|const) ${symbol}\\b`).test(src)) return { symbol, file: f.replace(/\.tsx$/, "") };
  }
  return null;
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = registry.find((c) => c.slug === slug);
  if (!doc) notFound();
  const src = source(doc.name);
  const importLine = src ? `import { ${src.symbol} } from "@/components/hc/${src.file}";` : null;

  return (
    <article>
      <header className="flex flex-col gap-2 pb-6">
        <div className="flex flex-wrap items-center gap-1">
          <Badge label={doc.category} variant="blue" />
          <Badge label="Stable" variant="success" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">{doc.name}</h1>
        <p className="max-w-prose text-lg text-pretty text-text-secondary">{doc.summary}</p>
        <dl className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {src && (
            <div className="flex items-center gap-1">
              <dt className="text-text-muted">Source</dt>
              <dd className="font-mono text-caption text-text">components/hc/{src.file}.tsx</dd>
            </div>
          )}
          {doc.figma && (
            <div className="flex items-center gap-1">
              <dt className="text-text-muted">Figma</dt>
              <dd className="text-text">{doc.figma}</dd>
            </div>
          )}
        </dl>
      </header>

      <ExampleTabs preview={<DemoPlayground slug={doc.slug} />} code={<CodeBlock code={doc.code} title={`${doc.name}.tsx`} />} />

      <Section title="Usage">
        {importLine && <CodeBlock code={importLine} title="Import" />}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <div>
            <h3 className="text-base font-bold">Use it for</h3>
            <List items={doc.whenToUse} className="pt-1 pb-0 [&_li]:text-sm" />
          </div>
          <div>
            <h3 className="text-base font-bold">Skip it for</h3>
            <List items={doc.whenNot} className="pt-1 pb-0 [&_li]:text-sm" />
          </div>
        </div>
      </Section>

      <Section title="Anatomy" intro="Measured from the live component. Press G to show the 8 px grid.">
        <DemoSpec slug={doc.slug} />
        <Table
          head={["#", "Part"]}
          rows={doc.anatomy.map((a, i) => [String(i + 1), a])}
          mono={[0]}
        />
        <Table head={["Property", "Value", "Token"]} rows={doc.specs} mono={[1, 2]} />
      </Section>

      <Section title="Best practices">
        <Table
          head={["", "Guideline"]}
          rows={[
            [<Badge key="do" label="Do" variant="success" />, doc.doText],
            [<Badge key="dont" label="Don't" variant="error" />, doc.dontText],
            ...doc.content.map((c, i) => [<Badge key={`c${i}`} label="Content" variant="neutral" />, c]),
          ]}
        />
        <DemoDoDont slug={doc.slug} doText={doc.doText} dontText={doc.dontText} />
      </Section>

      <Section title="Examples">
        <h3 className="pb-2 text-lg font-bold">Variants</h3>
        <DemoVariants slug={doc.slug} />
        <h3 className="pt-4 pb-2 text-lg font-bold">States</h3>
        <DemoStates slug={doc.slug} />
      </Section>

      <Section title="Accessibility">
        <List items={doc.a11y} />
      </Section>

      <Section title="Properties">
        <Table head={["Prop", "Type", "Default", "Description"]} rows={doc.props} mono={[0, 1, 2]} />
      </Section>

      <Section title="Related">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {doc.related.map((r) => {
            const rel = registry.find((c) => c.slug === r);
            return rel ? (
              <li key={r} className="group relative flex flex-col gap-1">
                <div className="overflow-hidden rounded-lg bg-bg-muted transition-colors duration-200 group-hover:bg-border">
                  <DemoThumb slug={r} />
                </div>
                <Link href={`/components/${r}`} className="text-sm text-text-secondary after:absolute after:inset-0 group-hover:text-text">
                  {rel.name}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </Section>
    </article>
  );
}
