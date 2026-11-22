import Link from "next/link";
import type { Metadata } from "next";
import { registry } from "@/lib/registry";
import { Button } from "@astryxdesign/core/Button";
import { DemoThumb } from "@/components/docs/demos";

export const metadata: Metadata = { title: "Components" };

const order = ["Actions", "Inputs", "Navigation", "Display", "Feedback", "Overlays", "Hack Canada"] as const;

export default function ComponentsIndex() {
  return (
    <div>
      <header className="flex flex-col items-center gap-2 hairline-b pt-6 pb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Browse the library</h1>
        <p className="max-w-prose text-base text-text-secondary">
          Every Hack Canada component, live and measured, with examples for each variant and state.
        </p>
        <div className="flex flex-wrap justify-center gap-1 pt-1">
          <Button variant="primary" label="Get started" href="/getting-started" />
          <Button label="Rules at a glance" href="/rules" />
        </div>
      </header>
      <div className="flex flex-col gap-8 pt-6">
        {order.map((cat) => {
          const items = registry.filter((c) => c.category === cat);
          return (
            <section key={cat} aria-labelledby={cat}>
              <h2 id={cat} data-toc={cat} className="pb-2 text-2xl font-bold tracking-tight">
                {cat}
              </h2>
              <ul className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((c) => (
                  <li key={c.slug}>
                    <div className="group relative flex flex-col gap-1 rounded-lg has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-primary">
                      <div className="overflow-hidden rounded-lg bg-bg-muted transition-colors duration-200 group-hover:bg-border">
                        <DemoThumb slug={c.slug} />
                      </div>
                      <Link href={`/components/${c.slug}`} className="text-sm text-text-secondary outline-none after:absolute after:inset-0 group-hover:text-text">
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
