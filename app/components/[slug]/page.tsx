import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { registry } from "@/lib/registry";
import { PageHeader, Section, Table, List, Grid, InfoCard } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";
import { DemoPlayground, DemoVariants, DemoStates, DemoSpec, DemoDoDont } from "@/components/docs/demos";

export function generateStaticParams() {
  return registry.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = registry.find((c) => c.slug === slug);
  return { title: doc?.name ?? "Component", description: doc?.summary };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = registry.find((c) => c.slug === slug);
  if (!doc) notFound();

  return (
    <article>
      <PageHeader
        eyebrow={`Components · ${doc.category}`}
        title={doc.name}
        lead={doc.summary}
        meta={[
          { label: "Status", value: "Stable" },
          { label: "Source", value: <code className="font-mono text-caption">components/hc</code> },
          ...(doc.figma ? [{ label: "Figma", value: doc.figma }] : []),
        ]}
      />

      <Section title="Playground" intro="Change the props and see the component update. Everything here is the real component, not a picture of it.">
        <DemoPlayground slug={doc.slug} />
      </Section>

      <Section title="Usage">
        <Grid cols={2}>
          <InfoCard kicker="Use it" title="When to use">
            <List items={doc.whenToUse} className="pt-1 pb-0" />
          </InfoCard>
          <InfoCard kicker="Skip it" title="When not to use">
            <List items={doc.whenNot} className="pt-1 pb-0" />
          </InfoCard>
        </Grid>
      </Section>

      <Section title="Anatomy" intro="Every part has a name, so design reviews and code use the same words.">
        <ol className="grid gap-1 sm:grid-cols-2">
          {doc.anatomy.map((a, i) => (
            <li key={a} className="flex items-center gap-2 rounded-sm border border-border bg-surface p-2 text-sm">
              <span className="grid size-3 shrink-0 place-items-center rounded-pill bg-spec font-mono text-mono text-on-spec">{i + 1}</span>
              {a}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Specs" intro="Redlines are measured from the live component. Toggle them off to see it clean. Every value sits on the 8 point grid.">
        <DemoSpec slug={doc.slug} />
        <div className="pt-3">
          <Table head={["Property", "Value", "Token"]} rows={doc.specs} mono={[1, 2]} />
        </div>
      </Section>

      <Section title="Variants">
        <DemoVariants slug={doc.slug} />
      </Section>

      <Section title="States" intro="Each state is shown in the current theme. Switch the theme at the top right to check the other one.">
        <DemoStates slug={doc.slug} />
      </Section>

      <Section title="Do and don't">
        <DemoDoDont slug={doc.slug} doText={doc.doText} dontText={doc.dontText} />
      </Section>

      <Section title="Accessibility">
        <List items={doc.a11y} />
      </Section>

      <Section title="Content">
        <List items={doc.content} />
      </Section>

      <Section title="Code">
        <CodeBlock code={doc.code} title={`${doc.name}.tsx`} />
        <Table head={["Prop", "Type", "Default", "Notes"]} rows={doc.props} mono={[0, 1, 2]} />
      </Section>

      <Section title="Related">
        <div className="flex flex-wrap gap-1">
          {doc.related.map((r) => {
            const rel = registry.find((c) => c.slug === r);
            return rel ? (
              <Link key={r} href={`/components/${r}`} className="flex h-5 items-center rounded-pill border border-border bg-surface px-2 text-sm font-bold hover:border-primary hover:text-primary">
                {rel.name}
              </Link>
            ) : null;
          })}
        </div>
      </Section>
    </article>
  );
}
