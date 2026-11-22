import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { registry } from "@/lib/registry";
import { PageHeader, Section, Table, List, Grid, InfoCard } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";
import { ExampleTabs } from "@/components/site/ExampleTabs";
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
        meta={doc.figma ? [{ label: "Figma", value: doc.figma }] : undefined}
      />

      <ExampleTabs preview={<DemoPlayground slug={doc.slug} />} code={<CodeBlock code={doc.code} title={`${doc.name}.tsx`} />} />

      <Section title="Variants">
        <DemoVariants slug={doc.slug} />
      </Section>

      <Section title="States">
        <DemoStates slug={doc.slug} />
      </Section>

      <Section title="Specs" intro="Measured from the live component. Press G to show the 8 px grid.">
        <DemoSpec slug={doc.slug} />
        <div className="pt-3">
          <Table head={["Property", "Value", "Token"]} rows={doc.specs} mono={[1, 2]} />
        </div>
      </Section>

      <Section title="Usage">
        <Grid cols={2}>
          <InfoCard title="Use it for">
            <List items={doc.whenToUse} className="pt-1 pb-0 [&_li]:text-sm" />
          </InfoCard>
          <InfoCard title="Skip it for">
            <List items={doc.whenNot} className="pt-1 pb-0 [&_li]:text-sm" />
          </InfoCard>
        </Grid>
        <DemoDoDont slug={doc.slug} doText={doc.doText} dontText={doc.dontText} />
      </Section>

      <Section title="Accessibility">
        <List items={doc.a11y} />
      </Section>

      <Section title="API">
        <Table head={["Prop", "Type", "Default", "Notes"]} rows={doc.props} mono={[0, 1, 2]} />
      </Section>

      <Section title="Related">
        <div className="flex flex-wrap gap-1">
          {doc.related.map((r) => {
            const rel = registry.find((c) => c.slug === r);
            return rel ? (
              <Link key={r} href={`/components/${r}`} className="flex h-4 items-center rounded-pill border border-border px-2 text-sm font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text">
                {rel.name}
              </Link>
            ) : null;
          })}
        </div>
      </Section>
    </article>
  );
}
