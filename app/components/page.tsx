import Link from "next/link";
import type { Metadata } from "next";
import { registry } from "@/lib/registry";
import { PageHeader } from "@/components/site/Doc";

export const metadata: Metadata = { title: "Components" };

const order = ["Actions", "Inputs", "Navigation", "Display", "Feedback", "Overlays", "Hack Canada"] as const;

export default function ComponentsIndex() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Component library"
        lead={`${registry.length} components, from buttons to the bet slip. Each page has a playground, live redlines, every state, do and don't examples, accessibility notes and code.`}
      />
      <div className="flex flex-col gap-6">
        {order.map((cat) => {
          const items = registry.filter((c) => c.category === cat);
          return (
            <section key={cat} aria-labelledby={cat}>
              <h2 id={cat} className="flex items-baseline gap-1 pb-2 text-2xl font-bold">
                {cat}
                <span className="font-mono text-mono text-text-muted">{items.length}</span>
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/components/${c.slug}`}
                      className="flex h-full flex-col gap-1 rounded-md border border-border bg-surface p-3 transition-[border-color,transform,box-shadow] duration-200 ease-standard hover:-translate-y-half hover:border-primary hover:shadow-float"
                    >
                      <span className="text-lg font-bold">{c.name}</span>
                      <span className="line-clamp-2 text-sm text-text-muted">{c.summary}</span>
                      <span className="mt-auto pt-1 font-mono text-mono text-text-muted">{c.anatomy.length} parts · {c.specs.length} specs</span>
                    </Link>
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
