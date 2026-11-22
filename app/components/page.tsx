import Link from "next/link";
import type { Metadata } from "next";
import { registry } from "@/lib/registry";
import { PageHeader } from "@/components/site/Doc";
import { DemoThumb } from "@/components/docs/demos";

export const metadata: Metadata = { title: "Components" };

const order = ["Actions", "Inputs", "Navigation", "Display", "Feedback", "Overlays", "Hack Canada"] as const;

export default function ComponentsIndex() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Component library"
        lead={`${registry.length} components, from buttons to the bet slip. Each one is live, measured and ready to copy.`}
      />
      <div className="flex flex-col gap-8">
        {order.map((cat) => {
          const items = registry.filter((c) => c.category === cat);
          return (
            <section key={cat} aria-labelledby={cat}>
              <h2 id={cat} data-toc={cat} className="pb-3 text-xl font-bold tracking-tight">
                {cat}
              </h2>
              <ul className="grid gap-x-3 gap-y-4 sm:grid-cols-2">
                {items.map((c) => (
                  <li key={c.slug}>
                    <div className="group relative flex flex-col gap-1 rounded-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-primary">
                      <div className="overflow-hidden rounded-md border border-border transition-colors duration-200 group-hover:border-border-strong">
                        <DemoThumb slug={c.slug} />
                      </div>
                      <Link href={`/components/${c.slug}`} className="text-sm font-medium text-text outline-none after:absolute after:inset-0 group-hover:text-primary">
                        {c.name}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
